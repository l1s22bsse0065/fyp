const express = require("express");
const router = express.Router();

const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getUserRecipes,
  addReview,
  getRecipeReviews,
} = require("../controllers/recipeController");

const upload = require("../middleware/upload");
const auth = require("../middleware/auth");

// ======================================================
// 🔹 USER RECIPES (Protected)
// ======================================================
router.get("/user/my-recipes", auth, getUserRecipes);

// ======================================================
// 🔹 REVIEWS (Protected + Public)
// ======================================================
router.post("/:id/reviews", auth, addReview); // Post a review
router.get("/:id/reviews", getRecipeReviews); // Get reviews for a recipe

// ======================================================
// 🔹 RECIPES (Public)
// ======================================================
router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);

// ======================================================
// 🔹 CREATE / UPDATE / DELETE RECIPES (Protected)
// ======================================================
router.post("/", auth, upload.single("image"), createRecipe);
router.put("/:id", auth, upload.single("image"), updateRecipe);
router.delete("/:id", auth, deleteRecipe);

module.exports = router;
