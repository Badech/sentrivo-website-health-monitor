import { prisma } from '@/lib/prisma';
import { updateScan, completeScan, createIssue } from '@/lib/data';
import { getRandomIssues } from './issueCatalog';

/**
 * Demo scan engine - generates deterministic sample data
 * This simulates a real scan without actual Playwright/browser automation
 */

interface ScanPageData {
  path: string;
  title: string;
  pageType?: string;
}

const SAMPLE_PAGES: ScanPageData[] = [
  { path: '/', title: 'Home - Professional Plumbing Services', pageType: 'home' },
  { path: '/contact', title: 'Contact Us', pageType: 'contact' },
  { path: '/services', title: 'Our Services', pageType: 'services' },
  { path: '/services/emergency', title: 'Emergency Plumbing', pageType: 'services' },
  { path: '/services/installation', title: 'Installation Services', pageType: 'services' },
  { path: '/about', title: 'About Our Company', pageType: 'about' },
  { path: '/pricing', title: 'Pricing & Estimates', pageType: 'pricing' },
  { path: '/gallery', title: 'Project Gallery', pageType: 'gallery' },
  { path: '/schedule', title: 'Schedule Appointment', pageType: 'schedule' },
  { path: '/testimonials', title: 'Customer Reviews', pageType: 'testimonials' },
];

export async function runDemoScan(scanId: string): Promise<void> {
  console.log(`[Demo Scan] Starting scan ${scanId}`);

  try {
    // Update scan to RUNNING
    await updateScan(scanId, {
      status: 'RUNNING',
      startedAt: new Date(),
    });

    const scan = await prisma.scan.findUnique({
      where: { id: scanId },
      include: { site: true },
    });

    if (!scan) {
      throw new Error('Scan not found');
    }

    // Simulate page discovery
    const pagesToScan = SAMPLE_PAGES.slice(0, Math.floor(Math.random() * 10) + 40); // 40-50 pages
    const scanPages = [];

    for (const pageData of pagesToScan) {
      const scanPage = await prisma.scanPage.create({
        data: {
          scanId: scan.id,
          siteId: scan.siteId,
          path: pageData.path,
          title: pageData.title,
          pageType: pageData.pageType,
          deviceSummary: {
            desktop: {
              loadTime: Math.random() * 2 + 1, // 1-3s
              lcp: Math.random() * 2 + 1.5, // 1.5-3.5s
            },
            mobile: {
              loadTime: Math.random() * 3 + 2, // 2-5s
              lcp: Math.random() * 3 + 2.5, // 2.5-5.5s
            },
          },
        },
      });
      scanPages.push(scanPage);
    }

    console.log(`[Demo Scan] Discovered ${scanPages.length} pages`);

    // Generate random issues
    const issueTemplates = getRandomIssues(Math.floor(Math.random() * 3) + 3); // 3-5 issues
    const createdIssues = [];

    for (const template of issueTemplates) {
      // Find a matching page or use first page
      const scanPage = scanPages.find(
        (p) => p.pageType && template.affectedPageTypes?.includes(p.pageType)
      ) || scanPages[0];

      const issue = await createIssue({
        siteId: scan.siteId,
        scanId: scan.id,
        scanPageId: scanPage?.id,
        category: template.category,
        severity: template.severity,
        title: template.titleTemplate,
        description: template.descriptionTemplate,
        impactSummary: template.impactTemplate,
        evidenceSummary: template.evidenceTemplate,
        recommendation: template.recommendationTemplate,
        estimatedLeadImpact: template.estimatedLeadImpact,
      });

      createdIssues.push(issue);
    }

    console.log(`[Demo Scan] Created ${createdIssues.length} issues`);

    // Calculate health score
    const criticalCount = createdIssues.filter((i) => i.severity === 'CRITICAL').length;
    const warningCount = createdIssues.filter((i) => i.severity === 'WARNING').length;
    const healthScore = Math.max(0, 100 - (criticalCount * 15) - (warningCount * 5));

    // Complete scan
    await completeScan(scanId, {
      pagesScanned: scanPages.length,
      checksRun: scanPages.length * 3, // Simulate 3 checks per page
      healthScore,
      criticalCount,
      warningCount,
      healthyCount: 12, // Some healthy checks
      summaryJson: {
        duration: '2m 14s',
        totalIssues: createdIssues.length,
        pagesWithIssues: new Set(createdIssues.map((i) => i.scanPageId)).size,
      },
    });

    // Update site health score
    await prisma.site.update({
      where: { id: scan.siteId },
      data: {
        healthScore,
        leadRiskScore: Math.min(100, criticalCount * 12 + warningCount * 6),
        lastScanAt: new Date(),
      },
    });

    console.log(`[Demo Scan] Completed successfully. Health score: ${healthScore}`);
  } catch (error) {
    console.error('[Demo Scan] Failed:', error);
    
    await updateScan(scanId, {
      status: 'FAILED',
      completedAt: new Date(),
      summaryJson: {
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    });

    throw error;
  }
}

/**
 * Queue and execute a demo scan
 */
export async function queueDemoScan(siteId: string): Promise<string> {
  const scan = await prisma.scan.create({
    data: {
      siteId,
      source: 'DEMO',
      status: 'QUEUED',
    },
  });

  // Execute scan (in production, this would be queued to a job system)
  // For now, we'll run it immediately in the background
  runDemoScan(scan.id).catch((error) => {
    console.error('Demo scan failed:', error);
  });

  return scan.id;
}
