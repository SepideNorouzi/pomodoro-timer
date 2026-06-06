// TimerContext.tsx

import { createContext, useContext, useEffect, type ReactNode } from "react";

import { useTimer } from "../hooks/UseTimer";
import { useSound } from "../hooks/UseSound";

const TimerContext = createContext<ReturnType<typeof useTimer> | undefined>(
  undefined,
);

interface TimerProviderProps {
  children: ReactNode;
}

export const TimerProvider = ({ children }: TimerProviderProps) => {
  const timer = useTimer();
  const { playBeep } = useSound(); // stable ref, won't cause re-renders

  useEffect(() => {
    // Wire the "timer finished" signal to play a sound.
    // WHY useEffect here?
    // setOnComplete is a side-effect registration —im telling the hook
    // "when you're done, call this function." That's a setup side effect,
    // and setup side effects belong in useEffect, not in render logic.
    //
    // WHY is the dependency array [timer.setOnComplete, playBeep]?
    // Both are stable (wrapped in useCallback / useRef), so this runs
    // exactly once after mount — but i list them to be correct and
    // to satisfy the exhaustive-deps lint rule.
    timer.setOnComplete(() => {
      playBeep(880, 0.6, 0.4);
      // 880 Hz = A5 note — clean, pleasant "ding" pitch
      // 0.6s  = duration
      // 0.4   = volume (0–1)
    });
  }, [timer.setOnComplete, playBeep]);

  // The value passed to consumers is still the raw timer object —
  // nothing about sound leaks out. That's intentional.
  // The sound is an internal side effect of "session completed."
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
