import React from 'react';
import { useResults } from '../context/ResultsContext';
import RadarChartView from '../components/RadarChartView';
import { BarChart3 } from 'lucide-react';

const SkillChartPage = () => {
  const { results } = useResults();

  if (!results?.skills) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <div className="glass-panel p-12 max-w-2xl">
          <BarChart3 className="w-16 h-16 text-slate-600 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">No Skills Data Available</h2>
          <p className="text-slate-400 mb-8">
            Please analyze a project first to see your skill category strength visualization.
          </p>
          <a
            href="/analyzer"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl transition-colors"
          >
            <span>Go to Dashboard</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          <span className="gradient-heading">Skill Category Strength</span>
        </h1>
        <p className="text-slate-400 text-lg">
          Visual distribution of your verified skills across different domains.
        </p>
      </div>

      <div className="glass-panel p-8">
        <RadarChartView skills={results.skills} />
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {['technical', 'soft skills', 'management', 'analytics', 'security', 'testing', 'devops'].map((cat) => {
          const count = results.skills.filter(s => s.category?.toLowerCase() === cat).length;
          return (
            <div key={cat} className="glass-panel p-4 text-center">
              <div className="text-sm text-slate-400 uppercase tracking-wider">{cat}</div>
              <div className="text-3xl font-bold text-cyan-400 mt-1">{count}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillChartPage;