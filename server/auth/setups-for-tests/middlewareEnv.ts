import { redisClient } from "../storageInit";

beforeAll(async () => {
  await redisClient.connect();
});

afterAll(async () => {
  await redisClient.disconnect();
});
