import { RequestHandler, Request, Response, NextFunction } from "express";
import prismaClient from "../prismaClient";

export const profile: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username } = req.params;

    console.log(username);

    const data = await prismaClient.accounts.findFirst({
      where: {
        username: username,
      },
      select: {
        username: true,
        profile: {
          select: {
            website: true,
            facebook: true,
            discord: true,
            instagram: true,
            twitter: true,
          },
        },
      },
    });

    return res.status(200).json({
      ...data,
      profile: {
        ...data?.profile,
      },
    });
  } catch (e: any) {
    return next(e);
  }
};

export default profile;
