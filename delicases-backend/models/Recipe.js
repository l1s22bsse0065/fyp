import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    time: { type: String },
    servings: { type: String },
    category: { type: [String], default: [] },
    ingredients: { type: [String], required: true },
    steps: { type: [String], required: true },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
