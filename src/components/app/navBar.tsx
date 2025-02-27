"use client";

import React from "react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/config";
import { Button } from "@/components/ui/button";
import handleSignOut from "@/lib/googleSignOut";
import { useAuthState } from "react-firebase-hooks/auth";

const NavBar = () => {
    const [user] = useAuthState(auth);
    const router = useRouter();

    const signOutAndRedirect = async () => {
        await handleSignOut();
        router.push("/login");
    };

    return (
        <nav className="flex items-center justify-between p-4 border border-b-1">
            <h1>Hey <span className="font-bold"> {user?.displayName}</span></h1>
            <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={signOutAndRedirect}
            >
                <LogOut />
                Logout
            </Button>
        </nav>
    );
};

export default NavBar;
