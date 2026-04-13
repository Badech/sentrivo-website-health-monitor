import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

/**
 * Data access layer for Scans
 */

export async function getScansBySite(
  siteId: string,
  options?: {
    limit?: number;
    offset?: number;
    source?: string;
  }
) {
  const { limit = 50, offset = 0, source } = options || {};

  return prisma.scan.findMany({
    where: {
      siteId,
      ...(source && { source }),
    },
    orderBy: {
      createdAt: 'desc',
    },
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
      _count: {
        select: {
          issues: true,
          pages: true,
        },
      },
    },
  });
}

export async function getScanById(scanId: string) {
  return prisma.scan.findUnique({
    where: { id: scanId },
    include: {
      site: {
        select: {
          id: true,
          name: true,
          domain: true,
          workspaceId: true,
        },
      },
      pages: {
        orderBy: { path: 'asc' },
      },
      issues: {
        orderBy: [
          { severity: 'asc' }, // CRITICAL first (alphabetically)
          { firstSeenAt: 'desc' },
        ],
      },
    },
  });
}

export async function createScan(data: {
  siteId: string;
  source?: string;
  status?: string;
}) {
  return prisma.scan.create({
    data: {
      siteId: data.siteId,
      source: data.source || 'LIVE',
      status: data.status || 'QUEUED',
    },
  });
}

export async function updateScan(
  scanId: string,
  data: Prisma.ScanUpdateInput
) {
  return prisma.scan.update({
    where: { id: scanId },
    data,
  });
}

export async function completeScan(
  scanId: string,
  results: {
    pagesScanned: number;
    checksRun: number;
    healthScore?: number;
    criticalCount: number;
    warningCount: number;
    healthyCount: number;
    summaryJson?: any;
  }
) {
  return prisma.scan.update({
    where: { id: scanId },
    data: {
      status: 'COMPLETED',
      pagesScanned: results.pagesScanned,
      checksRun: results.checksRun,
      healthScore: results.healthScore,
      criticalCount: results.criticalCount,
      warningCount: results.warningCount,
      healthyCount: results.healthyCount,
      completedAt: new Date(),
      summaryJson: results.summaryJson,
    },
  });
}

export async function failScan(scanId: string, error?: string) {
  return prisma.scan.update({
    where: { id: scanId },
    data: {
      status: 'FAILED',
      completedAt: new Date(),
      summaryJson: { error },
    },
  });
}

export async function getLatestScanForSite(siteId: string) {
  return prisma.scan.findFirst({
    where: {
      siteId,
      status: 'COMPLETED',
    },
    orderBy: {
      completedAt: 'desc',
    },
  });
}
