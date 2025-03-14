"use client"; // This makes the component a Client Component

import Image from "next/image";
import { pageNotFound } from "@/assets";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    const router = useRouter(); // Now it will work correctly

    return (
        <div className="flex flex-col gap-4 justify-center items-center h-screen">
            <Image src={pageNotFound.src} width={400} height={500} alt="Page Not Found" />
            <p className="text-2xl font-bold">404! Page Not Found</p>
            <Button
                onClick={() => router.push("/home")}
                className="flex items-center gap-2 bg-primary text-black"
            >
                <ChevronLeft /> Go Back
            </Button>
        </div>
    );
}
