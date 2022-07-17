import { v2 as cloudinary } from "cloudinary";
import cloudConfig from "./config";
const apiSecret = cloudConfig.api_secret!;

export const cloudFormProfile = function () {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      eager: "c_scale,w_180,h_180|ar_1.1",
      folder: "profile",
    },
    apiSecret
  );

  return { timestamp, signature };
};

export const cloudFormBanner = function () {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
      eager: "",
      folder: "banner",
    },
    apiSecret
  );

  return signature;
};
