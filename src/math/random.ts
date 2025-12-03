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

/**
 * Performs a weight-based random selection from an array of choices.
 *
 * Each choice must have a `weight` property that determines its relative probability
 * of being selected. Higher weights increase the likelihood of selection.
 *
 * @param choices - Array of objects with weight properties to choose from.
 * @returns A randomly selected choice based on weights
 * @throws {Error} If the choices array is empty
 * @throws {Error} If the total weight is zero or negative
 *
 * @example
 * const loot = [
 *   { weight: 70, item: 'potion', rarity: 'common' },
 *   { weight: 25, item: 'sword', rarity: 'uncommon' },
 *   { weight: 5, item: 'diamond', rarity: 'rare' }
 * ];
 *
 * const reward = weightedRandom(loot);
 * console.log(reward.item); // Most likely to be 'potion'
 */
export const weightedRandom = <T extends { weight: number }>(choices: T[]): T => {
	if (choices.length === 0) throw new Error("Cannot pick from empty array");

	const totalWeight = choices.reduce((sum, choice) => sum + choice.weight, 0);

	if (totalWeight <= 0) throw new Error("Total weight must be positive");

	let random = Math.random() * totalWeight;

	for (const choice of choices) {
		random -= choice.weight;
		if (random <= 0) {
			return choice;
		}
	}

	// Fallback (should never reach here due to floating point edge cases)
	return choices[choices.length - 1]!;
};
