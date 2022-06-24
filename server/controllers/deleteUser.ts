import { RequestHandler, Request, Response, NextFunction } from "express";
import { compare } from "bcrypt";
import prismaClient from "../prismaClient";

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
      msg: "Ok"
    })
  } catch (e) {
    console.log(e);
    return next(e);
  }
};
