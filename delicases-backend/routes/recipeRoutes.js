const express = require("express");
const router = express.Router();

const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getUserRecipes,
} = require("../controllers/recipeController");

const upload = require("../middleware/upload");
const auth = require("../middleware/auth");

// ✅ Important: Specific routes first (before :id)
router.get("/user/my-recipes", auth, getUserRecipes);

// Public Routes
router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);

// Protected Routes (for now, kept open)
router.post("/", auth, upload.single("image"), createRecipe);
router.put("/:id",auth,  upload.single("image"), updateRecipe);
router.delete("/:id",auth, deleteRecipe);

module.exports = router;
