"use client"
import React from 'react'
import Image from 'next/image';
import { auth } from '@/app/firebase/config';
import { Input } from '@/components/ui/input';
import { useAuthState } from 'react-firebase-hooks/auth';

const ProfileDetails = () => {
    const [user] = useAuthState(auth);
    return (
        <div className="flex h-[80vh] flex-col gap-5 justify-center items-center p-8">
            <Image src={user?.photoURL || ""} alt="logo" className=" rounded-full" width={100} height={100} />
            <h1>User Profile</h1>
            <Input className="md:w-96" readOnly value={user?.email || ""} />
            <Input className="md:w-96" readOnly value={user?.displayName || ""} />
        </div>
    )
}

export default ProfileDetails