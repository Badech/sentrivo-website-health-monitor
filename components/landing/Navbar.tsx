"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const links = [
    { label: "Features", href: "/#features" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Pricing", href: "/#pricing" },
    { label: "FAQ", href: "/#faq" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-border/10">
      <div className="container max-w-7xl mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
              <path d="M12 2L2 7l10 5 10-5-10-5Z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-lg font-bold text-surface-dark-foreground">Sentrivo</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-surface-dark-foreground/60 hover:text-surface-dark-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost-light" size="sm">
              Log in
            </Button>
          </Link>
          <Link href="/demo">
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Try Sample Scan
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-surface-dark-foreground/70">
                <Menu size={22} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] p-0 bg-surface-dark border-border/10">
              <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="h-16 flex items-center px-6 border-b border-surface-dark-foreground/10">
                  <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
                      <path d="M12 2L2 7l10 5 10-5-10-5Z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <span className="ml-2.5 text-base font-bold text-surface-dark-foreground">Sentrivo</span>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 py-6">
                  <div className="space-y-1 mb-6">
                    {links.map((link) => (
                      <SheetTrigger asChild key={link.href}>
                        <Link
                          href={link.href}
                          className="block px-3 py-2.5 rounded-lg text-sm text-surface-dark-foreground/70 hover:text-surface-dark-foreground hover:bg-surface-dark-foreground/5 transition-colors"
                        >
                          {link.label}
                        </Link>
                      </SheetTrigger>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="space-y-2.5 pt-4 border-t border-surface-dark-foreground/10">
                    <SheetTrigger asChild>
                      <Link href="/demo" className="block">
                        <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                          Try Sample Scan
                        </Button>
                      </Link>
                    </SheetTrigger>
                    <SheetTrigger asChild>
                      <Link href="/dashboard" className="block">
                        <Button variant="outline-secondary" size="sm" className="w-full">
                          Log in
                        </Button>
                      </Link>
                    </SheetTrigger>
                  </div>
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-surface-dark-foreground/10">
                  <p className="text-xs text-surface-dark-foreground/40 text-center">
                    Private beta • Built for agencies
                  </p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
