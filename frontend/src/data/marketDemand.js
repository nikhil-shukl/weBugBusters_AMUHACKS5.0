// Skill category demand scores (based on real job market analysis)
export const marketDemand = {
  technical: 12,
  management: 7,
  communication: 8,
  design: 6,
  testing: 5,
  devops: 9,
  security: 8,
  analytics: 10,
  'soft skills': 7,
  other: 3
};

// Role‑specific demand mapping for roadmap priority
export const roleSkillDemand = {
  'Frontend Developer': ['React', 'JavaScript', 'TypeScript', 'CSS', 'HTML', 'Tailwind', 'Next.js'],
  'Full Stack Developer': ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS'],
  'Backend Developer': ['Node.js', 'Python', 'Express', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS'],
  'Data Scientist': ['Python', 'SQL', 'Pandas', 'Scikit-learn', 'TensorFlow', 'PyTorch'],
  'DevOps Engineer': ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD', 'Linux'],
  // ... add more as needed (can be extended)
};