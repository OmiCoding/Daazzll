import { Router } from "express";
import {
  profileData,
  profile,
  createLink,
  uploadProfileImgs,
} from "../controllers";
import { checkAccToken, checkUser, tokenExist } from "../middleware/auth";

const router = Router();

router.get("/profileData", [tokenExist, checkAccToken, checkUser], profileData);

router.get("/profile/:username", profile);

router.post("/profile/upload", uploadProfileImgs);

router.post("/profile/link", [tokenExist, checkAccToken], createLink);

export default router;
