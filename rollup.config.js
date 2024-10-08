import esbuild from "rollup-plugin-esbuild";
import { dts } from "rollup-plugin-dts";

export default [
  {
    input: "src/image-color-scheme.ts",
    output: [{ file: "dist/types.d.ts" }],
    plugins: [dts()],
  },
  {
    input: "src/image-color-scheme.ts",
    external: (id) => !/^[./]/.test(id),
    plugins: [
      esbuild({
        minify: true,
        sourceMap: false,
      }),
    ],
    output: [
      {
        file: "dist/index.js",
        format: "es",
      },
    ],
  },
];
