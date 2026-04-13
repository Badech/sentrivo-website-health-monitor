# Sentrivo — Conversion-First Website Monitoring

Sentrivo helps agencies monitor local service websites for conversion-killing issues like broken forms, invisible CTAs, and dead call buttons—before they cost clients leads.

## Product Status

**Currently in private beta.** This is a working prototype demonstrating the core product vision. We're refining the product with early agency partners.

### What This Is
- A functional Next.js application showcasing the Sentrivo product concept
- Real UI/UX demonstrating how the product works
- Sample data flows showing issue detection and reporting
- Agency-focused positioning and messaging

### What's Working
- ✅ Premium landing page with agency positioning
- ✅ Demo scan workflow with realistic issue detection
- ✅ Dashboard shell with sample data
- ✅ Trust architecture pages (Security, How It Works, Changelog)
- ✅ Comparison section (vs uptime monitoring, GA4, manual audits)
- ✅ Honest early-access framing

### What's Next
- Backend scanning infrastructure
- Real website crawling and testing
- Actual form submission verification
- Live alerting system
- Client data integration
- Production deployment

## Target Audience

**Primary:** Digital agencies managing local service business websites (plumbers, dentists, law firms, HVAC, home services)

**Secondary:** In-house teams managing high-value lead generation sites

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Charts**: Recharts
- **State Management**: TanStack Query

## Project Structure

```
sentrivo/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # Marketing site route group
│   │   └── page.tsx              # Landing page (/)
│   ├── (dashboard)/              # Dashboard route group
│   │   ├── layout.tsx            # Dashboard layout with sidebar
│   │   └── dashboard/            # Dashboard routes
│   │       ├── page.tsx          # Dashboard overview (/dashboard)
│   │       ├── sites/page.tsx    # Sites page (/dashboard/sites)
│   │       ├── scans/page.tsx    # Scans page (/dashboard/scans)
│   │       ├── issues/page.tsx   # Issues page (/dashboard/issues)
│   │       ├── reports/page.tsx  # Reports page (/dashboard/reports)
│   │       └── settings/page.tsx # Settings page (/dashboard/settings)
│   ├── layout.tsx                # Root layout
│   ├── providers.tsx             # Client providers (QueryClient)
│   └── not-found.tsx             # 404 page
├── components/                   # React components
│   ├── app/                      # Dashboard-specific components
│   │   ├── AppSidebar.tsx        # Dashboard navigation sidebar
│   │   ├── AppTopbar.tsx         # Dashboard header
│   │   ├── ScoreRing.tsx         # Health score visualization
│   │   └── StatusPill.tsx        # Status indicator component
│   ├── landing/                  # Landing page sections
│   │   ├── Navbar.tsx            # Landing page header
│   │   ├── HeroSection.tsx       # Hero with CTA
│   │   ├── FeaturesSection.tsx   # Product features
│   │   ├── PricingSection.tsx    # Pricing tiers
│   │   └── Footer.tsx            # Footer
│   └── ui/                       # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── ...
├── lib/                          # Utility functions
│   └── utils.ts                  # cn() and helpers
├── hooks/                        # Custom React hooks
│   ├── use-toast.ts
│   └── use-mobile.tsx
├── styles/                       # Global styles
│   └── globals.css               # Tailwind + custom CSS
├── public/                       # Static assets
│   ├── favicon.ico
│   ├── robots.txt
│   └── placeholder.svg
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

## Route Groups

The app uses Next.js route groups to organize the application:

### (marketing)
Marketing website with landing page, features, pricing, etc.
- Clean, marketing-focused layout
- No sidebar or dashboard UI
- Public-facing content

### (dashboard)
Protected dashboard area for authenticated users
- Persistent sidebar navigation
- Consistent dashboard layout
- App-specific components

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sentrivo
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler checks

## Design System

### Color Palette

The app uses a custom HSL-based color system:
- **Primary**: Blue (#4d7eff) - CTAs and interactive elements
- **Success**: Green - Health indicators
- **Warning**: Orange - Medium-priority alerts
- **Critical**: Red - High-priority issues
- **Surface Dark**: Deep navy for dark backgrounds

### Typography

- **Font Family**: Inter (body), JetBrains Mono (code)
- **Font Loading**: Optimized with `next/font/google`
- **Hierarchy**: Semantic heading levels with consistent spacing

### Components

All UI components are built with:
- **shadcn/ui** for base components
- **Radix UI** primitives for accessibility
- **Tailwind CSS** for styling
- **CVA** (Class Variance Authority) for variants

## Key Features

### Landing Page
- Hero section with product overview
- Problem/solution framework
- Feature showcase
- Pricing tiers
- FAQ section
- Social proof elements

### Dashboard
- **Overview**: Health score, recent issues, trends
- **Sites**: Manage monitored websites
- **Scans**: View scan history and results
- **Issues**: Browse and filter detected issues
- **Reports**: Download performance reports
- **Settings**: Account and notification preferences

## Development Guidelines

### Adding New Pages

1. Create a new file in `app/(marketing)` or `app/(dashboard)/dashboard`
2. Export a default React component
3. Add metadata if needed

Example:
```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Page',
  description: 'Page description',
};

export default function NewPage() {
  return <div>Content</div>;
}
```

### Adding New Components

1. Create component in appropriate folder (`app/`, `landing/`, or `ui/`)
2. Add `"use client"` directive if component uses hooks or interactivity
3. Use TypeScript for props
4. Follow existing naming conventions

### Styling

- Use Tailwind utility classes
- Follow existing color token usage
- Maintain responsive design patterns
- Use semantic HTML

## Architecture Decisions

### Why Next.js App Router?
- Modern React Server Components support
- File-based routing
- Built-in optimization (fonts, images, etc.)
- Better SEO capabilities
- Improved performance

### Why Route Groups?
- Cleaner URL structure
- Separate layouts for marketing vs. dashboard
- Better code organization
- No impact on URL paths

### Why "use client" Directives?
- Optimize for server components by default
- Client components only when needed (interactivity, hooks)
- Better performance and smaller bundles

## Product Philosophy

### Honest Trust Architecture
We've intentionally avoided:
- ❌ Fake customer logos
- ❌ Unverified traction claims ("12,000+ websites monitored")
- ❌ False compliance badges (SOC 2, GDPR, etc.)
- ❌ Inflated metrics presented as facts

Instead, we've built trust through:
- ✅ Clear "private beta" framing
- ✅ Transparent product pages (Security, How It Works)
- ✅ Sample data clearly labeled
- ✅ Honest changelog
- ✅ Product-first positioning
- ✅ Specific ICP focus (agencies)

### Why This Approach?
We're building Sentrivo to be credible from day one. Better to be honest about early-stage status than to fake maturity with borrowed trust signals.

## Key Pages & Features

### Marketing Site
- `/` - Landing page with agency-focused messaging
- `/demo` - Interactive sample scan workflow
- `/how-it-works` - Product explanation and technical approach
- `/security` - Privacy-first principles and data handling
- `/changelog` - Product updates and progress

### Dashboard (Demo)
- `/dashboard` - Overview with health scores and recent issues
- `/dashboard/sites` - Multi-site management
- `/dashboard/issues` - Issue center with severity breakdown
- `/dashboard/scans` - Scan history
- `/dashboard/reports` - Downloadable reports
- `/dashboard/settings` - Account preferences

## Development Roadmap

### Phase 1: Foundation (Current)
- [x] Next.js migration complete
- [x] Agency positioning established
- [x] Demo scan workflow built
- [x] Trust architecture pages created
- [x] Honest early-access framing

### Phase 2: Backend (In Progress)
- [ ] Headless browser scanning (Playwright)
- [ ] Form submission testing
- [ ] CTA visibility detection
- [ ] Mobile UX analysis
- [ ] Database layer (Prisma + PostgreSQL)
- [ ] API routes for real scans

### Phase 3: Production Features
- [ ] Authentication system
- [ ] Real-time alerting (email + Slack)
- [ ] White-label reports for agencies
- [ ] Client dashboard access
- [ ] Webhook integrations
- [ ] Payment system (Stripe)

### Phase 4: Scale
- [ ] SOC 2 compliance
- [ ] API access for enterprise
- [ ] Custom integrations
- [ ] Advanced analytics
- [ ] Multi-location support

## License

Proprietary - All rights reserved

## Contact

For questions or support, contact [support@sentrivo.com](mailto:support@sentrivo.com)
