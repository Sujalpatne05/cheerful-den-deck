import { useMemo, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, CheckCircle2, Plus, Pencil, Trash2 } from "lucide-react";

type TaskPriority = "High" | "Medium" | "Low";
type TaskStatus = "Pending" | "In Progress" | "Completed";

type HousekeepingTask = {
  id: string;
  room: string;
  task: string;
  assignee: string;
  priority: TaskPriority;
  status: TaskStatus;
};

const initialTasks: HousekeepingTask[] = [
  { id: "1", room: "101", task: "Deep Clean", assignee: "Maria G.", priority: "High", status: "In Progress" },
  { id: "2", room: "103", task: "Turnover Clean", assignee: "John D.", priority: "Medium", status: "Pending" },
  { id: "3", room: "207", task: "Linen Change", assignee: "Maria G.", priority: "Low", status: "Completed" },
  { id: "4", room: "301", task: "Deep Clean", assignee: "Sarah K.", priority: "High", status: "Pending" },
  { id: "5", room: "205", task: "Maintenance Fix", assignee: "Tom R.", priority: "High", status: "In Progress" },
  { id: "6", room: "402", task: "Turnover Clean", assignee: "John D.", priority: "Medium", status: "Completed" },
];

const priorityColors: Record<TaskPriority, string> = {
  High: "bg-destructive/10 text-destructive border-destructive/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  Low: "bg-success/10 text-success border-success/20",
};

const statusColors: Record<TaskStatus, string> = {
  "In Progress": "bg-primary/10 text-primary border-primary/20",
  Pending: "bg-warning/10 text-warning border-warning/20",
  Completed: "bg-success/10 text-success border-success/20",
};

const Housekeeping = () => {
  const [tasks, setTasks] = useState<HousekeepingTask[]>([]);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<HousekeepingTask | null>(null);
  const [newTask, setNewTask] = useState<{
    room: string;
    task: string;
    assignee: string;
    priority: TaskPriority;
    status: TaskStatus;
  }>({
    room: "",
    task: "",
    assignee: "",
    priority: "Medium",
    status: "Pending",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { tasks: data } = await api.getHousekeepingTasks();
        const mapped = (data || []).map((task: any) => ({
          id: task.id,
          room: task.room_number,
          task: task.task,
          assignee: task.assigned_to || "Unassigned",
          priority: task.priority,
          status: task.status,
        }));
        setTasks(mapped);
      } catch (error: any) {
        toast({
          title: "Failed to load tasks",
          description: error.message || "Could not load housekeeping tasks",
          variant: "destructive",
        });
      }
    };
    fetchTasks();
  }, []);

  const canSubmitNewTask =
    newTask.room.trim().length > 0 &&
    newTask.task.trim().length > 0 &&
    newTask.assignee.trim().length > 0;

  const summary = useMemo(() => {
    let pending = 0;
    let inProgress = 0;
    let completed = 0;

    for (const t of tasks) {
      if (t.status === "Pending") pending += 1;
      else if (t.status === "In Progress") inProgress += 1;
      else if (t.status === "Completed") completed += 1;
    }

    return { pending, inProgress, completed };
  }, [tasks]);

  const handleCreateTask = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!canSubmitNewTask) return;

    try {
      const taskData = {
        room_number: newTask.room.trim(),
        task: newTask.task.trim(),
        assigned_to: newTask.assignee.trim(),
        priority: newTask.priority,
        status: newTask.status,
        notes: "",
      };

      const { task } = await api.createHousekeepingTask(taskData);

      const mappedTask: HousekeepingTask = {
        id: task.id,
        room: task.room_number,
        task: task.task,
        assignee: task.assigned_to || "Unassigned",
        priority: task.priority,
        status: task.status,
      };

      setTasks((prev) => [mappedTask, ...prev]);
      toast({ title: "Task created", description: "Housekeeping task added successfully" });
      setAddOpen(false);
      setNewTask({ room: "", task: "", assignee: "", priority: "Medium", status: "Pending" });
    } catch (error: any) {
      toast({
        title: "Failed to create task",
        description: error.message || "Could not create task",
        variant: "destructive",
      });
    }
  };

  const handleEditTask = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editingTask || !canSubmitNewTask) return;

    try {
      const taskData = {
        room_number: newTask.room.trim(),
        task: newTask.task.trim(),
        assigned_to: newTask.assignee.trim(),
        priority: newTask.priority,
        status: newTask.status,
      };

      const { task } = await api.updateHousekeepingTask(editingTask.id, taskData);

      const mappedTask: HousekeepingTask = {
        id: task.id,
        room: task.room_number,
        task: task.task,
        assignee: task.assigned_to || "Unassigned",
        priority: task.priority,
        status: task.status,
      };

      setTasks((prev) => prev.map(t => t.id === editingTask.id ? mappedTask : t));
      toast({ title: "Task updated", description: "Housekeeping task updated successfully" });
      setEditOpen(false);
      setEditingTask(null);
      setNewTask({ room: "", task: "", assignee: "", priority: "Medium", status: "Pending" });
    } catch (error: any) {
      toast({
        title: "Failed to update task",
        description: error.message || "Could not update task",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTask = async (task: HousekeepingTask) => {
    if (!confirm(`Are you sure you want to delete this task for Room ${task.room}?`)) {
      return;
    }

    try {
      await api.deleteHousekeepingTask(task.id);
      setTasks((prev) => prev.filter(t => t.id !== task.id));
      toast({ title: "Task deleted", description: "Housekeeping task deleted successfully" });
    } catch (error: any) {
      toast({
        title: "Failed to delete task",
        description: error.message || "Could not delete task",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (task: HousekeepingTask) => {
    setEditingTask(task);
    setNewTask({
      room: task.room,
      task: task.task,
      assignee: task.assignee,
      priority: task.priority,
      status: task.status,
    });
    setEditOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Housekeeping</h1>
          <p className="text-sm text-muted-foreground">Task assignments and room cleaning status</p>
        </div>

        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Sparkles className="h-4 w-4" /> New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>New Housekeeping Task</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="hk-room">Room</Label>
                  <Input
                    id="hk-room"
                    placeholder="e.g. 103"
                    value={newTask.room}
                    onChange={(e) => setNewTask((prev) => ({ ...prev, room: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hk-assignee">Assignee</Label>
                  <Input
                    id="hk-assignee"
                    placeholder="e.g. Maria G."
                    value={newTask.assignee}
                    onChange={(e) => setNewTask((prev) => ({ ...prev, assignee: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hk-task">Task</Label>
                <Input
                  id="hk-task"
                  placeholder="e.g. Turnover Clean"
                  value={newTask.task}
                  onChange={(e) => setNewTask((prev) => ({ ...prev, task: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value) => setNewTask((prev) => ({ ...prev, priority: value as TaskPriority }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={newTask.status}
                    onValueChange={(value) => setNewTask((prev) => ({ ...prev, status: value as TaskStatus }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setAddOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={!canSubmitNewTask}>
                  Add Task
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Task Dialog */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleEditTask} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-room">Room</Label>
                  <Input
                    id="edit-room"
                    placeholder="e.g. 101"
                    value={newTask.room}
                    onChange={(e) => setNewTask((prev) => ({ ...prev, room: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-assignee">Assignee</Label>
                  <Input
                    id="edit-assignee"
                    placeholder="e.g. Maria G."
                    value={newTask.assignee}
                    onChange={(e) => setNewTask((prev) => ({ ...prev, assignee: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-task">Task Description</Label>
                <Input
                  id="edit-task"
                  placeholder="e.g. Deep Clean"
                  value={newTask.task}
                  onChange={(e) => setNewTask((prev) => ({ ...prev, task: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value) => setNewTask((prev) => ({ ...prev, priority: value as TaskPriority }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={newTask.status}
                    onValueChange={(value) => setNewTask((prev) => ({ ...prev, status: value as TaskStatus }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setEditOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={!canSubmitNewTask}>
                  Update Task
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {[
          { label: "Pending", count: summary.pending, color: "text-warning" },
          { label: "In Progress", count: summary.inProgress, color: "text-primary" },
          { label: "Completed", count: summary.completed, color: "text-success" },
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
                <th className="px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t) => (
                <tr key={t.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-5 py-3 font-medium text-foreground">Room {t.room}</td>
                  <td className="px-5 py-3 text-foreground">{t.task}</td>
                  <td className="px-5 py-3 text-muted-foreground">{t.assignee}</td>
                  <td className="px-5 py-3">
                    <Badge variant="outline" className={priorityColors[t.priority]}>
                      {t.priority}
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant="outline" className={statusColors[t.status]}>
                      {t.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={() => openEditDialog(t)}>
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteTask(t)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Housekeeping;
