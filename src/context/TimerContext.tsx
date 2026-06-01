import { createContext, useContext, type ReactNode } from "react";

import { useTimer } from "../hooks/UseTimer";

const TimerContext = createContext<ReturnType<typeof useTimer> | undefined>(
  undefined,
);

interface TimerProviderProps {
  children: ReactNode;
}

export const TimerProvider = ({ children }: TimerProviderProps) => {
  const timer = useTimer();

  return (
    <TimerContext.Provider value={timer}>{children}</TimerContext.Provider>
  );
};

export const useTimerContext = () => {
  const context = useContext(TimerContext);

  if (!context) {
    throw new Error("useTimerContext must be used within TimerProvider");
  }

  return context;
};
