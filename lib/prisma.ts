import { PrismaClient } from '@prisma/client';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';

// Configure WebSocket for local development
neonConfig.webSocketConstructor = ws;

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Create Prisma Client with Neon adapter when DATABASE_URL is available
function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  
  // During build time when no DATABASE_URL, use a dummy connection string with adapter
  // This allows Next.js to build without an actual database
  if (!connectionString) {
    console.log('[Prisma] No DATABASE_URL found, using dummy adapter for build');
    const dummyConnectionString = 'postgresql://user:pass@localhost:5432/db';
    const adapter = new PrismaNeon({ connectionString: dummyConnectionString });
    return new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  }
  
  // At runtime with DATABASE_URL, use Neon adapter for connection pooling
  console.log('[Prisma] Using Neon adapter with connection pooling');
  const adapter = new PrismaNeon({ connectionString });
  
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
