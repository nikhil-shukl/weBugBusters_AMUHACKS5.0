import React, { useMemo } from 'react';
import { useResults } from '../context/ResultsContext';
import RadarChartView from '../components/RadarChartView';
import { 
  Target, 
  TrendingUp, 
  Award, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

const SkillChartPage = () => {
  const { results } = useResults();

  // ----- Find strongest category -----
  const strongestCategory = useMemo(() => {
    if (!results?.skills) return null;
    
    const counts = {};
    results.skills.forEach(skill => {
      const cat = skill.category?.toLowerCase() || 'other';
      counts[cat] = (counts[cat] || 0) + 1;
    });

    let maxCat = null;
    let maxCount = 0;
    Object.entries(counts).forEach(([cat, count]) => {
      if (count > maxCount) {
        maxCount = count;
        maxCat = cat;
      }
    });

    return maxCat ? { name: maxCat.charAt(0).toUpperCase() + maxCat.slice(1), count: maxCount } : null;
  }, [results]);

  // ----- No data -----
  if (!results?.skills) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="glass-panel max-w-2xl w-full p-12 text-center">
          <Target className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">No skills yet</h2>
          <p className="text-slate-400 text-lg mb-8">Analyze a project first – we'll map your skill strengths.</p>
          <a
            href="/analyzer"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/30 transition-all transform hover:scale-105"
          >
            <span>Go to Analyzer</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">

      {/* ===== HEADER – 2 SECONDS ===== */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
            SKILL PROFILE
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          Your <span className="gradient-heading">strengths</span>
        </h1>
        <p className="text-slate-400 text-lg">
          Each category = number of verified skills.
        </p>
      </div>

      {/* ===== DOMINANT CATEGORY – BIG & BOLD ===== */}
      {strongestCategory && (
        <div className="glass-panel p-8 max-w-lg mx-auto text-center border border-cyan-500/30">
          <div className="text-sm text-slate-400 uppercase tracking-wider mb-1">Strongest area</div>
          <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">{strongestCategory.name}</div>
          <div className="flex items-center justify-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" />
            <span className="text-slate-300">{strongestCategory.count} verified skills</span>
          </div>
        </div>
      )}

      {/* ===== RADAR CHART – FULL WIDTH, CLEAN ===== */}
      <div className="glass-panel p-6 md:p-8">
        <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
          <TrendingUp className="w-5 h-5 text-cyan-400" />
          <h2 className="text-xl font-semibold text-white">Category breakdown</h2>
        </div>
        <div className="h-[400px] md:h-[500px] w-full">
          <RadarChartView skills={results.skills} />
        </div>
      </div>

      {/* ===== SIMPLE ACTION ===== */}
    
<div className="glass-panel p-8 text-center border border-cyan-500/30 bg-gradient-to-br from-cyan-900/10 to-purple-900/10">
  <h3 className="text-2xl font-bold text-white mb-2">📊 See how you compare</h3>
  <p className="text-slate-300 mb-6 max-w-lg mx-auto">
    Your strongest category is <span className="text-cyan-400 font-semibold">{strongestCategory?.name || 'technical'}</span>.
    Find out where you stand against market demand.
  </p>
  <a
    href="/skill-gap"
    className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/30 transition-all transform hover:scale-105"
  >
    <span>View skill gap</span>
    <ArrowRight className="w-5 h-5" />
  </a>
</div>
      

      {/* ===== FOOTER – TOTAL SKILLS ===== */}
      <div className="text-center text-sm text-slate-500">
        <span className="text-cyan-400 font-semibold">{results.skills?.length || 0}</span> verified skills
      </div>

    </div>
  );
};

export default SkillChartPage;