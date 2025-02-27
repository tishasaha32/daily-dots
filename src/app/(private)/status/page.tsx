import React from 'react'
import ProtectedRoute from '@/components/app/protectedRoute'

const StatusPage = () => {
    return (
        <ProtectedRoute>
            <div>StatusPage</div>
        </ProtectedRoute>
    )
}

export default StatusPage