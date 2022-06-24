import { PrismaClient } from "@prisma/client";
import { RequestHandler, Request, Response, NextFunction } from "express";

const prismaClient = new PrismaClient();

export const mediaLinks: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) {
      return res.status(400).json({
        msg: "Bad request.",
      });
    }

    const { username, email } = req.user;

    if (!email || !username) {
      return res.status(400).json({
        msg: "Bad request.",
      });
    }

    const result = await prismaClient.accounts.findUnique({
      where: {
        email_username: {
          email: email,
          username: username,
        },
      },
      select: {
        profile: {
          select: {
            website: true,
            discord: true,
            instagram: true,
            twitter: true,
            user: true,
          },
        },
      },
    });

    return res.status(200).json({
      msg: "Ok.",
    });
  } catch (e) {
    return next(e);
  }
};
