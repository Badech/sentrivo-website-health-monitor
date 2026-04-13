import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-surface-dark border-t border-surface-dark-foreground/5 py-12">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
                  <path d="M12 2L2 7l10 5 10-5-10-5Z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-base font-bold text-surface-dark-foreground">Sentrivo</span>
            </Link>
            <p className="text-sm text-surface-dark-foreground/30 max-w-xs">
              Monitor the website issues that quietly kill conversions.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xs font-semibold text-surface-dark-foreground/50 uppercase tracking-wider mb-3">Product</h4>
              <ul className="space-y-2">
                {["Features", "Pricing", "Changelog", "Docs"].map((item) => (
                  <li key={item}><a href="#" className="text-sm text-surface-dark-foreground/30 hover:text-surface-dark-foreground/60 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-surface-dark-foreground/50 uppercase tracking-wider mb-3">Company</h4>
              <ul className="space-y-2">
                {["About", "Blog", "Careers", "Contact"].map((item) => (
                  <li key={item}><a href="#" className="text-sm text-surface-dark-foreground/30 hover:text-surface-dark-foreground/60 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-surface-dark-foreground/50 uppercase tracking-wider mb-3">Legal</h4>
              <ul className="space-y-2">
                {["Privacy", "Terms", "Security"].map((item) => (
                  <li key={item}><a href="#" className="text-sm text-surface-dark-foreground/30 hover:text-surface-dark-foreground/60 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-surface-dark-foreground/5 text-xs text-surface-dark-foreground/20">
          © 2026 Sentrivo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
