import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Trash } from "lucide-react";

type DeleteJournalDialogProps = {
    openDeleteJournal: boolean
    setOpenDeleteJournal: React.Dispatch<React.SetStateAction<boolean>>
    journal: Journal | null
}

const DeleteJournalDialog = ({ openDeleteJournal, setOpenDeleteJournal, journal }: DeleteJournalDialogProps) => {

    const onOpenChange = (open: boolean) => {
        setOpenDeleteJournal(open);
    };

    console.log(journal);

    return (
        <Drawer open={openDeleteJournal} onOpenChange={onOpenChange}>
            <DrawerContent>
                <DrawerTitle className='pl-4 pb-4 border-b-2 flex items-center gap-2'>
                    <Trash />
                    Delete Journal
                </DrawerTitle>
                <div className="p-4">
                    <p>Are you sure you want to delete this journal?</p>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant={"outline"} onClick={() => setOpenDeleteJournal(false)}>Cancel</Button>
                        <Button variant={"destructive"}>Delete</Button>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default DeleteJournalDialog