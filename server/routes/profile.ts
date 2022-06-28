import { Router } from "express";
import { profileData, profile } from "../controllers";
import { checkAccToken, checkUser, tokenExist } from "../middleware/auth";

const router = Router();

router.get(
  "/profile_data",
  [tokenExist, checkAccToken, checkUser],
  profileData
);

router.get("/profile/:username", profile);

export default router;
