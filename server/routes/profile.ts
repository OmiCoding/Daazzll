import { Router } from "express";
import { mediaLinks } from "../controllers";
import { checkAccToken, checkUser, tokenExist } from "../middleware/auth";

const router = Router();

router.get("/profile_data", [tokenExist, checkAccToken, checkUser], mediaLinks);

export default router;
