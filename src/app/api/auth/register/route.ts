import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { awardXP, checkAndAwardBadges } from '@/lib/gamification';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
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

    // Safely award welcome bonus without blocking account creation if badges/XP tables encounter issues
    try {
      await awardXP(user.id, 50, 'welcome_bonus', { note: 'Joined SEOlabs' });
      await checkAndAwardBadges(user.id);
    } catch (gamificationError) {
      console.warn('Welcome bonus skipped during registration:', gamificationError);
    }

    return NextResponse.json({
      message: 'Account created successfully',
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (error: any) {
    console.error('Registration error:', error);

    // Provide actionable error messages
    if (error?.code === 'P2002') {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 400 });
    }
    if (error?.code === 'P1001' || error?.code === 'P1000') {
      return NextResponse.json({
        error: 'Database connection failed. Please ensure PostgreSQL is running and credentials are valid.',
      }, { status: 503 });
    }
    if (error?.code === 'P2021' || error?.message?.includes('does not exist')) {
      return NextResponse.json({
        error: 'Database tables have not been created. Run `npx prisma db push` on the server.',
      }, { status: 500 });
    }

    return NextResponse.json({
      error: error?.message || 'Failed to register account. Please try again.',
    }, { status: 500 });
  }
}
