import Recipe from "../models/Recipe.js";

/* ============================================================
   📌 CREATE NEW RECIPE
   ============================================================ */
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

    // ✅ Safe parser for arrays or strings
    const safeParse = (value) => {
      if (!value) return [];
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        return Array.isArray(value) ? value : [value];
      }
    };

    const parsedIngredients = safeParse(ingredients);
    const parsedSteps = safeParse(steps);
    const parsedCategory = safeParse(category);

    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const recipe = await Recipe.create({
      title,
      description,
      ingredients: parsedIngredients,
      steps: parsedSteps,
      time,
      servings,
      category: parsedCategory,
      image: imagePath,
      createdBy: req.user ? req.user.id : null,
    });

    res.status(201).json({
      message: "Recipe created successfully",
      recipe,
    });
  } catch (err) {
    console.error("❌ Error creating recipe:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/* ============================================================
   📌 GET ALL RECIPES
   ============================================================ */
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });

    // ✅ Add full image URLs
    const updatedRecipes = recipes.map((recipe) => {
      const obj = recipe.toObject();
      if (obj.image && !obj.image.startsWith("http")) {
        obj.image = `${req.protocol}://${req.get("host")}${obj.image}`;
      }
      return obj;
    });

    res.status(200).json({
      message: "All recipes fetched successfully",
      count: updatedRecipes.length,
      recipes: updatedRecipes,
    });
  } catch (err) {
    console.error("❌ Error fetching recipes:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/* ============================================================
   📌 GET RECIPE BY ID
   ============================================================ */
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate(
      "createdBy",
      "name email profilePicture"
    );
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    res.status(200).json({ message: "Recipe fetched successfully", recipe });
  } catch (err) {
    console.error("❌ Error fetching recipe:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/* ============================================================
   📌 UPDATE RECIPE
   ============================================================ */
export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    // ✅ Safe parser
    const safeParse = (value) => {
      if (!value) return [];
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        return Array.isArray(value) ? value : [value];
      }
    };

    // Handle updated fields safely
    const updateData = {
      ...req.body,
      ingredients: safeParse(req.body.ingredients),
      steps: safeParse(req.body.steps),
      category: safeParse(req.body.category),
    };

    if (req.file) updateData.image = `/uploads/${req.file.filename}`;

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json({
      message: "Recipe updated successfully",
      recipe: updatedRecipe,
    });
  } catch (err) {
    console.error("❌ Error updating recipe:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/* ============================================================
   📌 DELETE RECIPE
   ============================================================ */
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    await recipe.deleteOne();
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting recipe:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/* ============================================================
   📌 GET RECIPES BY LOGGED-IN USER
   ============================================================ */
export const getUserRecipes = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: login required." });
    }

    const userRecipes = await Recipe.find({ createdBy: req.user.id }).sort({
      createdAt: -1,
    });

    const updatedRecipes = userRecipes.map((r) => {
      const obj = r.toObject();
      if (obj.image && !obj.image.startsWith("http")) {
        obj.image = `${req.protocol}://${req.get("host")}${obj.image}`;
      }
      return obj;
    });

    res.status(200).json({
      message: "User recipes fetched successfully",
      count: updatedRecipes.length,
      recipes: updatedRecipes,
    });
  } catch (err) {
    console.error("❌ Error fetching user recipes:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
