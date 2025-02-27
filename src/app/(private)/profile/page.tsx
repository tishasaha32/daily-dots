import React from 'react'
import ProtectedRoute from '@/components/app/protectedRoute'

const ProfilePage = () => {
    return (
        <ProtectedRoute>
            <div>ProfilePage</div>
        </ProtectedRoute>
    )
}

export default ProfilePage