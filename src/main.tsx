import { createRoot } from "react-dom/client";
import { TaskProvider } from "./context/TaskContext.tsx";
import { TimerProvider } from "./context/TimerContext.tsx";
import App from "./App.tsx";
import "./App.css";

createRoot(document.getElementById("root")!).render(
  <TaskProvider>
    <TimerProvider>
      <App />
    </TimerProvider>
  </TaskProvider>,
);
