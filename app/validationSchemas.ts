import { z } from "zod"

export const issueSchema = z.object({
    title: z.string().min(1, "Title is required").max(50),
    description: z.string().min(1, "Description is required"),
});

export const patchIssueSchema = z.object({
    title: z.string().min(1).max(50).optional(),
    description: z.string().min(1).max(2000).optional(),
    assignedToUserId: z.string().min(1).max(255).optional().nullable()
});
