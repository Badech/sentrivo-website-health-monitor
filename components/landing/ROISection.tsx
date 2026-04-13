"use client";

import { motion } from "framer-motion";
import { TrendingDown, Clock, ShieldCheck, DollarSign } from "lucide-react";

const values = [
  { icon: TrendingDown, title: "Reduce Missed Leads", description: "Catch broken forms and dead CTAs before they silently cost you conversions.", metric: "Sample", metricLabel: "37% fewer missed leads" },
  { icon: Clock, title: "Catch Issues Early", description: "Daily scans mean you find problems in hours, not weeks.", metric: "~24h", metricLabel: "typical detection time" },
  { icon: ShieldCheck, title: "Improve Client Retention", description: "Proactively fix UX issues before clients notice the problem.", metric: "Sample", metricLabel: "2.4x faster fixes" },
  { icon: DollarSign, title: "Protect Ad Spend", description: "Stop sending paid traffic to broken pages. Every click should count.", metric: "Sample", metricLabel: "full coverage" },
];

export function ROISection() {
  return (
    <section className="bg-muted/30 py-24 lg:py-32">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">Impact</span>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-foreground mb-4">
            Why agencies choose Sentrivo
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            Sample impact metrics from early agency partners
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {values.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-xl border border-border/60 bg-card shadow-card"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{item.description}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-primary">{item.metric}</span>
                    <span className="text-xs text-muted-foreground">{item.metricLabel}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
