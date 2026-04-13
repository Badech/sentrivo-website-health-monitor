import { NextRequest, NextResponse } from 'next/server';
import { getIssues } from '@/lib/data';

// GET /api/scans/[scanId]/issues - Get issues for a scan
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ scanId: string }> }
) {
  try {
    const { scanId } = await params;
    const issues = await getIssues({
      scanId,
    });

    return NextResponse.json({ issues, total: issues.length });
  } catch (error) {
    console.error('Error fetching scan issues:', error);
    return NextResponse.json(
      { error: 'Failed to fetch scan issues' },
      { status: 500 }
    );
  }
}
