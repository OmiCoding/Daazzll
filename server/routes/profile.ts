import { Router } from "express";
import {
  profileData,
  uploadProfileImgs,
  postDesigns,
  getDesigns,
  getAvatarImg,
  getBannerImg,
  createLink,
  getUser,
  getLink,
} from "../controllers/profileController";
import { checkToken, checkUser } from "../middleware/auth/authMidWare";

const router = Router();

router.use(checkUser);
router.use(checkToken);
router.get("/profileData", profileData);

router.get("/designs", getDesigns);

router.get("/avatar", getAvatarImg);

router.get("/banner", getBannerImg);

router.post("/designs", postDesigns);

router.post("/upload", uploadProfileImgs);

router.post("/link", createLink);

router.get("/link", getLink);

router.get("/:username", getUser);

export default router;
