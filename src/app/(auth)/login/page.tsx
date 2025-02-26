"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/googleLogin";
import { Logo, GoogleLogo, LoginPageImage } from "@/assets";
import { BookHeart, NotebookPen, Stars } from "lucide-react";

const LoginPage = () => {
    const router = useRouter();

    const handleSignIn = async () => {
        try {
            await signInWithGoogle();
            router.push("/home");
        } catch (error) {
            console.error("Sign-in failed:", error);
        }
    };

    return (
        <section className="md:flex gap-10 items-center justify-between">
            <div className="flex flex-col gap-5 items-center md:items-start justify-center h-[90vh] p-10 relative overflow-hidden">
                <Image src={Logo} alt="logo" width={150} height={150} />
                <p className="text-center md:text-left font-semibold">
                    Welcome to Daily Dots! <br /> Login with Google to start tracking your moods and goals.
                </p>
                <Button className="bg-black text-white rounded-xl hover:bg-black/80" onClick={handleSignIn}>
                    <Image src={GoogleLogo} alt="logo" width={20} height={20} />
                    Continue with Google
                </Button>
                <Stars className="absolute top-5 left-5 md:hidden text-secondary" size={50} />
                <NotebookPen className="absolute top-1/4 right-5 md:hidden text-secondary" size={50} />
                <BookHeart className="absolute bottom-1 left-1/3 md:hidden text-secondary" size={50} />
            </div>
            <div className="hidden md:block">
                <Image src={LoginPageImage} alt="logo" width={800} height={1000} />
            </div>
        </section>
    );
};

export default LoginPage;
