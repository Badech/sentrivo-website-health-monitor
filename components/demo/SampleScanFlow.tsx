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
    severity: "critical" as const,
    title: "Contact form returns 500 error on submission",
    page: "/contact",
    category: "Broken Form",
    impact: "100% of form submissions failing",
    description: "The contact form POST request to /api/contact is returning a 500 server error. This prevents all lead submissions from being captured.",
    recommendation: "Check server logs and verify the /api/contact endpoint is functioning correctly.",
    evidence: "Error detected at form submit handler"
  },
  {
    severity: "critical" as const,
    title: "Primary CTA button invisible on mobile",
    page: "/services",
    category: "CTA Weakness",
    impact: "Mobile users cannot see main conversion action",
    description: "The 'Book Appointment' button has CSS that hides it below the viewport on screens under 768px width.",
    recommendation: "Adjust mobile CSS to ensure CTA is visible above the fold.",
    evidence: "Button positioned -50px below fold on 375px viewport"
  },
  {
    severity: "warning" as const,
    title: "Click-to-call button has invalid tel: format",
    page: "/",
    category: "Call Button",
    impact: "Mobile users cannot initiate calls",
    description: "Phone number link is formatted as 'tel:555.123.4567' but should use hyphens: 'tel:555-123-4567'",
    recommendation: "Update tel: link format to use standard formatting.",
    evidence: "Invalid tel: URL schema detected"
  },
  {
    severity: "warning" as const,
    title: "Page load time exceeds 4 seconds on mobile",
    page: "/gallery",
    category: "Mobile UX",
    impact: "Slow loading may cause visitor drop-off",
    description: "Mobile page load time is 4.2 seconds, primarily due to unoptimized images.",
    recommendation: "Compress images and implement lazy loading for below-fold content.",
    evidence: "LCP: 4.2s (target: <2.5s)"
  }
];

const SCAN_STAGES = [
  { label: "Connecting to website", duration: 1000 },
  { label: "Discovering pages (47 found)", duration: 1500 },
  { label: "Testing form submissions (12 forms)", duration: 2000 },
  { label: "Checking CTA visibility", duration: 1500 },
  { label: "Analyzing mobile UX", duration: 1800 },
  { label: "Verifying call buttons", duration: 1200 },
  { label: "Testing booking widgets", duration: 1500 },
  { label: "Checking tracking tags", duration: 1000 },
  { label: "Compiling report", duration: 800 },
];

export function SampleScanFlow() {
  const [step, setStep] = useState<"input" | "scanning" | "results">("input");
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [checksRun, setChecksRun] = useState(0);

  const handleStartScan = () => {
    if (!url) return;
    setStep("scanning");
    setProgress(0);
    setCurrentStage(0);
    setChecksRun(0);
    
    // Simulate realistic scanning with stages
    let stageIndex = 0;
    let totalDuration = SCAN_STAGES.reduce((sum, stage) => sum + stage.duration, 0);
    let elapsed = 0;

    const runStage = () => {
      if (stageIndex >= SCAN_STAGES.length) {
        setProgress(100);
        setTimeout(() => setStep("results"), 500);
        return;
      }

      setCurrentStage(stageIndex);
      const stage = SCAN_STAGES[stageIndex];
      
      const stageInterval = setInterval(() => {
        elapsed += 100;
        const newProgress = Math.min(100, (elapsed / totalDuration) * 100);
        setProgress(newProgress);
        setChecksRun(Math.floor(newProgress * 1.42)); // Simulate 142 checks
      }, 100);

      setTimeout(() => {
        clearInterval(stageInterval);
        stageIndex++;
        runStage();
      }, stage.duration);
    };

    runStage();
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
            <Card className="p-6 md:p-8">
              <div className="text-center">
                <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
                  Scanning {url}
                </h3>
                
                {/* Current Stage */}
                <div className="mb-6">
                  <p className="text-sm md:text-base text-primary font-medium mb-1">
                    {SCAN_STAGES[currentStage]?.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {checksRun} checks completed
                  </p>
                </div>
                
                {/* Progress Bar */}
                <div className="max-w-md mx-auto mb-6">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {Math.floor(progress)}% complete
                  </p>
                </div>

                {/* Stage List */}
                <div className="max-w-md mx-auto space-y-1.5">
                  {SCAN_STAGES.map((stage, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-2 text-xs md:text-sm transition-opacity ${
                        i < currentStage
                          ? "text-success opacity-70"
                          : i === currentStage
                          ? "text-foreground opacity-100"
                          : "text-muted-foreground opacity-40"
                      }`}
                    >
                      {i < currentStage ? (
                        <CheckCircle2 size={14} className="shrink-0" />
                      ) : i === currentStage ? (
                        <Loader2 size={14} className="animate-spin shrink-0" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-current shrink-0" />
                      )}
                      <span className="text-left">{stage.label.split(" (")[0]}</span>
                    </div>
                  ))}
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
            <Card className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0 mb-6">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-1">
                    Scan Complete
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Scanned 47 pages • Found 4 issues • 142 checks passed
                  </p>
                </div>
                <Button onClick={resetScan} variant="outline" size="sm" className="self-start md:self-auto">
                  New Scan
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-3 md:gap-4">
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
                  <Card className="p-4 md:p-6 hover:shadow-card-hover transition-shadow">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="shrink-0 mt-1">
                        {issue.severity === "critical" ? (
                          <XCircle className="w-4 h-4 md:w-5 md:h-5 text-critical" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-warning" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 md:gap-4 mb-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm md:text-base font-semibold text-foreground mb-1">
                              {issue.title}
                            </h4>
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-xs font-mono text-muted-foreground">
                                {issue.page}
                              </p>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-xs text-muted-foreground">{issue.category}</span>
                            </div>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase shrink-0 ${
                            issue.severity === "critical"
                              ? "bg-critical/10 text-critical"
                              : "bg-warning/10 text-warning"
                          }`}>
                            {issue.severity}
                          </span>
                        </div>
                        
                        <p className="text-xs md:text-sm text-muted-foreground mb-2">
                          <strong className="text-foreground">Impact:</strong> {issue.impact}
                        </p>
                        
                        <p className="text-xs md:text-sm text-muted-foreground mb-3">
                          {issue.description}
                        </p>

                        {issue.evidence && (
                          <div className="mb-3 p-2 md:p-2.5 rounded bg-muted/50 border border-border/50">
                            <p className="text-xs text-muted-foreground">
                              <FileText size={12} className="inline mr-1.5" />
                              <strong>Evidence:</strong> {issue.evidence}
                            </p>
                          </div>
                        )}
                        
                        <div className="p-2.5 md:p-3 rounded-lg bg-success/5 border border-success/20">
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
            <Card className="p-4 md:p-6 text-center bg-primary/5 border-primary/20">
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
                Ready for automated daily monitoring?
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground mb-4">
                Get real-time alerts when issues are detected. Catch problems before they cost you leads.
              </p>
              <Button size="lg" className="gap-2">
                Request Early Access
                <ArrowRight size={16} />
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                Currently in private beta • Limited spots available
              </p>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
