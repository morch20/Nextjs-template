/* eslint-disable @typescript-eslint/no-unused-vars */

// import "server-only";
// import httpStatus from "http-status";
// import { PostgresError } from "postgres";
// import { count, eq, ilike } from "drizzle-orm";
// import { AppError } from "@/lib/errors";
// import db from "@/db";
// import { users } from "@/db/schema";
import { UserRequest, UserResponse } from "@/lib/types";

// Allowed fields
// export const ALLOWED_USER_FIELDS = {
//     id: users.id,
//     email: users.email,
//     role: users.role,
//     updatedAt: users.updatedAt,
//     createdAt: users.createdAt,
// };

const getUserById = async (id: number): Promise<UserResponse[]> => {
    // const user = await db
    //     .select(ALLOWED_USER_FIELDS)
    //     .from(users)
    //     .where(eq(users.id, id))
    //     .limit(1);

    // return user;
    return [
        {
            id: 1,
            email: "email@email.com",
            role: "Basic",
            updatedAt: new Date(),
            createdAt: new Date(),
        },
    ];
};

const createUser = async (user: UserRequest): Promise<UserResponse[]> => {
    // try {
    //     const newUser = await db
    //         .insert(users)
    //         .values(user)
    //         .returning(ALLOWED_USER_FIELDS);
    //     return newUser;
    // } catch (error) {
    //     if (error instanceof PostgresError && error.code === "23505") {
    //         throw new AppError("Duplicate key", httpStatus.BAD_REQUEST, false, {
    //             email: "Can not have an already existing email",
    //         });
    //     }

    //     throw error;
    // }
    return [
        {
            id: 1,
            email: "email@email.com",
            role: "Basic",
            updatedAt: new Date(),
            createdAt: new Date(),
        },
    ];
};

const updateUserById = async (
    id: number,
    user: UserRequest
): Promise<UserResponse[]> => {
    // try {
    //     const updatedUser = await db
    //         .update(users)
    //         .set(user)
    //         .where(eq(users.id, id))
    //         .returning(ALLOWED_USER_FIELDS);
    //     return updatedUser;
    // } catch (error) {
    //     if (error instanceof PostgresError && error.code === "23505") {
    //         throw new AppError("Duplicate key", httpStatus.BAD_REQUEST, false, {
    //             email: "Can not have an already existing email",
    //         });
    //     }

    //     throw error;
    // }
    return [
        {
            id: 1,
            email: "email@email.com",
            role: "Basic",
            updatedAt: new Date(),
            createdAt: new Date(),
        },
    ];
};

const getUsers = async (
    limit: number,
    offset: number,
    email = ""
): Promise<UserResponse[]> => {
    // // Initialize the query builder
    // let query = db
    //     .select(ALLOWED_USER_FIELDS)
    //     .from(users)
    //     .limit(limit)
    //     .offset(offset)
    //     .$dynamic();

    // // Add a where clause if email is not empty
    // if (email !== "") {
    //     query = query.where(ilike(users.email, `%${email}%`));
    // }

    // // Execute the query
    // const resourcesResponse = await query;
    // return resourcesResponse;
    return [
        {
            id: 1,
            email: "email@email.com",
            role: "Basic",
            updatedAt: new Date(),
            createdAt: new Date(),
        },
    ];
};

const getNumberOfRows = async (email = "") => {
    // // Initialize the query builder
    // let query = db.select({ count: count() }).from(users).$dynamic();

    // // Add a where clause if email is not empty
    // if (email !== "") {
    //     query = query.where(ilike(users.email, `%${email}%`));
    // }

    // // Execute the query
    // const amount = await query;
    // return amount;
    return [
        {
            count: 1,
        },
    ];
};

const deleteUserById = async (id: number) => {
    // await db.delete(users).where(eq(users.id, id));
};

const userDataAccess = {
    getUserById,
    createUser,
    updateUserById,
    getUsers,
    getNumberOfRows,
    deleteUserById,
};

export default userDataAccess;
