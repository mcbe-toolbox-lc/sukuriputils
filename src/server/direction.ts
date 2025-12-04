import * as mc from "@minecraft/server";

/**
 * Reverses a cardinal direction (e.g., Up becomes Down, North becomes South).
 *
 * @param direction - The direction to reverse.
 * @returns The opposite direction.
 */
export const getOppositeDirection = (direction: mc.Direction): mc.Direction => {
	switch (direction) {
		case mc.Direction.Up:
			return mc.Direction.Down;
		case mc.Direction.Down:
			return mc.Direction.Up;
		case mc.Direction.North:
			return mc.Direction.South;
		case mc.Direction.East:
			return mc.Direction.West;
		case mc.Direction.South:
			return mc.Direction.North;
		case mc.Direction.West:
			return mc.Direction.East;
		default:
			return mc.Direction.North;
	}
};

/**
 * Converts a `Vector2` rotation (pitch/X, yaw/Y) into a cardinal direction.
 *
 * @param rotation - The rotation vector.
 * @param ignorePitch - If true, only yaw/Y is considered for cardinal directions. Defaults to `false`.
 * @param pitchThreshold - Angle threshold for pitch/X to determine Up/Down. Defaults to `45`.
 * @returns The corresponding direction.
 */
export const getDirectionFromRotation = (
	rotation: mc.Vector2,
	ignorePitch = false,
	pitchThreshold = 45,
): mc.Direction => {
	if (!ignorePitch && rotation.x < -pitchThreshold) return mc.Direction.Up;
	if (!ignorePitch && rotation.x > pitchThreshold) return mc.Direction.Down;
	if (rotation.y > -45 && rotation.y <= 45) return mc.Direction.South;
	if (rotation.y > 45 && rotation.y <= 135) return mc.Direction.West;
	if (rotation.y > 135 || rotation.y <= -135) return mc.Direction.North;
	if (rotation.y > -135 && rotation.y <= -45) return mc.Direction.East;
	return mc.Direction.North;
};

/**
 * Converts a cardinal direction into a `Vector2` rotation (pitch/X, yaw/Y).
 *
 * @param direction - The cardinal direction.
 * @returns The corresponding rotation.
 */
export const getRotationFromDirection = (direction: mc.Direction): mc.Vector2 => {
	switch (direction) {
		case mc.Direction.Up:
			return { x: -90, y: 0 };
		case mc.Direction.Down:
			return { x: 90, y: 0 };
		case mc.Direction.South:
			return { x: 0, y: 0 };
		case mc.Direction.West:
			return { x: 0, y: 90 };
		case mc.Direction.North:
			return { x: 0, y: 180 };
		case mc.Direction.East:
			return { x: 0, y: -90 };
		default:
			return { x: 0, y: 0 };
	}
};
