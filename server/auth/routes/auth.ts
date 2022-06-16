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
  checkToken,
<<<<<<< HEAD
  checkToken2
=======
  checkToken2,
>>>>>>> main
} from "../middleware/auth";

import {
  joiDeleteUser,
  joiLogin,
  joiRegister,
  joiUpdateUser,
} from "../middleware/auth";

const router = Router();

// GET Requests

<<<<<<< HEAD
router.get("/logout", [checkGuest, checkUser, checkToken2], logout);

router.get("/checkauth", [tokenExist, checkToken], checkAuth)
=======
router.get("/checkToken", [checkToken2], function (req: any, res: any) {
  return res.send("Ok");
});

// router.get("/logout", [checkGuest, checkUser, checkToken2], logout);

router.get("/checkauth", [tokenExist, checkToken2], checkAuth);
>>>>>>> main

// POST Requests

router.post(
  "/register",
  [checkedLoggedIn, joiRegister, checkRegister],
  register
);
<<<<<<< HEAD
router.post(
  "/login",
  [checkedLoggedIn, joiLogin, checkLogin],
  login
);


router.post(
  "/update",
  [checkGuest, checkUser, checkToken, joiUpdateUser, checkUpdateUser],
=======
router.post("/login", [checkedLoggedIn, joiLogin, checkLogin], login);

router.post(
  "/update",
  [checkGuest, checkUser, checkToken2, joiUpdateUser, checkUpdateUser],
>>>>>>> main
  updateUser
);

router.post(
  "/delete",
<<<<<<< HEAD
  [checkGuest, checkUser, checkToken, joiDeleteUser, checkDeleteUser],
=======
  [checkGuest, checkUser, checkToken2, joiDeleteUser, checkDeleteUser],
>>>>>>> main
  deleteUser
);

export default router;
