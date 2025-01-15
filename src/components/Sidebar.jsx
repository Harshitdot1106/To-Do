import { CalendarDays, ListTodo, Plus, Star, User } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { TaskProgress } from "./TaskProgress";

export const Sidebar = ({ tasks, onFilterChange, currentFilter }) => {
  console.log(tasks);
  const completedTasks = tasks.filter((task) => task.completed).length;
  console.log("Completed Task are",completedTasks);
  const totalTasks = tasks.length;
  console.log(totalTasks)
  const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  console.log("Progress is ",progress);
  return (
    <aside className="w-64 bg-secondary/50 p-6 flex flex-col h-screen">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <User className="w-6 h-6 text-primary" />
        </div>
        <div>
          <div className="font-semibold">Hey, Welcome Back</div>
          <div className="text-sm text-muted-foreground"></div>
        </div>
      </div>
      <TaskProgress progress={progress} />
      <div className="mt-8 space-y-4">
        <Button
          variant={currentFilter === "all" ? "solid" : "outline"}
          onClick={() => onFilterChange("all")}
        >
          <ListTodo className="w-4 h-4 mr-2" />
          All Tasks
        </Button>
        <Button
          variant={currentFilter === "today" ? "solid" : "outline"}
          onClick={() => onFilterChange("today")}
        >
          <CalendarDays className="w-4 h-4 mr-2" />
          Today
        </Button>
        <Button
          variant={currentFilter === "important" ? "solid" : "outline"}
          onClick={() => onFilterChange("important")}
        >
          <Star className="w-4 h-4 mr-2" />
          Important
        </Button>
        <Button variant="outline" onClick={() => onFilterChange("add")}>
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>
    </aside>
  );
};