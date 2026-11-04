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
  } catch (error) {
    console.error('Error fetching current user session:', error);
  }

  return null;
}
