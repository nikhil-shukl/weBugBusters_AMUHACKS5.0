import React, { useState } from 'react';
import { analyzeProject } from '../services/api';
import FileUpload from '../components/FileUpload';
import SkillCard from '../components/SkillCard';
import Loader from '../components/Loader';
import { Brain, Sparkles, TrendingUp, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen pb-24 flex flex-col">
      {/* Sticky Glassmorphic Header */}
      <header className="bg-[#020617]/50 backdrop-blur-2xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Area */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#22d3ee] to-[#c084fc] shadow-lg shadow-cyan-500/20">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight leading-none">Bridge-AI</h1>
                <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-widest">by weBugBusters</p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 rounded-full border border-cyan-500/20">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-300">Evidence-Based AI</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-5xl mx-auto px-6 py-16 w-full">
        
        {/* Hero Section */}
        {!results && !isAnalyzing && (
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full mb-8 shadow-lg">
              <TrendingUp className="w-4 h-4 text-[#f472b6]" />
              <span className="text-sm font-medium text-slate-300">Trusted by Students & Recruiters</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Verify Your Skills with <br/>
              <span className="gradient-heading">Real Evidence</span>
            </h2>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Upload your project documentation and let our AI extract, verify, and quantify your market-ready skills.
            </p>
          </div>
        )}

        {/* Interactive Upload Section */}
        {!isAnalyzing && !results && (
          <div className="max-w-2xl mx-auto animate-in fade-in duration-1000 delay-150">
            <FileUpload onFileSelect={handleFileSelect} disabled={isAnalyzing} />

            <div className="mt-10 text-center">
              <button
                onClick={handleAnalyze}
                disabled={!selectedFile || isAnalyzing}
                className={`w-full md:w-auto flex items-center justify-center space-x-3 mx-auto ${
                  selectedFile && !isAnalyzing 
                    ? 'btn-primary-glow text-lg' 
                    : 'px-8 py-4 rounded-xl font-bold text-slate-500 bg-white/5 border border-white/10 cursor-not-allowed text-lg'
                }`}
              >
                <Brain className="w-6 h-6" />
                <span>Analyze Project</span>
                {selectedFile && !isAnalyzing && <ArrowRight className="w-5 h-5 ml-2" />}
              </button>

              <p className="text-sm text-slate-500 mt-6 font-medium">
                No signup required • Secure Processing • Fast Results
              </p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isAnalyzing && (
          <div className="animate-in fade-in duration-300">
             <Loader />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 animate-in slide-in-from-bottom-4">
            <div className="glass-panel border-red-500/30 bg-red-500/10 p-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
              <div className="flex items-start space-x-5">
                <AlertCircle className="w-8 h-8 text-red-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-red-200 mb-2">Analysis Failed</h3>
                  <p className="text-red-300/80 mb-4">{error}</p>
                  <button
                    onClick={() => { setError(null); setResults(null); }}
                    className="px-5 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-lg font-medium transition-colors"
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
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center pb-12 border-b border-white/10">
              <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6 shadow-lg shadow-emerald-500/5">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold text-emerald-300 tracking-wide uppercase">Analysis Complete</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                <span className="gradient-heading">{results.skills?.length || 0} Verified Skills</span> Found
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                We've analyzed your documentation and mapped these capabilities directly to industry demands.
              </p>

              <button
                onClick={() => { setResults(null); setSelectedFile(null); }}
                className="mt-10 btn-secondary-outline"
              >
                Analyze Another Project
              </button>
            </div>

            {/* Skills Grid Mapping */}
            <div className="space-y-6 max-w-4xl mx-auto">
              {results.skills && results.skills.length > 0 ? (
                results.skills.map((skill, index) => (
                  <div key={index} className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${index * 100}ms` }}>
                    <SkillCard skill={skill} />
                  </div>
                ))
              ) : (
                <div className="glass-panel text-center py-16">
                  <AlertCircle className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-slate-300 mb-2">No Clear Skills Detected</h3>
                  <p className="text-slate-500 max-w-md mx-auto">We couldn't extract definitive technical skills from this document. Try uploading a more detailed project report or technical specification.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/10 bg-[#020617]/80 backdrop-blur-xl mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-500 text-sm font-medium">
              Built for <span className="font-bold text-slate-300">AMUHACKS 5.0</span>
            </div>
            <div className="text-slate-600 text-sm">
              &copy; {new Date().getFullYear()} weBugBusters. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProjectAnalyzer;