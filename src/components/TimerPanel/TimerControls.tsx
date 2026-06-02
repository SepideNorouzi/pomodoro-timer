import React from "react";
import { useTimerContext } from "../../context/TimerContext";
import { Maximize, Settings, TimerReset } from "lucide-react";

interface TimerControlsProps {
  onSettings: () => void;
  onExpand: () => void;
}

//   Row 1: the main action button ("start" / "pause")
//   Row 2: three icon buttons
const TimerControls: React.FC<TimerControlsProps> = ({
  onSettings,
  onExpand,
}) => {
  const { status, start, pause, reset } = useTimerContext();
  // The primary button toggles between start and pause based on timer status.
  // "idle" and "paused" both show "start", they both mean "the timer is not running".
  const isRunning = status === "running";

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Primary Action Button */}
      <button
        className="
          w-full max-w-[300px]
          font-inherit text-white text-base md:text-lg uppercase tracking-wider
bg-[#ff7ba4] 
border-4 border-[#1c2259] 
shadow-[6px_6px_0px_#1c2259] 
          py-4 px-10 
          shadow-[6px_6px_0px_#1c2259] 
          transition-all duration-75 ease-in-out
          cursor-pointer select-none
          active:translate-x-[6px] active:translate-y-[6px] active:shadow-none
        "
        onClick={isRunning ? pause : start}
        type="button"
      >
        {isRunning ? "pause" : "start"}
      </button>

      {/* Secondary Action Buttons */}
      <div className="flex gap-4">
        {/* Reset Button */}
        <button
          className="
            w-14 h-14 md:w-16 md:h-16 
            flex items-center justify-center 
            bg-white text-black
            border-4 border-[#1c2259] 
            shadow-[4px_4px_0px_#1c2259] 
            transition-all duration-75 ease-in-out
            cursor-pointer
            active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
          "
          onClick={reset}
          type="button"
          title="Reset timer"
          aria-label="Reset timer"
        >
          {/* strokeWidth={3} gives it a heavy, bold, retro cartoon ink outline */}
          <TimerReset size={22} strokeWidth={3} />
        </button>

        {/* Settings Button */}
        <button
          className="
            w-14 h-14 md:w-16 md:h-16 
            flex items-center justify-center 
            bg-white text-black
            border-4 border-[#1c2259] 
            shadow-[4px_4px_0px_#1c2259] 
            transition-all duration-75 ease-in-out
            cursor-pointer
            active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
          "
          onClick={onSettings}
          type="button"
          title="Settings"
          aria-label="Settings"
        >
          <Settings size={22} strokeWidth={3} />
        </button>

        {/* Expand Button */}
        <button
          className="
            w-14 h-14 md:w-16 md:h-16 
            flex items-center justify-center 
            bg-white text-black
            border-4 border-[#1c2259] 
            shadow-[4px_4px_0px_#1c2259] 
            transition-all duration-75 ease-in-out
            cursor-pointer
            active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
          "
          onClick={onExpand}
          type="button"
          title="Expand"
          aria-label="Expand"
        >
          <Maximize size={22} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export default TimerControls;
