// routes/authRoutes.js
const express = require("express");
const {
  forgotPasswordOTP,
  verifyOtp,
  resetPasswordOTP,
} = require("../controllers/authController");

const router = express.Router();

// Send OTP to email
router.post("/forgot-password", forgotPasswordOTP);

// Verify OTP
router.post("/verify-otp", verifyOtp);

// Reset password after OTP verification
router.post("/reset-password/:userId", resetPasswordOTP);

module.exports = router;
