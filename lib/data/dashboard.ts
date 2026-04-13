import { prisma } from '@/lib/prisma';
import { getLatestScanForSite } from './scans';
import { getIssueCountsBySite, getRecentIssuesForSite } from './issues';

/**
 * Data access layer for Dashboard aggregations
 */

export async function getDashboardData(siteId: string) {
  // Get site with latest scan info
  const site = await prisma.site.findUnique({
    where: { id: siteId },
    include: {
      workspace: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!site) {
    throw new Error('Site not found');
  }

  // Get latest scan
  const latestScan = await getLatestScanForSite(siteId);

  // Get issue counts
  const issueCounts = await getIssueCountsBySite(siteId);

  // Get recent issues
  const recentIssues = await getRecentIssuesForSite(siteId, 10);

  // Get weekly trend (last 7 days of scans)
  const weeklyTrend = await getWeeklyIssueTrend(siteId);

  return {
    site: {
      id: site.id,
      name: site.name,
      domain: site.domain,
      healthScore: site.healthScore,
      leadRiskScore: site.leadRiskScore,
      lastScanAt: site.lastScanAt,
      status: site.status,
    },
    workspace: site.workspace,
    latestScan: latestScan
      ? {
          id: latestScan.id,
          completedAt: latestScan.completedAt,
          pagesScanned: latestScan.pagesScanned,
          checksRun: latestScan.checksRun,
          healthScore: latestScan.healthScore,
          criticalCount: latestScan.criticalCount,
          warningCount: latestScan.warningCount,
          healthyCount: latestScan.healthyCount,
        }
      : null,
    issueCounts: {
      critical: issueCounts.critical,
      warning: issueCounts.warning,
      total: issueCounts.total,
      open: issueCounts.open,
    },
    recentIssues: recentIssues.map((issue) => ({
      id: issue.id,
      title: issue.title,
      severity: issue.severity,
      category: issue.category,
      page: issue.scanPage?.path || 'N/A',
      firstSeenAt: issue.firstSeenAt,
      impactSummary: issue.impactSummary,
    })),
    weeklyTrend,
  };
}

export async function getWeeklyIssueTrend(siteId: string) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Get scans from last 7 days
  const scans = await prisma.scan.findMany({
    where: {
      siteId,
      status: 'COMPLETED',
      completedAt: {
        gte: sevenDaysAgo,
      },
    },
    orderBy: {
      completedAt: 'asc',
    },
    select: {
      id: true,
      completedAt: true,
      criticalCount: true,
      warningCount: true,
      healthyCount: true,
    },
  });

  // Group by day
  const trendByDay: { [key: string]: { critical: number; warning: number; healthy: number; count: number } } = {};

  scans.forEach((scan) => {
    if (!scan.completedAt) return;

    const day = scan.completedAt.toISOString().split('T')[0];
    if (!trendByDay[day]) {
      trendByDay[day] = { critical: 0, warning: 0, healthy: 0, count: 0 };
    }

    trendByDay[day].critical += scan.criticalCount;
    trendByDay[day].warning += scan.warningCount;
    trendByDay[day].healthy += scan.healthyCount;
    trendByDay[day].count += 1;
  });

  // Convert to array format
  return Object.entries(trendByDay).map(([day, data]) => ({
    day,
    critical: Math.round(data.critical / data.count),
    warning: Math.round(data.warning / data.count),
    healthy: Math.round(data.healthy / data.count),
    total: Math.round((data.critical + data.warning + data.healthy) / data.count),
  }));
}

export async function getWorkspaceSummary(workspaceId: string) {
  const [sites, totalScans, openIssues, criticalIssues] = await Promise.all([
    prisma.site.count({
      where: {
        workspaceId,
        status: 'ACTIVE',
      },
    }),
    prisma.scan.count({
      where: {
        site: { workspaceId },
        status: 'COMPLETED',
      },
    }),
    prisma.issue.count({
      where: {
        site: { workspaceId },
        status: 'OPEN',
      },
    }),
    prisma.issue.count({
      where: {
        site: { workspaceId },
        status: 'OPEN',
        severity: 'CRITICAL',
      },
    }),
  ]);

  // Get average health score across all sites
  const sitesWithScores = await prisma.site.findMany({
    where: {
      workspaceId,
      status: 'ACTIVE',
      healthScore: { not: null },
    },
    select: {
      healthScore: true,
    },
  });

  const avgHealthScore =
    sitesWithScores.length > 0
      ? Math.round(
          sitesWithScores.reduce((sum, site) => sum + (site.healthScore || 0), 0) /
            sitesWithScores.length
        )
      : null;

  return {
    sites,
    totalScans,
    openIssues,
    criticalIssues,
    avgHealthScore,
  };
}
