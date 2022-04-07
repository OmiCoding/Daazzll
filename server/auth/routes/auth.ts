import { Router } from "express";

import {
  deleteUser,
  updateUser,
  register,
  login,
  logout,
} from "../controllers/authControllers";

import {
  checkDeleteUser,
  checkGuest,
  checkLogin,
  checkRegister,
  checkUpdateUser,
  checkUser,
  checkedLoggedIn,
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

// POST Requests
router.post(
  "/register",
  [checkedLoggedIn, checkUser, checkToken, joiRegister, checkRegister],
  register
);
router.post(
  "/login",
  [checkedLoggedIn, checkUser, checkToken, joiLogin, checkLogin],
  login
);

router.get("/logout", [checkGuest, checkUser, checkToken], logout);

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
