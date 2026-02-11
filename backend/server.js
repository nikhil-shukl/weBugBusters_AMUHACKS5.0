import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import analyzeRoute from "./routes/analyzeRoute.js";
import resumeRoutes from "./routes/resume.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api", analyzeRoute);
app.use("/api", resumeRoutes);

app.listen(5000, () => {
  console.log("Node server running on port 5000");
});