import { prisma } from '@/lib/prisma';

/**
 * Data access layer for Reports
 */

export async function getReportsBySite(
  siteId: string,
  options?: {
    limit?: number;
    offset?: number;
    kind?: string;
  }
) {
  const { limit = 50, offset = 0, kind } = options || {};

  return prisma.report.findMany({
    where: {
      siteId,
      ...(kind && { kind }),
    },
    orderBy: {
      generatedAt: 'desc',
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
      scan: {
        select: {
          id: true,
          createdAt: true,
        },
      },
    },
  });
}

export async function getReportById(reportId: string) {
  return prisma.report.findUnique({
    where: { id: reportId },
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
          healthScore: true,
          pagesScanned: true,
          checksRun: true,
          criticalCount: true,
          warningCount: true,
          healthyCount: true,
          completedAt: true,
        },
      },
    },
  });
}

export async function createReport(data: {
  siteId: string;
  scanId?: string;
  kind: string;
  title: string;
  executiveSummary: string;
  data: any;
}) {
  return prisma.report.create({
    data: {
      ...data,
      generatedAt: new Date(),
    },
  });
}

export async function generateReportFromScan(
  scanId: string
): Promise<any> {
  // Get scan with all related data
  const scan = await prisma.scan.findUnique({
    where: { id: scanId },
    include: {
      site: true,
      issues: {
        orderBy: [
          { severity: 'asc' },
          { firstSeenAt: 'desc' },
        ],
      },
      pages: true,
    },
  });

  if (!scan) {
    throw new Error('Scan not found');
  }

  // Build report data
  const criticalIssues = scan.issues.filter((i) => i.severity === 'CRITICAL');
  const warningIssues = scan.issues.filter((i) => i.severity === 'WARNING');

  const reportData = {
    scanId: scan.id,
    site: scan.site.domain,
    scanDate: scan.completedAt,
    healthScore: scan.healthScore,
    pagesScanned: scan.pagesScanned,
    checksRun: scan.checksRun,
    totalIssues: scan.issues.length,
    criticalCount: scan.criticalCount,
    warningCount: scan.warningCount,
    healthyCount: scan.healthyCount,
    criticalIssues: criticalIssues.map((issue) => ({
      title: issue.title,
      category: issue.category,
      description: issue.description,
      impact: issue.impactSummary,
      evidence: issue.evidenceSummary,
      recommendation: issue.recommendation,
    })),
    warningIssues: warningIssues.map((issue) => ({
      title: issue.title,
      category: issue.category,
      description: issue.description,
      impact: issue.impactSummary,
      recommendation: issue.recommendation,
    })),
    pages: scan.pages.map((page) => ({
      path: page.path,
      title: page.title,
      pageType: page.pageType,
    })),
  };

  // Create executive summary
  const executiveSummary = `This report covers website health monitoring for ${scan.site.domain}. Our automated scans detected ${scan.criticalCount} critical issues that are actively blocking conversions and should be addressed immediately.`;

  // Create report record
  const report = await prisma.report.create({
    data: {
      siteId: scan.siteId,
      scanId: scan.id,
      kind: 'SCAN_SUMMARY',
      title: `Website Health Report - ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
      executiveSummary,
      data: reportData,
      generatedAt: new Date(),
    },
  });

  return report;
}
