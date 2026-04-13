import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool } from '@neondatabase/serverless';

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Create Prisma Client with Neon adapter when DATABASE_URL is available
function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  
  // During build time when no DATABASE_URL, return basic client
  if (!connectionString) {
    console.log('[Prisma] No DATABASE_URL found, using basic client for build');
    return new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  }
  
  // At runtime with DATABASE_URL, use Neon adapter for connection pooling
  console.log('[Prisma] Using Neon adapter with connection pooling');
  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool);
  
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
