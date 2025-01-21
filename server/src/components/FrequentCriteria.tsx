import React, { useState, useMemo } from 'react';
import { MdSearch  } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaRegCheckCircle } from "react-icons/fa";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import { PiToolboxBold } from "react-icons/pi";
import { IoMdSearch } from "react-icons/io";
import { FREQUENT_CRITERIA } from '../utils/mockData';

interface FrequentCriteriaProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCriteria: (text: string, category: string) => void;
  activeCriteriaTexts: string[];
}

const FrequentCriteria: React.FC<FrequentCriteriaProps> = ({
  isOpen,
  onClose,
  onAddCriteria,
  activeCriteriaTexts
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [addedCriteria, setAddedCriteria] = useState<Set<number>>(new Set());

  // Category icons mapping
  const categoryIcons = {
    "Study Type": <IoNewspaperOutline  className="w-4 h-4 text-gray-800" />,
    "Quality": <FaRegCheckCircle className="w-4 h-4 text-gray-800" />,
    "Evidence": <MdSearch className="w-4 h-4 text-gray-800" />,
    "Methodology": <PiToolboxBold className="w-4 h-4 text-gray-800" />
  };

  // Filter criteria based on category and search query
  const filteredCriteria = useMemo(() => {
    return FREQUENT_CRITERIA.all.filter(criterion => {
      const matchesCategory = selectedCategory === "All" || criterion.category === selectedCategory;
      const matchesSearch = criterion.text.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categoryButtons = [
    { label: "All", count: 140 },
    { label: "Study Type", count: FREQUENT_CRITERIA.categoryCounts['Study Type'] },
    { label: "Quality", count: FREQUENT_CRITERIA.categoryCounts.Quality },
    { label: "Evidence", count: FREQUENT_CRITERIA.categoryCounts.Evidence },
    { label: "Methodology", count: FREQUENT_CRITERIA.categoryCounts.Methodology }
  ];

  // Check if a criterion is already added by comparing its text
  const isCriteriaAdded = (criterionText: string) => {
    return activeCriteriaTexts.includes(criterionText);
  };

  const handleAddCriteria = (criterion: typeof FREQUENT_CRITERIA.all[0]) => {
    onAddCriteria(criterion.text, criterion.category);
    setAddedCriteria(prev => new Set([...Array.from(prev), criterion.id]));
  };

  return (
    <>
      {/* Grey overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40"
          onClick={onClose}
        />
      )}
      
      <div 
        className={`fixed inset-y-0 right-0 w-[700px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } z-50`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Most used criterias</h2>
          </div>

          {/* Category filters */}
          <div className="flex items-center gap-2 p-4 border-b border-gray-200">
            {categoryButtons.map(({ label, count }) => (
              <button
                key={label}
                onClick={() => setSelectedCategory(label)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  selectedCategory === label
                    ? 'bg-[#068EF1] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {label !== "All" && categoryIcons[label as keyof typeof categoryIcons]}
                <span>{label}</span>
                <span className="text-sm">({count})</span>
              </button>
            ))}
          </div>

          {/* Search input */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for criterias"
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#068EF1]"
              />
              <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* Criteria list */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-3">
              {filteredCriteria.map((criterion) => (
                <div
                  key={criterion.id}
                  className="flex h-full bg-white border border-gray-200 rounded-xl hover:border-[#068EF1] transition-colors"
                >
                  {/* Icon container */}
                  <div className="px-4 py-4 flex items-center justify-center">
                    {categoryIcons[criterion.category as keyof typeof categoryIcons]}
                  </div>

                  {/* Separator */}
                  <div className="w-px bg-gray-300" />

                  {/* Content container */}
                  <div className="flex flex-1 items-center justify-end px-4 py-4">
                    {/* Text container with fixed width */}
                    <div className="w-[380px]">
                      <p className="text-sm text-gray-700">{criterion.text}</p>
                    </div>
                    
                    {/* Number container with fixed width */}
                    <div className="w-[100px] flex justify-end">
                      <span className="text-sm text-gray-500 px-3 py-1 rounded-lg border border-gray-200">
                        {criterion.usageCount} times
                      </span>
                    </div>
                    
                    {/* Button container with fixed width */}
                    <div className="w-[80px] flex justify-end">
                      <button
                        onClick={() => handleAddCriteria(criterion)}
                        disabled={isCriteriaAdded(criterion.text)}
                        className={`px-4 py-1 text-sm rounded-lg transition-colors ${
                          isCriteriaAdded(criterion.text)
                            ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                            : 'bg-[#068EF1] text-white hover:bg-[#0576C8]'
                        }`}
                      >
                        {isCriteriaAdded(criterion.text) ? 'Added' : 'Add'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FrequentCriteria; 