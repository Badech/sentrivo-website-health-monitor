import { Navbar } from '@/components/landing/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { TrustStrip } from '@/components/landing/TrustStrip';
import { ProblemSection } from '@/components/landing/ProblemSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { DashboardShowcase } from '@/components/landing/DashboardShowcase';
import { ROISection } from '@/components/landing/ROISection';
import { UseCasesSection } from '@/components/landing/UseCasesSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { FAQSection } from '@/components/landing/FAQSection';
import { CTASection } from '@/components/landing/CTASection';
import { Footer } from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <TrustStrip />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesSection />
      <DashboardShowcase />
      <ROISection />
      <UseCasesSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
