import Tip from "../models/Tips.js";
import path from "path";
import fs from "fs";

// 🟩 CREATE TIP
// @route   POST /api/tips
// @access  Private (requires authentication)
export const createTip = async (req, res) => {
  try {
    const { title, description, details } = req.body;

    if (!title || !description || !details) {
      return res.status(400).json({
        message: "Title, description, and details are required.",
      });
    }

    // Handle image upload or direct link
    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      imagePath = req.body.image; // Allow direct image URL/path if provided
    }

    const tip = await Tip.create({
      title,
      description,
      details,
      image: imagePath,
      createdBy: req.user ? req.user.id : null,
    });

    res.status(201).json({
      message: "✅ Tip created successfully",
      tip,
    });
  } catch (err) {
    console.error("❌ Error creating tip:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 🟨 GET ALL TIPS
// @route   GET /api/tips
// @access  Public
export const getAllTips = async (req, res) => {
  try {
    const tips = await Tip.find().populate("createdBy", "name email profilePicture");

    res.status(200).json({
      message: "✅ All tips fetched successfully",
      count: tips.length,
      tips,
    });
  } catch (err) {
    console.error("❌ Error fetching tips:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 🟦 GET TIP BY ID
// @route   GET /api/tips/:id
// @access  Public
export const getTipById = async (req, res) => {
  try {
    const tip = await Tip.findById(req.params.id).populate("createdBy", "name email profilePicture");

    if (!tip) {
      return res.status(404).json({ message: "Tip not found" });
    }

    res.status(200).json({
      message: "✅ Tip fetched successfully",
      tip,
    });
  } catch (err) {
    console.error("❌ Error fetching tip:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 🟧 UPDATE TIP
// @route   PATCH /api/tips/:id
// @access  Private
export const updateTip = async (req, res) => {
  try {
    const tip = await Tip.findById(req.params.id);
    if (!tip) return res.status(404).json({ message: "Tip not found" });

    // Check permission
    if (req.user && tip.createdBy && tip.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to edit this tip" });
    }

    // Fields allowed to update
    const allowedUpdates = ["title", "description", "details"];
    const updates = {};
    Object.keys(req.body).forEach((key) => {
      if (allowedUpdates.includes(key)) updates[key] = req.body[key];
    });

    // Handle new image upload
    if (req.file) {
      if (tip.image) {
        const oldImagePath = path.resolve(`.${tip.image}`);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
      updates.image = `/uploads/${req.file.filename}`;
    }

    const updatedTip = await Tip.findByIdAndUpdate(req.params.id, { $set: updates }, {
      new: true,
      runValidators: true,
    }).populate("createdBy", "name email profilePicture");

    res.status(200).json({
      message: "✅ Tip updated successfully",
      tip: updatedTip,
    });
  } catch (err) {
    console.error("❌ Error updating tip:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 🟥 DELETE TIP
// @route   DELETE /api/tips/:id
// @access  Private
export const deleteTip = async (req, res) => {
  try {
    const tip = await Tip.findById(req.params.id);
    if (!tip) return res.status(404).json({ message: "Tip not found" });

    if (req.user && tip.createdBy && tip.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this tip" });
    }

    // Delete associated image
    if (tip.image) {
      const imagePath = path.resolve(`.${tip.image}`);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await Tip.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "✅ Tip deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting tip:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
