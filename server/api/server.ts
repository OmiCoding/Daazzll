import fs from "fs"
import https from "https"
import path from "path";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import prismaClient from "./prismaClient";
import { renderer, errorHandler } from "./controllers";
import "dotenv/config";
// This needs to be added in production
// import helmet from "helmet";

let { API_SERVER_PORT } = process.env;

if (!API_SERVER_PORT) {
  API_SERVER_PORT = "8080";
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
    origin: ["https://daazzll.local:8080", "https://daazzll.local:8433"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }))

} else {
  // When we go into production...
}
// app.use(helmet());

// This path needs to be fixed during production for docker container
const BUILD_PATH = path.resolve("build");

app.use(cookieParser())
app.use("/static", express.static(BUILD_PATH));
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
