import { v2 as cloudinary } from "cloudinary";
import authConfig from "./authConfig";
import "dotenv/config";

const cloudConfig = cloudinary.config(authConfig);

export default cloudConfig;
