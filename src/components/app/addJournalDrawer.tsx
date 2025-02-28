"use client"
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { AddJournal } from '@/schema/AddJournal';
import { Calendar, Notebook } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod";
import { FileInput } from '@/components/ui/file-input';
import { DatePicker } from '@/components/ui/date-picker';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import dynamic from "next/dynamic";
// import React, { useState } from 'react'


type AddJournalDrawerProps = {
    openAddJournalDrawer: boolean
    setOpenAddJournalDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AddJournalDrawer = ({ openAddJournalDrawer, setOpenAddJournalDrawer }: AddJournalDrawerProps) => {
    // const [value, setValue] = useState('');
    const onOpenChange = (open: boolean) => {
        setOpenAddJournalDrawer(open);
    };

    const accept: { [key: string]: string[] } = {
        "application/msword": [".doc"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
        "image/jpeg": [".jpeg", ".jpg"],
        "image/png": [".png"],
        "application/pdf": [".pdf"],
        "application/vnd.ms-excel": [".xls"],
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    };

    const defaultValues: z.infer<typeof AddJournal> = {
        title: "",
        description: "",
        date: undefined,
        category: "",
        mood: "",
        imageUrl: [],
    };

    const form = useForm<z.infer<typeof AddJournal>>({
        defaultValues: defaultValues,
        mode: "onTouched",
        resolver: zodResolver(AddJournal),
    });

    const onSubmit = async (values: z.infer<typeof AddJournal>) => {
        console.log(values);
    };


    return (
        <Drawer open={openAddJournalDrawer} onOpenChange={onOpenChange} >
            <DrawerContent>
                <DrawerTitle className='pl-10 pb-4 border-b-2 flex items-center gap-2'><Notebook className='h-6 w-6' />Add Journal</DrawerTitle>
                <Form {...form}>
                    <form
                        className="flex w-full flex-col gap-5"
                        onSubmit={form.handleSubmit((values) => onSubmit(values))}
                    >
                        <ScrollArea className="h-[70vh] w-full ">
                            <div className='flex flex-col gap-3 p-10 pt-4'>
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title<span className='text-destructive'>*</span></FormLabel>
                                            <FormControl>
                                                <Input placeholder='Enter the title' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description<span className='text-destructive'>*</span></FormLabel>
                                            <FormControl>
                                                <Input placeholder='Enter the description' {...field} />
                                                {/* <ReactQuill theme="snow" value={value} onChange={setValue} /> */}
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Date<span className='text-destructive'>*</span></FormLabel>
                                            <FormControl>
                                                <DatePicker placeholder='Enter the date' {...field} startContent={<Calendar />} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category<span className='text-destructive'>*</span></FormLabel>
                                            <FormControl>
                                                <Select {...field}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="personal">Personal</SelectItem>
                                                            <SelectItem value="work">Work</SelectItem>
                                                            <SelectItem value="family">Family</SelectItem>
                                                            <SelectItem value="health">Health</SelectItem>
                                                            <SelectItem value="events">Events</SelectItem>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="mood"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>Mood<span className='text-destructive'>*</span></FormLabel>
                                            <FormControl>
                                                <Slider />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="imageUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Image</FormLabel>
                                            <FormControl>
                                                <FileInput accept={accept} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </ScrollArea>
                        <div className='flex justify-end pr-10 pb-10'>
                            <Button type="submit" size="lg" className='bg-[#e05126]'>Submit</Button>
                        </div>
                    </form>
                </Form>
            </DrawerContent>
        </Drawer >
    )
}

export default AddJournalDrawer