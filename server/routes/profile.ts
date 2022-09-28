import { Router } from "express";
import {
  profileData,
  profile,
  createLink,
  uploadProfileImgs,
} from "../controllers";
import { checkAccToken, checkUser } from "../middleware/auth";

const router = Router();

router.get("/profileData", [checkAccToken, checkUser], profileData);

router.get("/profile/:username", profile);

router.post("/profile/upload", uploadProfileImgs);

router.post("/profile/link", [checkAccToken], createLink);

export default router;
