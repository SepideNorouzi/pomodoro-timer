import { useState, useCallback } from "react";
import { type Task } from "../types";

export interface UseTasksReturn {
  tasks: Task[];
  addTask: (name: string) => void;
  logTime: (id: string, seconds: number) => void; // called by timer each tick
}

export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Add a new task
  // crypto.randomUUID() for IDs — it's built into every modern browser,
  // no uuid package needed. Each task starts with 0 seconds logged.
  const addTask = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return; // never add empty tasks

    const newTask: Task = {
      id: crypto.randomUUID(),
      name: trimmed,
      totalSeconds: 0,
    };

    //always appends to the freshest state
    setTasks((prev) => [...prev, newTask]);
  }, []);

  // Log elapsed seconds to a specific task
  // This will be called from App.tsx when the timer ticks and a task
  // is "active". It finds the task by id and increments its totalSeconds.
  const logTime = useCallback((id: string, seconds: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, totalSeconds: task.totalSeconds + seconds }
          : task,
      ),
    );
  }, []);

  return { tasks, addTask, logTime };
}
