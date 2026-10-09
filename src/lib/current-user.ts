import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import prisma from './prisma';

export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      if (user) return user;
    }
  } catch {
    // Session retrieval error, fallback to demo user
  }

  // Fallback to demo user for seamless lab preview
  let demoUser = await prisma.user.findUnique({
    where: { email: 'demo@seolabs.ai' },
  });

  if (!demoUser) {
    demoUser = await prisma.user.create({
      data: {
        email: 'demo@seolabs.ai',
        name: 'Aryan SEO',
        currentLevel: 8,
        totalXP: 1450,
        seoTier: 'SERP_SCOUT',
      },
    });
  }

  return demoUser;
}
