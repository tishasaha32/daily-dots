import { useState } from "react";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useJournalStore } from "@/store/journalStore";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";

type DeleteJournalDialogProps = {
    openDeleteJournal: boolean
    setOpenDeleteJournal: React.Dispatch<React.SetStateAction<boolean>>
    journal: Journal | null
}

const DeleteJournalDialog = ({ openDeleteJournal, setOpenDeleteJournal, journal }: DeleteJournalDialogProps) => {

    const [deleteJournalState, setDeleteJournalState] = useState(false)
    const { deleteJournal } = useJournalStore()
    const onOpenChange = (open: boolean) => {
        setOpenDeleteJournal(open);
    };

    const handleDeleteJournal = () => {
        deleteJournal({ journalId: journal?.id as string, setOpenDialog: setOpenDeleteJournal, setDeleteJournalState })
    }

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
                        <Button variant={"destructive"} onClick={() => handleDeleteJournal()}>
                            {deleteJournalState ? "Deleting..." : "Delete"}
                        </Button>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default DeleteJournalDialog