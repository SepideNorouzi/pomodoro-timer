import React from "react";
import { type Task } from "../../types";
import TaskList from "./TaskList";

interface SidebarProps {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ tasks, onDeleteTask }) => {
  return (
    <aside className="sidebar">
      <TaskList tasks={tasks} onDeleteTask={onDeleteTask} />
    </aside>
  );
};

export default Sidebar;
