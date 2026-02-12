import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ResultsProvider } from './context/ResultsContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import ProjectAnalyzer from './pages/ProjectAnalyzer';
import SkillChartPage from './pages/SkillChartPage';
import JobRoleMatchPage from './pages/JobRoleMatchPage';
import SkillGapPage from './pages/SkillGapPage';               // <-- NEW
import LearningRoadmapPage from './pages/LearningRoadmapPage'; // <-- NEW
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import ResumeWorkspace from './pages/ResumeWorkspace';
import BridgeMentorAI from "./pages/BridgeMentorAI";


// Placeholders
const Talks = () => <div className="p-8 text-white text-center">Disha Talks</div>;

function App() {
  return (
    <Router>
      <ResultsProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />

          <Route element={<Layout />}>
            <Route path="/analyzer" element={<ProjectAnalyzer />} />
            <Route path="/skill_chart" element={<SkillChartPage />} />
            <Route path="/role-match" element={<JobRoleMatchPage />} />
            <Route path="/skill-gap" element={<SkillGapPage />} />          {/* NEW */}
            <Route path="/roadmap" element={<LearningRoadmapPage />} />     {/* NEW */}
            <Route path="/resume-studio" element={<ResumeAnalyzer />} />
            <Route path="/resume-workspace" element={<ResumeWorkspace />} />
            <Route path="/talks" element={<Talks />} />
            <Route path="/mentor" element={<BridgeMentorAI />} />
          </Route>
        </Routes>
      </ResultsProvider>
    </Router>
  );
}

export default App;