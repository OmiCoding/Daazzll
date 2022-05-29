export interface ReqUser {
  role: string; 
  userId?: string;
  email?: string;
  username?: string;
}

export interface Payload extends ReqUser {
  tokenId: string;
}

export interface RedisAuthToken {
  token: string;
}

export type validCheck = (...args: any[]) => string | boolean;