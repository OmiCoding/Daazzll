import fs from "fs";
import util from "util";
import jwt from "jsonwebtoken";
import { redisClient } from "../../storageInit";
// import { v4 as uuidv4 } from "uuid";
<<<<<<< HEAD
import { Payload } from "../../custom-types";
=======
import { Payload, ReqUser, UserProp } from "../../custom-types";
>>>>>>> main

const readFile = util.promisify(fs.readFile);

export const genToken = async function (
  payload: Payload,
  path: string,
  exp: string,
  expRedis: number // seconds
): Promise<string | null> {
<<<<<<< HEAD
  

=======
>>>>>>> main
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
<<<<<<< HEAD
  const result = await redisClient.get(payload.tokenId);
=======
  const result = await redisClient.GET(payload.tokenId);
>>>>>>> main

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
<<<<<<< HEAD
=======

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
>>>>>>> main
