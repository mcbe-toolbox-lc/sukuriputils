import * as mc from "@minecraft/server";

/**
 * Runs a command at the location of a block.
 *
 * @param block - The block to run the command at.
 * @param command - The command to run.
 * @returns Result of the command execution.
 * @throws This function can throw errors.
 */
export const runCommandAtBlock = (block: mc.Block, command: string): mc.CommandResult => {
	const { x, y, z } = block.center();
	const location = `${x} ${y} ${z}` as const;
	const finalCommand = `execute positioned ${location} run ${command}`;
	return block.dimension.runCommand(finalCommand);
};

/**
 * Destroys a block using the `setblock` command.
 *
 * @param block - The block to destroy.
 * @throws This function can throw errors.
 */
export const destroyBlock = (block: mc.Block): void => {
	const { x, y, z } = block.center();
	const location = `${x} ${y} ${z}` as const;
	const finalCommand = `setblock ${location} air destroy`;
	block.dimension.runCommand(finalCommand);
};

/**
 * Gets a block relative to another block in the specified direction.
 *
 * @param origin - The starting block from which to calculate the relative position.
 * @param direction - The cardinal direction to move.
 * @param steps - The number of blocks to move in the specified direction. Defaults to 1.
 * @returns The block at the calculated relative position, could be undefined.
 * @throws This function can throw errors.
 */
export const getRelativeBlockFrom = (
	origin: mc.Block,
	direction: mc.Direction,
	steps = 1,
): mc.Block | undefined => {
	switch (direction) {
		case mc.Direction.Up:
			return origin.above(steps);
		case mc.Direction.Down:
			return origin.below(steps);
		case mc.Direction.North:
			return origin.north(steps);
		case mc.Direction.South:
			return origin.south(steps);
		case mc.Direction.West:
			return origin.west(steps);
		case mc.Direction.East:
			return origin.east(steps);
	}
};

/**
 * Gets the direction of a block.
 *
 * Checks block permutation states in order:
 * 1. `minecraft:cardinal_direction` (if enabled)
 * 2. `minecraft:block_face` (if enabled)
 *
 * @param block - The block (or block permutation).
 * @param checkCardinalDirectionState - Whether to check the `minecraft:cardinal_direction` state. Defaults to `true`.
 * @param checkBlockFaceState - Whether to check the `minecraft:block_face` state. Defaults to `true`.
 * @returns The block's direction. Defaults to North if no valid state is found.
 * @throws This function can throw errors.
 */
export const getBlockDirection = (
	block: mc.Block | mc.BlockPermutation,
	checkCardinalDirectionState = true,
	checkBlockFaceState = true,
): mc.Direction => {
	const permutation = block instanceof mc.BlockPermutation ? block : block.permutation;

	let directionState: string | undefined;
	if (checkCardinalDirectionState) {
		directionState = permutation.getState("minecraft:cardinal_direction");
	}
	if (!directionState && checkBlockFaceState) {
		directionState = permutation.getState("minecraft:block_face");
	}

	switch (directionState) {
		case "up":
			return mc.Direction.Up;
		case "down":
			return mc.Direction.Down;
		case "north":
			return mc.Direction.North;
		case "south":
			return mc.Direction.South;
		case "west":
			return mc.Direction.West;
		case "east":
			return mc.Direction.East;
		default:
			return mc.Direction.North;
	}
};
