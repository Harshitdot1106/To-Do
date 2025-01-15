import { Check, Star, Bell, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Badge } from "./ui/badge";

const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
    case "medium":
      return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
    case "low":
      return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
    default:
      return "";
  }
};

export const TaskList = ({
  tasks,
  onToggleComplete,
  onToggleImportant,
  title = "Tasks",
}) => {
  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="space-y-4">
      {incompleteTasks.length > 0 && (
        <div className="space-y-2">
          {incompleteTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 group"
            >
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full border border-muted-foreground/50"
                  onClick={() => onToggleComplete(task.id)}
                >
                  <Check className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Button>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{task.text}</span>
                    <Badge variant="outline" className={cn(getPriorityColor(task.priority))}>
                      {task.priority}
                    </Badge>
                  </div>
                  {(task.dueDate || task.reminder) && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {task.dueDate && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{format(task.dueDate, "PPP")}</span>
                        </div>
                      )}
                      {task.reminder && (
                        <div className="flex items-center gap-1">
                          <Bell className="h-3 w-3" />
                          <span>Reminder set</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onToggleImportant(task.id)}
                className={cn(
                  "text-muted-foreground hover:text-yellow-400",
                  task.important && "text-yellow-400"
                )}
              >
                <Star className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {completedTasks.length > 0 && (
        <>
          <div className="text-muted-foreground mt-8 mb-4">Completed</div>
          <div className="space-y-2">
            {completedTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 group opacity-60"
              >
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded-full border border-primary bg-primary/20"
                    onClick={() => onToggleComplete(task.id)}
                  >
                    <Check className="h-4 w-4 text-primary" />
                  </Button>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-sm line-through">{task.text}</span>
                      <Badge variant="outline" className={cn(getPriorityColor(task.priority))}>
                        {task.priority}
                      </Badge>
                    </div>
                    {(task.dueDate || task.reminder) && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {task.dueDate && (
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{format(task.dueDate, "PPP")}</span>
                          </div>
                        )}
                        {task.reminder && (
                          <div className="flex items-center gap-1">
                            <Bell className="h-3 w-3" />
                            <span>Reminder set</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onToggleImportant(task.id)}
                  className={cn(
                    "text-muted-foreground hover:text-yellow-400",
                    task.important && "text-yellow-400"
                  )}
                >
                  <Star className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};