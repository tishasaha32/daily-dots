"use client"
import Quote from './quote'
import { useEffect, useState } from 'react'
import Categories from './categories'
import JournalCards from './journalCards'
import { categories, quotes } from "@/data";
import { useJournalStore } from '@/store/journalStore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/app/firebase/config'
// import NoJournals from './noJournals'

const HomeWrapper = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    const [user] = useAuthState(auth)
    const { journals, getJournals } = useJournalStore((state) => state);

    useEffect(() => {
        getJournals({ user });
    }, []);

    const filteredJournals = journals.filter((journal) => journal.category === selectedCategory);
    return (
        <>
            <Quote quotes={quotes} />
            <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={categories} />
            <JournalCards journals={filteredJournals.length > 0 ? filteredJournals : selectedCategory !== "All" && filteredJournals.length === 0 ? [] : journals} />
        </>
    )
}

export default HomeWrapper