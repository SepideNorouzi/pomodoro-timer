import { useState, useEffect, useRef, useCallback } from "react";
import { type TimerMode, type TimerStatus } from "../types";

// Everything the UI needs to display and control the timer.
export interface UseTimerReturn {
  mode: TimerMode;
  status: TimerStatus;
  secondsLeft: number;
  progress: number;
  durations: Record<TimerMode, number>;
  updateDuration: (mode: TimerMode, minutes: number) => void;
  setMode: (m: TimerMode) => void;
  setOnTick: (fn: () => void) => void;
  setOnComplete: (fn: () => void) => void;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

export function useTimer(): UseTimerReturn {
  const [currentMode, setModeState] = useState<TimerMode>("pomodoro");
  const [status, setStatus] = useState<TimerStatus>("idle");
  const [durations, setDurations] = useState({
    pomodoro: 25 * 60,
    short_break: 5 * 60,
    long_break: 15 * 60,
  });
  const [secondsLeft, setSecondsLeft] = useState<number>(durations.pomodoro);

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
      setSecondsLeft(durations[newMode]);
    },
    [clearTimer, durations],
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
          onCompleteRef.current?.(); //  NEW: fire the completion callback
          return durations[currentMode]; // resets to full duration immediately
        }
        onTickRef.current?.();
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
    setSecondsLeft(durations[currentMode]);
  }, [clearTimer, durations, currentMode]);

  // Cleanup
  // If the component using this hook unmounts while the timer is running,
  // i MUST clear the interval or it keeps firing forever
  // (and tries to setState on an unmounted component → memory leak).
  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  // progress (0 → 1)
  // progress = elapsed / total = (total - left) / total
  const total = durations[currentMode] || 1;
  const progress = 1 - secondsLeft / total;

  const updateDuration = (mode: TimerMode, minutes: number) => {
    const seconds = minutes * 60;
    setDurations((prev) => {
      const updated = {
        ...prev,
        [mode]: seconds,
      };
      // if current mode is affected → reset timer immediately
      if (mode === currentMode) {
        clearTimer();
        setStatus("idle");
        setSecondsLeft(seconds);
      }
      return updated;
    });
  };

  const onTickRef = useRef<(() => void) | null>(null);

  const setOnTick = (fn: () => void) => {
    onTickRef.current = fn;
  };

  const onCompleteRef = useRef<(() => void) | null>(null);

  const setOnComplete = (fn: () => void) => {
    onCompleteRef.current = fn;
  };

  return {
    mode: currentMode,
    status,
    secondsLeft,
    progress,
    durations,
    updateDuration,
    setMode,
    start,
    pause,
    reset,
    setOnTick,
    setOnComplete,
  };
}
