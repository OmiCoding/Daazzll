import { Router } from "express";

import {
  deleteUser,
  updateUser,
  register,
  login,
  logout,
  checkAuth,
} from "../controllers";

import {
  checkDeleteUser,
  checkGuest,
  checkLogin,
  checkRegister,
  checkUpdateUser,
  checkUser,
  checkedLoggedIn,
  tokenExist,
  checkToken
} from "../middleware/auth";

import {
  joiDeleteUser,
  joiLogin,
  joiRegister,
  joiUpdateUser,
} from "../middleware/auth";

const router = Router();

// GET Requests

router.get("/logout", [checkGuest, checkUser, checkToken], logout);

// router.get("/checkauth", [tokenExist, checkToken], checkAuth)

// // POST Requests

// router.post(
//   "/register",
//   [checkedLoggedIn, joiRegister, checkRegister],
//   register
// );
// router.post(
//   "/login",
//   [checkedLoggedIn, joiLogin, checkLogin],
//   login
// );


// router.post(
//   "/update",
//   [checkGuest, checkUser, checkToken, joiUpdateUser, checkUpdateUser],
//   updateUser
// );

// router.post(
//   "/delete",
//   [checkGuest, checkUser, checkToken, joiDeleteUser, checkDeleteUser],
//   deleteUser
// );

export default router;
