import mongoose from "mongoose";

const tipSchema = new mongoose.Schema(
  {
    image: { type: String },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    details: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 👈 Optional: link tip to user
  },
  { timestamps: true } // 👈 Adds createdAt & updatedAt automatically
);

export default mongoose.model("Tip", tipSchema);
