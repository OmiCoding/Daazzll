import crypto from "crypto";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { compare, hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import { genToken, signedToken } from "../utils/helpers/authHelpers";
import prismaClient from "../prismaClient";
import { PRIV_KEY_PATH } from "../serverConfig";

export const login: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email_user, password } = req.body;
    let propName: string;

    if (/[@\.]/.test(email_user)) {
      propName = "email";
    } else {
      propName = "username";
    }

    const result: any = await prismaClient.accounts.findFirst({
      where: {
        [propName]: email_user,
      },
      select: {
        id: true,
        email: true,
        username: true,
        pass: true,
      },
    });

    if (!result) {
      return res.status(400).json({
        msg: `No account found with that ${propName}`,
      });
    }

    const { id, username, email } = result;

    const verify = await compare(password, result.pass);

    if (!verify) {
      return res.status(400).json({
        msg: "Invalid password.",
      });
    }

    const accessId = uuidv4();
    const refreshId = uuidv4();

    const accessToken = await genToken(
      {
        role: "user",
        tokenId: accessId,
        email: result.email,
        username: result.username,
      },
      PRIV_KEY_PATH,
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
      PRIV_KEY_PATH,
      "5m",
      300
    );

    const uid = crypto.randomBytes(24).toString("base64");

    await signedToken(
      {
        role: "user",
        userId: id,
        email: email,
        username: username,
      },
      uid,
      120
    );

    res.cookie("access_token", accessToken, {
      path: "/",
      secure: true,
      sameSite: "strict",
      maxAge: 2 * 60 * 1000, // 10min
    });

    res.cookie("refresh_token", refreshToken, {
      path: "/",
      secure: true,
      sameSite: "strict",
      maxAge: 5 * 60 * 1000, // 30min
    });

    res.cookie("sid", uid, {
      path: "/",
      sameSite: "strict",
      httpOnly: true,
      secure: true,
      signed: true,
      maxAge: 2 * 60 * 1000, // 10min
    });

    return res.status(200).json({ username });
  } catch (e) {
    return next(e);
  }
};

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

    console.log("all good!");
    return res.status(200).json({ 
      username: result.username 
    });
  } catch (e) {
    return next(e);
  }
};

export const logout: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.clearCookie("access_token", {
      path: "/",
      secure: true,
      sameSite: "strict",
    });

    res.clearCookie("refresh_token", {
      path: "/",
      secure: true,
      sameSite: "strict",
    });

    res.clearCookie("sid", {
      path: "/",
      sameSite: "strict",
      httpOnly: true,
      secure: true,
      signed: true,
    });

    req.user = undefined;

    return res.status(200).json({
      msg: "Ok",
    });
  } catch (e) {
    return next(e);
  }
};

export const logout2: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.clearCookie("access_token", {
      path: "/",
      sameSite: "strict",
      secure: true,
    });

    res.clearCookie("refresh_token", {
      path: "/",
      sameSite: "strict",
      secure: true,
    });

    res.clearCookie("sid", {
      path: "/",
      sameSite: "strict",
      httpOnly: true,
      secure: true,
      signed: true,
    });

    req.user = undefined;

    return res.status(200).json({
      msg: "Safe to logout.",
    });
  } catch (e) {
    return next(e);
  }
};

export const checkAuth: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    return res.status(200).json({ msg: "Ok", clear: true });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const passGuest = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.user) {
      return res.status(403).json({
        clear: false,
      });
    }

    if (req.cookies) {
      return res.status(403).json({
        clear: false,
      });
    }

    console.log("hello??")
    return res.status(200).json({
      clear: true,
    });
  } catch (e) {
    return next();
  }
};

export const deleteUser: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;

    const acc = await prismaClient.accounts.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        username: true,
        pass: true,
      },
    });

    if (!acc) {
      return res.status(400).json({
        msg: "Bad request.",
      });
    }

    const verifyPass = await compare(password, acc.pass);

    if (!verifyPass) {
      return res.status(400).json({
        msg: "Bad request.",
      });
    }

    await prismaClient.accounts.delete({
      where: {
        id: acc.id,
      },
    });

    res.clearCookie("access_token", {
      path: "/",
      sameSite: "strict",
      secure: true,
    });

    res.clearCookie("refresh_token", {
      path: "/",
      sameSite: "strict",
      secure: true,
    });

    req.user = undefined;

    return res.status(200).json({
      msg: "Ok",
    });
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

export const updateUser: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { fName, lName, username, email, password } = req.body;

    const updateObj: any = {};

    if (fName) {
      updateObj.fName = fName;
    }
    if (lName) {
      updateObj.lName = lName;
    }
    if (username) {
      updateObj.username = username;
    }

    const acc = await prismaClient.accounts.findFirst({
      where: {
        email: email,
      },
      select: {
        email: true,
        username: true,
        pass: true,
      },
    });

    if (!acc) {
      return res.status(400).json({
        msg: "Bad request.",
      });
    }

    const verifyPass = await compare(password, acc.pass);

    if (!verifyPass) {
      return res.status(400).json({
        msg: "Bad request.",
      });
    }

    await prismaClient.accounts.update({
      where: {
        email_username: {
          email: acc.email,
          username: acc.username,
        },
      },
      data: {
        ...updateObj,
      },
    });

    return res.status(200).json({
      msg: "User successfully updated.",
    });
  } catch (e) {
    console.log(e);
    return next(e);
  }
};
