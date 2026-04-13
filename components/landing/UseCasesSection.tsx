"use client";

import { motion } from "framer-motion";
import { Wrench, Users, Target, Megaphone } from "lucide-react";

const useCases = [
  { icon: Users, title: "Digital Agencies", description: "Monitor all client websites from one dashboard. Catch issues before clients notice them." },
  { icon: Wrench, title: "Local Service Sites", description: "Plumbers, dentists, law firms—websites where every lead counts and forms must work." },
  { icon: Megaphone, title: "Lead Generation Sites", description: "Protect the funnel. Every form submission, call button, and booking widget verified daily." },
  { icon: Target, title: "High-Intent Industries", description: "HVAC, legal, medical, home services—industries with high lead value and complex funnels." },
];

export function UseCasesSection() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">Use Cases</span>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-foreground mb-4">
            Who Sentrivo is built for
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            Focused on agencies and high-value local service websites
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-xl border border-border/60 bg-card shadow-card hover:shadow-card-hover transition-all text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <uc.icon size={22} className="text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{uc.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{uc.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
