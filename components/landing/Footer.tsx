import Link from "next/link";

export function Footer() {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { label: "How It Works", href: "/how-it-works" },
        { label: "Pricing", href: "/#pricing" },
        { label: "Changelog", href: "/changelog" },
      ]
    },
    {
      title: "Company",
      links: [
        { label: "Security & Privacy", href: "/security" },
        { label: "Contact", href: "mailto:hello@sentrivo.com" },
      ]
    }
  ];

  return (
    <footer className="bg-surface-dark border-t border-surface-dark-foreground/5 py-12">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
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
            <p className="text-sm text-surface-dark-foreground/40 max-w-xs mb-4">
              Conversion-first website monitoring for agencies managing local service sites.
            </p>
            <p className="text-xs text-surface-dark-foreground/30">
              Currently in private beta
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-surface-dark-foreground mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-sm text-surface-dark-foreground/40 hover:text-surface-dark-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-surface-dark-foreground/5 text-xs text-surface-dark-foreground/20">
          © 2026 Sentrivo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
