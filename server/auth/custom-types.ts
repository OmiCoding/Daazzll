import { JwtPayload } from "jsonwebtoken";

export interface ReqUser {
<<<<<<< HEAD
  role: string; 
=======
  role: string;
>>>>>>> main
  userId?: number;
  email?: string;
  username?: string;
}

<<<<<<< HEAD
=======
export interface UserProp {
  role: string;
  userId: number;
  email: string;
  username: string;
}

>>>>>>> main
export interface Payload extends ReqUser, JwtPayload {
  tokenId: string;
}

export interface RedisAuthToken {
  token: string;
}

<<<<<<< HEAD
export type validCheck = (...args: any[]) => string | boolean;
=======
export type validCheck = (...args: any[]) => string | boolean;
>>>>>>> main
