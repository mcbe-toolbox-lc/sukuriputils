import * as mc from "@minecraft/server";

/**
 * Checks if a player is creative or spectator.
 * @param player - The player.
 * @returns `true` if the player is in either creative or spectator game mode, otherwise `false`.
 */
export const isPlayerCreativeOrSpectator = (player: mc.Player): boolean => {
	const gameMode = player.getGameMode();
	return gameMode === mc.GameMode.Creative || gameMode === mc.GameMode.Spectator;
};
