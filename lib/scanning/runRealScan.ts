import { prisma } from '@/lib/prisma';
import { updateScan, completeScan, failScan, createIssue } from '@/lib/data';
import { crawlSite, normalizeUrl } from './crawlSite';
import { runBrowserChecks } from './browserChecks';
import { getPageSpeedData } from './pageSpeedIntegration';
import { getSearchConsoleData, getGA4Data } from './integrations';
import {
  buildIssuesFromFindings,
  normalizeBrowserFindings,
  normalizePageSpeedFindings,
  prioritizeIssues,
  IssueFinding,
} from './issueBuilder';

/**
 * REAL scan engine - performs actual web checks using Playwright and APIs
 * This is the production scan flow that replaces the demo scan
 */

export interface RealScanOptions {
  maxPages?: number;
  includePageSpeed?: boolean;
  includeSearchConsole?: boolean;
  includeGA4?: boolean;
  timeout?: number;
}

/**
 * Run a complete real scan of a website
 */
export async function runRealScan(
  scanId: string,
  options: RealScanOptions = {}
): Promise<void> {
  const {
    maxPages = 50,
    includePageSpeed = true,
    includeSearchConsole = false,
    includeGA4 = false,
    timeout = 30000,
  } = options;

  console.log(`[Real Scan] Starting scan ${scanId}`);

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

    const site = scan.site;
    console.log(`[Real Scan] Scanning site: ${site.domain}`);

    // ============================================
    // STEP 1: CRAWL & DISCOVER PAGES
    // ============================================
    console.log('[Real Scan] Step 1: Discovering pages...');
    const discoveredPages = await crawlSite(site.domain, { maxPages, timeout });
    console.log(`[Real Scan] Discovered ${discoveredPages.length} pages`);

    // Persist discovered pages as ScanPage records
    const scanPageMap = new Map<string, string>(); // url -> scanPageId
    
    for (const page of discoveredPages) {
      const scanPage = await prisma.scanPage.create({
        data: {
          scanId: scan.id,
          siteId: site.id,
          path: page.path,
          title: page.title,
          pageType: page.pageType,
        },
      });
      scanPageMap.set(normalizeUrl(page.url), scanPage.id);
    }

    // ============================================
    // STEP 2: RUN BROWSER CHECKS ON KEY PAGES
    // ============================================
    console.log('[Real Scan] Step 2: Running browser checks...');
    
    // Prioritize key pages for detailed checks
    const priorityPages = discoveredPages
      .filter(p => ['home', 'contact', 'booking', 'services'].includes(p.pageType || ''))
      .slice(0, 10); // Check top 10 priority pages

    const allFindings: IssueFinding[] = [];
    let checksRun = 0;

    for (const page of priorityPages) {
      try {
        console.log(`[Real Scan] Checking ${page.url}...`);
        
        // Run browser checks
        const browserResult = await runBrowserChecks(page.url, { timeout });
        if (browserResult.success && browserResult.issues) {
          const browserFindings = normalizeBrowserFindings(browserResult.issues, page.url);
          allFindings.push(...browserFindings);
        }
        checksRun += 5; // Assume ~5 checks per page

        // Optional: Run PageSpeed check
        if (includePageSpeed && ['home', 'contact', 'booking'].includes(page.pageType || '')) {
          const pageSpeedResult = await getPageSpeedData(page.url, 'mobile');
          if (pageSpeedResult.success && pageSpeedResult.issues) {
            const pageSpeedFindings = normalizePageSpeedFindings(pageSpeedResult.issues, page.url);
            allFindings.push(...pageSpeedFindings);
          }
          checksRun += 4; // PageSpeed counts as 4 checks
        }

      } catch (error) {
        console.error(`[Real Scan] Error checking ${page.url}:`, error);
        // Continue with other pages
      }
    }

    console.log(`[Real Scan] Completed ${checksRun} checks, found ${allFindings.length} findings`);

    // ============================================
    // STEP 3: ENRICH WITH INTEGRATIONS (OPTIONAL)
    // ============================================
    if (includeSearchConsole) {
      console.log('[Real Scan] Step 3a: Fetching Search Console data...');
      try {
        const searchConsoleData = await getSearchConsoleData(site.id, site.domain);
        // Process Search Console data if available
        if (searchConsoleData.success) {
          console.log('[Real Scan] Search Console data retrieved');
        }
      } catch (error) {
        console.error('[Real Scan] Search Console fetch failed:', error);
      }
    }

    if (includeGA4) {
      console.log('[Real Scan] Step 3b: Fetching GA4 data...');
      try {
        const ga4Data = await getGA4Data(site.id);
        // Process GA4 data if available
        if (ga4Data.success) {
          console.log('[Real Scan] GA4 data retrieved');
        }
      } catch (error) {
        console.error('[Real Scan] GA4 fetch failed:', error);
      }
    }

    // ============================================
    // STEP 4: BUILD AND PERSIST ISSUES
    // ============================================
    console.log('[Real Scan] Step 4: Building issues from findings...');
    
    const issuesToCreate = buildIssuesFromFindings(
      allFindings,
      site.id,
      scan.id,
      scanPageMap
    );

    const prioritizedIssues = prioritizeIssues(issuesToCreate);

    // Persist issues to database
    const createdIssues = [];
    for (const issueData of prioritizedIssues) {
      const issue = await createIssue(issueData);
      createdIssues.push(issue);
    }

    console.log(`[Real Scan] Created ${createdIssues.length} issues`);

    // ============================================
    // STEP 5: CALCULATE HEALTH SCORE
    // ============================================
    const criticalCount = createdIssues.filter(i => i.severity === 'CRITICAL').length;
    const warningCount = createdIssues.filter(i => i.severity === 'WARNING').length;
    const infoCount = createdIssues.filter(i => i.severity === 'INFO').length;
    
    // Health score: 100 - (critical*15) - (warning*5) - (info*2)
    const healthScore = Math.max(0, 100 - (criticalCount * 15) - (warningCount * 5) - (infoCount * 2));
    
    // Lead risk score: weight critical issues heavily
    const leadRiskScore = Math.min(100, (criticalCount * 20) + (warningCount * 8));

    // ============================================
    // STEP 6: COMPLETE SCAN
    // ============================================
    await completeScan(scanId, {
      pagesScanned: discoveredPages.length,
      checksRun,
      healthScore,
      criticalCount,
      warningCount,
      healthyCount: checksRun - (criticalCount + warningCount + infoCount),
      summaryJson: {
        pagesDiscovered: discoveredPages.length,
        pagesChecked: priorityPages.length,
        checksPerformed: checksRun,
        totalIssues: createdIssues.length,
        issueBreakdown: {
          critical: criticalCount,
          warning: warningCount,
          info: infoCount,
        },
      },
    });

    // Update site health scores
    await prisma.site.update({
      where: { id: site.id },
      data: {
        healthScore,
        leadRiskScore,
        lastScanAt: new Date(),
      },
    });

    console.log(`[Real Scan] ✅ Completed successfully. Health score: ${healthScore}, Lead risk: ${leadRiskScore}%`);

  } catch (error) {
    console.error('[Real Scan] ❌ Failed:', error);
    
    await failScan(scanId, error instanceof Error ? error.message : 'Unknown error');
    
    throw error;
  }
}

/**
 * Queue and execute a real scan
 */
export async function queueRealScan(
  siteId: string,
  options?: RealScanOptions
): Promise<string> {
  const scan = await prisma.scan.create({
    data: {
      siteId,
      source: 'LIVE',
      status: 'QUEUED',
    },
  });

  console.log(`[Real Scan] Queued scan ${scan.id} for site ${siteId}`);

  // Execute scan immediately (in production, use a job queue like BullMQ)
  runRealScan(scan.id, options).catch((error) => {
    console.error(`[Real Scan] Scan ${scan.id} failed:`, error);
  });

  return scan.id;
}
