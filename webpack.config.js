module.exports = function ({
  mode,
  entry,
  target,
  filename,
  name,
  buildPath,
  pluginArr,
  rulesArr,
}) {
  return {
    mode: mode,
    entry: entry,
    target: target,
    name: name,
    output: {
      filename: filename,
      path: buildPath,
      publicPath: "/static/",
    },
    plugins: pluginArr,
    module: {
      rules: rulesArr,
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
