import { z } from "zod";

export const Journal = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title must be less than 100 characters" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(1000, { message: "Description must be less than 1000 characters" }),
  date: z
    .union([z.date(), z.undefined()])
    .refine(
      (val) =>
        val === undefined || (val instanceof Date && !isNaN(val.getTime())),
      {
        message: "Invalid date format",
      }
    ),
  category: z.string().min(1, { message: "Category is required" }),
  mood: z.number().min(0, { message: "Mood is required" }),
  imageUrl: z.array(z.instanceof(File)).optional(),
});
