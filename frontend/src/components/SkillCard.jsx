import React from 'react';
import { CheckCircle2, FileText, Quote } from 'lucide-react';

const SkillCard = ({ skill }) => {
  return (
    <div className="bg-white rounded-2xl p-6 card-shadow border border-slate-100 hover:border-primary-200 transition-all duration-300 group">
      <div className="flex items-start space-x-4">
        {/* Checkmark Icon */}
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 group-hover:bg-primary-100 transition-colors duration-300">
            <CheckCircle2 className="w-6 h-6 text-primary-600" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-3">
          {/* Skill Name */}
          <h3 className="text-xl font-bold text-slate-800 group-hover:text-primary-700 transition-colors duration-300">
            {skill.name}
          </h3>

          {/* Evidence Section */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <FileText className="w-4 h-4 text-accent-500" />
              <span className="font-medium">Evidence from project:</span>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-400 to-accent-400 rounded-full"></div>
              <div className="pl-6 pr-4 py-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-start space-x-2">
                  <Quote className="w-4 h-4 text-accent-400 flex-shrink-0 mt-1" />
                  <p className="text-slate-700 italic leading-relaxed">
                    "{skill.evidence}"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Project Info (if available) */}
          {skill.project && (
            <div className="flex items-center space-x-2 text-sm">
              <div className="px-3 py-1 bg-accent-50 text-accent-700 rounded-lg font-medium">
                {skill.project}
              </div>
            </div>
          )}

          {/* Section Info (if available) */}
          {skill.section && (
            <p className="text-xs text-slate-500">
              Found in: <span className="font-medium">{skill.section}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
