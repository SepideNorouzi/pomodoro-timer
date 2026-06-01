import React, { useState } from "react";
import { useTaskContext } from "../../context/TaskContext";

// Once "add task" is clicked, it calls onAddTask (lifting state up to useTasks)
// and then clears itself.
const TaskInput: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const { addTask } = useTaskContext();

  const handleAdd = () => {
    if (!value.trim()) return; // don't submit empty strings
    addTask(value);
    setValue(""); // reset field after submission
  };

  // Pressing Enter should also submit
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="task-input">
      <input
        className="task-input__field"
        type="text"
        placeholder="what are you working on ?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        maxLength={120}
        aria-label="Task name"
      />
      <button
        className="task-input__btn"
        onClick={handleAdd}
        type="button"
        disabled={!value.trim()}
      >
        add task
      </button>
    </div>
  );
};

export default TaskInput;
