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
  return moodMapping.find(({ range }) => value >= range[0] && value <= range[1])?.mood || "😀";
};

const Slider = () => {
  const [value, setValue] = useState(0);
  const mood = getMood(value);

  return (
    <div className="flex items-center justify-center gap-2 space-y-4 p-6 bg-background rounded-lg shadow-md w-80">
      <span className="text-4xl">{mood}</span>
      <input
        type="range"
        min="0"
        max="100"
        step="0.1"
        value={value}
        onChange={(e) => setValue(parseFloat(e.target.value))}
        className="w-full accent-blue-500"
      />
      <span className="text-lg font-medium">{value.toFixed(1)}</span>
    </div>
  );
};

export { Slider };
