import { createRoot } from "react-dom/client";
import "../global.css";
import App from "./App.tsx";
import { TaskProvider } from "./context/TaskContext.tsx";
import { TimerProvider } from "./context/TimerContext.tsx";

createRoot(document.getElementById("root")!).render(
  <TaskProvider>
    <TimerProvider>
      <App />
    </TimerProvider>
  </TaskProvider>,
);
