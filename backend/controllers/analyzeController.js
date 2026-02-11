import axios from "axios";
import fs from "fs";
import Analysis from "../models/analysisModel.js";

export const analyzeProject = async (req, res) => {
  try {
    const filePath = req.file.path;

    const formData = new FormData();
    formData.append("file", fs.createReadStream(filePath));

    const response = await axios.post(
      "http://127.0.0.1:8000/analyze",
      formData,
      { headers: formData.getHeaders() }
    );

    const result = response.data;

    const saved = await Analysis.create({
      skills: result.skills,
      summary: result.summary,
      career_score: result.career_readiness_score
    });

    res.json(saved);

  } catch (error) {
    res.status(500).json({ message: "Analysis failed" });
  }
};
