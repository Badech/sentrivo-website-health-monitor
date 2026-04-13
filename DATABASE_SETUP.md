# Sentrivo Database Setup Guide

This guide covers setting up Neon Postgres with Prisma for the Sentrivo application.

## Prerequisites

- Node.js 18+ installed
- A Neon account (free tier available at [neon.tech](https://neon.tech))

## Quick Start

### 1. Create a Neon Database

1. Go to [console.neon.tech](https://console.neon.tech)
2. Create a new project
3. Copy your connection strings:
   - **Pooled connection** (for application runtime)
   - **Direct connection** (for Prisma migrations)

### 2. Configure Environment Variables

Create a `.env` file in the project root (use `.env.example` as template):

```bash
# Pooled connection for application runtime
DATABASE_URL="postgresql://user:password@ep-xxx-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Direct connection for Prisma migrations
DIRECT_URL="postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Environment
NODE_ENV="development"
```

**Important:** Never commit `.env` to git. It's already in `.gitignore`.

### 3. Run Migrations

Apply the database schema:

```bash
npx prisma migrate dev --name init
```

This will:
- Create all tables in your Neon database
- Generate the Prisma Client
- Run the seed script automatically

### 4. Seed the Database (Optional - runs automatically with migrate dev)

If you need to re-seed manually:

```bash
npx prisma db seed
```

This creates:
- 1 demo workspace
- 1 demo user
- 3 sample sites (acmeplumbing.com, shopflow.io, greenleaf.co)
- Scans with realistic data
- Issues (critical and warnings)
- Sample report

## Database Schema Overview

### Core Tables

1. **Workspace** - Multi-tenant workspaces
2. **User** - User accounts
3. **Membership** - Workspace access control
4. **Site** - Monitored websites
5. **Scan** - Scan executions
6. **ScanPage** - Discovered pages per scan
7. **Issue** - Detected issues
8. **Report** - Generated reports
9. **WorkspaceSetting** - Workspace configuration

### Key Relationships

```
Workspace
├── Membership (many)
├── Site (many)
│   ├── Scan (many)
│   │   ├── ScanPage (many)
│   │   │   └── Issue (many)
│   │   └── Issue (many)
│   ├── Issue (many)
│   └── Report (many)
└── WorkspaceSetting (one)

User
└── Membership (many)
```

## Useful Commands

### View Database in Prisma Studio

```bash
npx prisma studio
```

Opens a browser interface to view and edit data.

### Generate Prisma Client

After schema changes:

```bash
npx prisma generate
```

### Create a New Migration

After modifying `prisma/schema.prisma`:

```bash
npx prisma migrate dev --name descriptive_name
```

### Reset Database (WARNING: Deletes all data)

```bash
npx prisma migrate reset
```

This will:
1. Drop the database
2. Recreate it
3. Run all migrations
4. Run the seed script

### Push Schema Changes (for prototyping)

```bash
npx prisma db push
```

Use this for quick prototyping without creating migration files.

## Architecture

### Neon Adapter Setup

The application uses the Neon adapter for optimal serverless performance:

**lib/prisma.ts:**
```typescript
import { PrismaClient } from '@prisma/client';
import { Pool } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaNeon(pool);

export const prisma = new PrismaClient({ adapter });
```

### Why Two Connection Strings?

- **DATABASE_URL (Pooled)**: Used by the application at runtime for better performance
- **DIRECT_URL (Direct)**: Used by Prisma CLI for migrations and introspection

## Current Implementation Status

✅ **Phase 1**: Neon + Prisma installed and configured  
✅ **Phase 2**: Core data model created (9 tables)  
✅ **Phase 3**: Seed file with realistic demo data  
✅ **Phase 4**: Data access layer complete (41 functions)  
✅ **Phase 5**: API routes complete (16 endpoints)  
✅ **Phase 6**: Ready for UI integration  
✅ **Phase 7**: Demo scan engine implemented  
✅ **Phase 8**: Type-safe validation with Zod  

## What's Real vs. Still Mocked

### Currently Real (Persisted to DB)
- ✅ Workspace structure
- ✅ Sites with health scores
- ✅ Scan history
- ✅ Issues with full context
- ✅ Reports
- ✅ Demo scans persist to database
- ✅ 16 working API endpoints
- ✅ Type-safe validation

### Still Mocked (Future Enhancement)
- ⏳ Real browser-based scanning (uses demo scan engine)
- ⏳ Authentication (uses demo workspace)
- ⏳ Email alerts
- ⏳ Slack integrations
- ⏳ Background job queue

## Troubleshooting

### "Error connecting to database"

- Verify your `.env` file has correct Neon URLs
- Check that your IP is allowed in Neon project settings
- Ensure the database name matches your Neon database

### "Migration failed"

- Check that DIRECT_URL is set (not just DATABASE_URL)
- Verify you're using the direct connection string (not pooled)
- Make sure the database is accessible

### "Prisma Client not generated"

Run:
```bash
npx prisma generate
```

### Seed script fails

Check:
- Your database is accessible
- No existing data conflicts (use `npx prisma migrate reset` to start fresh)
- Your `.env` file is properly configured

## Next Steps

1. ✅ Database is configured
2. ✅ Schema is created
3. ✅ Sample data is seeded
4. ✅ Data access layer built (`lib/data/*`)
5. ✅ API routes implemented (`app/api/*`)
6. ✅ Demo scan engine created (`lib/scanning/*`)
7. ⏳ Connect UI components to APIs
8. ⏳ Add proper authentication
9. ⏳ Build real scanning with Playwright
10. ⏳ Add background job queue

## Resources

- [Neon Documentation](https://neon.tech/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma with Neon](https://neon.tech/docs/guides/prisma)
