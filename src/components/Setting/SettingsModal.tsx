import "./SettingsModal.css";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({
  isOpen,
  onClose,
}: SettingsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">

        <button
          className="close-button"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="settings-grid">

          <div className="settings-card">
            <h2>Pomodoro Duration</h2>
          </div>

          <div className="settings-card">
            <h2>Short Break Duration</h2>
          </div>

          <div className="settings-card">
            <h2>Long Break Duration</h2>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SettingsModal;