import Tip from "../models/Tips.js";

// @desc Create a new tip
// @route POST /api/tips
// @access Private (requires authentication)
export const createTip = async (req, res) => {
  try {
    const { title, description, details, image } = req.body;

    // Validate required fields
    if (!title || !description || !details) {
      return res.status(400).json({ message: "Title, description, and details are required." });
    }

    // Create new tip with logged-in user as creator
    const tip = await Tip.create({
      title,
      description,
      details,
      image,
      createdBy: req.user ? req.user.id : null, // ensure user is attached by auth middleware
    });

    res.status(201).json({
      message: "Tip created successfully",
      tip,
    });
  } catch (err) {
    console.error("Error creating tip:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @desc Get all tips
// @route GET /api/tips
// @access Public
export const getAllTips = async (req, res) => {
  try {
    // Populate creator info for frontend display
    const tips = await Tip.find().populate("createdBy", "name email profilePicture");

    res.status(200).json({
      message: "All tips fetched successfully",
      count: tips.length,
      tips,
    });
  } catch (err) {
    console.error("Error fetching tips:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @desc Get single tip by ID
// @route GET /api/tips/:id
// @access Public
export const getTipById = async (req, res) => {
  try {
    const tip = await Tip.findById(req.params.id).populate("createdBy", "name email profilePicture");
    if (!tip) return res.status(404).json({ message: "Tip not found" });

    res.status(200).json({
      message: "Tip fetched successfully",
      tip,
    });
  } catch (err) {
    console.error("Error fetching tip:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @desc Update a tip
// @route PATCH /api/tips/:id
// @access Private (creator only)
export const updateTip = async (req, res) => {
  try {
    const allowedUpdates = ["title", "description", "details", "image"];
    const updates = {};

    Object.keys(req.body).forEach((key) => {
      if (allowedUpdates.includes(key)) updates[key] = req.body[key];
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid fields provided for update." });
    }

    // Ensure the user owns this tip (optional but good security practice)
    const tip = await Tip.findById(req.params.id);
    if (!tip) return res.status(404).json({ message: "Tip not found" });

    if (req.user && tip.createdBy && tip.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to edit this tip" });
    }

    const updatedTip = await Tip.findByIdAndUpdate(req.params.id, { $set: updates }, {
      new: true,
      runValidators: true,
    }).populate("createdBy", "name email profilePicture");

    res.status(200).json({
      message: "Tip updated successfully",
      tip: updatedTip,
    });
  } catch (err) {
    console.error("Error updating tip:", err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @desc Delete a tip
// @route DELETE /api/tips/:id
// @access Private (creator only)
export const deleteTip = async (req, res) => {
  try {
    const tip = await Tip.findById(req.params.id);
    if (!tip) return res.status(404).json({ message: "Tip not found" });

    // Ensure the logged-in user is the creator
    if (req.user && tip.createdBy && tip.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this tip" });
    }

    await Tip.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Tip deleted successfully" });
  } catch (err) {
    console.error("Error deleting tip:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
