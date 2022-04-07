const { resolve } = require("path");
const commonConfig = require("./webpack.config");
const { merge } = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// const LoadablePlugin = require("@loadable/webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const {
  createLoadableComponentsTransformer,
} = require("typescript-loadable-components-plugin");

const buildPath = resolve(__dirname, "build");

module.exports = function (env, argV) {
  if (process.env.TYPE === "auth") {
    return merge(
      commonConfig({
        mode: argV.mode,
        target: "node",
        entry: "./server/auth/index.ts",
        filename: "server.js",
        name: "auth-server",
        buildPath: buildPath,
        pluginArr: [
          new CopyWebpackPlugin({
            patterns: [{ from: "./prisma/schema.prisma" }],
          }),
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
                },
              },
            ],
          },
        ],
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
        externals: [nodeExternals()],
        devtool: "nosources-source-map",
      }
    );
  } else {
    plugins =
      argV.mode === "development"
        ? [
            new CopyWebpackPlugin({
              patterns: [{ from: "./prisma/schema.prisma" }],
            }),
            new CleanWebpackPlugin({
              cleanStaleWebpackAssets: false,
            }),
          ]
        : [
            new CopyWebpackPlugin({
              patterns: [{ from: "./prisma/schema.prisma" }],
            }),
          ];

    return merge(
      commonConfig({
        mode: argV.mode,
        target: "node",
        entry: "./server/api/index.ts",
        filename: "api.js",
        name: "api-server",
        buildPath: buildPath,
        pluginArr: [
          new CopyWebpackPlugin({
            patterns: [{ from: "./prisma/schema.prisma" }],
          }),
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
            use: ["style-loader", "css-loader"],
          },
        ],
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
        devtool: "nosources-source-map",
      }
    );
  }
};
