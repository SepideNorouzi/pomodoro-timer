import DurationSetting from "./DurationSetting";
import { useTimerContext } from "../../context/TimerContext";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { durations, updateDuration } = useTimerContext();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative bg-[#efefef] border-[5px] border-black shadow-[10px_10px_0px_#000] p-8 w-[800px] h-[400px]">
        <button
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center border-[3px] border-black bg-white shadow-[3px_3px_0px_#000] text-xs"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="flex h-full items-center justify-center gap-8">
          <DurationSetting
            title="Pomodoro"
            value={durations.pomodoro / 60}
            onIncrement={() =>
              updateDuration("pomodoro", durations.pomodoro / 60 + 1)
            }
            onDecrement={() =>
              updateDuration(
                "pomodoro",
                Math.max(1, durations.pomodoro / 60 - 1),
              )
            }
          />

          <DurationSetting
            title="Short Break"
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
            title="Long Break"
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
    </div>
  );
};

export default SettingsModal;
