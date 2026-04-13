"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  ScanSearch, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Loader2,
  ArrowRight,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SAMPLE_ISSUES = [
  {
    severity: "critical",
    title: "Contact form returns 500 error on submission",
    page: "/contact",
    impact: "100% of form submissions failing",
    description: "The contact form POST request to /api/contact is returning a 500 server error. This prevents all lead submissions from being captured.",
    recommendation: "Check server logs and verify the /api/contact endpoint is functioning correctly."
  },
  {
    severity: "critical",
    title: "Primary CTA button invisible on mobile",
    page: "/services",
    impact: "Mobile users cannot see main conversion action",
    description: "The 'Book Appointment' button has CSS that hides it below the viewport on screens under 768px width.",
    recommendation: "Adjust mobile CSS to ensure CTA is visible above the fold."
  },
  {
    severity: "warning",
    title: "Click-to-call button has invalid tel: format",
    page: "/",
    impact: "Mobile users cannot initiate calls",
    description: "Phone number link is formatted as 'tel:555.123.4567' but should use hyphens: 'tel:555-123-4567'",
    recommendation: "Update tel: link format to use standard formatting."
  },
  {
    severity: "warning",
    title: "Page load time exceeds 4 seconds on mobile",
    page: "/gallery",
    impact: "Slow loading may cause visitor drop-off",
    description: "Mobile page load time is 4.2 seconds, primarily due to unoptimized images.",
    recommendation: "Compress images and implement lazy loading for below-fold content."
  }
];

export function SampleScanFlow() {
  const [step, setStep] = useState<"input" | "scanning" | "results">("input");
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleStartScan = () => {
    if (!url) return;
    setStep("scanning");
    setProgress(0);
    
    // Simulate scanning progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setStep("results"), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const resetScan = () => {
    setStep("input");
    setUrl("");
    setProgress(0);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {step === "input" && (
          <motion.div
            key="input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Try a sample scan
                </h3>
                <p className="text-muted-foreground">
                  See how Sentrivo detects conversion-killing issues
                </p>
              </div>
              
              <div className="flex gap-3">
                <Input
                  type="url"
                  placeholder="Enter website URL (e.g., yoursite.com)"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleStartScan()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleStartScan}
                  disabled={!url}
                  size="lg"
                  className="gap-2"
                >
                  <ScanSearch size={18} />
                  Start Scan
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                This is a demo using sample data. Real scans coming soon.
              </p>
            </Card>
          </motion.div>
        )}

        {step === "scanning" && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="p-8">
              <div className="text-center">
                <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">
                  Scanning {url}
                </h3>
                <p className="text-muted-foreground mb-6">
                  Analyzing pages, testing forms, checking CTAs...
                </p>
                
                <div className="max-w-md mx-auto">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {progress}% complete
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {step === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Summary */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">
                    Scan Complete
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Found 4 issues that could be impacting conversions
                  </p>
                </div>
                <Button onClick={resetScan} variant="outline" size="sm">
                  New Scan
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-critical/5 border border-critical/20">
                  <XCircle className="w-8 h-8 text-critical mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">2</p>
                  <p className="text-xs text-muted-foreground">Critical</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-warning/5 border border-warning/20">
                  <AlertTriangle className="w-8 h-8 text-warning mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">2</p>
                  <p className="text-xs text-muted-foreground">Warning</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-success/5 border border-success/20">
                  <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">12</p>
                  <p className="text-xs text-muted-foreground">Passed</p>
                </div>
              </div>
            </Card>

            {/* Issues */}
            <div className="space-y-3">
              {SAMPLE_ISSUES.map((issue, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-card-hover transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 mt-1">
                        {issue.severity === "critical" ? (
                          <XCircle className="w-5 h-5 text-critical" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-warning" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1">
                            <h4 className="text-base font-semibold text-foreground mb-1">
                              {issue.title}
                            </h4>
                            <p className="text-xs font-mono text-muted-foreground">
                              {issue.page}
                            </p>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                            issue.severity === "critical"
                              ? "bg-critical/10 text-critical"
                              : "bg-warning/10 text-warning"
                          }`}>
                            {issue.severity}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          <strong>Impact:</strong> {issue.impact}
                        </p>
                        <p className="text-sm text-muted-foreground mb-3">
                          {issue.description}
                        </p>
                        <div className="p-3 rounded-lg bg-muted">
                          <p className="text-xs text-foreground">
                            <strong>Recommended fix:</strong> {issue.recommendation}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <Card className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Want automated daily scans with real-time alerts?
              </p>
              <Button size="lg" className="gap-2">
                Request Access to Full Product
                <ArrowRight size={16} />
              </Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
