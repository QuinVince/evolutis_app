import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import booksIcon from '../assets/image_books.png';
import { FaArrowRight, FaCheck } from 'react-icons/fa';

interface Source {
  id: string;
  name: string;
  selected: boolean;
}

const NewProject: React.FC = () => {
  const [query, setQuery] = useState('');
  const [showSourcesDropdown, setShowSourcesDropdown] = useState(false);
  const [sources, setSources] = useState<Source[]>([
    { id: 'pubmed', name: 'PubMed', selected: true },
    { id: 'semantic', name: 'Semantic Scholar', selected: true }
  ]);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedSources = sources.filter(source => source.selected);
    const project = {
      description: query,
      answers: {},
      sources: selectedSources.map(s => s.id)
    };
    localStorage.setItem('currentProject', JSON.stringify(project));
    
    navigate('/query-generator', { state: { description: query } });
  };

  const toggleSource = (sourceId: string) => {
    setSources(prevSources => 
      prevSources.map(source => 
        source.id === sourceId 
          ? { ...source, selected: !source.selected }
          : source
      )
    );
  };

  const getSelectedSourcesText = () => {
    const selectedSources = sources.filter(s => s.selected);
    if (selectedSources.length === 0) return "Select sources";
    if (selectedSources.length === sources.length) return "All sources";
    return selectedSources.map(s => s.name).join(', ');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-xl w-full px-6">
        <h1 className="text-2xl font-bold text-center mb-8 text-black">
          Start a new project
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-3 border border-[#BDBDBD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#62B6CB] focus:ring-offset-2 pr-14"
              placeholder="Describe your research..."
              rows={4}
            />
            <button
              type="submit"
              className="absolute bottom-3 right-3 p-2 bg-[#62B6CB] text-white rounded-lg hover:bg-[#5AA3B7] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#62B6CB] focus:ring-offset-2"
            >
              <FaArrowRight className="w-5 h-5" />
            </button>

            {/* Sources Selector */}
            <div className="absolute bottom-3 left-3">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowSourcesDropdown(!showSourcesDropdown)}
                  className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#62B6CB] flex items-center gap-2"
                >
                  {getSelectedSourcesText()}
                </button>

                {/* Dropdown Menu */}
                {showSourcesDropdown && (
                  <div className="absolute bottom-full mb-2 left-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10">
                    {sources.map(source => (
                      <button
                        key={source.id}
                        type="button"
                        onClick={() => toggleSource(source.id)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                      >
                        {source.name}
                        {source.selected && (
                          <FaCheck className="w-3 h-3 text-[#62B6CB]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4">
            <button
              type="button"
              onClick={() => navigate('/projects')}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 
                transition-colors duration-200 flex items-center gap-3 text-gray-700 font-semibold text-lg"
            >
              <img src={booksIcon} alt="" className="w-6 h-6" />
              <span>Start from an existing query</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProject; 