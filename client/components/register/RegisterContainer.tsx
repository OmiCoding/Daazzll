import React, { useState, FormEvent, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/auth/useAuth";
import RegisterForm from "./RegisterForm";
import { checkRegister } from "../../validation/checkRegister";
import { RegisterState } from "../../custom-types";
import RegisterSVG from "../../../svgs/robot-arm-02.svg";


import "../../styles/register.css";

const RegisterContainer = function () {
  const { register } = useAuth();

  const [state, setState] = useState<RegisterState>({
    fName: "",
    lName: "",
    email: "",
    username: "",
    pass: "",
    confirmPass: "",
    terms: "",
    checkBox: false,
    warn_1: undefined,
    warn_2: undefined,
    warn_3: undefined,
    warn_4: undefined,
    warn_5: undefined,
  });

  const {
    fName,
    lName,
    email,
    username,
    pass,
    confirmPass,
    terms,
    checkBox,
    warn_1,
    warn_2,
    warn_3,
    warn_4,
    warn_5,
  } = state;

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if(e.target.name === "terms") { 
      console.log(e.target.name);
      return setState({
        ...state,
        [e.target.name]: e.target.value,
        checkBox: !checkBox,
      })
    }

    return setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const check = checkRegister(
      fName,
      lName,
      email,
      username,
      pass,
      confirmPass
    );

    if (check) {
      return setState({
        ...state,
        warn_1: check["fName"],
        warn_2: check["lName"],
        warn_3: check["email"],
        warn_4: check["username"],
        warn_5: check["password"],
      });
    }

    if (register) {
      register({ fName, lName, email, username, password: pass, confirmPass });
    }
  };

  return (
    <div className="page-wrapper">
      <div className="art-wrapper-1">
        <div className="svg-reg-wrapper">
          <RegisterSVG />
          <h2 className="svg-reg__desc">Register Bot 3000</h2>
        </div>
      </div>
      <div className="flex-wrapper-1">
        <div className="page-card-1">
          <h2 className="page__logo-1">Daazzll</h2>
          <h3 className="page__header-1">
            Discover your creativity &amp; your imagination
          </h3>
          <RegisterForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            fName={fName}
            lName={lName}
            email={email}
            username={username}
            pass={pass}
            confirmPass={confirmPass}
            terms={terms}
            checkBox={checkBox}
            warn_1={warn_1}
            warn_2={warn_2}
            warn_3={warn_3}
            warn_4={warn_4}
            warn_5={warn_5}
          />
          <p className="register-login__text">
            Already a member?{" "}
            <Link to="/login" className="register-login__link">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterContainer;
