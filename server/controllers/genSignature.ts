import e, { NextFunction, Request, RequestHandler, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { cloudFormProfile } from "../utils/cloudinary/cloudForms";
import upsertImages from "../utils/functions/upsertImages";

const cloudName = cloudinary.config().cloud_name;

export const genSignature: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { type } = req.query;
    const { timestamp, signature } = cloudFormProfile();
    if (type === "profile" || type === "banner") {
      await upsertImages(type, req);
    } else {
      throw new Error("type does not match either string.");
    }
  } catch (e) {
    return next(e);
  }
};
