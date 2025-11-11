import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/math/index.ts", "src/server/index.ts"],
	outDir: "dist",
	bundle: true,
	dts: true,
	clean: true,
	format: "esm",
	platform: "node",
});
