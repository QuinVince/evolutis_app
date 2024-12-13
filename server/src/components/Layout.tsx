import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaPlus, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentProjectTitle } from '../store/querySlice';
import logo from '../utils/evolutis-logo.png';
import iconHome from '../utils/icon-home.png';
import { RootState } from '../store/store';

interface Project {
  id: string;
  name: string;
  status: 'in_progress' | 'done';
}

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
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const projects = useSelector((state: RootState) => state.projects.projects);
  const projectsByStatus = {
    inProgress: projects.filter(p => p.status === 'in_progress'),
    done: projects.filter(p => p.status === 'done')
  };

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
    dispatch(setCurrentProjectTitle(projectTitle));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      dispatch(setCurrentProjectTitle(projectTitle));
    }
  };

  const ProjectList: React.FC<{ title: string; projects: Project[]; isDone?: boolean }> = ({ 
    title, 
    projects,
    isDone = false 
  }) => (
    <div className="mb-4">
      <div className="flex items-center justify-between px-4 py-2">
        <span className="text-sm font-bold text-black">{title} ({projects.length})</span>
      </div>
      <div className="space-y-1">
        {projects.map(project => (
          <button
            key={project.id}
            onClick={() => navigate(`/project/${project.id}`)}
            className="w-full px-8 py-2 text-left hover:bg-gray-100 flex items-center space-x-2"
          >
            <span className={`w-3 h-3 rounded-full ${isDone ? 'bg-green-500' : 'bg-blue-500'}`} />
            <span className="text-sm text-gray-700 truncate">{project.name}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      {/* Left Sidebar */}
      <div className={`bg-white border-r flex-shrink-0 transition-all duration-300 ${
        isSidebarExpanded ? 'w-64' : 'w-12'
      }`}>
        {/* Sidebar Header - Removed border-b */}
        <div className="h-20 flex items-center justify-between px-6">
          {isSidebarExpanded && (
            <button 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <img src={iconHome} alt="Home" className="w-12 h-12" />
              <h1 className="text-2xl font-bold">SLR</h1>
            </button>
          )}
          <button 
            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaBars className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Content */}
        {isSidebarExpanded && (
          <div className="py-4 px-6">
            <button
              onClick={() => navigate('/new-project')}
              className="w-full px-6 py-2 text-left hover:bg-gray-100 flex items-center space-x-2 mb-4"
            >
              <FaPlus className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-700">New Project</span>
            </button>

            <ProjectList 
              title="IN PROGRESS" 
              projects={projectsByStatus.inProgress} 
            />
            <ProjectList 
              title="DONE" 
              projects={projectsByStatus.done}
              isDone 
            />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b h-16 flex-shrink-0">
          <div className="h-full px-4 flex items-center justify-between max-w-[1920px] mx-auto w-full">
            <div className="flex items-center gap-4">
              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#068EF1]"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-4 w-4 text-gray-400" />
                </div>
              </div>

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

            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/new-project')}
                className="px-4 py-2 bg-[#068EF1] text-white rounded-lg hover:bg-[#068EF1]/90 transition-colors flex items-center gap-2"
              >
                <FaPlus className="w-4 h-4" />
                <span>New</span>
              </button>
              <img src={logo} alt="Logo" className="h-8 w-auto" />
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