"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Journal } from "@/schema/Journal";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Calendar, Loader2, Notebook } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileInput } from "@/components/ui/file-input";
import { useJournalStore } from "@/store/journalStore";
import { DatePicker } from "@/components/ui/date-picker";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useState } from "react";
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import dynamic from "next/dynamic";
// import React, { useState } from 'react'

type AddJournalDrawerProps = {
    openAddJournalDrawer: boolean;
    setOpenAddJournalDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AddJournalDrawer = ({
    openAddJournalDrawer,
    setOpenAddJournalDrawer,
}: AddJournalDrawerProps) => {
    // const [value, setValue] = useState('');

    const { addJournal } = useJournalStore((state) => state);
    const [user] = useAuthState(auth);
    const [creating, setCreating] = useState(false);

    const onOpenChange = (open: boolean) => {
        setOpenAddJournalDrawer(open);
    };

    const moodMapping = [
        { range: [0, 12.5], mood: "😭" },
        { range: [12.6, 25], mood: "🤧" },
        { range: [25.1, 37.5], mood: "😖" },
        { range: [37.6, 50], mood: "😡" },
        { range: [50.1, 62.5], mood: "😱" },
        { range: [62.6, 75], mood: "😀" },
        { range: [75.1, 87.5], mood: "😎" },
        { range: [87.6, 100], mood: "😍" },
    ];

    const getMood = (value: number) => {
        return (
            moodMapping.find(({ range }) => value >= range[0] && value <= range[1])
                ?.mood || "😀"
        );
    };

    const accept: { [key: string]: string[] } = {
        "application/msword": [".doc"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
            ".docx",
        ],
        "image/jpeg": [".jpeg", ".jpg"],
        "image/png": [".png"],
        "application/pdf": [".pdf"],
        "application/vnd.ms-excel": [".xls"],
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
            ".xlsx",
        ],
    };

    const defaultValues: z.infer<typeof Journal> = {
        title: "",
        description: "",
        date: undefined,
        category: "",
        mood: 0,
        imageUrl: [],
    };

    const form = useForm<z.infer<typeof Journal>>({
        defaultValues: defaultValues,
        mode: "onTouched",
        resolver: zodResolver(Journal),
    });

    const onSubmit = async (values: z.infer<typeof Journal>) => {
        console.log(values);
        addJournal({
            values,
            mood: getMood(values?.mood),
            user: user?.uid,
            setCreating,
            setOpenAddJournalDrawer,
        });
    };

    return (
        <Drawer open={openAddJournalDrawer} onOpenChange={onOpenChange}>
            <DrawerContent>
                <DrawerTitle className="pl-10 pb-4 border-b-2 flex items-center gap-2">
                    <Notebook className="h-6 w-6" />
                    Add Journal
                </DrawerTitle>
                <Form {...form}>
                    <form
                        className="flex w-full flex-col gap-5"
                        onSubmit={form.handleSubmit((values) => onSubmit(values))}
                    >
                        <ScrollArea className="h-[70vh] w-full ">
                            <div className="flex flex-col gap-3 p-10 pt-4">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Title<span className="text-destructive">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter the title" {...field} />
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
                                            <FormLabel>
                                                Description<span className="text-destructive">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter the description" {...field} />
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
                                            <FormLabel>
                                                Date<span className="text-destructive">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <DatePicker
                                                    placeholder="Enter the date"
                                                    {...field}
                                                    startContent={<Calendar />}
                                                />
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
                                            <FormLabel>
                                                Category<span className="text-destructive">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectItem value="Personal">Personal</SelectItem>
                                                            <SelectItem value="Work">Work</SelectItem>
                                                            <SelectItem value="Family">Family</SelectItem>
                                                            <SelectItem value="Health">Health</SelectItem>
                                                            <SelectItem value="Events">Events</SelectItem>
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
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Mood<span className="text-destructive">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <Slider value={Number(field.value)} onChange={field.onChange} />
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
                        <div className="flex justify-end items-center gap-2 pr-10 pb-10">
                            <Button
                                variant={"outline"}
                                onClick={() => setOpenAddJournalDrawer(false)}
                            >
                                Cancel
                            </Button>

                            {creating ? (
                                <Button className="flex items-center bg-[#e05126]" type="submit">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </Button>
                            ) : (
                                <Button className="flex items-center bg-[#e05126]" type="submit">
                                    Submit
                                </Button>
                            )}
                        </div>
                    </form>
                </Form>
            </DrawerContent>
        </Drawer>
    );
};

export default AddJournalDrawer;
