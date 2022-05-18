import { Router } from "express";

import {
  deleteUser,
  updateUser,
  register,
  login,
  logout,
  checkAuth,
} from "../controllers/authControllers";

import {
  checkDeleteUser,
  checkGuest,
  checkLogin,
  checkRegister,
  checkUpdateUser,
  checkUser,
  checkedLoggedIn,
  tokenExist,
} from "../middleware/auth/authChecks";

import {
  joiDeleteUser,
  joiLogin,
  joiRegister,
  joiUpdateUser,
} from "../middleware/auth/joiChecks";

import checkToken from "../middleware/auth/checkToken";

const router = Router();



// GET Requests

router.get("/logout", [checkGuest, checkUser, checkToken], logout);

router.get("/checkauth", [tokenExist, checkToken], checkAuth)

// POST Requests

router.post(
  "/register",
  [checkedLoggedIn, joiRegister, checkRegister],
  register
);
router.post(
  "/login",
  [checkedLoggedIn, joiLogin, checkLogin],
  login
);


router.post(
  "/update",
  [checkGuest, checkUser, checkToken, joiUpdateUser, checkUpdateUser],
  updateUser
);

router.post(
  "/delete",
  [checkGuest, checkUser, checkToken, joiDeleteUser, checkDeleteUser],
  deleteUser
);

export default router;
