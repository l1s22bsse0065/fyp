const express = require("express");
const router = express.Router();

const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");

const upload = require("../middleware/upload");

// Public Routes
router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);

// Protected Routes (for now, kept open)
router.post("/", upload.single("image"), createRecipe);
router.put("/:id", upload.single("image"), updateRecipe);
router.delete("/:id", deleteRecipe);

module.exports = router;
