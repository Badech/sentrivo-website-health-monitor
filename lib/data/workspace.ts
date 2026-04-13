import { prisma } from '@/lib/prisma';

/**
 * Data access layer for Workspaces
 * For now, this handles the demo workspace until auth is implemented
 */

const DEMO_WORKSPACE_SLUG = 'demo-workspace';

export async function getDemoWorkspace() {
  const workspace = await prisma.workspace.findUnique({
    where: { slug: DEMO_WORKSPACE_SLUG },
    include: {
      settings: true,
    },
  });

  if (!workspace) {
    throw new Error('Demo workspace not found. Please run: npx prisma db seed');
  }

  return workspace;
}

export async function getWorkspaceById(workspaceId: string) {
  return prisma.workspace.findUnique({
    where: { id: workspaceId },
    include: {
      settings: true,
    },
  });
}

export async function getWorkspaceBySlug(slug: string) {
  return prisma.workspace.findUnique({
    where: { slug },
    include: {
      settings: true,
    },
  });
}

export async function getWorkspaceSettings(workspaceId: string) {
  return prisma.workspaceSetting.findUnique({
    where: { workspaceId },
  });
}

export async function updateWorkspaceSettings(
  workspaceId: string,
  data: {
    alertEmail?: string;
    slackWebhookUrl?: string;
    defaultScanFrequency?: string;
    timezone?: string;
  }
) {
  return prisma.workspaceSetting.upsert({
    where: { workspaceId },
    update: data,
    create: {
      workspaceId,
      ...data,
    },
  });
}

/**
 * Get the default workspace for now
 * This will be replaced with actual workspace detection once auth is implemented
 */
export async function getCurrentWorkspace() {
  return getDemoWorkspace();
}
