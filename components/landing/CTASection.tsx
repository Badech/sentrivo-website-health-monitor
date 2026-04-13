"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="bg-surface-dark py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative container max-w-3xl mx-auto px-4 text-center"
      >
        <h2 className="text-3xl lg:text-5xl font-extrabold text-surface-dark-foreground mb-5">
          Ready to protect your client's conversions?
        </h2>
        <p className="text-lg text-surface-dark-foreground/50 mb-8 max-w-xl mx-auto">
          We're working with a small group of agencies in private beta. Request access to test Sentrivo with your portfolio.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="mailto:hello@sentrivo.com?subject=Access Request">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 text-sm font-semibold gap-2">
              Request Access
              <ArrowRight size={16} />
            </Button>
          </a>
          <Link href="/demo">
            <Button size="lg" variant="outline-secondary" className="px-8 h-12 text-sm">
              Try Sample Scan
            </Button>
          </Link>
        </div>
        <p className="text-xs text-surface-dark-foreground/30 mt-6">
          Private beta • Limited spots available
        </p>
      </motion.div>
    </section>
  );
}
