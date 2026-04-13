import { Metadata } from 'next';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { SampleReportViewer } from '@/components/report/SampleReportViewer';

export const metadata: Metadata = {
  title: 'Sample Report | Sentrivo',
  description: 'See what a Sentrivo website health report looks like.',
};

export default function SampleReportPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">
              Sample Report
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
              Website Health Report
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-3">
              This is an example of the detailed reports Sentrivo generates for your client websites.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Note:</strong> This report uses sample data to demonstrate format and structure. 
                Actual reports are generated from live scans of your sites.
              </p>
            </div>
          </div>

          <SampleReportViewer />
        </div>
      </main>

      <Footer />
    </div>
  );
}
