// src/components/RadarChartView.jsx
import React, { useMemo } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

const RadarChartView = ({ skills }) => {
  // Define all possible categories – add/remove as needed
  const categoryList = [
    'technical',
    'management',
    'communication',
    'design',
    'testing',
    'devops',
    'security',
    'analytics',
    'soft skills'
  ];

  // Count skills per category
  const categoryData = useMemo(() => {
    const counts = Object.fromEntries(categoryList.map(cat => [cat, 0]));

    skills?.forEach(skill => {
      const category = skill.category?.toLowerCase();
      if (category && counts.hasOwnProperty(category)) {
        counts[category] += 1;
      }
    });

    return categoryList.map(cat => ({
      category: cat,
      value: counts[cat],
      fullMark: Math.max(...Object.values(counts), 5)
    }));
  }, [skills, categoryList]);

  if (!skills?.length) {
    return (
      <div className="text-center text-slate-400 py-8">
        No skills data available for radar chart.
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-white mb-6">
        Skill Category Strength
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={categoryData}>
          <PolarGrid stroke="rgba(255,255,255,0.2)" />
          <PolarAngleAxis
            dataKey="category"
            tick={{ fill: '#cbd5e1', fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 'auto']}
            tick={{ fill: '#94a3b8' }}
          />
          <Radar
            name="Skills"
            dataKey="value"
            stroke="#22d3ee"
            fill="#22d3ee"
            fillOpacity={0.5}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15,23,42,0.9)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              backdropFilter: 'blur(8px)',
              color: '#e2e8f0'
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChartView;