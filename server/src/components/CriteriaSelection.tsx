import React, { useState, useEffect } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { FiPlusCircle  } from "react-icons/fi";
import SampleTable from './SampleTable';
import sampleArticlesData from '../assets/sample_articles.json';

interface CriteriaSelectionProps {
  onCriteriaChange?: (criteria: string[]) => void;
}

interface Criterion {
  id: string;
  text: string;
}

const CriteriaSelection: React.FC<CriteriaSelectionProps> = ({ onCriteriaChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [activeCriteria, setActiveCriteria] = useState<Criterion[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [showCriteria, setShowCriteria] = useState(true);
  
  // Suggested criteria - these would typically come from props or an API
  const [suggestedCriteria] = useState([
    'Example criteria 1',
    'Example criteria 2',
    'Example criteria 3',
    'Example criteria 4',
    'Example criteria 5',
  ]);

  // Transform the JSON data to match the Article interface
  const sampleArticles = sampleArticlesData.map(article => ({
    title: article.title,
    abstract: article.abstract,
    answers: [
      article["Answer 1"] || '',
      article["Answer 2"] || '',
      article["Answer 3"] || '',
      article["Answer 4"] || '',
      article["Answer 5"] || '',
      article["Answer 6"] || ''
    ],
    justifications: [
      article["Justification 1"] || '',
      article["Justification 2"] || '',
      article["Justification 3"] || '',
      article["Justification 4"] || '',
      article["Justification 5"] || '',
      article["Justification 6"] || ''
    ]
  }));

  const handleAddCriterion = () => {
    if (inputValue.trim() && activeCriteria.length < 7) {
      const newCriterion = {
        id: Date.now().toString(),
        text: inputValue.trim()
      };
      setActiveCriteria([...activeCriteria, newCriterion]);
      setInputValue('');
      setIsCalculating(false);
      onCriteriaChange?.([...activeCriteria, newCriterion].map(c => c.text));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddCriterion();
    }
  };

  const handleRemoveCriterion = (id: string) => {
    setActiveCriteria(activeCriteria.filter(c => c.id !== id));
    setIsCalculating(false);
    onCriteriaChange?.(activeCriteria.filter(c => c.id !== id).map(c => c.text));
  };

  const handleSuggestedCriterionClick = (text: string) => {
    if (activeCriteria.length < 7) {
      const newCriterion = {
        id: Date.now().toString(),
        text
      };
      setActiveCriteria([...activeCriteria, newCriterion]);
      setIsCalculating(false);
      onCriteriaChange?.([...activeCriteria, newCriterion].map(c => c.text));
    }
  };

  const truncateText = (text: string, maxLength: number = 50) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const handleApply = () => {
    if (activeCriteria.length > 0 && !isCalculating && !hasCalculated) {
      setIsCalculating(true);
    }
  };

  const handleCalculationComplete = () => {
    setIsCalculating(false);
    setHasCalculated(true);
  };

  // Reset hasCalculated when criteria change
  useEffect(() => {
    setHasCalculated(false);
  }, [activeCriteria.length]);

  // Add this function to determine button state
  const getApplyButtonState = () => {
    if (activeCriteria.length === 0) {
      return {
        disabled: true,
        className: 'bg-gray-200 text-gray-500 cursor-not-allowed',
        text: 'Apply'
      };
    }
    
    if (isCalculating) {
      return {
        disabled: true,
        className: 'bg-gray-200 text-gray-500 cursor-not-allowed',
        text: 'Calculating...'
      };
    }

    if (hasCalculated) {
      return {
        disabled: true,
        className: 'bg-gray-200 text-gray-500 cursor-not-allowed',
        text: 'Results Available'
      };
    }

    return {
      disabled: false,
      className: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
      text: 'Apply'
    };
  };

  const buttonState = getApplyButtonState();

  return (
    <div className="relative flex flex-col h-full">
      <div className="flex-1 pb-20">
        {/* Input Section with Toggle */}
        <div className="mb-6">
          <div className="flex items-center justify-start mb-4">
            <h1 className="text-2xl font-semibold">Criteria definition</h1>
            <button
              onClick={() => setShowCriteria(!showCriteria)}
              className="pl-4 text-[#0076F5] hover:text-[#0056b3] text-sm underline"
            >
              {showCriteria ? 'Hide criteria' : 'Show criteria'}
            </button>
          </div>
          
          {showCriteria && (
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Define your criteria"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#068EF1] focus:border-transparent"
                disabled={activeCriteria.length >= 7}
              />
              <button
                onClick={handleAddCriterion}
                disabled={!inputValue.trim() || activeCriteria.length >= 7}
                className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiPlusCircle className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          )}
        </div>

        {/* Active Criteria - Only show if showCriteria is true */}
        {showCriteria && activeCriteria.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {activeCriteria.map((criterion) => (
                <div
                  key={criterion.id}
                  className="relative w-[calc(20%-8px)] bg-[#e5f1fe] px-4 py-2 rounded-lg group border border-[#0076F5]"
                >
                  <div className="pr-6">
                    <p className="text-black truncate">
                      {truncateText(criterion.text)}
                    </p>
                    <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute left-0 top-0 transform -translate-y-full bg-[#e5f1fe] border border-[#0076F5] rounded-lg p-2 shadow-lg z-10 w-64 mt-[-8px]">
                      {criterion.text}
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveCriterion(criterion.id)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-20"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suggested Criteria - Only show if showCriteria is true */}
        {showCriteria && activeCriteria.length < 7 && (
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-3">
              <h2 className="text-sm font-medium text-gray-500">Examples</h2>
              <div className="flex flex-wrap gap-2">
                {suggestedCriteria
                  .filter(text => !activeCriteria.some(c => c.text === text))
                  .map((text, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedCriterionClick(text)}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors"
                    >
                      {text}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Results section */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">Results on 20 papers</h2>
        <SampleTable 
          articles={sampleArticles}
          criteria={activeCriteria.map(c => truncateText(c.text, 30))}
          isCalculating={isCalculating}
          onCalculationComplete={handleCalculationComplete}
        />
      </div>

      {/* Footer - adjusted z-index and width */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 z-[100]">
        <div className="flex justify-end items-center gap-4">
          <button
            onClick={handleApply}
            disabled={buttonState.disabled}
            className={`px-4 py-2 rounded-lg transition-colors ${buttonState.className}`}
          >
            {buttonState.text}
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-[#068EF1] text-white hover:bg-[#0576C8]"
          >
            Save Pipeline
          </button>
        </div>
      </div>
    </div>
  );
};

export default CriteriaSelection; 