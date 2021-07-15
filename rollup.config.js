import { createPlugins } from "rollup-plugin-atomic"

const plugins = createPlugins([["ts", { tsconfig: "./tsconfig.json" }, true], "js", "json"])

const RollupConfig = [
  {
    input: "src/main.ts",
    output: [
      {
        dir: "dist",
        format: "cjs",
        sourcemap: process.env.NODE_ENV === "production" ? true : "inline",
      },
    ],
    // loaded externally
    external: ["atom", "log4js", "rxjs-compat/bundles/rxjs-compat.umd.min.js"],
    plugins,
  },
]
export default RollupConfig
