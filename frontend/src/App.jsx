import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ResultsProvider } from './context/ResultsContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import ProjectAnalyzer from './pages/ProjectAnalyzer';
import SkillChartPage from './pages/SkillChartPage';
import JobRoleMatchPage from './pages/JobRoleMatchPage';
import SkillGapPage from './pages/SkillGapPage';
import LearningRoadmapPage from './pages/LearningRoadmapPage';
import SkillGrowthSimulatorPage from './pages/SkillGrowthSimulatorPage';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import ResumeWorkspace from './pages/ResumeWorkspace';

import BridgeMentorAI from "./pages/BridgeMentorAI";

import MockInterviewPage from './pages/MockInterviewPage'; // <-- NEW IMPORT
import Logout from './pages/Logout';

// Placeholders for other routes
const Talks = () => <div className="p-8 text-white text-center">Disha Talks</div>;

function App() {
  return (
    <Router>
      <ResultsProvider>
        <Routes>
          {/* Public routes – no sidebar */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />

          {/* App routes – with persistent sidebar */}
          <Route element={<Layout />}>
            <Route path="/analyzer" element={<ProjectAnalyzer />} />
            <Route path="/skill_chart" element={<SkillChartPage />} />
            <Route path="/role-match" element={<JobRoleMatchPage />} />
            <Route path="/skill-gap" element={<SkillGapPage />} />
            <Route path="/roadmap" element={<LearningRoadmapPage />} />
            <Route path="/growth-simulator" element={<SkillGrowthSimulatorPage />} />
            <Route path="/resume-studio" element={<ResumeAnalyzer />} />
            <Route path="/resume-workspace" element={<ResumeWorkspace />} />
            <Route path="/mock-interview" element={<MockInterviewPage />} /> {/* <-- NEW ROUTE */}
            <Route path="/talks" element={<Talks />} />
            <Route path="/mentor" element={<BridgeMentorAI />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </ResultsProvider>
    </Router>
  );
}

export default App;