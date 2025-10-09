import Recipe from "../models/Recipe.js";

// @desc Create a new recipe
// @route POST /api/recipes
// @access Private (requires authentication)
export const createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, steps, image, time, servings, category } = req.body;

    // ✅ Validate required fields
    if (!title || !description || !ingredients || !steps) {
      return res.status(400).json({ 
        message: "Title, description, ingredients, and steps are required." 
      });
    }

    // ✅ Create new recipe (linked with logged-in user if available)
    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
      steps,
      image,
      time,
      servings,
      category,
      createdBy: req.user ? req.user.id : null,
    });

    res.status(201).json({
      message: "Recipe created successfully",
      recipe,
    });
  } catch (err) {
    console.error("Error creating recipe:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @desc Get all recipes
// @route GET /api/recipes
// @access Public
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate("createdBy", "name email profilePicture")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "All recipes fetched successfully",
      count: recipes.length,
      recipes,
    });
  } catch (err) {
    console.error("Error fetching recipes:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @desc Get single recipe by ID
// @route GET /api/recipes/:id
// @access Public
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate(
      "createdBy",
      "name email profilePicture"
    );
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    res.status(200).json({
      message: "Recipe fetched successfully",
      recipe,
    });
  } catch (err) {
    console.error("Error fetching recipe:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @desc Update a recipe
// @route PATCH /api/recipes/:id
// @access Private (creator only)
export const updateRecipe = async (req, res) => {
  try {
    const allowedUpdates = [
      "title",
      "description",
      "ingredients",
      "steps",
      "image",
      "time",
      "servings",
      "category",
    ];

    const updates = {};
    Object.keys(req.body).forEach((key) => {
      if (allowedUpdates.includes(key)) updates[key] = req.body[key];
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid fields provided for update." });
    }

    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (req.user && recipe.createdBy && recipe.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to edit this recipe" });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).populate("createdBy", "name email profilePicture");

    res.status(200).json({
      message: "Recipe updated successfully",
      recipe: updatedRecipe,
    });
  } catch (err) {
    console.error("Error updating recipe:", err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @desc Delete a recipe
// @route DELETE /api/recipes/:id
// @access Private (creator only)
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (req.user && recipe.createdBy && recipe.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this recipe" });
    }

    await Recipe.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (err) {
    console.error("Error deleting recipe:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
