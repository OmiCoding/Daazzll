import fs from "fs";
import https from "https";
import path from "path";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import prismaClient from "./prismaClient";
import { redisClient } from "./storageInit";
import renderer from "./controllers/renderer";
import errorHandler from "./controllers/errorHandler";
import { setUserProp } from "./middleware/auth/authMidWare";
import auth from "./routes/auth";
import profile from "./routes/profile";

import "dotenv/config";

declare module "express-session" {
  export interface SessionData {
    name: string;
  }
}

declare global {
  namespace Express {
    export interface Request {
      user?: ReqUser;
    }
  }
}

const { API_SERVER_PORT, SESSION_SECRET, REDIS_PORT, USER_SECRET, BUILD } =
  process.env;

if (!API_SERVER_PORT) {
  throw new Error("api port is undefined.");
}
if (!SESSION_SECRET) {
  throw new Error("Session secret is undefined.");
}

let keyPath;
let certPath;
if (BUILD === "dev") {
  keyPath = path.join(__dirname + "/../certs/daazzll.dev+3-key.pem");
  certPath = path.join(__dirname + "/../certs/daazzll.dev+3.pem");
} else {
  keyPath = path.join(__dirname + "/../daazzll.dev+3-key.pem");
  certPath = path.join(__dirname + "/../daazzll.dev+3.pem");
}
const privKey = fs.readFileSync(keyPath, "utf-8");
const cert = fs.readFileSync(certPath, "utf-8");
const credentials = {
  key: privKey,
  cert: cert,
};

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(
  express.json({
    limit: "50mb",
  })
);

// include helmet
if (process.env.BUILD === "dev" || process.env.BUILD === "test") {
  app.use(
    cors({
      origin: [
        "https://127.0.0.1:8080/",
        "https://127.0.0.1:8433/",
        "https://daazzll.dev",
        "https://daazzll.dev/",
        "https://daazzl.dev:8080",
        "https://daazzl.dev:8433",
        "https://daazzl.dev:8080/",
        "https://daazzl.dev:8433/",
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Authorization", "Content-Type"],
      exposedHeaders: ["Authorization"],
    })
  );
} else {
  // When we go into production...
}
// app.use(helmet());

// This path needs to be fixed during production for docker container
const BUILD_PATH =
  BUILD === "dev" ? path.resolve("build") : "/home/node/src/build";

app.use(cookieParser(USER_SECRET));
app.use("/static", express.static(BUILD_PATH));
app.use(setUserProp);
app.use(function (req, res, next) {
  if (req.session && !req.session.name) {
    req.session.name = "sess1";
  }
  return next();
});
app.use(auth);
app.use("/profile", profile);
app.use("*", renderer);
app.use(errorHandler);

const httpsServer = https.createServer(credentials, app);

const startServer = function () {
  try {
    redisClient.on("connect", function () {
      console.log(`Redis server listening on port ${REDIS_PORT}...`);
    });

    redisClient.on("error", function (err: any) {
      console.error(err);
      if (err) throw err;
    });

    httpsServer.listen(API_SERVER_PORT, async function () {
      await prismaClient.$connect();
      await redisClient.connect();
      console.log(`Now listening on port ${API_SERVER_PORT}...`);
    });
  } catch (e: any) {
    console.error(e);
  }
};

export default startServer;
