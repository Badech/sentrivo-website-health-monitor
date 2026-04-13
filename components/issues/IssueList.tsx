'use client';

import { useState } from 'react';
import { XCircle, AlertTriangle, ChevronDown, ChevronUp, Smartphone, Monitor } from 'lucide-react';
import { StatusPill } from '@/components/app/StatusPill';

interface Issue {
  id: string;
  title: string;
  severity: 'critical' | 'warning';
  category: string;
  page: string;
  device: 'mobile' | 'desktop' | 'both';
  evidence: string;
  impact: string;
  recommendation: string;
}

export function IssueList({ issues }: { issues: Issue[] }) {
  const [expandedIssue, setExpandedIssue] = useState<string | null>(null);

  return (
    <div className="divide-y divide-border">
      {issues.map((issue) => (
        <div key={issue.id} className="p-4 hover:bg-muted/30 transition-colors">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setExpandedIssue(expandedIssue === issue.id ? null : issue.id)}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {issue.severity === 'critical' ? (
                <XCircle size={18} className="text-critical shrink-0" />
              ) : (
                <AlertTriangle size={18} className="text-warning shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-foreground truncate">{issue.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">{issue.category}</span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs font-mono text-muted-foreground">{issue.page}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="hidden sm:flex items-center gap-1.5">
                {issue.device !== 'desktop' && <Smartphone size={14} className="text-muted-foreground" />}
                {issue.device !== 'mobile' && <Monitor size={14} className="text-muted-foreground" />}
              </div>
              <StatusPill status={issue.severity} />
              {expandedIssue === issue.id ? (
                <ChevronUp size={16} className="text-muted-foreground" />
              ) : (
                <ChevronDown size={16} className="text-muted-foreground" />
              )}
            </div>
          </div>

          {expandedIssue === issue.id && (
            <div className="mt-4 pl-9 space-y-3 text-sm">
              {issue.evidence && (
                <div>
                  <h4 className="text-xs font-semibold text-foreground mb-1">Evidence</h4>
                  <p className="text-xs text-muted-foreground">{issue.evidence}</p>
                </div>
              )}
              {issue.impact && (
                <div>
                  <h4 className="text-xs font-semibold text-foreground mb-1">Business Impact</h4>
                  <p className="text-xs text-muted-foreground">{issue.impact}</p>
                </div>
              )}
              {issue.recommendation && (
                <div>
                  <h4 className="text-xs font-semibold text-foreground mb-1">Recommended Fix</h4>
                  <p className="text-xs text-muted-foreground">{issue.recommendation}</p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
