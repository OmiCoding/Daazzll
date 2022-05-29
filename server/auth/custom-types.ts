import { JwtPayload } from "jsonwebtoken";

export interface ReqUser {
  role: string; 
  userId?: number;
  email?: string;
  username?: string;
}

export interface Payload extends ReqUser, JwtPayload {
  tokenId: string;
}

export interface RedisAuthToken {
  token: string;
}

export type validCheck = (...args: any[]) => string | boolean;