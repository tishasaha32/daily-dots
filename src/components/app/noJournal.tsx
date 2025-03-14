import React from 'react'
import Image from 'next/image'
import { NoJournalFound } from '@/assets'

const NoJournal = ({ text }: { text: string }) => {
    return (
        <div className='flex flex-col h-[10vh] justify-center gap-4 items-center'>
            <Image src={NoJournalFound} alt="No Journal Found" width={200} height={200} />
            <p className='text-2xl font-bold'>{text}</p>
        </div>
    )
}

export default NoJournal