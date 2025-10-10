const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000", // frontend URL
  credentials: true
}));
app.use(express.json());

// Serve static uploads folder (for images)
const uploadsDir = process.env.UPLOADS_DIR || "uploads";
app.use("/uploads", express.static(path.join(__dirname, uploadsDir)));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Base route
app.get("/", (req, res) => res.send("API is running..."));

// Routes
const userRoutes = require("./routes/userRoutes");
const tipsRoutes = require("./routes/tipsRoutes");
const recipeRoutes = require("./routes/recipeRoutes");

app.use("/api/users", userRoutes);
app.use("/api/tips", tipsRoutes);
app.use("/api/recipes", recipeRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
