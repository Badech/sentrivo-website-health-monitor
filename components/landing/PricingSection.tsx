"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Private Beta",
    price: "Request Access",
    period: "",
    description: "Currently accepting a limited number of agencies for early access testing.",
    features: ["Up to 3 websites", "Daily scans", "Broken form detection", "Mobile UX checks", "CTA visibility checks", "Email alerts"],
    cta: "Request Access",
    highlighted: true,
  },
  {
    name: "Agency",
    price: "Coming Soon",
    period: "",
    description: "For agencies managing multiple client portfolios.",
    features: ["Up to 15 websites", "Daily scans", "All Beta features", "Priority support", "Team collaboration", "Advanced reporting"],
    cta: "Join Waitlist",
    highlighted: false,
  },
  {
    name: "Enterprise",
    price: "Contact Us",
    period: "",
    description: "For large agencies with custom monitoring needs.",
    features: ["Custom website limit", "Custom scan frequency", "All Agency features", "Dedicated support", "Priority onboarding", "Future: Custom integrations"],
    cta: "Contact Us",
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="bg-background py-24 lg:py-32">
      <div className="container max-w-7xl mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">Pricing</span>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-foreground mb-4">
            Early access pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            We're currently in private beta. Request access to test Sentrivo with your client sites.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-8 rounded-xl border transition-all ${
                plan.highlighted
                  ? "border-primary/30 bg-card shadow-card-hover glow-sm"
                  : "border-border/60 bg-card shadow-card"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <h3 className="text-lg font-semibold text-foreground mb-1">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-5">{plan.description}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>
              <a 
                href={
                  plan.cta === "Request Access" 
                    ? "mailto:hello@sentrivo.com?subject=Private Beta Access Request" 
                    : plan.cta === "Join Waitlist"
                    ? "mailto:hello@sentrivo.com?subject=Agency Plan Waitlist"
                    : "mailto:hello@sentrivo.com?subject=Enterprise Inquiry"
                } 
                className="block"
              >
                <Button
                  className={`w-full mb-6 ${
                    plan.highlighted
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {plan.cta}
                </Button>
              </a>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <Check size={15} className="text-success shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
