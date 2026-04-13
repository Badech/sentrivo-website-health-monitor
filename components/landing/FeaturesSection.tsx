"use client";

import { motion } from "framer-motion";
import { ScanSearch, ShieldAlert, Smartphone, MousePointerClick, FileWarning, Mail, Bell, TrendingUp, MessageSquareText } from "lucide-react";

const features = [
  { icon: ScanSearch, title: "Automatic Scanning", description: "Daily crawls across your entire site. No manual checks needed." },
  { icon: ShieldAlert, title: "Conversion Leak Detection", description: "Pinpoint exactly where and why visitors drop off." },
  { icon: Smartphone, title: "Mobile UX Checks", description: "Dedicated mobile rendering analysis and performance scoring." },
  { icon: MousePointerClick, title: "CTA Analysis", description: "Visibility, placement, and click-through assessment for every CTA." },
  { icon: FileWarning, title: "Broken Form Detection", description: "Real submission testing. Know the moment a form fails." },
  { icon: Mail, title: "Email Reports", description: "Scan summaries and issue notifications delivered to your inbox." },
  { icon: Bell, title: "Instant Alerting", description: "Critical issues trigger immediate email notifications." },
  { icon: TrendingUp, title: "Historical Trends", description: "Track your site health over time. Spot regressions early." },
  { icon: MessageSquareText, title: "Plain-Language Summaries", description: "Business-friendly issue descriptions. No developer jargon." },
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-background py-24 lg:py-32">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">Features</span>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-foreground mb-4">
            Everything you need to protect conversions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive monitoring that catches the issues Google Analytics can't show you.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-6 rounded-xl border border-border/60 bg-card hover:shadow-card-hover transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <feature.icon size={20} className="text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1.5">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
