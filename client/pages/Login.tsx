import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";
import "../styles/general.css";

const Login = function () {
  const [state, setState] = useState({
    acc: "",
    pass: "",
  });

  const { acc, pass } = state;

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });

  return (
    <div className="page-wrapper">
      <div className="art-wrapper-1"></div>
      <div className="flex-wrapper-1">
        <div className="page-card-1">
          <h2 className="page__logo-1">Daazzll</h2>
          <h3 className="page__header-1">Welcome back, you've been missed!</h3>
          <form className="page__form-1">
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
            </div>
            <div className="page-input-wrapper-1">
              <input
                onChange={handleChange}
                type="password"
                name="pass"
                value={pass}
                className="page__input-1"
              />
              <label className="page__label-1">{`${
                pass.length < 1 ? "Password" : ""
              }`}</label>
              <div className="password-svg-wrapper"></div>
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
          <p className="page__desc-1">
            Not a member?
            <Link to="/regiser" className="login__link">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
