import React from "react";
import TaskList from "./TaskList";
import { useTaskContext } from "../../context/TaskContext";

const Sidebar: React.FC = () => {
  const { tasks } = useTaskContext();
  return (
    <aside className="sidebar">
      <TaskList tasks={tasks} />
    </aside>
  );
};

export default Sidebar;
