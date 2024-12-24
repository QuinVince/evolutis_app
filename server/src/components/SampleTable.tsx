import React, { useState, useEffect } from 'react';

interface Article {
  title: string;
  abstract: string;
  answers: string[];
}

interface SampleTableProps {
  articles: Article[];
  criteria: string[];
}

const SampleTable: React.FC<SampleTableProps> = ({ articles, criteria }) => {
  const [selectedAbstract, setSelectedAbstract] = useState<string | null>(null);
  const [loadedRows, setLoadedRows] = useState<{ [key: number]: number[] }>({});
  const criteriaHeaders = Array.from({ length: 6 }, (_, i) => `Criteria ${i + 1}`);

  // Track which criteria column is currently loading
  const [loadingColumn, setLoadingColumn] = useState<number | null>(null);

  useEffect(() => {
    const currentCriteriaCount = criteria.length;
    const previousCriteriaCount = Object.keys(loadedRows).length;

    // If a new criteria was added
    if (currentCriteriaCount > previousCriteriaCount) {
      const newColumnIndex = previousCriteriaCount;
      setLoadingColumn(newColumnIndex);

      // Load rows one by one
      articles.forEach((_, rowIndex) => {
        setTimeout(() => {
          setLoadedRows(prev => ({
            ...prev,
            [newColumnIndex]: [...(prev[newColumnIndex] || []), rowIndex]
          }));

          // If this is the last row, mark column as done loading
          if (rowIndex === articles.length - 1) {
            setLoadingColumn(null);
          }
        }, rowIndex * 500); // 500ms delay between each row
      });
    }
  }, [criteria.length, articles.length]);

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

  const isAnswerLoaded = (columnIndex: number, rowIndex: number) => {
    return loadedRows[columnIndex]?.includes(rowIndex);
  };

  return (
    <div className="mt-8">
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full table-fixed divide-y divide-gray-200 border-collapse">
          <colgroup>
            <col className="w-[42%]" />
            <col className="w-[10%]" />
            <col className="w-[8%]" />
            <col className="w-[8%]" />
            <col className="w-[8%]" />
            <col className="w-[8%]" />
            <col className="w-[8%]" />
            <col className="w-[8%]" />
          </colgroup>
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-black uppercase tracking-wider border border-gray-200">
                Title
              </th>
              <th className="px-6 py-2 text-center text-[10px] font-bold text-black uppercase tracking-wider border border-gray-200">
                Abstract
              </th>
              {criteriaHeaders.map((header) => (
                <th 
                  key={header}
                  className="px-2 py-2 text-center text-[10px] font-bold text-black uppercase tracking-wider border border-gray-200"
                >
                  {header}
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
                      className="text-[#0076F5] hover:text-[#0056b3] underline text-center text-xs whitespace-nowrap"
                    >
                      See abstract
                    </button>
                  </div>
                </td>
                {Array.from({ length: 6 }, (_, columnIndex) => (
                  <td key={columnIndex} className="px-6 py-1 whitespace-nowrap text-sm text-center border border-gray-200">
                    <div className="flex justify-center items-center">
                      {columnIndex < criteria.length && isAnswerLoaded(columnIndex, rowIndex) && (
                        <div className="w-5 h-5 rounded-md border-2 border-gray-300 flex items-center justify-center">
                          <div 
                            className={`w-2 h-2 rounded-full ${getAnswerColor(article.answers[columnIndex])}`}
                            title={article.answers[columnIndex]}
                          />
                        </div>
                      )}
                      {columnIndex < criteria.length && !isAnswerLoaded(columnIndex, rowIndex) && loadingColumn === columnIndex && (
                        <div className="w-5 h-5 rounded-md border-2 border-gray-300 flex items-center justify-center animate-pulse">
                          <div className="w-2 h-2 rounded-full bg-gray-200" />
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