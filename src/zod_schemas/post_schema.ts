import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  userId: z.number().int().positive(),
});

export const updatePostSchema = z.object({
    title: z.string().min(1),
    content: z.string().min(1)
});

export const patchPostSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional()
})