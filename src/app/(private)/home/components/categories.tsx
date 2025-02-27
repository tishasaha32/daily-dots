"use client";
import React, { useState } from "react";
import { categories } from "@/data";

const Categories = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    return (
        <div className="flex gap-2 items-center w-full overflow-scroll py-4 px-2 scrollbar-hide">
            {categories?.map((category) => (
                <div
                    key={category.uuid}
                    className={`px-3 py-1 border border-border rounded-full bg-primary font-bold cursor-pointer ${selectedCategory === category.title
                        ? "text-black"
                        : "text-secondary"
                        }`}
                    onClick={() => setSelectedCategory(category.title)}
                >
                    {category.title}
                </div>
            ))}
        </div>
    );
};

export default Categories;
