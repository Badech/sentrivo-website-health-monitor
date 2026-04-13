"use client";

import { motion } from "framer-motion";
import { DashboardPreview } from "./DashboardPreview";

export function DashboardShowcase() {
  return (
    <section className="bg-surface-dark py-24 lg:py-32">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">Product</span>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-surface-dark-foreground mb-4">
            Your conversion command center
          </h2>
          <p className="text-surface-dark-foreground/50 text-lg max-w-2xl mx-auto">
            A single dashboard to monitor health, track issues, and prioritize fixes across all your websites.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="absolute -inset-4 rounded-2xl bg-gradient-to-b from-primary/8 to-transparent blur-2xl" />
          <div className="relative rounded-xl border border-surface-dark-foreground/10 overflow-hidden glow-sm">
            <DashboardPreview />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
