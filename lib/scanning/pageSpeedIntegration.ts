/**
 * Google PageSpeed Insights API Integration
 * Provides real performance data for pages
 */

export interface PageSpeedResult {
  success: boolean;
  scores?: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
  metrics?: {
    fcp: number; // First Contentful Paint (ms)
    lcp: number; // Largest Contentful Paint (ms)
    cls: number; // Cumulative Layout Shift
    tbt: number; // Total Blocking Time (ms)
    tti: number; // Time to Interactive (ms)
  };
  issues?: PageSpeedIssue[];
  rawData?: any;
}

export interface PageSpeedIssue {
  category: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  title: string;
  description: string;
  evidence: string;
  recommendation: string;
  impactSummary?: string;
}

/**
 * Get PageSpeed Insights data for a URL
 * Uses the official Google PageSpeed Insights API
 */
export async function getPageSpeedData(
  url: string,
  strategy: 'mobile' | 'desktop' = 'mobile'
): Promise<PageSpeedResult> {
  const apiKey = process.env.PAGESPEED_API_KEY;

  // If no API key, return graceful fallback
  if (!apiKey) {
    console.warn('[PageSpeed] No API key configured, skipping PageSpeed checks');
    return {
      success: false,
      issues: [],
    };
  }

  try {
    const apiUrl = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
    apiUrl.searchParams.set('url', url);
    apiUrl.searchParams.set('key', apiKey);
    apiUrl.searchParams.set('strategy', strategy);
    apiUrl.searchParams.set('category', 'PERFORMANCE');
    apiUrl.searchParams.set('category', 'ACCESSIBILITY');
    apiUrl.searchParams.set('category', 'BEST_PRACTICES');
    apiUrl.searchParams.set('category', 'SEO');

    console.log(`[PageSpeed] Fetching data for ${url} (${strategy})`);

    const response = await fetch(apiUrl.toString(), {
      headers: {
        'User-Agent': 'Sentrivo/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`PageSpeed API returned ${response.status}`);
    }

    const data = await response.json();

    // Extract scores
    const lighthouseResult = data.lighthouseResult;
    const categories = lighthouseResult?.categories || {};

    const scores = {
      performance: Math.round((categories.performance?.score || 0) * 100),
      accessibility: Math.round((categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
      seo: Math.round((categories.seo?.score || 0) * 100),
    };

    // Extract Core Web Vitals
    const audits = lighthouseResult?.audits || {};
    const metrics = {
      fcp: audits['first-contentful-paint']?.numericValue || 0,
      lcp: audits['largest-contentful-paint']?.numericValue || 0,
      cls: audits['cumulative-layout-shift']?.numericValue || 0,
      tbt: audits['total-blocking-time']?.numericValue || 0,
      tti: audits['interactive']?.numericValue || 0,
    };

    // Build issues from PageSpeed findings
    const issues = buildPageSpeedIssues(scores, metrics, strategy);

    console.log(`[PageSpeed] Completed for ${url}. Performance: ${scores.performance}`);

    return {
      success: true,
      scores,
      metrics,
      issues,
      rawData: data,
    };

  } catch (error) {
    console.error('[PageSpeed] API call failed:', error);
    
    return {
      success: false,
      issues: [],
    };
  }
}

/**
 * Build issues from PageSpeed scores and metrics
 */
function buildPageSpeedIssues(
  scores: PageSpeedResult['scores'],
  metrics: PageSpeedResult['metrics'],
  strategy: 'mobile' | 'desktop'
): PageSpeedIssue[] {
  if (!scores || !metrics) return [];

  const issues: PageSpeedIssue[] = [];
  const device = strategy === 'mobile' ? 'mobile' : 'desktop';

  // Poor performance score
  if (scores.performance < 50) {
    issues.push({
      category: 'PERFORMANCE',
      severity: 'CRITICAL',
      title: `Poor ${device} performance score`,
      description: `Page ${device} performance score is ${scores.performance}/100`,
      evidence: `LCP: ${Math.round(metrics.lcp / 1000)}s, FCP: ${Math.round(metrics.fcp / 1000)}s, TBT: ${Math.round(metrics.tbt)}ms`,
      recommendation: 'Optimize images, reduce JavaScript, enable compression, and leverage browser caching',
      impactSummary: `Slow page load increases bounce rate and hurts ${device} conversions`,
    });
  } else if (scores.performance < 70) {
    issues.push({
      category: 'PERFORMANCE',
      severity: 'WARNING',
      title: `${device} performance needs improvement`,
      description: `Page ${device} performance score is ${scores.performance}/100`,
      evidence: `LCP: ${Math.round(metrics.lcp / 1000)}s, FCP: ${Math.round(metrics.fcp / 1000)}s`,
      recommendation: 'Consider optimizing images and reducing render-blocking resources',
      impactSummary: `Below-average performance may impact ${device} user experience`,
    });
  }

  // Poor LCP specifically (key conversion metric)
  if (metrics.lcp > 4000) {
    issues.push({
      category: 'PERFORMANCE',
      severity: 'CRITICAL',
      title: 'Largest Contentful Paint exceeds 4 seconds',
      description: `LCP on ${device} is ${(metrics.lcp / 1000).toFixed(1)}s (target: <2.5s)`,
      evidence: `LCP: ${Math.round(metrics.lcp)}ms`,
      recommendation: 'Optimize images, enable lazy loading, and improve server response time',
      impactSummary: 'Slow content loading directly impacts conversion rates',
    });
  } else if (metrics.lcp > 2500) {
    issues.push({
      category: 'PERFORMANCE',
      severity: 'WARNING',
      title: 'Largest Contentful Paint above recommended threshold',
      description: `LCP on ${device} is ${(metrics.lcp / 1000).toFixed(1)}s (target: <2.5s)`,
      evidence: `LCP: ${Math.round(metrics.lcp)}ms`,
      recommendation: 'Optimize largest image or text block render time',
      impactSummary: 'May affect search rankings and user experience',
    });
  }

  // Poor CLS
  if (metrics.cls > 0.25) {
    issues.push({
      category: 'PERFORMANCE',
      severity: 'WARNING',
      title: 'High Cumulative Layout Shift',
      description: `Layout shift score is ${metrics.cls.toFixed(3)} (target: <0.1)`,
      evidence: `CLS: ${metrics.cls.toFixed(3)}`,
      recommendation: 'Add explicit width/height to images and reserve space for dynamic content',
      impactSummary: 'Unexpected layout shifts create poor user experience',
    });
  }

  // Poor accessibility
  if (scores.accessibility < 70) {
    issues.push({
      category: 'ACCESSIBILITY',
      severity: 'WARNING',
      title: 'Accessibility issues detected',
      description: `Accessibility score is ${scores.accessibility}/100`,
      evidence: `PageSpeed accessibility audit score: ${scores.accessibility}`,
      recommendation: 'Review and fix accessibility issues (ARIA labels, contrast, alt text)',
      impactSummary: 'May exclude users with disabilities and affect legal compliance',
    });
  }

  // Poor SEO
  if (scores.seo < 80) {
    issues.push({
      category: 'SEO',
      severity: 'WARNING',
      title: 'SEO optimization issues',
      description: `SEO score is ${scores.seo}/100`,
      evidence: `PageSpeed SEO audit score: ${scores.seo}`,
      recommendation: 'Add meta descriptions, ensure mobile-friendly, improve page structure',
      impactSummary: 'May impact search engine rankings and organic traffic',
    });
  }

  return issues;
}

/**
 * Get PageSpeed data for both mobile and desktop
 */
export async function getPageSpeedDataBothStrategies(
  url: string
): Promise<{ mobile: PageSpeedResult; desktop: PageSpeedResult }> {
  const [mobile, desktop] = await Promise.all([
    getPageSpeedData(url, 'mobile'),
    getPageSpeedData(url, 'desktop'),
  ]);

  return { mobile, desktop };
}
