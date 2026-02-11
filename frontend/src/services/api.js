import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Mock implementation – no real backend required
export const analyzeProject = async (file) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Dummy response that matches your expected API format
  return {
    summary: "The project demonstrates strong full-stack development skills with React and Node.js. Evidence shows ability to build REST APIs, integrate databases, and implement responsive UI components.",
    career_readiness_score: 78,
    skills: [
      { name: "React", category: "technical", depth: "Advanced", evidence: "Built component library and managed state with Redux" },
      { name: "Node.js", category: "technical", depth: "Intermediate", evidence: "Created REST endpoints with Express" },
      { name: "MongoDB", category: "technical", depth: "Intermediate", evidence: "Designed schemas and aggregation pipelines" },
      { name: "UI/UX Design", category: "design", depth: "Intermediate", evidence: "Created wireframes and responsive layouts" },
      { name: "Team Leadership", category: "management", depth: "Beginner", evidence: "Coordinated 3-member team sprints" },
      { name: "Technical Writing", category: "communication", depth: "Intermediate", evidence: "Wrote API documentation and user guide" },
      { name: "Jest Testing", category: "testing", depth: "Beginner", evidence: "Wrote unit tests for React components" }
    ],
    industry_gap_analysis: [
      "Cloud deployment experience (AWS/Azure) not demonstrated",
      "CI/CD pipeline implementation missing",
      "No evidence of performance optimisation"
    ],
    suggested_skills_to_learn: [
      "AWS/GCP Basics",
      "Docker & Kubernetes",
      "GraphQL",
      "TypeScript"
    ],
    recommended_job_roles: [
      "Frontend Developer",
      "Full Stack Developer",
      "UI Developer"
    ]
  };
};
export default api;