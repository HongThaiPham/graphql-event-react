import React, { useState, useContext } from "react";
import "./Auth.scss";
import httpCall from "../lib/httpCall";

import AuthContext from "../context/auth-context";

const AuthPage = props => {
  const [email, setEmail] = useState("test2@gmail.com");
  const [password, setPassword] = useState("tester");
  const [isLogin, setLogin] = useState(true);
  const context = useContext(AuthContext);

  const submitHandler = async e => {
    e.preventDefault();
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }
    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExp
          }
        }
      `
    };
    if (!isLogin) {
      requestBody = {
        query: `
          mutation {
            createUser(userInput: { email: "${email}", password: "${password}" }) {
              _id
              email
            }
          }
        `
      };
    }
    try {
      const result = await httpCall.post("", JSON.stringify(requestBody));
      if (result.status !== 200 && result.status !== 201) {
        throw new Error("Failed!");
      }
      if (result.data.data.login.token) {
        context.login(result.data.data.login);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const swithModeHandler = () => {
    setLogin(!isLogin);
  };

  return (
    <form className="auth-form" onSubmit={submitHandler}>
      <div className="form-control">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="email">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className="form-actions">
        <button type="submit">{!isLogin ? "Signup" : "Login"}</button>
        <button type="button" onClick={swithModeHandler}>
          Switch to {isLogin ? "Signup" : "Login"}
        </button>
      </div>
    </form>
  );
};

export default AuthPage;
