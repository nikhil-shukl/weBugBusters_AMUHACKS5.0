import React from 'react';
import { Loader2, Sparkles, FileSearch } from 'lucide-react';

const Loader = () => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-12 mb-8">
      <div className="bg-white rounded-3xl p-12 card-shadow">
        <div className="flex flex-col items-center space-y-6">
          {/* Animated Icon */}
          <div className="relative">
            <div className="absolute inset-0 bg-primary-400 blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-primary-500 to-accent-500 rounded-full p-6">
              <Loader2 className="w-12 h-12 text-white animate-spin" />
            </div>
          </div>

          {/* Main Text */}
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-bold text-slate-800">
              Analyzing Your Project
            </h3>
            <p className="text-slate-600 text-lg">
              Our AI is extracting skills with real evidence...
            </p>
          </div>

          {/* Progress Steps */}
          <div className="w-full space-y-4 mt-8">
            <div className="flex items-center space-x-4 text-slate-700">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100">
                <FileSearch className="w-4 h-4 text-primary-600" />
              </div>
              <p className="text-sm font-medium">Reading project documentation</p>
              <div className="flex-1 h-1 bg-primary-200 rounded-full overflow-hidden">
                <div className="h-full bg-primary-500 rounded-full animate-pulse" style={{ width: '100%' }}></div>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-slate-700">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-accent-100">
                <Sparkles className="w-4 h-4 text-accent-600" />
              </div>
              <p className="text-sm font-medium">Identifying skills and technologies</p>
              <div className="flex-1 h-1 bg-accent-200 rounded-full overflow-hidden">
                <div className="h-full bg-accent-500 rounded-full animate-pulse" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-slate-700 opacity-60">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100">
                <Sparkles className="w-4 h-4 text-slate-400" />
              </div>
              <p className="text-sm font-medium">Extracting evidence from content</p>
              <div className="flex-1 h-1 bg-slate-200 rounded-full"></div>
            </div>
          </div>

          {/* Estimated Time */}
          <p className="text-sm text-slate-500 mt-6">
            This usually takes 10-15 seconds
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
