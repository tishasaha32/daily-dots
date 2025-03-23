import Image from 'next/image';
import { moods } from '@/data/moods';
import { Eye, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer'

type ViewJournalDialogProps = {
    openViewJournal: boolean,
    setOpenViewJournal: React.Dispatch<React.SetStateAction<boolean>>
    journal: Journal | null
}

const ViewJournalDialog = ({ openViewJournal, setOpenViewJournal, journal }: ViewJournalDialogProps) => {

    const onOpenChange = (open: boolean) => {
        setOpenViewJournal(open);
    };
    console.log(journal, "***")
    return (
        <Drawer open={openViewJournal} onOpenChange={onOpenChange}>
            <DrawerContent>
                <DrawerTitle className='p-4 pt-0 border-b-2 flex items-center justify-between gap-2'>
                    <p className='flex items-center gap-2'>
                        <Eye />
                        View Journal
                    </p>
                    <X onClick={() => setOpenViewJournal(false)} />
                </DrawerTitle>
                {journal?.imageUrl &&
                    <div className="p-4 h-60">
                        <Image
                            src={journal?.imageUrl}
                            alt="Quote Background"
                            className="rounded-3xl w-[100%] h-[100%] object-contain"
                            width={350}
                            height={0}
                        />
                    </div>
                }
                <ScrollArea className='h-96'>
                    <div className='flex flex-col gap-4 p-6'>
                        <div className='flex items-center justify-between'>
                            <h1 className='text-2xl font-bold'>Journal Entry</h1>
                            <p>{journal?.date.toISOString().split("T")[0]}</p>
                        </div>
                        <p className='text-lg font-semibold'>{journal?.title}</p>
                        <p className='text-sm text-justify'>{journal?.description}</p>
                    </div>
                </ScrollArea>
                <div className='flex gap-2 items-center justify-center p-4'>
                    {moods.map((mood) => <div key={mood.uuid} className={mood.emoji === journal?.mood ? "bg-secondary rounded-full p-2" : ""}><p className={mood.emoji === journal?.mood ? "text-4xl" : "text-2xl"}>{mood.emoji}</p></div>)}
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default ViewJournalDialog