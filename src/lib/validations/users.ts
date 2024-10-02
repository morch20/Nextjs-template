import { z } from "zod";
import { paginationSchema } from "./pagination";
import { USERS_ROLES } from "../utils/constants";

const baseUserSchema = z.object({
    id: z.number().int().positive(),
    email: z.string().trim().email("Please enter a valid email."),
    password: z
        .string()
        .trim()
        .min(4, "Password must contain at least 4 characters.")
        .max(15, "Password must contain at most 15 characters."), // TODO: improve password security
    role: z.enum(USERS_ROLES).default("Basic"),
    updatedAt: z.date(),
    createdAt: z.date(),
});

export const userRequestSchema = baseUserSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const userResponseSchema = baseUserSchema.omit({
    password: true,
});

export const usersQuerySchema = paginationSchema.extend({
    email: z.string().default(""),
});
