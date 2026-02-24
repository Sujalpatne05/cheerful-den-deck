import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Mail, Phone } from "lucide-react";

const guests = [
  { id: 1, name: "Sarah Johnson", email: "sarah@email.com", phone: "+1 555-0101", visits: 5, status: "Checked In", lastVisit: "Jul 20, 2024" },
  { id: 2, name: "Mike Chen", email: "mike@email.com", phone: "+1 555-0102", visits: 2, status: "Upcoming", lastVisit: "Jul 21, 2024" },
  { id: 3, name: "Emily Davis", email: "emily@email.com", phone: "+1 555-0103", visits: 8, status: "Checked In", lastVisit: "Jul 22, 2024" },
  { id: 4, name: "James Wilson", email: "james@email.com", phone: "+1 555-0104", visits: 1, status: "Checked Out", lastVisit: "Jul 18, 2024" },
  { id: 5, name: "Anna Martinez", email: "anna@email.com", phone: "+1 555-0105", visits: 12, status: "VIP", lastVisit: "Jul 23, 2024" },
  { id: 6, name: "Robert Brown", email: "robert@email.com", phone: "+1 555-0106", visits: 3, status: "Upcoming", lastVisit: "Jul 24, 2024" },
];

const statusColors: Record<string, string> = {
  "Checked In": "bg-success/10 text-success border-success/20",
  Upcoming: "bg-primary/10 text-primary border-primary/20",
  "Checked Out": "bg-muted text-muted-foreground border-border",
  VIP: "bg-warning/10 text-warning border-warning/20",
};

const Guests = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Guests</h1>
          <p className="text-sm text-muted-foreground">Manage guest profiles and history</p>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4" /> Add Guest</Button>
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search guests..." className="pl-9" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {guests.map((g) => (
          <Card key={g.id} className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {g.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{g.name}</p>
                    <p className="text-xs text-muted-foreground">{g.visits} visits</p>
                  </div>
                </div>
                <Badge variant="outline" className={statusColors[g.status]}>{g.status}</Badge>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" />{g.email}</div>
                <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" />{g.phone}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Guests;
