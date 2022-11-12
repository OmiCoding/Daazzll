import fs from "fs";
import https from "https";
import path from "path";
import express from "express";
import session from "express-session";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import prismaClient from "./prismaClient";
import { redisClient, redisStore } from "./storageInit";
import renderer from "./controllers/renderer";
import errorHandler from "./controllers/errorHandler";
import auth from "./routes/auth";
import profile from "./routes/profile";
import httpsHelper from "./utils/helpers/httpsHelper";
import { serializeUser, deserializeUser, strategyFunc } from "./utils/helpers/passport";

import "dotenv/config";

declare module "express-session" {
  export interface SessionData {
    name: string;
    passport: any,
  }
}

declare global {
  namespace Express {
    interface User {
      id: number;
    }
  }
}

const { API_SERVER_PORT, SESSION_SECRET, REDIS_PORT, USER_SECRET, BUILD } =
  process.env;

const BUILD_PATH = BUILD === "dev" ? path.resolve("build") : "/home/node/src/build";

if (!API_SERVER_PORT) {
  throw new Error("api port is undefined.");
}
if (!SESSION_SECRET) {
  throw new Error("Session secret is undefined.");
}

let credentials
if (BUILD === "dev" || BUILD === "test") {
  credentials = httpsHelper("dev");
} else {
  credentials = httpsHelper("production");
}
const privKey = fs.readFileSync(credentials.key, "utf-8");
const cert = fs.readFileSync(credentials.cert, "utf-8");
let ca: string | undefined;
if(credentials.ca) {
  ca = fs.readFileSync(credentials.ca, "utf-8");
} 

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: SESSION_SECRET,
  cookie: {
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: true,
  },
  store: redisStore,
}));
app.use(cookieParser(USER_SECRET));

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
        "https://localhost/",
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Authorization", "Content-Type"],
      exposedHeaders: ["Authorization"],
    })
  );
} else if(process.env.BUILD === "production") {
  // When we go into production...
  app.use(cors({
    origin: [
      "https://daazzll.com/"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
    exposedHeaders: ["Authorization"],
  }))
}
app.use("/static", express.static(BUILD_PATH));

// This path needs to be fixed during production for docker container
passport.use(new LocalStrategy(strategyFunc));
passport.serializeUser<number>(serializeUser);
passport.deserializeUser<number>(deserializeUser); 
app.use(passport.initialize());
app.use(passport.session());
app.use(auth);
app.use("/profile", profile);
app.get("/", function(req, res) {
  console.log(req.sessionID);
  console.log(req.session);
  console.log(req.user);
  return res.status(200).json({
    msg: "ok",
  })
});
app.use("*", renderer);
app.use(errorHandler);

const httpsServer = https.createServer({
  key: privKey,
  cert: cert,
  ca: ca,
}, app);

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
