import React, { useState, useEffect, useRef } from 'react';
import { BsCalendar3 } from "react-icons/bs";
import { HiOutlineDocumentSearch } from "react-icons/hi";
interface Article {
  title: string;
  abstract: string;
  answers: string[];
  justifications: string[];
  pubmed_id?: number;
  date?: string;
}

interface SampleTableProps {
  articles: Article[];
  criteria: string[];
  isCalculating: boolean;
  onCalculationComplete: () => void;
}

const SampleTable: React.FC<SampleTableProps> = ({ 
  articles, 
  criteria, 
  isCalculating,
  onCalculationComplete 
}) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [loadedRows, setLoadedRows] = useState<number[]>([]);
  const [calculationComplete, setCalculationComplete] = useState(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Reset states when criteria change
  useEffect(() => {
    setLoadedRows([]);
    setCalculationComplete(false);
    timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    timeoutsRef.current = [];
  }, [criteria.length]);

  useEffect(() => {
    if (isCalculating) {
      setLoadedRows([]); // Reset loaded rows
      setCalculationComplete(false);
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current = [];
      
      // Calculate row by row for all columns
      articles.forEach((_, rowIndex) => {
        const timeout = setTimeout(() => {
          if (!isCalculating) return; // Don't update if not calculating

          setLoadedRows(prev => [...prev, rowIndex]);

          // If this is the last row, mark calculation as complete
          if (rowIndex === articles.length - 1) {
            setCalculationComplete(true);
            onCalculationComplete();
          }
        }, rowIndex * 500);

        timeoutsRef.current.push(timeout);
      });
    }

    return () => {
      if (!isCalculating) {
        timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
        timeoutsRef.current = [];
      }
    };
  }, [isCalculating, articles.length, criteria.length]);

  const getAnswerColor = (answer: string) => {
    switch (answer.toLowerCase()) {
      case 'yes':
        return 'bg-green-500';
      case 'no':
        return 'bg-red-500';
      case 'uncertain':
        return 'bg-gray-400';
      default:
        return 'bg-gray-200';
    }
  };

  const isRowLoaded = (rowIndex: number) => {
    return loadedRows.includes(rowIndex) || calculationComplete;
  };

  const getAnswerLabel = (answer: string): string => {
    switch (answer.toLowerCase()) {
      case 'yes':
        return 'Included';
      case 'no':
        return 'Excluded';
      case 'uncertain':
        return 'Uncertain';
      default:
        return 'Not evaluated';
    }
  };

  // Add helper function to check if results should be shown
  const shouldShowResults = (rowIndex: number) => {
    return (isCalculating || calculationComplete) && isRowLoaded(rowIndex);
  };

  const renderBasicTable = () => (
    <table className="w-full table-fixed divide-y divide-gray-200 border-collapse">
      <colgroup>
        <col className="w-[70%]" />
        <col className="w-[30%]" />
      </colgroup>
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border border-gray-200">
            Title
          </th>
          <th className="px-6 py-2 text-center text-[10px] font-bold text-black uppercase tracking-wider border border-gray-200">
            Abstract
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {articles.map((article, rowIndex) => (
          <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            <td className="px-6 py-2 text-sm text-[#5C5C5C] font-semibold border border-gray-200">
              <div className="truncate" title={article.title}>
                {article.title}
              </div>
            </td>
            <td className="px-2 py-2 text-sm border border-gray-200">
              <div className="flex justify-center">
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="text-[#0076F5] hover:text-[#0056b3] underline text-center text-s whitespace-nowrap"
                >
                  See abstract
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderFullTable = () => (
    <table className="w-full table-fixed divide-y divide-gray-200 border-collapse">
      <colgroup>
        <col className="w-[42%]" />
        <col className="w-[10%]" />
        {criteria.map((_, i) => (
          <col key={i} className="w-[8%]" />
        ))}
      </colgroup>
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border border-gray-200">
            Title
          </th>
          <th className="px-6 py-2 text-center text-[10px] font-bold text-black uppercase tracking-wider border border-gray-200">
            Abstract
          </th>
          {criteria.map((_, i) => (
            <th 
              key={i}
              className="px-2 py-2 text-center text-[10px] font-bold text-black uppercase tracking-wider border border-gray-200"
            >
              {`Criteria ${i + 1}`}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {articles.map((article, rowIndex) => (
          <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            <td className="px-6 py-2 text-sm text-[#5C5C5C] font-semibold border border-gray-200">
              <div className="truncate" title={article.title}>
                {article.title}
              </div>
            </td>
            <td className="px-2 py-2 text-sm border border-gray-200">
              <div className="flex justify-center">
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="text-[#0076F5] hover:text-[#0056b3] underline text-center text-s whitespace-nowrap"
                >
                  See abstract
                </button>
              </div>
            </td>
            {criteria.map((_, columnIndex) => (
              <td key={columnIndex} className="px-6 py-1 whitespace-nowrap text-sm text-center border border-gray-200">
                <div className="flex justify-center items-center">
                  {(isCalculating || calculationComplete) && isRowLoaded(rowIndex) && (
                    <div className="relative group">
                      <div className="w-5 h-5 rounded-md border-2 border-gray-300 flex items-center justify-center">
                        <div 
                          className={`w-2 h-2 rounded-full ${getAnswerColor(article.answers[columnIndex])}`}
                        />
                      </div>
                      {/* Tooltip */}
                      <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                                    absolute left-1/2 bottom-full transform -translate-x-1/2 -translate-y-2
                                    bg-gray-900 text-white text-xs rounded py-1 px-2 w-48 z-50
                                    whitespace-normal text-left">
                        {article.justifications[columnIndex] || 'No justification provided'}
                        {/* Arrow */}
                        <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full
                                      border-4 border-transparent border-t-gray-900"/>
                      </div>
                    </div>
                  )}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="mt-8">
      <div className="rounded-xl border border-gray-200">
        {criteria.length > 0 ? renderFullTable() : renderBasicTable()}
      </div>

      {/* Enhanced Abstract Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full mx-4">
            {/* Header with close button */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1 pr-4">
                <h2 className="text-xl font-semibold mb-4">{selectedArticle.title}</h2>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            {/* Abstract content */}
            <div className="mb-4">
              <p className="text-gray-600 whitespace-pre-wrap">{selectedArticle.abstract}</p>
            </div>

            {/* Metadata */}
            <div className="flex gap-6 mb-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="font-medium flex items-center">
                  <BsCalendar3 className="mr-1" />
                  <span>Date</span>
                </span>
                <span>{selectedArticle.date || '12/12/23'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium flex items-center">
                  <HiOutlineDocumentSearch className="mr-1" />
                  <span>Source</span>
                </span>
                <span>Pubmed</span>
              </div>
            </div>

            {/* Criteria Results - Only show if results are calculated */}
            {criteria.length > 0 && shouldShowResults(articles.findIndex(a => a === selectedArticle)) && (
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-semibold mb-3">Criteria Results</h3>
                <div className="space-y-3">
                  {criteria.map((criterion, index) => (
                    <div key={index} className="flex flex-col">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-medium">{criterion}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-md border-2 border-gray-300 flex items-center justify-center">
                            <div 
                              className={`w-2 h-2 rounded-full ${getAnswerColor(selectedArticle.answers[index])}`}
                            />
                          </div>
                          <span className="text-sm text-gray-600">
                            {getAnswerLabel(selectedArticle.answers[index])}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 pl-4">
                        {selectedArticle.justifications[index] || 'No justification provided'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SampleTable; 