import fs from "fs"
import https from "https"
import path from "path";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import sessions from "express-session";
import prismaClient from "./prismaClient";
import { redisStore, redisClient } from "./storageInit"
import { renderer, errorHandler } from "./controllers";
import { ReqUser } from "./custome-types";
import "dotenv/config";

declare global {
  namespace Express {
    export interface Request {
      user?: ReqUser;
    }
  }
}

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

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


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

} else {
  // When we go into production...
}
// app.use(helmet());

// This path needs to be fixed during production for docker container
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
    maxAge: 3 * 60000,
    sameSite: true,
  }
}));
app.use(errorHandler);
app.use("*", renderer);

const httpsServer = https.createServer(credentials, app);

const startServer = function () {
  try {
    redisClient.on("connect", function () {
      console.log(`Redis server listening on port ${REDIS_PORT}...`);
    });
  
    redisClient.on("error", function (err: any) {
      console.error(err)
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
