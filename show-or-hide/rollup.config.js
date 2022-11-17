import pkg from "./package.json" assert { type: "json" };
import ts from "rollup-plugin-typescript2";
const tsPlugin = ts({
  tsconfig: "./tsconfig.json",
});
export default [
  {
    input: "src/index.ts",
    external: ["vue"],
    plugins: [tsPlugin],
    output: [
      {
        file: pkg.main,
        format: "cjs",
      },
      {
        file: pkg.module,
        format: "es",
      },
    ],
  },
];
