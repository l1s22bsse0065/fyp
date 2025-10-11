import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }, // stores /uploads/filename.jpg
    time: { type: String },
    servings: { type: String },
    category: { type: [String], default: [] },
    ingredients: { type: [String], required: true },
    steps: { type: [String], required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
