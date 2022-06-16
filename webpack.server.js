const baseConfig = require("./webpack.config");
const { merge } = require("webpack-merge");
const nodeExternals = require("webpack-node-externals");

module.exports = function (env, argV) {
  console.log(argV.mode);
  return merge(
    baseConfig({
      mode: argV.mode,
      entry: "./client/main-node.tsx",
      target: "node",
      filename: "node.js",
    }),
    {
      output: {
        library: {
          type: "commonjs2",
        },
      },
      node: {
        __dirname: false,
        __filename: false,
      },
      externalsPresets: {
        node: true,
      },
      externals: ["@loadable/component", nodeExternals()],
      optimization: {
        moduleIds: "named",
        chunkIds: "named",
      },
    }
  );
};
