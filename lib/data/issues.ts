import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

/**
 * Data access layer for Issues
 */

export async function getIssues(filters?: {
  siteId?: string;
  scanId?: string;
  severity?: string;
  status?: string;
  category?: string;
  limit?: number;
  offset?: number;
}) {
  const {
    siteId,
    scanId,
    severity,
    status,
    category,
    limit = 100,
    offset = 0,
  } = filters || {};

  return prisma.issue.findMany({
    where: {
      ...(siteId && { siteId }),
      ...(scanId && { scanId }),
      ...(severity && { severity }),
      ...(status && { status }),
      ...(category && { category }),
    },
    orderBy: [
      { severity: 'asc' }, // CRITICAL first
      { firstSeenAt: 'desc' },
    ],
    take: limit,
    skip: offset,
    include: {
      site: {
        select: {
          id: true,
          name: true,
          domain: true,
        },
      },
      scan: {
        select: {
          id: true,
          createdAt: true,
        },
      },
      scanPage: {
        select: {
          path: true,
          title: true,
        },
      },
    },
  });
}

export async function getIssueById(issueId: string) {
  return prisma.issue.findUnique({
    where: { id: issueId },
    include: {
      site: {
        select: {
          id: true,
          name: true,
          domain: true,
        },
      },
      scan: {
        select: {
          id: true,
          createdAt: true,
          source: true,
        },
      },
      scanPage: {
        select: {
          path: true,
          title: true,
          pageType: true,
        },
      },
    },
  });
}

export async function createIssue(data: {
  siteId: string;
  scanId: string;
  scanPageId?: string;
  category: string;
  severity: string;
  title: string;
  description: string;
  impactSummary?: string;
  evidenceSummary?: string;
  recommendation?: string;
  estimatedLeadImpact?: string;
  estimatedRevenueImpact?: string;
}) {
  return prisma.issue.create({
    data: {
      ...data,
      status: 'OPEN',
      firstSeenAt: new Date(),
      lastSeenAt: new Date(),
    },
  });
}

export async function updateIssueStatus(
  issueId: string,
  status: string
) {
  const updateData: Prisma.IssueUpdateInput = {
    status,
    lastSeenAt: new Date(),
  };

  if (status === 'RESOLVED') {
    updateData.resolvedAt = new Date();
  }

  return prisma.issue.update({
    where: { id: issueId },
    data: updateData,
  });
}

export async function updateIssue(
  issueId: string,
  data: Prisma.IssueUpdateInput
) {
  return prisma.issue.update({
    where: { id: issueId },
    data: {
      ...data,
      lastSeenAt: new Date(),
    },
  });
}

export async function getIssueCountsBySite(siteId: string) {
  const [critical, warning, total, open] = await Promise.all([
    prisma.issue.count({
      where: { siteId, severity: 'CRITICAL', status: 'OPEN' },
    }),
    prisma.issue.count({
      where: { siteId, severity: 'WARNING', status: 'OPEN' },
    }),
    prisma.issue.count({
      where: { siteId, status: 'OPEN' },
    }),
    prisma.issue.count({
      where: { siteId, status: 'OPEN' },
    }),
  ]);

  return { critical, warning, total, open };
}

export async function getRecentIssuesForSite(
  siteId: string,
  limit: number = 10
) {
  return prisma.issue.findMany({
    where: {
      siteId,
      status: 'OPEN',
    },
    orderBy: [
      { severity: 'asc' },
      { firstSeenAt: 'desc' },
    ],
    take: limit,
    include: {
      scanPage: {
        select: {
          path: true,
        },
      },
    },
  });
}
