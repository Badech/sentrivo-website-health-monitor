import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

/**
 * Data access layer for Sites
 */

export async function getAllSites(workspaceId: string) {
  return prisma.site.findMany({
    where: {
      workspaceId,
      status: { not: 'ARCHIVED' },
    },
    orderBy: {
      lastScanAt: 'desc',
    },
    include: {
      _count: {
        select: {
          scans: true,
          issues: {
            where: { status: 'OPEN' },
          },
        },
      },
    },
  });
}

export async function getSiteById(siteId: string) {
  return prisma.site.findUnique({
    where: { id: siteId },
    include: {
      workspace: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
      _count: {
        select: {
          scans: true,
          issues: {
            where: { status: 'OPEN' },
          },
        },
      },
    },
  });
}

export async function getSiteByDomain(workspaceId: string, domain: string) {
  return prisma.site.findUnique({
    where: {
      workspaceId_domain: {
        workspaceId,
        domain,
      },
    },
  });
}

export async function createSite(data: {
  workspaceId: string;
  name: string;
  domain: string;
  industry?: string;
  scanFrequency?: string;
}) {
  return prisma.site.create({
    data: {
      workspaceId: data.workspaceId,
      name: data.name,
      domain: data.domain,
      industry: data.industry,
      scanFrequency: data.scanFrequency || 'DAILY',
      status: 'ACTIVE',
    },
  });
}

export async function updateSite(
  siteId: string,
  data: Prisma.SiteUpdateInput
) {
  return prisma.site.update({
    where: { id: siteId },
    data,
  });
}

export async function updateSiteHealthScore(
  siteId: string,
  healthScore: number,
  leadRiskScore?: number
) {
  return prisma.site.update({
    where: { id: siteId },
    data: {
      healthScore,
      leadRiskScore,
      lastScanAt: new Date(),
    },
  });
}

export async function deleteSite(siteId: string) {
  // Soft delete by marking as ARCHIVED
  return prisma.site.update({
    where: { id: siteId },
    data: { status: 'ARCHIVED' },
  });
}
