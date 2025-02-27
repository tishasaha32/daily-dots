"use client";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

type CalendarSectionProps = {
    journals: Journal[];
}

const CalendarSection = ({ journals }: CalendarSectionProps) => {

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const colors = ["#00bcd4", "#fecad5", "#fdaea9", "#dde59b", "#9ad7a4", "#e1d8ff", "#c2dcd8", "#fedcf3", "#80a3db", "#9cda99", "#ddab9f"];
    const moodMap = journals.reduce<Record<string, { mood: string; color: string }>>((acc, journal, index) => {
        acc[format(journal.date, "yyyy-MM-dd")] = { mood: journal.mood, color: colors[index % colors.length] };
        return acc;
    }, {});

    return (
        <div className="p-4">
            <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="relative w-full max-w-md rounded-lg shadow-md bg-primary"
                classNames={{
                    table: "w-full border-collapse",
                    row: "flex justify-center",
                    cell: "w-10 h-10 flex items-center justify-center",
                }}
                components={{
                    DayContent: ({ date }) => {
                        const formattedDate = format(date, "yyyy-MM-dd");
                        const moodData = moodMap[formattedDate];

                        return (
                            <div className="relative w-16 h-7 flex items-center justify-center rounded-full">
                                {moodData ? (
                                    <span
                                        className={cn(
                                            "w-full h-full flex items-center text-xl justify-center rounded-full",
                                            "shadow-md"
                                        )}
                                        style={{ backgroundColor: moodData.color }}
                                    >
                                        {moodData.mood}
                                    </span>
                                ) : (
                                    <span className="text-gray-700">{format(date, "d")}</span>
                                )}
                            </div>
                        );
                    },
                }}
            />
        </div>
    );
};

export default CalendarSection;
