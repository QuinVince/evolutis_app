import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaBars } from 'react-icons/fa';
import logo from '../utils/quinten-health-logo.png';

interface LayoutProps {
  children: React.ReactNode;
  projectTitle: string;
  onProjectTitleChange: (title: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, projectTitle, onProjectTitleChange }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Sidebar */}
      <div className="w-12 bg-white border-r fixed h-full flex flex-col items-center pt-4">
        <button className="text-[#62B6CB] hover:text-[#62B6CB]/80 p-2">
          <FaBars className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-12">
        {/* Top Bar */}
        <header className="bg-white border-b fixed w-full top-0 z-50 h-12">
          <div className="container mx-auto h-full px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/')}
                className="bg-[#62B6CB] p-1.5 rotate-45 hover:bg-[#62B6CB]/80 transition-colors rounded-lg"
              >
                <div className="-rotate-45">
                  <FaHome className="w-4 h-4 text-black" />
                </div>
              </button>
              
              {/* Project Title Tag */}
              <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1">
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => onProjectTitleChange(e.target.value)}
                  className="bg-transparent border-none focus:outline-none text-sm font-medium"
                  style={{ minWidth: '80px', width: `${projectTitle.length}ch` }}
                />
              </div>
            </div>
            <img src={logo} alt="Logo" className="h-10 w-auto my-1" />
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-16">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 