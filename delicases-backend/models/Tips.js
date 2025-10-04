import mongoose from "mongoose";

const tipSchema = new mongoose.Schema({
  image: {
    type: String,
   
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
});

const Tip = mongoose.model("Tip", tipSchema);
export default Tip;
