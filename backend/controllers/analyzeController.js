import axios from "axios";
import FormData from "form-data";
import fs from "fs";

export const analyzeProject = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("Sending file to AI backend...");
    console.log("AI URL:", process.env.AI_BACKEND_URL);

    const formData = new FormData();
    formData.append("file", fs.createReadStream(req.file.path));

    const response = await axios.post(
      `${process.env.AI_BACKEND_URL}/analyze`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        timeout: 120000, // ⬅ important for Render cold start
      }
    );

    console.log("AI response received");

    return res.status(200).json(response.data);

  } catch (error) {
    console.error("AI ERROR FULL:", error.response?.data || error.message);

    return res.status(500).json({
      error: "AI Processing Failed",
      details: error.response?.data || error.message,
    });
  }
};
