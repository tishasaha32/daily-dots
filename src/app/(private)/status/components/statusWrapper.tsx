import { journals } from "@/data"
import CalendarSection from "./calendarSection"

const StatusWrapper = () => {
    return (
        <>
            <CalendarSection journals={journals} />
        </>
    )
}

export default StatusWrapper