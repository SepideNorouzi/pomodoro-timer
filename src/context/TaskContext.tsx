import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

import { useTasks } from "../hooks/UseTasks";

const TaskContext = createContext<
  ReturnType<typeof useTasks> | undefined
>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider = ({
  children,
}: TaskProviderProps) => {
  const taskManager = useTasks();

  return (
    <TaskContext.Provider value={taskManager}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error(
      "useTaskContext must be used inside TaskProvider"
    );
  }

  return context;
};