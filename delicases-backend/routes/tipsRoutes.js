const express = require("express");
const {
  createTip,
  getAllTips,
  getTipById,
  updateTip,
  deleteTip,
} = require("../controllers/tipsController");

const router = express.Router();

router.post("/", createTip);
router.get("/", getAllTips);
router.get("/:id", getTipById);
router.put("/:id", updateTip);
router.delete("/:id", deleteTip);

module.exports = router;
