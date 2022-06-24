import { Router } from "express";
import { mediaLinks } from "../controllers";
import { checkAccToken, checkUser, tokenExist } from "../middleware/auth";

const router = Router();

router.get("/medialinks", [tokenExist, checkAccToken, checkUser], mediaLinks);

export default router;
