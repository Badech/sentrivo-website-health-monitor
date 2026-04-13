"use client";

import { motion } from "framer-motion";

const logos = [
  "Acme Corp", "TechFlow", "Meridian", "Vantage", "Catalyst", "Pinnacle"
];

export function TrustStrip() {
  return (
    <section className="bg-surface-dark border-t border-surface-dark-foreground/5 py-12">
      <div className="container max-w-7xl mx-auto px-4">
        <p className="text-center text-xs font-medium text-surface-dark-foreground/25 uppercase tracking-widest mb-8">
          Trusted by conversion-focused teams
        </p>
        <div className="flex items-center justify-center gap-10 lg:gap-16 flex-wrap">
          {logos.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-lg font-bold text-surface-dark-foreground/10 tracking-tight"
            >
              {name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
