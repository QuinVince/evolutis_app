import React, { useState, useEffect } from 'react';
import { FaEdit, FaCheck, FaChevronRight } from 'react-icons/fa';
import QueryGenerator from './QueryGenerator';
import QueryParser from './QueryParser';
import NewQuery from './NewQuery';
import { Link } from 'react-router-dom';

interface SLRPipelineProps {
  mode?: 'generator' | 'parser';
  initialData?: {
    description?: string;
    query?: string;
    projectTitle?: string;
  };
}

// Placeholder components
const CriteriaSelection: React.FC = () => (
  <div className="p-6">
    <h2 className="text-xl font-semibold">Criteria Selection</h2>
    <p className="text-gray-600">Coming soon...</p>
  </div>
);

const FileSelection: React.FC = () => (
  <div className="p-6">
    <h2 className="text-xl font-semibold">File Selection</h2>
    <p className="text-gray-600">Coming soon...</p>
  </div>
);

const SLRPipeline: React.FC<SLRPipelineProps> = ({ mode: initialMode, initialData }) => {
  const [activeTab, setActiveTab] = useState<'screening' | 'criteria' | 'selection'>('screening');
  const [slrTitle, setSlrTitle] = useState('New SLR');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const projectTitle = initialData?.projectTitle || 'Project';

  // Add states for handling the screening flow
  const [screeningStep, setScreeningStep] = useState<'new' | 'parser' | 'generator'>('new');
  const [queryData, setQueryData] = useState(initialData);

  // Initialize with initial mode if provided
  useEffect(() => {
    if (initialMode) {
      setScreeningStep(initialMode);
    }
  }, [initialMode]);

  // Handler for NewQuery submission
  const handleQuerySubmit = (mode: 'generator' | 'parser', data: typeof initialData) => {
    setScreeningStep(mode);
    setQueryData(data);
  };

  const handleTitleEdit = () => {
    setIsEditingTitle(true);
  };

  const handleTitleSave = () => {
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    }
  };

  const tabs = [
    { id: 'screening', label: 'File Screening' },
    { id: 'criteria', label: 'Criteria Selection' },
    { id: 'selection', label: 'File Selection' }
  ];

  const renderScreeningContent = () => {
    switch (screeningStep) {
      case 'new':
        return (
          <div className="py-8">
            <NewQuery 
              onSubmit={handleQuerySubmit}
              isEmbedded={true}
            />
          </div>
        );
      case 'generator':
        return (
          <QueryGenerator
            initialData={queryData}
            onSaveQuery={() => {}}
            savedQueries={[]}
            onClearQueries={() => {}}
          />
        );
      case 'parser':
        return <QueryParser initialQuery={queryData?.query} />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white px-6 py-4">
        <nav className="flex items-center space-x-2 text-sm">
          <Link to="/" className="text-gray-500 hover:text-gray-700">
            Home
          </Link>
          <FaChevronRight className="text-gray-400 w-3 h-3" />
          <Link 
            to="/new-project" 
            className="text-gray-500 hover:text-gray-700"
          >
            {projectTitle}
          </Link>
          <FaChevronRight className="text-gray-400 w-3 h-3" />
          <span className="text-gray-700">{slrTitle}</span>
        </nav>
      </div>

      {/* Header with editable title */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          {isEditingTitle ? (
            <input
              type="text"
              value={slrTitle}
              onChange={(e) => setSlrTitle(e.target.value)}
              onBlur={handleTitleSave}
              onKeyDown={handleTitleKeyDown}
              className="text-2xl font-bold px-2 py-1 border border-[#068EF1] rounded focus:outline-none focus:ring-2 focus:ring-[#068EF1]"
              autoFocus
            />
          ) : (
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{slrTitle}</h1>
              <button
                onClick={handleTitleEdit}
                className="text-gray-400 hover:text-[#068EF1] transition-colors"
              >
                <FaEdit className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tab Navigation - always visible */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-[#068EF1] text-[#068EF1]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {activeTab === 'screening' && renderScreeningContent()}
        {activeTab === 'criteria' && <CriteriaSelection />}
        {activeTab === 'selection' && <FileSelection />}
      </div>
    </div>
  );
};

export default SLRPipeline; 