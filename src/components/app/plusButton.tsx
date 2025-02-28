"use client"
import { useState } from 'react'
import { Plus } from 'lucide-react'
import AddJournalDrawer from './addJournalDrawer'

const PlusButton = () => {
    const [openAddJournalDrawer, setOpenAddJournalDrawer] = useState(false)
    return (
        <>
            {openAddJournalDrawer && <AddJournalDrawer openAddJournalDrawer={openAddJournalDrawer} setOpenAddJournalDrawer={setOpenAddJournalDrawer} />}
            <div className='fixed bottom-5 right-5 z-100 bg-[#e05126] p-4 rounded-full border border-border' onClick={() => setOpenAddJournalDrawer(true)}>
                <Plus className='text-white' />
            </div>
        </>
    )
}

export default PlusButton