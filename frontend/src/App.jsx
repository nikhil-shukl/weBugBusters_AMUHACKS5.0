// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ResultsProvider } from './context/ResultsContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import ProjectAnalyzer from './pages/ProjectAnalyzer';
import SkillChartPage from './pages/SkillChartPage'; // your new page

// Other placeholders (you can add more as needed)
const Community = () => <div className="p-8 text-white text-center">Community</div>;
const Talks = () => <div className="p-8 text-white text-center">Disha Talks</div>;
// ... etc

function App() {
  return (
    <Router>
      <ResultsProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />

          <Route element={<Layout />}>
            <Route path="/analyzer" element={<ProjectAnalyzer />} />
            <Route path="/skill_chart" element={<SkillChartPage />} /> {/* ← exact match */}
            <Route path="/community" element={<Community />} />
            <Route path="/talks" element={<Talks />} />
            {/* other routes */}
          </Route>
        </Routes>
      </ResultsProvider>
    </Router>
  );
}

export default App;