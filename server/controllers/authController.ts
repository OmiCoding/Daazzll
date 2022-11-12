import { RequestHandler, Request, Response, NextFunction } from "express";
import { compare, hash } from "bcrypt";
import prismaClient from "../prismaClient";

declare global {
  namespace Express {
    interface User {
      id: number;
      username: string,
      email: string,
    } 
  }
}

export const login: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email_user, password } = req.body;
    if(!email_user) {
      return res.status(400).json({
        msg: "Please enter an email",
      })
    }
 
    const result = await prismaClient.accounts.findFirst({
      where: {
        email: email_user,
      },
      select: {
        id: true,
        email: true,
        username: true,
        pass: true,
      },
    });
    if (!result) {
      return res.status(400).json({
        msg: "No account found with that email",
      });
    }

    const verify = await compare(password, result.pass);

    if (!verify) {
      return res.status(400).json({
        msg: "Invalid password.",
      });
    }

   req.login({
    id: result.id,
    username: result.username,
    email: result.email
   }, (e) => {
    if(e) {
      return next(e);
    }
    return res.status(200).json({
      username: result.username,
      msg: "Ok",
    });
  })
  } catch (e) {
    return next(e);
  }
};

export const register: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, email, fName, lName, password } = req.body;
    const foundAcc = await prismaClient.accounts.findUnique({
      where: {
        email_username: {
          username: username,
          email: email,
        },
      },
    });

    if (foundAcc) {
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });
    }

    const hashedPass = await hash(password, 10);
    const result = await prismaClient.accounts.create({
      data: {
        role: "user",
        fName,
        lName,
        username,
        email,
        pass: hashedPass,
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    })

    return req.login(result, (e) => {
      if(e) {
        return next(e);
      }
      return res.status(200).json({
        username: result.username,
        msg: "Ok",
      });
    });
  } catch (e) {
    return next(e);
  }
};

export const logout: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    req.logout(function(err) {
      if(err) {
        return next(err);
      }
      res.status(200).json({
        msg: "Ok sucessfully logged out!",
      })
    })
  } catch (e) {
    return next(e);
  }
};

export const logout2: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.clearCookie("access_token", {
      path: "/",
      sameSite: "strict",
      secure: true,
    });

    res.clearCookie("refresh_token", {
      path: "/",
      sameSite: "strict",
      secure: true,
    });

    res.clearCookie("sid", {
      path: "/",
      sameSite: "strict",
      httpOnly: true,
      secure: true,
      signed: true,
    });

    req.user = undefined;

    return res.status(200).json({
      msg: "Safe to logout.",
    });
  } catch (e) {
    return next(e);
  }
};

export const checkAuth: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    return res.status(200).json({ msg: "Ok", clear: true });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const passGuest = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    return res.status(200).json({
      clear: true,
    });
  } catch (e) {
    return next();
  }
};

export const deleteUser: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;

    const acc = await prismaClient.accounts.findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        username: true,
        pass: true,
      },
    });

    if (!acc) {
      return res.status(400).json({
        msg: "Bad request.",
      });
    }

    const verifyPass = await compare(password, acc.pass);

    if (!verifyPass) {
      return res.status(400).json({
        msg: "Bad request.",
      });
    }

    await prismaClient.accounts.delete({
      where: {
        id: acc.id,
      },
    });

    res.clearCookie("access_token", {
      path: "/",
      sameSite: "strict",
      secure: true,
    });

    res.clearCookie("refresh_token", {
      path: "/",
      sameSite: "strict",
      secure: true,
    });

    req.user = undefined;

    return res.status(200).json({
      msg: "Ok",
    });
  } catch (e) {
    console.log(e);
    return next(e);
  }
};

export const updateUser: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { fName, lName, username, email, password } = req.body;

    const updateObj: any = {};

    if (fName) {
      updateObj.fName = fName;
    }
    if (lName) {
      updateObj.lName = lName;
    }
    if (username) {
      updateObj.username = username;
    }

    const acc = await prismaClient.accounts.findFirst({
      where: {
        email: email,
      },
      select: {
        email: true,
        username: true,
        pass: true,
      },
    });

    if (!acc) {
      return res.status(400).json({
        msg: "Bad request.",
      });
    }

    const verifyPass = await compare(password, acc.pass);

    if (!verifyPass) {
      return res.status(400).json({
        msg: "Bad request.",
      });
    }

    await prismaClient.accounts.update({
      where: {
        email_username: {
          email: acc.email,
          username: acc.username,
        },
      },
      data: {
        ...updateObj,
      },
    });

    return res.status(200).json({
      msg: "User successfully updated.",
    });
  } catch (e) {
    console.log(e);
    return next(e);
  }
};
