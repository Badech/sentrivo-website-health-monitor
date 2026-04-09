import { AppTopbar } from "@/components/app/AppTopbar";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Globe, Bell, Shield, Key } from "lucide-react";

const integrations = [
  { icon: Mail, name: "Email Alerts", description: "Get notified via email for critical issues", connected: true },
  { icon: MessageSquare, name: "Slack", description: "Send alerts to your team's Slack channel", connected: true },
  { icon: Globe, name: "Google Analytics", description: "Sync issue data with your GA4 property", connected: false },
  { icon: Bell, name: "Webhooks", description: "Send events to your custom endpoint", connected: false },
];

export default function SettingsPage() {
  return (
    <>
      <AppTopbar title="Settings" />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Profile */}
          <section>
            <h2 className="text-lg font-bold text-foreground mb-4">Account</h2>
            <div className="p-6 rounded-xl border border-border bg-card shadow-card space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Name</label>
                  <div className="h-10 px-3 rounded-lg border border-border bg-background flex items-center text-sm text-foreground">
                    Alex Chen
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
                  <div className="h-10 px-3 rounded-lg border border-border bg-background flex items-center text-sm text-foreground">
                    alex@acme-corp.com
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield size={13} />
                  <span>Growth Plan</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Key size={13} />
                  <span>API Key: sk-****7f3a</span>
                </div>
              </div>
            </div>
          </section>

          {/* Integrations */}
          <section>
            <h2 className="text-lg font-bold text-foreground mb-4">Integrations</h2>
            <div className="space-y-3">
              {integrations.map((int) => (
                <div key={int.name} className="flex items-center justify-between p-4 rounded-xl border border-border bg-card shadow-card">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                      <int.icon size={16} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{int.name}</p>
                      <p className="text-xs text-muted-foreground">{int.description}</p>
                    </div>
                  </div>
                  <Button
                    variant={int.connected ? "outline" : "default"}
                    size="sm"
                    className={int.connected ? "text-success border-success/20 hover:bg-success/5" : ""}
                  >
                    {int.connected ? "Connected" : "Connect"}
                  </Button>
                </div>
              ))}
            </div>
          </section>

          {/* Notifications */}
          <section>
            <h2 className="text-lg font-bold text-foreground mb-4">Notification Preferences</h2>
            <div className="p-6 rounded-xl border border-border bg-card shadow-card space-y-4">
              {["Critical issues", "Weekly reports", "Scan completions", "Product updates"].map((pref) => (
                <div key={pref} className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{pref}</span>
                  <div className="w-10 h-6 rounded-full bg-primary/20 relative cursor-pointer">
                    <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
