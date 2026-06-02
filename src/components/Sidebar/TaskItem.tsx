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
      className={`
        grid grid-cols-3 items-center 
        min-h-[72px] px-6 py-3 mb-3 w-full
        border-4 border-[#1c2259] 
        cursor-pointer select-none
        transition-all duration-75 ease-in-out
        hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_#1c2259]
        active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
        ${isActive ? "bg-[#ff7ba4] text-white shadow-none" : "bg-white text-[#1c2259] shadow-[4px_4px_0px_#1c2259]"}
      `}
      onClick={() => setActiveTaskId(task.id)}
    >
      {/* Col 1: Left-aligned Name (with exact 5px margin from the left boundary) */}
      <span className="text-left font-sans font-bold text-base truncate ml-[5px]">
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
            ${isActive ? "text-white/80 hover:text-white" : "text-[#ff7ba4] hover:text-[#e65c87]"}
          `}
          title="Delete task"
          aria-label="Delete task"
        >
          <Trash size={20} strokeWidth={2.5} />
        </button>
      </div>

      {/* Col 3: Right-aligned Duration (with exact 5px margin from the right boundary) */}
      <span className="text-right font-inherit text-[11px] font-bold tracking-wider mr-[5px] tabular-nums">
        {formatTime(task.totalSeconds)}
      </span>
    </div>
  );
};

export default TaskItem;