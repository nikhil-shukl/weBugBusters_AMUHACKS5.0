// ResumeAnalyzer.jsx

import { useState } from "react";
import axios from "../services/api";
import { useNavigate } from "react-router-dom";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    const res = await axios.post("/analyze-resume", formData);

    setLoading(false);

    navigate("/resume-workspace", {
      state: { analysis: res.data }
    });
  };

  return (
    <div className="min-h-screen bg-[#0B1026] flex items-center justify-center">
      <div className="bg-[#11172F] p-8 rounded-2xl w-[500px] text-center">
        <h2 className="text-2xl text-white mb-6">
          Upload Resume or Project PDF
        </h2>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4 text-white"
        />

        {loading ? (
          <div className="text-purple-400 animate-pulse">
            Analyzing all pages...
          </div>
        ) : (
          <button
            onClick={handleUpload}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg text-white"
          >
            Analyze & Generate
          </button>
        )}
      </div>
    </div>
  );
}
