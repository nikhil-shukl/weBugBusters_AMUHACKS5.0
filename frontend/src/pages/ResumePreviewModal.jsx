import { generateResumeHTML } from "../templates/modernResumeTemplate";

export default function ResumePreviewModal({
  show,
  onClose,
  resumeData,
}) {
  if (!show) return null;

  const htmlContent = generateResumeHTML(resumeData);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white w-[850px] h-[90vh] rounded-xl overflow-hidden shadow-2xl flex flex-col">

        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Resume Preview</h2>
          <button
            onClick={onClose}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          <iframe
            title="Resume Preview"
            srcDoc={htmlContent}
            className="w-full h-full"
          />
        </div>

      </div>
    </div>
  );
}
