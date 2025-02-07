import React, { useState, useEffect, useMemo } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import FullTable, { getArticleStatus } from './FullTable';
import sampleArticlesData from '../assets/sample_articles_full_v2.json';
import StatusCounter from './StatusCounter';
import { HiOutlineDownload } from 'react-icons/hi';


interface FileFilteringTempProps {
  onCriteriaChange?: (criteria: string[]) => void;
}

interface Criterion {
  id: string;
  text: string;
}

interface Article {
  title: string;
  abstract: string;
  answers: string[];
  justifications: string[];
  status?: 'Included' | 'Excluded' | 'Unsure';
  cause?: string;
  comment?: string;
  pubmed_id?: number;
  date?: string;
  manuallyEdited?: boolean;
  study_type?: 'Meta-analysis' | 'Literature Review' | 'RCT' | 'Cohort Study' | 'Opinion' | 'Case Studies' | 'In Vitro' | 'Veterinary';
}

const FileFilteringTemp: React.FC<FileFilteringTempProps> = ({ onCriteriaChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [activeCriteria, setActiveCriteria] = useState<Criterion[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [showCriteria, setShowCriteria] = useState(true);
  
  // Add sampleArticles state
  const [sampleArticles, setSampleArticles] = useState<Article[]>(
    sampleArticlesData.map(article => ({
      title: article.title,
      abstract: article.abstract,
      study_type: (article.study_type || 'Literature Review') as Article['study_type'],
      answers: [
        article["Answer 1"] || '',
        article["Answer 2"] || '',
        article["Answer 3"] || '',
        article["Answer 4"] || ''
      ],
      justifications: [
        article["Justification 1"] || '',
        article["Justification 2"] || '',
        article["Justification 3"] || '',
        article["Justification 4"] || ''
      ],
      status: undefined,
      cause: undefined,
      comment: undefined,
      pubmed_id: article.pubmed_id,
      date: article["publication date"],
      manuallyEdited: false
    }))
  );

  // Add new states for pagination and filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 15;

  // Add new states for filtering
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Add filter handler
  const handleFilterChange = (filters: { status: string; search: string }) => {
    setStatusFilter(filters.status);
    setSearchQuery(filters.search);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Filter and paginate articles
  const filteredArticles = useMemo(() => {
    return sampleArticles.filter(article => {
      // Status filter
      if (statusFilter !== 'all') {
        const articleStatus = getArticleStatus(article.answers).toLowerCase();
        if (articleStatus !== statusFilter) {
          return false;
        }
      }

      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = article.title.toLowerCase().includes(query);
        const matchesAbstract = article.abstract.toLowerCase().includes(query);
        if (!matchesTitle && !matchesAbstract) {
          return false;
        }
      }

      return true;
    });
  }, [sampleArticles, statusFilter, searchQuery]);

  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredArticles.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredArticles, currentPage]);

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

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

  // Add pagination controls component
  const PaginationControls = () => (
    <div className="flex items-center justify-between mt-4 pb-4">
      <div className="text-sm text-gray-500">
        Showing {Math.min(filteredArticles.length, (currentPage - 1) * itemsPerPage + 1)} to{' '}
        {Math.min(filteredArticles.length, currentPage * itemsPerPage)} of {filteredArticles.length} results
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded-lg ${
              currentPage === page
                ? 'bg-[#068EF1] text-white'
                : 'border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}
                  <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
          Next
                  </button>
      </div>
                </div>
  );

  // Add handler for article updates
  const handleArticlesUpdate = (updatedArticles: Article[]) => {
    // Update the articles in sampleArticles state
    setSampleArticles(prevArticles => {
      const newArticles = [...prevArticles];
      updatedArticles.forEach(article => {
        const index = newArticles.findIndex(a => a.title === article.title);
        if (index !== -1) {
          newArticles[index] = article;
        }
      });
      return newArticles;
    });
  };

  // Add a function to count statuses
  const getStatusCounts = (articles: Article[]) => {
    return articles.reduce(
      (acc, article) => {
        const status = getArticleStatus(article.answers).toLowerCase();
        switch (status) {
          case 'included':
            acc.included++;
            break;
          case 'excluded':
            acc.excluded++;
            break;
          case 'unsure':
            acc.unsure++;
            break;
        }
        return acc;
      },
      { included: 0, excluded: 0, unsure: 0 }
    );
  };

  return (
    <div className="relative flex flex-col h-full overflow-visible">
      <div className="flex-1 pb-20 overflow-visible">
        {/* Input Section with Toggle */}
            <div className="mb-6">
          <div className="flex items-center justify-start mb-4">
            <h1 className="text-2xl font-semibold">Abstract review</h1>
              </div>
            </div>

        {/* Active Criteria */}
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


        {/* Results section */}
        
        <FullTable 
          articles={paginatedArticles}
          criteria={activeCriteria.map(c => truncateText(c.text, 30))}
          onFilterChange={handleFilterChange}
          statusFilter={statusFilter}
          searchQuery={searchQuery}
          onArticlesUpdate={handleArticlesUpdate}
        />

        {/* Add pagination controls */}
        <PaginationControls />
                  </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 z-[100]">
        <div className="flex justify-between items-center max-w-[1920px] mx-auto w-full">
          {/* Status counter with margin matching sidebar width */}
          <div className="ml-64">
            <StatusCounter {...getStatusCounts(sampleArticles)} />
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-4">
              <button
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
              <HiOutlineDownload className="w-5 h-5" />
                Export
              </button>
              <button
              className="px-4 py-2 rounded-lg bg-[#068EF1] text-white hover:bg-[#0576C8]"
              >
              Save Pipeline
              </button>
              </div>
            </div>
      </div>
    </div>
  );
};

export default FileFilteringTemp; 