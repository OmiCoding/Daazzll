import fs from "fs";
import util from "util";
import jwt from "jsonwebtoken";
import redisClient from "../../cacheServer";
// import { v4 as uuidv4 } from "uuid";

const readFile = util.promisify(fs.readFile);

interface Payload {
  role: string;
  userId: string;
  email?: string;
  username?: string;
}

export const genToken = async function (
  payload: Payload,
  path: string,
  exp: string,
  expRedis: number // seconds
): Promise<string | null> {
  

  const result = await redisClient.get(payload.userId);

  if (result) return null;

  const privateKey = await readFile(path, "binary");

  const token = jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: exp,
  });

  await redisClient.setEx(
    payload.userId,
    expRedis,
    JSON.stringify({ token: token })
  );

  return token;
};

export const regenToken = async function (
  payload: Payload,
  path: string,
  exp: string,
  expRedis: number
): Promise<string> {
  const result = await redisClient.get(payload.userId);

  if (result) throw new Error("Something has gone wrong...");

  const privateKey = await readFile(path, "binary");

  const token = jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: exp,
  });
  await redisClient.setEx(
    payload.userId,
    expRedis,
    JSON.stringify({ token: token })
  );

  return token;
};
