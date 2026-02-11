// src/pages/ResumeAnalyzer.jsx

import { useState } from "react";
import { Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = () => {
    setLoading(true);

    // Temporary dummy navigation (UI testing only)
    setTimeout(() => {
      setLoading(false);
      navigate("/resume-workspace", {
        state: {
          analysis: {
            professional_summary:
              "AI-driven frontend engineer with expertise in scalable systems and intelligent applications.",
            technical_skills: ["React", "Node.js", "FastAPI"],
            project_experience: ["Bridge-AI Platform"],
          },
        },
      });
    }, 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0B1026] to-[#060A1F]">
      <div className="bg-[#11172F] p-10 rounded-2xl w-[500px] text-center border border-white/10 shadow-xl">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gradient-to-br from-[#22d3ee] to-[#c084fc] rounded-xl shadow-lg">
            <Upload className="text-white w-6 h-6" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-3">
          Upload Resume PDF
        </h2>

        <p className="text-slate-400 mb-6 text-sm">
          Upload your resume or academic project report to generate a verified professional resume.
        </p>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-6 text-white"
        />

        {loading ? (
          <div className="text-purple-400 animate-pulse">
            Analyzing all pages...
          </div>
        ) : (
          <button
            onClick={handleAnalyze}
            className="w-full bg-gradient-to-r from-[#6D28D9] to-[#9333EA] hover:opacity-90 transition-all text-white py-2 rounded-lg"
          >
            Analyze & Generate Resume
          </button>
        )}
      </div>
    </div>
  );
}
