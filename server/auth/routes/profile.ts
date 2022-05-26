import { Router } from "express"
import mediaLinks from "../controllers/mediaLinks";
import { checkAccToken }  from "../middleware/auth"

const router = Router();

router.get("/medialinks", [checkAccToken], mediaLinks)

export default router;