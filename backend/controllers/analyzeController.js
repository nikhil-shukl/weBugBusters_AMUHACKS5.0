import axios from "axios";
import FormData from "form-data";
import fs from "fs";

export const analyzeProject = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const formData = new FormData();
    formData.append("file", fs.createReadStream(req.file.path));

    const response = await axios.post(
      process.env.AI_BACKEND_URL + "/analyze",
      formData,
      {
        headers: formData.getHeaders(),
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Analyze Error:", error.response?.data || error.message);
    res.status(500).json({
      error: "AI Processing Failed",
      details: error.response?.data || error.message,
    });
  }
};