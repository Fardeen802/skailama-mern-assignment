import React, { useState } from "react";
import "./LoginPage.css";
import { signup } from "../controller/registerController";

const SignUpPage = () => {
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async () => {
    try {
      const result = await signup(signUpForm);
      // Handle successful signup here (e.g., navigate, show message)
      console.log("Signup success:", result);
    } catch (error) {
      console.log("Error while signing up", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp();
  };

  return (
    <div className="container">
      <div className="left">
        {/* Left side content, e.g. image or branding */}
      </div>
      <div className="right">
        <div className="login-form">
          <h2>Register Account</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                name="email"
                placeholder="Enter Email"
                value={signUpForm.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                value={signUpForm.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <input
                type="tel"
                name="phoneNumber"
                value={signUpForm.phoneNumber}
                onChange={handleChange}
                placeholder="Enter Phone number"
              />
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
