import React from "react";
import { type TimerMode } from "../../types";
import { useTimerContext } from "../../context/TimerContext";

const MODES: { value: TimerMode; label: string }[] = [
  { value: "pomodoro", label: "pomodoro" },
  { value: "short_break", label: "short break" },
  { value: "long_break", label: "long break" },
];

const ModeSelector: React.FC = () => {
  const { mode, setMode } = useTimerContext();

  return (
    <div className="mode-selector">
      {MODES.map(({ value, label }) => {
        const isActive = mode === value;

        return (
          <button
            key={value}
            className={`mode-selector__btn ${isActive ? "is-active" : ""}`}
            onClick={() => setMode(value)}
            type="button"
            aria-pressed={isActive}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default ModeSelector;