import * as mc from "@minecraft/server";

/**
 * Checks if a player is creative or spectator.
 *
 * @param player - The player.
 * @returns `true` if the player is in either creative or spectator game mode, otherwise `false`.
 * @throws This function can throw errors.
 */
export const isPlayerCreativeOrSpectator = (player: mc.Player): boolean => {
	const gameMode = player.getGameMode();
	return gameMode === mc.GameMode.Creative || gameMode === mc.GameMode.Spectator;
};

/**
 * Adds a camera shake effect to a player.
 *
 * @param player - The player to add the camera shake to.
 * @param intensity - Shake intensity.
 * @param seconds - Shake duration.
 * @param mode - Shake mode.
 * @throws This function can throw errors.
 */
export const addCameraShake = (
	player: mc.Player,
	intensity: number,
	seconds: number,
	mode: "positional" | "rotational",
): void => {
	player.runCommand(`camerashake add @s ${intensity} ${seconds} ${mode}`);
};

/**
 * Stops any active camera shake effect on a player.
 *
 * @param player - The player to stop the camera shake for.
 * @throws This function can throw errors.
 */
export const stopCameraShake = (player: mc.Player): void => {
	player.runCommand(`camerashake stop @s`);
};
