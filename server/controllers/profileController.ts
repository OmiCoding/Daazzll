import { RequestHandler, Request, Response, NextFunction } from "express";
import { v2 as cloudinary } from "cloudinary";
import busboy from "busboy";

import { storeUploadData } from "../utils/helpers/profileHelpers";
import prismaClient from "../prismaClient";
import storeDesign from "../utils/helpers/storeDesign";
import getDesignData from "../utils/helpers/getDesignData";
// import fetchDesigns from "../utils/cloudinary/fetchDesigns";
import { DesignData } from "../custom-types"
import cloudinaryDesignSetup from "../utils/cloudinary/fetchDesigns";


interface DesignDataRes {
  data: DesignData[]; 
  cursor: number | null; 
  version: number | undefined;
}

export const profile: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username } = req.params;

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

export const profileData: RequestHandler = async function (
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
        username: true,
        profile: {
          select: {
            website: true,
            discord: true,
            instagram: true,
            twitter: true,
          },
        },
      },
    });

    return res.status(200).json({
      username: result?.username,
      user: true,
    });
  } catch (e) {
    return next(e);
  }
};

export const uploadProfileImgs: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bb = busboy({ headers: req.headers });

    let folder = "";
    if (req.query.uploadType === "banners") {
      folder = req.query.uploadType;
    } else if (req.query.uploadType === "avatars") {
    } else {
      throw new Error("A folder must be specified.");
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
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
      }
    );

    bb.on("file", (name, file, info) => {
      file.pipe(uploadStream);
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

export const getDesigns: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
  if (!req.params) {
    throw new Error("Invalid parameters");
  }
  let dbData: DesignDataRes;
  const { cursor } = req.params;

  const parsedCursor = parseInt(cursor);

  if (parsedCursor === 0) {
    dbData = await getDesignData(req.user.userId);
  } else {
    dbData = await getDesignData(req.user.userId, parsedCursor); 
  }

  const idArr: string[] = [];
  
  for (let i=0; i < dbData.data.length; i++) {
    idArr.push(dbData.data[i].imageId);
  }

  const imgs = await cloudinaryDesignSetup(idArr, dbData.version);

  return res.status(200).json({
   imgs: imgs,
   cursor: dbData.cursor,
   msg: "Ok"
  })
  } catch(e) {
    return next(e);
  }
};

export const postDesigns: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const bb = busboy({ headers: req.headers });

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "designs",
      },
      async function (err, result) {
        if (err) {
          console.error(err);
        }
        if (result) {
          await storeDesign(req, {
            imageId: result.public_id,
            ext: result.format,
            type: result.resource_type,
            url: result.secure_url,
            folder: result.folder,
            version: result.version,
          });
        }
      }
    );

    bb.on("file", (name, file, info) => {
      file.pipe(uploadStream);
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
