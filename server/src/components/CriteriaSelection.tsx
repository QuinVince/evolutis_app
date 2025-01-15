import React, { useState, useEffect } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import { GiMedicalDrip } from "react-icons/gi";
import { GrDocumentMissing } from "react-icons/gr";
import SampleTable from './SampleTable';
import sampleArticlesData from '../assets/sample_articles.json';
import { IoInformationCircleOutline } from "react-icons/io5";
import { HiLanguage } from "react-icons/hi2";
import { IoNewspaperOutline } from "react-icons/io5";
import { BiTargetLock } from "react-icons/bi";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { MdOutlineDataObject } from "react-icons/md";

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

const CRITERIA_CATEGORIES: {
  group: string;
  items: CategoryItem[];
}[] = [
  {
    group: "Main criterias", 
    items: [
      { value: "Language", icon: <HiLanguage className="w-4 h-4 text-gray-800" /> },
      { value: "Publication", icon: <IoNewspaperOutline className="w-4 h-4 text-gray-800" /> },
      { value: "Scope", icon: <BiTargetLock className="w-4 h-4 text-gray-800" /> },
      { value: "Device", icon: <GiMedicalDrip className="w-4 h-4 text-gray-800" /> }
    ]
  },
  {
    group: "Other",
    items: [
      { value: "Unusable data", icon: <GrDocumentMissing className="w-4 h-4 text-gray-800" /> }
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
        text: inputValue.trim(),
        category: selectedCategory
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
                      className={`w-45 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#068EF1] bg-white flex items-center gap-2 ${
                        selectedCategory ? 'border-[#068EF1]' : 'border-gray-200' 
                      }`}
                    >
                      {selectedCategory ? (
                        <>
                          {CRITERIA_CATEGORIES
                            .flatMap(group => group.items)
                            .find(item => item.value === selectedCategory)?.icon}
                          <span>{selectedCategory}</span>
                        </>
                      ) : (
                        <span className="text-gray-500">Select category</span>
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

                  <div className="w-px h-6 bg-gray-300 mx-2" />

                  <button
                    onClick={() => setShowTipsTooltip(!showTipsTooltip)}
                    className="p-2 text-gray-500 hover:text-[#068EF1] transition-colors relative"
                  >
                    <IoInformationCircleOutline className="w-5 h-5" />
                    {showTipsTooltip && (
                      <div className="absolute bottom-full right-0 mb-2 w-96 bg-white text-sm rounded-xl shadow-xl border border-[#068EF1]/20 p-6 z-50">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                            <IoInformationCircleOutline className="w-5 h-5 text-[#068EF1]" />
                            <h3 className="font-semibold text-[#068EF1]">Tips for writing criteria</h3>
                          </div>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#068EF1] mt-2" />
                              <span>Be specific and clear in your criteria definition</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#068EF1] mt-2" />
                              <span>Use measurable terms when possible</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#068EF1] mt-2" />
                              <span>Consider both inclusion and exclusion criteria</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#068EF1] mt-2" />
                              <span>Avoid ambiguous language</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
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