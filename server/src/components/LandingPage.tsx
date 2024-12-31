import React, { useState, useMemo } from 'react';
import { FaFolder, FaClock, FaFile, FaFilter, FaSearch, FaUser, FaCalendar, FaTrash } from 'react-icons/fa';
import { PiCalendarDots,PiBooksLight,PiFoldersDuotone,PiClock    } from "react-icons/pi"
import { AiOutlineFileSearch } from "react-icons/ai";
import { IoMdSearch } from "react-icons/io";
import { GrUser } from "react-icons/gr";
import { BsSliders } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { Project } from '../store/projectSlice';
import { deleteProject } from '../store/projectSlice';

const LandingPage: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filterKeyword, setFilterKeyword] = useState('');
  const [filterUser, setFilterUser] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [customDateRange, setCustomDateRange] = useState({
    from: '',
    to: ''
  });

  const projects = useSelector((state: RootState) => state.projects.projects);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Filter projects based on all criteria
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Keyword filter (check name and tags)
      const keywordMatch = filterKeyword.trim() === '' || 
        project.name.toLowerCase().includes(filterKeyword.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(filterKeyword.toLowerCase()));
      
      // User filter
      const userMatch = filterUser === '' || project.author === filterUser;
      
      // Date filter
      let dateMatch = true;
      const projectDate = new Date(project.createdAt);
      const now = new Date();
      
      switch (filterDate) {
        case 'today':
          dateMatch = projectDate.toDateString() === now.toDateString();
          break;
        case 'last7days':
          const last7Days = new Date(now.setDate(now.getDate() - 7));
          dateMatch = projectDate >= last7Days;
          break;
        case 'last30days':
          const last30Days = new Date(now.setDate(now.getDate() - 30));
          dateMatch = projectDate >= last30Days;
          break;
        case 'last3months':
          const last3Months = new Date(now.setMonth(now.getMonth() - 3));
          dateMatch = projectDate >= last3Months;
          break;
        case 'last6months':
          const last6Months = new Date(now.setMonth(now.getMonth() - 6));
          dateMatch = projectDate >= last6Months;
          break;
        case 'lastyear':
          const lastYear = new Date(now.setFullYear(now.getFullYear() - 1));
          dateMatch = projectDate >= lastYear;
          break;
        case 'custom':
          if (customDateRange.from && customDateRange.to) {
            const fromDate = new Date(customDateRange.from);
            const toDate = new Date(customDateRange.to);
            dateMatch = projectDate >= fromDate && projectDate <= toDate;
          }
          break;
        default:
          dateMatch = true;
      }
      
      return keywordMatch && userMatch && dateMatch;
    });
  }, [projects, filterKeyword, filterUser, filterDate, customDateRange]);

  // Get unique users from projects
  const uniqueUsers = useMemo(() => {
    return Array.from(new Set(projects.map(project => project.author)));
  }, [projects]);

  const handleClearFilters = () => {
    setFilterKeyword('');
    setFilterUser('');
    setFilterDate('');
    setCustomDateRange({ from: '', to: '' });
  };

  const formatCreatedAt = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  };

  const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const handleDelete = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (window.confirm('Are you sure you want to delete this project?')) {
        dispatch(deleteProject(project.id));
      }
    };

    return (
      <div 
        onClick={() => navigate(`/project/${project.id}`)}
        className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group"
      >
        <div className="flex items-center space-x-4">
          <div className="p-4 rounded-full bg-[#DCF8FF]">
            <PiFoldersDuotone className="w-6 h-6 text-[#068EF1]" />
          </div>
          <div>
            <div className="flex items-center space-x-3">
              <span className="font-medium text-gray-900 text-xl font-semibold">{project.name}</span>
              <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                project.status === 'in_progress' 
                  ? 'bg-[#5CABFF] text-white' 
                  : 'bg-[#35AC5A] text-white'
              }`}>
                {project.status === 'in_progress' ? 'In progress' : 'Done'}
              </span>
              <span className="text-xs text-gray-500 bg-gray-100 rounded-md px-2 py-1">{project.author}</span>
            </div>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 font-semibold">
              <div className="flex items-center space-x-1">
                <PiClock className="w-4 h-4" />
                <span>{formatCreatedAt(project.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-1 font-semibold">
                <AiOutlineFileSearch className="w-4 h-4" />
                <span>{project.queryCount} litterature reviews</span>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition-all p-2"
        >
          <FaTrash className="w-4 h-4" />
        </button>
      </div>
    );
  };

  const ProjectSection: React.FC<{ title: string; status: 'in_progress' | 'done' }> = ({ title, status }) => {
    const sectionProjects = filteredProjects
      .filter(project => project.status === status)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return (
      <div className="mb-8">
        <div className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
          <div className="space-y-3">
            {sectionProjects.length > 0 ? (
              sectionProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))
            ) : (
              <div className="text-gray-500 text-center py-4">
                No projects found
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-2 max-w-5xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        {/* Filter Button and Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <BsSliders className="text-gray-500" />
            <span className="text-gray-700">Filters</span>
          </button>

          {/* Filter Dropdown */}
          {showFilters && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50">
              {/* Keyword Search */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search by keyword
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={filterKeyword}
                    onChange={(e) => setFilterKeyword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-[#068EF1] focus:border-[#068EF1]"
                    placeholder="Search projects..."
                  />
                  <IoMdSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>

              {/* User Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filter by user
                </label>
                <div className="relative">
                  <select
                    value={filterUser}
                    onChange={(e) => setFilterUser(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-[#068EF1] focus:border-[#068EF1] appearance-none"
                  >
                    <option value="">All users</option>
                    {uniqueUsers.map(user => (
                      <option key={user} value={user}>{user}</option>
                    ))}
                  </select>
                  <GrUser className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>

              {/* Date Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filter by date
                </label>
                <div className="relative">
                  <select
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-[#068EF1] focus:border-[#068EF1] appearance-none"
                  >
                    <option value="">All time</option>
                    <option value="today">Today</option>
                    <option value="last7days">Last 7 days</option>
                    <option value="last30days">Last 30 days</option>
                    <option value="last3months">Last 3 months</option>
                    <option value="last6months">Last 6 months</option>
                    <option value="lastyear">Last year</option>
                    <option value="custom">Custom range...</option>
                  </select>
                  <PiCalendarDots className="absolute left-3 top-3 text-gray-400" />
                </div>
                
                {filterDate === 'custom' && (
                  <div className="mt-2 space-y-2">
                    <div>
                      <label className="block text-xs text-gray-600">From</label>
                      <input
                        type="date"
                        value={customDateRange.from}
                        onChange={(e) => setCustomDateRange(prev => ({ ...prev, from: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#068EF1] focus:border-[#068EF1]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600">To</label>
                      <input
                        type="date"
                        value={customDateRange.to}
                        onChange={(e) => setCustomDateRange(prev => ({ ...prev, to: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#068EF1] focus:border-[#068EF1]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Clear Filters Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleClearFilters}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Clear filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <ProjectSection title="In Progress" status="in_progress" />
      <ProjectSection title="Done" status="done" />
    </div>
  );
};

export default LandingPage;
