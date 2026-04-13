"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const comparisons = [
  {
    feature: "Detects broken forms",
    sentrivo: true,
    uptime: false,
    ga4: false,
    manual: true,
  },
  {
    feature: "Checks CTA visibility",
    sentrivo: true,
    uptime: false,
    ga4: false,
    manual: true,
  },
  {
    feature: "Mobile UX testing",
    sentrivo: true,
    uptime: false,
    ga4: false,
    manual: true,
  },
  {
    feature: "Verifies call buttons",
    sentrivo: true,
    uptime: false,
    ga4: false,
    manual: true,
  },
  {
    feature: "Booking widget checks",
    sentrivo: true,
    uptime: false,
    ga4: false,
    manual: true,
  },
  {
    feature: "Automated daily scans",
    sentrivo: true,
    uptime: true,
    ga4: false,
    manual: false,
  },
  {
    feature: "Conversion impact scoring",
    sentrivo: true,
    uptime: false,
    ga4: false,
    manual: false,
  },
  {
    feature: "Setup time",
    sentrivo: "2 minutes",
    uptime: "5 minutes",
    ga4: "Manual",
    manual: "Hours",
  },
];

export function ComparisonSection() {
  return (
    <section className="bg-muted/30 py-24 lg:py-32">
      <div className="container max-w-6xl mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">
            Comparison
          </span>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-foreground mb-4">
            How Sentrivo compares
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Traditional monitoring tools miss the issues that actually hurt conversions
          </p>
        </motion.div>

        <div className="overflow-x-auto">
          <table className="w-full border border-border rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-card border-b border-border">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                  Feature
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-foreground bg-primary/5">
                  Sentrivo
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-muted-foreground">
                  Uptime Monitoring
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-muted-foreground">
                  Google Analytics
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-muted-foreground">
                  Manual Audits
                </th>
              </tr>
            </thead>
            <tbody className="bg-card">
              {comparisons.map((row, i) => (
                <tr key={i} className="border-b border-border last:border-b-0">
                  <td className="px-6 py-4 text-sm text-foreground">
                    {row.feature}
                  </td>
                  <td className="px-6 py-4 text-center bg-primary/5">
                    {typeof row.sentrivo === 'boolean' ? (
                      row.sentrivo ? (
                        <Check size={18} className="text-success mx-auto" />
                      ) : (
                        <X size={18} className="text-muted-foreground mx-auto opacity-30" />
                      )
                    ) : (
                      <span className="text-sm font-medium text-foreground">{row.sentrivo}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {typeof row.uptime === 'boolean' ? (
                      row.uptime ? (
                        <Check size={18} className="text-success mx-auto" />
                      ) : (
                        <X size={18} className="text-muted-foreground mx-auto opacity-30" />
                      )
                    ) : (
                      <span className="text-sm text-muted-foreground">{row.uptime}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {typeof row.ga4 === 'boolean' ? (
                      row.ga4 ? (
                        <Check size={18} className="text-success mx-auto" />
                      ) : (
                        <X size={18} className="text-muted-foreground mx-auto opacity-30" />
                      )
                    ) : (
                      <span className="text-sm text-muted-foreground">{row.ga4}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {typeof row.manual === 'boolean' ? (
                      row.manual ? (
                        <Check size={18} className="text-success mx-auto" />
                      ) : (
                        <X size={18} className="text-muted-foreground mx-auto opacity-30" />
                      )
                    ) : (
                      <span className="text-sm text-muted-foreground">{row.manual}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 p-6 rounded-xl border border-primary/20 bg-primary/5">
          <p className="text-sm text-foreground text-center">
            <strong>The difference:</strong> Uptime monitoring tells you if your site is down. 
            Analytics tells you if conversions dropped. Sentrivo tells you <em>why</em>—and catches 
            it before it shows up in your metrics.
          </p>
        </div>
      </div>
    </section>
  );
}
