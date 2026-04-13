import { NextRequest, NextResponse } from 'next/server';
import { getIssueById, updateIssueStatus } from '@/lib/data';
import { z } from 'zod';

// GET /api/issues/[issueId] - Get issue details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ issueId: string }> }
) {
  try {
    const { issueId } = await params;
    const issue = await getIssueById(issueId);

    if (!issue) {
      return NextResponse.json(
        { error: 'Issue not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ issue });
  } catch (error) {
    console.error('Error fetching issue:', error);
    return NextResponse.json(
      { error: 'Failed to fetch issue' },
      { status: 500 }
    );
  }
}

// PATCH /api/issues/[issueId] - Update issue
const updateIssueSchema = z.object({
  status: z.enum(['OPEN', 'ACKNOWLEDGED', 'RESOLVED']),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ issueId: string }> }
) {
  try {
    const { issueId } = await params;
    const body = await request.json();
    const validatedData = updateIssueSchema.parse(body);

    const issue = await updateIssueStatus(
      issueId,
      validatedData.status
    );

    return NextResponse.json({ issue });
  } catch (error) {
    console.error('Error updating issue:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update issue' },
      { status: 500 }
    );
  }
}
