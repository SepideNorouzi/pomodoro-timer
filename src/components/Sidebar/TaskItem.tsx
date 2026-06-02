import React from "react";
import { formatTime } from "../TimerPanel/TimerDisplay";
import { useTaskContext } from "../../context/TaskContext";
import { Trash } from "lucide-react";
import { type Task } from "../../types";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { deleteTask, activeTaskId, setActiveTaskId } = useTaskContext();
  const isActive = activeTaskId === task.id;

  return (
    <div
      className={`task-item ${isActive ? "is-active" : ""}`}
      onClick={() => setActiveTaskId(task.id)}
    >
      {/* Dynamic left text with proper padding clearance */}
      <span className="task-item__name">
        {task.name}
      </span>

      {/* Centered actions pocket */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteTask(task.id);
        }}
        className="task-item__delete-btn"
        title="Delete task"
        aria-label="Delete task"
        type="button"
      >
        <Trash size={18} strokeWidth={2.5} />
      </button>

      {/* Monospaced retro clock readout safely inside the right border */}
      <span className="task-item__duration">
        {formatTime(task.totalSeconds)}
      </span>
    </div>
  );
};

export default TaskItem;