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

/**
 * Retrieves a location in front of an entity's head, based on its view direction.
 *
 * @param entity - The entity.
 * @returns A new Vector3 representing the location in front of the entity's head.
 * @throws This function can throw errors.
 */
export const getEntityForwardLocation = (entity: mc.Entity): mc.Vector3 => {
	const headLocation = entity.getHeadLocation();
	const viewDirection = entity.getViewDirection();
	return {
		x: headLocation.x + viewDirection.x,
		y: headLocation.y + viewDirection.y,
		z: headLocation.z + viewDirection.z,
	};
};
