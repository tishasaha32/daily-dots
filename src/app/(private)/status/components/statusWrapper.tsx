"use client";
import AverageMood from "./averageMood"
import { auth } from "@/app/firebase/config";
import CalendarSection from "./calendarSection"
import { useJournalStore } from "@/store/journalStore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

const StatusWrapper = () => {
    const [user] = useAuthState(auth)
    const { journals, getJournals } = useJournalStore((state) => state);

    useEffect(() => {
        getJournals({ user });
    }, [user, getJournals]);

    const calculateMoodPercentage = () => {
        const totalEntries = journals.length;
        const moodCounts: Record<string, number> = {};
        journals.forEach((journal) => {
            moodCounts[journal.mood] = (moodCounts[journal.mood] || 0) + 1;
        });
        const moodPercentages = Object.entries(moodCounts).map(([mood, count]) => ({
            mood,
            percentage: ((count / totalEntries) * 100).toFixed(2) + "%",
        }));

        return moodPercentages;
    };

    const averageMood = calculateMoodPercentage();

    return (
        <>
            <CalendarSection journals={journals} />
            <AverageMood averageMood={averageMood} />
        </>
    )
}

export default StatusWrapper