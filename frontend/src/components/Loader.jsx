import React, { useState, useEffect } from 'react';
import { Brain, FileText, Code, Sparkles, CheckCircle, Loader2 } from 'lucide-react';

const Loader = () => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    { icon: FileText, text: 'Reading project documentation...', color: 'text-cyan-400' },
    { icon: Code, text: 'Identifying skills and technologies...', color: 'text-purple-400' },
    { icon: Brain, text: 'Extracting evidence from content...', color: 'text-emerald-400' },
    { icon: Sparkles, text: 'Generating career insights...', color: 'text-amber-400' }
  ];

  // Cycle through steps every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Animated Logo */}
      <div className="relative mb-12">
        {/* Outer glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-full blur-2xl animate-pulse"></div>
        
        {/* Main icon */}
        <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 flex items-center justify-center animate-float-slow">
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-purple-400 animate-spin-slow"></div>
          <Brain className="w-14 h-14 text-cyan-400 animate-pulse-slow" />
        </div>
      </div>

      {/* Main message */}
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 text-center">
        Analyzing Your Project
      </h2>
      <p className="text-slate-400 text-lg mb-10 text-center max-w-md">
        Our AI is extracting skills with real evidence...
      </p>

      {/* Animated Progress Bar */}
      <div className="w-full max-w-md bg-slate-800/50 rounded-full h-3 mb-10 overflow-hidden border border-white/10">
        <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 animate-shimmer"></div>
      </div>

      {/* Current step with animated icon */}
      <div className="flex items-center gap-4 glass-panel px-6 py-4 min-w-[300px] justify-center">
        <div className="relative">
          {React.createElement(steps[currentStep].icon, {
            className: `w-6 h-6 ${steps[currentStep].color} animate-pulse`
          })}
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></span>
        </div>
        <span className="text-slate-200 text-lg font-medium">
          {steps[currentStep].text}
        </span>
      </div>

      {/* Subtle time hint */}
      <p className="text-slate-500 text-sm mt-8 flex items-center gap-2">
        <Loader2 className="w-4 h-4 animate-spin" />
        This usually takes 10–15 seconds
      </p>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-float-slow {
          animation: float-slow 5s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-shimmer {
          width: 50%;
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Loader;