import { AppError, errorHandler } from "@/lib/errors";
import { HandledError } from "@/lib/types";

/**
 * A higher-order function that wraps an asynchronous server action,
 * ensuring errors are caught, handled, and properly logged. It accepts
 * a function that takes any number of arguments and returns a promise.
 * If an error occurs during the execution of the wrapped function,
 * the error is processed by the `errorHandler`, and appropriate error
 * handling logic is applied.
 *
 * ### This function ensures the Next.js redirect functionality works
 *
 * @template T - The return type of the wrapped async function.
 * @template Args - The type of the arguments passed to the async function.
 *
 * @param {(...args: Args) => Promise<T>} action - The asynchronous function to wrap.
 * It accepts any number of arguments and must return a Promise.
 *
 * @returns {(...args: Args) => Promise<T | HandledError>} - A function that takes the same
 * arguments as the original function, catches errors, logs them, and returns the result
 * or a handled error.
 *
 * @example
 * // Example usage in a server action:
 * const myServerAction = catchAsyncAction(async (id: string, name: string) => {
 *   const result = await someDatabaseCall(id, name);
 *   return result;
 * });
 *
 * // Calling the server action with parameters
 * await myServerAction("123", "exampleName");
 *
 * @warning
 * The function is tightly coupled with Next.js behavior for redirect handling.
 * Breaking changes can occur if the Next.js version changes the way redirects
 * are handled. Be mindful of version updates.
 */
export default function catchAsyncAction<T, Args extends any[]>(
    action: (...args: Args) => Promise<T>
): (...args: Args) => Promise<T | HandledError> {
    return async (...args: Args) => {
        try {
            return await action(...args);
        } catch (error) {
            // We need to throw redirect errors. Otherwise, the redirect function won't work
            // https://nextjs.org/docs/app/building-your-application/routing/redirecting#redirect-function
            // ! Breaking changes can happen here if the current Next.js version is changed !
            if ((error as Error)?.message === "NEXT_REDIRECT") throw error;

            const { handledError, isUnknownError } = errorHandler(
                error as AppError
            );

            // TODO: use logger for isUnknownError
            if (isUnknownError)
                console.error("Unknown error has occurred!", error);
            else console.warn((error as AppError).message, error);

            return handledError;
        }
    };
}
