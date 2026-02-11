import React from 'react';
import ProjectAnalyzer from './pages/ProjectAnalyzer';

function App() {
  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans antialiased">
      {/* Ambient Background Glow Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none"></div>
      
      {/* Main App Content */}
      <div className="relative z-10">
        <ProjectAnalyzer />
      </div>
    </div>
  );
}

export default App;