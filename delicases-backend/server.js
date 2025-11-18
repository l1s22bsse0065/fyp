// server.js
require("dotenv").config(); // ✅ must be at the very top

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

// ---------------------------
// Middleware
// ---------------------------
app.use(
  cors({
   origin: ["http://localhost:3000", "http://localhost:5173"], // your frontend URL
    credentials: true,
  })
);
app.use(express.json());

// Serve static uploads folder
const uploadsDir = process.env.UPLOADS_DIR || "uploads";
app.use("/uploads", express.static(path.join(__dirname, uploadsDir)));

// ---------------------------
// MongoDB Connection
// ---------------------------
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("❌ Error: MONGO_URI not found in .env file");
  process.exit(1);
}

console.log("Connecting to MongoDB:", mongoURI);

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ---------------------------
// Base route
// ---------------------------
app.get("/", (req, res) => res.send("API is running..."));

// ---------------------------
// API Routes
// ---------------------------
try {
  const userRoutes = require("./routes/userRoutes");
  const tipsRoutes = require("./routes/tipsRoutes");
  const recipeRoutes = require("./routes/recipeRoutes");
  const authRoutes = require("./routes/authRoutes");

  app.use("/api/users", userRoutes);
  app.use("/api/tips", tipsRoutes);
  app.use("/api/recipes", recipeRoutes);
  app.use("/api/auth", authRoutes);

} catch (err) {
  console.error("❌ Error loading routes:", err);
}

// ---------------------------
// Error handling middleware
// ---------------------------
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err);
  res.status(500).json({ message: "Server error", error: err.message });
});

// ---------------------------
// Start server
// ---------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
