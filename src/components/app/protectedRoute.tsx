"use client";
import Cookies from "js-cookie";
import { useEffect } from "react";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get("authToken");
        if (!loading && (!user || !token)) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return <Loading />;
    }

    return user ? <>{children}</> : null;
};

export default ProtectedRoute;
