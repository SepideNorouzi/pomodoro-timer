import { useEffect, useState } from "react";

interface TimerProps {
  duration: number;
}

function Timer({ duration }: TimerProps) {
  const [time, setTime] = useState<number>(duration);

  useEffect(() => {
    // fires repeatedly every 1 second
    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 0) {
          clearInterval(interval); // stop when we hit zero
          return 0;
        }
        return prev - 1; // subtract 1 second each tick
        //     ↑ using prev, not time — avoids stale closure
      });
    }, 1000);
    // cleanup: clear the interval when effect re-runs or unmounts
    // without this, multiple intervals stack up and fight each other
    return () => clearInterval(interval);
  }, []); // ← empty array: run once on mount, not on every tick
  // by using prev inside setTime, you no longer need
  // time as a dependency. The interval only needs to start once on mount

  const getFormattedTime = (): string => {
    const minutes = Math.floor(time / 60); // whole minutes
    const seconds = time % 60; // remaining seconds
    // padStart ensures "05" instead of "5"
    const mm = String(minutes).padStart(2, "0");
    const ss = String(seconds).padStart(2, "0");

    return `${mm}:${ss}`;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950">
      {/* card container */}
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-neutral-900 px-16 py-12">
        {/* label */}
        <span className="text-sm font-medium uppercase tracking-widest text-neutral-500">
          Pomodoro
        </span>

        {/* the time display */}
        <span className="font-mono text-8xl font-bold tabular-nums text-white">
          {getFormattedTime()}
        </span>

        {/* progress hint — time remaining out of duration */}
        <span className="text-xs text-neutral-600">
          {time} seconds remaining
        </span>
      </div>
    </div>
  );
}

export default Timer;
