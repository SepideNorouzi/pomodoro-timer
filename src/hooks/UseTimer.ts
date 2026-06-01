import { useState, useEffect, useRef, useCallback } from "react";
import { MODE_DURATIONS, type TimerMode, type TimerStatus } from "../types";

// Everything the UI needs to display and control the timer.
export interface UseTimerReturn {
  mode: TimerMode;
  status: TimerStatus;
  secondsLeft: number;
  progress: number; // 0 → 1, drives the progress bar
  setMode: (m: TimerMode) => void;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

export function useTimer(): UseTimerReturn {
  const [mode, setModeState] = useState<TimerMode>("pomodoro");
  const [status, setStatus] = useState<TimerStatus>("idle");
  const [secondsLeft, setSecondsLeft] = useState<number>(
    MODE_DURATIONS["pomodoro"],
  );

  // useRef keeps the interval ID stable across renders without triggering
  // a re-render itself. If i stored it in useState, we'd cause an extra cycle.
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  //Clear any running interval
  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // When mode changes: wipe the interval and reset seconds
  const setMode = useCallback(
    (newMode: TimerMode) => {
      clearTimer();
      setStatus("idle");
      setModeState(newMode);
      setSecondsLeft(MODE_DURATIONS[newMode]);
    },
    [clearTimer],
  );

  // Start / Resume
  const start = useCallback(() => {
    setStatus("running");
    // setInterval fires every 1000ms.
    // i use the functional updater form of setState so the callback always
    // reads the *latest* value of secondsLeft — not a stale closure capture.
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          setStatus("idle");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clearTimer]);

  // Pause
  const pause = useCallback(() => {
    clearTimer();
    setStatus("paused");
  }, [clearTimer]);

  // Reset
  const reset = useCallback(() => {
    clearTimer();
    setStatus("idle");
    setSecondsLeft(MODE_DURATIONS[mode]);
  }, [clearTimer, mode]);

  // Cleanup
  // If the component using this hook unmounts while the timer is running, 
  // i MUST clear the interval or it keeps firing forever
  // (and tries to setState on an unmounted component → memory leak).
  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  // progress (0 → 1)
  // progress = elapsed / total = (total - left) / total
  const total = MODE_DURATIONS[mode];
  const progress = (total - secondsLeft) / total;

  return { mode, status, secondsLeft, progress, setMode, start, pause, reset };
}
