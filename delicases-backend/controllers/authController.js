// controllers/authController.js
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import User from "../models/User.js";

// -------------------------
// Send OTP to Email
// -------------------------
export const forgotPasswordOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email not found" });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP & expiry (5 mins)
    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpires = Date.now() + 5 * 60 * 1000;
    await user.save();

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Delicacies Password Reset OTP",
      html: `<p>Hello ${user.name},</p>
             <p>Your OTP for password reset is: <b>${otp}</b></p>
             <p>It will expire in 5 minutes.</p>`,
    });

    res.json({ message: `OTP sent to ${user.email}`, userId: user._id });
  } catch (err) {
    console.error("Send OTP Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------------
// Verify OTP
// -------------------------
export const verifyOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const user = await User.findOne({
      _id: userId,
      resetPasswordOTP: otp,
      resetPasswordOTPExpires: { $gt: Date.now() }, // not expired
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired OTP" });

    // ✅ OTP verified, allow password reset
    res.json({ message: "OTP verified", userId: user._id });
  } catch (err) {
    console.error("Verify OTP Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------------
// Reset Password
// -------------------------
export const resetPasswordOTP = async (req, res) => {
  try {
    const { userId } = req.params;
    const { password } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Clear OTP fields
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpires = undefined;

    await user.save();

    res.json({ message: "Password reset successful! You can now log in." });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
