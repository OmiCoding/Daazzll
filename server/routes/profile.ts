import { Router } from "express";
import { createLink } from "../controllers/authController";
import {
  profile,
  profileData,
  uploadProfileImgs,
  postDesigns,
  getDesigns,
} from "../controllers/profileController";
import { checkAccToken, checkUser } from "../middleware/auth/authMidWare";

const router = Router();

router.get("/profileData", [checkAccToken, checkUser], profileData);

router.get("/designs", getDesigns);

router.post("/designs", postDesigns);

router.post("/upload", uploadProfileImgs);

router.post("/link", [checkAccToken], createLink);

router.get("/:username", profile);

export default router;
