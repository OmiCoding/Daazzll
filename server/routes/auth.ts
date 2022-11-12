import { Router } from "express";

import {
  register,
  login,
  checkAuth,
  logout,
  deleteUser,
  updateUser,
  passGuest,
} from "../controllers/authController";

import {
  checkDeleteUser,
  checkGuest,
  checkLogin,
  checkRegister,
  checkUpdateUser,
  checkUser,
  checkedLoggedIn,
  checkToken,
} from "../middleware/auth/authMidWare";

import {
  joiDeleteUser,
  joiLogin,
  joiRegister,
  joiUpdateUser,
} from "../middleware/auth/joiMidWare";

const router = Router();

// GET Requests

router.get("/checkauth", [checkUser, checkToken], checkAuth);

router.get("/checkGuest", [checkGuest], passGuest);

// POST Requests

router.post(
  "/register",
  [checkedLoggedIn, joiRegister, checkRegister],
  register
);
router.post("/login", [checkedLoggedIn, joiLogin, checkLogin], login);

router.post(
  "/update",
  [checkUser, checkToken, joiUpdateUser, checkUpdateUser],
  updateUser
);

router.post(
  "/delete",
  [checkUser, checkToken, joiDeleteUser, checkDeleteUser],
  deleteUser
);

router.post("/logout", logout);

export default router;
