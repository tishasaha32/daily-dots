import React from 'react'
import { ProfileDetails } from './components'
import ProtectedRoute from '@/components/app/protectedRoute'

const ProfilePage = () => {
    return (
        <ProtectedRoute>
            <ProfileDetails />
        </ProtectedRoute>
    )
}

export default ProfilePage