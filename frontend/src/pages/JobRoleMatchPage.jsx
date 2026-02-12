import React, { useMemo, useRef, useEffect, useState } from 'react';
import { useResults } from '../context/ResultsContext';
import { jobRoleSkills } from '../data/jobRoleSkills';
import { 
  Briefcase, 
  Target, 
  Award, 
  ArrowRight, 
  Sparkles 
} from 'lucide-react';
import ForceGraph2D from 'react-force-graph-2d';

const JobRoleMatchPage = () => {
  const { results } = useResults();
  const graphRef = useRef();
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // ----- Find best matching role -----
  const bestMatch = useMemo(() => {
    if (!results?.skills || !results?.recommended_job_roles) return null;

    const userSkills = results.skills.map(s => s.name);
    let best = null;
    let bestScore = 0;

    results.recommended_job_roles.forEach(role => {
      const required = jobRoleSkills[role] || [];
      const matched = required.filter(skill => userSkills.includes(skill)).length;
      const score = required.length ? Math.round((matched / required.length) * 100) : 0;
      if (score > bestScore) {
        bestScore = score;
        best = { role, score, matched, required: required.length };
      }
    });

    return best;
  }, [results]);

  // ----- Measure container size on mount & resize -----
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // ----- Graph data with DYNAMIC positions that stay inside container -----
  const graphData = useMemo(() => {
    if (!results?.skills || !results?.recommended_job_roles || dimensions.width === 0) 
      return { nodes: [], links: [] };

    const nodes = [];
    const links = [];

    // Take top 5 skills and top 3 roles (keeps graph clean)
    const topSkills = results.skills.slice(0, 5).map((skill, i) => ({
      id: `skill-${i}`,
      name: skill.name,
      type: 'skill',
      val: 8,
      color: '#22d3ee'
    }));
    nodes.push(...topSkills);

    const topRoles = results.recommended_job_roles.slice(0, 3).map((role, i) => ({
      id: `role-${i}`,
      name: role,
      type: 'role',
      val: 12,
      color: '#c084fc'
    }));
    nodes.push(...topRoles);

    // ----- CENTERED CIRCULAR LAYOUT that fits ANY container -----
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    const radius = Math.min(dimensions.width, dimensions.height) * 0.25; // 25% of smallest side

    // Position skills in a circle
    topSkills.forEach((node, i) => {
      const angle = (i / topSkills.length) * 2 * Math.PI;
      node.x = centerX + radius * Math.cos(angle);
      node.y = centerY + radius * Math.sin(angle);
    });

    // Position roles in a slightly inner circle, offset
    topRoles.forEach((node, i) => {
      const angle = (i / topRoles.length) * 2 * Math.PI + 0.3; // offset
      node.x = centerX + radius * 0.6 * Math.cos(angle);
      node.y = centerY + radius * 0.6 * Math.sin(angle);
    });

    // Connect skills to roles
    topSkills.forEach((skill, i) => {
      topRoles.forEach((role, j) => {
        const required = jobRoleSkills[role.name] || [];
        if (required.includes(skill.name)) {
          links.push({
            source: `skill-${i}`,
            target: `role-${j}`,
            value: 1
          });
        }
      });
    });

    return { nodes, links };
  }, [results, dimensions]);

  // ----- Auto‑zoom to fit after render and on resize -----
  useEffect(() => {
    if (graphRef.current && graphData.nodes.length > 0) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        graphRef.current.zoomToFit(400, 20);
      }, 50);
    }
  }, [graphData]);

  // ----- No data state -----
  if (!results?.skills || !results?.recommended_job_roles) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="glass-panel max-w-2xl w-full p-12 text-center">
          <Briefcase className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-2">No matches yet</h2>
          <p className="text-slate-400 text-lg mb-8">
            Analyze a project first – we'll match you to real job roles.
          </p>
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
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
            JOB ROLE MATCH
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
          Your <span className="gradient-heading">best fit</span>
        </h1>
        <p className="text-slate-400 text-lg">
          Based on your verified skills.
        </p>
      </div>

      {/* ===== BEST MATCH – BIG & BOLD ===== */}
      {bestMatch && (
        <div className="glass-panel p-8 max-w-lg mx-auto text-center border border-amber-500/30">
          <div className="text-sm text-slate-400 uppercase tracking-wider mb-1">Top match</div>
          <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2">{bestMatch.role}</div>
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">{bestMatch.score}%</div>
              <div className="text-xs text-slate-400">match</div>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{bestMatch.matched}</div>
              <div className="text-xs text-slate-400">skills matched</div>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{bestMatch.required}</div>
              <div className="text-xs text-slate-400">required</div>
            </div>
          </div>
        </div>
      )}

      {/* ===== GRAPH – ALWAYS CONTAINED ===== */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
          <Target className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-semibold text-white">How you connect</h2>
          <span className="text-xs text-slate-400 ml-auto">Your skills → job roles</span>
        </div>
        {/* Graph container with ref for measuring */}
        <div 
          ref={containerRef} 
          className="h-[350px] md:h-[400px] w-full relative"
        >
          {dimensions.width > 0 && (
            <ForceGraph2D
              ref={graphRef}
              graphData={graphData}
              width={dimensions.width}
              height={dimensions.height}
              nodeLabel={node => `${node.name}`}
              nodeColor={node => node.color}
              nodeRelSize={8}
              linkColor={() => 'rgba(255,255,255,0.25)'}
              linkWidth={1.5}
              backgroundColor="#0f172a"
              cooldownTicks={0}           // No simulation – instant static layout
              enableNodeDrag={false}      // Prevent accidental moves
              enableZoomInteraction={true}
              enablePanInteraction={true}
              nodeCanvasObject={(node, ctx, globalScale) => {
                const label = node.name;
                const fontSize = 12 / globalScale;
                ctx.font = `${fontSize}px 'Inter', sans-serif`;
                ctx.fillStyle = node.color;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.val, 0, 2 * Math.PI);
                ctx.fill();
                ctx.fillStyle = '#ffffff';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(label, node.x, node.y - node.val - 6);
              }}
            />
          )}
        </div>
      </div>

      {/* ===== OTHER ROLES – CLEAN LIST ===== */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-semibold text-white">Other good matches</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {results.recommended_job_roles.slice(1, 5).map((role, i) => {
            const required = jobRoleSkills[role] || [];
            const userSkills = results.skills.map(s => s.name);
            const matched = required.filter(skill => userSkills.includes(skill)).length;
            const score = required.length ? Math.round((matched / required.length) * 100) : 0;
            return (
              <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                <span className="text-white font-medium">{role}</span>
                <span className="text-sm text-amber-400 font-semibold">{score}%</span>
              </div>
            );
          })}
        </div>
      </div>

    
      {/* ===== SINGLE ACTION – VIEW SKILL GAP ===== */}
<div className="glass-panel p-8 text-center border border-amber-500/30 bg-gradient-to-br from-amber-900/10 to-cyan-900/10">
  <h3 className="text-2xl font-bold text-white mb-2">🎯 Ready to bridge the gap?</h3>
  <p className="text-slate-300 mb-6 max-w-lg mx-auto">
    You're a <span className="text-amber-400 font-semibold">{bestMatch?.role || 'strong candidate'}</span>.
    See which skills employers expect that you haven't added yet.
  </p>
  <a
    href="/skill-gap"
    className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-cyan-600 hover:from-amber-500 hover:to-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-amber-500/30 transition-all transform hover:scale-105"
  >
    <span>View skill gap</span>
    <ArrowRight className="w-5 h-5" />
  </a>
</div>

      {/* ===== FOOTER ===== */}
      <div className="text-center text-sm text-slate-500">
        <span className="text-cyan-400 font-semibold">{results.skills?.length || 0}</span> verified skills • 
        <span className="text-amber-400 font-semibold ml-1">{results.recommended_job_roles?.length || 0}</span> job matches
      </div>

    </div>
  );
};

export default JobRoleMatchPage;