import { Dispatch } from "react";

export interface HeaderState {
  active: boolean;
}

export interface RegisterState {
  fName: string;
  lName: string;
  email: string;
  username: string;
  pass: string;
  confirmPass: string;
  warn_1: string | undefined;
  warn_2: string | undefined;
  warn_3: string | undefined;
  warn_4: string | undefined;
  warn_5: string | undefined;
}

export interface LoginState {
  acc: string;
  pass: string;
  warn_1: string | undefined;
  warn_2: string | undefined;
}

type RegisterFunc = (body: RegisterBody, cb: () => void) => void;
type LoginFunc = (body: LoginBody) => void;
type checkAuthFunc = (cb: (pass: boolean) => void) => void;
type LogoutFunc = () => void;

export interface AuthContextType {
  auth: boolean;
  register?: RegisterFunc;
  login?: LoginFunc;
  logout?: LogoutFunc;
  checkAuth?: checkAuthFunc;
  dispatch?: Dispatch<AuthAction>;
}

export interface AuthAction {
  type: string;
  data?: any;
}

export type AuthReducer<S, A> = (prevState: S, action: A) => AuthContextType;

export interface LoginBody {
  email_user: string;
  password: string;
}

export interface RegisterBody {
  fName: string;
  lName: string;
  email: string;
  username: string;
  password: string;
  confirmPass: string;
}

export interface ProfileState {
  init: boolean;
  username: string;
  pitch: string;
  descActive: boolean;
}

export interface ProfileData {
  username: string;
  pitch?: string;
  discord?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
}

export interface MsgRes {
  msg: string;
}
