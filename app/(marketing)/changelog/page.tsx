import { Metadata } from 'next';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'Product updates and improvements to Sentrivo.',
};

const updates = [
  {
    date: "April 2026",
    version: "Private Beta",
    items: [
      {
        type: "New",
        title: "Agency Dashboard",
        description: "Multi-site overview dashboard for agencies managing client portfolios."
      },
      {
        type: "New",
        title: "Form Testing",
        description: "Automated form submission testing with safe test data to detect broken forms."
      },
      {
        type: "New",
        title: "CTA Visibility Checks",
        description: "Automatic detection of hidden, misaligned, or invisible call-to-action elements."
      },
      {
        type: "Improved",
        title: "Mobile Scanning",
        description: "Enhanced mobile viewport testing with performance metrics."
      }
    ]
  },
  {
    date: "March 2026",
    version: "Alpha",
    items: [
      {
        type: "New",
        title: "Initial Release",
        description: "First working version with basic page scanning and issue detection."
      },
      {
        type: "New",
        title: "Email Alerts",
        description: "Critical issue notifications via email."
      }
    ]
  }
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-16">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">
              Changelog
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
              Product updates
            </h1>
            <p className="text-lg text-muted-foreground">
              Track our progress as we build Sentrivo in the open.
            </p>
          </div>

          {/* Updates */}
          <div className="space-y-12">
            {updates.map((update) => (
              <div key={update.date}>
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-2xl font-bold text-foreground">{update.date}</h2>
                  <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    {update.version}
                  </span>
                </div>
                
                <div className="space-y-4">
                  {update.items.map((item, i) => (
                    <div
                      key={i}
                      className="p-6 rounded-xl border border-border bg-card"
                    >
                      <div className="flex items-start gap-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                          item.type === 'New' 
                            ? 'bg-success/10 text-success' 
                            : item.type === 'Improved'
                            ? 'bg-primary/10 text-primary'
                            : 'bg-warning/10 text-warning'
                        }`}>
                          {item.type}
                        </span>
                        <div className="flex-1">
                          <h3 className="text-base font-semibold text-foreground mb-1">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-16 p-6 rounded-xl border border-border bg-card">
            <p className="text-sm text-muted-foreground text-center">
              We're currently in private beta. Updates will be more frequent as we refine the product 
              with early agency partners.{' '}
              <a href="mailto:hello@sentrivo.com" className="text-primary hover:underline">
                Request access
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
