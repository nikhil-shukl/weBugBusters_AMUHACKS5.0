export default function ResumePreviewModal({
  show,
  onClose,
  resumeData,
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
      <div className="bg-white text-black w-[800px] p-8 rounded-xl">
        <h2 className="text-xl font-bold mb-4">
          Resume Preview
        </h2>

        <p>{resumeData.professional_summary}</p>

        <button
          onClick={onClose}
          className="mt-6 bg-purple-600 px-4 py-2 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
