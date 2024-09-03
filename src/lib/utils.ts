import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Pauses execution for a specified amount of time.
 *
 * This function returns a promise that resolves after a delay, making it useful for
 * creating artificial delays in asynchronous code, such as simulating network latency
 * or waiting for an operation to complete.
 *
 * @function pause
 * @param {number} [delay=200] - The delay time in milliseconds (default is 200ms).
 * @returns {Promise<void>} - A promise that resolves after the specified delay.
 */ export function pause(delay = 200) {
    return new Promise((res) => {
        setTimeout(res, delay);
    });
}

/**
 * Capitalizes the first letter of each word in a string.
 *
 * This function splits the input string by a specified delimiter, capitalizes the first letter of each resulting word, and then joins them back together with the same delimiter.
 *
 * @param {string} value - The input string to be processed.
 * @param {string} [splitBy=" "] - The delimiter to split the input string by. Defaults to a space.
 * @param {string} [joinBy=" "] - The delimiter to join the splitted string array by. Defaults to a space.
 * @returns {string} - The input string with the first letter of each word capitalized.
 *
 * @example
 * capitalizeFirstLetters("hello world"); // "Hello World"
 * capitalizeFirstLetters("hello-world", "-"); // "Hello World"
 * capitalizeFirstLetters("hello-world", "-", "-"); // "Hello-World"
 */
export function capitalizeFirstLetters(
    value: string,
    splitBy = " ",
    joinBy = " "
) {
    return value
        .split(splitBy)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(joinBy);
}

/**
 * Generates a human-readable string representing the time elapsed since a given date.
 */
export function generateHowLongAgo(date: Date): string {
    // * Use this library instead
    // import { formatDistance } from "date-fns";
    //
    // return formatDistance(date, new Date(), {
    //     addSuffix: true,
    //     includeSeconds: true,
    // });
    return date.toISOString();
}
