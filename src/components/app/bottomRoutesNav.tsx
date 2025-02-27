"use client"
import React from 'react'
import { usePathname } from "next/navigation";
import { Calendar, Home, User } from "lucide-react";
import Link from 'next/link';

const BottomRoutesNav = () => {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-5 bg-card flex items-center justify-center gap-3 p-1 border border-border rounded-full">
            <Link href="/home">
                <div className={pathname === "/home" ? "flex items-center gap-2 bg-gradient-to-b from-[#9bc2c0] to-white rounded-full p-4" : "flex items-center gap-2"}>
                    <div className={pathname !== "/home" ? "rounded-full bg-border p-2 text-black" : "text-black"}>
                        <Home size={pathname !== "/home" ? 20 : 18} />
                    </div>
                    <p className={pathname !== "/home" ? "hidden" : "font-bold"}>Home</p>
                </div>
            </Link>
            <Link href="/status">
                <div className={pathname === "/status" ? "flex items-center gap-2 bg-gradient-to-b from-[#9bc2c0] to-white rounded-full p-4" : ""}>
                    <div className={pathname !== "/status" ? "rounded-full bg-border p-2 text-black" : "text-black"}>
                        <Calendar size={pathname !== "/status" ? 20 : 18} />
                    </div>
                    <p className={pathname !== "/status" ? "hidden" : "font-bold"}>Status</p>
                </div>
            </Link>
            <Link href="/profile">
                <div className={pathname === "/profile" ? "flex items-center gap-2 bg-gradient-to-b from-[#9bc2c0] to-white rounded-full p-4" : "flex items-center gap-2"}>
                    <div className={pathname !== "/profile" ? "rounded-full bg-border p-2 text-black" : "text-black"}>
                        <User size={pathname !== "/profile" ? 20 : 18} />
                    </div>
                    <p className={pathname !== "/profile" ? "hidden" : "font-bold"}>Profile</p>
                </div>
            </Link>
        </div>
    )
}

export default BottomRoutesNav