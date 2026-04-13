import { Metadata } from 'next';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { SampleScanFlow } from '@/components/demo/SampleScanFlow';

export const metadata: Metadata = {
  title: 'Try Sample Scan',
  description: 'See how Sentrivo detects conversion-killing website issues.',
};

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">
              Demo
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
              See Sentrivo in action
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enter any URL to see a sample scan report with the types of issues Sentrivo detects
            </p>
          </div>

          <SampleScanFlow />

          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              What makes this different
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border border-border bg-card">
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Traditional uptime monitoring
                </h3>
                <p className="text-sm text-muted-foreground">
                  Tells you if your site is up or down. Doesn't check if forms work, CTAs are visible, or if users can actually convert.
                </p>
              </div>
              <div className="p-6 rounded-xl border border-primary/20 bg-primary/5">
                <h3 className="text-base font-semibold text-foreground mb-2">
                  Sentrivo
                </h3>
                <p className="text-sm text-muted-foreground">
                  Tests the actual conversion path: form submissions, CTA visibility, mobile UX, call buttons, and booking widgets—everything that turns visitors into leads.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
