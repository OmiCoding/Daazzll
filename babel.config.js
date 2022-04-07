function isAuth(caller) {
  return !!(caller && process.env.TYPE === "auth");
}

function isNode(caller) {
  return !!(caller && process.env.TYPE === "node");
}

function isWeb(caller) {
  return !!(caller && process.env.TYPE === "web");
}

module.exports = function (api) {
  const auth = api.caller(isAuth);
  const node = api.caller(isNode);
  const web = api.caller(isWeb);

  if (auth) {
    return {
      env: {
        test: {
          plugins: ["@babel/plugin-transform-modules-commonjs"],
        },
      },
      presets: [
        [
          "@babel/preset-env",
          {
            modules: false,
            targets: {
              node: "current",
            },
            useBuiltIns: "entry",
            corejs: "3.20.1",
          },
        ],
        "@babel/preset-typescript",
      ],
      plugins: [
        "@babel/plugin-transform-runtime",
        "@babel/plugin-proposal-export-default-from",
      ],
    };
  } else if (node) {
    return {
      env: {
        test: {
          plugins: ["@babel/plugin-transform-modules-commonjs"],
        },
      },
      presets: [
        [
          "@babel/preset-env",
          {
            modules: "commonjs",
            targets: {
              node: "current",
            },
          },
        ],
        "@babel/preset-typescript",
        "@babel/preset-react",
      ],
      plugins: [
        "@babel/plugin-syntax-dynamic-import",
        "@loadable/babel-plugin",
        "@babel/plugin-transform-runtime",
        "@babel/plugin-proposal-export-default-from",
      ],
    };
  } else if (web) {
    return {
      env: {
        test: {
          plugins: ["@babel/plugin-transform-modules-commonjs"],
        },
      },
      presets: [
        [
          "@babel/preset-env",
          {
            useBuiltIns: "entry",
            corejs: "3.20.1",
            modules: "commonjs",
          },
        ],
        "@babel/preset-typescript",
        "@babel/preset-react",
      ],
      plugins: [
        "@loadable/babel-plugin",
        "@babel/transform-runtime",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-export-default-from",
      ],
    };
  } else {
    return {
      env: {
        test: {
          plugins: ["@babel/plugin-transform-modules-commonjs"],
        },
      },
      presets: [
        [
          "@babel/preset-env",
          {
            modules: false,
            targets: {
              node: "current",
            },
          },
        ],
        "@babel/preset-typescript",
        "@babel/preset-react",
      ],
      plugins: [
        "@loadable/babel-plugin",
        "@babel/transform-runtime",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-export-default-from",
      ],
    };
  }
};
