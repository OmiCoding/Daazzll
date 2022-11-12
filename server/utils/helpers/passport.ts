import { compare } from "bcrypt";
import prismaClient from "../../prismaClient";

declare global {
  namespace Express {
    interface User {
      id: number;
      username: string;
      email: string;
    }
  }
}


export const serializeUser = function(user: Express.User, cb: any) {
  console.log(user, 1);
  return cb(null, user.id);
}

export const deserializeUser = async function(id: number, cb: any) {
  console.log(id, 2);
  try {
    const result = await prismaClient.accounts.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        username: true,
        email: true,
      }
    });
    return cb(null, result);
  } catch(e) {
    cb(e);
  }
}

export const strategyFunc = async function(username: any, password: any, cb: any) {
  try {
    const result = await prismaClient.accounts.findFirst({
      where: {
        email: username,
      },
      select: {
        id: true,
        email: true,
        username: true,
        pass: true,
      }
    });
    if(!result) {
      return cb(null, false);
    }
  
    const verify = await compare(password, result.pass);
  
    if(!verify) {
      return cb(null, false);
    }
    return cb(null, {
      id: result.id,
      email: result.email,
      username: result.username
    });
  } catch(e) {
    console.error(e);
    return cb(e);
  }
}