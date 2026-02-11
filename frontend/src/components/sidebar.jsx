// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Compass,
  MessageCircle,
  Sparkles,
  FileText,
  Briefcase,
  Layers,
  Search,
  User,
  Settings
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    {
      category: 'HOME',
      items: [
        { name: 'Dashboard', icon: Home, path: '/analyzer' }
        // Skill Chart removed from HOME
      ]
    },
    {
      category: 'EXPLORE',
      items: [
        { name: 'Skill Chart', icon: Compass, path: '/skill_chart' }, // <-- HERE
        { name: 'Community', icon: MessageCircle, path: '/community' },
        { name: 'Disha Talks', icon: Sparkles, path: '/talks' }
      ]
    },
    {
      category: 'TOOLS',
      items: [
        { name: 'TorchMyResume', icon: FileText, path: '/torch' },
        { name: 'CV Forge', icon: Briefcase, path: '/cvforge' },
        { name: 'Mock Interview', icon: Layers, path: '/mock' },
        { name: 'Skill-set Finder', icon: Search, path: '/skillset' }
      ]
    },
    {
      category: 'ACCOUNT',
      items: [{ name: 'Log-Out', icon: User, path: '/' }]
    },
    
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#020617]/80 backdrop-blur-2xl border-r border-white/10 z-50">
      {/* Brand */}
      <div className="flex items-center space-x-3 p-5 border-b border-white/10">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#22d3ee] to-[#c084fc] shadow-lg shadow-cyan-500/20">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">Bridge-AI</h2>
          <p className="text-[10px] text-slate-400 font-medium uppercase">by weBugBusters</p>
        </div>
      </div>

      <nav className="p-4 space-y-6 overflow-y-auto h-[calc(100vh-80px)]">
        {navItems.map((section) => (
          <div key={section.category}>
            <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              {section.category}
            </h3>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`
                    }
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;