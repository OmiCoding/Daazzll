import { v2 as cloudinary } from "cloudinary";
import authConfig from "./authConfig";
import "dotenv/config";

async function cloudinaryDesignSetup(idArr: string[], version?: number) {
  const imgArr: string[] = [];

  for (let i=0; i < idArr.length; i++) {
    imgArr.push(cloudinary.url(`${idArr[i]}.gif`, {
      ...authConfig,
      dpr: "auto",
      width: "auto",
      version: version ? "" + version : undefined,
    }))
  }

  return imgArr;
}

export default cloudinaryDesignSetup;