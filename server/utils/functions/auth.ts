import fs from "fs";
import util from "util";
import jwt from "jsonwebtoken";
import { redisClient } from "../../storageInit";
import { Payload, UserProp } from "../../custom-types";

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
  const result = await redisClient.GET(payload.tokenId);

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

export const signedToken = async function (
  payload: UserProp,
  uid: string,
  expRedis: number
): Promise<void> {
  try {
    await redisClient.setEx(uid, expRedis, JSON.stringify(payload));
    return;
  } catch (e) {
    throw e;
  }
};

// export const userRedisSetup = async function(
//   payload: ReqUser,
//   path: string,
//   exp: string,
//   expRedis: number
// ): Promise<string> {
//   const

//   const result = await redisClient.GET()

// }
