import React, { useState } from 'react';
import { IoMdInformationCircle, IoMdSearch } from "react-icons/io";
import { IoCalendarOutline } from "react-icons/io5";

interface Article {
  title: string;
  abstract: string;
  answers: string[];
  justifications: string[];
  status?: string;
  cause?: string;
  comment?: string;
  pubmed_id?: number;
  date?: string;
}

interface FullTableProps {
  articles: Article[];
  criteria: string[];
}

const FullTable: React.FC<FullTableProps> = ({ articles, criteria }) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [dateFilter, setDateFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const STATUS_OPTIONS = [
    { value: 'all', label: 'All Status' },
    { value: 'included', label: 'Included' },
    { value: 'excluded', label: 'Excluded' },
    { value: 'uncertain', label: 'Uncertain' },
    { value: 'pending', label: 'Pending Review' }
  ];

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

  const getAnswerLabel = (answer: string): string => {
    switch (answer.toLowerCase()) {
      case 'yes':
        return 'Yes';
      case 'no':
        return 'No';
      case 'uncertain':
        return 'Uncertain';
      default:
        return 'Not evaluated';
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-4 items-center">
        {/* Date filter */}
        <div className="relative">
          <input
            type="month"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#068EF1] w-40"
          />
          <IoCalendarOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#068EF1] w-40"
        >
          {STATUS_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Search filter */}
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search in title or abstract..."
            className="w-15px pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#068EF1]"
          />
          <IoMdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div className="relative">
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <div className="flex">
            {/* Fixed columns (Title, Abstract, Status, Cause) */}
            <div className="w-[60%] flex-shrink-0 border-r border-gray-200">
              <table className="w-full table-fixed">
                <colgroup>
                  <col className="w-[45%]" /> {/* Title */}
                  <col className="w-[20%]" /> {/* Abstract */}
                  <col className="w-[10%]" /> {/* Status */}
                  <col className="w-[20%]" /> {/* Cause */}
                </colgroup>
                <thead className="bg-[#E9EDF1]">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold text-black tracking-wider border-b border-r border-gray-200">
                      Title
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-bold text-black tracking-wider border-b border-r border-gray-200">
                      Abstract
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-bold text-black tracking-wider border-b border-r border-gray-200">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-bold text-black tracking-wider border-b border-r border-gray-200">
                      Cause
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {articles.map((article, rowIndex) => (
                    <tr key={rowIndex} className="bg-white" style={{ height: '41px' }}>
                      <td className="px-6 py-2 text-sm text-[#5C5C5C] font-semibold border-b border-r border-gray-200">
                        <div className="truncate" title={article.title}>
                          {article.title}
                        </div>
                      </td>
                      <td className="px-2 py-2 text-sm border-b border-r border-gray-200">
                        <div className="flex justify-center">
                          <button
                            onClick={() => setSelectedArticle(article)}
                            className="text-[#0076F5] hover:text-[#0056b3] underline text-center text-s whitespace-nowrap"
                          >
                            Abstract
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-2 text-sm border-b border-r border-gray-200">
                        <div className="text-center">
                          {article.status || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-2 text-sm border-b border-r border-gray-200">
                        <div className="text-center">
                          {article.cause || '-'}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Scrollable criteria columns + Comment */}
            <div className="flex-1 overflow-x-auto">
              <table className="w-full table-fixed">
                <colgroup>
                  {/* 6 criteria columns */}
                  {Array(6).fill(0).map((_, i) => (
                    <col key={i} className="w-[140px]" />
                  ))}
                  {/* Comment column */}
                  <col className="w-[200px]" />
                </colgroup>
                <thead className="bg-[#E9EDF1]">
                  <tr>
                    {Array(6).fill(0).map((_, i) => (
                      <th 
                        key={i}
                        className="px-2 py-3 text-center text-sm font-bold text-gray-700 tracking-wider border-b border-r border-gray-200 sticky top-0"
                      >
                        {`Criteria ${i + 1}`}
                      </th>
                    ))}
                    <th 
                      className="px-2 py-3 text-center text-sm font-bold text-gray-700 tracking-wider border-b border-r border-gray-200 sticky top-0"
                    >
                      Comment
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {articles.map((article, rowIndex) => (
                    <tr key={rowIndex} className="bg-white" style={{ height: '41px' }}>
                      {Array(6).fill(0).map((_, columnIndex) => (
                        <td key={columnIndex} className="px-6 py-2 whitespace-nowrap text-sm border-b border-r border-gray-200">
                          <div className="flex justify-start items-center h-full">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1.5">
                                <div 
                                  className={`w-2 h-2 rounded-full ${getAnswerColor(article.answers[columnIndex] || '')}`}
                                />
                                <span className="text-s font-semibold text-gray-600">
                                  {getAnswerLabel(article.answers[columnIndex] || '')}
                                </span>
                              </div>
                              <div className="relative group flex items-center">
                                <button className="text-gray-400 hover:text-gray-600 flex items-center">
                                  <IoMdInformationCircle className="w-4 h-4 text-gray-500" />
                                </button>
                                <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                                            fixed ml-[-150px] bottom-auto transform -translate-y-full
                                            bg-gray-900 text-white text-xs rounded-lg py-2 px-3 w-48 z-[200]
                                            whitespace-normal text-left mt-[-10px]">
                                  {article.justifications[columnIndex] || 'No justification provided'}
                                  <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full
                                              border-4 border-transparent border-t-gray-900"/>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      ))}
                      <td className="px-6 py-2 text-sm border-b border-r border-gray-200">
                        <div className="text-center">
                          {article.comment || '-'}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Abstract Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {/* Modal content */}
          </div>
        )}
      </div>
    </div>
  );
};

export default FullTable; 