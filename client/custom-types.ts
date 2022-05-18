
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
type LoginFunc = (body: LoginBody, cb: () => void) => void;
type checkAuthFunc = () => void;
type LogoutFunc = () => void;

export interface AuthContextType {
  auth: boolean;
  register?: RegisterFunc;
  login?: LoginFunc;
  logout?: LogoutFunc;
  checkAuth?: checkAuthFunc;
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
