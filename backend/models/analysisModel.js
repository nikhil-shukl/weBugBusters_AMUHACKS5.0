import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema({
  summary: String,
  career_score: Number,
  skills: Array
}, { timestamps: true });

export default mongoose.model("Analysis", analysisSchema);
