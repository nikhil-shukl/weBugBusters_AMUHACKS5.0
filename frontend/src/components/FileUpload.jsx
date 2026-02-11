import React, { useState } from 'react';
import { Upload, File, X, AlertCircle } from 'lucide-react';

const FileUpload = ({ onFileSelect, disabled }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);

  const validateFile = (file) => {
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file only');
      return false;
    }
    const maxSize = 2 * 1024 * 1024; // 2MB
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
          className={`upload-dropzone group ${isDragging ? 'border-cyan-400 bg-cyan-500/5' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
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
            className={`flex flex-col items-center space-y-6 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {/* Animated Upload Icon */}
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl group-hover:scale-105 transition-transform duration-300">
                <Upload className="w-12 h-12 text-cyan-400 animate-float-slow" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-xl font-semibold text-slate-200">
                Drop your project PDF here or{' '}
                <span className="text-cyan-400 underline decoration-cyan-400/30 hover:decoration-cyan-400 transition-all">choose a file</span>
              </p>
              <p className="text-sm text-slate-400">
                PDF only. Max 2MB file size.
              </p>
            </div>

            {/* Privacy Badge */}
            <div className="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
              <svg className="w-4 h-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" />
              </svg>
              <span className="text-xs text-slate-300 font-medium tracking-wide uppercase">Privacy guaranteed</span>
            </div>
          </label>
        </div>
      ) : (
        /* Selected File State */
        <div className="glass-panel p-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 shadow-inner">
                <File className="w-7 h-7 text-cyan-400" />
              </div>
              <div>
                <p className="font-semibold text-slate-200 text-lg">{selectedFile.name}</p>
                <p className="text-sm text-cyan-400/80 font-medium">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <button
              onClick={removeFile}
              disabled={disabled}
              className={`p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400 transition-all duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <X className="w-5 h-5 text-slate-400 transition-colors" />
            </button>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mt-6 flex items-center space-x-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl backdrop-blur-md animate-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-200 font-medium">{error}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;