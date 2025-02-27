import React from 'react'
import { StatusWrapper } from './components'
import ProtectedRoute from '@/components/app/protectedRoute'

const StatusPage = () => {
    return (
        <ProtectedRoute>
            <StatusWrapper />
        </ProtectedRoute>
    )
}

export default StatusPage