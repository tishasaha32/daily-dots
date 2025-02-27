import React from 'react'
import { Plus } from 'lucide-react'

const PlusButton = () => {
    return (
        <div className='fixed bottom-5 right-5 z-100 bg-[#e05126] p-4 rounded-full border border-border'>
            <Plus className='text-white' />
        </div>
    )
}

export default PlusButton