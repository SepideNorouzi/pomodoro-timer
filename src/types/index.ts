// ─── Timer Modes
// The three states the timer can be in.
// Using a union type instead of an enum: 
//Unions are serializable ( can store them in localStorage later), 
// lighter, and don't need imports everywhere
export type TimerMode = "pomodoro" | "short_break" | "long_break";

export const MODE_DURATIONS: Record<TimerMode, number> = {
  pomodoro: 25 * 60,
  short_break: 5 * 60,
  long_break: 15 * 60,
};

// Task
// A single task entry. `totalSeconds` accumulates every second the timer runs
// while this task is the "active" one (future feature hook — it's tracked here
// from the start so nothing needs to be refactored later).
export interface Task {
  id: string;          // crypto.randomUUID() — unique, stable, no library needed
  name: string;        // what the user typed in the input
  totalSeconds: number; // total focused time logged against this task
}

// Timer Status
// Separate from TimerMode , timer can be in "pomodoro" mode but still paused.
export type TimerStatus = "idle" | "running" | "paused";