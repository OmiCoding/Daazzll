module.exports = {
  plugins: [
    // require("postcss-import"),
    require("cssnano")({
      preset: "default",
    }),
    require("postcss-preset-env")({
      stage: 4,
    }),
  ],
};
