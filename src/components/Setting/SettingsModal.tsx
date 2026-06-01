import DurationSetting from "./DurationSetting";
import { useTimerContext } from "../../context/TimerContext";
import "./SettingsModal.css";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { durations, updateDuration } = useTimerContext();

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>
          ✕
        </button>

        <DurationSetting
          title="Pomodoro Duration"
          value={durations.pomodoro / 60}
          onIncrement={() =>
            updateDuration("pomodoro", durations.pomodoro / 60 + 1)
          }
          onDecrement={() =>
            updateDuration("pomodoro", Math.max(1, durations.pomodoro / 60 - 1))
          }
        />

        <DurationSetting
          title="Short Break Duration"
          value={durations.short_break / 60}
          onIncrement={() =>
            updateDuration("short_break", durations.short_break / 60 + 1)
          }
          onDecrement={() =>
            updateDuration(
              "short_break",
              Math.max(1, durations.short_break / 60 - 1),
            )
          }
        />

        <DurationSetting
          title="Long Break Duration"
          value={durations.long_break / 60}
          onIncrement={() =>
            updateDuration("long_break", durations.long_break / 60 + 1)
          }
          onDecrement={() =>
            updateDuration(
              "long_break",
              Math.max(1, durations.long_break / 60 - 1),
            )
          }
        />
        
      </div>
    </div>
  );
};

export default SettingsModal;
