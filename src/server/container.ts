import * as mc from "@minecraft/server";

/**
 * Finds the first item stack in the given `container` that matches the specified predicate condition.
 *
 * Iterates through all item stacks in the `container` sequentially and returns the first stack
 * where the `predicate` function returns `true`. If no matching item stack is found, returns
 * `undefined`.
 *
 * @param container - The container to search through.
 * @param predicate - A function that tests each item stack and should return `true` for a match.
 * @returns The first matching item stack, or `undefined` if no match is found.
 * @throws This function can throw errors.
 */
export const findFirstContainerItem = (
	container: mc.Container,
	predicate: (itemStack: mc.ItemStack, index: number) => boolean,
): mc.ItemStack | undefined => {
	for (let i = 0; i < container.size; i++) {
		const itemStack = container.getItem(i);
		if (itemStack && predicate(itemStack, i)) return itemStack;
	}
	return undefined;
};

/**
 * Finds the first slot in the given `container` that matches the specified predicate condition.
 *
 * Iterates through all slots in the `container` sequentially and returns the first slot
 * where the `predicate` function returns `true`. If no matching slot is found, returns `undefined`.
 *
 * @param container - The container to search through.
 * @param predicate - A function that tests each slot and should return `true` for a match.
 * @returns The first matching container slot, or `undefined` if no match is found.
 * @throws This function can throw errors.
 */
export const findFirstContainerSlot = (
	container: mc.Container,
	predicate: (slot: mc.ContainerSlot, index: number) => boolean,
): mc.ContainerSlot | undefined => {
	for (let i = 0; i < container.size; i++) {
		const slot = container.getSlot(i);
		if (predicate(slot, i)) return slot;
	}
	return undefined;
};
