import { describe, expect, it } from "vitest";
import { almostEquals } from "./number";

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
