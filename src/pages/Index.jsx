import { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Sidebar } from "@/components/Sidebar";
import { TaskInput } from "@/components/TaskInput";
import { TaskList } from "@/components/TaskList";
import { Login } from "@/components/Login";
import { Button } from "@/components/ui/button";
import { logout } from "@/store/authSlice";
import { toast } from "sonner";
import { Moon, Sun } from "lucide-react";
import { FaSun, FaMoon } from 'react-icons/fa'; // Ensure you have react-icons installed

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const username = useSelector((state) => state.auth.user);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const addTask = (text, dueDate, reminder, priority = "medium") => {
    const newTask = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      completed: false,
      important: false,
      createdAt: new Date(),
      dueDate,
      reminder,
      priority,
    };
    setTasks([...tasks, newTask]);
    toast.success("Task added successfully!");
  };
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };
  
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleImportant = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, important: !task.important } : task
      )
    );
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Successfully logged out!");
  };

  const sortTasks = (tasksToSort) => {
    return [...tasksToSort].sort((a, b) => {
      if (sortBy === "priority") {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  };

  const filteredTasks = sortTasks(
    tasks.filter((task) => {
      switch (currentFilter) {
        case "today":
          return task.createdAt.toDateString() === new Date().toDateString();
        case "important":
          return task.important;
        default:
          return true;
      }
    })
  );

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar
        tasks={tasks}
        onFilterChange={setCurrentFilter}
        currentFilter={currentFilter}
      />
      <main className="flex-1 p-6 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{username}!</h1>
          <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <FaSun className="h-4 w-4" />
            ) : (
              <FaMoon className="h-4 w-4" />
            )}
          </Button>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>
        <div className="mb-4">
          <Button
            variant="outline"
            onClick={() => setSortBy(sortBy === "date" ? "priority" : "date")}
            className="text-sm"
          >
            Sort by: {sortBy === "date" ? "Date" : "Priority"}
          </Button>
        </div>
        <TaskInput onAddTask={addTask} />
        <TaskList
          tasks={filteredTasks}
          onToggleComplete={toggleComplete}
          onToggleImportant={toggleImportant}
        />
      </main>
    </div>
  );
};

export default Index;