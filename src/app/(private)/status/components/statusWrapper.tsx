import { journals } from "@/data"
import AverageMood from "./averageMood"
import CalendarSection from "./calendarSection"

const StatusWrapper = () => {
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