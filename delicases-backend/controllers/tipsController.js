import Tip from "../models/Tips.js";

// ✅ Create a new tip
export const createTip = async (req, res) => {
  try {
    console.log(req.body); // 👈 Check what’s coming from frontend
    const tip = new Tip(req.body);
    await tip.save();
    res.status(201).json(tip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// ✅ Get all tips
export const getAllTips = async (req, res) => {
  try {
    const tips = await Tip.find();
    res.status(200).json(tips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get single tip by ID
export const getTipById = async (req, res) => {
  try {
    const tip = await Tip.findById(req.params.id);
    if (!tip) return res.status(404).json({ message: "Tip not found" });
    res.status(200).json(tip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update a tip
export const updateTip = async (req, res) => {
  try {
    const updatedTip = await Tip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTip) return res.status(404).json({ message: "Tip not found" });
    res.status(200).json(updatedTip);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Delete a tip
export const deleteTip = async (req, res) => {
  try {
    const deletedTip = await Tip.findByIdAndDelete(req.params.id);
    if (!deletedTip) return res.status(404).json({ message: "Tip not found" });
    res.status(200).json({ message: "Tip deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
