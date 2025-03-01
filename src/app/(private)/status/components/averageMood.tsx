import { Progress } from "@/components/ui/progress";
import React from "react";

type AverageMoodProps = {
    averageMood: {
        mood: string;
        percentage: string;
    }[];
};

const AverageMood = ({ averageMood }: AverageMoodProps) => {
    const colors = ["#00bcd4", "#fecad5", "#fdaea9", "#dde59b", "#9ad7a4", "#e1d8ff", "#c2dcd8", "#fedcf3", "#80a3db", "#9cda99", "#ddab9f"];

    return (
        <>
            <h2 className="text-2xl font-bold pl-8">Average Mood</h2>
            <div className="flex flex-col gap-4 px-8 py-4 pb-24">
                {averageMood.map((mood) => {
                    const randomColor = colors[Math.floor(Math.random() * colors.length)];
                    return (
                        <div key={mood.mood} className="flex items-center gap-2 border p-2 rounded-3xl">
                            <div style={{ backgroundColor: randomColor }} className="rounded-full flex items-center justify-center">
                                <p className="text-2xl p-1">{mood.mood}</p>
                            </div>
                            <Progress value={Number(mood.percentage.split("%")[0])} className="h-5" />
                        </div>
                    )
                })}
            </div>
        </>
    );
};

export default AverageMood;
