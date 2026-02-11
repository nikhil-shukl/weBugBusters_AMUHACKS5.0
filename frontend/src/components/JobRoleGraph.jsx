import React, { useMemo, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { useResults } from '../context/ResultsContext';
import { jobRoleSkills } from '../data/jobRoleSkills'; // <-- IMPORT

const JobRoleGraph = () => {
  const { results } = useResults();
  const [highlightRole, setHighlightRole] = useState(null);

  const graphData = useMemo(() => {
    if (!results?.skills || !results?.recommended_job_roles) return { nodes: [], links: [] };

    const nodes = [];
    const links = [];
    const nodeIds = new Set();

    // Add skill nodes
    results.skills.forEach((skill, i) => {
      const id = `skill-${i}`;
      nodes.push({
        id,
        name: skill.name,
        type: 'skill',
        val: 8,
        color: '#22d3ee'
      });
      nodeIds.add(id);
    });

    // Add job role nodes
    results.recommended_job_roles.forEach((role, i) => {
      const id = `role-${i}`;
      nodes.push({
        id,
        name: role,
        type: 'role',
        val: 12,
        color: '#c084fc'
      });
      nodeIds.add(id);

      // Connect to skills that match the role
      const requiredSkills = jobRoleSkills[role] || [];
      results.skills.forEach((skill, skillIdx) => {
        if (requiredSkills.includes(skill.name)) {
          links.push({
            source: `skill-${skillIdx}`,
            target: id,
            value: 1
          });
        }
      });
    });

    return { nodes, links };
  }, [results]);

  if (!results?.skills || !results?.recommended_job_roles) {
    return (
      <div className="glass-panel p-12 text-center">
        <div className="text-slate-400 text-lg mb-4">No analysis data available</div>
        <p className="text-slate-500">Please analyze a project first to see your job role matching graph.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 w-full h-[600px] relative">
      <h3 className="text-2xl font-bold text-white mb-4">Job Role Matching Network</h3>
      <p className="text-slate-400 mb-6">
        Your skills are connected to recommended job roles. Thicker lines = stronger match.
      </p>
      
      <ForceGraph2D
        graphData={graphData}
        nodeLabel={node => `${node.name} (${node.type})`}
        nodeColor={node => node.color}
        nodeRelSize={6}
        linkWidth={link => 1 + (link.value || 1)}
        linkColor={() => 'rgba(255,255,255,0.3)'}
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={0.005}
        backgroundColor="#020617"
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
          ctx.fillText(label, node.x, node.y - node.val - 4);
        }}
        onNodeClick={node => {
          if (node.type === 'role') {
            setHighlightRole(node.name);
          }
        }}
      />
      
      {highlightRole && (
        <div className="absolute bottom-6 left-6 glass-panel p-4">
          <p className="text-cyan-400 font-semibold">Selected: {highlightRole}</p>
          <button 
            onClick={() => setHighlightRole(null)}
            className="text-sm text-slate-400 hover:text-white mt-2"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};

export default JobRoleGraph;