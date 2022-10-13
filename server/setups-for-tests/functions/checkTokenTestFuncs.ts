import crypto from "crypto";
import { RequestHandler } from "express";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { promisify } from "util";
import { readFile } from "fs";
import prismaClient from "../../prismaClient";
import { redisClient } from "../../storageInit";
import { genToken } from "../../utils/helpers/auth";
import jwt from "jsonwebtoken";
import "dotenv/config";

const fileRead = promisify(readFile);
const filePath = path.resolve("server/auth/keys/jwtRS256.key");
const filePath2 = path.resolve("server/auth/keys/jwtRS256.key.pub");

export const falseTokens: RequestHandler = function (req, res, next) {
  req.cookies.access_token =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciIsInRva2VuSWQiOiJlZmVhYmY2NC0wNWZlLTQzM2YtOTZkNS0yMGVkNTIwOTg1YjIiLCJlbWFpbCI6ImpvaG5kb2VAZ21haWwuY29tIiwidXNlcm5hbWUiOiJqb2huZG9lMTIzIiwiaWF0IjoxNjU0MjgyODMyLCJleHAiOjE2NTQyODMxMzJ9.epdfowBo44hsF1RUqDZWNhBL7ev4FM1n0Yr-TpHEoroCmyl973G7A71ADdI0Wq7ZVRTYYv_xU5TqrPIvdgUHduV420zJa6RaWU1vtCrRD4fCoFLqkdd6tWBE3KzK2qtwtUmehhgN0PM1_SUCF8uXmP1HgVexGLkLFCC68LEjQln8gR-DIKhWulgJS2MPeNBgGe6p8DxbOPe0uVcK0wp3juAiRexLlx4pYNS9rQMJ4aFYaV-i6aCdnRWfhQdODlV2yA_49js06e5gjqlsp-KN3lwjAvYhbHffOHHeDdm4WabQHLlJL2-it3eA8oTAnnryHk-qlP7nDeuM4-oqSXhIww";
  req.cookies.refresh_token =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoidXNlciIsInRva2VuSWQiOiI3ZTQ0OWNjNS0wYWVhLTQwNTYtOTg1YS0yY2MzNTBiYmQ0OGEiLCJlbWFpbCI6ImpvaG5kb2VAZ21haWwuY29tIiwidXNlcm5hbWUiOiJqb2huZG9lMTIzIiwiaWF0IjoxNjU0MjgyODMyLCJleHAiOjE2NTQyODMxMzJ9.Qaf66XLw0v4q9g7DHKvOszclNXSwLPqmW9K8fu0Igfk5Ge-fFQHS6WcH9TtIPoJ7WMkolVGd8xXfBpFiImPkdt-mD6kqOOjOWXi5R9K7YTlRW5F6TVEIyW8mk43XU98iQk5a7qoqLBi2k24KT_dglxmmGrNsiwRVWmawrxjjAr3dhGCVhfdDIKoAfLWK-sChKJnvwb8szUrNJ2FTQQNj3x-obc4ijVuTLXoYLSjD_NuntKe1pdd7IDvdDoGC7IJpy_7oI67YZLPfHOQhjRwxyK1maPA16m-IWN3qfsEZJl8dMnr9n5h3PvHRVcHSms9vmAx6npvWtYuyrrRd9LuCVg";
  return next();
};

export const userPayload = async function (email: string, pass: string) {
  const result = await prismaClient.accounts.findFirst({
    where: {
      email: email,
    },
    select: {
      id: true,
      email: true,
      username: true,
    },
  });

  return {
    role: "user",
    id: result?.id,
    email: result?.email,
    username: result?.username,
  };
};

export const setTokens = async function (email: string, pass: string) {
  const result: any = await userPayload(email, pass);

  const accessId = uuidv4();
  const refreshId = uuidv4();

  const privKey = filePath;

  const accessToken = await genToken(
    {
      role: "user",
      tokenId: accessId,
      email: result.email,
      username: result.username,
    },
    privKey,
    "2m",
    120
  );

  const refreshToken = await genToken(
    {
      role: "user",
      tokenId: refreshId,
      email: result.email,
      username: result.username,
    },
    privKey,
    "2m",
    120
  );

  console.log(accessToken);
  console.log(refreshToken);

  return {
    accessToken,
    refreshToken,
    accessId,
    refreshId,
  };
};

export const checkSession: RequestHandler = async function (req, res, next) {
  console.log(req.cookies);
  console.log(req.session);

  console.log(req.body.access_id);
  const redisData = await redisClient.get(req.body.access_id);
  return res.send("Ok.");
};

export const setSessions: RequestHandler = async function (req, res, next) {
  req.session.name = "sess1";
  return res.send("Ok.");
};

export const checkTok: RequestHandler = async function (req, res, next) {
  const pubKey = await fileRead(filePath2, { encoding: "binary" });
  //@ts-ignore
  const tokenId = jwt.verify(accessToken, pubKey, { algorithms: ["RS256"] });

  //@ts-ignore
  const redisData = await redisClient.get(tokenId);

  console.log(redisData);
  return res.send("Ok");
};

export const handleCookies: RequestHandler = async function (req, res, next) {
  //@ts-ignore
  const { accessToken, refreshToken } = await setTokens(
    "johndoe@gmail.com",
    "Johndoe123!"
  );
  console.log(accessToken, refreshToken);
  req.cookies.access_token = accessToken;
  req.cookies.refresh_token = refreshToken;

  console.log(req.cookies);
  return next();
};

export const setupUserProp: RequestHandler = async function (req, res, next) {
  if (!req.cookies.sid) {
    res.cookie("sid", process.env.USER_SECRET, {
      path: "/",
      sameSite: "strict",
      httpOnly: true,
      secure: false,
      expires: new Date(new Date().getTime() + 1 * 60000),
    });
  }

  return next();
};

export const testLogin: RequestHandler = async function (req, res) {
  const userData = await userPayload("johndoe@gmail.com", "Johndoe123!");

  const privKey = await fileRead(filePath, { encoding: "binary" });

  const token = jwt.sign(
    {
      p: "mysecret",
    },
    privKey,
    {
      algorithm: "RS256",
      expiresIn: "1m",
    }
  );

  const uid = crypto.randomBytes(24).toString("base64");

  res.cookie("sid", uid, {
    path: "/",
    signed: true,
    httpOnly: true,
  });

  const data = await redisClient.setEx(uid, 120, JSON.stringify(userData));

  return res.json({
    token: token,
    uid: uid,
    data: data,
  });
};

export const seeCookies: RequestHandler = async function (req, res, next) {
  // console.log(req);
  const signedCookies = req.signedCookies;

  const data = await redisClient.get(signedCookies.sid);
  console.log(await redisClient.del(signedCookies.sid));
  return res.json({
    signedCookie: signedCookies,
    redisData: data,
  });
};
