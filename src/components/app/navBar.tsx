"use client";
import React from "react";
import { LogOut } from "lucide-react";
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/config";
import { Button } from "@/components/ui/button";
import handleSignOut from "@/lib/googleSignOut";
import { useAuthState } from "react-firebase-hooks/auth";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const NavBar = () => {
    const { setTheme } = useTheme()
    const [user] = useAuthState(auth);
    const router = useRouter();

    const signOutAndRedirect = async () => {
        await handleSignOut();
        router.push("/login");
    };

    return (
        <nav className="flex items-center justify-between p-4 border border-b-1">
            <h1>Hey <span className="font-bold"> {user?.displayName}</span></h1>
            <div className="flex items-center gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={signOutAndRedirect}
                >
                    <LogOut />
                    Logout
                </Button>
            </div>
        </nav>
    );
};

export default NavBar;
