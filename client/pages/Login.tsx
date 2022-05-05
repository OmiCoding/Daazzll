import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";
import "../styles/general.css";
import LoginForm from "../components/login/LoginForm";
import checkLogin from "../validation/checkLogin";
import { LoginState } from "../custom-types";

const Login = function () {
  const [state, setState] = useState<LoginState>({
    acc: "",
    pass: "",
    warn_1: undefined,
    warn_2: undefined,
  });

  const { acc, pass, warn_1, warn_2 } = state;

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const check = checkLogin(acc, pass);

    if (check) {
      return setState({
        ...state,
        warn_1: check["acc"],
        warn_2: check["pass"],
      });
    }

    // Change this for production mode
    fetch("http://localhost:8433/login", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_user: acc,
        password: pass,
      }),
    })
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="page-wrapper">
      <div className="art-wrapper-1"></div>
      <div className="flex-wrapper-1">
        <div className="page-card-1">
          <h2 className="page__logo-1">Daazzll</h2>
          <h3 className="page__header-1">Welcome back, you've been missed!</h3>
          <LoginForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            acc={acc}
            pass={pass}
            warn_1={warn_1}
            warn_2={warn_2}
          />
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
