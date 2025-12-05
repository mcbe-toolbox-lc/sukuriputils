import * as mc from "@minecraft/server";

/**
 * Reverses a cardinal direction (e.g., Up becomes Down, North becomes South).
 *
 * @param direction - The direction to reverse.
 * @returns The opposite direction.
 *
 * @example
 * ```ts
 * const dir = getOppositeDirection(Direction.Up);
 * // Returns Direction.Down
 *
 * const dir2 = getOppositeDirection(Direction.East);
 * // Returns Direction.West
 * ```
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
 *
 * @example
 * ```ts
 * const dir = getDirectionFromRotation({ x: 0, y: 69 });
 * // Returns Direction.West;
 *
 * const dir2 = getDirectionFromRotation(entity.getRotation(), true);
 * // Returns the cardinal direction of the entity
 * ```
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
 *
 * @example
 * ```ts
 * const rotation = getRotationFromDirection(Direction.North);
 * // Returns { x: 0, y: 180 }
 * ```
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

/**
 * Converts a cardinal direction to its corresponding unit vector.
 *
 * @param direction - The direction to convert.
 * @returns A unit vector pointing in the specified direction.
 *
 * @example
 * ```ts
 * const upVector = getVectorFromDirection(Direction.Up);
 * // Returns { x: 0, y: 1, z: 0 }
 * ```
 */
export const getVectorFromDirection = (direction: mc.Direction): mc.Vector3 => {
	switch (direction) {
		case mc.Direction.Up:
			return { x: 0, y: 1, z: 0 };
		case mc.Direction.Down:
			return { x: 0, y: -1, z: 0 };
		case mc.Direction.North:
			return { x: 0, y: 0, z: -1 };
		case mc.Direction.East:
			return { x: 1, y: 0, z: 0 };
		case mc.Direction.South:
			return { x: 0, y: 0, z: 1 };
		case mc.Direction.West:
			return { x: -1, y: 0, z: 0 };
		default:
			return { x: 0, y: 0, z: 0 };
	}
};

/**
 * Converts a vector to its corresponding cardinal direction.
 *
 * @param vector - The vector to convert (does not need to be a unit vector).
 * @returns The direction enum value corresponding to the dominant axis.
 *
 * @example
 * ```ts
 * const dir = getDirectionFromVector({ x: 0, y: 5, z: 0 });
 * // Returns Direction.Up
 *
 * const dir2 = getDirectionFromVector({ x: 2, y: 1, z: 0 });
 * // Returns Direction.East (x-axis is dominant)
 * ```
 */
export const getDirectionFromVector = (vector: mc.Vector3): mc.Direction => {
	// Normalize to handle non-unit vectors
	const absX = Math.abs(vector.x);
	const absY = Math.abs(vector.y);
	const absZ = Math.abs(vector.z);

	// Find the dominant axis
	if (absY > absX && absY > absZ) {
		return vector.y > 0 ? mc.Direction.Up : mc.Direction.Down;
	} else if (absX > absZ) {
		return vector.x > 0 ? mc.Direction.East : mc.Direction.West;
	} else if (absZ > 0) {
		return vector.z > 0 ? mc.Direction.South : mc.Direction.North;
	}

	// Zero vector case
	return mc.Direction.North;
};
