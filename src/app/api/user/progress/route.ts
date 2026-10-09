import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/current-user';
import { getTierForLevel, getXPProgress, getXPForNextLevel } from '@/lib/gamification';

export async function GET() {
  try {
    const user = await getCurrentUser();

    const badges = await prisma.userBadge.findMany({
      where: { userId: user.id },
      include: { badge: true },
    });

    const allBadges = await prisma.badge.findMany();
    const xpHistory = await prisma.xPEvent.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    const tierInfo = getTierForLevel(user.currentLevel);
    const progress = getXPProgress(user.totalXP, user.currentLevel);
    const nextLevelXP = getXPForNextLevel(user.currentLevel);

    const earnedBadgeMap = new Set(badges.map(b => b.badgeId));
    const badgeList = allBadges.map(b => ({
      ...b,
      earned: earnedBadgeMap.has(b.id),
      earnedAt: badges.find(ub => ub.badgeId === b.id)?.earnedAt || null,
    }));

    const unlockedFeatures = [
      { name: 'Google SERP Algorithmic Flight Simulator', level: 1, unlocked: user.currentLevel >= 1 },
      { name: 'AI Overviews & SearchGPT GEO Citation Analyzer', level: 3, unlocked: user.currentLevel >= 3 },
      { name: 'A/B Split Test SERP Arena', level: 5, unlocked: user.currentLevel >= 5 },
      { name: 'Rich Schema & FAQ JSON-LD Generator', level: 8, unlocked: user.currentLevel >= 8 },
      { name: 'Multi-Engine Discovery Matrix (Bing, YouTube, Amazon)', level: 12, unlocked: user.currentLevel >= 12 },
      { name: 'Continuous Crawl Velocity Projection (24-Month)', level: 15, unlocked: user.currentLevel >= 15 },
    ];

    return NextResponse.json({
      totalXP: user.totalXP,
      currentLevel: user.currentLevel,
      seoTier: user.seoTier,
      tierDisplay: tierInfo.label,
      currentThresholdXP: progress.current,
      requiredThresholdXP: progress.required,
      percentage: progress.percentage,
      nextLevelXP,
      badges: badgeList,
      xpHistory,
      unlockedFeatures,
    });
  } catch (error) {
    console.error('Progress error:', error);
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
  }
}
