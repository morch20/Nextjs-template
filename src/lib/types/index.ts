import { z } from "zod";
import { userRequestSchema, userResponseSchema } from "../validations/users";
import { paginationSchema, paramsSchema } from "../validations/pagination";

// * Errors
export type HandledError = {
    statusCode: number;
    message: string;
    errorType: string;
    data: object;
};

// * Pagination
export type PaginationResponse<T> = {
    data: T[];
    pagination: {
        amount: number;
        pages: number;
    };
};

export type ParamSchema = z.infer<typeof paramsSchema>;
export type PaginationSchema = z.infer<typeof paginationSchema>;

// * Users
export type UserResponse = z.infer<typeof userResponseSchema>;
export type UserRequest = z.infer<typeof userRequestSchema>;
