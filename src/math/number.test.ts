import { describe, expect, it } from "vitest";
import { almostEquals, clamp } from "./number";

describe("clamp", () => {
	it("should return value when within range", () => {
		expect(clamp(5, 0, 10)).toBe(5);
		expect(clamp(0, -10, 10)).toBe(0);
		expect(clamp(-5, -10, 10)).toBe(-5);
	});

	it("should return min when value is below range", () => {
		expect(clamp(-5, 0, 10)).toBe(0);
		expect(clamp(-100, -10, 10)).toBe(-10);
		expect(clamp(0, 5, 10)).toBe(5);
	});

	it("should return max when value is above range", () => {
		expect(clamp(15, 0, 10)).toBe(10);
		expect(clamp(100, -10, 10)).toBe(10);
		expect(clamp(20, 5, 10)).toBe(10);
	});

	it("should handle value equal to min", () => {
		expect(clamp(0, 0, 10)).toBe(0);
		expect(clamp(-10, -10, 10)).toBe(-10);
	});

	it("should handle value equal to max", () => {
		expect(clamp(10, 0, 10)).toBe(10);
		expect(clamp(100, 0, 100)).toBe(100);
	});

	it("should handle negative ranges", () => {
		expect(clamp(-5, -10, -1)).toBe(-5);
		expect(clamp(-15, -10, -1)).toBe(-10);
		expect(clamp(0, -10, -1)).toBe(-1);
	});

	it("should handle decimal values", () => {
		expect(clamp(5.5, 0, 10)).toBe(5.5);
		expect(clamp(0.5, 1, 10)).toBe(1);
		expect(clamp(10.5, 0, 10)).toBe(10);
	});
});

describe("almostEquals", () => {
	it("should return true for equal numbers", () => {
		expect(almostEquals(5, 5)).toBe(true);
		expect(almostEquals(0, 0)).toBe(true);
	});

	it("should return true for numbers within default epsilon", () => {
		expect(almostEquals(1.0001, 1.0002)).toBe(true);
		expect(almostEquals(10, 10.00005)).toBe(true);
	});

	it("should return false for numbers outside default epsilon", () => {
		expect(almostEquals(1, 1.001)).toBe(false);
		expect(almostEquals(5, 5.1)).toBe(false);
	});

	it("should respect custom epsilon values", () => {
		expect(almostEquals(1, 1.5, 1)).toBe(true);
		expect(almostEquals(1, 1.5, 0.1)).toBe(false);
		expect(almostEquals(100, 105, 10)).toBe(true);
	});

	it("should handle negative numbers", () => {
		expect(almostEquals(-5, -5.00005)).toBe(true);
		expect(almostEquals(-1, -1.001)).toBe(false);
		expect(almostEquals(-10, -9.999)).toBe(false);
	});

	it("should handle numbers with different signs", () => {
		expect(almostEquals(-1, 1)).toBe(false);
		expect(almostEquals(-0.00005, 0.00005)).toBe(false);
		expect(almostEquals(-0.00004, 0.00004)).toBe(true);
	});
});
