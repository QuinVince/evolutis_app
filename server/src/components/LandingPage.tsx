import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const savedQueries = useSelector((state: RootState) => state.query.savedQueries);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">What do you want to do?</h1>
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/new-project')}
          className="px-6 py-3 bg-[#62B6CB] text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Start a new project
        </button>
        <button
          onClick={() => navigate('/projects')}
          className={`px-6 py-3 ${
            savedQueries.length > 0 
              ? 'bg-[#62B6CB] text-white hover:bg-opacity-90' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          } rounded-lg transition-colors`}
          disabled={savedQueries.length === 0}
        >
          Continue a project {savedQueries.length > 0 && `(${savedQueries.length})`}
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
