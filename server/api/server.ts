import fs from "fs"
import https from "https"
import path from "path";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import sessions from "express-session";
import connectRedis from "connect-redis";
import prismaClient from "./prismaClient";
import redisClient from "./cacheServer"
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

const { API_SERVER_PORT, SESSION_SECRET } = process.env;

if (!API_SERVER_PORT) {
  throw new Error ("api port is undefined.")
}
if(!SESSION_SECRET) {
  throw new Error("Session secret is undefined.")
}

const RedisStore = connectRedis(sessions);
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
  secret: SESSION_SECRET,
  store: new RedisStore({ client: redisClient }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    domain: "daazzll.local"
  }
}));
app.use(function(req, res, next) {
  console.log(req.session);
  console.log(req.sessionID)
  console.log(" ");
  console.log(req.user);
  return next();
});
app.use(errorHandler);
app.use("*", renderer);

const httpsServer = https.createServer(credentials, app);

const startServer = function () {
  try {
    httpsServer.listen(API_SERVER_PORT, async function () {
      await prismaClient.$connect();
      console.log(`Now listening on port ${API_SERVER_PORT}...`);
    });
  } catch (e: any) {
    console.error(e);
  }
};

export default startServer;
