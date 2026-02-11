import React, { useState } from 'react';
import { Upload, File, X, AlertCircle } from 'lucide-react';

const FileUpload = ({ onFileSelect, disabled }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);

  const validateFile = (file) => {
    // Check file type
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file only');
      return false;
    }

    // Check file size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
      setError('File size must be less than 2MB');
      return false;
    }

    setError(null);
    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = () => {
    setSelectedFile(null);
    onFileSelect(null);
    setError(null);
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`upload-area ${isDragging ? 'upload-area-active' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            disabled={disabled}
            className="hidden"
            id="file-upload"
          />

          <label
            htmlFor="file-upload"
            className={`flex flex-col items-center space-y-4 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary-400 blur-2xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl p-6">
                <Upload className="w-12 h-12 text-primary-600" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-lg font-semibold text-slate-800">
                Drop your project PDF here or{' '}
                <span className="text-primary-600 underline">choose a file</span>
              </p>
              <p className="text-sm text-slate-600">
                PDF only. Max 2MB file size.
              </p>
            </div>

            <div className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg border border-slate-200">
              <svg className="w-4 h-4 text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
              </svg>
              <span className="text-xs text-slate-600 font-medium">Privacy guaranteed</span>
            </div>
          </label>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-6 border-2 border-primary-200 card-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50">
                <File className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-800">{selectedFile.name}</p>
                <p className="text-sm text-slate-600">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              disabled={disabled}
              className={`p-2 rounded-lg hover:bg-slate-100 transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <X className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-xl">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
