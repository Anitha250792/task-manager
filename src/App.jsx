import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import useLocalStorage from "./hooks/useLocalStorage";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function AppContent() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const { toggleTheme } = useTheme();

  const addTask = (text) => {
    setTasks([...tasks, { id: Date.now(), text }]);
  };

  const updateTask = (id, newText) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, text: newText } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
