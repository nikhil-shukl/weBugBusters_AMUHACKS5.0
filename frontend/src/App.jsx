import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import ProjectAnalyzer from './pages/ProjectAnalyzer';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Marketing Page - Opens First */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Authentication/OTP Page */}
        <Route path="/signup" element={<SignUp />} />
        
        {/* Core Tool - Upload & Analyze Page */}
        <Route path="/analyzer" element={<ProjectAnalyzer />} />
      </Routes>
    </Router>
  );
}

export default App;