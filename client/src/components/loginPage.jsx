import React from "react";
import "./LoginPage.css";
import { login ,signup } from "../controller/registerController";

const LoginPage = () => {
  return (
    <div className="container">
      <div className="left">
        {/* Left side content, e.g. image or branding */}
      </div>
      <div className="right">
        <div className="login-form">
          <h2>Login</h2>
          <form>
            <div>
              <input></input>
              <input type="password" name="userPassword" placeholder="Enter your password" />
              <button className="loginButton">Login</button>
             
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
