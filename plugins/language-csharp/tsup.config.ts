import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "node24",
  dts: true,
  clean: true,
  sourcemap: true,
  // The grammar is compiled in: the package ships its own few files, not the grammar collection.
  noExternal: [/^@shikijs\/langs/],
});
