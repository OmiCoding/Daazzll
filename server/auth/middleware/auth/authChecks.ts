import { Request, Response, NextFunction, RequestHandler } from "express";

import {
  validEmail,
  loginPass,
  validUser,
  validName,
  validPass,
} from "../validation/authValidation";

import "dotenv/config";

let { HOST } = process.env;

if(!HOST) {
  throw new Error("Host is not defined.");
}

export const checkDeleteUser: RequestHandler = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.body) {
    if (req.body.email && req.body.password) {
      const { email, password } = req.body;

      let check: string | boolean;

      check = validEmail(email);

      if (check) {
        return res.status(400).json({
          msg: check,
        });
      }

      check = loginPass(password);

      if (check) {
        return res.status(400).json({
          msg: check,
        });
      }

      return next();
    } else {
      return res.status(400).json({
        msg: "Bad request.",
      });
    }
  } else {
    return res.status(400).json({
      msg: "Bad request.",
    });
  }
};

export const checkGuest: RequestHandler = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (
    (req.cookies.access_token && req.cookies.refresh_token) ||
    req.cookies.refresh_token
  ) {
    return next();
  } else {
    return res.status(401).json({ msg: "Not authorized." });
  }
};

export const checkedLoggedIn: RequestHandler = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.cookies.access_token) {
     
    return res.status(403).json({ msg: "Bad request." });
  }
  return next();
};

export const checkLogin: RequestHandler = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email_user, password } = req.body;

  let check: string | boolean | undefined;

  if(/[@\.]/.test(email_user)) {
    check = validEmail(email_user);

    if (check) {
      return res.status(400).json({
        msg: check,
      });
    }

    check = loginPass(password);

    if (check) {
      return res.status(400).json({
        msg: check,
      });
    }
  } else {
    check = validUser(email_user);

    if (check) {
      return res.status(400).json({
        msg: check,
      });
    }
  }

  return next();
};

export const checkRegister: RequestHandler = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { fName, lName, username, email, password, confirmPass } = req.body;

  let check: string | boolean | undefined;

  check = validName(fName);

  if (check) {
    return res.status(400).json({
      msg: check,
    });
  }

  check = validName(lName);

  if (check) {
    return res.status(400).json({
      msg: check,
    });
  }

  check = validEmail(email);

  if (check) {
    return res.status(400).json({
      msg: check,
    });
  }

  check = validPass(password, confirmPass);

  if (check) {
    return res.status(400).json({
      msg: check,
    });
  }

  check = validUser(username);

  if (check) {
    return res.status(400).json({
      msg: check,
    });
  }

  check = undefined;

  return next();
};

export const checkUser: RequestHandler = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user) {
    return next();
  } else {
    return res.status(403).json({
      msg: "Not authorized."
    });
  }
};

export const checkUpdateUser: RequestHandler = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.body) {
      if (req.body.email && req.body.password) {
        const { fName, lName, password, email, username } = req.body;

        let check: string | boolean;

        if (password) {
          check = loginPass(password);
          if (check) {
            return res.status(400).json({
              msg: check,
            });
          }
        }

        if (fName) {
          check = validName(fName);
          if (check) {
            return res.status(400).json({
              msg: check,
            });
          }
        }

        if (lName) {
          check = validName(lName);
          if (check) {
            return res.status(400).json({
              msg: check,
            });
          }
        }

        if (email) {
          check = validEmail(email);
          if (check) {
            return res.status(400).json({
              msg: check,
            });
          }
        }

        if (username) {
          check = validUser(username);
          if (check) {
            return res.status(400).json({
              msg: check,
            });
          }
        }

        return next();
      } else {
        return res.status(400).json({
          msg: "Bad request.",
        });
      }
    } else {
      return res.status(400).json({
        msg: "Bad request.",
      });
    }
  } catch (e) {
    return next(e);
  }
};
