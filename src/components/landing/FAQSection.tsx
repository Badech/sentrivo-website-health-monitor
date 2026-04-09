import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "How does Sentrivo scan my website?", a: "Sentrivo uses headless browser technology to crawl your site just like a real visitor would. We test forms, click CTAs, measure load times, and verify tracking — all automatically." },
  { q: "Do I need to install any code on my site?", a: "No. Just add your URL and Sentrivo handles everything externally. No scripts, plugins, or code changes required." },
  { q: "How quickly will I be alerted about issues?", a: "Critical issues trigger instant alerts via email and Slack. Non-critical findings are included in your weekly summary report." },
  { q: "What types of issues does Sentrivo detect?", a: "Broken forms, dead call buttons, booking widget failures, CTA visibility problems, slow page loads, mobile UX issues, and tracking/pixel gaps." },
  { q: "Can I monitor multiple websites?", a: "Yes. Growth plans support up to 5 sites, and Agency plans cover 25+. Each site gets its own dashboard and reporting." },
  { q: "Is there a free trial?", a: "Yes. Every plan includes a 14-day free trial with full access. No credit card required to start." },
];

export function FAQSection() {
  return (
    <section id="faq" className="bg-muted/30 py-24 lg:py-32">
      <div className="container max-w-3xl mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 block">FAQ</span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground">
            Frequently asked questions
          </h2>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border border-border/60 rounded-xl px-6 bg-card shadow-card data-[state=open]:shadow-card-hover transition-all"
            >
              <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
