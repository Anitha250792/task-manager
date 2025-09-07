import { useState, useEffect } from "react";

export default function TaskItem({ task, updateTask, deleteTask }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.text);
  const [seconds, setSeconds] = useState(0);

  // Timer with cleanup
  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer); // cleanup
  }, []);

  const handleSave = () => {
    updateTask(task.id, text);
    setEditing(false);
  };

  return (
    <div className="task-item">
      {editing ? (
        <>
          <input value={text} onChange={(e) => setText(e.target.value)} />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <span>{task.text}</span>
          <span className="timer">{seconds}s</span>
          <button onClick={() => setEditing(true)}>Edit</button>
        </>
      )}
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
}
