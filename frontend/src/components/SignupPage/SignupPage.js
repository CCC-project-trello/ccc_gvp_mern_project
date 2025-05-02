// src/components/SignupPage/SignupPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SignupPage.css'; // make sure this points to your updated CSS

const SignupPage = () => {
  const navigate = useNavigate();

  // User data state
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(userData));
    alert("Signup successful! Now please log in.");
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <div className="signup-grid">
        <div className="signup-box">
          <h2>Create Your Account</h2>
          <form className="signup-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={userData.fullName}
              onChange={(e) =>
                setUserData({ ...userData, fullName: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={userData.password}
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={userData.phoneNumber}
              onChange={(e) =>
                setUserData({ ...userData, phoneNumber: e.target.value })
              }
              required
            />
            <button className="signup-button" type="submit">
              Sign Up
            </button>
            <p className="signup-link">
              Already have an account? <a href="/login">Log In</a>
            </p>
            <p className="signup-link">
              Need help? <a href="/help">Click here for help</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
