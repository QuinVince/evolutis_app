import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNewProject = () => {
    // Create a new project with default values
    const newProject = {
      id: 'slr',
      name: 'Systematic Literature Review',
      createdAt: new Date().toISOString(),
      description: '',
      questions: [],
      answers: {},
      pubmedQuery: '',
      collectedDocuments: {
        pubmed: 0,
        semanticScholar: 0
      },
      paperCount: 0,
      freeFullTextCount: 0,
      yearDistribution: {}
    };

    // Store the project in localStorage
    localStorage.setItem('currentProject', JSON.stringify(newProject));
    
    // Navigate to new project page
    navigate('/new-project');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">What do you want to do?</h1>
      <div className="flex gap-4">
        <button
          onClick={handleNewProject}
          className="px-6 py-3 bg-[#62B6CB] text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Start a new project
        </button>
        <button
          onClick={() => {}} // To be implemented
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Work on an existing project
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
