// ResumeWorkspace.jsx

import { useLocation } from "react-router-dom";
import { useState } from "react";
import ResumePreviewModal from "../components/ResumePreviewModal";

export default function ResumeWorkspace() {
  const location = useLocation();
  const analysis = location.state?.analysis;

  const [showPreview, setShowPreview] = useState(false);

  const [resumeData, setResumeData] = useState({
    professional_summary: analysis.professional_summary,
    technical_skills: analysis.technical_skills,
    project_experience: analysis.project_experience,
  });

  return (
    <div className="min-h-screen bg-[#0B1026] text-white p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Resume Workspace</h1>

        <div>
          <button
            onClick={() => setShowPreview(true)}
            className="bg-green-500 px-4 py-2 rounded-lg"
          >
            Preview & Download
          </button>
        </div>
      </div>

      <textarea
        value={resumeData.professional_summary}
        onChange={(e) =>
          setResumeData({
            ...resumeData,
            professional_summary: e.target.value,
          })
        }
        className="w-full bg-[#11172F] p-4 rounded-lg mb-6"
        rows={4}
      />

      <ResumePreviewModal
        show={showPreview}
        onClose={() => setShowPreview(false)}
        resumeData={resumeData}
      />
    </div>
  );
}
