/**
 * Issue Catalog - Sample issues that can be detected
 * This provides realistic sample issues for demo scans
 * In production, this will be replaced with actual detection logic
 */

export const ISSUE_CATEGORIES = {
  BROKEN_FORM: 'Broken Form',
  CTA_VISIBILITY: 'CTA Visibility',
  CALL_BUTTON: 'Call Button',
  BOOKING_WIDGET: 'Booking Widget',
  MOBILE_UX: 'Mobile UX',
  TRACKING_GAP: 'Tracking Gap',
  PAGE_SPEED: 'Page Speed',
  ACCESSIBILITY: 'Accessibility',
} as const;

export interface IssueTemplate {
  category: string;
  severity: 'CRITICAL' | 'WARNING';
  titleTemplate: string;
  descriptionTemplate: string;
  impactTemplate: string;
  evidenceTemplate: string;
  recommendationTemplate: string;
  estimatedLeadImpact: string;
  affectedPageTypes?: string[];
}

export const ISSUE_TEMPLATES: IssueTemplate[] = [
  {
    category: ISSUE_CATEGORIES.BROKEN_FORM,
    severity: 'CRITICAL',
    titleTemplate: 'Contact form returns 500 error on submission',
    descriptionTemplate: 'Error detected at form submit handler. Server responds with 500 Internal Server Error.',
    impactTemplate: '100% of form submissions failing',
    evidenceTemplate: 'POST request to /api/contact returns status 500. Form validation passes but server-side processing fails.',
    recommendationTemplate: 'Check server logs for the /api/contact endpoint. Verify database connection and form handler configuration.',
    estimatedLeadImpact: 'Typical impact for local service sites: 15-20 leads/week',
    affectedPageTypes: ['contact'],
  },
  {
    category: ISSUE_CATEGORIES.CTA_VISIBILITY,
    severity: 'CRITICAL',
    titleTemplate: 'Primary CTA button invisible on mobile devices',
    descriptionTemplate: 'Button positioned below viewport fold on 375px width screens. CSS media query misconfiguration detected.',
    impactTemplate: 'Mobile users cannot see main conversion action',
    evidenceTemplate: 'Element has CSS property margin-top: -50px applied at mobile breakpoint, pushing button out of view.',
    recommendationTemplate: 'Adjust mobile CSS to ensure CTA button appears above the fold on all mobile screen sizes.',
    estimatedLeadImpact: '64% of mobile visitors affected',
    affectedPageTypes: ['services', 'pricing', 'landing'],
  },
  {
    category: ISSUE_CATEGORIES.BOOKING_WIDGET,
    severity: 'CRITICAL',
    titleTemplate: 'Calendly embed failing to initialize',
    descriptionTemplate: 'Booking widget JavaScript error preventing calendar display.',
    impactTemplate: 'Appointment booking unavailable',
    evidenceTemplate: 'JavaScript error: Calendly is not defined. Script load order issue detected.',
    recommendationTemplate: 'Verify Calendly script is loaded before widget initialization.',
    estimatedLeadImpact: 'High-value conversion blocked',
    affectedPageTypes: ['schedule', 'booking'],
  },
  {
    category: ISSUE_CATEGORIES.MOBILE_UX,
    severity: 'WARNING',
    titleTemplate: 'Page load time exceeds 4 seconds on mobile',
    descriptionTemplate: 'Mobile page load of 4.2s exceeds Google recommended 2.5s threshold.',
    impactTemplate: 'May impact mobile conversion rate and SEO',
    evidenceTemplate: 'Largest Contentful Paint (LCP): 4.2 seconds. Primarily caused by unoptimized images (12 images over 500KB each).',
    recommendationTemplate: 'Compress images to WebP format and implement lazy loading for below-fold images.',
    estimatedLeadImpact: 'Moderate SEO and conversion impact',
    affectedPageTypes: ['gallery', 'services', 'about'],
  },
  {
    category: ISSUE_CATEGORIES.CALL_BUTTON,
    severity: 'WARNING',
    titleTemplate: 'Click-to-call button has invalid tel: format',
    descriptionTemplate: 'Phone link formatted as tel:555.123.4567 instead of proper tel:555-123-4567 format.',
    impactTemplate: 'Mobile users may not be able to initiate calls',
    evidenceTemplate: 'Invalid tel: URL schema may not trigger dialer app on some mobile devices.',
    recommendationTemplate: 'Update tel: link format to use standard hyphen formatting for better mobile compatibility.',
    estimatedLeadImpact: 'Reduced mobile call conversion rate',
    affectedPageTypes: ['contact', 'home'],
  },
  {
    category: ISSUE_CATEGORIES.TRACKING_GAP,
    severity: 'WARNING',
    titleTemplate: 'GA4 conversion event not firing on form submit',
    descriptionTemplate: 'Expected event form_submit not present in GA4 debug console.',
    impactTemplate: 'Conversion tracking incomplete for this landing page',
    evidenceTemplate: 'GA4 event listener not attached to form submit handler.',
    recommendationTemplate: 'Verify GA4 event trigger is attached to form submit handler.',
    estimatedLeadImpact: 'Marketing attribution affected',
    affectedPageTypes: ['landing'],
  },
  {
    category: ISSUE_CATEGORIES.ACCESSIBILITY,
    severity: 'WARNING',
    titleTemplate: 'Hero CTA contrast ratio below WCAG AA',
    descriptionTemplate: 'Button text contrast ratio 3.8:1, WCAG AA requires 4.5:1.',
    impactTemplate: 'Reduced accessibility and visibility',
    evidenceTemplate: 'Contrast ratio measured at 3.8:1 between button text and background.',
    recommendationTemplate: 'Increase button text color contrast or adjust background to meet WCAG AA standards.',
    estimatedLeadImpact: 'Accessibility compliance issue',
    affectedPageTypes: ['home'],
  },
];

/**
 * Get random issues for a scan
 */
export function getRandomIssues(count: number = 4): IssueTemplate[] {
  const shuffled = [...ISSUE_TEMPLATES].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, ISSUE_TEMPLATES.length));
}

/**
 * Get issues for specific page types
 */
export function getIssuesForPageType(pageType: string): IssueTemplate[] {
  return ISSUE_TEMPLATES.filter(
    (template) =>
      !template.affectedPageTypes ||
      template.affectedPageTypes.includes(pageType)
  );
}
