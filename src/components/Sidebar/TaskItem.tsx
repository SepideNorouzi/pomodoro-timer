import React from "react";
import { type Task } from "../../types";
import { formatTime } from "../TimerPanel/TimerDisplay";

interface TaskItemProps {
  task: Task;
  onDeleteTask: (id: string) => void;
}

// Renders one task row: task name on the left, total time logged on the right.
// It reuses the `formatTime` utility from TimerDisplay so MM:SS formatting
// is consistent across the whole app
const TaskItem: React.FC<TaskItemProps> = ({ task, onDeleteTask }) => {
  return (
    <div className="task-item">
      <span className="task-item__name">{task.name}</span>

      <span className="task-item__duration">
        {formatTime(task.totalSeconds)}
      </span>

      <button
        className="task-item__delete"
        onClick={() => onDeleteTask(task.id)}
      >
        🗑
      </button>
    </div>
  );
};

export default TaskItem;
