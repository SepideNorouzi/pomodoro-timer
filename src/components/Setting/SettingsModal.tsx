import { useState } from "react";
import DurationSetting from "./DurationSetting";
import "./SettingsModal.css";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const [pomodoroMinutes, setPomodoroMinutes] = useState(25);
  const [shortBreakMinutes, setShortBreakMinutes] = useState(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState(15);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>
          ✕
        </button>

        <div className="settings-grid">
          <DurationSetting
            title="Pomodoro Duration"
            value={pomodoroMinutes}
            onIncrement={() => setPomodoroMinutes((prev) => prev + 1)}
            onDecrement={() =>
              setPomodoroMinutes((prev) => Math.max(1, prev - 1))
            }
          />

          <DurationSetting
            title="Short Break Duration"
            value={shortBreakMinutes}
            onIncrement={() => setShortBreakMinutes((prev) => prev + 1)}
            onDecrement={() =>
              setShortBreakMinutes((prev) => Math.max(1, prev - 1))
            }
          />

          <DurationSetting
            title="Long Break Duration"
            value={longBreakMinutes}
            onIncrement={() => setLongBreakMinutes((prev) => prev + 1)}
            onDecrement={() =>
              setLongBreakMinutes((prev) => Math.max(1, prev - 1))
            }
          />
        </div>
        
      </div>
    </div>
  );
};

export default SettingsModal;
