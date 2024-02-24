import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";

import pkg from "./package.json";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.module,
        format: "es",
        sourcemap: "inline",
      },
    ],
    plugins: [
      // commonjsで書かれた依存ライブラリを読み込めるようにする
      nodeResolve(),
      commonjs(),

      // typescriptによるコンパイル
      // rollup用のtsconfigを読み込むことでjsにコンパイルする
      //
      // targetをes5にしているため、typescriptが可能な範囲で構文の変換が行われる
      // これは主にoptional chainingなどtypescriptが先行して導入している構文の変換のため
      //
      // この時distディレクトリに型定義ファイルを出力する(declarationDirの指定が必要)
      typescript({
        tsconfig: "tsconfig.rollup.json",
        declaration: true,
        declarationDir: "dist",
      }),

      // jsonのimportを処理
      json({
        compact: true,
      }),
    ],
  },
];
