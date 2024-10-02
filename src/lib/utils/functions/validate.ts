import httpStatus from "http-status";
import { ZodError, ZodSchema } from "zod";
import { AppError } from "@/lib/errors";

type ValidateResponse<T extends object> =
    | T
    | {
          message: string;
          data: {
              [key: string]: string;
          };
      };

/**
 * Validates an object against a given Zod schema.
 *
 * @template T - The type of the object to be validated.
 *
 * @param {ZodSchema} schema - The Zod schema to validate the object against.
 * @param {T extends object} object - The object to be validated.
 *
 * @returns {ValidateResponse<T extends object>} - The validated object if it passes the schema,
 * or an object containing an error message and a map of validation errors.
 *
 * @throws Will rethrow any errors that are not instances of ZodError. **(It should never happen)**
 *
 * @example
 * const schema = z.object({
 *   name: z.string(),
 *   age: z.number(),
 * });
 *
 * const result = validate(schema, { name: "John", age: 30 });
 * if ('message' in result) {
 *   console.error(result.message, result.data);
 * } else {
 *   console.log("Validation successful:", result);
 * }
 */
export function validate<T extends object>(
    schema: ZodSchema,
    object: T
): ValidateResponse<T> {
    try {
        const parsedBody = schema.parse(object);
        return parsedBody as T;
    } catch (err) {
        if (err instanceof ZodError || "errors" in (err as any)) {
            // Format Zod errors into a more readable structure
            const formattedErrors: { [key: string]: string } = {};
            (err as ZodError).errors.forEach((e) => {
                formattedErrors[e.path.join(".")] = e.message;
            });

            return {
                message: "Invalid data",
                data: formattedErrors,
            };
        }
        throw err; // should never happen
    }
}

/**
 * Validates an object against a given Zod schema and throws an error if validation fails.
 *
 * This function is considered "unsafe" because it throws an exception when validation fails,
 * unlike the `validate` function, which returns a validation error object.
 *
 * @template T - The type of the object to be validated.
 *
 * @param {ZodSchema} schema - The Zod schema to validate the object against.
 * @param {T extends object} object - The object to be validated.
 *
 * @returns {T} - The validated object if it passes the schema.
 *
 * @throws {AppError} - If validation fails, an AppError is thrown with the validation error details.
 *
 * @example
 * const schema = z.object({
 *   name: z.string(),
 *   age: z.number(),
 * });
 *
 * try {
 *   const validData = validateUnsafe(schema, { name: "John", age: 30 });
 *   console.log("Validation successful:", validData);
 * } catch (err) {
 *   console.error("Validation failed:", err);
 * }
 */
export function validateUnsafe<T extends object>(
    schema: ZodSchema,
    object: T
): T {
    const values = validate<T>(schema, object);

    if ("message" in values) {
        throw new AppError(
            values.message,
            httpStatus.BAD_REQUEST,
            false,
            values.data
        );
    }

    return values as T;
}
