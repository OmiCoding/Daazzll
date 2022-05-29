import fs from "fs";
import util from "util";
import jwt from "jsonwebtoken";
import { redisClient } from "../../storageInit";
// import { v4 as uuidv4 } from "uuid";
import { Payload } from "../../custom-types";

const readFile = util.promisify(fs.readFile);

export const genToken = async function (
  payload: Payload,
  path: string,
  exp: string,
  expRedis: number // seconds
): Promise<string | null> {
  

  const result = await redisClient.get(payload.tokenId);

  if (result) return null;

  const privateKey = await readFile(path, "binary");

  const token = jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: exp,
  });

  await redisClient.setEx(
    payload.tokenId,
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
  const result = await redisClient.get(payload.tokenId);

  if (result) throw new Error("Something has gone wrong...");

  const privateKey = await readFile(path, "binary");

  const token = jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: exp,
  });
  await redisClient.setEx(
    payload.tokenId,
    expRedis,
    JSON.stringify({ token: token })
  );

  return token;
};
