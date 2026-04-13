import { NextRequest, NextResponse } from 'next/server';
import { getScansBySite, createScan } from '@/lib/data';
import { queueDemoScan, queueRealScan } from '@/lib/scanning';
import { z } from 'zod';

// GET /api/sites/[siteId]/scans - Get scan history
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  try {
    const { siteId } = await params;
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const source = searchParams.get('source') || undefined;

    const scans = await getScansBySite(siteId, {
      limit,
      offset,
      source,
    });

    return NextResponse.json({ scans, total: scans.length });
  } catch (error) {
    console.error('Error fetching scans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch scans' },
      { status: 500 }
    );
  }
}

// POST /api/sites/[siteId]/scans - Create a new scan
const createScanSchema = z.object({
  source: z.enum(['DEMO', 'LIVE']).optional(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  try {
    const { siteId } = await params;
    const body = await request.json().catch(() => ({}));
    const validatedData = createScanSchema.parse(body);

    const scan = await createScan({
      siteId,
      source: validatedData.source || 'LIVE',
      status: 'QUEUED',
    });

    // Trigger scan execution based on source type
    if (validatedData.source === 'DEMO') {
      // Run demo scan (for testing/marketing)
      queueDemoScan(siteId).catch((error) => {
        console.error('Demo scan execution failed:', error);
      });
    } else {
      // Run real scan (production monitoring with Playwright + APIs)
      queueRealScan(siteId, {
        maxPages: 50,
        includePageSpeed: true,
        includeSearchConsole: false, // Enable when OAuth is set up
        includeGA4: false, // Enable when OAuth is set up
      }).catch((error) => {
        console.error('Real scan execution failed:', error);
      });
    }

    return NextResponse.json({ scan }, { status: 201 });
  } catch (error) {
    console.error('Error creating scan:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create scan' },
      { status: 500 }
    );
  }
}
