import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import booksIcon from '../assets/image_books.png';
import { FaArrowRight, FaCheck, FaExchangeAlt } from 'react-icons/fa';

interface Source {
  id: string;
  name: string;
  selected: boolean;
}

type Mode = 'description' | 'query';

const NewProject: React.FC = () => {
  const [mode, setMode] = useState<Mode>('description');
  const [input, setInput] = useState('');
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
      description: input,
      answers: {},
      sources: selectedSources.map(s => s.id),
      mode: mode // Save the mode to handle differently in query generation
    };
    localStorage.setItem('currentProject', JSON.stringify(project));
    
    navigate('/query-generator', { state: { description: input, mode } });
  };

  const toggleMode = () => {
    setMode(mode === 'description' ? 'query' : 'description');
    setInput(''); // Clear input when switching modes
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
          {mode === 'description' ? 'Start from a description' : 'Start from an existing PubMed query'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-4 py-3 border border-[#BDBDBD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#62B6CB] focus:ring-offset-2 pr-14"
              placeholder={mode === 'description' ? "Describe your research..." : "Paste your PubMed query..."}
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

          {/* Mode Switch Button */}
          <button
            type="button"
            onClick={toggleMode}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 
              transition-colors duration-200 flex items-center gap-3 text-gray-700 font-semibold text-lg"
          >
            <img src={booksIcon} alt="" className="w-6 h-6" />
            <span className="flex-grow text-left">
              {mode === 'description' ? 'Start from an existing PubMed query' : 'Start from a description'}
            </span>
            <FaExchangeAlt className="w-4 h-4 text-gray-400" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProject; 