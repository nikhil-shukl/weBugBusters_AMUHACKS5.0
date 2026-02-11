import React, { useMemo } from 'react';
import { useResults } from '../context/ResultsContext';
import { roleSkillDemand } from '../data/marketDemand';
import { 
  Map, 
  Target, 
  Clock, 
  BookOpen, 
  Award, 
  ChevronRight, 
  Sparkles,
  ArrowRight,
  Lightbulb
} from 'lucide-react';

const LearningRoadmapPage = () => {
  const { results } = useResults();

  // ----- Build roadmap with fallback skills -----
  const roadmap = useMemo(() => {
    if (!results?.recommended_job_roles) {
      return null;
    }

    const userSkills = results.skills?.map(s => s.name) || [];
    const targetRole = results.recommended_job_roles[0] || 'Software Developer';
    const inDemandSkills = roleSkillDemand[targetRole] || [
      'React', 'JavaScript', 'Python', 'SQL', 'Git', 'Communication'
    ];

    // Get suggested skills from AI (may be empty)
    const suggested = results?.suggested_skills_to_learn || [];

    const immediate = [];
    const next = [];
    const future = [];

    // 1. Add AI‑suggested skills with priority
    suggested.forEach(skill => {
      if (inDemandSkills.includes(skill) && !userSkills.includes(skill)) {
        immediate.push(skill);
      } else if (['AWS','Docker','Kubernetes','CI/CD','Terraform','GraphQL','TypeScript','Python','SQL']
          .some(k => skill.includes(k))) {
        next.push(skill);
      } else {
        future.push(skill);
      }
    });

    // 2. FALLBACK – always show at least 2 relevant skills per stage
    //    These are common, role‑specific recommendations.
    const fallbackImmediate = inDemandSkills
      .filter(skill => !userSkills.includes(skill) && !immediate.includes(skill))
      .slice(0, 2);
    
    const fallbackNext = [
      'Git & GitHub', 
      'REST APIs', 
      'Database Design', 
      'Testing (Jest)',
      'Basic DevOps',
      'Agile Methodologies'
    ].filter(s => !userSkills.includes(s) && !next.includes(s)).slice(0, 2);
    
    const fallbackFuture = [
      'System Design',
      'Advanced Cloud (AWS/Azure)',
      'Microservices',
      'Kubernetes',
      'GraphQL',
      'CI/CD Pipelines'
    ].filter(s => !userSkills.includes(s) && !future.includes(s)).slice(0, 2);

    // Merge AI + fallback, remove duplicates
    const finalImmediate = [...new Set([...immediate, ...fallbackImmediate])];
    const finalNext = [...new Set([...next, ...fallbackNext])];
    const finalFuture = [...new Set([...future, ...fallbackFuture])];

    return { 
      immediate: finalImmediate, 
      next: finalNext, 
      future: finalFuture, 
      targetRole,
      hasAISuggestions: suggested.length > 0
    };
  }, [results]);

  // ----- No data state (no target role) -----
  if (!results?.recommended_job_roles) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="glass-panel max-w-2xl w-full p-12 text-center">
          <Map className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">No roadmap yet</h2>
          <p className="text-slate-400 text-lg mb-8">
            Analyze a project first – we'll create your step‑by‑step career path.
          </p>
          <a
            href="/analyzer"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-cyan-600 hover:from-amber-500 hover:to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-amber-500/30 transition-all transform hover:scale-105"
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

      {/* ===== HEADER – DESTINATION FIRST ===== */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
            YOUR CAREER ROADMAP
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          <span className="gradient-heading">{roadmap.targetRole}</span>
        </h1>
        <p className="text-slate-400 text-lg">
          Follow these steps – in order. {!roadmap.hasAISuggestions && 
          <span className="text-cyan-400 text-sm block mt-1">
            ⚡ Based on common requirements for this role.
          </span>}
        </p>
      </div>

      {/* ===== VERTICAL TIMELINE – 3 STAGES ===== */}
      <div className="relative">
        {/* Vertical connector line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500 via-blue-500 to-purple-500 hidden md:block"></div>

        {/* STAGE 1 – LEARN NOW */}
        <div className="relative flex flex-col md:flex-row gap-6 mb-8">
          <div className="md:w-16 flex-shrink-0 flex justify-center">
            <div className="w-12 h-12 rounded-full bg-red-500/30 border-2 border-red-400 flex items-center justify-center text-white font-bold text-xl z-10">
              1
            </div>
          </div>
          <div className="flex-1 glass-panel p-6 border-l-8 border-l-red-500">
            <div className="flex items-center gap-4 mb-4">
              <Clock className="w-6 h-6 text-red-400" />
              <div>
                <h2 className="text-2xl font-bold text-white">LEARN NOW</h2>
                <p className="text-sm text-slate-400">Required by employers – master these first.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {roadmap.immediate.map((skill, i) => (
                <span 
                  key={i} 
                  className={`px-4 py-2 rounded-full text-sm font-medium
                    ${roadmap.hasAISuggestions 
                      ? 'bg-red-500/10 border border-red-500/30 text-red-300' 
                      : 'bg-slate-700/50 border border-slate-600 text-slate-300'
                    }`}
                >
                  {skill}
                </span>
              ))}
            </div>
            {!roadmap.hasAISuggestions && (
              <p className="text-xs text-cyan-400/70 mt-3 flex items-center gap-1">
                <Lightbulb className="w-3 h-3" />
                Recommended based on industry demand
              </p>
            )}
          </div>
        </div>

        {/* STAGE 2 – BUILD NEXT */}
        <div className="relative flex flex-col md:flex-row gap-6 mb-8">
          <div className="md:w-16 flex-shrink-0 flex justify-center">
            <div className="w-12 h-12 rounded-full bg-blue-500/30 border-2 border-blue-400 flex items-center justify-center text-white font-bold text-xl z-10">
              2
            </div>
          </div>
          <div className="flex-1 glass-panel p-6 border-l-8 border-l-blue-500">
            <div className="flex items-center gap-4 mb-4">
              <BookOpen className="w-6 h-6 text-blue-400" />
              <div>
                <h2 className="text-2xl font-bold text-white">BUILD NEXT</h2>
                <p className="text-sm text-slate-400">Core skills – make you versatile.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {roadmap.next.map((skill, i) => (
                <span 
                  key={i} 
                  className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* STAGE 3 – GROW LATER */}
        <div className="relative flex flex-col md:flex-row gap-6">
          <div className="md:w-16 flex-shrink-0 flex justify-center">
            <div className="w-12 h-12 rounded-full bg-purple-500/30 border-2 border-purple-400 flex items-center justify-center text-white font-bold text-xl z-10">
              3
            </div>
          </div>
          <div className="flex-1 glass-panel p-6 border-l-8 border-l-purple-500">
            <div className="flex items-center gap-4 mb-4">
              <Award className="w-6 h-6 text-purple-400" />
              <div>
                <h2 className="text-2xl font-bold text-white">GROW LATER</h2>
                <p className="text-sm text-slate-400">Specialise and stand out.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {roadmap.future.map((skill, i) => (
                <span 
                  key={i} 
                  className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== PROGRESS SUMMARY – 3 NUMBERS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-5 text-center border border-red-500/30">
          <div className="text-3xl font-bold text-red-400">{roadmap.immediate.length}</div>
          <div className="text-sm text-slate-400">Learn now</div>
        </div>
        <div className="glass-panel p-5 text-center border border-blue-500/30">
          <div className="text-3xl font-bold text-blue-400">{roadmap.next.length}</div>
          <div className="text-sm text-slate-400">Build next</div>
        </div>
        <div className="glass-panel p-5 text-center border border-purple-500/30">
          <div className="text-3xl font-bold text-purple-400">{roadmap.future.length}</div>
          <div className="text-sm text-slate-400">Grow later</div>
        </div>
      </div>

      {/* ===== ONE CLEAR ACTION ===== */}
      <div className="glass-panel p-8 text-center border border-amber-500/30 bg-gradient-to-br from-amber-900/10 to-cyan-900/10">
        <h3 className="text-2xl font-bold text-white mb-2">🎓 Start with LEARN NOW</h3>
        <p className="text-slate-300 mb-6 max-w-lg mx-auto">
          These skills appear in almost every <span className="text-amber-400 font-semibold">{roadmap.targetRole}</span> job description.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="https://www.coursera.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold rounded-xl shadow-lg shadow-red-500/30 transition-all transform hover:scale-105"
          >
            <BookOpen className="w-5 h-5" />
            <span>Find courses</span>
          </a>
          
        </div>
      </div>

      {/* ===== FOOTER – TOTAL SKILLS ===== */}
      <div className="text-center text-sm text-slate-500">
        <span className="text-cyan-400 font-semibold">{results.skills?.length || 0}</span> verified skills • 
        <span className="text-amber-400 font-semibold ml-1">{roadmap.immediate.length}</span> to learn now
      </div>

    </div>
  );
};

export default LearningRoadmapPage;