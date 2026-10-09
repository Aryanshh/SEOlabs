const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const BADGES = [
  {
    name: 'First Crawl',
    description: 'Ran your first SERP algorithm experiment in the lab',
    iconEmoji: '🔍',
    category: 'MILESTONE',
    criteria: JSON.stringify({ type: 'sim_count', threshold: 1 }),
    xpReward: 100,
  },
  {
    name: 'Page One Pioneer',
    description: 'Achieved a simulated Top 10 Google ranking',
    iconEmoji: '🎯',
    category: 'SERP_MASTERY',
    criteria: JSON.stringify({ type: 'serp_rank', threshold: 10 }),
    xpReward: 200,
  },
  {
    name: 'Position #1 Crown',
    description: 'Achieved a predicted Rank #1 in search results',
    iconEmoji: '👑',
    category: 'SERP_MASTERY',
    criteria: JSON.stringify({ type: 'serp_rank_one', threshold: 1.5 }),
    xpReward: 500,
  },
  {
    name: 'GEO Whisperer',
    description: 'Achieved >80% citation probability in AI Overviews / SearchGPT',
    iconEmoji: '🤖',
    category: 'TECHNICAL_SEO',
    criteria: JSON.stringify({ type: 'geo_score', threshold: 80 }),
    xpReward: 300,
  },
  {
    name: 'EEAT Titan',
    description: 'Achieved an Experience, Expertise, Authoritativeness, and Trust score of 85+',
    iconEmoji: '🛡️',
    category: 'CONTENT_QUALITY',
    criteria: JSON.stringify({ type: 'eeat_score', threshold: 85 }),
    xpReward: 250,
  },
  {
    name: 'Schema Architect',
    description: 'Configured and tested structured JSON-LD schema markup',
    iconEmoji: '🧩',
    category: 'TECHNICAL_SEO',
    criteria: JSON.stringify({ type: 'schema_used', threshold: 1 }),
    xpReward: 150,
  },
  {
    name: 'Split-Test Scientist',
    description: 'Ran a head-to-head A/B title and snippet experiment',
    iconEmoji: '🧪',
    category: 'SPLIT_TESTING',
    criteria: JSON.stringify({ type: 'split_test_count', threshold: 1 }),
    xpReward: 200,
  },
  {
    name: 'Helpful Content Ace',
    description: 'Scored 90+ on the Google Helpful Content & Information Gain Index',
    iconEmoji: '⚡',
    category: 'CONTENT_QUALITY',
    criteria: JSON.stringify({ type: 'helpful_score', threshold: 90 }),
    xpReward: 350,
  },
  {
    name: 'Traffic Tycoon',
    description: 'Projected over 5,000 monthly organic search clicks',
    iconEmoji: '📈',
    category: 'SERP_MASTERY',
    criteria: JSON.stringify({ type: 'monthly_clicks', threshold: 5000 }),
    xpReward: 400,
  },
  {
    name: 'Multi-Engine Master',
    description: 'Tested experiments across 4 different search engines',
    iconEmoji: '🌐',
    category: 'MILESTONE',
    criteria: JSON.stringify({ type: 'engine_count', threshold: 4 }),
    xpReward: 300,
  },
];

async function main() {
  console.log('Seeding SEOlabs database...');

  // Create or update badges
  for (const b of BADGES) {
    await prisma.badge.upsert({
      where: { name: b.name },
      update: b,
      create: b,
    });
  }

  // Create a default test user
  const passwordHash = await bcrypt.hash('password123', 10);
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@seolabs.ai' },
    update: {},
    create: {
      email: 'demo@seolabs.ai',
      name: 'Aryan SEO',
      passwordHash,
      emailVerified: new Date(),
      totalXP: 1450,
      currentLevel: 8,
      seoTier: 'SERP_SCOUT',
    },
  });

  // Award first badge to demo user
  const firstBadge = await prisma.badge.findUnique({ where: { name: 'First Crawl' } });
  if (firstBadge) {
    await prisma.userBadge.upsert({
      where: {
        userId_badgeId: {
          userId: demoUser.id,
          badgeId: firstBadge.id,
        },
      },
      update: {},
      create: {
        userId: demoUser.id,
        badgeId: firstBadge.id,
      },
    });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
