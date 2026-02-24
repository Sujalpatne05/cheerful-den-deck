import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BedDouble, Search, Plus, Filter } from "lucide-react";

type RoomStatus = "available" | "occupied" | "maintenance" | "cleaning";

interface Room {
  id: string;
  number: string;
  type: string;
  floor: number;
  status: RoomStatus;
  price: number;
  guest?: string;
}

const rooms: Room[] = [
  { id: "1", number: "101", type: "Standard", floor: 1, status: "occupied", price: 120, guest: "Sarah Johnson" },
  { id: "2", number: "102", type: "Standard", floor: 1, status: "available", price: 120 },
  { id: "3", number: "103", type: "Deluxe", floor: 1, status: "cleaning", price: 180 },
  { id: "4", number: "104", type: "Standard", floor: 1, status: "available", price: 120 },
  { id: "5", number: "201", type: "Deluxe", floor: 2, status: "occupied", price: 180, guest: "Mike Chen" },
  { id: "6", number: "202", type: "Suite", floor: 2, status: "occupied", price: 350, guest: "Emily Davis" },
  { id: "7", number: "203", type: "Standard", floor: 2, status: "maintenance", price: 120 },
  { id: "8", number: "204", type: "Deluxe", floor: 2, status: "available", price: 180 },
  { id: "9", number: "301", type: "Suite", floor: 3, status: "occupied", price: 350, guest: "James Wilson" },
  { id: "10", number: "302", type: "Deluxe", floor: 3, status: "available", price: 180 },
  { id: "11", number: "303", type: "Standard", floor: 3, status: "occupied", price: 120, guest: "Anna Martinez" },
  { id: "12", number: "304", type: "Suite", floor: 3, status: "available", price: 350 },
];

const statusConfig: Record<RoomStatus, { label: string; className: string }> = {
  available: { label: "Available", className: "bg-success/10 text-success border-success/20" },
  occupied: { label: "Occupied", className: "bg-primary/10 text-primary border-primary/20" },
  maintenance: { label: "Maintenance", className: "bg-warning/10 text-warning border-warning/20" },
  cleaning: { label: "Cleaning", className: "bg-info/10 text-info border-info/20" },
};

const Rooms = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<RoomStatus | "all">("all");

  const filtered = rooms.filter((r) => {
    const matchSearch = r.number.includes(search) || r.type.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || r.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Rooms</h1>
          <p className="text-sm text-muted-foreground">Manage all rooms and their status</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Room
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search rooms..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {(["all", "available", "occupied", "maintenance", "cleaning"] as const).map((s) => (
            <Button
              key={s}
              variant={filter === s ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(s)}
              className="capitalize"
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((room) => {
          const config = statusConfig[room.status];
          return (
            <Card key={room.id} className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <BedDouble className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Room {room.number}</p>
                      <p className="text-xs text-muted-foreground">{room.type}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={config.className}>
                    {config.label}
                  </Badge>
                </div>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Floor</span>
                    <span className="font-medium text-foreground">{room.floor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rate</span>
                    <span className="font-medium text-foreground">${room.price}/night</span>
                  </div>
                  {room.guest && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Guest</span>
                      <span className="font-medium text-foreground">{room.guest}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Rooms;
