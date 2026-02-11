// src/pages/ResumeAnalyzer.jsx

import { useState } from "react";
import { Upload, FileText, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(""); // clear error when new file is selected
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please upload a PDF file.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "http://localhost:5000/api/generate-resume",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Backend error occurred");
      }

      const data = await response.json();

      setLoading(false);
      navigate("/resume-workspace", {
        state: { analysis: data },
      });
    } catch (err) {
      console.error("Resume generation failed:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0B1026] to-[#060A1F] relative overflow-hidden">
      
      {/* Animated background overlay – subtle moving gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#22d3ee]/5 via-transparent to-[#c084fc]/5 animate-gradient-shift pointer-events-none" />

      <div className="bg-[#11172F] p-10 rounded-2xl w-[500px] text-center border border-white/10 shadow-xl backdrop-blur-sm relative z-10 transition-all duration-300 hover:border-white/20">
        
        {/* Animated Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gradient-to-br from-[#22d3ee] to-[#c084fc] rounded-xl shadow-lg animate-float">
            <Upload className="text-white w-6 h-6" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-3">
          Upload Resume PDF
        </h2>

        <p className="text-slate-400 mb-6 text-sm">
          Upload your resume or academic project report to generate a verified professional resume.
        </p>

        {/* ===== ANIMATED FILE UPLOAD AREA ===== */}
        <div
          onClick={() => document.getElementById("fileInput").click()}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const droppedFile = e.dataTransfer.files[0];
            if (droppedFile && droppedFile.type === "application/pdf") {
              setFile(droppedFile);
              setError("");
            } else {
              setError("Only PDF files are allowed.");
            }
          }}
          className={`
            relative group border-2 border-dashed rounded-xl p-6 mb-4 cursor-pointer
            transition-all duration-300 ease-out
            ${file 
              ? "border-purple-400 bg-purple-400/10" 
              : "border-slate-600 hover:border-purple-400/50 bg-slate-800/20 hover:bg-slate-800/40"
            }
            ${!file && "animate-pulse-border"}
          `}
        >
          <input
            id="fileInput"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex flex-col items-center gap-3">
            {file ? (
              <>
                <div className="p-3 bg-purple-500/20 rounded-full animate-scale-check">
                  <CheckCircle className="w-8 h-8 text-purple-400" />
                </div>
                <div className="text-white font-medium truncate max-w-full px-4">
                  {file.name}
                </div>
                <div className="text-xs text-slate-400">
                  Click or drag to replace
                </div>
              </>
            ) : (
              <>
                <div className="p-3 bg-slate-700/50 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-8 h-8 text-slate-400 group-hover:text-purple-400 transition-colors" />
                </div>
                <div className="text-white font-medium">
                  Click to upload or drag and drop
                </div>
                <div className="text-xs text-slate-400">
                  PDF only · Max 10MB
                </div>
              </>
            )}
          </div>
        </div>
        {/* ===== END ANIMATED UPLOAD AREA ===== */}

        {error && (
          <p className="text-red-400 text-sm mb-4 animate-shake">
            {error}
          </p>
        )}

        {loading ? (
          <div className="flex items-center justify-center gap-2 text-purple-400">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Analyzing all pages...</span>
          </div>
        ) : (
          <button
            onClick={handleAnalyze}
            className="w-full bg-gradient-to-r from-[#6D28D9] to-[#9333EA] hover:from-[#5B21B6] hover:to-[#7E22CE] transition-all duration-300 text-white py-2 rounded-lg shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98]"
          >
            Analyze & Generate Resume
          </button>
        )}
      </div>
    </div>
  );
}