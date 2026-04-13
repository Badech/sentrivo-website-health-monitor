import { AppTopbar } from '@/components/app/AppTopbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
  return (
    <>
      <AppTopbar title="Settings" />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-foreground">Settings</h2>
            <p className="text-sm text-muted-foreground">Manage your account and monitoring preferences</p>
          </div>

          <div className="space-y-6">
            {/* Account Settings */}
            <div className="p-6 rounded-xl border border-border bg-card shadow-card">
              <h3 className="text-sm font-semibold text-foreground mb-4">Account Settings</h3>
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
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" placeholder="Acme Corp" defaultValue="Acme Corp" />
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="p-6 rounded-xl border border-border bg-card shadow-card">
              <h3 className="text-sm font-semibold text-foreground mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Critical Issues</p>
                    <p className="text-xs text-muted-foreground">Get notified immediately when critical issues are detected</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Daily Summary</p>
                    <p className="text-xs text-muted-foreground">Receive a daily digest of all scan results</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Weekly Reports</p>
                    <p className="text-xs text-muted-foreground">Get weekly performance reports via email</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>

            {/* Monitoring Settings */}
            <div className="p-6 rounded-xl border border-border bg-card shadow-card">
              <h3 className="text-sm font-semibold text-foreground mb-4">Monitoring Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Auto-scan on deployment</p>
                    <p className="text-xs text-muted-foreground">Automatically scan when new deployments are detected</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Mobile viewport testing</p>
                    <p className="text-xs text-muted-foreground">Include mobile device testing in scans</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
