import { RequestHandler } from "express";
import prismaClient from "../prismaClient";

export const createLink: RequestHandler = async function (req, res, next) {
  try {
    const { name, link } = req.body;

    const result = await prismaClient.accounts.update({
      where: {
        email_username: {
          email: "",
          username: "",
        },
      },
      data: {
        profile: {
          [name]: link,
        },
      },
    });

    console.log(result);

    return res.status(200).json({
      msg: "Link has been added to account!",
      name,
      link,
    });
  } catch (e: any) {
    return next(e);
  }
};
