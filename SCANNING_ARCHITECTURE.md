# Sentrivo Scanning Architecture

This document explains how the real scanning engine works and how to use it.

---

## Overview

Sentrivo has **two scanning modes**:

1. **Demo Scan** (`source: DEMO`) - Uses deterministic sample data for marketing/demo purposes
2. **Real Scan** (`source: LIVE`) - Performs actual website monitoring using Playwright + APIs

---

## Real Scan Architecture

### **Scan Flow**

```
1. CRAWL & DISCOVER
   ↓ Fetch sitemap.xml or crawl homepage
   ↓ Extract internal links
   ↓ Detect page types (home, contact, booking, etc.)
   ↓ Prioritize by importance
   ↓ Persist as ScanPage records

2. BROWSER CHECKS (Playwright)
   ↓ Test forms (submission, visibility)
   ↓ Check CTAs (visibility, accessibility)
   ↓ Verify phone links (tel: format)
   ↓ Test mobile UX (viewport, scrolling)
   ↓ Capture evidence/screenshots

3. PERFORMANCE CHECKS (PageSpeed API)
   ↓ Measure Core Web Vitals (LCP, FCP, CLS)
   ↓ Test mobile & desktop performance
   ↓ Check accessibility scores
   ↓ Verify SEO basics

4. OPTIONAL INTEGRATIONS
   ↓ Search Console (indexing, crawl errors)
   ↓ GA4 (traffic, conversions)

5. BUILD ISSUES
   ↓ Convert findings → Issue records
   ↓ Categorize & prioritize
   ↓ Estimate business impact
   ↓ Deduplicate similar issues

6. CALCULATE HEALTH SCORE
   ↓ Health = 100 - (critical*15) - (warning*5) - (info*2)
   ↓ Lead Risk = (critical*20) + (warning*8)
   ↓ Update Site record

7. COMPLETE SCAN
   ↓ Mark scan as COMPLETED
   ↓ Store summary metadata
   ↓ Ready for reporting
```

---

## Scan Modules

### **1. crawlSite.ts**
Discovers pages from sitemap or homepage navigation.

```typescript
import { crawlSite } from '@/lib/scanning';

const pages = await crawlSite('example.com', {
  maxPages: 50,
  timeout: 10000,
});
```

**Returns:**
- `url` - Full page URL
- `path` - Path portion
- `title` - Page title (if available)
- `pageType` - Detected type (home, contact, booking, etc.)
- `priority` - Scan priority (higher = more important)

---

### **2. browserChecks.ts**
Runs Playwright-based browser checks.

```typescript
import { runBrowserChecks } from '@/lib/scanning';

const result = await runBrowserChecks('https://example.com/contact', {
  timeout: 30000,
});
```

**Checks:**
- Form presence & functionality
- CTA visibility (desktop & mobile)
- Phone link formatting
- Mobile viewport issues
- Horizontal scrolling

**Returns:**
- `success` - Whether checks completed
- `issues[]` - Array of detected issues
- `metadata` - Additional context

---

### **3. pageSpeedIntegration.ts**
Fetches real performance data from Google PageSpeed Insights API.

```typescript
import { getPageSpeedData } from '@/lib/scanning';

const result = await getPageSpeedData('https://example.com', 'mobile');
```

**Metrics:**
- Performance score (0-100)
- Core Web Vitals (LCP, FCP, CLS, TBT, TTI)
- Accessibility score
- SEO score

**Requirements:**
- Set `PAGESPEED_API_KEY` environment variable
- Get free API key from: https://developers.google.com/speed/docs/insights/v5/get-started

---

### **4. integrations.ts**
Scaffolding for Search Console and GA4 integrations.

**Current Status:**
- ❌ Not yet implemented (graceful fallback)
- ✅ Ready for OAuth integration
- ✅ Uses `IntegrationConnection` model

**Future Implementation:**
```typescript
// When OAuth is set up:
const searchData = await getSearchConsoleData(siteId, url);
const ga4Data = await getGA4Data(siteId, url);
```

---

### **5. issueBuilder.ts**
Converts raw findings into structured Issue records.

**Features:**
- Deduplication of similar issues
- Categorization (FORM, CTA, PHONE, PERFORMANCE, etc.)
- Severity assignment (CRITICAL, WARNING, INFO)
- Business impact estimation
- Revenue impact calculation

---

### **6. runRealScan.ts**
Main orchestrator - runs complete scan end-to-end.

```typescript
import { queueRealScan } from '@/lib/scanning';

const scanId = await queueRealScan(siteId, {
  maxPages: 50,
  includePageSpeed: true,
  includeSearchConsole: false,
  includeGA4: false,
  timeout: 30000,
});
```

---

## API Usage

### **Trigger a Real Scan**

```bash
POST /api/sites/{siteId}/scans
Content-Type: application/json

{
  "source": "LIVE"
}
```

**Response:**
```json
{
  "scan": {
    "id": "clxxx...",
    "siteId": "clxxx...",
    "source": "LIVE",
    "status": "QUEUED",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### **Trigger a Demo Scan**

```bash
POST /api/sites/{siteId}/scans
Content-Type: application/json

{
  "source": "DEMO"
}
```

---

## Issue Categories

| Category | Severity | Description |
|----------|----------|-------------|
| **FORM** | CRITICAL/WARNING | Form submission issues, missing fields |
| **CTA** | CRITICAL/WARNING | CTA visibility, accessibility issues |
| **PHONE** | WARNING | Invalid tel: link formats |
| **MOBILE_UX** | WARNING | Viewport, scrolling, responsiveness |
| **PERFORMANCE** | CRITICAL/WARNING | Page speed, Core Web Vitals |
| **ACCESSIBILITY** | WARNING | ARIA, contrast, alt text |
| **SEO** | WARNING | Meta tags, structure, mobile-friendly |

---

## Health Score Calculation

```
Health Score = 100 - (critical × 15) - (warning × 5) - (info × 2)

Lead Risk Score = (critical × 20) + (warning × 8)
```

**Examples:**
- 3 critical + 2 warning = Health: 45, Lead Risk: 76%
- 0 critical + 5 warning = Health: 75, Lead Risk: 40%
- 1 critical + 1 warning = Health: 80, Lead Risk: 28%

---

## Environment Variables

### **Required for Real Scans:**
```bash
DATABASE_URL="postgresql://..." # Neon pooled connection
DIRECT_URL="postgresql://..."    # Neon direct connection
```

### **Optional (Recommended):**
```bash
PAGESPEED_API_KEY="..."         # Google PageSpeed Insights
```

### **Optional (Future):**
```bash
GOOGLE_CLIENT_ID="..."          # Search Console OAuth
GOOGLE_CLIENT_SECRET="..."      # Search Console OAuth
GA4_PROPERTY_ID="..."           # Google Analytics 4
```

---

## Demo vs Real Scans

| Feature | Demo Scan | Real Scan |
|---------|-----------|-----------|
| **Crawling** | Hardcoded pages | Real sitemap/navigation crawl |
| **Browser checks** | Simulated | Playwright browser automation |
| **Performance** | Random values | PageSpeed Insights API |
| **Issues** | Random from catalog | Real findings |
| **Duration** | ~2 seconds | ~30-120 seconds |
| **Use case** | Marketing, testing | Production monitoring |

---

## Production Deployment

### **1. Install Playwright browsers:**
```bash
npx playwright install --with-deps chromium
```

### **2. Set environment variables:**
```bash
PAGESPEED_API_KEY=your_api_key_here
```

### **3. Deploy to serverless platform:**
- Vercel: Works with Playwright (use Edge Runtime caution)
- Railway: Full Playwright support
- Fly.io: Full Playwright support
- AWS Lambda: Use Playwright with layers

### **4. Consider background jobs (future):**
For production, queue scans using:
- BullMQ + Redis
- Inngest
- Trigger.dev
- QStash

---

## Limitations & Future Enhancements

### **Current Limitations:**
- Scans run synchronously (blocking request)
- No scan scheduling/automation
- No OAuth integrations (Search Console, GA4)
- Limited to 50 pages per scan
- No screenshot storage

### **Planned Enhancements:**
- Background job queue (BullMQ)
- Scheduled daily/weekly scans
- Search Console integration
- GA4 integration
- Scan result storage (S3/Cloudflare R2)
- Advanced performance budgets
- Custom check configuration

---

## Troubleshooting

### **"No DATABASE_URL found"**
- Add `DATABASE_URL` and `DIRECT_URL` to `.env`
- See `.env.example` for format

### **"PageSpeed API call failed"**
- Check `PAGESPEED_API_KEY` is set
- Verify API quota hasn't been exceeded
- Falls back gracefully if missing

### **"Playwright browser not found"**
- Run: `npx playwright install chromium`
- Or: `npx playwright install --with-deps chromium`

### **Scan takes too long**
- Reduce `maxPages` option
- Disable `includePageSpeed` for faster scans
- Increase `timeout` if sites are slow

---

## Example: Full Scan Flow

```typescript
// 1. Create scan
const scan = await prisma.scan.create({
  data: {
    siteId: 'site_123',
    source: 'LIVE',
    status: 'QUEUED',
  },
});

// 2. Queue real scan
await queueRealScan(scan.siteId, {
  maxPages: 50,
  includePageSpeed: true,
  includeSearchConsole: false,
  includeGA4: false,
});

// 3. Scan runs automatically:
//    - Crawls site
//    - Runs browser checks
//    - Calls PageSpeed API
//    - Builds issues
//    - Updates health score
//    - Marks scan COMPLETED

// 4. View results
const dashboardData = await getDashboardData(scan.siteId);
console.log(`Health: ${dashboardData.site.healthScore}`);
console.log(`Issues: ${dashboardData.issueCounts.total}`);
```

---

**For questions or issues, see `DATABASE_SETUP.md` and `API_DOCUMENTATION.md`**
