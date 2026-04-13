import { chromium, Browser, Page } from 'playwright';

/**
 * Real browser-based checks using Playwright
 */

export interface BrowserCheckResult {
  success: boolean;
  issues: BrowserIssue[];
  metadata?: Record<string, any>;
}

export interface BrowserIssue {
  category: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  title: string;
  description: string;
  evidence: string;
  recommendation: string;
  impactSummary?: string;
  affectedElement?: string;
}

interface CheckOptions {
  timeout?: number;
  viewport?: { width: number; height: number };
}

/**
 * Run comprehensive browser checks on a page
 */
export async function runBrowserChecks(
  url: string,
  options: CheckOptions = {}
): Promise<BrowserCheckResult> {
  const { timeout = 30000 } = options;
  
  let browser: Browser | null = null;
  const issues: BrowserIssue[] = [];

  try {
    console.log(`[Browser] Starting checks for ${url}`);
    
    browser = await chromium.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    // Desktop checks
    const desktopIssues = await runDesktopChecks(browser, url, timeout);
    issues.push(...desktopIssues);

    // Mobile checks
    const mobileIssues = await runMobileChecks(browser, url, timeout);
    issues.push(...mobileIssues);

    console.log(`[Browser] Found ${issues.length} issues on ${url}`);

    return {
      success: true,
      issues,
      metadata: {
        timestamp: new Date().toISOString(),
        url,
      },
    };

  } catch (error) {
    console.error('[Browser] Error during checks:', error);
    
    return {
      success: false,
      issues,
      metadata: {
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    };

  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

/**
 * Run checks on desktop viewport
 */
async function runDesktopChecks(
  browser: Browser,
  url: string,
  timeout: number
): Promise<BrowserIssue[]> {
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  });

  const issues: BrowserIssue[] = [];

  try {
    await page.goto(url, { timeout, waitUntil: 'networkidle' });

    // Check for forms
    const formIssues = await checkForms(page, 'desktop');
    issues.push(...formIssues);

    // Check for CTAs
    const ctaIssues = await checkCTAs(page, 'desktop');
    issues.push(...ctaIssues);

    // Check for phone links
    const phoneIssues = await checkPhoneLinks(page);
    issues.push(...phoneIssues);

  } catch (error) {
    console.error('[Browser] Desktop checks failed:', error);
  } finally {
    await page.close();
  }

  return issues;
}

/**
 * Run checks on mobile viewport
 */
async function runMobileChecks(
  browser: Browser,
  url: string,
  timeout: number
): Promise<BrowserIssue[]> {
  const page = await browser.newPage({
    viewport: { width: 375, height: 667 }, // iPhone SE
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
    isMobile: true,
    hasTouch: true,
  });

  const issues: BrowserIssue[] = [];

  try {
    await page.goto(url, { timeout, waitUntil: 'networkidle' });

    // Check CTA visibility on mobile
    const ctaIssues = await checkMobileCTAVisibility(page);
    issues.push(...ctaIssues);

    // Check mobile-specific issues
    const mobileIssues = await checkMobileUX(page);
    issues.push(...mobileIssues);

  } catch (error) {
    console.error('[Browser] Mobile checks failed:', error);
  } finally {
    await page.close();
  }

  return issues;
}

/**
 * Check forms for common issues
 */
async function checkForms(page: Page, device: 'desktop' | 'mobile'): Promise<BrowserIssue[]> {
  const issues: BrowserIssue[] = [];

  try {
    const forms = await page.$$('form');
    
    for (let i = 0; i < forms.length; i++) {
      const form = forms[i];
      
      // Check if form has a submit button
      const submitButton = await form.$('button[type="submit"], input[type="submit"]');
      if (!submitButton) {
        issues.push({
          category: 'FORM',
          severity: 'WARNING',
          title: 'Form missing submit button',
          description: `Form #${i + 1} has no visible submit button`,
          evidence: 'No button[type="submit"] or input[type="submit"] found within form',
          recommendation: 'Add a clearly labeled submit button to the form',
          impactSummary: 'Users cannot submit the form',
        });
        continue;
      }

      // Check if form has required fields
      const inputs = await form.$$('input, textarea, select');
      const hasRequiredFields = await Promise.all(
        inputs.map(input => input.getAttribute('required'))
      );

      if (inputs.length === 0) {
        issues.push({
          category: 'FORM',
          severity: 'WARNING',
          title: 'Form has no input fields',
          description: `Form #${i + 1} contains no input fields`,
          evidence: 'No input, textarea, or select elements found',
          recommendation: 'Add form fields or remove the form element',
          impactSummary: 'Form cannot collect user data',
        });
      }

      // Try to check if form is visible
      const isVisible = await submitButton.isVisible();
      if (!isVisible) {
        issues.push({
          category: 'FORM',
          severity: 'CRITICAL',
          title: 'Form submit button is hidden',
          description: `Form #${i + 1} submit button is not visible on ${device}`,
          evidence: 'Submit button has display:none, visibility:hidden, or is positioned off-screen',
          recommendation: 'Ensure submit button is visible to users',
          impactSummary: 'Users cannot see how to submit the form',
        });
      }
    }

  } catch (error) {
    console.error('[Forms] Check failed:', error);
  }

  return issues;
}

/**
 * Check CTAs (Call-to-Action buttons)
 */
async function checkCTAs(page: Page, device: 'desktop' | 'mobile'): Promise<BrowserIssue[]> {
  const issues: BrowserIssue[] = [];

  try {
    // Common CTA selectors
    const ctaSelectors = [
      'button:has-text("Book")',
      'button:has-text("Schedule")',
      'button:has-text("Contact")',
      'button:has-text("Call")',
      'a:has-text("Book Now")',
      'a:has-text("Get Started")',
      'a:has-text("Request Quote")',
    ];

    for (const selector of ctaSelectors) {
      try {
        const elements = await page.$$(selector);
        
        for (const element of elements) {
          const isVisible = await element.isVisible();
          const text = await element.textContent();
          
          if (!isVisible && text) {
            issues.push({
              category: 'CTA',
              severity: 'CRITICAL',
              title: `CTA button invisible on ${device}`,
              description: `"${text.trim()}" button is not visible to users`,
              evidence: 'Button element exists but is not visible in viewport',
              recommendation: 'Ensure CTA button is visible and accessible',
              impactSummary: 'Primary conversion action is hidden from users',
              affectedElement: text.trim(),
            });
          }
        }
      } catch {
        // Selector not found, continue
      }
    }

  } catch (error) {
    console.error('[CTA] Check failed:', error);
  }

  return issues;
}

/**
 * Check mobile-specific CTA visibility
 */
async function checkMobileCTAVisibility(page: Page): Promise<BrowserIssue[]> {
  const issues: BrowserIssue[] = [];

  try {
    // Check if primary CTAs are above the fold
    const viewport = page.viewportSize();
    if (!viewport) return issues;

    const buttons = await page.$$('button, a.button, .btn, [role="button"]');
    
    for (const button of buttons) {
      const text = await button.textContent();
      if (!text || text.trim().length === 0) continue;

      const box = await button.boundingBox();
      if (!box) continue;

      // Check if button is above the fold
      const isAboveFold = box.y < viewport.height;
      const isVisible = await button.isVisible();

      if (!isAboveFold && isVisible) {
        const buttonText = text.trim();
        if (
          buttonText.toLowerCase().includes('book') ||
          buttonText.toLowerCase().includes('call') ||
          buttonText.toLowerCase().includes('contact') ||
          buttonText.toLowerCase().includes('schedule')
        ) {
          issues.push({
            category: 'MOBILE_UX',
            severity: 'WARNING',
            title: 'Primary CTA below the fold on mobile',
            description: `"${buttonText}" button is not immediately visible on mobile`,
            evidence: `Button positioned at ${Math.round(box.y)}px, viewport height is ${viewport.height}px`,
            recommendation: 'Move primary CTA above the fold for mobile users',
            impactSummary: 'Mobile users must scroll to see main conversion action',
          });
        }
      }
    }

  } catch (error) {
    console.error('[Mobile CTA] Check failed:', error);
  }

  return issues;
}

/**
 * Check phone links
 */
async function checkPhoneLinks(page: Page): Promise<BrowserIssue[]> {
  const issues: BrowserIssue[] = [];

  try {
    const phoneLinks = await page.$$('a[href^="tel:"]');
    
    for (const link of phoneLinks) {
      const href = await link.getAttribute('href');
      if (!href) continue;

      // Check for common formatting issues
      const phoneNumber = href.replace('tel:', '');
      
      if (phoneNumber.includes('.') || phoneNumber.includes(' ')) {
        issues.push({
          category: 'PHONE',
          severity: 'WARNING',
          title: 'Click-to-call link has invalid format',
          description: `Phone link "${phoneNumber}" uses invalid characters`,
          evidence: `tel: link contains dots or spaces: ${href}`,
          recommendation: 'Format phone number with hyphens (e.g., tel:555-123-4567)',
          impactSummary: 'Phone link may not work on some mobile devices',
        });
      }
    }

  } catch (error) {
    console.error('[Phone] Check failed:', error);
  }

  return issues;
}

/**
 * Check general mobile UX issues
 */
async function checkMobileUX(page: Page): Promise<BrowserIssue[]> {
  const issues: BrowserIssue[] = [];

  try {
    // Check for horizontal scrolling
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    if (hasHorizontalScroll) {
      issues.push({
        category: 'MOBILE_UX',
        severity: 'WARNING',
        title: 'Page has horizontal scroll on mobile',
        description: 'Content extends beyond mobile viewport width',
        evidence: 'Page scrollWidth exceeds clientWidth',
        recommendation: 'Ensure all content fits within mobile viewport',
        impactSummary: 'Poor mobile user experience',
      });
    }

    // Check for viewport meta tag
    const hasViewport = await page.evaluate(() => {
      return !!document.querySelector('meta[name="viewport"]');
    });

    if (!hasViewport) {
      issues.push({
        category: 'MOBILE_UX',
        severity: 'WARNING',
        title: 'Missing viewport meta tag',
        description: 'Page lacks mobile viewport configuration',
        evidence: 'No <meta name="viewport"> tag found',
        recommendation: 'Add <meta name="viewport" content="width=device-width, initial-scale=1">',
        impactSummary: 'Page may not render properly on mobile devices',
      });
    }

  } catch (error) {
    console.error('[Mobile UX] Check failed:', error);
  }

  return issues;
}
