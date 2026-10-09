import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/current-user';

export async function GET() {
  try {
    const user = await getCurrentUser();

    const simulations = await prisma.simulation.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      include: { experiment: true },
    });

    const badges = await prisma.userBadge.findMany({
      where: { userId: user.id },
    });

    const totalSimulations = simulations.length;
    const avgRank = totalSimulations > 0
      ? Math.round((simulations.reduce((acc, s) => acc + s.predictedRank, 0) / totalSimulations) * 10) / 10
      : 10.0;
    const avgSeoScore = totalSimulations > 0
      ? Math.round(simulations.reduce((acc, s) => acc + s.overallSeoScore, 0) / totalSimulations)
      : 0;
    const avgGeoScore = totalSimulations > 0
      ? Math.round(simulations.reduce((acc, s) => acc + s.geoCitationScore, 0) / totalSimulations)
      : 0;
    const totalTrafficValue = totalSimulations > 0
      ? Math.round(simulations.reduce((acc, s) => acc + s.trafficValue, 0) * 100) / 100
      : 0;
    const totalClicks = totalSimulations > 0
      ? simulations.reduce((acc, s) => acc + s.monthlyClicks, 0)
      : 0;

    // Search Engine Distribution
    const engineMap: Record<string, number> = {};
    for (const s of simulations) {
      engineMap[s.searchEngine] = (engineMap[s.searchEngine] || 0) + 1;
    }
    const engineDistribution = Object.entries(engineMap).map(([engine, count]) => ({
      engine,
      count,
    }));

    // Rank Distribution (Top 3, 4-10, Page 2+)
    const rankBuckets = { top3: 0, page1: 0, page2Plus: 0 };
    for (const s of simulations) {
      if (s.predictedRank <= 3.0) rankBuckets.top3++;
      else if (s.predictedRank <= 10.0) rankBuckets.page1++;
      else rankBuckets.page2Plus++;
    }

    return NextResponse.json({
      overview: {
        totalSimulations,
        avgRank,
        avgSeoScore,
        avgGeoScore,
        totalTrafficValue,
        totalClicks,
        badgesEarned: badges.length,
        level: user.currentLevel,
        tier: user.seoTier,
      },
      engineDistribution,
      rankBuckets,
      recentSimulations: simulations.slice(0, 5).map(s => ({
        id: s.id,
        searchEngine: s.searchEngine,
        searchIntent: s.searchIntent,
        predictedRank: s.predictedRank,
        predictedCtr: s.predictedCtr,
        monthlyClicks: s.monthlyClicks,
        trafficValue: s.trafficValue,
        overallSeoScore: s.overallSeoScore,
        geoCitationScore: s.geoCitationScore,
        createdAt: s.createdAt,
        title: s.experiment?.title || 'Untitled',
        targetKeyword: s.experiment?.targetKeyword || '',
      })),
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
