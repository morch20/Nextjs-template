import { z } from "zod";

/**
 * Zod schema to validate the request params to make sure "id" is a valid positive integer number.
 */
export const paramsSchema = z.object({
    id: z.coerce.number().int().positive(),
});

/**
 * Zod schema to validate the request query to make sure "page" and "amount" are valid positive integer numbers.
 */
export const paginationSchema = z.object({
    page: z.coerce.number().int().positive().default(1).catch(1),
    amount: z.coerce.number().int().positive().default(10).catch(10),
});
