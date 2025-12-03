import { describe, expect, it } from "vitest";
import { weightedRandom } from "./random";

describe("weightedRandom", () => {
	it("should throw error for empty array", () => {
		expect(() => weightedRandom([])).toThrow();
	});

	it("should throw error for zero or negative total weight", () => {
		const choices = [
			{ weight: 0, value: "a" },
			{ weight: 0, value: "b" },
		];
		expect(() => weightedRandom(choices)).toThrow();
	});

	it("should always pick the only item", () => {
		const choices = [{ weight: 1, value: "only" }];
		const result = weightedRandom(choices);
		expect(result.value).toBe("only");
	});

	it("should pick item with 100% weight", () => {
		const choices = [
			{ weight: 0, value: "never" },
			{ weight: 100, value: "always" },
		];

		for (let i = 0; i < 10; i++) {
			const result = weightedRandom(choices);
			expect(result.value).toBe("always");
		}
	});

	it("should respect weight distribution statistically", () => {
		const choices = [
			{ weight: 70, value: "common" },
			{ weight: 20, value: "uncommon" },
			{ weight: 10, value: "rare" },
		];

		const counts = { common: 0, uncommon: 0, rare: 0 };
		const iterations = 10000;

		for (let i = 0; i < iterations; i++) {
			const result = weightedRandom(choices);
			(counts as Record<string, number>)[result.value]!++;
		}

		// Check that distributions are roughly correct (within 5% tolerance)
		expect(counts.common / iterations).toBeCloseTo(0.7, 1);
		expect(counts.uncommon / iterations).toBeCloseTo(0.2, 1);
		expect(counts.rare / iterations).toBeCloseTo(0.1, 1);
	});

	it("should preserve full object properties", () => {
		const choices = [{ weight: 1, id: 123, name: "test", metadata: { foo: "bar" } }];

		const result = weightedRandom(choices);
		expect(result.id).toBe(123);
		expect(result.name).toBe("test");
		expect(result.metadata.foo).toBe("bar");
	});
});
