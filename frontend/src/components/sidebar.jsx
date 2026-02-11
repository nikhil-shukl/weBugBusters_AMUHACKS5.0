import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Compass,
  Briefcase,
  Sparkles,
  FileText,
  Layers,
  Search,
  User,
  Settings,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    {
      category: 'HOME',
      items: [
        { name: 'Dashboard', icon: Home, path: '/analyzer' }
      ]
    },
    {
      category: 'EXPLORE',
      items: [
        { name: 'Skill Chart', icon: Compass, path: '/skill_chart' },
        { name: 'Role Match', icon: Briefcase, path: '/role-match' },
        { name: 'Disha Talks', icon: Sparkles, path: '/talks' }
      ]
    },
    {
      category: 'TOOLS',
      items: [
        { name: 'TorchMyResume', icon: FileText, path: '/torch' },
        { name: 'Resume Studio', icon: Layers, path: '/resume-studio' },
        { name: 'Mock Interview', icon: FileText, path: '/mock' },
        { name: 'Skill-set Finder', icon: Search, path: '/skillset' }
      ]
    },
    {
      category: 'ACCOUNT',
      items: [
        { name: 'Log-Out', icon: LogOut, path: '/logout' }
      ]
    }
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#020617]/80 backdrop-blur-2xl border-r border-white/10 z-50">
      {/* ----- BRAND AREA – COMPLETELY EMPTY ----- */}
      {/* No logo, no text – just empty space */}
      
      <nav className="p-4 space-y-6 overflow-y-auto h-screen">
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