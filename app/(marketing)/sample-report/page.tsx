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
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              This is an example of the detailed reports Sentrivo generates for your client websites.
            </p>
          </div>

          <SampleReportViewer />
        </div>
      </main>

      <Footer />
    </div>
  );
}
