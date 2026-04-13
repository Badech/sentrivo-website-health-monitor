import { NextRequest, NextResponse } from 'next/server';
import { getSiteById, updateSite } from '@/lib/data';
import { z } from 'zod';

// GET /api/sites/[siteId] - Get site details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  try {
    const { siteId } = await params;
    const site = await getSiteById(siteId);

    if (!site) {
      return NextResponse.json(
        { error: 'Site not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ site });
  } catch (error) {
    console.error('Error fetching site:', error);
    return NextResponse.json(
      { error: 'Failed to fetch site' },
      { status: 500 }
    );
  }
}

// PATCH /api/sites/[siteId] - Update site
const updateSiteSchema = z.object({
  name: z.string().min(1).optional(),
  industry: z.string().optional(),
  scanFrequency: z.enum(['DAILY', 'WEEKLY', 'MANUAL']).optional(),
  status: z.enum(['ACTIVE', 'PAUSED', 'ARCHIVED']).optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  try {
    const { siteId } = await params;
    const body = await request.json();
    const validatedData = updateSiteSchema.parse(body);

    const site = await updateSite(siteId, validatedData);

    return NextResponse.json({ site });
  } catch (error) {
    console.error('Error updating site:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update site' },
      { status: 500 }
    );
  }
}
