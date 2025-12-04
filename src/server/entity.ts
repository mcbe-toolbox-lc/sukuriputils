import * as mc from "@minecraft/server";

/**
 * Checks if an entity is alive (i.e., has health greater than 0).
 *
 * @param entity - The entity to check.
 * @returns `true` if the entity's current health is greater than 0, otherwise `false`.
 * @throws This function can throw errors.
 */
export const isEntityAlive = (entity: mc.Entity): boolean => {
	const healthComponent = entity.getComponent("health");
	return healthComponent !== undefined && healthComponent.currentValue > 0;
};
