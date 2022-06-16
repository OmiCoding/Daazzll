const baseConfig = require("./webpack.config");
const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = function (env, argV) {
  return merge(
    baseConfig({
      mode: argV.mode,
      entry: "./client/main-web.tsx",
      target: "web",
      filename: "[name].bundle.js",
    }),
    {
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            test: /\.(ts|js)x?$/,
            extractComments: false,
            terserOptions: {
              format: {
                comments: false,
              },
            },
          }),
        ],
        splitChunks: {
          // The chunks prop with the "all" value will split between the modules you define and external (node_modules) chunks
          chunks: "all",
          // The minimal size for a chunk
          minSize: 0,
          // Performs the same as minSize but in the initial load
          maxInitialRequests: Infinity,
          cacheGroups: {
            // This allows you to create your own custom vendor chunk.
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context.match(
                  /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                )[1];

                return `npm.${packageName.replace("@", "")}`;
              },
            },
          },
        },
      },
    }
  );
};
