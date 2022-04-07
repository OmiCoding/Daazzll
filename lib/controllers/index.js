"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _renderer = require("./renderer");

Object.keys(_renderer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _renderer[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _renderer[key];
    }
  });
});

var _errorHandler = require("./errorHandler");

Object.keys(_errorHandler).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _errorHandler[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _errorHandler[key];
    }
  });
});