import path from "path";
import fs from "fs";
import https from "https";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbClient from "./prismaClient";
import auth from "./routes/auth";
import profile from "./routes/profile";
import errorHandler from "./controllers/errorHandler";
import { ReqUser } from "./custom-types";
import { setUserProp } from "./middleware/auth";
import { redisClient } from "./storageInit";
import "dotenv/config";

declare global {
  namespace Express {
    export interface Request {
      user?: ReqUser;
    }
  }
}
const { AUTH_SERVER_PORT, REDIS_PORT, SESSION_SECRET, BUILD, USER_SECRET } =
  process.env;

if (!AUTH_SERVER_PORT) {
  throw new Error("auth port is undefined.");
}
if (!REDIS_PORT) {
  throw new Error("redis port is undefined.");
}
if (!BUILD) {
  throw new Error("Build environment is undefined.");
}
if (!SESSION_SECRET) {
  throw new Error("Session secret is undefined.");
}

let keyPath;
let certPath;
if (BUILD === "dev") {
  keyPath = path.join(__dirname + "../../../certs/daazzll.dev+3-key.pem");
  certPath = path.join(__dirname + "../../../certs/daazzll.dev+3.pem");
} else {
  keyPath = path.join(__dirname + "../../../daazzll.dev+3-key.pem");
  certPath = path.join(__dirname + "../../../daazzll.dev+3.pem");
}
const privKey = fs.readFileSync(keyPath, "utf-8");
const cert = fs.readFileSync(certPath, "utf-8");

const credentials = {
  key: privKey,
  cert: cert,
};

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// include helmet
if (BUILD === "development" || BUILD === "test") {
  app.use(
    cors({
      origin: [
        "https://daazzll.dev:8080",
        "https://daazzll.dev:8433",
        "https://daazzll.dev:8080/",
        "https://daazzll.dev:8433/",
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Authorization", "Content-Type"],
      // exposedHeaders: ["Authorization"]
    })
  );
} else {
  // when we go into production...
}

app.use(cookieParser(USER_SECRET));
app.use(setUserProp);
app.use(auth);
app.use("/profile", profile);
app.use("*", errorHandler);

const httpsServer = https.createServer(credentials, app);

export const authServer = function () {
  httpsServer.listen(AUTH_SERVER_PORT, async function () {
    await dbClient.$connect();
    await redisClient.connect();
    console.log(`Now listening on port ${AUTH_SERVER_PORT}...`);
  });
};
