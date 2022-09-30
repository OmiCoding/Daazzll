import { createClient } from "redis";
import { config } from "dotenv";

config();

let { REDIS_PORT, REDIS_HOST } = process.env;

if (!REDIS_PORT) {
  REDIS_PORT = "6379";
}
if (!REDIS_HOST) {
  REDIS_HOST = "127.0.0.1";
}

const client = createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});

export default client;
