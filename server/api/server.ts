import path from "path";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import prismaClient from "./prismaClient";
import { renderer, errorHandler } from "./controllers";
import { config } from "dotenv";
// This needs to be added in productions
// import helmet from "helmet";

config();

let { API_SERVER_PORT } = process.env;

if (!API_SERVER_PORT) {
  API_SERVER_PORT = "8080";
}

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// include helmet
if (process.env.BUILD === "development" || process.env.BUILD === "test") {
  app.use(
    cors({
      origin: ["http://localhost:8433"],
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  );
} else {
  // When we go into production...
}
// app.use(helmet());

// This path needs to be fixed during production for docker container
const BUILD_PATH = path.resolve("build");

app.use("/static", express.static(BUILD_PATH));
app.use(errorHandler);
app.use("*", renderer);

const startServer = function () {
  try {
    app.listen(API_SERVER_PORT, async function () {
      await prismaClient.$connect();
      console.log(`Now listening on port ${API_SERVER_PORT}...`);
    });
  } catch (e: any) {
    console.error(e);
  }
};

export default startServer;
