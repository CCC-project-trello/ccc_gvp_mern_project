import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Make sure to use the updated CSS

const generateCaptcha = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let captcha = "";
  for (let i = 0; i < 5; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return captcha;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (captchaInput !== captcha) {
      alert("Captcha does not match. Please try again.");
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("userData"));
    if (savedUser && savedUser.email === email && savedUser.password === password) {
      alert("Login successful!");
      navigate("/board");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="rainbow-background"></div>
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="captcha-box">
            <div className="captcha-text">{captcha}</div>
            <button
              type="button"
              onClick={refreshCaptcha}
              className="refresh-captcha"
              title="Refresh CAPTCHA"
            >
              ↻
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter CAPTCHA"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
            required
          />

          <button type="submit" className="login-button">Log In</button>
          <p className="login-link">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </form>

        <div className="help-section">
          <h4>Need Help?</h4>
          <p>Contact our team for support:</p>
          <ul>
            <li><strong>Developer: Arya</strong> – <a href="mailto:arya.dev@example.com">arya.dev@example.com</a></li>
            <li><strong>Maintainer: Jositha</strong> – <a href="mailto:Jositha@taskmanager.io">Jositha@taskmanager.io</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
