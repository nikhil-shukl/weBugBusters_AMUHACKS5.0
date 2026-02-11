// src/pages/ResumeWorkspace.jsx

import { useLocation } from "react-router-dom";
import { useState } from "react";
import ResumePreviewModal from "./ResumePreviewModal";

import { generateResumeHTML } from "../templates/modernResumeTemplate";

export default function ResumeWorkspace() {
  const location = useLocation();
  const analysis = location.state?.analysis;

  const [showPreview, setShowPreview] = useState(false);

  if (!analysis) {
    return (
      <div className="p-10 text-white">
        No resume data found. Please upload again.
      </div>
    );
  }

  const handleDownload = async () => {
    try {
      const htmlContent = generateResumeHTML(analysis);

      const response = await fetch(
        "http://localhost:5000/api/download-resume",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ html: htmlContent }),
        }
      );

      if (!response.ok) {
        throw new Error("PDF generation failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

    } catch (error) {
      console.error("Download error:", error);
      alert("Download failed. Check backend console.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1026] text-white p-10">

      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Resume Workspace</h1>

        <div className="space-x-4">
          <button
            onClick={() => setShowPreview(true)}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
          >
            Preview
          </button>

          <button
            onClick={handleDownload}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg"
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* Quick Summary Section */}
      <div className="bg-[#11172F] p-6 rounded-xl border border-white/10">
        <h2 className="text-xl font-semibold mb-3">
          Professional Summary
        </h2>

        <p className="text-slate-300">
          {analysis.professional_summary}
        </p>
      </div>

      {/* Preview Modal */}
      <ResumePreviewModal
        show={showPreview}
        onClose={() => setShowPreview(false)}
        resumeData={analysis}
      />
    </div>
  );
}
