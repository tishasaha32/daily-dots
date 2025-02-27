import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Ellipsis, Eye, Pencil, Trash2 } from "lucide-react";

type JournalCardsProps = {
    journals: Journal[];
};

const JournalCards = ({ journals }: JournalCardsProps) => {
    const colors = ["#00bcd4", "#fecad5", "#fdaea9", "#dde59b", "#9ad7a4", "#e1d8ff", "#c2dcd8", "#fedcf3", "#80a3db", "#9cda99", "#ddab9f"];

    return (
        <div className="flex items-center justify-center">
            <div className="lg:w-[70%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {journals?.map((journal) => {
                    const randomColor = colors[Math.floor(Math.random() * colors.length)];
                    let date;
                    if (new Date(journal?.date).toISOString().split("T")[0] === new Date().toISOString().split("T")[0]) {
                        date = "Today";
                    } else {
                        date = journal?.date.toISOString().split("T")[0];
                    }
                    return (
                        <Card key={journal.uuid} style={{ backgroundColor: randomColor }}>
                            <CardHeader className="p-0 flex flex-row justify-between pr-2">
                                <p className="bg-card w-[20vw] lg:w-[5vw] flex items-center justify-center rounded-md text-sm font-semibold h-[4vh]">
                                    {journal?.category}
                                </p>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Ellipsis />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32">
                                        <p className="flex gap-1 items-center font-bold"><Eye size={16} />View</p>
                                        <p className="flex gap-1 items-center font-bold"><Pencil size={16} />Edit</p>
                                        <p className="flex gap-1 items-center text-destructive font-bold"><Trash2 size={16} />Delete</p>
                                    </PopoverContent>
                                </Popover>
                            </CardHeader>
                            <CardContent>
                                <h2 className="pt-4 text-lg font-semibold">{journal?.title}</h2>
                                <p className="text-sm">{journal?.description.slice(0, 40)}...</p>
                            </CardContent>
                            <CardFooter className="flex justify-between p-0 pl-4">
                                <p className="text-sm">{date}</p>
                                <p className="text-4xl">{journal?.mood}</p>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default JournalCards;
