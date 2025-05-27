import React, { useState } from "react";
import "./LoginPage.css";
import { login ,signup } from "../controller/registerController";


const LoginPage = () => {
  const [email, setEmail] = useState('hello@gmail.com');
  const [password, setPassword] = useState('123456');

  const handleLogin = async () => {
    try {
      const response = await login({email,password});
      console.log(response);

      if (response?.data?.message === 'Login successful') {
        window.location.href = '/dashboard';
      }
      // alert('Login successful!');
    } catch (error) {
      console.error('Login error:', error.response?.data || error);
      // alert('Login failed!');
    }
  };
  return (
    <div className="container">
      <div className="left">
        {/* Left side content, e.g. image or branding */}
      </div>
      <div className="right">
        <div className="login-form">
          <h2>Login</h2>
          <div>
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            /><br />
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            /><br />
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
