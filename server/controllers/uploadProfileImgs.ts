import { NextFunction, Request, RequestHandler, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import busboy from "busboy";

// import { cloudFormProfile } from "../utils/cloudinary/cloudForms";

const cloudName = cloudinary.config().cloud_name;

cloudinary.uploader.upload_stream;
export const uploadProfileImgs: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bb = busboy({ headers: req.headers });

    // const uploadStream = cloudinary.uploader.upload_stream(
    //   {
    //     folder: "demo",
    //   },
    //   function (err, result) {
    //     if (err) {
    //       console.error(err);
    //     }

    //     if (result) {

    //     }
    //   }
    // );

    bb.on("file", (name, file, info) => {
      // This will only be called when a file Object appears?
      // file.
      // const { filename, encoding, mimeType } = info;
      // console.log(
      //   `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
      //   filename,
      //   encoding,
      //   mimeType
      // );
      // file.pipe(uploadStream);
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
