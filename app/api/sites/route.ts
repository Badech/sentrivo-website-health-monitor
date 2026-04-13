import { NextRequest, NextResponse } from 'next/server';
import { getAllSites, createSite, getCurrentWorkspace } from '@/lib/data';
import { z } from 'zod';

// GET /api/sites - List all sites for current workspace
export async function GET() {
  try {
    const workspace = await getCurrentWorkspace();
    const sites = await getAllSites(workspace.id);

    return NextResponse.json({ sites });
  } catch (error) {
    console.error('Error fetching sites:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sites' },
      { status: 500 }
    );
  }
}

// POST /api/sites - Create a new site
const createSiteSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  domain: z.string().min(1, 'Domain is required'),
  industry: z.string().optional(),
  scanFrequency: z.enum(['DAILY', 'WEEKLY', 'MANUAL']).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const workspace = await getCurrentWorkspace();
    const body = await request.json();

    // Validate input
    const validatedData = createSiteSchema.parse(body);

    // Create site
    const site = await createSite({
      workspaceId: workspace.id,
      name: validatedData.name,
      domain: validatedData.domain,
      industry: validatedData.industry,
      scanFrequency: validatedData.scanFrequency,
    });

    return NextResponse.json({ site }, { status: 201 });
  } catch (error) {
    console.error('Error creating site:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create site' },
      { status: 500 }
    );
  }
}
