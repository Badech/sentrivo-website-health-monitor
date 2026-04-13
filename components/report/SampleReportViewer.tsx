"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  FileText, 
  AlertTriangle, 
  XCircle, 
  CheckCircle2,
  TrendingDown,
  Calendar,
  Globe,
  ArrowRight
} from "lucide-react";
import { ScoreRing } from "@/components/app/ScoreRing";
import Link from "next/link";

const REPORT_DATA = {
  site: "acmeplumbing.com",
  scanDate: "April 10, 2026",
  dateRange: "Last 7 days",
  healthScore: 68,
  pagesScanned: 47,
  totalChecks: 142,
  issuesFound: 4,
  criticalIssues: 2,
  warningIssues: 2,
  checksPasssed: 12,
};

const CRITICAL_FINDINGS = [
  {
    title: "Contact form returns 500 error on submission",
    page: "/contact",
    category: "Broken Form",
    severity: "critical" as const,
    impact: "100% of form submissions failing",
    businessImpact: "All contact form leads are being lost. Typical local service sites receive 15-20 form submissions per week from organic traffic.",
    evidence: "Error detected at form submit handler on /contact page. Server responds with 500 Internal Server Error.",
    recommendation: "Check server logs for the /api/contact endpoint. Verify database connection and form handler configuration.",
    technicalDetail: "POST request to /api/contact returns status 500. Form validation passes but server-side processing fails.",
    potentialImpact: "High-value conversion path completely blocked",
  },
  {
    title: "Primary CTA button invisible on mobile devices",
    page: "/services",
    category: "CTA Visibility",
    severity: "critical" as const,
    impact: "Mobile users cannot see main conversion action",
    businessImpact: "Primary 'Book Appointment' button hidden on mobile. With 64% mobile traffic, this creates a major conversion barrier for most visitors.",
    evidence: "Button positioned -50px below viewport fold on 375px width screens. CSS media query misconfiguration detected.",
    recommendation: "Adjust mobile CSS to ensure CTA button appears above the fold on all mobile screen sizes.",
    technicalDetail: "Element has CSS property 'margin-top: -50px' applied at mobile breakpoint, pushing button out of view.",
    potentialImpact: "Primary conversion action unavailable to majority of visitors",
  },
];

const WARNING_FINDINGS = [
  {
    title: "Click-to-call button has invalid tel: format",
    page: "/",
    category: "Call Button",
    severity: "warning" as const,
    impact: "Mobile users may not be able to initiate calls",
    businessImpact: "Phone clicks from mobile devices may fail on certain devices. This reduces immediate contact opportunities from mobile visitors.",
    evidence: "Phone link formatted as 'tel:555.123.4567' instead of proper 'tel:555-123-4567' format.",
    recommendation: "Update tel: link format to use standard hyphen formatting for better mobile compatibility.",
    technicalDetail: "Invalid tel: URL schema may not trigger dialer app on some mobile devices.",
    potentialImpact: "Reduced mobile call conversion rate",
  },
  {
    title: "Page load time exceeds 4 seconds on mobile",
    page: "/gallery",
    category: "Mobile Performance",
    severity: "warning" as const,
    impact: "Slow loading may cause visitor drop-off",
    businessImpact: "Mobile page load of 4.2s exceeds Google's recommended 2.5s threshold. May impact search rankings and increase bounce rate.",
    evidence: "Largest Contentful Paint (LCP): 4.2 seconds. Primarily caused by unoptimized images (12 images over 500KB each).",
    recommendation: "Compress images to WebP format and implement lazy loading for below-fold images.",
    technicalDetail: "Total page weight: 8.4MB. Images account for 7.2MB of transfer size.",
    potentialImpact: "SEO ranking impact and higher bounce rate on mobile",
  },
];

export function SampleReportViewer() {
  return (
    <div className="space-y-6">
      {/* Report Header */}
      <Card className="p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Globe size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {REPORT_DATA.site}
                </h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-0.5">
                  <Calendar size={14} />
                  <span>Report generated {REPORT_DATA.scanDate}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-muted-foreground">
                {REPORT_DATA.pagesScanned} pages scanned
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">
                {REPORT_DATA.totalChecks} checks performed
              </span>
            </div>
          </div>
          
          <Button variant="outline" className="gap-2">
            <Download size={16} />
            Export PDF
          </Button>
        </div>

        {/* Health Score and Summary */}
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 flex flex-col items-center justify-center p-6 rounded-xl border border-border bg-muted/30">
            <p className="text-sm font-medium text-muted-foreground mb-3">Health Score</p>
            <ScoreRing score={REPORT_DATA.healthScore} size={120} />
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Needs attention
            </p>
          </div>
          
          <div className="lg:col-span-3 grid sm:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-xl bg-critical/5 border border-critical/20">
              <XCircle className="w-8 h-8 text-critical mx-auto mb-2" />
              <p className="text-3xl font-bold text-foreground">{REPORT_DATA.criticalIssues}</p>
              <p className="text-sm text-muted-foreground">Critical Issues</p>
              <p className="text-xs text-critical mt-1 font-medium">Immediate action required</p>
            </div>
            
            <div className="text-center p-4 rounded-xl bg-warning/5 border border-warning/20">
              <AlertTriangle className="w-8 h-8 text-warning mx-auto mb-2" />
              <p className="text-3xl font-bold text-foreground">{REPORT_DATA.warningIssues}</p>
              <p className="text-sm text-muted-foreground">Warnings</p>
              <p className="text-xs text-warning mt-1 font-medium">Should be addressed soon</p>
            </div>
            
            <div className="text-center p-4 rounded-xl bg-success/5 border border-success/20">
              <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-2" />
              <p className="text-3xl font-bold text-foreground">{REPORT_DATA.checksPasssed}</p>
              <p className="text-sm text-muted-foreground">Checks Passed</p>
              <p className="text-xs text-success mt-1 font-medium">Working correctly</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Executive Summary */}
      <Card className="p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-4">
          <FileText size={20} className="text-primary" />
          <h3 className="text-xl font-bold text-foreground">Executive Summary</h3>
        </div>
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            This report covers website health monitoring for <strong className="text-foreground">{REPORT_DATA.site}</strong> from {REPORT_DATA.dateRange}. 
            Our automated scans detected <strong className="text-critical">{REPORT_DATA.criticalIssues} critical issues</strong> that 
            are actively blocking conversions and should be addressed immediately.
          </p>
          <p>
            The most severe problems affect core conversion paths: a broken contact form is blocking 100% of form submissions, 
            and the primary call-to-action is invisible to mobile users who represent 64% of site traffic. For a local service business 
            receiving typical traffic volumes, these issues could result in significant lost opportunity each week.
          </p>
          <p>
            Additionally, {REPORT_DATA.warningIssues} warning-level issues were detected that degrade user experience and may impact 
            search rankings. While not immediately critical, addressing these will improve overall site performance and conversion rates.
          </p>
        </div>
      </Card>

      {/* Critical Findings */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <XCircle size={20} className="text-critical" />
          <h3 className="text-xl font-bold text-foreground">Critical Issues</h3>
          <span className="px-2 py-0.5 rounded text-xs font-semibold bg-critical/10 text-critical">
            Requires immediate attention
          </span>
        </div>
        
        <div className="space-y-4">
          {CRITICAL_FINDINGS.map((issue, i) => (
            <Card key={i} className="p-6 border-critical/30 bg-critical/5">
              <div className="flex items-start gap-4 mb-4">
                <div className="shrink-0 mt-1">
                  <XCircle className="w-5 h-5 text-critical" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-1">
                        {issue.title}
                      </h4>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-mono text-muted-foreground">{issue.page}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{issue.category}</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded text-xs font-semibold uppercase bg-critical/20 text-critical shrink-0">
                      Critical
                    </span>
                  </div>

                  {/* Business Impact */}
                  <div className="mb-4 p-4 rounded-lg bg-background border border-border">
                    <div className="flex items-start gap-2 mb-2">
                      <TrendingDown size={16} className="text-critical mt-0.5 shrink-0" />
                      <p className="text-sm font-semibold text-foreground">Business Impact</p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                      {issue.businessImpact}
                    </p>
                    <p className="text-sm font-semibold text-critical">
                      {issue.potentialImpact}
                    </p>
                  </div>

                  {/* Evidence */}
                  <div className="mb-4 p-3 rounded-lg bg-muted/50 border border-border/50">
                    <p className="text-xs font-semibold text-foreground mb-1">Evidence</p>
                    <p className="text-xs text-muted-foreground">{issue.evidence}</p>
                  </div>

                  {/* Technical Detail */}
                  <div className="mb-4 p-3 rounded-lg bg-muted/50 border border-border/50">
                    <p className="text-xs font-semibold text-foreground mb-1">Technical Details</p>
                    <p className="text-xs text-muted-foreground font-mono">{issue.technicalDetail}</p>
                  </div>

                  {/* Recommendation */}
                  <div className="p-4 rounded-lg bg-success/10 border border-success/30">
                    <p className="text-sm font-semibold text-foreground mb-1">✓ Recommended Fix</p>
                    <p className="text-sm text-foreground">{issue.recommendation}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Warning Issues */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={20} className="text-warning" />
          <h3 className="text-xl font-bold text-foreground">Warning-Level Issues</h3>
        </div>
        
        <div className="space-y-4">
          {WARNING_FINDINGS.map((issue, i) => (
            <Card key={i} className="p-6 border-warning/20">
              <div className="flex items-start gap-4">
                <div className="shrink-0 mt-1">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h4 className="text-base font-semibold text-foreground mb-1">
                        {issue.title}
                      </h4>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-mono text-muted-foreground">{issue.page}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{issue.category}</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded text-xs font-semibold uppercase bg-warning/20 text-warning shrink-0">
                      Warning
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{issue.businessImpact}</p>

                  <div className="mb-3 p-3 rounded-lg bg-muted/50 border border-border/50">
                    <p className="text-xs text-muted-foreground">{issue.evidence}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-success/5 border border-success/20">
                    <p className="text-sm text-foreground">
                      <strong>Fix:</strong> {issue.recommendation}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <Card className="p-6 lg:p-8 bg-primary/5 border-primary/20">
        <h3 className="text-xl font-bold text-foreground mb-4">Next Steps</h3>
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-bold text-primary">1</span>
            </div>
            <p className="text-sm text-foreground">
              <strong>Address critical issues immediately:</strong> Fix the contact form and mobile CTA visibility to stop revenue loss.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-bold text-primary">2</span>
            </div>
            <p className="text-sm text-foreground">
              <strong>Schedule warning-level fixes:</strong> Update the tel: link format and optimize gallery page images within the next 1-2 weeks.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-xs font-bold text-primary">3</span>
            </div>
            <p className="text-sm text-foreground">
              <strong>Monitor ongoing health:</strong> Set up continuous monitoring to catch issues before they impact conversions.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Want automated monitoring like this for all your client sites?
          </p>
          <Link href="/demo">
            <Button size="lg" className="gap-2">
              Try Sample Scan
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </Card>

      {/* Report Footer */}
      <div className="text-center pt-4">
        <p className="text-xs text-muted-foreground">
          This is a sample report showing realistic data. Actual reports are generated from live scans.
        </p>
      </div>
    </div>
  );
}
