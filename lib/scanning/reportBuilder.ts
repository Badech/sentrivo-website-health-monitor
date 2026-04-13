import { generateReportFromScan } from '@/lib/data';

/**
 * Report Builder - Generates reports from scan data
 */

export interface ReportOptions {
  scanId: string;
  kind?: 'SCAN_SUMMARY' | 'WEEKLY' | 'MONTHLY';
  includeScreenshots?: boolean;
}

/**
 * Build a report from a scan
 * This is a wrapper around the data layer function with additional formatting
 */
export async function buildReport(options: ReportOptions) {
  const { scanId } = options;

  // Generate report using data layer
  const report = await generateReportFromScan(scanId);

  console.log(`[Report Builder] Generated report ${report.id} for scan ${scanId}`);

  return report;
}

/**
 * Build a weekly summary report
 * Aggregates multiple scans from the past week
 */
export async function buildWeeklySummary(siteId: string) {
  // TODO: Implement weekly aggregation
  // For now, this is a placeholder for future enhancement
  throw new Error('Weekly summary not yet implemented');
}

/**
 * Build a monthly summary report
 */
export async function buildMonthlySummary(siteId: string) {
  // TODO: Implement monthly aggregation
  throw new Error('Monthly summary not yet implemented');
}
