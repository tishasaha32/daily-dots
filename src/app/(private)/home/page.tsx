import React from 'react'
import { HomeWrapper } from './components'
import ProtectedRoute from '@/components/app/protectedRoute'

const HomePage = () => {

    return (
        <ProtectedRoute>
            <HomeWrapper />
        </ProtectedRoute>
    )
}

export default HomePage