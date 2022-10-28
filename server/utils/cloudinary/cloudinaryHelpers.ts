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
