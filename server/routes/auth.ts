import { Router } from "express";

import {
  deleteUser,
  updateUser,
  register,
  login,
  checkAuth,
  logout,
} from "../controllers";

import {
  checkDeleteUser,
  checkGuest,
  checkLogin,
  checkRegister,
  checkUpdateUser,
  checkUser,
  checkedLoggedIn,
  // checkToken,
  checkToken2,
} from "../middleware/auth";

import {
  joiDeleteUser,
  joiLogin,
  joiRegister,
  joiUpdateUser,
} from "../middleware/auth";

const router = Router();

// GET Requests

router.get("/checkauth", [checkToken2], checkAuth);

router.get("/checkGuest", checkGuest);

router.get("/logout", logout);

// POST Requests

router.post(
  "/register",
  [checkedLoggedIn, joiRegister, checkRegister],
  register
);
router.post("/login", [checkedLoggedIn, joiLogin, checkLogin], login);

router.post(
  "/update",
  [checkGuest, checkUser, checkToken2, joiUpdateUser, checkUpdateUser],
  updateUser
);

router.post(
  "/delete",
  [checkGuest, checkUser, checkToken2, joiDeleteUser, checkDeleteUser],
  deleteUser
);

export default router;
