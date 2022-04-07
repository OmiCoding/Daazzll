"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _serializeJavascript = _interopRequireDefault(require("serialize-javascript"));

function buildHtml(context, html, linkTags, styleTags, scriptTags) {
  return `
  <!doctype html>
  <html lang="en">
    <head>
      <title>Dazl</title>
      ${linkTags()}
      ${styleTags()}
    </head>
    <body>
    <script>
        ;window.app=${(0, _serializeJavascript.default)(context)}
      </script>
      <div id="root">${html}</div>
      ${scriptTags()}
    </body>
  </html>
  `;
}

var _default = buildHtml;
exports.default = _default;