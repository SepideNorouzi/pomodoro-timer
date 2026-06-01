interface DurationSettingProps {
  title: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const DurationSetting = ({
  title,
  value,
  onIncrement,
  onDecrement,
}: DurationSettingProps) => {
  return (
    <div className="settings-card">
      <h2>{title}</h2>

      <div className="duration-control">
        <button onClick={onDecrement} className="duration-btn">
          −
        </button>

        <span className="duration-value">{value}:00</span>

        <button onClick={onIncrement} className="duration-btn">
          +
        </button>
      </div>
    </div>
  );
};

export default DurationSetting;
