import { ZodError, ZodSchema } from "zod";

type ValidateResponse<T> =
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
 * @param {T} object - The object to be validated.
 *
 * @returns {ValidateResponse<T>} - The validated object if it passes the schema,
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

export default function validate<T>(
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
