import * as cheerio from 'cheerio';

/**
 * Real site crawling - discover pages from sitemap and navigation
 */

export interface DiscoveredPage {
  url: string;
  path: string;
  title?: string;
  pageType?: string;
  priority: number;
}

interface CrawlOptions {
  maxPages?: number;
  timeout?: number;
  respectRobotsTxt?: boolean;
}

/**
 * Crawl a site to discover pages
 * Priority: Sitemap → Homepage links → Discovered links
 */
export async function crawlSite(
  domain: string,
  options: CrawlOptions = {}
): Promise<DiscoveredPage[]> {
  const {
    maxPages = 50,
    timeout = 10000,
    respectRobotsTxt = true,
  } = options;

  const baseUrl = domain.startsWith('http') ? domain : `https://${domain}`;
  const discoveredPages: Map<string, DiscoveredPage> = new Map();

  console.log(`[Crawl] Starting discovery for ${baseUrl}`);

  try {
    // Step 1: Try to get sitemap
    const sitemapPages = await discoverFromSitemap(baseUrl, timeout);
    sitemapPages.forEach(page => discoveredPages.set(page.url, page));
    console.log(`[Crawl] Found ${sitemapPages.length} pages from sitemap`);

    // Step 2: Crawl homepage if we need more pages
    if (discoveredPages.size < maxPages) {
      const homepagePages = await discoverFromHomepage(baseUrl, timeout);
      homepagePages.forEach(page => {
        if (!discoveredPages.has(page.url)) {
          discoveredPages.set(page.url, page);
        }
      });
      console.log(`[Crawl] Found ${homepagePages.length} additional pages from homepage`);
    }

    // Step 3: Prioritize and limit results
    const pages = Array.from(discoveredPages.values())
      .sort((a, b) => b.priority - a.priority)
      .slice(0, maxPages);

    console.log(`[Crawl] Returning ${pages.length} pages for scanning`);
    return pages;

  } catch (error) {
    console.error('[Crawl] Error during site discovery:', error);
    
    // Fallback: Return at least the homepage
    return [{
      url: baseUrl,
      path: '/',
      title: 'Homepage',
      pageType: 'home',
      priority: 100,
    }];
  }
}

/**
 * Discover pages from sitemap.xml
 */
async function discoverFromSitemap(
  baseUrl: string,
  timeout: number
): Promise<DiscoveredPage[]> {
  const sitemapUrls = [
    `${baseUrl}/sitemap.xml`,
    `${baseUrl}/sitemap_index.xml`,
    `${baseUrl}/sitemap.xml.gz`,
  ];

  for (const sitemapUrl of sitemapUrls) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(sitemapUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Sentrivo/1.0 (Website Health Monitor)',
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) continue;

      const xml = await response.text();
      const pages = parseSitemap(xml, baseUrl);
      
      if (pages.length > 0) {
        return pages;
      }
    } catch (error) {
      // Try next sitemap URL
      continue;
    }
  }

  return [];
}

/**
 * Parse sitemap XML and extract URLs
 */
function parseSitemap(xml: string, baseUrl: string): DiscoveredPage[] {
  const pages: DiscoveredPage[] = [];
  const urlRegex = /<loc>(.*?)<\/loc>/g;
  let match;

  while ((match = urlRegex.exec(xml)) !== null) {
    const url = match[1];
    if (!url.startsWith(baseUrl)) continue;

    const path = url.replace(baseUrl, '') || '/';
    const pageType = detectPageType(path);
    const priority = calculatePriority(path, pageType);

    pages.push({
      url,
      path,
      pageType,
      priority,
    });
  }

  return pages;
}

/**
 * Discover pages by crawling homepage navigation
 */
async function discoverFromHomepage(
  baseUrl: string,
  timeout: number
): Promise<DiscoveredPage[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(baseUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Sentrivo/1.0 (Website Health Monitor)',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Failed to fetch homepage: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const pages: DiscoveredPage[] = [];
    const seenUrls = new Set<string>();

    // Extract title
    const siteTitle = $('title').text();

    // Find all internal links
    $('a[href]').each((_, element) => {
      const href = $(element).attr('href');
      if (!href) return;

      // Resolve relative URLs
      const url = new URL(href, baseUrl).href;
      
      // Only include internal links
      if (!url.startsWith(baseUrl)) return;
      if (seenUrls.has(url)) return;
      
      // Skip anchors, mailto, tel
      if (url.includes('#') || url.includes('mailto:') || url.includes('tel:')) return;

      seenUrls.add(url);

      const path = url.replace(baseUrl, '') || '/';
      const pageType = detectPageType(path);
      const priority = calculatePriority(path, pageType);
      const linkText = $(element).text().trim();

      pages.push({
        url,
        path,
        title: linkText || undefined,
        pageType,
        priority,
      });
    });

    // Always include homepage
    if (!seenUrls.has(baseUrl)) {
      pages.unshift({
        url: baseUrl,
        path: '/',
        title: siteTitle || 'Homepage',
        pageType: 'home',
        priority: 100,
      });
    }

    return pages;

  } catch (error) {
    console.error('[Crawl] Error fetching homepage:', error);
    return [];
  }
}

/**
 * Detect page type from path
 */
function detectPageType(path: string): string {
  const lowerPath = path.toLowerCase();

  if (lowerPath === '/' || lowerPath === '') return 'home';
  if (lowerPath.includes('contact')) return 'contact';
  if (lowerPath.includes('book') || lowerPath.includes('schedule') || lowerPath.includes('appointment')) return 'booking';
  if (lowerPath.includes('service')) return 'services';
  if (lowerPath.includes('about')) return 'about';
  if (lowerPath.includes('pricing') || lowerPath.includes('price')) return 'pricing';
  if (lowerPath.includes('gallery') || lowerPath.includes('portfolio')) return 'gallery';
  if (lowerPath.includes('testimonial') || lowerPath.includes('review')) return 'testimonials';
  if (lowerPath.includes('blog') || lowerPath.includes('article')) return 'blog';
  if (lowerPath.includes('location') || lowerPath.includes('area')) return 'location';

  return 'general';
}

/**
 * Calculate priority for page scanning
 * Higher priority = scanned first
 */
function calculatePriority(path: string, pageType?: string): number {
  // Base priorities by page type
  const typePriorities: Record<string, number> = {
    home: 100,
    contact: 90,
    booking: 85,
    services: 80,
    pricing: 75,
    about: 70,
    location: 65,
    testimonials: 60,
    gallery: 55,
    blog: 50,
    general: 40,
  };

  let priority = typePriorities[pageType || 'general'] || 40;

  // Boost shallow pages (closer to root)
  const depth = path.split('/').filter(Boolean).length;
  priority -= depth * 5;

  return Math.max(0, priority);
}

/**
 * Normalize URL - remove trailing slashes, fragments, query params
 */
export function normalizeUrl(url: string): string {
  try {
    const parsed = new URL(url);
    // Remove trailing slash
    let path = parsed.pathname.replace(/\/+$/, '');
    if (path === '') path = '/';
    
    return `${parsed.origin}${path}`;
  } catch {
    return url;
  }
}
