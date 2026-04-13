import { BrowserIssue } from './browserChecks';
import { PageSpeedIssue } from './pageSpeedIntegration';

/**
 * Build Issue records from scan findings
 * Converts raw findings into structured database records
 */

export interface IssueFinding {
  category: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  title: string;
  description: string;
  evidence: string;
  recommendation: string;
  impactSummary?: string;
  affectedElement?: string;
  pageUrl?: string;
  source: 'browser' | 'pagespeed' | 'searchconsole' | 'ga4';
}

export interface IssueToCreate {
  siteId: string;
  scanId: string;
  scanPageId?: string;
  category: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  title: string;
  description: string;
  impactSummary?: string;
  evidenceSummary?: string;
  recommendation?: string;
  estimatedLeadImpact?: string;
  estimatedRevenueImpact?: string;
}

/**
 * Convert all findings into Issue records
 */
export function buildIssuesFromFindings(
  findings: IssueFinding[],
  siteId: string,
  scanId: string,
  scanPageMap: Map<string, string> // url -> scanPageId
): IssueToCreate[] {
  const issues: IssueToCreate[] = [];
  const seenIssues = new Set<string>();

  for (const finding of findings) {
    // Create a unique key to deduplicate similar issues
    const issueKey = `${finding.category}:${finding.title}:${finding.pageUrl || 'global'}`;
    
    if (seenIssues.has(issueKey)) {
      continue; // Skip duplicate
    }
    seenIssues.add(issueKey);

    // Get scanPageId if available
    const scanPageId = finding.pageUrl ? scanPageMap.get(finding.pageUrl) : undefined;

    // Build the issue record
    const issue: IssueToCreate = {
      siteId,
      scanId,
      scanPageId,
      category: finding.category,
      severity: finding.severity,
      title: finding.title,
      description: finding.description,
      impactSummary: finding.impactSummary || buildDefaultImpact(finding),
      evidenceSummary: finding.evidence,
      recommendation: finding.recommendation,
      estimatedLeadImpact: estimateLeadImpact(finding),
      estimatedRevenueImpact: estimateRevenueImpact(finding),
    };

    issues.push(issue);
  }

  console.log(`[Issue Builder] Built ${issues.length} unique issues from ${findings.length} findings`);
  
  return issues;
}

/**
 * Convert browser findings to standard format
 */
export function normalizeBrowserFindings(
  browserIssues: BrowserIssue[],
  pageUrl: string
): IssueFinding[] {
  return browserIssues.map(issue => ({
    category: issue.category,
    severity: issue.severity,
    title: issue.title,
    description: issue.description,
    evidence: issue.evidence,
    recommendation: issue.recommendation,
    impactSummary: issue.impactSummary,
    affectedElement: issue.affectedElement,
    pageUrl,
    source: 'browser' as const,
  }));
}

/**
 * Convert PageSpeed findings to standard format
 */
export function normalizePageSpeedFindings(
  pageSpeedIssues: PageSpeedIssue[],
  pageUrl: string
): IssueFinding[] {
  return pageSpeedIssues.map(issue => ({
    category: issue.category,
    severity: issue.severity,
    title: issue.title,
    description: issue.description,
    evidence: issue.evidence,
    recommendation: issue.recommendation,
    impactSummary: issue.impactSummary,
    pageUrl,
    source: 'pagespeed' as const,
  }));
}

/**
 * Build default impact statement based on issue category and severity
 */
function buildDefaultImpact(finding: IssueFinding): string {
  const impactMap: Record<string, string> = {
    FORM: 'Users cannot complete form submissions, blocking lead generation',
    CTA: 'Primary conversion action is not accessible to users',
    PHONE: 'Mobile users may not be able to initiate phone calls',
    MOBILE_UX: 'Poor mobile experience may increase bounce rate',
    PERFORMANCE: 'Slow page load reduces conversions and affects search rankings',
    ACCESSIBILITY: 'May exclude users with disabilities and affect compliance',
    SEO: 'May reduce organic traffic and search visibility',
  };

  return impactMap[finding.category] || 'May impact user experience and conversions';
}

/**
 * Estimate lead impact based on issue type
 */
function estimateLeadImpact(finding: IssueFinding): string | undefined {
  if (finding.severity === 'CRITICAL') {
    if (finding.category === 'FORM') {
      return 'HIGH - Blocks all form submissions';
    }
    if (finding.category === 'CTA') {
      return 'HIGH - Hides primary conversion action';
    }
    if (finding.category === 'PHONE') {
      return 'MEDIUM - Reduces mobile call conversions';
    }
  }

  if (finding.severity === 'WARNING') {
    if (finding.category === 'PERFORMANCE') {
      return 'MEDIUM - Slow pages increase bounce rate';
    }
    if (finding.category === 'MOBILE_UX') {
      return 'MEDIUM - Poor mobile UX reduces conversions';
    }
  }

  return undefined;
}

/**
 * Estimate revenue impact based on issue type
 */
function estimateRevenueImpact(finding: IssueFinding): string | undefined {
  // Only estimate for critical conversion-blocking issues
  if (finding.severity === 'CRITICAL') {
    if (finding.category === 'FORM') {
      return 'Potential loss: $2,000-$5,000/month for typical local service business';
    }
    if (finding.category === 'CTA') {
      return 'Potential loss: $1,500-$4,000/month for typical local service business';
    }
  }

  return undefined;
}

/**
 * Prioritize issues for reporting
 */
export function prioritizeIssues(issues: IssueToCreate[]): IssueToCreate[] {
  const severityWeight = {
    CRITICAL: 3,
    WARNING: 2,
    INFO: 1,
  };

  const categoryWeight: Record<string, number> = {
    FORM: 10,
    CTA: 9,
    PHONE: 8,
    MOBILE_UX: 7,
    PERFORMANCE: 6,
    ACCESSIBILITY: 5,
    SEO: 4,
  };

  return issues.sort((a, b) => {
    const aScore = 
      (severityWeight[a.severity] || 0) * 100 + 
      (categoryWeight[a.category] || 0);
    const bScore = 
      (severityWeight[b.severity] || 0) * 100 + 
      (categoryWeight[b.category] || 0);
    
    return bScore - aScore;
  });
}
