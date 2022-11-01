import { v2 as cloudinary } from "cloudinary";
import authConfig from "./authConfig";
import "dotenv/config";

export const setupAvatarUrl = function(imageId: string, ext: string, version: number) {
  return cloudinary.url(`${imageId}.${ext}`, {
    ...authConfig,
    dpr: "auto",
    version: version ? "" + version: undefined,
  })
}

export const setupBannerUrl = function setupBannerUrl(imageId: string, ext: string, version: number) {
  return cloudinary.url(`${imageId}.${ext}`, {
    ...authConfig,
    dpr: "auto",
    height: 220,
    width: 1280,
    crop: "fit",
    version: version ? "" + version : undefined,
  })
}

export const setUpDesignUrl = function setUpDesignUrl(imageId: string, version: number) {
  return cloudinary.url(`${imageId}.gif`, {
    ...authConfig,
    dpr: "auto",
    width: "auto",
    version: version ? "" + version : undefined,
  })
}

export const setupDesignUrls = function setupDesignUrls(idArr: string[], version?: number) {
  return idArr.map((elem) => {
    return cloudinary.url(`${elem}.gif`, {
      ...authConfig,
      dpr: "auto",
      width: "auto",
      version: version ? "" + version : undefined,
    })
  })
}
