import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/current-user';
import { awardXP } from '@/lib/gamification';

export async function GET() {
  try {
    const user = await getCurrentUser();
    const experiments = await prisma.experiment.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        simulations: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    return NextResponse.json(experiments);
  } catch (error) {
    console.error('Fetch experiments error:', error);
    return NextResponse.json({ error: 'Failed to fetch experiments' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();

    const {
      searchEngine = 'GOOGLE',
      contentType = 'BLOG_ARTICLE',
      searchIntent = 'INFORMATIONAL',
      title,
      metaDescription,
      urlSlug,
      targetKeyword,
      secondaryKeywords = [],
      contentBody,
      schemaType = 'ARTICLE',
      schemaMarkup,
      isSplitTest = false,
      variantBTitle,
      variantBMeta,
    } = body;

    if (!title || !targetKeyword || !contentBody) {
      return NextResponse.json({ error: 'Title, target keyword, and content body are required' }, { status: 400 });
    }

    const experiment = await prisma.experiment.create({
      data: {
        userId: user.id,
        searchEngine,
        contentType,
        searchIntent,
        title,
        metaDescription,
        urlSlug: urlSlug || `/${targetKeyword.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        targetKeyword,
        secondaryKeywords: JSON.stringify(secondaryKeywords),
        body: contentBody,
        schemaType,
        schemaMarkup,
        isSplitTest,
        variantBTitle,
        variantBMeta,
        status: 'DRAFT',
      },
    });

    // Award Drafting XP (+25 XP)
    const xpResult = await awardXP(user.id, 25, 'experiment_draft', { experimentId: experiment.id });

    return NextResponse.json({
      ...experiment,
      xpAwarded: 25,
      newLevel: xpResult.newLevel,
      leveledUp: xpResult.leveledUp,
    });
  } catch (error) {
    console.error('Create experiment error:', error);
    return NextResponse.json({ error: 'Failed to create experiment' }, { status: 500 });
  }
}
