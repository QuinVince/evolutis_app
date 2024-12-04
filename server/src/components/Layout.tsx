import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaBars } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setCurrentProjectTitle } from '../store/querySlice';
import logo from '../utils/quinten-health-logo.png';

interface LayoutProps {
  children: React.ReactNode;
  projectTitle: string;
  onProjectTitleChange: (title: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, projectTitle, onProjectTitleChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Show project title only on query-generator page
  const showProjectTitle = location.pathname === '/query-generator';

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    // Save to store when editing is done
    dispatch(setCurrentProjectTitle(projectTitle));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      // Save to store when Enter is pressed
      dispatch(setCurrentProjectTitle(projectTitle));
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      {/* Left Sidebar */}
      <div className="w-12 bg-white border-r flex-shrink-0 flex flex-col items-center pt-4">
        <button className="text-[#068EF1] hover:text-[#068EF1]/80 p-2">
          <FaBars className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b h-12 flex-shrink-0">
          <div className="h-full px-4 flex items-center justify-between max-w-[1920px] mx-auto w-full">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/')}
                className="bg-[#068EF1] p-1.5 rotate-45 hover:bg-[#068EF1]/80 transition-colors rounded-lg"
              >
                <div className="-rotate-45">
                  <FaHome className="w-4 h-4 text-black" />
                </div>
              </button>
              
              {/* Project Title Tag - Only show on query-generator page */}
              {showProjectTitle && (
                <div 
                  className="flex items-center bg-gray-100 rounded-lg px-3 py-1"
                  onDoubleClick={handleDoubleClick}
                >
                  {isEditing ? (
                    <input
                      ref={inputRef}
                      type="text"
                      value={projectTitle}
                      onChange={(e) => onProjectTitleChange(e.target.value)}
                      onBlur={handleBlur}
                      onKeyDown={handleKeyDown}
                      className="bg-transparent border-none focus:outline-none text-sm font-medium"
                      style={{ minWidth: '80px', width: `${projectTitle.length}ch` }}
                    />
                  ) : (
                    <span className="text-sm font-medium cursor-pointer">
                      {projectTitle}
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="flex-shrink-0 pr-4">
              <img src={logo} alt="Logo" className="h-10 w-auto my-1" />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto px-6">
          <div className="h-full max-h-[calc(100vh-4rem)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout; 