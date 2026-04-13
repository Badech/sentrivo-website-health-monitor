'use client';

import { AppTopbar } from '@/components/app/AppTopbar';
import { StatusPill } from '@/components/app/StatusPill';
import { XCircle, AlertTriangle, Filter, ChevronDown, ChevronUp, Smartphone, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const issues = [
  { 
    id: 'ISS-001', 
    severity: 'critical' as const, 
    title: 'Contact form submission returning 500', 
    page: '/contact', 
    category: 'Broken Form', 
    detected: '2h ago', 
    status: 'Open',
    evidence: 'POST request to /api/contact returns status 500',
    impact: '100% of form submissions failing',
    recommendation: 'Check server logs for /api/contact endpoint. Verify database connection.',
    affectedUsers: 'All visitors'
  },
  { 
    id: 'ISS-002', 
    severity: 'critical' as const, 
    title: 'Primary CTA not visible on mobile viewport', 
    page: '/pricing', 
    category: 'CTA Weakness', 
    detected: '4h ago', 
    status: 'Open',
    evidence: 'Button positioned -50px below viewport fold on 375px screens',
    impact: '64% of traffic (mobile users) cannot see primary action',
    recommendation: 'Adjust mobile CSS to position CTA above the fold',
    affectedUsers: 'Mobile visitors'
  },
  { 
    id: 'ISS-003', 
    severity: 'critical' as const, 
    title: 'Calendly embed failing to initialize', 
    page: '/schedule', 
    category: 'Booking Widget', 
    detected: '5h ago', 
    status: 'Open',
    evidence: 'JavaScript error: Calendly is not defined',
    impact: 'Appointment booking unavailable',
    recommendation: 'Verify Calendly script is loaded before widget initialization',
    affectedUsers: 'All visitors'
  },
  { 
    id: 'ISS-004', 
    severity: 'warning' as const, 
    title: 'Mobile page load time exceeds 4s threshold', 
    page: '/services', 
    category: 'Mobile UX', 
    detected: '6h ago', 
    status: 'Open',
    evidence: 'LCP: 4.2s, primarily from unoptimized images (7.2MB)',
    impact: 'May impact mobile conversion rate and SEO',
    recommendation: 'Compress images to WebP format and implement lazy loading',
    affectedUsers: 'Mobile visitors'
  },
  { 
    id: 'ISS-005', 
    severity: 'warning' as const, 
    title: 'GA4 conversion event not firing on form submit', 
    page: '/landing-v2', 
    category: 'Tracking Gap', 
    detected: '12h ago', 
    status: 'Open',
    evidence: 'Expected event "form_submit" not present in GA4 debug console',
    impact: 'Conversion tracking incomplete for this landing page',
    recommendation: 'Verify GA4 event trigger is attached to form submit handler',
    affectedUsers: 'Marketing team'
  },
  { 
    id: 'ISS-006', 
    severity: 'warning' as const, 
    title: 'Click-to-call link returns invalid tel: format', 
    page: '/contact', 
    category: 'Call Button', 
    detected: '1d ago', 
    status: 'In Progress',
    evidence: 'Link formatted as "tel:555.123.4567" instead of "tel:555-123-4567"',
    impact: 'May not trigger dialer on some mobile devices',
    recommendation: 'Update tel: link to use hyphen formatting',
    affectedUsers: 'Mobile visitors'
  },
  { 
    id: 'ISS-007', 
    severity: 'warning' as const, 
    title: 'Hero CTA contrast ratio below WCAG AA', 
    page: '/', 
    category: 'CTA Weakness', 
    detected: '1d ago', 
    status: 'Open',
    evidence: 'Contrast ratio 3.8:1, WCAG AA requires 4.5:1',
    impact: 'Reduced accessibility and visibility',
    recommendation: 'Increase button text color contrast or adjust background',
    affectedUsers: 'All visitors'
  },
  { 
    id: 'ISS-008', 
    severity: 'warning' as const, 
    title: 'Image lazy loading not applied to LCP element', 
    page: '/about', 
    category: 'Mobile UX', 
    detected: '2d ago', 
    status: 'Open',
    evidence: 'Hero image has loading="lazy" attribute causing LCP delay',
    impact: 'Slower perceived page load time',
    recommendation: 'Remove lazy loading from above-fold images',
    affectedUsers: 'All visitors'
  },
];

export default function IssuesPage() {
  const [expandedIssue, setExpandedIssue] = useState<string | null>(null);

  return (
    <>
      <AppTopbar title="Issues" />
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0 mb-4 md:mb-6">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-foreground">Issues Center</h2>
              <p className="text-xs md:text-sm text-muted-foreground">All detected issues across your monitored sites</p>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5 self-start md:self-auto">
              <Filter size={14} /> Filter
            </Button>
          </div>

          {/* Summary pills */}
          <div className="flex gap-2 md:gap-3 mb-4 md:mb-6 flex-wrap">
            <div className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg border border-border bg-card text-xs md:text-sm">
              <span className="text-muted-foreground">Total: </span>
              <span className="font-semibold text-foreground">8</span>
            </div>
            <div className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg border border-critical/20 bg-critical/5 text-xs md:text-sm">
              <span className="text-critical/70">Critical: </span>
              <span className="font-semibold text-critical">3</span>
            </div>
            <div className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg border border-warning/20 bg-warning/5 text-xs md:text-sm">
              <span className="text-warning/70">Warning: </span>
              <span className="font-semibold text-warning">5</span>
            </div>
          </div>

          {/* Mobile: Card Layout */}
          <div className="md:hidden space-y-3">
            {issues.map((issue) => (
              <div key={issue.id} className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
                <div 
                  className="p-4 cursor-pointer"
                  onClick={() => setExpandedIssue(expandedIssue === issue.id ? null : issue.id)}
                >
                  <div className="flex items-start gap-3 mb-3">
                    {issue.severity === 'critical' ? (
                      <XCircle size={16} className="text-critical shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle size={16} className="text-warning shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-foreground mb-1 leading-snug">{issue.title}</h3>
                      <p className="text-xs text-muted-foreground font-mono">{issue.page}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusPill status={issue.severity} />
                      {expandedIssue === issue.id ? (
                        <ChevronUp size={16} className="text-muted-foreground" />
                      ) : (
                        <ChevronDown size={16} className="text-muted-foreground" />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pl-7">
                    <span>{issue.category}</span>
                    <div className="flex items-center gap-1.5">
                      {issue.affectedUsers === 'Mobile visitors' && <Smartphone size={12} />}
                      {issue.affectedUsers === 'All visitors' && <Monitor size={12} />}
                      <span>{issue.detected}</span>
                    </div>
                  </div>
                </div>
                
                {expandedIssue === issue.id && (
                  <div className="px-4 pb-4 space-y-3 border-t border-border pt-3 bg-muted/20">
                    <div>
                      <p className="text-xs font-semibold text-foreground mb-1">Impact</p>
                      <p className="text-xs text-muted-foreground">{issue.impact}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground mb-1">Evidence</p>
                      <p className="text-xs text-muted-foreground font-mono">{issue.evidence}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground mb-1">Recommended Fix</p>
                      <p className="text-xs text-muted-foreground">{issue.recommendation}</p>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <Button size="sm" className="text-xs h-8">Mark as Fixed</Button>
                      <Button size="sm" variant="outline" className="text-xs h-8">Copy Details</Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop: Table Layout */}
          <div className="hidden md:block space-y-3">
            {issues.map((issue) => (
              <div key={issue.id} className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
                <div 
                  className="px-5 py-4 hover:bg-muted/20 transition-colors cursor-pointer"
                  onClick={() => setExpandedIssue(expandedIssue === issue.id ? null : issue.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {issue.severity === 'critical' ? (
                        <XCircle size={16} className="text-critical shrink-0" />
                      ) : (
                        <AlertTriangle size={16} className="text-warning shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground mb-0.5">{issue.title}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="font-mono">{issue.page}</span>
                          <span>•</span>
                          <span>{issue.category}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            {issue.affectedUsers === 'Mobile visitors' && <Smartphone size={12} />}
                            {issue.affectedUsers === 'All visitors' && <Monitor size={12} />}
                            <span>{issue.affectedUsers}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <StatusPill status={issue.severity} />
                      <span className="text-xs text-muted-foreground w-16">{issue.detected}</span>
                      {expandedIssue === issue.id ? (
                        <ChevronUp size={16} className="text-muted-foreground" />
                      ) : (
                        <ChevronDown size={16} className="text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </div>
                
                {expandedIssue === issue.id && (
                  <div className="px-5 pb-4 border-t border-border bg-muted/10">
                    <div className="grid md:grid-cols-3 gap-4 pt-4">
                      <div>
                        <p className="text-xs font-semibold text-foreground mb-2">Business Impact</p>
                        <p className="text-sm text-muted-foreground">{issue.impact}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground mb-2">Evidence</p>
                        <p className="text-sm text-muted-foreground font-mono text-xs">{issue.evidence}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground mb-2">Recommended Fix</p>
                        <p className="text-sm text-muted-foreground">{issue.recommendation}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-4 mt-4 border-t border-border">
                      <Button size="sm">Mark as Fixed</Button>
                      <Button size="sm" variant="outline">Copy Details</Button>
                      <Button size="sm" variant="ghost">View Full Report</Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
