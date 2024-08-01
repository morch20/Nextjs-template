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
 *
 * This function calculates the difference between the current date and the provided date and returns a string that describes how long ago that date was, or if it's in the future.
 *
 * @param {Date} date - The date to compare against the current date.
 * @returns {string} - A string representing the time difference in a human-readable format.
 *
 * @example
 * generateHowLongAgo(new Date(Date.now() - 3600 * 1000)); // "1 hour ago"
 * generateHowLongAgo(new Date(Date.now() + 3600 * 1000)); // "in the future"
 */
export function generateHowLongAgo(date: Date): string {
    const now = new Date();
    let differenceInSeconds = Math.floor(
        (now.getTime() - date.getTime()) / 1000
    );

    const agoOrFuture = differenceInSeconds < 0 ? "in the future" : "ago";
    differenceInSeconds = Math.abs(differenceInSeconds);
    const secondsInMinute = 60;
    const secondsInHour = 60 * secondsInMinute;
    const secondsInDay = 24 * secondsInHour;
    const secondsInMonth = 30.44 * secondsInDay; // Average days in a month considering leap years
    const secondsInYear = 365.25 * secondsInDay; // Average days in a year considering leap years

    if (differenceInSeconds < secondsInMinute) {
        return `${differenceInSeconds} second${differenceInSeconds !== 1 ? "s" : ""} ${agoOrFuture}`;
    }
    if (differenceInSeconds < secondsInHour) {
        const minutes = Math.floor(differenceInSeconds / secondsInMinute);
        return `${minutes} minute${minutes > 1 ? "s" : ""} ${agoOrFuture}`;
    }
    if (differenceInSeconds < secondsInDay) {
        const hours = Math.floor(differenceInSeconds / secondsInHour);
        return `${hours} hour${hours > 1 ? "s" : ""} ${agoOrFuture}`;
    }
    if (differenceInSeconds < secondsInMonth) {
        const days = Math.floor(differenceInSeconds / secondsInDay);
        return `${days} day${days > 1 ? "s" : ""} ${agoOrFuture}`;
    }
    if (differenceInSeconds < secondsInYear) {
        const months = Math.floor(differenceInSeconds / secondsInMonth);
        return `${months} month${months > 1 ? "s" : ""} ${agoOrFuture}`;
    }
    const years = Math.floor(differenceInSeconds / secondsInYear);
    return `${years} year${years > 1 ? "s" : ""} ${agoOrFuture}`;
}
