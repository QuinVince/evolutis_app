import React, { useState, useEffect, useRef } from 'react';

interface Article {
  title: string;
  abstract: string;
  answers: string[];
  justifications: string[];
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
  const [selectedAbstract, setSelectedAbstract] = useState<string | null>(null);
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

  return (
    <div className="mt-8">
      <div className="rounded-xl border border-gray-200">
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
                      onClick={() => setSelectedAbstract(article.abstract)}
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
      </div>

      {/* Abstract Modal */}
      {selectedAbstract && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">Abstract</h3>
              <button
                onClick={() => setSelectedAbstract(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <p className="text-gray-600 whitespace-pre-wrap">{selectedAbstract}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SampleTable; 