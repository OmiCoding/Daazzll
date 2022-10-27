import { Router } from "express";
import { createLink } from "../controllers/authController";
import {
  profile,
  profileData,
  uploadProfileImgs,
  postDesigns,
  getDesigns,
  getAvatarImg,
  getBannerImg,
} from "../controllers/profileController";
import { checkAccToken, checkUser } from "../middleware/auth/authMidWare";

const router = Router();

router.get("/profileData", [checkAccToken, checkUser], profileData);

router.get("/designs", getDesigns);

router.get("/avatar", getAvatarImg);

router.get("/banner", getBannerImg);

router.post("/designs", postDesigns);

router.post("/upload", uploadProfileImgs);

router.post("/link", [checkAccToken], createLink);

router.get("/:username", profile);

export default router;
