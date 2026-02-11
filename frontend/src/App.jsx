import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ResultsProvider } from './context/ResultsContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import ProjectAnalyzer from './pages/ProjectAnalyzer';
import SkillChartPage from './pages/SkillChartPage';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import ResumeWorkspace from './pages/ResumeWorkspace';
import JobRoleMatchPage from './pages/JobRoleMatchPage';
// ❌ REMOVE this incorrect import:
// import Sidebar from "./pages/Sidebar";

// ✅ Keep this if you need it elsewhere, but it's not used in App.jsx
// The Sidebar is already used inside Layout, so we don't need to import it here.

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
            <Route path="/resume-studio" element={<ResumeAnalyzer />} />
            <Route path="/resume-workspace" element={<ResumeWorkspace />} />
            <Route path="/talks" element={<Talks />} />
          </Route>
        </Routes>
      </ResultsProvider>
    </Router>
  );
}

export default App;