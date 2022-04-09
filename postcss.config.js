module.exports = {
  plugins: [
    require("cssnano")({
      preset: "default",
    }),
    require("postcss-preset-env")({
      stage: 4,
    }),
  ],
};
