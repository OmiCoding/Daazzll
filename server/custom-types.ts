import { JwtPayload } from "jsonwebtoken";

export interface ReqUser {
  role: string;
  userId?: number;
  email?: string;
  username?: string;
  cursor?: number;
}

export interface RedisAuthToken {
  token: string;
}

export interface UserProp {
  role: string;
  userId: number;
  email: string;
  username: string;
}

export interface Payload extends ReqUser, JwtPayload {
  tokenId: string;
}

export interface RedisAuthToken {
  token: string;
}

export type validCheck = (...args: any[]) => string | boolean;

export interface DesignData {
  id: number;
  url?: string;
  imageId: string;
  version: number;
}