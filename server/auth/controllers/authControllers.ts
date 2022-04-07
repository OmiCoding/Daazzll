import { Request, Response, NextFunction, RequestHandler } from "express";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { compare, hash } from "bcrypt";
import { genToken } from "../utils/functions/auth";

const prismaClient = new PrismaClient();

export const deleteUser: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;

    const user = await prismaClient.user.findFirst({
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

    if (!user) {
      return res.status(400).json({
        msg: "Bad request.",
      });
    }

    const verifyPass = await compare(password, user.pass);

    if (!verifyPass) {
      return res.status(400).json({
        msg: "Bad request.",
      });
    }

    await prismaClient.user.delete({
      where: {
        id: user.id,
      },
    });

    res.clearCookie("access_token", {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
    });

    res.clearCookie("refresh_token", {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
    });

    req.user = undefined;

    return res.status(302).redirect("/");
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

export const login: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, email, password } = req.body;

    let propName: string;

    if (username) {
      propName = "username";
    } else {
      propName = "email";
    }

    const result: any = await prismaClient.user.findFirst({
      where: {
        [propName]: propName === "username" ? username : email,
      },
      select: {
        [propName]: true,
        pass: true,
      },
    });

    if (!result) {
      return res.status(400).json({
        msg: `No account found with that ${propName}`,
      });
    }

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
        userId: accessId,
        [propName]: propName === "username" ? username : email,
      },
      path.resolve("../keys/jwtRS256.key"),
      "10m",
      600
    );

    const refreshToken = await genToken(
      {
        role: "user",
        userId: refreshId,
        [propName]: propName === "username" ? username : email,
      },
      path.resolve("../keys/jwtRS256.key"),
      "30d",
      1800
    );

    res.cookie("access_token", JSON.stringify(accessToken), {
      path: "/",
      sameSite: "strict",
      httpOnly: true,
      expires: new Date(new Date().getTime() + 10 * 60000),
    });

    res.cookie("refresh_token", JSON.stringify(refreshToken), {
      path: "/",
      sameSite: "strict",
      httpOnly: true,
      expires: new Date(new Date().getTime() + 30 * 86400000),
    });

    if (username) {
      req.user = {
        role: "user",
        username,
        userId: refreshId,
      };
    } else {
      req.user = {
        role: "user",
        email,
        userId: refreshId,
      };
    }

    return res.status(301).redirect("http://localhost:8080/profile");
  } catch (e) {
    return next(e);
  }
};

export const logout: RequestHandler = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.cookies) {
      if (req.cookies.access_token) {
        res.clearCookie("access_token", {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
        });
      }
      if (req.cookies.refresh_token) {
        res.clearCookie("refresh_token", {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
        });
      }

      req.user = undefined;

      return res.status(302).redirect("/login");
    } else {
      req.user = undefined;
      return res.status(302).redirect("/login");
    }
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

    const foundAcc = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (foundAcc) {
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });
    }

    const hashedPass = await hash(password, 10);

    await prismaClient.user.create({
      data: {
        role: "user",
        fName,
        lName,
        username,
        email,
        pass: hashedPass,
      },
    });

    const accessToken = await genToken(
      {
        role: "user",
        userId: accessId,
        email: email,
      },
      path.resolve("../keys/jwtRS256.key"),
      "10m",
      600
    );

    const refreshToken = await genToken(
      {
        role: "user",
        userId: refreshId,
        email: email,
      },
      path.resolve("../keys/jwtRS256.key"),
      "30d",
      1800
    );

    if (!accessToken || !refreshToken)
      return res.status(400).json({ msg: "Bad request." });

    res.cookie("access_token", accessToken, {
      path: "/",
      sameSite: "strict",
      httpOnly: true,
      expires: new Date(new Date().getTime() + 10 * 60000),
    });
    res.cookie("refresh_token", refreshToken, {
      path: "/",
      sameSite: "strict",
      httpOnly: true,
      expires: new Date(new Date().getTime() + 30 * 86400000),
    });

    req.user = {
      role: "user",
      username,
      userId: accessId,
    };

    return res.status(302).redirect("http://localhost:8080/profile");
  } catch (e) {
    return next(e);
  }
};

export const setToken: RequestHandler = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    return res.status(200).json({
      msg: "ok",
    });
  } catch (e) {
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

    let updateObj: any = {};

    if (fName) {
      updateObj.fName = fName;
    }
    if (lName) {
      updateObj.lName = lName;
    }
    if (username) {
      updateObj.username = username;
    }

    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
      select: {
        email: true,
        username: true,
        pass: true,
      },
    });

    if (!user) {
      return res.status(400).json({
        msg: "Bad request.",
      });
    }

    const verifyPass = await compare(password, user.pass);

    if (!verifyPass) {
      return res.status(400).json({
        msg: "Bad request.",
      });
    }

    await prismaClient.user.update({
      where: {
        email_username: {
          email: user.email,
          username: user.username,
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
