import { NextRequest, NextResponse } from 'next/server';
import {
  getCurrentWorkspace,
  getWorkspaceSettings,
  updateWorkspaceSettings,
} from '@/lib/data';
import { z } from 'zod';

// GET /api/settings/workspace - Get workspace settings
export async function GET() {
  try {
    const workspace = await getCurrentWorkspace();
    const settings = await getWorkspaceSettings(workspace.id);

    return NextResponse.json({
      workspace: {
        id: workspace.id,
        name: workspace.name,
        slug: workspace.slug,
        plan: workspace.plan,
      },
      settings: settings || {
        alertEmail: null,
        slackWebhookUrl: null,
        defaultScanFrequency: 'DAILY',
        timezone: 'UTC',
      },
    });
  } catch (error) {
    console.error('Error fetching workspace settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch workspace settings' },
      { status: 500 }
    );
  }
}

// PATCH /api/settings/workspace - Update workspace settings
const updateSettingsSchema = z.object({
  alertEmail: z.string().email().optional().nullable(),
  slackWebhookUrl: z.string().url().optional().nullable(),
  defaultScanFrequency: z.enum(['DAILY', 'WEEKLY', 'MANUAL']).optional(),
  timezone: z.string().optional(),
});

export async function PATCH(request: NextRequest) {
  try {
    const workspace = await getCurrentWorkspace();
    const body = await request.json();
    const validatedData = updateSettingsSchema.parse(body);

    const settings = await updateWorkspaceSettings(
      workspace.id,
      validatedData
    );

    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Error updating workspace settings:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update workspace settings' },
      { status: 500 }
    );
  }
}
