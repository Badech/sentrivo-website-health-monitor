"use client";

import { motion } from "framer-motion";
import { Building2, Users, Target } from "lucide-react";

const stats = [
  { icon: Building2, label: "Local Service Focus", value: "Plumbers, Dentists, Law Firms" },
  { icon: Users, label: "Built for Agencies", value: "Manage Multiple Client Sites" },
  { icon: Target, label: "Conversion-First", value: "Lead Gen & Booking Sites" },
];

export function TrustStrip() {
  return (
    <section className="bg-surface-dark border-t border-surface-dark-foreground/5 py-16">
      <div className="container max-w-7xl mx-auto px-4">
        <p className="text-center text-xs font-medium text-surface-dark-foreground/30 uppercase tracking-widest mb-10">
          Designed for agencies managing high-value local service websites
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <stat.icon size={18} className="text-primary" />
              </div>
              <p className="text-xs font-semibold text-surface-dark-foreground/40 uppercase tracking-wider mb-1">
                {stat.label}
              </p>
              <p className="text-sm text-surface-dark-foreground/60 font-medium">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
