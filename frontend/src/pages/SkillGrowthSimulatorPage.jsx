import React, { useState, useEffect, useMemo } from 'react';
import { useResults } from '../context/ResultsContext';
import { marketDemand } from '../data/marketDemand';
import { jobRoleSkills } from '../data/jobRoleSkills';
import { 
  TrendingUp, 
  Target, 
  Award, 
  ChevronRight,
  Sparkles,
  Plus,
  CheckCircle,
  ArrowRight,
  Zap,
  BarChart3,
  Briefcase,
  Lightbulb,
  Rocket
} from 'lucide-react';

// ===== CATEGORY → SKILL MAPPING (derived from jobRoleSkills) =====
const buildCategorySkillMap = () => {
  const map = {
    technical: [],
    management: [],
    communication: [],
    design: [],
    testing: [],
    devops: [],
    security: [],
    analytics: [],
    'soft skills': [],
    other: []
  };

  // Scan all job roles and their required skills
  Object.values(jobRoleSkills).forEach(skills => {
    skills.forEach(skill => {
      const lower = skill.toLowerCase();
      // Simple keyword-based categorisation
      if (['react', 'node.js', 'python', 'java', 'javascript', 'typescript', 'c++', 'c#', 'go', 'rust', 'sql', 'mongodb', 'postgresql', 'express', 'django', 'flask', 'spring', 'html', 'css', 'tailwind', 'vue', 'angular', 'next.js'].some(k => lower.includes(k))) {
        if (!map.technical.includes(skill)) map.technical.push(skill);
      } else if (['docker', 'kubernetes', 'aws', 'azure', 'gcp', 'terraform', 'jenkins', 'ci/cd', 'linux', 'bash', 'prometheus', 'grafana'].some(k => lower.includes(k))) {
        if (!map.devops.includes(skill)) map.devops.push(skill);
      } else if (['leadership', 'team', 'agile', 'scrum', 'project', 'management', 'stakeholder', 'pmp'].some(k => lower.includes(k))) {
        if (!map.management.includes(skill)) map.management.push(skill);
      } else if (['communication', 'writing', 'documentation', 'presentation', 'technical writing'].some(k => lower.includes(k))) {
        if (!map.communication.includes(skill)) map.communication.push(skill);
      } else if (['figma', 'sketch', 'adobe', 'ui', 'ux', 'wireframe', 'prototype', 'design', 'user research'].some(k => lower.includes(k))) {
        if (!map.design.includes(skill)) map.design.push(skill);
      } else if (['jest', 'cypress', 'selenium', 'test', 'junit', 'testng', 'qa', 'quality'].some(k => lower.includes(k))) {
        if (!map.testing.includes(skill)) map.testing.push(skill);
      } else if (['security', 'owasp', 'penetration', 'ethical', 'cissp', 'siem'].some(k => lower.includes(k))) {
        if (!map.security.includes(skill)) map.security.push(skill);
      } else if (['data', 'analytics', 'sql', 'python', 'pandas', 'tableau', 'power bi', 'excel', 'statistics', 'machine learning', 'ai'].some(k => lower.includes(k))) {
        if (!map.analytics.includes(skill)) map.analytics.push(skill);
      } else if (['leadership', 'teamwork', 'problem solving', 'critical thinking', 'adaptability', 'creativity'].some(k => lower.includes(k))) {
        if (!map['soft skills'].includes(skill)) map['soft skills'].push(skill);
      } else {
        if (!map.other.includes(skill)) map.other.push(skill);
      }
    });
  });

  // Ensure every category has at least some skills
  if (map.technical.length === 0) map.technical = ['React', 'Node.js', 'Python', 'SQL', 'JavaScript'];
  if (map.devops.length === 0) map.devops = ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'];
  if (map.management.length === 0) map.management = ['Agile', 'Scrum', 'Project Planning', 'Team Leadership'];
  if (map.communication.length === 0) map.communication = ['Technical Writing', 'Presentation', 'Stakeholder Communication'];
  if (map.design.length === 0) map.design = ['Figma', 'UI/UX Design', 'Wireframing', 'Prototyping'];
  if (map.testing.length === 0) map.testing = ['Jest', 'Cypress', 'Selenium', 'Unit Testing'];
  if (map.security.length === 0) map.security = ['Network Security', 'Penetration Testing', 'OWASP'];
  if (map.analytics.length === 0) map.analytics = ['Data Analysis', 'SQL', 'Python', 'Tableau'];
  if (map['soft skills'].length === 0) map['soft skills'] = ['Communication', 'Problem Solving', 'Teamwork'];

  return map;
};

const categorySkillMap = buildCategorySkillMap();

const SkillGrowthSimulatorPage = () => {
  const { results } = useResults();
  const [selectedCategory, setSelectedCategory] = useState('technical');
  const [simulatedSkills, setSimulatedSkills] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [hoveredRole, setHoveredRole] = useState(null);

  useEffect(() => {
    setAnimate(true);
  }, []);

  // Get user's current skill counts per category
  const userCounts = useMemo(() => {
    if (!results?.skills) return {};
    const counts = {};
    results.skills.forEach(skill => {
      const cat = skill.category?.toLowerCase() || 'other';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [results]);

  // Categories with demand data
  const categories = useMemo(() => {
    return Object.entries(marketDemand).map(([key, demand]) => ({
      id: key,
      name: key.charAt(0).toUpperCase() + key.slice(1),
      demand,
      current: userCounts[key] || 0,
      gap: demand - (userCounts[key] || 0)
    }));
  }, [userCounts]);

  // Current overall match (by counts)
  const currentMatch = useMemo(() => {
    const totalUser = categories.reduce((sum, cat) => sum + cat.current, 0);
    const totalDemand = categories.reduce((sum, cat) => sum + cat.demand, 0);
    return totalDemand ? Math.min(100, Math.round((totalUser / totalDemand) * 100)) : 0;
  }, [categories]);

  // Simulated overall match after adding skills (by counts)
  const simulatedMatch = useMemo(() => {
    let totalUser = categories.reduce((sum, cat) => sum + cat.current, 0);
    const totalDemand = categories.reduce((sum, cat) => sum + cat.demand, 0);
    const selected = categories.find(c => c.id === selectedCategory);
    if (selected) {
      totalUser += simulatedSkills;
    }
    return totalDemand ? Math.min(100, Math.round((totalUser / totalDemand) * 100)) : 0;
  }, [categories, selectedCategory, simulatedSkills]);

  const gain = simulatedMatch - currentMatch;

  // ===== JOB ROLE MATCH IMPACT – REALISTIC SIMULATION =====
  const roleImpact = useMemo(() => {
    if (!results?.recommended_job_roles || !results?.skills) return [];

    const userSkills = results.skills.map(s => s.name);

    // Get available skills in the selected category that the user DOESN'T already have
    const availableSkills = (categorySkillMap[selectedCategory] || [])
      .filter(skill => !userSkills.includes(skill));

    // Simulated user skills: add up to `simulatedSkills` from availableSkills
    const simulatedUserSkills = [...userSkills];
    for (let i = 0; i < Math.min(simulatedSkills, availableSkills.length); i++) {
      simulatedUserSkills.push(availableSkills[i]);
    }
    // If we need more than available, add generic skill names
    for (let i = availableSkills.length; i < simulatedSkills; i++) {
      simulatedUserSkills.push(`${selectedCategory} skill ${i+1}`);
    }

    return results.recommended_job_roles.slice(0, 3).map(role => {
      const required = jobRoleSkills[role] || [];
      const currentMatchCount = required.filter(skill => userSkills.includes(skill)).length;
      const simulatedMatchCount = required.filter(skill => simulatedUserSkills.includes(skill)).length;
      const currentPercent = required.length ? Math.round((currentMatchCount / required.length) * 100) : 0;
      const simulatedPercent = required.length ? Math.round((simulatedMatchCount / required.length) * 100) : 0;
      return {
        role,
        current: currentPercent,
        simulated: simulatedPercent,
        gain: simulatedPercent - currentPercent
      };
    });
  }, [results, selectedCategory, simulatedSkills]);

  // Recommended skills to learn in this category
  const recommendedSkills = useMemo(() => {
    if (!results?.skills) return [];
    const userSkills = results.skills.map(s => s.name);
    const available = (categorySkillMap[selectedCategory] || [])
      .filter(skill => !userSkills.includes(skill))
      .slice(0, 5);
    return available;
  }, [results, selectedCategory]);

  // ----- No data state -----
  if (!results?.skills) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="glass-panel max-w-2xl w-full p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-cyan-500/20 flex items-center justify-center">
              <Rocket className="w-10 h-10 text-cyan-400" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">No data yet</h2>
          <p className="text-slate-400 text-lg mb-8">
            Analyze a project first – then simulate your skill growth.
          </p>
          <a
            href="/analyzer"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/30 transition-all transform hover:scale-105"
          >
            <span>Go to Analyzer</span>
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12">

      {/* ===== HERO ===== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-900/30 via-transparent to-purple-900/30 p-8 border border-white/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-y-32 -translate-x-32"></div>
        
        <div className="relative text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full">
            <Zap className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-300 uppercase tracking-wider">
              SKILL GROWTH SIMULATOR
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            What if you <br/>
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              learn 1 more skill?
            </span>
          </h1>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto">
            Slide to add skills. Watch your match score rise – and see which jobs you qualify for.
          </p>
        </div>
      </div>

      {/* ===== CURRENT VS SIMULATED ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Current Card */}
        <div className={`
          glass-panel p-8 text-center transition-all duration-1000 
          ${animate ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}
        `}>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center border border-white/10">
              <BarChart3 className="w-8 h-8 text-slate-400" />
            </div>
          </div>
          <div className="text-sm text-slate-400 uppercase tracking-wider mb-1">Current match</div>
          <div className="text-6xl font-bold text-white mb-2">{currentMatch}%</div>
          <div className="w-full bg-slate-800 rounded-full h-4 mb-4">
            <div
              className="h-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-1000"
              style={{ width: `${currentMatch}%` }}
            ></div>
          </div>
          <p className="text-slate-400 text-sm flex items-center justify-center gap-1">
            <CheckCircle className="w-4 h-4 text-cyan-400" />
            {results.skills.length} verified skills
          </p>
        </div>

        {/* Simulated Card */}
        <div className={`
          glass-panel p-8 text-center border-2 border-cyan-500/50 bg-gradient-to-br from-cyan-900/20 to-purple-900/20
          transition-all duration-1000 delay-200 relative overflow-hidden
          ${animate ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
        `}>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-purple-500/0 animate-pulse-slow"></div>
          
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 flex items-center justify-center border border-cyan-400/50">
              <Sparkles className="w-8 h-8 text-cyan-300" />
            </div>
          </div>
          <div className="text-sm text-cyan-300 uppercase tracking-wider mb-1">Simulated match</div>
          <div className="text-6xl font-bold text-purple-300 mb-2">{simulatedMatch}%</div>
          <div className="w-full bg-slate-800 rounded-full h-4 mb-4">
            <div
              className="h-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500"
              style={{ width: `${simulatedMatch}%` }}
            ></div>
          </div>
          
          {gain > 0 ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-full">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-300 font-bold text-lg">+{gain}%</span>
              <span className="text-emerald-400/80 text-sm">improvement</span>
            </div>
          ) : gain < 0 ? (
            <div className="text-slate-400 text-sm">Adjust to see gain</div>
          ) : (
            <div className="text-slate-400 text-sm">Move the slider</div>
          )}
        </div>
      </div>

      {/* ===== SIMULATOR CONTROLS ===== */}
      <div className="glass-panel p-8 space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-purple-500"></div>
        
        <div className="flex items-center gap-3">
          <Target className="w-7 h-7 text-cyan-400" />
          <h2 className="text-2xl font-bold text-white">Choose your growth path</h2>
        </div>

        {/* Category selector */}
        <div className="space-y-4">
          <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Skill category
          </label>
          <div className="flex flex-wrap gap-3">
            {categories.filter(cat => cat.demand > 0).map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSimulatedSkills(0);
                }}
                className={`
                  group relative px-5 py-3 rounded-xl border transition-all duration-300
                  ${selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-cyan-500/30 to-purple-500/30 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/30'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/30'
                  }
                `}
              >
                <span className="font-medium">{cat.name}</span>
                <span className="ml-2 text-xs opacity-80">
                  {cat.current}/{cat.demand}
                </span>
                {cat.gap > 0 && selectedCategory !== cat.id && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                    {cat.gap}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Slider */}
        <div className="space-y-6 pt-4">
          <div className="flex justify-between items-end">
            <label className="text-sm font-medium text-slate-400">
              Add skills to <span className="text-cyan-400 font-bold text-lg">{categories.find(c => c.id === selectedCategory)?.name}</span>
            </label>
            <div className="flex items-center gap-3 bg-white/5 px-5 py-2 rounded-full border border-white/10">
              <Plus className="w-5 h-5 text-cyan-400" />
              <span className="text-3xl font-bold text-cyan-400">{simulatedSkills}</span>
              <span className="text-slate-400">skills</span>
            </div>
          </div>

          <div className="relative px-2">
            <input
              type="range"
              min="0"
              max="8"
              value={simulatedSkills}
              onChange={(e) => setSimulatedSkills(parseInt(e.target.value))}
              className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer 
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r 
                [&::-webkit-slider-thumb]:from-cyan-400 [&::-webkit-slider-thumb]:to-purple-500 
                [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(34,211,238,0.7)] 
                [&::-webkit-slider-thumb]:shadow-purple-500/50
                [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white/50
                [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-200 
                [&::-webkit-slider-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:cursor-grab
                [&::-webkit-slider-thumb]:active:cursor-grabbing"
              style={{
                background: `linear-gradient(to right, #22d3ee, #c084fc ${(simulatedSkills / 8) * 100}%, #1e293b ${(simulatedSkills / 8) * 100}%)`
              }}
            />
            <div className="flex justify-between mt-3 text-xs text-slate-500 px-1">
              <span>0</span>
              <span>2</span>
              <span>4</span>
              <span>6</span>
              <span>8</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            {[1, 2, 3, 4, 5].map(num => (
              <button
                key={num}
                onClick={() => setSimulatedSkills(num)}
                className={`
                  px-5 py-2.5 rounded-lg border transition-all duration-200
                  ${simulatedSkills === num
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 border-transparent text-white shadow-lg shadow-purple-500/30'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                  }
                `}
              >
                +{num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===== JOB ROLE IMPACT – NOW WITH REAL GAINS ===== */}
      {simulatedSkills > 0 && roleImpact.some(r => r.gain > 0) && (
        <div className="glass-panel p-8 space-y-6 border-t-4 border-t-cyan-400 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Briefcase className="w-7 h-7 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">Your job match improves</h2>
            </div>
            <span className="px-4 py-2 bg-cyan-500/20 rounded-full text-cyan-300 text-sm font-semibold">
              +{roleImpact.reduce((acc, r) => acc + r.gain, 0)}% total gain
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roleImpact.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white/5 hover:bg-white/10 rounded-xl p-5 border border-white/10 transition-all duration-300 hover:scale-105"
                onMouseEnter={() => setHoveredRole(item.role)}
                onMouseLeave={() => setHoveredRole(null)}
              >
                <h3 className="text-lg font-bold text-white mb-3">{item.role}</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-slate-400">Current</span>
                  <span className="text-sm text-cyan-400 font-bold">{item.current}%</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-slate-400">Simulated</span>
                  <span className="text-lg font-bold text-purple-400">{item.simulated}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500"
                    style={{ width: `${item.simulated}%` }}
                  ></div>
                </div>
                {item.gain > 0 && (
                  <div className="mt-3 text-xs text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +{item.gain}% match increase
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===== RECOMMENDED SKILLS ===== */}
      {simulatedSkills > 0 && recommendedSkills.length > 0 && (
        <div className="glass-panel p-8 border border-cyan-500/30 bg-gradient-to-br from-cyan-900/10 to-purple-900/10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <Lightbulb className="w-7 h-7 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Skills to learn next</h3>
                <p className="text-slate-400">
                  Based on your selected category: <span className="text-cyan-400 font-semibold">{categories.find(c => c.id === selectedCategory)?.name}</span>
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {recommendedSkills.slice(0, 4).map((skill, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-white/5 border border-white/20 rounded-full text-cyan-300 text-sm font-medium hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <a
              href="/roadmap"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/30 transition-all transform hover:scale-105"
            >
              <span>Build your roadmap</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

      {/* ===== FOOTER ===== */}
      <div className="flex justify-center gap-8 text-sm text-slate-500 pt-4 border-t border-white/10">
        <div>
          <span className="text-cyan-400 font-bold">{results.skills.length}</span> verified skills
        </div>
        <div>
          <span className="text-cyan-400 font-bold">{currentMatch}%</span> current match
        </div>
        {gain > 0 && (
          <div className="text-emerald-400">
            <span className="font-bold">+{gain}%</span> potential gain
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default SkillGrowthSimulatorPage;