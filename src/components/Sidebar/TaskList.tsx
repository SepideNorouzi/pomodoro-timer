import React from "react";
import { type Task } from "../../types";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
}

// Two states:
//   1. Empty  → show the "no tasks added" placeholder
//   2. Has tasks → show the column headers + a TaskItem for each task

// The header row ("task | duration") only appears once the list is non-empty,
const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask }) => {
  if (tasks.length === 0) {
    return (
      <div className="task-list task-list--empty">
        <p className="task-list__empty-msg">no tasks added</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {/* Column header */}
      <div className="task-list__header">
        <span>task</span>
        <span>duration</span>
      </div>

      {/* Task rows */}
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onDeleteTask={onDeleteTask} />
      ))}
    </div>
  );
};

export default TaskList;
