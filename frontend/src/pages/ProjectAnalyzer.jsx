import React, { useState } from 'react';
import { useResults } from '../context/ResultsContext';
import jsPDF from 'jspdf';
import { analyzeProject } from '../services/api';
import FileUpload from '../components/FileUpload';
import Loader from '../components/Loader';

import {
  Brain,
  Sparkles,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Download
} from 'lucide-react';

const ProjectAnalyzer = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const { results, setResults } = useResults();

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

  // ===== PROFESSIONAL PDF REPORT – PAGE BREAKS, PERFECT SPACING =====
  const downloadReport = () => {
    if (!results) return;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 50;
    let y = margin;
    let pageNumber = 1;

    pdf.setFont('times', 'normal');

    const addNewPage = () => {
      pdf.addPage();
      pageNumber++;
      y = margin;
      pdf.setFontSize(10);
      pdf.setFont('times', 'italic');
      pdf.setTextColor(100, 100, 100);
      pdf.text('Bridge-AI Skill Verification Report', margin, margin - 10);
      y = margin;
    };

    const checkPageBreak = (requiredSpace) => {
      if (y + requiredSpace > pageHeight - margin * 2) {
        addNewPage();
        return true;
      }
      return false;
    };

    const addMainTitle = (text) => {
      pdf.setFontSize(24);
      pdf.setFont('times', 'bold');
      pdf.setTextColor(30, 58, 138);
      pdf.text(text, margin, y);
      y += 35;
    };

    const addSectionTitle = (text) => {
      checkPageBreak(30);
      pdf.setFontSize(16);
      pdf.setFont('times', 'bold');
      pdf.setTextColor(30, 58, 138);
      pdf.text(text, margin, y);
      y += 25;
    };

    const addBodyText = (text, indent = 0, lineHeight = 18) => {
      pdf.setFontSize(11);
      pdf.setFont('times', 'normal');
      pdf.setTextColor(0, 0, 0);
      const lines = pdf.splitTextToSize(text, pageWidth - margin * 2 - indent);
      const requiredSpace = lines.length * lineHeight + 4;
      checkPageBreak(requiredSpace);
      pdf.text(lines, margin + indent, y);
      y += requiredSpace;
    };

    const addBulletPoint = (text, lineHeight = 18) => {
      pdf.setFontSize(11);
      pdf.setFont('times', 'normal');
      pdf.setTextColor(0, 0, 0);
      const lines = pdf.splitTextToSize(text, pageWidth - margin * 2 - 20);
      const requiredSpace = lines.length * lineHeight + 2;
      checkPageBreak(requiredSpace);
      pdf.text('•', margin, y);
      pdf.text(lines, margin + 20, y);
      y += requiredSpace;
    };

    const addDivider = () => {
      checkPageBreak(15);
      y += 5;
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.5);
      pdf.line(margin, y, pageWidth - margin, y);
      y += 15;
    };

    const addScore = (score) => {
      checkPageBreak(45);
      pdf.setFontSize(32);
      pdf.setFont('times', 'bold');
      pdf.setTextColor(30, 58, 138);
      pdf.text(`${score} / 100`, margin, y);
      y += 45;
    };

    const addSkill = (skill) => {
      pdf.setFontSize(12);
      pdf.setFont('times', 'bold');
      pdf.setTextColor(30, 58, 138);
      const nameLines = pdf.splitTextToSize(`• ${skill.name}`, pageWidth - margin * 2);
      const nameHeight = nameLines.length * 16;
      checkPageBreak(nameHeight + 40);
      pdf.text(nameLines, margin, y);
      y += nameHeight;

      pdf.setFontSize(10);
      pdf.setFont('times', 'italic');
      pdf.setTextColor(80, 80, 80);
      pdf.text(`${skill.category}  |  ${skill.depth}`, margin + 20, y - 8);

      pdf.setFontSize(10);
      pdf.setFont('times', 'normal');
      pdf.setTextColor(0, 0, 0);
      const evidenceLines = pdf.splitTextToSize(
        `"${skill.evidence}"`,
        pageWidth - margin * 2 - 40
      );
      const evidenceHeight = evidenceLines.length * 16;
      checkPageBreak(evidenceHeight + 10);
      pdf.text(evidenceLines, margin + 20, y);
      y += evidenceHeight + 12;
    };

    // ----- Build PDF -----
    addMainTitle('Bridge-AI Skill Verification Report');
    pdf.setFontSize(11);
    pdf.setFont('times', 'italic');
    pdf.setTextColor(80, 80, 80);
    const dateStr = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    pdf.text(`Generated: ${dateStr}`, margin, y);
    y += 35;
    addDivider();

    addSectionTitle('1. Professional Summary');
    addBodyText(results.summary || 'No summary available.', 0, 18);
    addDivider();

    addSectionTitle('2. Career Readiness Score');
    addScore(results.career_readiness_score || 0);
    addDivider();

    addSectionTitle(`3. Verified Skills (${results.skills?.length || 0})`);
    if (results.skills && results.skills.length > 0) {
      results.skills.forEach((skill) => addSkill(skill));
    } else {
      addBodyText('No skills found.', 0, 18);
    }
    addDivider();

    addSectionTitle('4. Industry Gap Analysis');
    if (results.industry_gap_analysis && results.industry_gap_analysis.length > 0) {
      results.industry_gap_analysis.forEach((gap) => addBulletPoint(gap, 18));
    } else {
      addBodyText('No gaps identified.', 0, 18);
    }
    addDivider();

    addSectionTitle('5. Suggested Skills to Learn');
    if (results.suggested_skills_to_learn && results.suggested_skills_to_learn.length > 0) {
      results.suggested_skills_to_learn.forEach((skill) => addBulletPoint(skill, 18));
    } else {
      addBodyText('No suggestions available.', 0, 18);
    }
    addDivider();

    addSectionTitle('6. Recommended Job Roles');
    if (results.recommended_job_roles && results.recommended_job_roles.length > 0) {
      results.recommended_job_roles.forEach((role) => addBulletPoint(role, 18));
    } else {
      addBodyText('No roles recommended.', 0, 18);
    }

    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      pdf.setPage(i);
      const footerY = pageHeight - margin / 2;
      pdf.setFontSize(9);
      pdf.setFont('times', 'italic');
      pdf.setTextColor(120, 120, 120);
      pdf.text('Bridge‑AI · weBugBusters · AMUHACKS 5.0', margin, footerY);
      pdf.text(
        `Page ${i} of ${totalPages}`,
        pageWidth - margin - 40,
        footerY,
        { align: 'right' }
      );
    }

    pdf.save(`Bridge-AI_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <div className="min-h-screen pb-24 flex flex-col bg-[#020617]">
      {/* Sticky Header */}
      <header className="bg-[#020617]/50 backdrop-blur-2xl border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#22d3ee] to-[#c084fc] shadow-lg shadow-cyan-500/20">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight leading-none">Bridge-AI</h1>
                <p className="text-xs text-slate-400 font-medium mt-1 uppercase tracking-widest">by weBugBusters</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 rounded-full border border-cyan-500/20">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-300">Evidence-Based AI</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-5xl mx-auto px-6 py-16 w-full">
        {/* Hero Section */}
        {!results && !isAnalyzing && (
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full mb-8 shadow-lg">
              <TrendingUp className="w-4 h-4 text-[#f472b6]" />
              <span className="text-sm font-medium text-slate-300">Trusted by Students & Recruiters</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Verify Your Skills with <br />
              <span className="gradient-heading">Real Evidence</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Upload your project documentation and let our AI extract, verify, and quantify your market-ready skills.
            </p>
          </div>
        )}

        {/* Upload Section */}
        {!isAnalyzing && !results && (
          <div className="max-w-2xl mx-auto animate-in fade-in duration-1000 delay-150">
            <FileUpload onFileSelect={handleFileSelect} disabled={isAnalyzing} />
            <div className="mt-10 text-center">
              {/* ===== UPDATED PREMIUM ANALYZE BUTTON ===== */}
              <button
                onClick={handleAnalyze}
                disabled={!selectedFile || isAnalyzing}
                className={`
                  w-full md:w-auto flex items-center justify-center space-x-3 mx-auto px-10 py-5
                  text-lg font-bold rounded-xl transition-all duration-300 transform
                  ${
                    selectedFile && !isAnalyzing
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-white shadow-lg shadow-cyan-500/40 hover:shadow-cyan-400/60 hover:scale-105'
                      : 'bg-white/5 border border-white/10 text-slate-500 cursor-not-allowed'
                  }
                `}
              >
                <Brain className="w-6 h-6" />
                <span>Analyze Project</span>
                {selectedFile && !isAnalyzing && <ArrowRight className="w-5 h-5 ml-2 animate-pulse" />}
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
                    onClick={() => {
                      setError(null);
                      setResults(null);
                    }}
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
                <span className="text-sm font-bold text-emerald-300 tracking-wide uppercase">
                  Analysis Complete
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                <span className="gradient-heading">{results.skills?.length || 0} Verified Skills</span> Found
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                We've analyzed your documentation and mapped these capabilities directly to industry demands.
              </p>
            </div>

            {/* Professional Summary */}
            <div className="glass-panel p-8 space-y-6">
              <h3 className="text-2xl font-bold text-white">Professional Summary</h3>
              <p className="text-slate-300 leading-relaxed">{results.summary}</p>
              <div className="mt-4">
                <div className="text-sm text-slate-400 mb-2">Career Readiness Score</div>
                <div className="w-full bg-slate-800 rounded-full h-3">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                    style={{ width: `${results.career_readiness_score}%` }}
                  ></div>
                </div>
                <p className="text-cyan-400 font-bold mt-2">{results.career_readiness_score} / 100</p>
              </div>
            </div>

            {/* Skills List */}
            <div className="glass-panel p-8">
              <h3 className="text-2xl font-bold text-white mb-8">
                Verified Skills ({results.skills?.length})
              </h3>
              <ul className="space-y-6">
                {results.skills.map((skill, index) => (
                  <li key={index} className="border-b border-white/10 pb-6 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-lg font-semibold text-cyan-300">• {skill.name}</span>
                      <span className="text-sm text-slate-400 bg-white/5 px-3 py-1 rounded-full">
                        {skill.category} | {skill.depth}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mt-2 italic pl-5 border-l-2 border-cyan-500/30">
                      "{skill.evidence}"
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industry Gap Analysis */}
            <div className="glass-panel p-8">
              <h3 className="text-2xl font-bold text-red-400 mb-4">Industry Gap Analysis</h3>
              <ul className="list-disc pl-6 space-y-2 text-slate-300">
                {results.industry_gap_analysis?.map((gap, index) => (
                  <li key={index}>{gap}</li>
                ))}
              </ul>
            </div>

            {/* Suggested Skills to Learn */}
            <div className="glass-panel p-8">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4">Suggested Skills to Learn</h3>
              <div className="flex flex-wrap gap-3">
                {results.suggested_skills_to_learn?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-300 text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended Job Roles */}
            <div className="glass-panel p-8">
              <h3 className="text-2xl font-bold text-emerald-400 mb-4">Recommended Job Roles</h3>
              <div className="flex flex-wrap gap-3">
                {results.recommended_job_roles?.map((role, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-300 text-sm font-semibold"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-16">
              <button
                onClick={() => {
                  setResults(null);
                  setSelectedFile(null);
                }}
                className="group relative px-10 py-5 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl 
                         hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300 
                         shadow-lg hover:shadow-cyan-500/10 transform hover:scale-[1.02]"
              >
                <span className="relative z-10 flex items-center justify-center space-x-3">
                  <span className="text-lg font-semibold text-white/90 group-hover:text-white transition-colors">
                    Analyze Another Project
                  </span>
                  <ArrowRight className="w-5 h-5 text-cyan-400/70 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>

              <button
                onClick={downloadReport}
                className="flex items-center justify-center space-x-3 px-10 py-5 
                         bg-gradient-to-r from-cyan-600 to-purple-600 
                         hover:from-cyan-500 hover:to-purple-500 
                         text-white font-bold rounded-xl 
                         shadow-lg shadow-cyan-500/30 
                         transition-all duration-300 transform hover:scale-105"
              >
                <Download className="w-5 h-5" />
                <span className="text-lg">Download Report</span>
              </button>
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