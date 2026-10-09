import prisma from './prisma';

// XP thresholds per level
const LEVEL_THRESHOLDS = [
  0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 3800,
  4700, 5700, 6800, 8000, 9500, 11000, 13000, 15000, 17500, 20000,
  23000, 26000, 29500, 33000, 37000, 41000, 45500, 50000, 55000, 60000,
  66000, 72000, 78500, 85000, 92000, 99000, 107000, 115000, 124000, 133000,
  143000, 153000, 164000, 175000, 187000, 199000, 212000, 225000, 240000, 255000,
];

export function getTierForLevel(level: number): { key: string; label: string } {
  if (level <= 5) return { key: 'CRAWL_BOT', label: 'Crawl Bot' };
  if (level <= 15) return { key: 'SERP_SCOUT', label: 'SERP Scout' };
  if (level <= 30) return { key: 'INDEX_STRATEGIST', label: 'Index Strategist' };
  if (level <= 45) return { key: 'ALGORITHM_ARCHITECT', label: 'Algorithm Architect' };
  return { key: 'SERP_OVERLORD', label: 'SERP Overlord' };
}

export function getLevelForXP(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) return i + 1;
  }
  return 1;
}

export function getXPForNextLevel(currentLevel: number): number {
  if (currentLevel >= LEVEL_THRESHOLDS.length) {
    return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] + 20000;
  }
  return LEVEL_THRESHOLDS[currentLevel];
}

export function getXPProgress(totalXP: number, currentLevel: number): { current: number; required: number; percentage: number } {
  const currentThreshold = currentLevel > 1 ? LEVEL_THRESHOLDS[currentLevel - 1] : 0;
  const nextThreshold = getXPForNextLevel(currentLevel);
  const current = Math.max(totalXP - currentThreshold, 0);
  const required = Math.max(nextThreshold - currentThreshold, 1);
  return {
    current,
    required,
    percentage: Math.min(Math.round((current / required) * 100), 100),
  };
}

export async function awardXP(userId: string, amount: number, source: string, metadata?: Record<string, unknown>) {
  await prisma.xPEvent.create({
    data: {
      userId,
      amount,
      source,
      metadata: metadata ? JSON.stringify(metadata) : null,
    },
  });

  const user = await prisma.user.update({
    where: { id: userId },
    data: { totalXP: { increment: amount } },
  });

  const newLevel = getLevelForXP(user.totalXP);
  const leveledUp = newLevel > user.currentLevel;

  if (leveledUp) {
    const tier = getTierForLevel(newLevel);
    await prisma.user.update({
      where: { id: userId },
      data: {
        currentLevel: newLevel,
        seoTier: tier.key,
      },
    });
  }

  return { totalXP: user.totalXP, newLevel, leveledUp };
}

export async function checkAndAwardBadges(userId: string): Promise<string[]> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { simulations: true, badges: true },
  });
  if (!user) return [];

  const allBadges = await prisma.badge.findMany();
  const earnedBadgeIds = user.badges.map(b => b.badgeId);
  const newBadges: string[] = [];

  for (const badge of allBadges) {
    if (earnedBadgeIds.includes(badge.id)) continue;
    let criteria: { type: string; threshold: number };
    try {
      criteria = JSON.parse(badge.criteria);
    } catch {
      continue;
    }

    let earned = false;
    switch (criteria.type) {
      case 'sim_count':
        earned = user.simulations.length >= criteria.threshold;
        break;
      case 'serp_rank':
        earned = user.simulations.some(s => s.predictedRank <= criteria.threshold);
        break;
      case 'serp_rank_one':
        earned = user.simulations.some(s => s.predictedRank <= criteria.threshold);
        break;
      case 'geo_score':
        earned = user.simulations.some(s => s.geoCitationScore >= criteria.threshold);
        break;
      case 'eeat_score':
        earned = user.simulations.some(s => s.eeatScore >= criteria.threshold);
        break;
      case 'helpful_score':
        earned = user.simulations.some(s => s.helpfulContentScore >= criteria.threshold);
        break;
      case 'schema_used':
        earned = user.simulations.some(s => s.richSnippetEligible);
        break;
      case 'split_test_count':
        earned = user.simulations.some(s => s.variantBResult !== null);
        break;
      case 'monthly_clicks':
        earned = user.simulations.some(s => s.monthlyClicks >= criteria.threshold);
        break;
      case 'engine_count':
        const engines = new Set(user.simulations.map(s => s.searchEngine));
        earned = engines.size >= criteria.threshold;
        break;
    }

    if (earned) {
      await prisma.userBadge.create({
        data: { userId, badgeId: badge.id },
      });
      await awardXP(userId, badge.xpReward, 'badge_earned', { badgeName: badge.name });
      newBadges.push(badge.name);
    }
  }

  return newBadges;
}
