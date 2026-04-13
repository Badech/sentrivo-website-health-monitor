import { AppTopbar } from '@/components/app/AppTopbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function SettingsPage() {
  return (
    <>
      <AppTopbar title="Settings" />
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-bold text-foreground">Settings</h2>
            <p className="text-xs md:text-sm text-muted-foreground">Configure monitoring behavior and account preferences</p>
          </div>

          <div className="space-y-4 md:space-y-6">
            {/* Account Settings */}
            <div className="p-4 md:p-6 rounded-xl border border-border bg-card shadow-card">
              <h3 className="text-xs md:text-sm font-semibold text-foreground mb-3 md:mb-4">Account Information</h3>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" defaultValue="John Doe" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" defaultValue="john@example.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Agency / Company Name</Label>
                  <Input id="company" placeholder="Your Agency Name" defaultValue="Acme Digital Agency" />
                </div>
              </div>
            </div>

            {/* Scan Settings */}
            <div className="p-4 md:p-6 rounded-xl border border-border bg-card shadow-card">
              <h3 className="text-xs md:text-sm font-semibold text-foreground mb-3 md:mb-4">Scan Configuration</h3>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="scanFreq">Scan Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="scanFreq">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Every Hour (Enterprise)</SelectItem>
                      <SelectItem value="daily">Daily (Recommended)</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">How often to automatically scan all monitored sites</p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="excludePaths">Excluded URL Patterns</Label>
                  <Textarea 
                    id="excludePaths" 
                    placeholder="/admin/*&#10;/wp-admin/*&#10;/login" 
                    className="font-mono text-xs"
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">URLs to skip during scans (one per line, supports wildcards)</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Mobile Viewport Testing</p>
                    <p className="text-xs text-muted-foreground">Test pages on mobile viewport (375px, 414px)</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">JavaScript Rendering</p>
                    <p className="text-xs text-muted-foreground">Wait for JavaScript to execute before testing</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            {/* Alert Settings */}
            <div className="p-4 md:p-6 rounded-xl border border-border bg-card shadow-card">
              <h3 className="text-xs md:text-sm font-semibold text-foreground mb-3 md:mb-4">Alert & Notification Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Critical Issue Alerts</p>
                    <p className="text-xs text-muted-foreground">Immediate notification for broken forms, CTAs, call buttons</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Warning Issue Alerts</p>
                    <p className="text-xs text-muted-foreground">Notify for slow loads, tracking issues, accessibility problems</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Daily Summary Email</p>
                    <p className="text-xs text-muted-foreground">Receive a digest of all scan results each morning</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Weekly Report Email</p>
                    <p className="text-xs text-muted-foreground">Get a comprehensive weekly performance report</p>
                  </div>
                  <Switch />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="slackWebhook">Slack Webhook URL (Optional)</Label>
                  <Input 
                    id="slackWebhook" 
                    type="url"
                    placeholder="https://hooks.slack.com/services/..." 
                    className="font-mono text-xs"
                  />
                  <p className="text-xs text-muted-foreground">Send critical alerts to your Slack channel</p>
                </div>
              </div>
            </div>

            {/* Detection Settings */}
            <div className="p-4 md:p-6 rounded-xl border border-border bg-card shadow-card">
              <h3 className="text-xs md:text-sm font-semibold text-foreground mb-3 md:mb-4">Issue Detection Thresholds</h3>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="pageLoadThreshold">Mobile Page Load Threshold (seconds)</Label>
                  <Select defaultValue="4">
                    <SelectTrigger id="pageLoadThreshold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 seconds (Strict)</SelectItem>
                      <SelectItem value="3">3 seconds</SelectItem>
                      <SelectItem value="4">4 seconds (Default)</SelectItem>
                      <SelectItem value="5">5 seconds</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Flag pages that load slower than this on mobile</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">CTA Below Fold Detection</p>
                    <p className="text-xs text-muted-foreground">Alert when primary CTAs are not visible without scrolling</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Form Submission Testing</p>
                    <p className="text-xs text-muted-foreground">Automatically test forms with safe test data</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Track Broken Links</p>
                    <p className="text-xs text-muted-foreground">Check for 404 errors and broken internal links</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>

            {/* Report Settings */}
            <div className="p-4 md:p-6 rounded-xl border border-border bg-card shadow-card">
              <h3 className="text-xs md:text-sm font-semibold text-foreground mb-3 md:mb-4">Report Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Include Screenshots in Reports</p>
                    <p className="text-xs text-muted-foreground">Attach visual evidence of detected issues</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">White-Label Reports</p>
                    <p className="text-xs text-muted-foreground">Remove Sentrivo branding from client-facing reports</p>
                  </div>
                  <Switch />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="reportLogo">Agency Logo URL (Optional)</Label>
                  <Input 
                    id="reportLogo" 
                    type="url"
                    placeholder="https://youragency.com/logo.png" 
                  />
                  <p className="text-xs text-muted-foreground">Add your agency logo to white-label reports</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
              <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
              <Button className="w-full sm:w-auto">Save Changes</Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
