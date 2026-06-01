import React from "react";
import { useTimerContext } from "../../context/TimerContext";

// Math.floor(s / 60) → whole minutes
// s % 60             → remaining seconds
// String.padStart(2, "0") → ensures "05" not "5"
export function formatTime(seconds: number): string {
  const mm = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const ss = (seconds % 60).toString().padStart(2, "0");
  return `${mm}:${ss}`;
}

const TimerDisplay: React.FC = () => {
  const { secondsLeft } = useTimerContext();
  return (
    <div className="timer-display" aria-live="polite" aria-atomic="true">
      <span className="timer-display__time">{formatTime(secondsLeft)}</span>
    </div>
  );
};

export default TimerDisplay;
