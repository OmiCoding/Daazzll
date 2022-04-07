const path = require("path");
const baseConfig = require("./webpack.config");
const { merge } = require("webpack-merge");
const LoadablePlugin = require("@loadable/webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const {
  createLoadableComponentsTransformer,
} = require("typescript-loadable-components-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

module.exports = function (env, argV) {
  if (process.env.TYPE === "web") {
    return merge(
      baseConfig({
        mode: argV.mode,
        entry: "./client/main-web.tsx",
        target: "web",
        filename: "[name].js",
        name: "client",
        buildPath: path.resolve(__dirname, "build"),
        pluginArr: [
          new LoadablePlugin({ filename: "web-loadable-stats.json" }),
          new MiniCSSExtractPlugin(),
        ],
        rulesArr: [
          {
            test: /\.(ts|js)x?$/,
            exclude: /(node_modules)/,
            use: [
              "babel-loader",
              {
                loader: "ts-loader",
                options: {
                  onlyCompileBundledFiles: true,
                  getCustomTransformers: (program) => ({
                    before: [createLoadableComponentsTransformer(program, {})],
                  }),
                },
              },
            ],
          },
          {
            test: /\.css$/,
            use: [MiniCSSExtractPlugin.loader, "css-loader"],
          },
          {
            test: /\.svg$/,
            use: ["@svgr/webpack"],
          },
        ],
      }),
      {
        devtool: "nosources-source-map",
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
  } else {
    return merge(
      baseConfig({
        mode: argV.mode,
        entry: "./client/main-node.tsx",
        target: "node",
        filename: "ssr.js",
        name: "ssr",
        buildPath: path.resolve(__dirname, "build"),
        pluginArr: [
          new LoadablePlugin({ filename: "node-loadable-stats.json" }),
        ],
        rulesArr: [
          {
            test: /\.(ts|js)x?$/,
            exclude: /(node_modules)/,
            use: [
              "babel-loader",
              {
                loader: "ts-loader",
                options: {
                  onlyCompileBundledFiles: true,
                  getCustomTransformers: (program) => ({
                    before: [createLoadableComponentsTransformer(program, {})],
                  }),
                },
              },
            ],
          },
          {
            test: /\.css$/,
            use: ["css-loader"],
          },
          {
            test: /\.svg$/,
            use: ["@svgr/webpack"],
          },
        ],
      }),
      {
        output: {
          library: {
            type: "commonjs2",
          },
        },
        devtool: "nosources-source-map",
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
  }
};

// optimization: {
//   splitChunks: {
//     // The chunks prop with the "all" value will split between the modules you define and external (node_modules) chunks
//     chunks: "all",
//     // The minimal size for a chunk
//     minSize: 0,
//     // Performs the same as minSize but in the initial load
//     maxInitialRequests: Infinity,
//     // cacheGroup is used to define rules on how to group our chunks together
//     cacheGroups: {
//       // This allows you to create your own custom vendor chunk.
//       vendor: {
//         test: /[\\/]node_modules[\\/]/,
//         name(module) {
//           const packageName = module.context.match(
//             /[\\/]node_modules[\\/](.*?)([\\/]|$)/
//           )[1];

//           return `npm.${packageName.replace("@", "")}`;
//         },
//       },
//     },
//   },
// },
