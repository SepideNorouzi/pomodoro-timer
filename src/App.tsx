import React from "react";
import ModeSelector from "./components/TimerPanel/ModeSelector";
import TimerDisplay from "./components/TimerPanel/TimerDisplay";
import TimerControls from "./components/TimerPanel/TimerControls";
import ProgressBar from "./components/TimerPanel/ProgressBar";
import TaskInput from "./components/TaskInput/TaskInput";
import Sidebar from "./components/Sidebar/Sidebar";
import { useTimer } from "./hooks/UseTimer";
import { useTasks } from "./hooks/UseTasks";
import "./App.css";

//   timer panel  → flex: 0 0 70%  (fixed 70%)
//   sidebar      → flex: 1        (takes the remaining 30%)
const App: React.FC = () => {
  const timer = useTimer();
  const taskManager = useTasks();

  // Placeholder handlers for settings and expand (later)
  const handleSettings = () => {
    console.log("Settings clicked — implement modal");
  };

  const handleExpand = () => {
    console.log("Expand clicked — implement fullscreen");
  };

  return (
    <div className="app">
      {/*Timer Panel (70%) */}
      <main className="timer-panel">
        {/* Timer container */}
        <section className="timer-container">
          <ModeSelector activeMode={timer.mode} onModeChange={timer.setMode} />

          <TimerDisplay secondsLeft={timer.secondsLeft} />

          <TimerControls
            status={timer.status}
            onStart={timer.start}
            onPause={timer.pause}
            onReset={timer.reset}
            onSettings={handleSettings}
            onExpand={handleExpand}
          />
        </section>

        {/* fills as the session elapses */}
        <ProgressBar progress={timer.progress} />

        {/* Task input*/}
        <TaskInput onAddTask={taskManager.addTask} />
      </main>

      {/* Sidebar (30%)*/}
      <Sidebar tasks={taskManager.tasks} />
    </div>
  );
};

export default App;
