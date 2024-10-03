import { z } from "zod";
import { paginationSchema } from "./pagination";
import {
    PASSWORD_SPECIAL_CHARACTERS_REGEX,
    USERS_ROLES,
} from "../utils/constants";

const baseUserSchema = z.object({
    id: z.number().int().positive(),
    email: z.string().trim().email("Please enter a valid email."),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must have at least one uppercase letter")
        .regex(/[0-9]/, "Password must have at least one numeric character")
        .regex(
            PASSWORD_SPECIAL_CHARACTERS_REGEX,
            "Password must have at least one special character"
        )
        .max(30, "Password must be at most 30 characters."),
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
