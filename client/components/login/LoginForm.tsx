import React, { ChangeEvent, FormEvent, MouseEvent } from "react";
import { Link } from "react-router-dom";
import WarnSvg from "../../../svgs/warning-08.svg";
import { LoginState } from "../../custom-types";

interface LoginFormProps extends LoginState {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleEye: () => void;
}

const LoginForm: React.FC<LoginFormProps> = function ({
  handleChange,
  handleSubmit,
  handleEye,
  acc,
  pass,
  eye,
  warn_1,
  warn_2,
}) {

  return (
    <form className="page__form-1" onSubmit={handleSubmit} method="POST">
      <div className="page-input-wrapper-1">
        <input
          onChange={handleChange}
          type="text"
          name="acc"
          value={acc}
          className="page__input-1"
        />
        <label className="page__label-1">{`${
          acc.length < 1 ? "Email / Username" : ""
        }`}</label>
        <div
          className={`msg-abs-wrapper msg-wrapper--${
            warn_1 ? "visible" : "invisible"
          }`}
        >
          <div className="msg-wrapper">
            <div className="warning-wrapper">
              <WarnSvg />
            </div>
            <span className="msg__text">{warn_1 ? warn_1 : ""}</span>
          </div>
        </div>
      </div>
      <div className="page-input-wrapper-1">
        <input
          onChange={handleChange}
          type={eye ? "text" : "password"}
          name="pass"
          value={pass}
          style={{
            color: eye ? "#2158c4" : "#231f20",
          }}
          className="page__input-1"    
        />
        <label className="page__label-1">{`${
          pass.length < 1 ? "Password" : ""
        }`}</label>
        <div
          className={`msg-abs-wrapper msg-wrapper--${
            warn_2 ? "visible" : "invisible"
          }`}
        >
          <div className="msg-wrapper">
            <div className="warning-wrapper">
              <WarnSvg />
            </div>
            <span className="msg__text">{warn_2 ? warn_2 : ""}</span>
          </div>
        </div>
        <div className="password-svg-wrapper">
          <button 
            type="button" 
            onClick={() => handleEye()} className="pass__eye__btn"
            style={{
              color: eye ? "#2158c4" : "#231f20",
            }}
            >
            {eye ? (<i className="fa-solid fa-eye" />) : (<i className="fa-solid fa-eye-slash" />)}
          </button>
        </div>
      </div>
      <div className="recovery-wrap-link">
        <Link className="login__recover-link" to="/recover-password">
          Recover Password
        </Link>
      </div>
      <div className="btn-wrapper-1">
        <button type="submit" className="btn-pad-2 btn-1">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
