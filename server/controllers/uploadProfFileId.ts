import { NextFunction, Request, RequestHandler, Response } from "express";

import prismaClient from "../prismaClient";

export const uploadProfFileId: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { uploadType } = req.query;
    const { image, ext, type } = req.body;
    if (uploadType === "profile") {
      await prismaClient.acc_profiles.upsert({
        where: {
          userId: req.user.userId,
        },
        update: {
          avatar: {
            upsert: {
              update: {
                image,
                ext,
              },
              create: {
                image,
                ext,
                type,
              },
            },
          },
        },
        create: {
          user: {
            connect: {
              email_username: {
                email: req.user.email,
                username: req.user.username,
              },
            },
          },
          avatar: {
            create: {
              image,
              ext,
              type,
            },
          },
        },
      });
    } else if (uploadType === "banner") {
      await prismaClient.acc_profiles.upsert({
        where: {
          userId: req.user.userId,
        },
        update: {
          banner: {
            upsert: {
              update: {
                image,
                ext,
              },
              create: {
                image,
                ext,
                type,
              },
            },
          },
        },
        create: {
          user: {
            connect: {
              email_username: {
                email: req.user.email,
                username: req.user.username,
              },
            },
          },
          banner: {
            create: {
              image,
              ext,
              type,
            },
          },
        },
      });
    } else {
      throw new Error("type does not match either string.");
    }

    return res.status(200).json({
      msg: "Ok.",
    });
  } catch (err) {
    return next(err);
  }
};
