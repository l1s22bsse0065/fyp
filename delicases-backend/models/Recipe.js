import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: { type: String, required: true }, // ✅ optional but nice to display directly
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }, // e.g. /uploads/filename.jpg
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

    // ⭐ New fields for ratings & reviews
    reviews: [reviewSchema],
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

// 🔹 Auto-calculate average rating whenever reviews are modified
recipeSchema.methods.updateAverageRating = function () {
  if (this.reviews.length === 0) {
    this.averageRating = 0;
  } else {
    const total = this.reviews.reduce((acc, r) => acc + r.rating, 0);
    this.averageRating = total / this.reviews.length;
  }
  return this.save();
};

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe;
