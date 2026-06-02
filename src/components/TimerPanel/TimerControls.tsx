import React from "react";
import { useTimerContext } from "../../context/TimerContext";
import { Maximize, Settings, TimerReset } from "lucide-react";

interface TimerControlsProps {
  onSettings: () => void;
  onExpand: () => void;
}

const TimerControls: React.FC<TimerControlsProps> = ({
  onSettings,
  onExpand,
}) => {
  const { status, start, pause, reset } = useTimerContext();
  const isRunning = status === "running";

  return (
    <div className="timer-controls">
      {/* Primary Action Button - Wide horizontal block */}
      <button
        className="timer-controls__primary"
        onClick={isRunning ? pause : start}
        type="button"
      >
        {isRunning ? "pause" : "start"}
      </button>

      {/* Secondary Action Buttons - Flush layout aligned perfectly to the corners */}
      <div className="timer-controls__secondary">
        {/* Reset Button */}
        <button
          className="timer-controls__icon-btn"
          onClick={reset}
          type="button"
          title="Reset timer"
          aria-label="Reset timer"
        >
          <TimerReset size={20} strokeWidth={3} />
        </button>

        {/* Settings Button */}
        <button
          className="timer-controls__icon-btn"
          onClick={onSettings}
          type="button"
          title="Settings"
          aria-label="Settings"
        >
          <Settings size={20} strokeWidth={3} />
        </button>

        {/* Expand Button */}
        <button
          className="timer-controls__icon-btn"
          onClick={onExpand}
          type="button"
          title="Expand"
          aria-label="Expand"
        >
          <Maximize size={20} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export default TimerControls;
