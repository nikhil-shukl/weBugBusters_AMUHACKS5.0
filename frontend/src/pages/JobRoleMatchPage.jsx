import React, { useState, useMemo } from 'react';
import JobRoleGraph from '../components/JobRoleGraph';
import { useResults } from '../context/ResultsContext';
import { jobRoleSkills } from '../data/jobRoleSkills';
import { 
  Briefcase, 
  Target, 
  TrendingUp, 
  Award, 
  Info,
  ChevronRight,
  Sparkles
} from 'lucide-react';

const JobRoleMatchPage = () => {
  const { results } = useResults();
  const [hoveredRole, setHoveredRole] = useState(null);

  // Calculate match percentages and sort roles
  const roleMatches = useMemo(() => {
    if (!results?.recommended_job_roles || !results?.skills) return [];

    return results.recommended_job_roles
      .map(role => {
        const required = jobRoleSkills[role] || [];
        const userSkills = results.skills.map(s => s.name);
        const matchedSkills = required.filter(skill => userSkills.includes(skill));
        const matchPercentage = required.length 
          ? Math.round((matchedSkills.length / required.length) * 100) 
          : 0;
        
        return {
          name: role,
          matchPercentage,
          matchedSkills,
          totalRequired: required.length,
          topSkills: matchedSkills.slice(0, 3) // show top 3 on hover
        };
      })
      .sort((a, b) => b.matchPercentage - a.matchPercentage);
  }, [results]);

  // Calculate insights
  const insights = useMemo(() => {
    if (roleMatches.length === 0) return null;
    
    const topRole = roleMatches[0];
    const avgMatch = Math.round(
      roleMatches.reduce((sum, r) => sum + r.matchPercentage, 0) / roleMatches.length
    );
    
    return { topRole, avgMatch };
  }, [roleMatches]);

  // If no data – beautiful empty state
  if (!results?.skills || !results?.recommended_job_roles) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="glass-panel max-w-2xl w-full p-12 text-center animate-in fade-in zoom-in-95 duration-700">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
              <Briefcase className="w-10 h-10 text-cyan-400" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">No Analysis Yet</h2>
          <p className="text-slate-400 text-lg mb-8">
            Upload a project and analyze it first to see how your skills match with real‑world job roles.
          </p>
          <a
            href="/analyzer"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/30"
          >
            <span>Go to Analyzer</span>
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      
      {/* ===== HERO SECTION ===== */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-900/20 via-transparent to-purple-900/20 p-8 border border-white/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl translate-y-32 -translate-x-32"></div>
        
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">Real‑Time Matching</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 flex items-center gap-3">
              <Briefcase className="w-10 h-10 text-cyan-400" />
              <span className="gradient-heading">Job Role Match</span>
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl">
              Your verified skills connected to market demand. 
              <span className="text-cyan-400 font-medium"> Thicker lines = stronger match.</span>
            </p>
          </div>
          
          {/* Quick Insights Card */}
          {insights && (
            <div className="glass-panel p-5 md:w-64 flex-shrink-0 border border-cyan-500/30 bg-cyan-500/5">
              <div className="flex items-center space-x-2 text-cyan-400 mb-3">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-semibold uppercase tracking-wider">Match Insights</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Top Role</span>
                  <span className="text-white font-bold">{insights.topRole.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Match Score</span>
                  <span className="text-cyan-400 font-bold">{insights.topRole.matchPercentage}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm">Avg. Match</span>
                  <span className="text-purple-400 font-bold">{insights.avgMatch}%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===== GRAPH SECTION WITH LEGEND ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Graph – 3/4 width on large screens */}
        <div className="lg:col-span-3">
          <div className="glass-panel p-6 h-[550px] md:h-[600px] relative overflow-hidden">
            <div className="absolute top-4 right-4 z-10 flex space-x-2">
              <div className="glass-panel px-3 py-1.5 text-xs text-slate-300 flex items-center">
                <Info className="w-3 h-3 mr-1" />
                Drag / Scroll to zoom
              </div>
            </div>
            <JobRoleGraph />
          </div>
        </div>

        {/* Legend & Instructions – 1/4 width */}
        <div className="lg:col-span-1">
          <div className="glass-panel p-6 h-full flex flex-col space-y-6">
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center">
                <Target className="w-5 h-5 text-cyan-400 mr-2" />
                Graph Legend
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-4 h-4 rounded-full bg-cyan-400 mt-1"></div>
                  <div>
                    <p className="text-white text-sm font-medium">Skill Nodes</p>
                    <p className="text-slate-400 text-xs">Your verified skills</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-4 h-4 rounded-full bg-purple-400 mt-1"></div>
                  <div>
                    <p className="text-white text-sm font-medium">Job Role Nodes</p>
                    <p className="text-slate-400 text-xs">Recommended positions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-0.5 bg-white/40 mt-3"></div>
                  <div>
                    <p className="text-white text-sm font-medium">Connection</p>
                    <p className="text-slate-400 text-xs">Thicker = more matching skills</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h3 className="text-white font-semibold mb-3 flex items-center">
                <Award className="w-5 h-5 text-purple-400 mr-2" />
                How to use
              </h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  Hover nodes to see names
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  Click a role to highlight its skills
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  Drag to reposition, scroll to zoom
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2">•</span>
                  Cards below show detailed match
                </li>
              </ul>
            </div>

            <div className="mt-auto pt-6 border-t border-white/10">
              <div className="bg-cyan-500/10 rounded-lg p-4">
                <p className="text-cyan-300 text-xs font-medium uppercase tracking-wider mb-1">Total Skills</p>
                <p className="text-3xl font-bold text-white">{results.skills?.length || 0}</p>
                <p className="text-slate-400 text-xs mt-1">connected to {roleMatches.length} roles</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== ROLE MATCH CARDS – ANIMATED & INTERACTIVE ===== */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <TrendingUp className="w-6 h-6 text-cyan-400 mr-2" />
            Role Match Breakdown
          </h2>
          <span className="text-sm text-slate-400">
            Sorted by match strength
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roleMatches.map((role, index) => (
            <div
              key={index}
              className="group relative glass-panel p-6 transition-all duration-300 hover:scale-[1.02] hover:border-cyan-500/30 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 80}ms` }}
              onMouseEnter={() => setHoveredRole(role.name)}
              onMouseLeave={() => setHoveredRole(null)}
            >
              {/* Top rank badge for top 3 */}
              {index < 3 && (
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center border-2 border-slate-900 shadow-lg">
                  <span className="text-white text-xs font-bold">#{index + 1}</span>
                </div>
              )}

              {/* Role title and match percentage */}
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white pr-6">{role.name}</h3>
                <div className="flex flex-col items-end">
                  <span className="text-3xl font-bold text-cyan-400">{role.matchPercentage}%</span>
                  <span className="text-xs text-slate-500">match</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-800 rounded-full h-2.5 mb-4">
                <div
                  className="h-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500 ease-out"
                  style={{ width: `${role.matchPercentage}%` }}
                ></div>
              </div>

              {/* Match details */}
              <div className="flex justify-between text-sm mb-4">
                <span className="text-slate-400">
                  <span className="text-cyan-400 font-semibold">{role.matchedSkills.length}</span> / {role.totalRequired} skills
                </span>
                <span className="text-slate-400">
                  {role.matchedSkills.length > 0
                    ? `${Math.round((role.matchedSkills.length / role.totalRequired) * 100)}%`
                    : 'No match'}
                </span>
              </div>

              {/* Hover skill preview */}
              <div className={`
                absolute left-6 right-6 bottom-6 p-3 bg-slate-800/80 backdrop-blur-sm rounded-lg border border-white/10
                transition-all duration-300
                ${hoveredRole === role.name ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}
              `}>
                <p className="text-xs text-cyan-400 mb-1 font-semibold">🔍 Matching skills:</p>
                <div className="flex flex-wrap gap-1">
                  {role.topSkills.length > 0 ? (
                    role.topSkills.map((skill, idx) => (
                      <span key={idx} className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500">No direct matches</span>
                  )}
                  {role.matchedSkills.length > 3 && (
                    <span className="text-xs text-slate-400">+{role.matchedSkills.length - 3} more</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== BOTTOM CTA ===== */}
      <div className="glass-panel p-8 mt-8 text-center border border-cyan-500/20 bg-gradient-to-r from-cyan-900/10 to-purple-900/10">
        <h3 className="text-2xl font-bold text-white mb-3">Ready to bridge your skill gap?</h3>
        <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
          Focus on the skills with highest demand and low match – they're your fastest path to new opportunities.
        </p>
       
      </div>
    </div>
  );
};

export default JobRoleMatchPage;