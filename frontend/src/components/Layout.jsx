import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="flex bg-[#020617] min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;