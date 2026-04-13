import { NextRequest, NextResponse } from 'next/server';
import { getDashboardData } from '@/lib/data';

// GET /api/sites/[siteId]/dashboard - Get dashboard summary
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  try {
    const { siteId } = await params;
    const dashboardData = await getDashboardData(siteId);
    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);

    if (error instanceof Error && error.message === 'Site not found') {
      return NextResponse.json(
        { error: 'Site not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
