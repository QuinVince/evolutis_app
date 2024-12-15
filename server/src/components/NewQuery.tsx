import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import booksIcon from '../assets/image_books.png';
import { FaArrowRight, FaCheck, FaExchangeAlt, FaCalendar, FaBook } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';

interface Source {
  id: string;
  name: string;
  selected: boolean;
}

type Mode = 'description' | 'query';

interface NewQueryProps {
  onSubmit?: (mode: 'generator' | 'parser', data: { 
    description?: string; 
    query?: string;
    projectId?: string;
  }) => void;
  isEmbedded?: boolean;
  projectId?: string;
}

const NewQuery: React.FC<NewQueryProps> = ({ onSubmit, isEmbedded = false, projectId }) => {
  const [mode, setMode] = useState<Mode>('description');
  const [input, setInput] = useState('');
  const [showSourcesDropdown, setShowSourcesDropdown] = useState(false);
  const [sources, setSources] = useState<Source[]>([
    { id: 'pubmed', name: 'PubMed', selected: true },
    { id: 'semantic', name: 'Semantic Scholar', selected: true }
  ]);
  const [dateRange, setDateRange] = useState('All time');
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedSources = sources.filter(source => source.selected);
    const project = {
      description: input,
      answers: {},
      sources: selectedSources.map(s => s.id),
      mode: mode,
      projectId
    };
    localStorage.setItem('currentProject', JSON.stringify(project));
    
    if (isEmbedded && onSubmit) {
      onSubmit(
        mode === 'description' ? 'generator' : 'parser',
        {
          description: mode === 'description' ? input : undefined,
          query: mode === 'query' ? input : undefined,
          projectId
        }
      );
    } else {
      navigate('/slr-pipeline', { 
        state: { 
          mode: mode === 'description' ? 'generator' : 'parser',
          initialData: {
            description: mode === 'description' ? input : undefined,
            query: mode === 'query' ? input : undefined,
            projectId
          }
        }
      });
    }
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

  const dateOptions = [
    'All time',
    'Last year',
    'Last 2 years',
    'Last 5 years',
    'Custom range...'
  ];

  const titles = [
    'Start from a description',
    'Start from an existing PubMed query'
  ];

  return (
    <div className="bg-white">
      <div className="w-full  px-6">
        <h1 className="text-2xl font-bold mb-8 text-black h-8">
          <Typewriter
            words={[mode === 'description' ? titles[0] : titles[1]]}
            cursorStyle='|'
            typeSpeed={20}
            deleteSpeed={50}
            delaySpeed={600}
            key={mode}
          />
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-4 py-3 border border-[#BDBDBD] rounded-xl 
                focus:outline-none focus:ring-2 focus:ring-[#068EF1] focus:ring-offset-2 pr-14
                bg-gray-50"
              placeholder={mode === 'description' ? "Describe your research..." : "Paste your PubMed query..."}
              rows={4}
            />
            <button
              type="submit"
              disabled={!input}
              className={`absolute bottom-3 right-3 p-2 rounded-lg 
                transition-colors duration-200 focus:outline-none 
                focus:ring-2 focus:ring-[#068EF1] focus:ring-offset-2
                ${input ? 'bg-[#068EF1] text-white hover:bg-[#5AA3B7]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
              <FaArrowRight className="w-4 h-4" />
            </button>

            {/* Bottom Controls */}
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              {/* Date Selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowDateDropdown(!showDateDropdown)}
                  className="px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs 
                    text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 
                    focus:ring-[#068EF1] flex items-center gap-2"
                >
                  <FaCalendar className="w-3 h-3 text-gray-500" />
                  <span>
                    Date: <span className="font-bold">{dateRange}</span>
                  </span>
                </button>

                {showDateDropdown && (
                  <div className="absolute bottom-full mb-2 left-0 w-48 bg-white 
                    border border-gray-200 rounded-lg shadow-lg py-2 z-10"
                  >
                    {dateOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setDateRange(option);
                          setShowDateDropdown(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-xs text-gray-700 
                          hover:bg-gray-50 flex items-center justify-between
                          ${dateRange === option ? 'font-bold' : ''}`}
                      >
                        {option}
                        {dateRange === option && (
                          <FaCheck className="w-3 h-3 text-[#068EF1]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Sources Selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowSourcesDropdown(!showSourcesDropdown)}
                  className="px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs 
                    text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 
                    focus:ring-[#068EF1] flex items-center gap-2"
                >
                  <FaBook className="w-3 h-3 text-gray-500" />
                  <span>
                    Sources: <span className="font-bold">{getSelectedSourcesText()}</span>
                  </span>
                </button>

                {showSourcesDropdown && (
                  <div className="absolute bottom-full mb-2 left-0 w-48 bg-white 
                    border border-gray-200 rounded-lg shadow-lg py-2 z-10"
                  >
                    {sources.map(source => (
                      <button
                        key={source.id}
                        type="button"
                        onClick={() => toggleSource(source.id)}
                        className={`w-full px-4 py-2 text-left text-xs text-gray-700 
                          hover:bg-gray-50 flex items-center justify-between
                          ${source.selected ? 'font-bold' : ''}`}
                      >
                        {source.name}
                        {source.selected && (
                          <FaCheck className="w-3 h-3 text-[#068EF1]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mode Switch Button - Reduced size */}
          <button
            type="button"
            onClick={toggleMode}
            className="w-full max-w-sm px-3 py-2 bg-white border border-gray-200 rounded-xl 
              hover:bg-gray-50 transition-colors duration-200 flex items-center 
              gap-2 text-gray-700 text-sm"
          >
            <img src={booksIcon} alt="" className="w-4 h-4" />
            <span className="flex-grow text-left">
              {mode === 'description' ? 'Start from an existing PubMed query' : 'Start from a description'}
            </span>
            <FaExchangeAlt className="w-3 h-3 text-gray-400" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewQuery; 