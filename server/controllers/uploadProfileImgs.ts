import { NextFunction, Request, RequestHandler, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import busboy from "busboy";
import storeUploadData from "../utils/functions/storeUploadData";

const cloudName = cloudinary.config().cloud_name;

cloudinary.uploader.upload_stream;
export const uploadProfileImgs: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bb = busboy({ headers: req.headers });

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "demo",
      },
      async function (err, result) {
        if (err) {
          console.error(err);
        }

        if (result) {
          await storeUploadData(req, {
            model: req.query.uploadType,
            imageId: result.public_id,
            ext: result.format,
            type: result.resource_type,
            url: result.secure_url,
            folder: result.folder,
          });
        }

        return res.status(200).json({
          msg: "Ok.",
        });
      }
    );

    bb.on("file", (name, file, info) => {
      file.pipe(uploadStream);
    });

    bb.on("field", (name, val, info) => {
      console.log(`Field [${name}]: value: %j`, val);
    });

    bb.on("close", () => {
      console.log("Done parsing the form!");
      res.status(200).json({
        msg: "Ok.",
      });
    });

    req.pipe(bb);
  } catch (err) {
    next(err);
  }
};
