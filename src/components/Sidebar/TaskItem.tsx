import React from "react";
import { formatTime } from "../TimerPanel/TimerDisplay";
import { useTaskContext } from "../../context/TaskContext";
import { Trash } from "lucide-react";
import { type Task } from "../../types";

interface TaskItemProps {
  task: Task;
}

// Renders one task row: task name on the left, total time logged on the right.
// It reuses the `formatTime` utility from TimerDisplay so MM:SS formatting
// is consistent across the whole app
const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  // Only the actual task object remains a prop, because TaskItem is rendering one specific task
  const { deleteTask, activeTaskId, setActiveTaskId } = useTaskContext();
  const isActive = activeTaskId === task.id;

  return (
    <div
      className={`
        grid grid-cols-3 items-center 
        min-h-[72px] px-8 py-3 mb-3 w-full
        border-4 border-black 
        shadow-[4px_4px_0px_#000] 
        cursor-pointer select-none
        transition-all duration-75 ease-in-out
        hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_#000]
        active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
        ${isActive ? "bg-[#ff6368] text-white" : "bg-white text-[#111]"}
      `}
      onClick={() => setActiveTaskId(task.id)}
    >
      {/* Col 1: Left-aligned Name (with pl-2 for inner edge gap) */}
      <span className="text-left font-sans font-bold text-base truncate pl-2">
        {task.name}
      </span>

      {/* Col 2: Center-aligned Delete Icon */}
      <div className="flex justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteTask(task.id);
          }}
          className={`
            p-2 transition-colors duration-100 ease-in-out
            ${isActive ? "text-white/80 hover:text-white" : "text-[#ff6368] hover:text-[#ff3339]"}
          `}
          title="Delete task"
          aria-label="Delete task"
        >
          <Trash size={20} strokeWidth={2.5} />
        </button>
      </div>

      {/* Col 3: Right-aligned Duration (font-inherit brings in the retro game font) */}
      <span className="text-right font-inherit text-[11px] font-bold tracking-wider m-10 tabular-nums">
        {formatTime(task.totalSeconds)}
      </span>
    </div>
  );
};

export default TaskItem;
