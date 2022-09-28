import crypto from "crypto";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcrypt";

import prismaClient from "../prismaClient";
import { genToken, signedToken } from "../utils/functions/auth";
import { PRIV_KEY_PATH } from "../serverConfig";

export const register: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, email, fName, lName, password } = req.body;

    const accessId = uuidv4();
    const refreshId = uuidv4();

    const foundAcc = await prismaClient.accounts.findUnique({
      where: {
        email_username: {
          username: username,
          email: email,
        },
      },
    });

    if (foundAcc) {
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });
    }

    const hashedPass = await hash(password, 10);

    const result = await prismaClient.accounts.create({
      data: {
        role: "user",
        fName,
        lName,
        username,
        email,
        pass: hashedPass,
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    const accessToken = await genToken(
      {
        role: "user",
        tokenId: accessId,
        email: result.email,
        username: result.username,
      },
      PRIV_KEY_PATH,
      "10m",
      600
    );

    const refreshToken = await genToken(
      {
        role: "user",
        tokenId: refreshId,
        email: result.email,
        username: result.username,
      },
      PRIV_KEY_PATH,
      "30d",
      1800
    );

    const uid = crypto.randomBytes(24).toString("base64");

    await signedToken(
      {
        role: "user",
        userId: result.id,
        email: result.email,
        username: result.username,
      },
      uid,
      600
    );

    res.cookie("access_token", accessToken, {
      path: "/",
      secure: true,
      sameSite: "strict",
      maxAge: 10 * 60 * 1000, // 10min
    });
    res.cookie("refresh_token", refreshToken, {
      path: "/",
      secure: true,
      sameSite: "strict",
      maxAge: 30 * 60 * 1000, // 30min
    });

    res.cookie("sid", uid, {
      path: "/",
      sameSite: "strict",
      httpOnly: true,
      secure: true,
      signed: true,
      maxAge: 10 * 60 * 1000, // 10min
    });

    return res.status(200).json({ username: result.username });
  } catch (e) {
    return next(e);
  }
};
