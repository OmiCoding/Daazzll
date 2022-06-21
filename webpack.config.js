const path = require("path");
const LoadablePlugin = require("@loadable/webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const {
  createLoadableComponentsTransformer,
} = require("typescript-loadable-components-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const { EnvironmentPlugin } = require("webpack");

const buildPath = path.join(__dirname, "build");

module.exports = function ({ mode, entry, target, filename }) {
  const item =
    target === "node"
      ? [
          new CopyWebpackPlugin({
            patterns: [{ from: "./prisma/schema.prisma" }],
          }),
          new EnvironmentPlugin({
            BUILD_HOST: process.env.BUILD_HOST,
          }),
        ]
      : [];

  return {
    mode,
    target,
    entry,
    name: target,
    output: {
      filename,
      path: buildPath,
      publicPath: "/static/",
    },
    devtool: "nosources-source-map",
    plugins: [
      new LoadablePlugin({ filename: `${target}-loadable-stats.json` }),
      new MiniCSSExtractPlugin(),
      new ESLintWebpackPlugin({
        extensions: ["ts"],
      }),
      ...item,
    ],
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
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
          use: [
            MiniCSSExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              },
            },
            "postcss-loader",
          ],
        },
        {
          test: /\.svg$/,
          use: ["@svgr/webpack"],
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js", ".tsx", ".jsx"],
    },
    watch: mode === "development" ? true : false,
    watchOptions: {
      aggregateTimeout: 1000,
      poll: (process.platform === "linux" && 1000) || false, // make --watch work on linux
      ignored: ["node_modules", "build", "lib"],
    },
  };
};
