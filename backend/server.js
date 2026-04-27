// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// API routes
app.use("/api/tasks", require("./routes/tasks")); // Ensure these route files exist
app.use("/api/auth", require("./routes/auth"));   // Optional auth routes

// Default root route (Optional - prevents "Cannot GET /" error)
app.get("/", (req, res) => {
  res.send("📡 API is running...");
});

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve(); // Ensure correct directory resolution
  app.use(express.static(path.join(__dirname, "frontend", "build"))); // Serve static files from React frontend

  // Handle React routes (ensure frontend's `index.html` is served for all routes)
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
