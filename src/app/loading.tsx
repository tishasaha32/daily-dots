"use client";
import { Loader } from "lucide-react";

const Loading = () => {
    return (
        <div className="flex items-center gap-3 justify-center h-screen">
            <Loader className="animate-spin" />
            Loading...
        </div>
    );
};

export default Loading;
