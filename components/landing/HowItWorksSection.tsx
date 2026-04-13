"use client";

import { motion } from "framer-motion";
import { Link2, ScanSearch, BarChart3, Bell } from "lucide-react";

const steps = [
  { icon: Link2, step: "01", title: "Connect Your Site", description: "Add your URL. No code changes needed. Takes 60 seconds." },
  { icon: ScanSearch, step: "02", title: "Automatic Scanning", description: "Sentrivo crawls your pages daily — checking forms, CTAs, speed, mobile UX, and tracking." },
  { icon: BarChart3, step: "03", title: "Issues Prioritized", description: "Every issue is ranked by conversion impact. Focus on what matters most." },
  { icon: Bell, step: "04", title: "Alerts & Fix Guidance", description: "Get instant alerts with clear, actionable recommendations your team can act on." },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-muted/30 py-24 lg:py-32">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">How It Works</span>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-foreground mb-4">
            From setup to insights in minutes
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <step.icon size={24} className="text-primary" />
              </div>
              <span className="text-xs font-bold text-primary/40 uppercase tracking-wider mb-2 block">{step.step}</span>
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-7 -right-3 w-6 border-t border-dashed border-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
