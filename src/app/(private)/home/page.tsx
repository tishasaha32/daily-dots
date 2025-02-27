import React from 'react'
import ProtectedRoute from '@/components/app/protectedRoute'

const HomePage = () => {

    return (
        <ProtectedRoute>
            <div>HomePage</div>
        </ProtectedRoute>
    )
}

export default HomePage