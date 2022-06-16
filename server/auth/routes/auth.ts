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

router.get("/checkToken", [checkToken2], function (req: any, res: any) {
  return res.send("Ok");
});

// router.get("/logout", [checkGuest, checkUser, checkToken2], logout);

router.get("/checkauth", [tokenExist, checkToken2], checkAuth);

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
