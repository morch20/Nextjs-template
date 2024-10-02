import httpStatus from "http-status";
import { AppError, errorHandler } from "..";

describe("Testing AppError class", () => {
    describe("Testing class", () => {
        test("It should return a throwsErrorFunction error", () => {
            const errorName = "throwsErrorFunction";
            const throwsError = () => {
                throw new AppError(errorName, httpStatus.INTERNAL_SERVER_ERROR);
            };

            expect(throwsError).toThrow(errorName);
        });

        test("It should have a throwsError message for the parent class Error", () => {
            const appError = new AppError(
                "throwsError",
                httpStatus.INTERNAL_SERVER_ERROR
            );

            expect(appError.message).toBe("throwsError");
        });

        test("It should have an undefined stack when NODE_ENV=test", () => {
            const appError = new AppError(
                "throwsError",
                httpStatus.INTERNAL_SERVER_ERROR
            );

            expect(appError.stack).toBeUndefined();
        });

        test("It should have a stack when stack=true", () => {
            const appError = new AppError(
                "throwsError",
                httpStatus.INTERNAL_SERVER_ERROR,
                true
            );

            expect(appError.stack).toBeTruthy();
        });

        test("It should return 500 error type since the statusCode is not a number", () => {
            const appError = new AppError("throwsError", "100_MESSAGE", true);

            expect(appError.getErrorType()).toBe(
                httpStatus[httpStatus.INTERNAL_SERVER_ERROR]
            );
        });
    });

    describe("Testing getters", () => {
        test("getStatusCode() should return 500 status code", () => {
            const appError = new AppError(
                "throwsError",
                httpStatus.INTERNAL_SERVER_ERROR
            );

            expect(appError.getStatusCode()).toBe(500);
        });

        test("getErrorType() should return an valid httpStatus error string", () => {
            const appError = new AppError(
                "throwsError",
                httpStatus.INTERNAL_SERVER_ERROR
            );

            expect(appError.getErrorType()).toBe(
                httpStatus[httpStatus.INTERNAL_SERVER_ERROR]
            );
        });
    });
});

describe("ErrorHandler function", () => {
    it("should handle AppError correctly", () => {
        const appError = new AppError("Test Error", httpStatus.BAD_REQUEST);

        const { handledError, isUnknownError } = errorHandler(appError);

        expect(handledError).toEqual({
            statusCode: httpStatus.BAD_REQUEST,
            message: "Test Error",
            errorType: "Bad Request",
            data: {},
        });
        expect(isUnknownError).toBe(false);
    });

    it("should handle unknown errors and set isUnknownError to true", () => {
        const unknownError = new Error("Unknown Error");

        const { handledError, isUnknownError } = errorHandler(
            unknownError as AppError
        );

        expect(handledError).toEqual({
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Something went wrong in the server.",
            errorType: "Internal Server Error",
            data: {},
        });
        expect(isUnknownError).toBe(true);
    });

    it("should handle errors with a statusCode and set isUnknownError to true", () => {
        const errorWithStatusCode = {
            statusCode: httpStatus.BAD_REQUEST,
            message: "Bad Request",
        };

        const { handledError, isUnknownError } = errorHandler(
            errorWithStatusCode as unknown as AppError
        );

        expect(handledError).toEqual({
            statusCode: httpStatus.BAD_REQUEST,
            message: "Bad Request",
            errorType: "Bad Request",
            data: {},
        });
        expect(isUnknownError).toBe(true);
    });

    it("should handle errors without a statusCode and set isUnknownError to true", () => {
        const errorWithoutStatusCode = new Error("Unknown Error");

        const { handledError, isUnknownError } = errorHandler(
            errorWithoutStatusCode as AppError
        );

        expect(handledError).toEqual({
            statusCode: httpStatus.INTERNAL_SERVER_ERROR,
            message: "Something went wrong in the server.",
            errorType: "Internal Server Error",
            data: {},
        });
        expect(isUnknownError).toBe(true);
    });
});
