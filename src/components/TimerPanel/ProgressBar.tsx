import React from "react";
import { useTimerContext } from "../../context/TimerContext";

// The filler width is `progress * 100` percent, updated on every timer tick.
//
// Why inline style instead of a CSS class?
// Because the width is a DYNAMIC value that changes every second.
// CSS classes are for static/toggled states. Dynamic interpolated values
// belong in inline styles.
const ProgressBar: React.FC = () => {
  const { progress } = useTimerContext();
  const clamped = Math.min(1, Math.max(0, progress));
  const widthPercent = `${(clamped * 100).toFixed(2)}%`;

  return (
    <div
      className="progress-bar"
      role="progressbar"
      aria-valuenow={Math.round(clamped * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Session progress"
    >
      <div className="progress-bar__fill" style={{ width: widthPercent }} />
    </div>
  );
};

export default ProgressBar;
