import sessions from "express-session";
import connectRedis from "connect-redis";
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

export const redisClient = createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});

const RedisStore = connectRedis(sessions);

console.log(REDIS_HOST, REDIS_PORT);

export const redisStore = new RedisStore({
  client: redisClient,
  prefix: "sess1:",
});
