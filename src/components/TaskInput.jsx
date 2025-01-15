import { useState } from "react";
import { Bell, Calendar as CalendarIcon, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { format } from "date-fns";
import { toast } from "sonner";

export const TaskInput = ({ onAddTask }) => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState();
  const [reminder, setReminder] = useState(false);
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) {
      toast.error("Task cannot be empty");
      return;
    }
    onAddTask(task, date, reminder, priority);
    setTask("");
    setDate(undefined);
    setReminder(false);
    setPriority("medium");
    toast.success("Task added successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Add a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <div className="flex items-center space-x-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <CalendarIcon className="w-4 h-4 mr-2" />
              {date ? format(date, "PPP") : "Due Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar selected={date} onSelect={setDate} />
          </PopoverContent>
        </Popover>
        <Button
          variant={reminder ? "solid" : "outline"}
          onClick={() => setReminder(!reminder)}
        >
          <Bell className="w-4 h-4 mr-2" />
          Reminder
        </Button>
        <Select value={priority} onValueChange={setPriority}>
          <SelectTrigger>
            <SelectValue>{priority}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Add Task</Button>
    </form>
  );
};