import { useState } from "react";

const moodMapping = [
  { range: [0, 12.5], mood: "😭" },
  { range: [12.6, 25], mood: "🤧" },
  { range: [25.1, 37.5], mood: "😖" },
  { range: [37.6, 50], mood: "😡" },
  { range: [50.1, 62.5], mood: "😱" },
  { range: [62.6, 75], mood: "😀" },
  { range: [75.1, 87.5], mood: "😎" },
  { range: [87.6, 100], mood: "😍" },
];

const getMood = (value: number) => {
  return (
    moodMapping.find(({ range }) => value >= range[0] && value <= range[1])
      ?.mood || "😀"
  );
};

type SliderProps = {
  value?: number;
  onChange?: (val: number) => void;
};

const Slider = ({ value: propValue, onChange }: SliderProps) => {
  const [internalValue, setInternalValue] = useState(propValue ?? 0);
  const value = propValue ?? internalValue;
  const mood = getMood(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="flex flex-col items-center gap-2 p-6 bg-background rounded-lg shadow-md w-80">
      <span className="text-4xl">{mood}</span>
      <input
        type="range"
        min="0"
        max="100"
        step="0.1"
        value={value}
        onChange={handleChange}
        className="w-full accent-blue-500"
      />
      <span className="text-lg font-medium">{value.toFixed(1)}</span>
    </div>
  );
};

export { Slider };
