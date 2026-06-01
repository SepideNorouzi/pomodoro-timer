import React from "react";
import { type Task } from "../../types";
import TaskList from "./TaskList";

interface SidebarProps {
  tasks: Task[];
}

const Sidebar: React.FC<SidebarProps> = ({ tasks }) => {
  return (
    <aside className="sidebar">
      <TaskList tasks={tasks} />
    </aside>
  );
};

export default Sidebar;