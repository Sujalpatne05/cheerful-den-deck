import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const SettingsPage = () => (
  <div className="space-y-6 max-w-2xl">
    <div>
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      <p className="text-sm text-muted-foreground">Manage your property settings</p>
    </div>

    <Card className="border-none shadow-sm">
      <CardHeader><CardTitle className="text-base">Property Information</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Property Name</Label>
          <Input defaultValue="LodgeOS Hotel" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input defaultValue="admin@lodgeos.com" />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input defaultValue="+1 555-0000" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Address</Label>
          <Input defaultValue="123 Hotel Street, City, State 12345" />
        </div>
        <Button>Save Changes</Button>
      </CardContent>
    </Card>

    <Card className="border-none shadow-sm">
      <CardHeader><CardTitle className="text-base">Notifications</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        {["New bookings", "Check-in reminders", "Payment alerts", "Housekeeping updates"].map((item) => (
          <div key={item} className="flex items-center justify-between">
            <Label className="text-sm">{item}</Label>
            <Switch defaultChecked />
          </div>
        ))}
      </CardContent>
    </Card>
  </div>
);

export default SettingsPage;
