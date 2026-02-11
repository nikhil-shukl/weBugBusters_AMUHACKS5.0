import React, { useState } from 'react';
import { analyzeProject } from '../services/api';
import FileUpload from '../components/FileUpload';
import SkillCard from '../components/SkillCard';
import Loader from '../components/Loader';
import { Brain, Sparkles, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

const ProjectAnalyzer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setResults(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const data = await analyzeProject(selectedFile);
      setResults(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze project. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Header Section */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">Bridge-AI</h1>
                <p className="text-sm text-slate-600">Academic-to-Career Skill Verification Platform</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 px-4 py-2 bg-primary-50 rounded-lg border border-primary-200">
              <Sparkles className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-primary-700">Evidence-Based AI</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero Section */}
        {!results && !isAnalyzing && (
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent-50 rounded-full mb-6">
              <TrendingUp className="w-4 h-4 text-accent-600" />
              <span className="text-sm font-medium text-accent-700">Trusted by Students & Recruiters</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              Verify Your Skills with
              <span className="gradient-text"> Real Evidence</span>
            </h2>
            
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Upload your project documentation and get AI-powered skill verification backed by actual evidence from your work
            </p>
          </div>
        )}

        {/* Upload Section */}
        {!isAnalyzing && !results && (
          <div className="max-w-2xl mx-auto">
            <FileUpload onFileSelect={handleFileSelect} disabled={isAnalyzing} />

            <div className="mt-8 text-center">
              <button
                onClick={handleAnalyze}
                disabled={!selectedFile || isAnalyzing}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  selectedFile && !isAnalyzing
                    ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transform'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <Brain className="w-5 h-5" />
                  <span>Analyze Project</span>
                </span>
              </button>

              <p className="text-sm text-slate-500 mt-4">
                No signup required • Privacy guaranteed • Free to use
              </p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isAnalyzing && <Loader />}

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
              <div className="flex items-start space-x-4">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-1">Analysis Failed</h3>
                  <p className="text-red-700">{error}</p>
                  <button
                    onClick={() => {
                      setError(null);
                      setResults(null);
                    }}
                    className="mt-3 text-sm text-red-600 underline hover:text-red-800"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {results && !isAnalyzing && (
          <div className="space-y-8">
            {/* Results Header */}
            <div className="text-center pb-8 border-b border-slate-200">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-50 rounded-full mb-4">
                <CheckCircle className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-medium text-primary-700">Analysis Complete</span>
              </div>

              <h2 className="text-3xl font-bold text-slate-900 mb-3">
                {results.skills?.length || 0} Skills Verified
              </h2>
              <p className="text-slate-600 text-lg">
                Each skill is backed by actual evidence from your project
              </p>

              <button
                onClick={() => {
                  setResults(null);
                  setSelectedFile(null);
                }}
                className="mt-6 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
              >
                Analyze Another Project
              </button>
            </div>

            {/* Skills Grid */}
            <div className="space-y-6">
              {results.skills && results.skills.length > 0 ? (
                results.skills.map((skill, index) => (
                  <SkillCard key={index} skill={skill} />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-600">No skills found in the document. Please try uploading a different project.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center text-slate-600">
            <p className="text-sm">
              Built for <span className="font-semibold text-slate-800">AMUHACKS 5.0</span> | 
              Evidence-based AI for Academic-to-Career Skill Verification
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProjectAnalyzer;
