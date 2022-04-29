import React from "react";
import { Link } from "react-router-dom";
import WarnSvg from "../../../svgs/warning-08.svg";

type handleSubmit = (e: React.FormEvent<HTMLFormElement>) => void;
type handleChange = (e: React.ChangeEvent<HTMLInputElement>) => void;

const RegisterForm: React.FC<{
  handleSubmit: handleSubmit;
  handleChange: handleChange;
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
}> = function ({
  handleSubmit,
  handleChange,
  fName,
  lName,
  email,
  username,
  pass,
  confirmPass,
  warn_1,
  warn_2,
  warn_3,
  warn_4,
  warn_5,
}) {
  return (
    <form onSubmit={handleSubmit} className="page__form-1">
      <div className="page-input-divider-1">
        <div className="page-input-wrapper-2">
          <input
            type="text"
            name="fName"
            value={fName}
            onChange={handleChange}
            className="page__input-2"
          />
          <label className="page__label-2">First name</label>
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
        <div className="page-input-wrapper-2">
          <input
            type="text"
            name="lName"
            value={lName}
            onChange={handleChange}
            className="page__input-2"
          />
          <label className="page__label-2">Last name</label>
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
        </div>
      </div>
      <div className="page-input-divider-1">
        <div className="page-input-wrapper-2">
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
            className="page__input-2"
          />
          <label className="page__label-2">Email</label>
          <div
            className={`msg-abs-wrapper msg-wrapper--${
              warn_3 ? "visible" : "invisible"
            }`}
          >
            <div className="msg-wrapper">
              <div className="warning-wrapper">
                <WarnSvg />
              </div>
              <span className="msg__text">{warn_3 ? warn_3 : ""}</span>
            </div>
          </div>
        </div>
        <div className="page-input-wrapper-2">
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            className="page__input-2"
          />
          <label className="page__label-2">Username</label>
          <div
            className={`msg-abs-wrapper msg-wrapper--${
              warn_4 ? "visible" : "invisible"
            }`}
          >
            <div className="msg-wrapper">
              <div className="warning-wrapper">
                <WarnSvg />
              </div>
              <span className="msg__text">{warn_4 ? warn_4 : ""}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="page-input-divider-1">
        <div className="page-input-wrapper-2">
          <input
            type="password"
            name="pass"
            value={pass}
            onChange={handleChange}
            className="page__input-2"
          />
          <label className="page__label-2">Password</label>
          <div
            className={`msg-abs-wrapper msg-wrapper--${
              warn_5 ? "visible" : "invisible"
            }`}
          >
            <div className="msg-wrapper">
              <div className="warning-wrapper">
                <WarnSvg />
              </div>
              <span className="msg__text">{warn_5 ? warn_5 : ""}</span>
            </div>
          </div>
        </div>
        <div className="page-input-wrapper-2">
          <input
            type="password"
            name="confirmPass"
            value={confirmPass}
            onChange={handleChange}
            className="page__input-2"
          />
          <label className="page__label-2">Confirm password</label>
        </div>
      </div>
      <div className="terms-wrapper">
        <div className="terms__checkbox"></div>
        <p className="terms__text">
          I have read and agree to the{" "}
          <Link to="/terms" className="terms__link">
            terms &amp; conditions
          </Link>
        </p>
      </div>
      <div className="btn-wrapper-1">
        <button type="submit" className="btn-pad-2 btn-1">
          Create Account
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
