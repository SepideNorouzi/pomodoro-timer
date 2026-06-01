import React, { useState } from "react";
import ModeSelector from "./components/TimerPanel/ModeSelector";
import TimerDisplay from "./components/TimerPanel/TimerDisplay";
import TimerControls from "./components/TimerPanel/TimerControls";
import ProgressBar from "./components/TimerPanel/ProgressBar";
import TaskInput from "./components/TaskInput/TaskInput";
import Sidebar from "./components/Sidebar/Sidebar";
import { useTimer } from "./hooks/UseTimer";
import { useTasks } from "./hooks/UseTasks";
import SettingsModal from "./components/Setting/SettingsModal";
import "./App.css";

//   timer panel  → flex: 0 0 70%  (fixed 70%)
//   sidebar      → flex: 1        (takes the remaining 30%)
const App: React.FC = () => {
  const timer = useTimer();
  const taskManager = useTasks();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Placeholder handlers for settings and expand (later)
  const handleSettings = () => {
    setIsSettingsOpen(true);
  };
  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="app">
      {/*Timer Panel (70%) */}
      <main className={`timer-panel ${isExpanded ? "expanded" : ""}`}>
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
        {!isExpanded && <TaskInput onAddTask={taskManager.addTask} />}
      </main>

      {/* Sidebar (30%)*/}
      {!isExpanded && <Sidebar tasks={taskManager.tasks} />}

      <SettingsModal isOpen={isSettingsOpen} onClose={closeSettings} />
    </div>
  );
};

export default App;
