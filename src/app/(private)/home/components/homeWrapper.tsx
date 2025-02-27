"use client"
import Quote from './quote'
import { useState } from 'react'
import Categories from './categories'
import JournalCards from './journalCards'
import { categories, journals, quotes } from "@/data";

const HomeWrapper = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const filteredJournals = journals.filter((journal) => journal.category === selectedCategory);
    return (
        <>
            <Quote quotes={quotes} />
            <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={categories} />
            <JournalCards journals={filteredJournals.length > 0 ? filteredJournals : journals} />
        </>
    )
}

export default HomeWrapper