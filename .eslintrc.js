module.exports = {
  root: true,
  env: {
    node: true,
  },
  rules: {
    "@typescript-eslint/no-namespace": "off",
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  plugins: ["react"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  ignorePatterns: ["build/*", "lib/*", "./webpack.*"],
};
