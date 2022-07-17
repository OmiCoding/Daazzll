import { NextFunction, Request, RequestHandler, Response } from "express";
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
    const { type } = req.params;
    const { timestamp, signature } = cloudFormProfile();
    await upsertImages(type, req);

    return res.status(200).json({
      cloudName,
      timestamp,
      signature,
    });
  } catch (e) {
    return next(e);
  }
};
