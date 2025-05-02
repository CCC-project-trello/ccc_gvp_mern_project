import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Importing Components for Routes
import DashboardPage from "./components/DashboardPage/DashboardPage";
import LoginPage from "./components/LoginPage/LoginPage";
import SignupPage from "./components/SignupPage/SignupPage";
import Board from "./components/Board";

// Main App Component
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* 🏠 Dashboard Page - Default route */}
          <Route path="/" element={<DashboardPage />} />

          {/* 🔐 Login Page */}
          <Route path="/login" element={<LoginPage />} />

          {/* 📝 Signup Page */}
          <Route path="/signup" element={<SignupPage />} />

          {/* 📋 Task Board Page with background and color dynamics */}
          <Route
            path="/board"
            element={
              <div className="background-wrapper">
                <div className="task-manager">
                  <h1 className="board-title">Task Manager</h1>
                  <Board />
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
