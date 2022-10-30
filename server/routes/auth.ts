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
  checkToken2,
} from "../middleware/auth/authMidWare";

import {
  joiDeleteUser,
  joiLogin,
  joiRegister,
  joiUpdateUser,
} from "../middleware/auth/joiMidWare";

const router = Router();

// GET Requests

router.get("/checkauth", [checkToken2], checkAuth);

router.get("/checkGuest", checkGuest);

router.get("/passGuest", passGuest);

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
