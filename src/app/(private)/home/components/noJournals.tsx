import React from 'react'
import { NoJournalFound } from '@/assets'
import Image from 'next/image'

const NoJournals = () => {
    return (
        <div className='flex flex-col h-[10vh] justify-center gap-4 items-center'>
            <Image src={NoJournalFound} alt="No Journal Found" width={200} height={200} />
            <p className='text-2xl font-bold'>No Journals Found</p>
        </div>
    )
}

export default NoJournals