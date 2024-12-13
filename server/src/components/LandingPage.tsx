import React, { useState } from 'react';
import { FaFolder, FaClock, FaFile, FaFilter, FaSearch, FaUser, FaCalendar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Project } from '../store/projectSlice';

const LandingPage: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filterKeyword, setFilterKeyword] = useState('');
  const [filterUser, setFilterUser] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const projects = useSelector((state: RootState) => state.projects.projects);
  const navigate = useNavigate();

  const formatCreatedAt = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  };

  const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
    <div 
      onClick={() => navigate(`/project/${project.id}`)}
      className="flex items-center justify-between bg-white rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-center space-x-4">
        <div className="p-2 rounded-full bg-[#DCF8FF]">
          <FaFolder className="w-5 h-5 text-[#068EF1]" />
        </div>
        <div>
          <div className="flex items-center space-x-3">
            <span className="font-medium text-gray-900">{project.name}</span>
            <span className={`px-2 py-1 rounded-md text-xs font-medium ${
              project.status === 'in_progress' 
                ? 'bg-[#DCF8FF] text-[#068EF1]' 
                : 'bg-green-100 text-green-800'
            }`}>
              {project.status === 'in_progress' ? 'In progress' : 'Done'}
            </span>
            <span className="text-sm text-gray-500">{project.author}</span>
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
    </div>
  );

  const ProjectSection: React.FC<{ title: string; status: 'in_progress' | 'done' }> = ({ title, status }) => {
    const filteredProjects = projects.filter(project => project.status === status);
    
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
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        {/* Filter Button and Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <FaFilter className="text-gray-500" />
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
                  <FaSearch className="absolute left-3 top-3 text-gray-400" />
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
                  <FaUser className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>

              {/* Date Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filter by date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-[#068EF1] focus:border-[#068EF1]"
                  />
                  <FaCalendar className="absolute left-3 top-3 text-gray-400" />
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
