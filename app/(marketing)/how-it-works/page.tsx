import { Metadata } from 'next';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { Globe, ScanSearch, Bell, BarChart3, FileText, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How It Works',
  description: 'Learn how Sentrivo monitors websites and detects conversion-killing issues.',
};

const steps = [
  {
    icon: Globe,
    number: "01",
    title: "Connect Your Sites",
    description: "Add the URLs of your client websites. No code installation, no tracking pixels. Just the URL."
  },
  {
    icon: ScanSearch,
    number: "02",
    title: "Automated Daily Scans",
    description: "Sentrivo crawls each site daily using headless browser technology, testing forms, checking CTAs, measuring load times, and verifying tracking."
  },
  {
    icon: AlertTriangle,
    number: "03",
    title: "Issue Detection",
    description: "Our engine identifies conversion-killing problems: broken forms, invisible CTAs, slow mobile loads, dead call buttons, and tracking gaps."
  },
  {
    icon: Bell,
    number: "04",
    title: "Instant Alerts",
    description: "Critical issues trigger immediate notifications via email or Slack so you can fix problems before clients notice."
  },
  {
    icon: BarChart3,
    number: "05",
    title: "Trend Analysis",
    description: "Track website health over time. See which issues are recurring, improving, or getting worse."
  },
  {
    icon: FileText,
    number: "06",
    title: "Client Reports",
    description: "Generate white-label reports showing detected issues, recommended fixes, and resolved items to prove your value."
  }
];

const detectionTypes = [
  {
    title: "Broken Forms",
    description: "We test form submissions and verify success responses. If a form breaks, you know within 24 hours."
  },
  {
    title: "CTA Visibility",
    description: "We check if primary calls-to-action are visible, clickable, and positioned above the fold on desktop and mobile."
  },
  {
    title: "Call Button Functionality",
    description: "Click-to-call links are verified for proper tel: formatting and mobile accessibility."
  },
  {
    title: "Booking Widget Loading",
    description: "Embedded calendars and scheduling tools are checked to ensure they load correctly."
  },
  {
    title: "Mobile Performance",
    description: "Page load times are measured on mobile viewports. Slow loads are flagged immediately."
  },
  {
    title: "Tracking Verification",
    description: "GA4, Facebook Pixel, and conversion tags are checked to ensure they're firing correctly."
  }
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container max-w-5xl mx-auto px-4">
          {/* Header */}
          <div className="mb-16 text-center">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">
              How It Works
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
              Website monitoring, simplified
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sentrivo automates the tedious work of checking client websites for issues that kill conversions.
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-8 mb-20">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="flex gap-6 items-start"
              >
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <step.icon size={24} className="text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-mono text-primary">{step.number}</span>
                    <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* What We Detect */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              What we detect
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {detectionTypes.map((type) => (
                <div
                  key={type.title}
                  className="p-6 rounded-xl border border-border bg-card"
                >
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {type.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {type.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Details */}
          <div className="p-8 rounded-xl border border-border bg-card">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Technical approach
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Headless Browser Testing:</strong> We use Playwright 
                to render pages exactly as real users see them, including JavaScript-heavy SPAs and 
                embedded widgets.
              </p>
              <p>
                <strong className="text-foreground">Mobile-First Scanning:</strong> Every page is tested 
                on both desktop and mobile viewports to catch responsive design issues.
              </p>
              <p>
                <strong className="text-foreground">Safe Form Testing:</strong> Forms are tested with 
                safe test data that's clearly marked to avoid polluting your CRM.
              </p>
              <p>
                <strong className="text-foreground">No Code Required:</strong> Unlike tag managers or 
                monitoring scripts, Sentrivo works entirely externally. No installation needed.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
