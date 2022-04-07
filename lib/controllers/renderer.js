"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderer = void 0;

var _react = _interopRequireDefault(require("react"));

var _path = _interopRequireDefault(require("path"));

var _server = require("@loadable/server");

var _serializeJavascript = _interopRequireDefault(require("serialize-javascript"));

var _server2 = require("react-dom/server");

/* Please Note: These path files need to be remade during production for the docker container*/
// The stats file maintains mapping of all the components by chunk name and its dependencies.
const nodeStatsFile = _path.default.resolve("build/node-loadable-stats.json");

const webStatsFile = _path.default.resolve("build/web-loadable-stats.json");

const renderer = function (req, res, next) {
  // The chunk extractor creates an instance related to the statsfile argument
  const webExtractor = new _server.ChunkExtractor({
    statsFile: webStatsFile,
    publicPath: "/static/"
  }); // This is needed for the ssr component

  const nodeExtractor = new _server.ChunkExtractor({
    statsFile: nodeStatsFile
  });
  const {
    default: App
  } = nodeExtractor.requireEntrypoint();
  const jsx = webExtractor.collectChunks( /*#__PURE__*/_react.default.createElement(App, null));
  const html = (0, _server2.renderToString)(jsx);
  res.set("content-type", "text/html");
  return res.status(200).send(` 
    <!doctype html>
    <html lang="en">
    <head>
      <title>Daazzll</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;900&family=Poppins:wght@900&display=swap" rel="stylesheet"> 
      ${webExtractor.getLinkTags()}
      ${webExtractor.getStyleTags()}
    </head>
    <body>
    <script>
        ;window.app=${(0, _serializeJavascript.default)({})}
      </script>
      <div id="root">${html}</div>
      ${webExtractor.getScriptTags()}
    </body>
  </html>`);
};

exports.renderer = renderer;