import { Router } from "express";
import { createLink } from "../controllers/authController";
import {
  profile,
  profileData,
  uploadProfileImgs,
} from "../controllers/profileController";
import { checkAccToken, checkUser } from "../middleware/auth/authMidWare";

const router = Router();

router.get("/profileData", [checkAccToken, checkUser], profileData);

router.get("/:username", profile);

// router.post("/designs", [checkAccToken, checkUser]);

router.post("/upload", uploadProfileImgs);

router.post("/link", [checkAccToken], createLink);

export default router;
