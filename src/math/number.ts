/**
 * Clamps a number to ensure it falls within the specified range.
 *
 * @param value - The number to clamp.
 * @param min - The minimum allowable value.
 * @param max - The maximum allowable value.
 * @returns The clamped value.
 */
export const clamp = (value: number, min: number, max: number): number =>
	Math.max(min, Math.min(max, value));

/**
 * Checks if two numbers are approximately equal within a tolerance.
 *
 * @param n1 - First number.
 * @param n2 - Second number.
 * @param epsilon - Max allowed difference. Defaults to `0.0001`.
 * @returns True if approximately equal.
 */
export const almostEquals = (n1: number, n2: number, epsilon = 0.0001): boolean =>
	Math.abs(n1 - n2) < epsilon;
