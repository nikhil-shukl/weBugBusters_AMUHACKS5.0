import express from "express";
import multer from "multer";
import { analyzeProject } from "../controllers/analyzeController.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/analyze", upload.single("file"), analyzeProject);

export default router; 