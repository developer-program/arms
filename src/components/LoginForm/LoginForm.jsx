import React, { useState } from "react";

import "./LoginForm.css";
import Input from "../Input/Input";
import { loginUser } from "../../api/api";
import ConfirmationMessage from "../ConfirmationMessage/ConfirmationMessage";
import { LOGIN_USER } from "../../reducer/userReducer";
import { useUserContext } from "../../context/UserContext";

const LoginForm = () => {
  const { dispatch } = useUserContext();
  const [formInputs, setFormInputs] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = event => {
    const { name, value } = event.target;
    setFormInputs({ ...formInputs, [name]: value });
  };

  const onSubmit = async event => {
    try {
      event.preventDefault();
      setSubmitted(true);
      const user = await loginUser(formInputs.email, formInputs.password);
      setSuccess(true);
      dispatch({ type: LOGIN_USER, payload: user });
    } catch (err) {
      setSuccess(false);
      setMessage("Invalid email or password");
    }
  };

  return (
    <form
      className="loginFormContainer"
      onSubmit={onSubmit}
      data-testid="loginForm"
    >
      <h1 className="loginForm__header">
        Apartments and Residential Management System
      </h1>
      <h2 className="loginForm__heading">User Login</h2>
      <div className="loginForm">
        <Input
          id="email"
          label="Email"
          name="email"
          type="text"
          value={formInputs.email}
          onChange={onChange}
          required
        />
        <Input
          id="password"
          label="Password"
          name="password"
          type="password"
          value={formInputs.password}
          onChange={onChange}
          required
        />
        {submitted && (
          <ConfirmationMessage success={success} message={message} />
        )}
        <input className="loginForm__loginButton" value="Login" type="submit" />
      </div>
    </form>
  );
};

export default LoginForm;
