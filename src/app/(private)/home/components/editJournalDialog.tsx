import { z } from "zod";
import { useForm } from "react-hook-form";
import { Journal } from "@/schema/Journal";
import { Calendar, Edit, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileInput } from "@/components/ui/file-input";
import { DatePicker } from "@/components/ui/date-picker";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { useJournalStore } from "@/store/journalStore";
import { useState } from "react";

type EditJournalDialogProps = {
    openEditJournal: boolean;
    setOpenEditJournal: React.Dispatch<React.SetStateAction<boolean>>;
    journal: Journal | null
};

const EditJournalDialog = ({ openEditJournal, setOpenEditJournal, journal }: EditJournalDialogProps) => {

    const { updateJournal } = useJournalStore((state) => state);
    const [update, setUpdate] = useState(false);

    const onOpenChange = (open: boolean) => {
        setOpenEditJournal(open);
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

    const getMoodValue = (mood: string) => {
        return moodMapping.find((item) => item.mood === mood)?.range[0] ?? 0;
    };

    const getMood = (value: number) => {
        return (
            moodMapping.find(({ range }) => value >= range[0] && value <= range[1])
                ?.mood || "😀"
        );
    };

    const defaultValues: z.infer<typeof Journal> = {
        title: journal?.title || "",
        description: journal?.description || "",
        date: journal?.date || undefined,
        category: journal?.category.toLowerCase() || "",
        mood: getMoodValue(journal?.mood || "😀") || 0,
        imageUrl: [],
    };

    const form = useForm<z.infer<typeof Journal>>({
        defaultValues: defaultValues,
        mode: "onTouched",
        resolver: zodResolver(Journal),
    });

    const onSubmit = async (values: z.infer<typeof Journal>) => {
        console.log(values);

        updateJournal({ values, mood: getMood(values?.mood), journal: journal as Journal, setUpdate, setOpenEditJournal });
    };

    return (
        <Drawer open={openEditJournal} onOpenChange={onOpenChange}>
            <DrawerContent>
                <DrawerTitle className='pl-4 pb-4 border-b-2 flex items-center gap-2'>
                    <Edit />
                    Edit Journal
                </DrawerTitle>
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
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mood<span className='text-destructive'>*</span></FormLabel>
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
                                {journal?.imageUrl && form.getValues("imageUrl") && form.getValues("imageUrl")?.length === 0 && <Image src={journal?.imageUrl} alt="Quote Background" className="rounded-3xl w-[100%] h-[100%] object-cover" width={350} height={0} objectFit="cover" />}
                            </div>
                        </ScrollArea>
                        <div className='flex justify-end items-center gap-2 pr-10 pb-10'>
                            <Button variant={"outline"} onClick={() => setOpenEditJournal(false)}>Cancel</Button>
                            {update ? <Button type="submit" className="bg-[#e05126]"><Loader2 className="animate-spin mr-2" />Updating</Button> : <Button type="submit" className="bg-[#e05126]">Update</Button>}
                        </div>
                    </form>
                </Form>
            </DrawerContent>
        </Drawer>
    )
}

export default EditJournalDialog