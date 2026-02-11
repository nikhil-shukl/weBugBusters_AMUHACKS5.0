import React, { useMemo } from 'react';
import { useResults } from '../context/ResultsContext';
import { marketDemand } from '../data/marketDemand';
import { 
  Scale, 
  AlertCircle, 
  CheckCircle, 
  TrendingUp, 
  ArrowRight, 
  Target,
  Circle,
  Zap
} from 'lucide-react';

const SkillGapPage = () => {
  const { results } = useResults();

  // ----- Calculate user counts and gaps -----
  const categoryData = useMemo(() => {
    if (!results?.skills) return [];

    const userCounts = {};
    results.skills.forEach(skill => {
      const cat = skill.category?.toLowerCase() || 'other';
      userCounts[cat] = (userCounts[cat] || 0) + 1;
    });

    // Build array, compute gap, then sort by gap ASCENDING (best first)
    return Object.entries(marketDemand)
      .map(([category, demand]) => {
        const user = userCounts[category] || 0;
        const gap = demand - user;
        return {
          category: category.charAt(0).toUpperCase() + category.slice(1),
          user,
          demand,
          gap,
          status: gap <= 0 ? 'good' : gap <= 2 ? 'near' : 'gap',
          percent: demand > 0 ? Math.min(100, (user / demand) * 100) : 100
        };
      })
      .sort((a, b) => a.gap - b.gap); // 👈 BEST FIRST (lowest gap)
  }, [results]);

  // ----- Overall readiness score -----
  const readinessScore = useMemo(() => {
    if (categoryData.length === 0) return 0;
    const totalUser = categoryData.reduce((sum, item) => sum + item.user, 0);
    const totalDemand = categoryData.reduce((sum, item) => sum + item.demand, 0);
    return totalDemand ? Math.min(100, Math.round((totalUser / totalDemand) * 100)) : 0;
  }, [categoryData]);

  // ----- Target role -----
  const targetRole = results?.recommended_job_roles?.[0] || 'your target job';

  // ----- No data -----
  if (!results?.skills) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="glass-panel max-w-2xl w-full p-12 text-center">
          <Scale className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">No skills yet</h2>
          <p className="text-slate-400 text-lg mb-8">Analyze a project first – we’ll compare you to real job demands.</p>
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

      {/* ===== HEADER – 2 SECOND UNDERSTANDING ===== */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-4">
          <Target className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
            SKILL GAP
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          You vs. <span className="gradient-heading">{targetRole}</span>
        </h1>
        <p className="text-slate-400 text-lg">
          <span className="text-cyan-400">Your skills</span> compared to real job descriptions.
        </p>
      </div>

      {/* ===== OVERALL SCORE – BIG, COLORED, INSTANT ===== */}
      <div className="flex justify-center">
        <div className="relative w-48 h-48">
          {/* Background circle */}
          <div className="absolute inset-0 rounded-full border-8 border-slate-800"></div>
          {/* Progress circle */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="12"
              strokeDasharray={2 * Math.PI * 88}
              strokeDashoffset={2 * Math.PI * 88 * (1 - readinessScore / 100)}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold text-white">{readinessScore}%</span>
            <span className="text-sm text-slate-400">match</span>
          </div>
        </div>
      </div>

      {/* ===== STATUS BADGE – ONE WORD ===== */}
      <div className="text-center -mt-4">
        {readinessScore >= 70 ? (
          <span className="inline-flex items-center space-x-2 px-5 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-full text-emerald-300 font-semibold">
            <CheckCircle className="w-5 h-5" />
            <span>Strong match</span>
          </span>
        ) : readinessScore >= 40 ? (
          <span className="inline-flex items-center space-x-2 px-5 py-2 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-300 font-semibold">
            <TrendingUp className="w-5 h-5" />
            <span>Moderate – room to grow</span>
          </span>
        ) : (
          <span className="inline-flex items-center space-x-2 px-5 py-2 bg-red-500/20 border border-red-500/40 rounded-full text-red-300 font-semibold">
            <Zap className="w-5 h-5" />
            <span>Early stage – big opportunity</span>
          </span>
        )}
      </div>

      {/* ===== CATEGORY CARDS – SCAN IN 3 SECONDS ===== */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
          <Scale className="w-5 h-5 text-cyan-400" />
          <h2 className="text-xl font-semibold text-white">Category breakdown</h2>
        </div>

        {categoryData.map((cat) => (
          <div
            key={cat.category}
            className={`glass-panel p-5 transition-all hover:scale-[1.01] 
              ${cat.status === 'gap' ? 'border-l-8 border-l-red-500' : ''}
              ${cat.status === 'near' ? 'border-l-8 border-l-amber-500' : ''}
              ${cat.status === 'good' ? 'border-l-8 border-l-emerald-500' : ''}
            `}
          >
            <div className="flex items-center justify-between flex-wrap gap-3">
              {/* Category + status emoji */}
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {cat.status === 'good' ? '✅' : cat.status === 'near' ? '🟡' : '🔴'}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-white">{cat.category}</h3>
                  <span className="text-xs uppercase tracking-wider text-slate-500">
                    {cat.status === 'good' ? 'Good' : cat.status === 'near' ? 'Near' : 'Gap'}
                  </span>
                </div>
              </div>

              {/* Numbers – big & bold */}
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-sm text-slate-400">You</div>
                  <div className="text-2xl font-bold text-cyan-400">{cat.user}</div>
                </div>
                <div className="text-slate-600 font-bold">/</div>
                <div className="text-center">
                  <div className="text-sm text-slate-400">Need</div>
                  <div className="text-2xl font-bold text-purple-400">{cat.demand}</div>
                </div>
              </div>

              {/* Gap badge */}
              <div className={`px-4 py-1.5 rounded-full text-sm font-bold
                ${cat.gap > 0 
                  ? 'bg-red-500/20 text-red-300 border border-red-500/40' 
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}
              >
                {cat.gap > 0 ? `-${cat.gap}` : '✓'}
              </div>
            </div>

            {/* Visual bar – see ratio instantly */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-400 rounded-full"
                  style={{ width: `${cat.percent}%` }}
                ></div>
              </div>
              <span className="text-xs text-slate-400">{cat.percent}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* ===== SINGLE CLEAR ACTION ===== */}
      
    </div>
  );
};

export default SkillGapPage;