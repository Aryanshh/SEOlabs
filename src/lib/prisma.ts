import { PrismaClient } from '@prisma/client';

function getDatabaseUrl(): string {
  let url = process.env.DATABASE_URL;
  if (url) {
    url = url.trim().replace(/^["']|["']$/g, '');
  }
  if (url && (url.startsWith('postgresql://') || url.startsWith('postgres://'))) {
    return url;
  }
  // Fallback to local PostgreSQL on 127.0.0.1 if environment variable is missing or invalid SQLite string
  return 'postgresql://seolabs:seolabs_pass_2026@127.0.0.1:5432/seolabs?schema=public';
}

const resolvedDbUrl = getDatabaseUrl();
process.env.DATABASE_URL = resolvedDbUrl;

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: resolvedDbUrl,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
