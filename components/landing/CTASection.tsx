"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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
          Start protecting your conversions today
        </h2>
        <p className="text-lg text-surface-dark-foreground/50 mb-8 max-w-xl mx-auto">
          Your first scan is free. See exactly what's costing you leads — in under two minutes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 text-sm font-semibold gap-2">
            Start Your Free Scan
            <ArrowRight size={16} />
          </Button>
          <Button size="lg" variant="outline" className="border-surface-dark-foreground/10 text-surface-dark-foreground/70 hover:bg-surface-dark-foreground/5 px-8 h-12 text-sm">
            Book a Demo
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
