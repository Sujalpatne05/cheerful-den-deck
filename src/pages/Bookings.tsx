import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter } from "lucide-react";

const bookings = [
  { id: "BK001", guest: "Sarah Johnson", room: "Suite 401", checkIn: "2024-07-20", checkOut: "2024-07-25", total: "$1,750", status: "Checked In" },
  { id: "BK002", guest: "Mike Chen", room: "Room 215", checkIn: "2024-07-21", checkOut: "2024-07-23", total: "$360", status: "Confirmed" },
  { id: "BK003", guest: "Emily Davis", room: "Suite 502", checkIn: "2024-07-22", checkOut: "2024-07-28", total: "$2,100", status: "Pending" },
  { id: "BK004", guest: "James Wilson", room: "Room 108", checkIn: "2024-07-20", checkOut: "2024-07-22", total: "$240", status: "Checked In" },
  { id: "BK005", guest: "Anna Martinez", room: "Room 312", checkIn: "2024-07-23", checkOut: "2024-07-26", total: "$540", status: "Confirmed" },
  { id: "BK006", guest: "Robert Brown", room: "Deluxe 210", checkIn: "2024-07-24", checkOut: "2024-07-27", total: "$720", status: "Pending" },
  { id: "BK007", guest: "Lisa Wang", room: "Suite 601", checkIn: "2024-07-25", checkOut: "2024-07-30", total: "$2,500", status: "Confirmed" },
];

const statusColors: Record<string, string> = {
  "Checked In": "bg-success/10 text-success border-success/20",
  Confirmed: "bg-primary/10 text-primary border-primary/20",
  Pending: "bg-warning/10 text-warning border-warning/20",
  Cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

const Bookings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Bookings</h1>
          <p className="text-sm text-muted-foreground">Manage reservations and check-ins</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> New Booking
        </Button>
      </div>

      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search bookings..." className="pl-9" />
      </div>

      <Card className="border-none shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Booking ID</th>
                  <th className="px-5 py-3 font-medium">Guest</th>
                  <th className="px-5 py-3 font-medium">Room</th>
                  <th className="px-5 py-3 font-medium">Check In</th>
                  <th className="px-5 py-3 font-medium">Check Out</th>
                  <th className="px-5 py-3 font-medium">Total</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b last:border-0 hover:bg-muted/50 cursor-pointer transition-colors">
                    <td className="px-5 py-3 font-medium text-primary">{b.id}</td>
                    <td className="px-5 py-3 font-medium text-foreground">{b.guest}</td>
                    <td className="px-5 py-3 text-muted-foreground">{b.room}</td>
                    <td className="px-5 py-3 text-muted-foreground">{b.checkIn}</td>
                    <td className="px-5 py-3 text-muted-foreground">{b.checkOut}</td>
                    <td className="px-5 py-3 font-medium text-foreground">{b.total}</td>
                    <td className="px-5 py-3">
                      <Badge variant="outline" className={statusColors[b.status]}>{b.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Bookings;
