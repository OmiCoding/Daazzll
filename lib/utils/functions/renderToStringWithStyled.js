"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _server = require("react-dom/server");

var _styledComponents = require("styled-components");

function renderToStringWithStyled(element) {
  const sheet = new _styledComponents.ServerStyleSheet();

  try {
    const html = (0, _server.renderToString)(sheet.collectStyles(element));
    const styleTags = sheet.getStyleTags();
    return [html, styleTags];
  } catch (err) {
    throw err;
  } finally {
    sheet.seal();
  }
}

var _default = renderToStringWithStyled;
exports.default = _default;