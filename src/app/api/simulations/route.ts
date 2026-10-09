import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/current-user';
import { runSeoSimulation } from '@/lib/seo-engine';
import { analyzeSeoContentWithAi } from '@/lib/ai';
import { awardXP, checkAndAwardBadges } from '@/lib/gamification';

export async function GET() {
  try {
    const user = await getCurrentUser();
    const simulations = await prisma.simulation.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        experiment: true,
      },
    });

    const parsed = simulations.map(s => ({
      ...s,
      algorithmFactors: s.algorithmFactors ? JSON.parse(s.algorithmFactors) : null,
      recommendations: s.recommendations ? JSON.parse(s.recommendations) : [],
      timeline: s.timeline ? JSON.parse(s.timeline) : [],
      variantBResult: s.variantBResult ? JSON.parse(s.variantBResult) : null,
    }));

    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Fetch simulations error:', error);
    return NextResponse.json({ error: 'Failed to fetch simulations' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const { experimentId } = await req.json();

    if (!experimentId) {
      return NextResponse.json({ error: 'Experiment ID is required' }, { status: 400 });
    }

    const experiment = await prisma.experiment.findUnique({
      where: { id: experimentId },
    });

    if (!experiment) {
      return NextResponse.json({ error: 'Experiment not found' }, { status: 404 });
    }

    let secondaryKeywords: string[] = [];
    try {
      secondaryKeywords = JSON.parse(experiment.secondaryKeywords || '[]');
    } catch {
      secondaryKeywords = [];
    }

    // Run Algorithmic Flight Simulation
    const simResult = runSeoSimulation({
      searchEngine: experiment.searchEngine,
      contentType: experiment.contentType,
      searchIntent: experiment.searchIntent,
      title: experiment.title,
      metaDescription: experiment.metaDescription || undefined,
      urlSlug: experiment.urlSlug || undefined,
      targetKeyword: experiment.targetKeyword,
      secondaryKeywords,
      body: experiment.body,
      schemaType: experiment.schemaType,
      userLevel: user.currentLevel,
      isSplitTest: experiment.isSplitTest,
      variantBTitle: experiment.variantBTitle || undefined,
      variantBMeta: experiment.variantBMeta || undefined,
    });

    // Run AI Pro SEO Analysis
    const aiAnalysis = await analyzeSeoContentWithAi({
      searchEngine: experiment.searchEngine,
      searchIntent: experiment.searchIntent,
      targetKeyword: experiment.targetKeyword,
      title: experiment.title,
      metaDescription: experiment.metaDescription || undefined,
      body: experiment.body,
    });

    // Save Simulation Record
    const simulation = await prisma.simulation.create({
      data: {
        experimentId: experiment.id,
        userId: user.id,
        searchEngine: experiment.searchEngine,
        searchIntent: experiment.searchIntent,
        predictedRank: simResult.predictedRank,
        predictedCtr: simResult.predictedCtr,
        monthlyImpressions: simResult.monthlyImpressions,
        monthlyClicks: simResult.monthlyClicks,
        trafficValue: simResult.trafficValue,
        geoCitationScore: simResult.geoCitationScore,
        eeatScore: simResult.eeatScore,
        helpfulContentScore: simResult.helpfulContentScore,
        overallSeoScore: simResult.overallSeoScore,
        richSnippetEligible: simResult.richSnippetEligible,
        algorithmFactors: JSON.stringify(simResult.algorithmFactors),
        recommendations: JSON.stringify(simResult.recommendations),
        timeline: JSON.stringify(simResult.timeline),
        variantBResult: simResult.variantBComparison ? JSON.stringify(simResult.variantBComparison) : null,
        aiIntentMatch: aiAnalysis.intentMatch,
        aiInformationGain: aiAnalysis.informationGain,
        aiSnippetCritique: aiAnalysis.snippetCritique,
        aiStrategicAdvice: aiAnalysis.strategicAdvice,
      },
    });

    // Update Experiment status
    await prisma.experiment.update({
      where: { id: experiment.id },
      data: { status: 'SIMULATED' },
    });

    // Award Simulation XP (+100 XP)
    const xpGain = await awardXP(user.id, 100, 'simulation_run', {
      simulationId: simulation.id,
      predictedRank: simResult.predictedRank,
    });

    // Check & Award Badges
    const newBadges = await checkAndAwardBadges(user.id);

    // Record User Analytics for today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingAnalytics = await prisma.userAnalytics.findUnique({
      where: {
        userId_date: {
          userId: user.id,
          date: today,
        },
      },
    });

    if (existingAnalytics) {
      await prisma.userAnalytics.update({
        where: { id: existingAnalytics.id },
        data: {
          simulationsRun: { increment: 1 },
          avgRank: (existingAnalytics.avgRank + simResult.predictedRank) / 2,
          avgSeoScore: (existingAnalytics.avgSeoScore + simResult.overallSeoScore) / 2,
          xpEarned: { increment: 100 },
        },
      });
    } else {
      await prisma.userAnalytics.create({
        data: {
          userId: user.id,
          date: today,
          simulationsRun: 1,
          avgRank: simResult.predictedRank,
          avgSeoScore: simResult.overallSeoScore,
          topEngine: experiment.searchEngine,
          xpEarned: 100,
        },
      });
    }

    return NextResponse.json({
      simulation: {
        ...simulation,
        algorithmFactors: simResult.algorithmFactors,
        recommendations: simResult.recommendations,
        timeline: simResult.timeline,
        variantBComparison: simResult.variantBComparison,
        serpSnippet: simResult.serpSnippet,
        aiAnalysis,
      },
      xpAwarded: 100,
      totalXP: xpGain.totalXP,
      newLevel: xpGain.newLevel,
      leveledUp: xpGain.leveledUp,
      newBadges,
    });
  } catch (error) {
    console.error('Run simulation error:', error);
    return NextResponse.json({ error: 'Failed to run simulation' }, { status: 500 });
  }
}
