import * as mc from "@minecraft/server";

/**
 * Runs a command at the location of a block.
 * @param block - The block to run the command at.
 * @param command - The command to run.
 * @returns Result of the command execution.
 */
export const runCommandAtBlock = (block: mc.Block, command: string): mc.CommandResult => {
	const { x, y, z } = block.center();
	const location = `${x} ${y} ${z}` as const;
	const finalCommand = `execute positioned ${location} run ${command}`;
	return block.dimension.runCommand(finalCommand);
};

/**
 * Destroys a block using the `setblock` command.
 * @param block - The block to destroy.
 */
export const destroyBlock = (block: mc.Block): void => {
	const { x, y, z } = block.center();
	const location = `${x} ${y} ${z}` as const;
	const finalCommand = `setblock ${location} air destroy`;
	block.dimension.runCommand(finalCommand);
};
