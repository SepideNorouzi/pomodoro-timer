import React from "react";
import { type Task } from "../../types";
import { formatTime } from "../TimerPanel/TimerDisplay";
import { useTaskContext } from "../../context/TaskContext";

interface TaskItemProps {
  task: Task;
}

// Renders one task row: task name on the left, total time logged on the right.
// It reuses the `formatTime` utility from TimerDisplay so MM:SS formatting
// is consistent across the whole app
const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  // Only the actual task object remains a prop, because TaskItem is rendering one specific task
  const { deleteTask, activeTaskId, setActiveTaskId } = useTaskContext();

  return (
    <div
      className={`task-item ${activeTaskId === task.id ? "active" : ""}`}
      onClick={() => setActiveTaskId(task.id)}
    >
      <span className="task-item__name">{task.name}</span>

      <span className="task-item__duration">
        {formatTime(task.totalSeconds)}
      </span>

      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
};

export default TaskItem;
