import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { redisClient } from "../../storageInit";

import {
  Context,
  createMockContext,
  MockContext,
} from "../../__mocks__/prismaContext";

interface Payload {
  role: string;
  userId: string;
  username?: string;
  email?: string;
}

interface CreateUser {
  id: number;
  role: string;
  fName: string;
  lName: string;
  username: string;
  email: string;
  pass: string;
  phone: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export async function createUser(user: CreateUser, ctx: Context) {
  return await ctx.prisma.accounts.create({
    data: user,
  });
}

async function mockToken(
  payload: Payload,
  exp: string
): Promise<string | null> {
  try {
    const result = await redisClient.get(payload.userId);

    if (result) return null;

    const token = jwt.sign(payload, "secret", {
      expiresIn: exp,
    });

    await redisClient.setEx(
      payload.userId,
      120,
      JSON.stringify({
        token: token,
      })
    );

    return token;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export const testRegister: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const mockCtx: MockContext = createMockContext();
    const ctx: Context = mockCtx;

    const { username, email, phone, fName, lName, password } = req.body;

    const accessToken = await mockToken(
      {
        role: "user",
        userId: uuidv4(),
        email: email,
      },
      "30m"
    );

    const refreshToken = await mockToken(
      {
        role: "user",
        userId: uuidv4(),
        email: email,
      },
      "30m"
    );

    const createTime = new Date(new Date().toString());
    const updatedTime = new Date(new Date().toString());

    const hashedPass = await bcrypt.hash(password, 10);

    mockCtx.prisma.accounts.create.mockResolvedValue({
      id: 1,
      role: "user",
      fName,
      lName,
      username,
      email,
      pass: hashedPass,
      isAdmin: false,
      createdAt: createTime,
      updatedAt: updatedTime,
    });

    await expect(
      createUser(
        {
          id: 1,
          role: "user",
          fName: fName,
          lName: lName,
          email: email,
          username: username,
          pass: hashedPass,
          phone: phone,
          isAdmin: false,
          createdAt: createTime,
          updatedAt: updatedTime,
        },
        ctx
      )
    ).resolves.toEqual({
      id: 1,
      role: "user",
      fName,
      lName,
      username,
      email,
      isAdmin: false,
      pass: hashedPass,
      createdAt: createTime,
      updatedAt: updatedTime,
    });

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      expires: new Date(new Date().getTime() + 10 * 60000),
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      expires: new Date(new Date().getTime() + 30 * 86400000),
    });
    return res.status(302).redirect("/profile");
  } catch (e) {
    return next(e);
  }
};

export const registerFoundUser: RequestHandler = async function (
  req,
  res,
  next
) {
  try {
    const { email } = req.body;

    const prisma = new PrismaClient();

    const foundAcc = await prisma.accounts.findFirst({
      where: {
        email,
      },
    });

    if (foundAcc) {
      return res.status(400).json({
        msg: "An account with this email already exists.",
      });
    }

    return res.status(302).redirect("/profile");
  } catch (e) {
    return next(e);
  }
};

export const testLogin: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, email, password } = req.body;

    const prisma = new PrismaClient();

    let propName: string;

    if (username) {
      propName = "username";
    } else {
      propName = "email";
    }

    const result: any = await prisma.accounts.findFirst({
      where: {
        [propName]: propName === "username" ? username : email,
      },
      select: {
        [propName]: true,
        pass: true,
      },
    });

    if (!result) {
      return res.status(400).json({
        msg: `No account found with that ${propName}`,
      });
    }

    const verify = await bcrypt.compare(password, result.pass);

    if (!verify) {
      return res.status(400).json({
        msg: "Invalid password.",
      });
    }

    const accessToken = await mockToken(
      {
        role: "user",
        userId: uuidv4(),
        [propName]: propName === "username" ? username : email,
      },
      "10m"
    );

    const refreshToken = await mockToken(
      {
        role: "user",
        userId: uuidv4(),
        [propName]: propName === "username" ? username : email,
      },
      "30m"
    );

    res.cookie("access_token", JSON.stringify(accessToken), {
      httpOnly: true,
      sameSite: "strict",
      expires: new Date(new Date().getTime() + 10 * 60000),
      path: "/",
    });

    res.cookie("refresh_token", JSON.stringify(refreshToken), {
      httpOnly: true,
      sameSite: "strict",
      expires: new Date(new Date().getTime() + 30 * 86400000),
      path: "/",
    });

    return res.status(301).redirect("http://localhost:8080/profile");
  } catch (e) {
    return next(e);
  }
};

export const testLogout: RequestHandler = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (req.headers.cookie) {
      const cookieObj: any = req.headers.cookie.split(";").reduce(
        (prev, curr) => {
          const data = curr.trim().split("=");

          if (data.length === 1) {
            return {
              ...prev,
              [data[0]]: "",
              // keys: {
              //   ...prev.keys,
              //   [data[0]]: data[0],
              // },
            };
          } else {
            return {
              ...prev,
              [data[0]]: data[1],
              // keys: {
              //   ...prev.keys,
              //   [data[0]]: data[0],
              // },
            };
          }
        },
        {
          // keys: {}
        }
      );

      if (cookieObj.access_token) {
        const accessPayload: any = jwt.verify(
          decodeURI(cookieObj.access_token),
          "secret",
          {
            maxAge: "10m",
          }
        );
        await redisClient.del(accessPayload.userId);
      }

      if (cookieObj.refresh_token) {
        const refreshPayload: any = jwt.verify(
          decodeURI(cookieObj.refresh_token),
          "secret",
          {
            maxAge: "30m",
          }
        );
        await redisClient.del(refreshPayload.userId);
      }
    }
    res.clearCookie("access_token", {
      path: "/",
      sameSite: "strict",
      httpOnly: true,
    });

    res.clearCookie("request_token", {
      path: "/",
      sameSite: "strict",
      httpOnly: true,
    });

    if (req.user) {
      delete req.user.userId;
      delete req.user.role;
      if (req.user.email) {
        delete req.user.email;
      } else {
        delete req.user.username;
      }

      req.user = undefined;
    }

    return res.status(302).redirect("/login");
  } catch (e) {
    return next(e);
  }
};

// export const deleteUser: RequestHandler = async function (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {};

// export const updateUser: RequestHandler = async function (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {};
