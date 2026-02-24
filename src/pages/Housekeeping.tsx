import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle2 } from "lucide-react";

const tasks = [
  { room: "101", task: "Deep Clean", assignee: "Maria G.", priority: "High", status: "In Progress" },
  { room: "103", task: "Turnover Clean", assignee: "John D.", priority: "Medium", status: "Pending" },
  { room: "207", task: "Linen Change", assignee: "Maria G.", priority: "Low", status: "Completed" },
  { room: "301", task: "Deep Clean", assignee: "Sarah K.", priority: "High", status: "Pending" },
  { room: "205", task: "Maintenance Fix", assignee: "Tom R.", priority: "High", status: "In Progress" },
  { room: "402", task: "Turnover Clean", assignee: "John D.", priority: "Medium", status: "Completed" },
];

const priorityColors: Record<string, string> = {
  High: "bg-destructive/10 text-destructive border-destructive/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  Low: "bg-success/10 text-success border-success/20",
};

const statusColors: Record<string, string> = {
  "In Progress": "bg-primary/10 text-primary border-primary/20",
  Pending: "bg-warning/10 text-warning border-warning/20",
  Completed: "bg-success/10 text-success border-success/20",
};

const Housekeeping = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Housekeeping</h1>
        <p className="text-sm text-muted-foreground">Task assignments and room cleaning status</p>
      </div>
      <Button className="gap-2"><Sparkles className="h-4 w-4" /> New Task</Button>
    </div>

    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {[
        { label: "Pending", count: 2, color: "text-warning" },
        { label: "In Progress", count: 2, color: "text-primary" },
        { label: "Completed", count: 2, color: "text-success" },
      ].map((s) => (
        <Card key={s.label} className="border-none shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <CheckCircle2 className={`h-8 w-8 ${s.color}`} />
            <div>
              <p className="text-2xl font-bold text-foreground">{s.count}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    <Card className="border-none shadow-sm">
      <CardContent className="p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-muted-foreground">
              <th className="px-5 py-3 font-medium">Room</th>
              <th className="px-5 py-3 font-medium">Task</th>
              <th className="px-5 py-3 font-medium">Assignee</th>
              <th className="px-5 py-3 font-medium">Priority</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t, i) => (
              <tr key={i} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                <td className="px-5 py-3 font-medium text-foreground">Room {t.room}</td>
                <td className="px-5 py-3 text-foreground">{t.task}</td>
                <td className="px-5 py-3 text-muted-foreground">{t.assignee}</td>
                <td className="px-5 py-3"><Badge variant="outline" className={priorityColors[t.priority]}>{t.priority}</Badge></td>
                <td className="px-5 py-3"><Badge variant="outline" className={statusColors[t.status]}>{t.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  </div>
);

export default Housekeeping;
