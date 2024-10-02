"use server";

// import { getServerSession } from "next-auth";
import httpStatus from "http-status";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { AppError } from "@/lib/errors";
// import { options } from "@/app/api/auth/[...nextauth]/options";
import catchAsyncAction from "@/lib/utils/functions/catchAsyncAction";
import { validateUnsafe } from "@/lib/utils/functions/validate";
import { userRequestSchema, usersQuerySchema } from "@/lib/validations/users";
import userDataAccess from "./dataAccess";
import { PaginationResponse, UserRequest, UserResponse } from "@/lib/types";
import { paramsSchema } from "@/lib/validations/pagination";

async function validateSession() {
    const session = {
        user: {
            role: "Basic",
        },
    }; // await getServerSession(options);

    if (session?.user?.role !== "Admin")
        throw new AppError(
            "It seems you are not authorized to create a new user.",
            httpStatus.FORBIDDEN
        );
}

export const getUserById = catchAsyncAction(
    async (id: number): Promise<UserResponse> => {
        const parsedId = validateUnsafe(paramsSchema, { id });

        const user = await userDataAccess.getUserById(parsedId.id);

        if (user.length !== 1)
            throw new AppError("Resource not found", httpStatus.NOT_FOUND);

        return user[0];
    }
);

export const createUser = catchAsyncAction(
    async (user: UserRequest): Promise<never> => {
        await validateSession();

        const parsedUser = validateUnsafe(userRequestSchema, user);

        const newUser = await userDataAccess.createUser(parsedUser);

        // Most likely will never happen
        if (newUser.length !== 1)
            throw new AppError(
                "Error creating resource",
                httpStatus.INTERNAL_SERVER_ERROR
            );

        revalidatePath("/users");
        redirect(`/users/${newUser[0].id}`);
    }
);

export const updateUserById = catchAsyncAction(
    async (id: number, user: UserRequest): Promise<never> => {
        await validateSession();

        const parsedId = validateUnsafe(paramsSchema, { id });
        const parsedUser = validateUnsafe(userRequestSchema, user);

        const updatedUser = await userDataAccess.updateUserById(
            parsedId.id,
            parsedUser
        );

        // Most likely will never happen
        if (updatedUser.length !== 1)
            throw new AppError(
                "Error updating resource",
                httpStatus.INTERNAL_SERVER_ERROR
            );

        revalidatePath("/users");
        redirect(`/users/${updatedUser[0].id}`);
    }
);

export const getUsers = catchAsyncAction(
    async (
        page: number,
        amount: number,
        email: string
    ): Promise<PaginationResponse<UserResponse>> => {
        const values = validateUnsafe(usersQuerySchema, {
            page,
            amount,
            email,
        });

        // Since the lowest allowed page is 1 for better user experience, and nicer math
        const newPage = values.page - 1;

        // Execute queries in parallel
        const [numberOfRows, results] = await Promise.all([
            userDataAccess.getNumberOfRows(values.email),
            userDataAccess.getUsers(
                values.amount,
                newPage * values.amount,
                values.email
            ),
        ]);

        // Most likely the array will never be empty
        let count = 0;
        if (numberOfRows.length > 0) {
            count = numberOfRows[0].count;
        }

        const users = {
            data: results,
            pagination: {
                amount: count,
                pages: Math.ceil(count / amount),
            },
        };

        return users;
    }
);

export const deleteUserById = catchAsyncAction(
    async (id: number): Promise<never> => {
        await validateSession();

        const parsedId = validateUnsafe(paramsSchema, { id });

        await userDataAccess.deleteUserById(parsedId.id);

        revalidatePath("/users");
        redirect("/users");
    }
);
