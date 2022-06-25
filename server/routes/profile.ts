import { Router } from "express";
import { profileData } from "../controllers";
import { checkAccToken, checkUser, tokenExist } from "../middleware/auth";

const router = Router();

router.get(
  "/profile_data",
  [tokenExist, checkAccToken, checkUser],
  profileData
);

export default router;
