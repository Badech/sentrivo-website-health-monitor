import { Metadata } from 'next';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { Shield, Lock, Eye, Server, FileCheck, UserCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Security & Privacy',
  description: 'How Sentrivo protects your data and respects your privacy.',
};

const principles = [
  {
    icon: Shield,
    title: "Privacy-First Design",
    description: "We only access publicly available pages. No user data, no tracking of your visitors, no personal information collection."
  },
  {
    icon: Lock,
    title: "Secure Scanning",
    description: "All scans run in isolated environments. We never store sensitive form data, passwords, or payment information."
  },
  {
    icon: Eye,
    title: "Read-Only Access",
    description: "Sentrivo only reads your website—we never write, modify, or execute actions that could affect your site or users."
  },
  {
    icon: Server,
    title: "Data Minimization",
    description: "We collect only what's necessary to detect issues: page structure, load times, and element visibility. Nothing more."
  },
  {
    icon: FileCheck,
    title: "Transparent Reporting",
    description: "You own your scan data. Export reports anytime. Delete your data anytime. No lock-in."
  },
  {
    icon: UserCheck,
    title: "No Third-Party Sharing",
    description: "Your website data stays between you and Sentrivo. We don't sell data or share it with advertisers."
  }
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-16 text-center">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">
              Security & Privacy
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
              Built with privacy in mind
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sentrivo is designed to monitor website health without compromising security or privacy.
            </p>
          </div>

          {/* Principles Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="p-6 rounded-xl border border-border bg-card"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <principle.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {principle.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="space-y-8">
            <div className="p-6 rounded-xl border border-border bg-card">
              <h2 className="text-xl font-bold text-foreground mb-3">
                What we scan
              </h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Publicly accessible pages (no authentication bypass)</li>
                <li>• Page structure and element visibility</li>
                <li>• Form functionality (test submissions only, no real data)</li>
                <li>• Load times and performance metrics</li>
                <li>• Mobile vs desktop rendering differences</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h2 className="text-xl font-bold text-foreground mb-3">
                What we don't scan
              </h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Password-protected areas</li>
                <li>• User accounts or personal data</li>
                <li>• Payment processing pages</li>
                <li>• Admin panels or internal systems</li>
                <li>• Anything behind authentication</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h2 className="text-xl font-bold text-foreground mb-3">
                Early access transparency
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Sentrivo is currently in private beta. We're working with a small group of agencies to refine 
                the product. Here's what that means:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• No formal security certifications yet (SOC 2 planned for 2026)</li>
                <li>• Founder-led support and data handling</li>
                <li>• Infrastructure hosted on AWS with industry-standard encryption</li>
                <li>• Regular security reviews as we grow</li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <h2 className="text-xl font-bold text-foreground mb-3">
                Questions about security?
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We're happy to discuss our security practices in detail. Contact us at{' '}
                <a href="mailto:security@sentrivo.com" className="text-primary hover:underline">
                  security@sentrivo.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
