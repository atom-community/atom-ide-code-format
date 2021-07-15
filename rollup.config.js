import { createPlugins } from "rollup-plugin-atomic"

const plugins = createPlugins(["js", "babel"])

const RollupConfig = [
  {
    input: "src/main.js",
    output: [
      {
        dir: "dist",
        format: "cjs",
        sourcemap: process.env.NODE_ENV === "production" ? true : "inline",
      },
    ],
    // loaded externally
    external: ["atom"],
    plugins,
  },
]
export default RollupConfig
