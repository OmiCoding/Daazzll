export interface ReqUser {
  role?: string;
  email?: string;
  username?: string;
  userId?: string;
}

export interface RedisAuthToken {
  token: string;
}

export type validCheck = (...args: any[]) => string | boolean;