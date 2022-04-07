"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = void 0;

const errorHandler = function (err, req, res, next) {
  if (err.stack) {
    console.error(err.stack);
  } else {
    console.error(err);
  }

  return res.status(500).redirect("/");
};

exports.errorHandler = errorHandler;