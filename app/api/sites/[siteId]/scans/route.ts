import { NextRequest, NextResponse } from 'next/server';
import { getScansBySite, createScan } from '@/lib/data';
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

    // Trigger scan execution
    if (validatedData.source === 'DEMO') {
      const { runDemoScan } = await import('@/lib/scanning');
      // Run demo scan in background
      runDemoScan(scan.id).catch((error) => {
        console.error('Demo scan execution failed:', error);
      });
    }
    // TODO: For LIVE scans, queue to job system (future enhancement)

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
