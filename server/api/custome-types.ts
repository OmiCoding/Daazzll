export interface ReqUser {
  role?: string;
  email?: string;
  username?: string;
  userId?: number;
}

export interface RedisAuthToken {
  token: string;
}
