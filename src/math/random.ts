/**
 * Generates a random integer between a minimum and maximum value, inclusive.
 *
 * @param min - The minimum boundary (inclusive).
 * @param max - The maximum boundary (inclusive).
 * @returns A random integer between min and max.
 */
export const randomInt = (min: number, max: number): number =>
	Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Generates a random floating-point number between a minimum and maximum value.
 *
 * Note: The minimum value is inclusive, but the maximum value is exclusive.
 *
 * @param min - The minimum boundary (inclusive).
 * @param max - The maximum boundary (exclusive).
 * @returns A random floating-point number between min and max.
 */
export const randomFloat = (min: number, max: number): number => Math.random() * (max - min) + min;
