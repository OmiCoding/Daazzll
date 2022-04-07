"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _prismaClient = _interopRequireDefault(require("./prismaClient"));

var _controllers = require("./controllers");

var _dotenv = require("dotenv");

// This needs to be added in productions
// import helmet from "helmet";
(0, _dotenv.config)();
let {
  API_SERVER_PORT
} = process.env;

if (!API_SERVER_PORT) {
  API_SERVER_PORT = "8080";
}

const app = (0, _express.default)();
app.use(_express.default.urlencoded({
  extended: true
}));
app.use(_express.default.json());
app.use((0, _cookieParser.default)()); // include helmet

if (process.env.BUILD === "development" || process.env.BUILD === "test") {
  app.use((0, _cors.default)({
    origin: ["http://localhost:8433"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true
  }));
} else {// When we go into production...
} // app.use(helmet());
// This path needs to be fixed during production for docker container


const BUILD_PATH = _path.default.resolve("build");

app.use("/static", _express.default.static(BUILD_PATH));
app.use(_controllers.errorHandler);
app.use("*", _controllers.renderer);

const startServer = function () {
  try {
    app.listen(API_SERVER_PORT, async function () {
      await _prismaClient.default.$connect();
      console.log(`Now listening on port ${API_SERVER_PORT}...`);
    });
  } catch (e) {
    console.error(e);
  }
};

var _default = startServer;
exports.default = _default;