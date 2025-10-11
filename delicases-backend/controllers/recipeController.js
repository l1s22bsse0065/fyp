import Recipe from "../models/Recipe.js";

// 📌 Create new recipe (with optional image)
export const createRecipe = async (req, res) => {
  try {
    const {
      title,
      description,
      ingredients,
      steps,
      time,
      servings,
      category,
    } = req.body;

    if (!title || !description || !ingredients || !steps) {
      return res.status(400).json({
        message: "Title, description, ingredients, and steps are required.",
      });
    }

    // 🖼️ Image path (if uploaded)
    let imagePath = "";
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    const recipe = await Recipe.create({
      title,
      description,
      ingredients: JSON.parse(ingredients), // if sent as JSON string
      steps: JSON.parse(steps),
      time,
      servings,
      category: category ? JSON.parse(category) : [],
      image: imagePath,
      createdBy: req.user ? req.user.id : null,
    });

    res.status(201).json({ message: "Recipe created successfully", recipe });
  } catch (err) {
    console.error("Error creating recipe:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 📌 Get all recipes
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });

    // ✅ Prepend base URL to image paths
    const updatedRecipes = recipes.map((recipe) => {
      const recipeObj = recipe.toObject();
      if (recipeObj.image && !recipeObj.image.startsWith("http")) {
        recipeObj.image = `${req.protocol}://${req.get("host")}${recipeObj.image}`;
      }
      return recipeObj;
    });

    res.status(200).json({
      message: "All recipes fetched successfully",
      count: updatedRecipes.length,
      recipes: updatedRecipes,
    });
  } catch (err) {
    console.error("Error fetching recipes:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// 📌 Get single recipe by ID
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate(
      "createdBy",
      "name email profilePicture"
    );
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    res.status(200).json({ message: "Recipe fetched successfully", recipe });
  } catch (err) {
    console.error("Error fetching recipe:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 📌 Update recipe
export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (req.file) {
      req.body.image = `/uploads/${req.file.filename}`;
    }

    const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({ message: "Recipe updated successfully", recipe: updated });
  } catch (err) {
    console.error("Error updating recipe:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 📌 Delete recipe
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    await recipe.deleteOne();
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (err) {
    console.error("Error deleting recipe:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
