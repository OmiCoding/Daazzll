<<<<<<< HEAD
import fs from "fs"
import https from "https"
=======
import fs from "fs";
import https from "https";
>>>>>>> main
import path from "path";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import sessions from "express-session";
import prismaClient from "./prismaClient";
<<<<<<< HEAD
import { redisStore, redisClient } from "./storageInit"
import { renderer, errorHandler } from "./controllers";
import "dotenv/config";


declare module "express-session"{
=======
import connectRedis from "connect-redis";
import { redisClient } from "./storageInit";
import { renderer, errorHandler } from "./controllers";
import { setUserProp } from "./middleware";

import "dotenv/config";

declare module "express-session" {
>>>>>>> main
  export interface SessionData {
    name: string;
  }
}

<<<<<<< HEAD


const { API_SERVER_PORT, SESSION_SECRET, REDIS_PORT } = process.env;

if (!API_SERVER_PORT) {
  throw new Error ("api port is undefined.")
}
if(!SESSION_SECRET) {
  throw new Error("Session secret is undefined.")
}

const keyPath = path.join(__dirname + "../../../certs/daazzll.local-key.pem")
const certPath = path.join(__dirname + "../../../certs/daazzll.local.pem");

const privKey = fs.readFileSync(keyPath, "utf-8");
const cert = fs.readFileSync(certPath, "utf-8");

const credentials = {
  key: privKey,
  cert: cert,
}
=======
const RedisStore = connectRedis(sessions);

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
>>>>>>> main

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

<<<<<<< HEAD

// include helmet
if (process.env.BUILD === "development" || process.env.BUILD === "test") {
  app.use(cors({
    origin: ["https://daazzll.local:8080", "https://daazzll.local:8433", "https://daazzll.local:8080/", 
    "https://daazzll.local:8433/"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
    exposedHeaders: ["Authorization"]
  }))

=======
// include helmet
if (process.env.BUILD === "development" || process.env.BUILD === "test") {
  app.use(
    cors({
      origin: [
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
>>>>>>> main
} else {
  // When we go into production...
}
// app.use(helmet());

// This path needs to be fixed during production for docker container
<<<<<<< HEAD
const BUILD_PATH = path.resolve("build");

app.use(cookieParser())
app.use("/static", express.static(BUILD_PATH));
app.use(sessions({
  name: "session1",
  secret: SESSION_SECRET,
  store: redisStore,
  resave: false,
  saveUninitialized: true,
  cookie: {
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: true,
  }
}));
app.use(function(req, res, next) {
  if(req.session){
    req.session.name = "sess1"
=======
const BUILD_PATH =
  BUILD === "dev" ? path.resolve("build") : "/home/node/src/build";

app.use(cookieParser(USER_SECRET));
app.use("/static", express.static(BUILD_PATH));
app.use(setUserProp);
app.use(function (req, res, next) {
  if (req.session && !req.session.name) {
    req.session.name = "sess1";
>>>>>>> main
  }
  return next();
});
app.use(errorHandler);
app.use("*", renderer);

const httpsServer = https.createServer(credentials, app);

const startServer = function () {
  try {
    redisClient.on("connect", function () {
      console.log(`Redis server listening on port ${REDIS_PORT}...`);
    });
<<<<<<< HEAD
  
    redisClient.on("error", function (err: any) {
      console.error(err)
=======

    redisClient.on("error", function (err: any) {
      console.error(err);
>>>>>>> main
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
