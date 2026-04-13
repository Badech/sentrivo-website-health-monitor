import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create demo workspace
  const workspace = await prisma.workspace.upsert({
    where: { slug: 'demo-workspace' },
    update: {},
    create: {
      name: 'Demo Workspace',
      slug: 'demo-workspace',
      plan: 'BETA',
    },
  });
  console.log('✓ Created workspace:', workspace.name);

  // Create demo user
  const user = await prisma.user.upsert({
    where: { email: 'demo@sentrivo.com' },
    update: {},
    create: {
      email: 'demo@sentrivo.com',
      name: 'Demo User',
    },
  });
  console.log('✓ Created user:', user.email);

  // Create membership
  await prisma.membership.upsert({
    where: {
      workspaceId_userId: {
        workspaceId: workspace.id,
        userId: user.id,
      },
    },
    update: {},
    create: {
      workspaceId: workspace.id,
      userId: user.id,
      role: 'OWNER',
    },
  });
  console.log('✓ Created membership');

  // Create workspace settings
  await prisma.workspaceSetting.upsert({
    where: { workspaceId: workspace.id },
    update: {},
    create: {
      workspaceId: workspace.id,
      alertEmail: 'alerts@sentrivo.com',
      defaultScanFrequency: 'DAILY',
      timezone: 'America/New_York',
    },
  });
  console.log('✓ Created workspace settings');

  // Create sites
  const site1 = await prisma.site.upsert({
    where: {
      workspaceId_domain: {
        workspaceId: workspace.id,
        domain: 'acmeplumbing.com',
      },
    },
    update: {},
    create: {
      workspaceId: workspace.id,
      name: 'ACME Plumbing',
      domain: 'acmeplumbing.com',
      industry: 'Home Services',
      status: 'ACTIVE',
      scanFrequency: 'DAILY',
      healthScore: 68,
      leadRiskScore: 23,
      lastScanAt: new Date(Date.now() - 32 * 60 * 1000), // 32 minutes ago
    },
  });

  const site2 = await prisma.site.upsert({
    where: {
      workspaceId_domain: {
        workspaceId: workspace.id,
        domain: 'shopflow.io',
      },
    },
    update: {},
    create: {
      workspaceId: workspace.id,
      name: 'ShopFlow',
      domain: 'shopflow.io',
      industry: 'E-commerce',
      status: 'ACTIVE',
      scanFrequency: 'DAILY',
      healthScore: 64,
      leadRiskScore: 18,
      lastScanAt: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    },
  });

  const site3 = await prisma.site.upsert({
    where: {
      workspaceId_domain: {
        workspaceId: workspace.id,
        domain: 'greenleaf.co',
      },
    },
    update: {},
    create: {
      workspaceId: workspace.id,
      name: 'GreenLeaf Landscaping',
      domain: 'greenleaf.co',
      industry: 'Home Services',
      status: 'ACTIVE',
      scanFrequency: 'DAILY',
      healthScore: 42,
      leadRiskScore: 45,
      lastScanAt: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    },
  });

  console.log('✓ Created 3 sites');

  // Create scans for site1 (acmeplumbing.com)
  const scan1 = await prisma.scan.create({
    data: {
      siteId: site1.id,
      source: 'LIVE',
      status: 'COMPLETED',
      pagesScanned: 47,
      checksRun: 142,
      healthScore: 68,
      criticalCount: 2,
      warningCount: 2,
      healthyCount: 12,
      startedAt: new Date(Date.now() - 34 * 60 * 1000),
      completedAt: new Date(Date.now() - 32 * 60 * 1000),
      summaryJson: {
        duration: '2m 14s',
        totalIssues: 4,
        pagesWithIssues: 4,
      },
    },
  });

  // Create scan pages for scan1
  const contactPage = await prisma.scanPage.create({
    data: {
      scanId: scan1.id,
      siteId: site1.id,
      path: '/contact',
      title: 'Contact Us - ACME Plumbing',
      pageType: 'contact',
      deviceSummary: {
        desktop: { loadTime: 1.2, lcp: 1.8 },
        mobile: { loadTime: 2.4, lcp: 3.1 },
      },
    },
  });

  const servicesPage = await prisma.scanPage.create({
    data: {
      scanId: scan1.id,
      siteId: site1.id,
      path: '/services',
      title: 'Our Services - ACME Plumbing',
      pageType: 'services',
      deviceSummary: {
        desktop: { loadTime: 1.5, lcp: 2.1 },
        mobile: { loadTime: 3.2, lcp: 4.2 },
      },
    },
  });

  // Create issues
  await prisma.issue.create({
    data: {
      siteId: site1.id,
      scanId: scan1.id,
      scanPageId: contactPage.id,
      category: 'Broken Form',
      severity: 'CRITICAL',
      status: 'OPEN',
      title: 'Contact form returns 500 error on submission',
      description: 'Error detected at form submit handler on /contact page. Server responds with 500 Internal Server Error.',
      impactSummary: '100% of form submissions failing',
      evidenceSummary: 'POST request to /api/contact returns status 500. Form validation passes but server-side processing fails.',
      recommendation: 'Check server logs for the /api/contact endpoint. Verify database connection and form handler configuration.',
      estimatedLeadImpact: 'Typical impact for local service sites: 15-20 leads/week',
      firstSeenAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      lastSeenAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
  });

  await prisma.issue.create({
    data: {
      siteId: site1.id,
      scanId: scan1.id,
      scanPageId: servicesPage.id,
      category: 'CTA Visibility',
      severity: 'CRITICAL',
      status: 'OPEN',
      title: 'Primary CTA button invisible on mobile devices',
      description: 'Button positioned -50px below viewport fold on 375px width screens. CSS media query misconfiguration detected.',
      impactSummary: 'Mobile users cannot see main conversion action',
      evidenceSummary: 'Element has CSS property margin-top: -50px applied at mobile breakpoint, pushing button out of view.',
      recommendation: 'Adjust mobile CSS to ensure CTA button appears above the fold on all mobile screen sizes.',
      estimatedLeadImpact: '64% of mobile visitors affected',
      firstSeenAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      lastSeenAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    },
  });

  await prisma.issue.create({
    data: {
      siteId: site1.id,
      scanId: scan1.id,
      category: 'Mobile UX',
      severity: 'WARNING',
      status: 'OPEN',
      title: 'Page load time exceeds 4 seconds on mobile',
      description: 'Mobile page load of 4.2s exceeds Google recommended 2.5s threshold.',
      impactSummary: 'May impact mobile conversion rate and SEO',
      evidenceSummary: 'Largest Contentful Paint (LCP): 4.2 seconds. Primarily caused by unoptimized images (12 images over 500KB each).',
      recommendation: 'Compress images to WebP format and implement lazy loading for below-fold images.',
      estimatedLeadImpact: 'Moderate SEO and conversion impact',
      firstSeenAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
      lastSeenAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    },
  });

  await prisma.issue.create({
    data: {
      siteId: site1.id,
      scanId: scan1.id,
      scanPageId: contactPage.id,
      category: 'Call Button',
      severity: 'WARNING',
      status: 'OPEN',
      title: 'Click-to-call button has invalid tel: format',
      description: 'Phone link formatted as tel:555.123.4567 instead of proper tel:555-123-4567 format.',
      impactSummary: 'Mobile users may not be able to initiate calls',
      evidenceSummary: 'Invalid tel: URL schema may not trigger dialer app on some mobile devices.',
      recommendation: 'Update tel: link format to use standard hyphen formatting for better mobile compatibility.',
      estimatedLeadImpact: 'Reduced mobile call conversion rate',
      firstSeenAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      lastSeenAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    },
  });

  console.log('✓ Created scan and 4 issues for acmeplumbing.com');

  // Create a sample report
  await prisma.report.create({
    data: {
      siteId: site1.id,
      scanId: scan1.id,
      kind: 'SCAN_SUMMARY',
      title: 'Website Health Report - April 2026',
      executiveSummary:
        'This report covers website health monitoring for acmeplumbing.com. Our automated scans detected 2 critical issues that are actively blocking conversions and should be addressed immediately.',
      generatedAt: new Date(),
      data: {
        healthScore: 68,
        criticalIssues: 2,
        warningIssues: 2,
        pagesScanned: 47,
        checksRun: 142,
      },
    },
  });

  console.log('✓ Created sample report');

  console.log('✅ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
