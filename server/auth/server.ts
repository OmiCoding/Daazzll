import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dbClient from "./prismaClient";
import { createClient } from "redis";
import auth from "./routes/auth";
import errorHandler from "./controllers/errorHandler";
import { config } from "dotenv";

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

config();

let { AUTH_SERVER_PORT, REDIS_PORT, REDIS_HOST } = process.env;

if (!AUTH_SERVER_PORT) {
  AUTH_SERVER_PORT = "8433";
}

if (!REDIS_PORT) {
  REDIS_PORT = "6379";
}

const redisClient = createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// include helmet
if (process.env.BUILD === "development") {
  app.use(
    cors({
      origin: ["http://localhost:8080"],
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );
} else {
  // when we go into production...
}

app.use(cookieParser());
app.use(auth);
app.use("*", errorHandler);

export const authServer = function () {
  redisClient.on("connect", function () {
    console.log(`Redis server listening on port ${REDIS_PORT}...`);
  });
  redisClient.on("error", function (err: any) {
    if (err) throw err;
  });
  app.listen(AUTH_SERVER_PORT, async function () {
    await dbClient.$connect();
    await redisClient.connect();
    console.log(`Now listening on port ${AUTH_SERVER_PORT}...`);
  });
};
