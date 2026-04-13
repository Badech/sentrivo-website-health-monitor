import { NextRequest, NextResponse } from 'next/server';
import { getIssues } from '@/lib/data';

// GET /api/issues - Get filtered issues
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const filters = {
      siteId: searchParams.get('siteId') || undefined,
      scanId: searchParams.get('scanId') || undefined,
      severity: searchParams.get('severity') || undefined,
      status: searchParams.get('status') || undefined,
      category: searchParams.get('category') || undefined,
      limit: parseInt(searchParams.get('limit') || '100'),
      offset: parseInt(searchParams.get('offset') || '0'),
    };

    const issues = await getIssues(filters);

    return NextResponse.json({ issues, total: issues.length });
  } catch (error) {
    console.error('Error fetching issues:', error);
    return NextResponse.json(
      { error: 'Failed to fetch issues' },
      { status: 500 }
    );
  }
}
