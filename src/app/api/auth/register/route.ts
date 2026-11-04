import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { awardXP, checkAndAwardBadges } from '@/lib/gamification';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json({ error: 'Please provide a valid email address' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters long' }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        name: name?.trim() || 'SEO Specialist',
        passwordHash,
        emailVerified: new Date(),
        seoTier: 'CRAWL_BOT',
        currentLevel: 1,
        totalXP: 0,
      },
    });

    // Welcome XP
    await awardXP(user.id, 50, 'welcome_bonus', { note: 'Joined SEOlabs Flight Deck' });
    await checkAndAwardBadges(user.id);

    return NextResponse.json({
      message: 'User registered successfully',
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Failed to register account' }, { status: 500 });
  }
}
