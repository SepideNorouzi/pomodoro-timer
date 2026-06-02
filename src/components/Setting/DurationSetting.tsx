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
    <div
      className="
    w-full
    max-w-[220px]
    h-[180px]
    md:h-[200px]
    bg-[#5d7380]
    border-[4px]
    border-black
    shadow-[4px_4px_0px_#1c2259]
    p-3
    flex
    flex-col
    justify-center
    items-center
  "
    >
      <h2
        className="
          text-[15px]
          text-white
          text-center
          leading-relaxed
        "
      >
        {title}
      </h2>

      <div className="flex items-center gap-2">
        <button
          onClick={onDecrement}
          className="
            w-7
            h-7
            border-[3px]
            border-black
            bg-[#8db9c7]
            shadow-[4px_4px_0px_#1c2259]
            flex
            items-center
            justify-center
            text-xs
            hover:-translate-x-[1px]
            hover:-translate-y-[1px]
            transition-all
          "
        >
          −
        </button>

        <span
          className="
            text-white
            text-sm
            min-w-[50px]
            text-center
          "
        >
          {value}:00
        </span>

        <button
          onClick={onIncrement}
          className="
            w-7
            h-7
            border-[3px]
            border-black
            bg-[#8db9c7]
            shadow-[4px_4px_0px_#1c2259]
            flex
            items-center
            justify-center
            text-xs
            hover:-translate-x-[1px]
            hover:-translate-y-[1px]
            transition-all
          "
        >
          +
        </button>
      </div>
    </div>
  );
};

export default DurationSetting;
