import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { FaTimes,FaChevronDown } from 'react-icons/fa';
import SampleTable from './SampleTable';
import sampleArticlesData from '../assets/sample_articles.json';
import { IoInformationCircleOutline } from "react-icons/io5";
import { HiLanguage } from "react-icons/hi2";
import { IoNewspaperOutline } from "react-icons/io5";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import { PiToolboxBold } from "react-icons/pi";
import { GrDocumentMissing } from "react-icons/gr";
import { HiOutlineLightBulb } from "react-icons/hi";
import FrequentCriteria from './FrequentCriteria';



interface CriteriaSelectionProps {
  onCriteriaChange?: (criteria: string[]) => void;
}

interface Criterion {
  id: string;
  text: string;
  category: string;
}

interface CategoryItem {
  value: string;
  icon: React.ReactNode;
}

interface CriteriaCategory {
  group: string;
  items: CategoryItem[];
}

// Define icons outside to prevent re-creation on each render
const LanguageIcon = <HiLanguage className="w-4 h-4 text-gray-800" />;
const PublicationIcon = <IoNewspaperOutline className="w-4 h-4 text-gray-800" />;
const ScopeIcon = <HiOutlineCheckCircle className="w-4 h-4 text-gray-800" />;
const DeviceIcon = <PiToolboxBold className="w-4 h-4 text-gray-800" />;
const UnusableDataIcon = <GrDocumentMissing className="w-4 h-4 text-gray-800" />;

const CRITERIA_CATEGORIES: {
  group: string;
  items: CategoryItem[];
}[] = [
  {
    group: "Main criteria", 
    items: [
      { value: "Language", icon: LanguageIcon  },
      { value: "Publication", icon: PublicationIcon  },
      { value: "Scope", icon: ScopeIcon  },
      { value: "Device", icon: DeviceIcon }
    ]
  },
  {
    group: "Flags",
    items: [
      { value: "Other", icon: UnusableDataIcon  }
    ]
  }
];

const CriteriaSelection: React.FC<CriteriaSelectionProps> = ({ onCriteriaChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [activeCriteria, setActiveCriteria] = useState<Criterion[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [showCriteria, setShowCriteria] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showTipsTooltip, setShowTipsTooltip] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showCategoryWarning, setShowCategoryWarning] = useState(false);
  const [showFrequentCriteria, setShowFrequentCriteria] = useState(false);
  
  // Define getApplyButtonState before using it in useMemo
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

  // Memoize category items to prevent recreation
  const MEMOIZED_CRITERIA_CATEGORIES = useMemo(() => CRITERIA_CATEGORIES, []);

  // Memoize button state
  const buttonState = useMemo(() => getApplyButtonState(), [activeCriteria.length, isCalculating, hasCalculated]);

  // Memoize handlers
  const handleAddCriterion = useCallback(() => {
    if (!selectedCategory) {
      setShowCategoryWarning(true);
      setTimeout(() => setShowCategoryWarning(false), 3000);
      return;
    }

    if (inputValue.trim() && activeCriteria.length < 7) {
      const newCriterion = {
        id: Date.now().toString(),
        text: inputValue.trim(),
        category: selectedCategory
      };
      setActiveCriteria(prev => [...prev, newCriterion]);
      setInputValue('');
      setShowCategoryWarning(false);
      setIsCalculating(false);
      onCriteriaChange?.([...activeCriteria, newCriterion].map(c => c.text));
    }
  }, [inputValue, selectedCategory, activeCriteria, onCriteriaChange]);

  const handleRemoveCriterion = useCallback((id: string) => {
    setActiveCriteria(prev => {
      const newCriteria = prev.filter(c => c.id !== id);
      onCriteriaChange?.(newCriteria.map(c => c.text));
      return newCriteria;
    });
    setIsCalculating(false);
  }, [onCriteriaChange]);

  // Memoize sample articles transformation
  const transformedSampleArticles = useMemo(() => {
    return sampleArticlesData.map(article => ({
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
  }, [sampleArticlesData]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddCriterion();
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

  // Add handler for frequent criteria
  const handleAddFrequentCriteria = useCallback((text: string, category: string) => {
    const newCriterion = {
      id: Date.now().toString(),
      text,
      category
    };
    setActiveCriteria(prev => [...prev, newCriterion]);
    onCriteriaChange?.([...activeCriteria, newCriterion].map(c => c.text));
    setSelectedCategory(category);
  }, [activeCriteria, onCriteriaChange]);

  return (
    <div className="relative flex flex-col h-full">
      <div className="flex-1 pb-20">
        {/* Input Section with Toggle */}
        <div className="mb-6">
          <div className="flex items-center justify-start mb-4">
            <h1 className="text-2xl font-semibold">Criteria selection</h1>
            <button
              onClick={() => setShowCriteria(!showCriteria)}
              className="pl-4 text-[#0076F5] hover:text-[#0056b3] text-sm underline"
            >
              {showCriteria ? 'Hide criteria' : 'Show criteria'}
            </button>
          </div>
          
          {showCriteria && (
            <div className="flex gap-2">
              <div className="flex flex-grow items-center bg-gray-50 rounded-lg border border-gray-300">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Define your criteria"
                  className="flex-grow px-4 py-5 bg-transparent focus:outline-none"
                />
                
                <div className="flex items-center px-2 gap-2">
                  <div className="relative ">
                    <button
                      onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                      className={`w-40 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#068EF1] bg-white flex items-center gap-2 ${
                        selectedCategory ? 'border-[#068EF1]' : 'border-gray-200' 
                      }`}
                    >
                      {selectedCategory ? (
                        <>
                          {CRITERIA_CATEGORIES
                            .flatMap(group => group.items)
                            .find(item => item.value === selectedCategory)?.icon}
                          <span>{selectedCategory}</span>
                          <FaChevronDown className="ml-auto text-gray-400" />
                        </>
                      ) : (
                        <>
                          <span className="text-gray-500">Select category</span>
                          <FaChevronDown className="ml-auto text-gray-400" />
                        </>
                      )}
                    </button>

                    {showCategoryDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                        {CRITERIA_CATEGORIES.map((group) => (
                          <div key={group.group}>
                            <div className="px-3 py-2 text-sm font-semibold text-gray-500">
                              {group.group}
                            </div>
                            {group.items.map((item) => (
                              <button
                                key={item.value}
                                onClick={() => {
                                  setSelectedCategory(item.value);
                                  setShowCategoryDropdown(false);
                                }}
                                className="w-full px-3 py-2 flex items-start gap-3 hover:bg-gray-50 justify-start pl-6"
                              >
                                <div className={`w-4 h-4 rounded-full border ${
                                  selectedCategory === item.value 
                                    ? 'border-[#068EF1] bg-[#068EF1]' 
                                    : 'border-gray-300'
                                } flex items-center justify-center`}>
                                  {selectedCategory === item.value && (
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                  )}
                                </div>
                                {item.icon}
                                <span className="text-sm">{item.value}</span>
                              </button>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    <button
                      onClick={handleAddCriterion}
                      disabled={!inputValue.trim() || activeCriteria.length >= 7}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        inputValue.trim() 
                          ? 'bg-[#068EF1] text-white hover:bg-[#0576C8]' 
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Add
                    </button>
                    
                    {/* Warning message */}
                    {showCategoryWarning && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 
                                    bg-red-50 text-red-600 text-xs rounded-lg py-2 px-3 shadow-lg border border-red-200">
                        Please select a category first
                        <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full 
                                      border-4 border-transparent border-t-red-50"/>
                      </div>
                    )}
                  </div>

                  <div className="w-px h-6 bg-gray-300 mx-2" />

                  <button
                    onClick={() => setShowFrequentCriteria(true)}
                    className="p-2 bg-white border border-gray-300 rounded-lg text-gray-500 hover:text-[#068EF1] hover:border-[#068EF1] transition-colors relative"
                  >
                    <HiOutlineLightBulb className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Active Criteria - Only show if showCriteria is true */}
        {showCriteria && activeCriteria.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {activeCriteria.map((criterion) => {
                const categoryItem = CRITERIA_CATEGORIES
                  .flatMap(group => group.items)
                  .find(item => item.value === criterion.category);

                return (
                  <div
                    key={criterion.id}
                    className="relative w-[calc(20%-8px)] px-4 py-2 rounded-xl group border border-gray-300"
                  >
                    <div className="pr-6 flex items-center gap-2">
                      {categoryItem?.icon}
                      <div className="w-px h-4 bg-gray-300 mx-2" />
                      <p className="text-black truncate flex-1">
                        {truncateText(criterion.text)}
                      </p>
                      <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute left-0 top-0 transform -translate-y-full bg-[#e5f1fe] border border-[#0076F5] rounded-lg p-2 shadow-lg z-10 w-64 mt-[-8px]">
                        <div className="flex items-center gap-2">
                          {categoryItem?.icon}
                          <div className="w-px h-4 bg-gray-300 mx-4" />
                          <span>{criterion.text}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveCriterion(criterion.id)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-20"
                    >
                      <FaTimes className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Results section */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">Results on 20 papers</h2>
        <SampleTable 
          articles={transformedSampleArticles}
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

      {/* Add FrequentCriteria component */}
      <FrequentCriteria
        isOpen={showFrequentCriteria}
        onClose={() => setShowFrequentCriteria(false)}
        onAddCriteria={handleAddFrequentCriteria}
        activeCriteriaTexts={activeCriteria.map(c => c.text)}
      />
    </div>
  );
};

export default CriteriaSelection; 