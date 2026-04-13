"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { DashboardPreview } from "./DashboardPreview";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-surface-dark overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />

      <div className="relative container max-w-7xl mx-auto px-4 lg:px-8 pt-20 pb-8 text-center z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 mb-8"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          <span className="text-xs font-medium text-primary">Now monitoring 12,000+ websites</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-surface-dark-foreground leading-[1.08] max-w-4xl mx-auto mb-6"
        >
          Stop losing leads to{" "}
          <span className="text-gradient-primary">silent website issues</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg lg:text-xl text-surface-dark-foreground/50 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Sentrivo scans your website daily, detecting broken forms, weak CTAs, mobile UX problems, and conversion leaks — before they cost you customers.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
        >
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 text-sm font-semibold gap-2">
            Start Your Free Scan
            <ArrowRight size={16} />
          </Button>
          <Button size="lg" variant="outline" className="border-surface-dark-foreground/10 text-surface-dark-foreground/70 hover:bg-surface-dark-foreground/5 px-8 h-12 text-sm">
            Book a Demo
          </Button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-6 text-xs text-surface-dark-foreground/30 mb-16"
        >
          <span className="flex items-center gap-1.5"><Shield size={13} /> SOC 2 Ready</span>
          <span className="flex items-center gap-1.5"><Zap size={13} /> Setup in 60 seconds</span>
          <span className="flex items-center gap-1.5"><Eye size={13} /> No code required</span>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="absolute -inset-4 rounded-2xl bg-gradient-to-b from-primary/10 to-transparent blur-2xl" />
          <div className="relative rounded-xl border border-surface-dark-foreground/10 overflow-hidden glow-primary">
            <DashboardPreview />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
