import React, { Dispatch } from "react";

export interface ContextChildren {
  children: React.ReactElement<any, any>;
}

export interface AppContextInit {
  modalActive: boolean;
  modal: string;
}

export interface AuthContextInit {
  auth: boolean;
  username: string;
  register?: RegisterFunc;
  login?: LoginFunc;
  logout?: LogoutFunc;
  checkAuth?: checkAuthFunc;
  dispatch?: Dispatch<Action>;
}

export interface ProfileContextInit {
  init: boolean;
  user: boolean;
  username: string;
  pitch: string;
  descActive: boolean;
  getProfileData?: () => void;
  getProfile?: (username: string) => void;
  dispatch?: Dispatch<Action>;
}

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

export interface Action {
  type: string;
  data?: any;
}

export type AuthReducer<S, A> = (prevState: S, action: A) => AuthContextInit;

export type ProfileReducer<S, A> = (
  prevState: S,
  action: A
) => ProfileContextInit;

export type AppReducer<S, A> = (prevState: S, action: A) => AppContextInit;

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

export type GetProfileData = () => void;

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
