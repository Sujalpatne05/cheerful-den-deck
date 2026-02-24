import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, UserCog, Mail, Phone } from "lucide-react";

const staff = [
  { id: 1, name: "Maria Garcia", role: "Housekeeping Lead", email: "maria@lodge.com", phone: "+1 555-1001", status: "On Duty", shift: "Morning" },
  { id: 2, name: "John Davis", role: "Housekeeper", email: "john@lodge.com", phone: "+1 555-1002", status: "On Duty", shift: "Morning" },
  { id: 3, name: "Sarah Kim", role: "Housekeeper", email: "sarah@lodge.com", phone: "+1 555-1003", status: "Off Duty", shift: "Evening" },
  { id: 4, name: "Tom Rodriguez", role: "Maintenance", email: "tom@lodge.com", phone: "+1 555-1004", status: "On Duty", shift: "Morning" },
  { id: 5, name: "Lisa Chen", role: "Front Desk", email: "lisa@lodge.com", phone: "+1 555-1005", status: "On Duty", shift: "Morning" },
  { id: 6, name: "David Park", role: "Front Desk", email: "david@lodge.com", phone: "+1 555-1006", status: "Off Duty", shift: "Night" },
];

const statusColors: Record<string, string> = {
  "On Duty": "bg-success/10 text-success border-success/20",
  "Off Duty": "bg-muted text-muted-foreground border-border",
};

const Staff = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Staff</h1>
        <p className="text-sm text-muted-foreground">Manage team members and schedules</p>
      </div>
      <Button className="gap-2"><Plus className="h-4 w-4" /> Add Staff</Button>
    </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {staff.map((s) => (
        <Card key={s.id} className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {s.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.role}</p>
                </div>
              </div>
              <Badge variant="outline" className={statusColors[s.status]}>{s.status}</Badge>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" />{s.email}</div>
              <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" />{s.phone}</div>
              <div className="flex items-center gap-2"><UserCog className="h-3.5 w-3.5" />Shift: {s.shift}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default Staff;
