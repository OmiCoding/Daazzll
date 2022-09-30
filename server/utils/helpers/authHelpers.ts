import fs from "fs";
import util from "util";
import jwt from "jsonwebtoken";
import { Payload, UserProp, ReqUser } from "../../custom-types";
import { redisClient } from "../../storageInit";
import { RedisStore } from "connect-redis";

const readFile = util.promisify(fs.readFile);

export const genToken = async function (
  payload: Payload,
  path: string,
  exp: string,
  expRedis: number
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

export const handleJWT = function (
  token: string,
  pubKey: string
): Promise<string | jwt.JwtPayload | null> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, pubKey, function (err, decoded: any) {
      if (err) return reject(err);
      if (!decoded) return resolve(null);
      if (!decoded.tokenId) return resolve(null);

      return resolve(decoded);
    });
  });
};

export const handleSession = function (
  method: string,
  store: RedisStore,
  payload?: ReqUser
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (!store) throw new Error("Store is not defined...");
    if (!store.all) throw new Error("The all method does not exist...");
    store.all(function (e: any, sessions: any) {
      if (e) {
        console.error(e);
        throw new Error("Something has gone wrong...");
      }
      console.log(sessions);
      if (!sessions) return resolve(false);
      let session;
      for (let i = 0; i < sessions.length; i++) {
        if (sessions[i].name === "sess1") {
          session = sessions[i];
          break;
        }
      }

      console.log(session);
      if (!session) return resolve(false);
      if (method === "ADD" || method === "UPDATE") {
        session.user = { ...payload };
        store.set(session.id, session, function (e) {
          if (e) {
            console.error(e);
            throw new Error("Something has gone wrong...");
          }
          return resolve(true);
        });
      } else if (method === "DELETE") {
        store.destroy(session.id, function (e) {
          if (e) {
            console.error(e);
            throw new Error("Something has gone wrong...");
          }
          return resolve(true);
        });
      } else {
        return resolve(false);
      }
    });
  });
};
