"use client";

import { motion } from "framer-motion";
import { FileX, Smartphone, MousePointerClick, Phone, CalendarX, LineChart } from "lucide-react";

const problems = [
  { icon: FileX, title: "Broken Forms", description: "Submissions silently fail. Leads vanish. You don't know until revenue drops.", color: "text-critical" },
  { icon: Smartphone, title: "Slow Mobile Pages", description: "60% of traffic is mobile. Slow load times kill conversions before users even scroll.", color: "text-warning" },
  { icon: MousePointerClick, title: "Invisible CTAs", description: "Your main call-to-action is buried, misaligned, or completely missing on key pages.", color: "text-warning" },
  { icon: Phone, title: "Dead Call Buttons", description: "Click-to-call links break silently. Potential customers can't reach you.", color: "text-critical" },
  { icon: CalendarX, title: "Booking Widget Failures", description: "Embedded scheduling tools fail to load. Appointments never get booked.", color: "text-critical" },
  { icon: LineChart, title: "Tracking Gaps", description: "Conversion pixels misfire. Your ad spend data is wrong. You're optimizing blind.", color: "text-warning" },
];

export function ProblemSection() {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">The Problem</span>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-foreground mb-4">
            Your website is leaking revenue
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Most businesses don't realize these silent failures are costing them leads every single day.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group relative p-6 rounded-xl border border-border/60 bg-card shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-4 ${problem.color}`}>
                <problem.icon size={20} />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">{problem.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
