import React from "react";
import NavBar from "@/components/app/navBar";
import PlusButton from "@/components/app/plusButton";
import BottomRoutesNav from "@/components/app/bottomRoutesNav";

export default function PrivateLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <section >
            <NavBar />
            {children}
            <div className="relative flex items-center gap-2 justify-center">
                <PlusButton />
                <BottomRoutesNav />
            </div>
        </section>
    );
}
