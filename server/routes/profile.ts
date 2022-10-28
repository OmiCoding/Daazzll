import { Router } from "express";
import {
  profile,
  profileData,
  uploadProfileImgs,
  postDesigns,
  getDesigns,
  getAvatarImg,
  getBannerImg,
  createLink,
} from "../controllers/profileController";
import { checkAccToken, checkUser } from "../middleware/auth/authMidWare";

const router = Router();

router.get("/profileData", [checkAccToken, checkUser], profileData);

router.get("/designs", getDesigns);

router.get("/avatar", getAvatarImg);

router.get("/banner", getBannerImg);

router.post("/designs", postDesigns);

router.post("/upload", uploadProfileImgs);

router.post("/link", createLink);

router.get("/:username", profile);

export default router;
