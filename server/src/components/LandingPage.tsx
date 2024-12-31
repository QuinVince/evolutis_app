import React, { useState } from 'react';
import { FaFolder, FaClock, FaFile, FaFilter, FaSearch, FaUser, FaCalendar, FaTrash } from 'react-icons/fa';
import { PiCalendarDots,PiBooksLight   } from "react-icons/pi";
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

  const projects = useSelector((state: RootState) => state.projects.projects);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
            <FaFolder className="w-6 h-6 text-[#068EF1]" />
          </div>
          <div>
            <div className="flex items-center space-x-3">
              <span className="font-medium text-gray-900 text-xl font-semibold">{project.name}</span>
              <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                project.status === 'in_progress' 
                  ? 'bg-[#5CABFF] text-white' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {project.status === 'in_progress' ? 'In progress' : 'Done'}
              </span>
              <span className="text-xs text-gray-500 bg-gray-100 rounded-md px-2 py-1">{project.author}</span>
            </div>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <FaClock className="w-4 h-4" />
                <span>{formatCreatedAt(project.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <FaFile className="w-4 h-4" />
                <span>{project.queryCount} queries</span>
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
    const filteredProjects = projects
      .filter(project => project.status === status)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    return (
      <div className="mb-8">
        <div className="bg-gray-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
          <div className="space-y-3">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
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
                    <option value="fanny">Fanny M.</option>
                    <option value="other">Other users...</option>
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
                  {filterDate === 'custom' && (
                    <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                      <div className="flex gap-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">From</label>
                          <input
                            type="date"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#068EF1] focus:border-[#068EF1]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">To</label>
                          <input
                            type="date"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#068EF1] focus:border-[#068EF1]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Apply/Clear Buttons */}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setFilterKeyword('');
                    setFilterUser('');
                    setFilterDate('');
                  }}
                  className="px-3 py-1.5 text-gray-600 hover:text-gray-800"
                >
                  Clear
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="px-3 py-1.5 bg-[#068EF1] text-white rounded-lg hover:bg-[#068EF1]/90"
                >
                  Apply Filters
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
