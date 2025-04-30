// src/components/DashboardPage/DashboardPage.js
import React from "react";
import "./DashboardPage.css"; // Import CSS for styling
import dashboardImage from "../../assets/dashboard-image.jpg"; // ✅ Import your image

const DashboardPage = () => {
  return (
    <div className="dashboard">
      <h2>Welcome to the Task Manager</h2>
      <p>This is your dashboard where you can manage your tasks and projects efficiently.</p>
      
      {/* ✅ Use imported image */}
      <img
        src={dashboardImage}
        alt="Task Manager Illustration"
        className="dashboard-image"
      />

      <div className="dashboard-buttons">
        <button className="dashboard-btn">
          <a href="/login">Login</a>
        </button>
        <button className="dashboard-btn">
          <a href="/signup">Sign Up</a>
        </button>
      </div>

      {/* ✅ New Description Section */}
      <div className="dashboard-description">
        <h3>About This Task Manager</h3>
        <p>
          Our task manager helps users organize, prioritize, and track their daily work efficiently. 
          Designed for simplicity and productivity, it offers intuitive drag-and-drop task management, 
          visual boards for better tracking, and smart categorization. Whether you're managing personal to-dos 
          or team projects, this platform adapts to your workflow. With a responsive design and secure login, 
          you can access and update your tasks anywhere, anytime. Get started by signing up, and let this task 
          manager streamline your productivity journey like never before.
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
