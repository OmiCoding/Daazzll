
import { RequestHandler, Request, Response, NextFunction } from "express";
import { compare } from "bcrypt";

import prismaClient from "../prismaClient"

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