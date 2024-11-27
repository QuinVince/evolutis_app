import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewProject: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save project in localStorage
    const project = {
      description: query,
      answers: {}
    };
    localStorage.setItem('currentProject', JSON.stringify(project));
    
    // Navigate to query generator with state
    navigate('/query-generator', { state: { description: query } });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-xl w-full px-6">
        <h1 className="text-2xl font-bold text-center mb-8 text-black">
          Start a new project
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-3 border border-[#BDBDBD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#62B6CB] focus:ring-offset-2"
              placeholder="Describe your research..."
              rows={4}
            />
          </div>
          <div className="flex flex-col items-start gap-4">
            <button
              type="submit"
              className="px-6 py-3 bg-[#62B6CB] text-white rounded-xl hover:bg-[#5AA3B7] transition-colors duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-[#62B6CB] focus:ring-offset-2"
            >
              Continue
            </button>
            <button
              type="button"
              className="px-6 py-3 border-2 border-[#62B6CB] text-[#62B6CB] rounded-xl hover:bg-gray-50 transition-colors duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-[#62B6CB] focus:ring-offset-2"
              onClick={() => {/* Add functionality later */}}
            >
              Continue another project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProject; 