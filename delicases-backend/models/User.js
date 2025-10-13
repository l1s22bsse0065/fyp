const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Full Name
    nickname: { type: String, trim: true }, // Optional Nickname
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    gender: { type: String, enum: ["", "Male", "Female", "Other"], default: null },
    country: { type: String, default: "" },
    language: { type: String, default: "English" },

    // Use camelCase timeZone to match frontend
    timeZone: { type: String, default: "" },

    profilePicture: { type: String }, // store image URL (Cloudinary, local, etc.)
    bio: { type: String, default: "" },

    extraEmails: [{ type: String }], // allows multiple emails

    // ❤️ Favourite Recipes
    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe", // assumes you already have a Recipe model
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
