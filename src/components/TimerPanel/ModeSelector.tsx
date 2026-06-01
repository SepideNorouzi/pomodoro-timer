import React from "react";
import { type TimerMode } from "../../types";

interface ModeSelectorProps {
  activeMode: TimerMode;
  onModeChange: (mode: TimerMode) => void;
}

const MODES: { value: TimerMode; label: string }[] = [
  { value: "pomodoro", label: "pomodoro" },
  { value: "short_break", label: "short break" },
  { value: "long_break", label: "long break" },
];

const ModeSelector: React.FC<ModeSelectorProps> = ({
  activeMode,
  onModeChange,
}) => {
  return (
    <div className="mode-selector">
      {MODES.map(({ value, label }) => (
        <button
          key={value}
          className={`mode-btn ${activeMode === value ? "mode-btn--active" : ""}`}
          onClick={() => onModeChange(value)}
          type="button"
          aria-pressed={activeMode === value}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default ModeSelector;
