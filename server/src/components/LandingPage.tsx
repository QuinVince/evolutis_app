import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { FaClock } from 'react-icons/fa';

interface RecentProject {
  id: string;
  name: string;
  creator: string;
  lastModified: string;
}

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const savedQueries = useSelector((state: RootState) => state.query.savedQueries);

  // Placeholder data for recent projects
  const recentProjects: RecentProject[] = [
    {
      id: '1',
      name: 'Knee arthroplasty',
      creator: 'Fanny Moneger',
      lastModified: '2 days ago'
    },
    {
      id: '2',
      name: 'Knee arthroplasty UC',
      creator: 'Fanny Moneger',
      lastModified: '5 days ago'
    },
    {
      id: '3',
      name: 'Dual mobility',
      creator: 'Delphine Bauer',
      lastModified: '1 week ago'
    }
  ];

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">What do you want to do?</h1>
      <div className="flex gap-4 mb-12">
        <button
          onClick={() => navigate('/new-project')}
          className="px-6 py-3 bg-[#068EF1] text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Start a new project
        </button>
        <button
          onClick={() => navigate('/projects')}
          className={`px-6 py-3 ${
            savedQueries.length > 0 
              ? 'bg-[#068EF1] text-white hover:bg-opacity-90' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          } rounded-lg transition-colors`}
          disabled={savedQueries.length === 0}
        >
          Continue a project
        </button>
      </div>

      {/* Recent Projects Section */}
      {recentProjects.length > 0 && (
        <div className="w-full max-w-2xl">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <FaClock className="text-[#068EF1]" />
            Recent Projects
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => navigate(`/projects/${project.id}`)}
                className="p-4 hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-between"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{project.name}</h3>
                  <p className="text-sm text-gray-500">{project.creator}</p>
                </div>
                <span className="text-sm text-gray-400">{project.lastModified}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
