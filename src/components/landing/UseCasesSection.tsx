import { motion } from "framer-motion";
import { Wrench, Users, Target, Megaphone } from "lucide-react";

const useCases = [
  { icon: Wrench, title: "Local Service Businesses", description: "Plumbers, dentists, law firms — ensure your website captures every potential customer." },
  { icon: Users, title: "Agencies Managing Client Sites", description: "Monitor all client websites from one dashboard. Prove your value with real data." },
  { icon: Target, title: "Conversion-Focused Teams", description: "Growth and CRO teams that need continuous visibility into website performance." },
  { icon: Megaphone, title: "Lead Generation Websites", description: "Protect the funnel. Every form, CTA, and landing page — monitored 24/7." },
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
            Built for teams that care about leads
          </h2>
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
