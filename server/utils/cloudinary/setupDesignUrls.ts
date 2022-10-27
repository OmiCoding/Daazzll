import { v2 as cloudinary } from "cloudinary";
import authConfig from "./authConfig";
import "dotenv/config";

function setupDesignUrls(idArr: string[], version?: number) {
  return idArr.map((elem) => {
    return cloudinary.url(`${elem}.gif`, {
      ...authConfig,
      dpr: "auto",
      width: "auto",
      version: version ? "" + version : undefined,
    })
  })
}

export default setupDesignUrls;