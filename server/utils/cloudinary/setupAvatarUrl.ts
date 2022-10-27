import { v2 as cloudinary } from "cloudinary";
import authConfig from "./authConfig";
import "dotenv/config";

function setupAvatarUrl(imageId: string, ext: string, version: number) {
  return cloudinary.url(`${imageId}.${ext}`, {
    ...authConfig,
    dpr: "auto",
    version: version ? "" + version: undefined,
  })
}

export default setupAvatarUrl;