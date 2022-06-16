import { Router } from "express"
import { mediaLinks } from "../controllers";
import { checkAccToken }  from "../middleware/auth"

const router = Router();

router.get("/medialinks", [checkAccToken], mediaLinks)

export default router;