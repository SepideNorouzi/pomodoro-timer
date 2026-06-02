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
    <div className="flex flex-row flex-nowrap w-full justify-between gap-2 md:gap-4">
      {MODES.map(({ value, label }) => {
        const isActive = mode === value;
        
        return (
          <button
            key={value}
            className={`
              flex-1 min-w-0 text-center whitespace-nowrap
              flex items-center justify-center
              font-inherit text-[8px] min-[360px]:text-[10px] md:text-[11px] uppercase tracking-tight
              py-4 md:py-5 px-2 md:px-4
              border-4 border-black 
              transition-all duration-75 ease-in-out
              cursor-pointer select-none
              ${isActive 
                ? "bg-[#ff6368] text-white translate-x-[4px] translate-y-[4px] shadow-none" 
                : "bg-white text-black shadow-[4px_4px_0px_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
              }
            `}
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