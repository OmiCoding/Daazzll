import path from "path"
import fs from "fs"
import crypto from "crypto";
import https from "https";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbClient from "./prismaClient";
import auth from "./routes/auth";
import profile from "./routes/profile";
import errorHandler from "./controllers/errorHandler";
import { ReqUser } from "./custom-types";
import "dotenv/config"
import { redisClient } from "./storageInit"



declare global {
  namespace Express {
    export interface Request {
      user?: ReqUser;
    }
  }
}


const secretId = crypto.randomBytes(20).toString('hex');
const keyPath = path.join(__dirname + "../../../certs/daazzll.local-key.pem");
const certPath = path.join(__dirname + "../../../certs/daazzll.local.pem");
const privKey = fs.readFileSync(keyPath, "utf-8");
const cert = fs.readFileSync(certPath, "utf-8");
const { AUTH_SERVER_PORT, REDIS_PORT, SESSION_SECRET, BUILD} = process.env;
const credentials = {
  key: privKey,
  cert: cert,
}

if (!AUTH_SERVER_PORT) {
  throw new Error("auth port is undefined.")
}
if (!REDIS_PORT) {
  throw new Error("redis port is undefined.")
}
if(!BUILD) {
  throw new Error("Build environment is undefined.");
}
if(!SESSION_SECRET) {
  throw new Error("Session secret is undefined.")
}


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// include helmet
if (BUILD === "development" || BUILD === "test") {
app.use(cors({
  origin: ["https://daazzll.local:8080", 
          "https://daazzll.local:8433", 
          "https://daazzll.local:8080/", 
          "https://daazzll.local:8433/"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Authorization", "Content-Type"],
  // exposedHeaders: ["Authorization"]
}))
} else {
  // when we go into production...
}

const BUILD_PATH = path.resolve("build");

app.use(cookieParser());
app.use("/static", express.static(BUILD_PATH));
app.use(auth);
app.use("/profile", profile)
app.use("*", errorHandler);


const httpsServer = https.createServer(credentials, app)

export const authServer = function () {
  redisClient.on("connect", function () {
    console.log(`Redis server listening on port ${REDIS_PORT}...`);
  });

  redisClient.on("error", function (err: any) {
    console.error(err)
    if (err) throw err;
  });


  httpsServer.listen(AUTH_SERVER_PORT, async function () {
    await dbClient.$connect();
    await redisClient.connect();
    console.log(`Now listening on port ${AUTH_SERVER_PORT}...`);
  });
};
