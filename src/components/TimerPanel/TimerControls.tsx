import React from "react";
import { type TimerStatus } from "../../types";

interface TimerControlsProps {
  status: TimerStatus;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  // onSettings and onExpand are placeholders.
  onSettings: () => void;
  onExpand: () => void;
}

//   Row 1: the main action button ("start" / "pause")
//   Row 2: three icon buttons
const TimerControls: React.FC<TimerControlsProps> = ({
  status,
  onStart,
  onPause,
  onReset,
  onSettings,
  onExpand,
}) => {
  // The primary button toggles between start and pause based on timer status.
  // "idle" and "paused" both show "start", they both mean "the timer is not running".
  const isRunning = status === "running";

  return (
    <div className="timer-controls">
      <button
        className="timer-controls__primary"
        onClick={isRunning ? onPause : onStart}
        type="button"
      >
        {isRunning ? "pause" : "start"}
      </button>

      <div className="timer-controls__secondary">
        <button
          className="timer-controls__icon-btn"
          onClick={onReset}
          type="button"
          title="Reset timer"
          aria-label="Reset timer"
        >
          🔁
        </button>

        <button
          className="timer-controls__icon-btn"
          onClick={onSettings}
          type="button"
          title="Settings"
          aria-label="Settings"
        >
          ⚙️
        </button>

        <button
          className="timer-controls__icon-btn"
          onClick={onExpand}
          type="button"
          title="Expand"
          aria-label="Expand"
        >
          💢
        </button>
      </div>
    </div>
  );
};

export default TimerControls;
