const express = require("express");
const {
  createTip,
  getAllTips,
  getTipById,
  updateTip,
  deleteTip,
} = require("../controllers/tipsController");
const upload = require("../middleware/upload"); // Import your upload middleware

const router = express.Router();

// Routes
router.post("/", upload.single("image"), createTip);
router.get("/", getAllTips);
router.get("/:id", getTipById);
router.put("/:id", upload.single("image"), updateTip);
router.delete("/:id", deleteTip);

module.exports = router;
