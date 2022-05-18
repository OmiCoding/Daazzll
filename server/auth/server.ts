import path from "path"
import fs from "fs"
import https from "https";
import express, { NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbClient from "./prismaClient";
import auth from "./routes/auth";
import errorHandler from "./controllers/errorHandler";
import "dotenv/config"
import redisClient from "./cacheServer"
import { tokenExist } from "./middleware/auth/authChecks";
import checkToken from "./middleware/auth/checkToken";

interface ReqUser {
  role?: string;
  email?: string;
  username?: string;
  userId?: string;
}

declare global {
  namespace Express {
    export interface Request {
      user?: ReqUser;
    }
  }
}

const keyPath = path.join(__dirname + "../../../certs/daazzll.local-key.pem");
const certPath = path.join(__dirname + "../../../certs/daazzll.local.pem");

const privKey = fs.readFileSync(keyPath, "utf-8");
const cert = fs.readFileSync(certPath, "utf-8");

let { AUTH_SERVER_PORT, REDIS_PORT, BUILD } = process.env;

const credentials = {
  key: privKey,
  cert: cert,
}

if (!AUTH_SERVER_PORT) {
  AUTH_SERVER_PORT = "8433";
}

if (!REDIS_PORT) {
  REDIS_PORT = "6379";
}

if(!BUILD) {
  throw new Error("Build environment is undefined.");
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

app.use(cookieParser());
app.use(auth);
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
