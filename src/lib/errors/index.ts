import httpStatus, { HttpStatus } from "http-status";
import { HandledError } from "../types";

export class AppError extends Error {
    public message: string;

    private statusCode: number;

    private errorType: string;

    private metadata: { [key: string]: string };

    /**
     * Creates an instance of AppError.
     * @param message A descriptive message for the error.
     * @param statusCode The HTTP status code associated with the error (must be a **number** of keyof HttpStatus).
     * @param showStack Flag to indicate whether to include stack trace in error message (default: false).
     * @param metadata An object that contains extra information that can be shown to users
     */
    constructor(
        message: string,
        statusCode: keyof HttpStatus,
        showStack: boolean = false,
        metadata: { [key: string]: string } = {}
    ) {
        super(message);
        this.message = message;
        this.metadata = metadata;
        this.statusCode = Number(statusCode) || 500;

        this.errorType = httpStatus[
            this.statusCode as keyof HttpStatus
        ] as string;

        if (process.env.NODE_ENV === "production" || showStack) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = undefined;
        }
    }

    /**
     * Retrieves the HTTP status code associated with the error.
     * @returns The HTTP status code (number).
     */
    getStatusCode() {
        return this.statusCode;
    }

    /**
     * Retrieves the descriptive error type associated with the HTTP status code.
     * @returns The error type description (string).
     */
    getErrorType() {
        return this.errorType;
    }

    /**
     * Retrieves the metadata object type associated with the error.
     * @returns The object type metadata (object).
     */
    getMetaData() {
        return this.metadata;
    }
}

/**
 * Handles and normalizes errors into a consistent response format.
 *
 * If the provided error is not an instance of `AppError`, it will assume it's an unknown error
 * and construct a generic internal server error. Additionally, it flags the error as an unknown error.
 *
 * @param {AppError | Error} err - The error to handle. Can be an instance of `AppError` or any unknown error.
 *
 * @returns {Object} An object containing:
 * - `handledError`: A normalized error object containing the status code, message, error type, and optional metadata.
 * - `isUnknownError`: A boolean indicating whether the error was an unknown (non-`AppError`) error.
 *
 * @property {HandledError} handledError - The handled error object.
 * @property {boolean} isUnknownError - Whether the error was unknown (true if not an instance of `AppError`).
 *
 * @example
 * // Handling an instance of AppError
 * const appError = new AppError("Not Found", 404);
 * const result = errorHandler(appError);
 * console.log(result.handledError); // { statusCode: 404, message: "Not Found", errorType: "Not Found", data: {} }
 * console.log(result.isUnknownError); // false
 *
 * @example
 * // Handling an unknown error
 * const unknownError = new Error("Some unexpected error");
 * const result = errorHandler(unknownError);
 * console.log(result.handledError); // { statusCode: 500, message: "Something went wrong in the server.", errorType: "Internal Server Error", data: {} }
 * console.log(result.isUnknownError); // true
 */
export function errorHandler(err: AppError): {
    handledError: HandledError;
    isUnknownError: boolean;
} {
    let error = err;
    let isUnknownError = false;

    if (!(error instanceof AppError)) {
        const statusCode = (error as any)?.statusCode
            ? httpStatus.BAD_REQUEST
            : httpStatus.INTERNAL_SERVER_ERROR;

        const message = (error as any)?.message || httpStatus[statusCode];

        isUnknownError = true;

        if ((error as any)?.statusCode)
            error = new AppError(message, statusCode);
        else
            error = new AppError(
                "Something went wrong in the server.",
                httpStatus.INTERNAL_SERVER_ERROR
            );
    }

    return {
        handledError: {
            statusCode: error.getStatusCode(),
            message: error.message,
            errorType: error.getErrorType(),
            data: error.getMetaData(),
        },
        isUnknownError,
    };
}
