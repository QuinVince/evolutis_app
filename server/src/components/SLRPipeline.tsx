import React, { useState, useEffect } from 'react';
import { FaEdit, FaCheck, FaChevronRight } from 'react-icons/fa';
import QueryGenerator from './QueryGenerator';
import QueryParser from './QueryParser';
import NewQuery from './NewQuery';
import DocumentAnalysis from './DocumentAnalysis';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createPipeline, updatePipeline } from '../store/pipelineSlice';
import { updateProjectQueries } from '../store/projectSlice';
import { RootState } from '../store/store';
import CriteriaSelection from './CriteriaSelection';

interface SLRPipelineProps {
  mode?: 'generator' | 'parser';
  initialData?: {
    description?: string;
    query?: string;
    projectTitle?: string;
    projectId: string;
  };
}

// Placeholder components
const FileSelection: React.FC = () => (
  <div className="p-6">
    <h2 className="text-xl font-semibold">File Selection</h2>
    <p className="text-gray-600">Coming soon...</p>
  </div>
);

// Add this interface to track pipeline state
interface PipelineState {
  name: string;
  fileScreening: 'in_progress' | 'completed';
  totalFiles: number | null;
  duplicates: number | null;
  fileSelection: number | null;
  criteria: number | null;
  currentStep: 'screening' | 'criteria' | 'selection';
  screeningStep: 'new' | 'parser' | 'generator';
  queryData: {
    description?: string;
    query?: string;
    projectTitle?: string;
    projectId: string;
  };
}

const SLRPipeline: React.FC<SLRPipelineProps> = ({ mode: initialMode, initialData }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<'screening' | 'criteria' | 'selection'>('screening');
  const [slrTitle, setSlrTitle] = useState('New SLR');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const projectTitle = initialData?.projectTitle || 'Project';

  // Add states for handling the screening flow
  const [screeningStep, setScreeningStep] = useState<'new' | 'parser' | 'generator'>('new');
  const [queryData, setQueryData] = useState({
    ...initialData,
    projectId: initialData?.projectId || ''
  });
  const [pipelineId, setPipelineId] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Initialize with initial mode if provided
  useEffect(() => {
    if (initialMode) {
      setScreeningStep(initialMode);
    }
  }, [initialMode]);

  // Handle title changes without automatic saving
  const handleTitleChange = (newTitle: string) => {
    setSlrTitle(newTitle);
    setIsDirty(true);
    setIsSaved(false);
  };

  // New save handler
  const handleSave = () => {
    if (initialData?.projectId) {
      const newPipelineId = pipelineId || Date.now().toString();
      const pipelineState: PipelineState = {
        name: slrTitle,
        fileScreening: 'in_progress',
        totalFiles: null,
        duplicates: null,
        fileSelection: null,
        criteria: null,
        currentStep: activeTab,
        screeningStep: screeningStep,
        queryData: {
          ...queryData,
          projectId: initialData?.projectId || ''
        }
      };
      
      if (!pipelineId) {
        setPipelineId(newPipelineId);
        dispatch(createPipeline({
          id: newPipelineId,
          projectId: initialData.projectId,
          ...pipelineState
        }));

        dispatch(updateProjectQueries({
          projectId: initialData.projectId,
          queryCount: (currentCount: number) => currentCount + 1
        }));
      } else {
        dispatch(updatePipeline({
          id: pipelineId,
          ...pipelineState
        }));
      }
      
      setIsDirty(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  // Handler for NewQuery submission
  const handleQuerySubmit = (
    mode: 'generator' | 'parser', 
    data: { description?: string; query?: string; projectId?: string }
  ) => {
    setScreeningStep(mode);
    setQueryData({
      ...data,
      projectId: initialData?.projectId || ''  // Ensure projectId is always a string
    });
  };

  const handleTitleEdit = () => {
    setIsEditingTitle(true);
  };

  const handleTitleSave = () => {
    setIsEditingTitle(false);
    if (pipelineId) {
      console.log('Updating pipeline:', {
        id: pipelineId,
        name: slrTitle
      });
      dispatch(updatePipeline({
        id: pipelineId,
        name: slrTitle
      }));
    }
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
            <NewQuery 
              onSubmit={handleQuerySubmit}
              isEmbedded={true}
              projectId={initialData?.projectId}
            />
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'screening':
        return renderScreeningContent();
      case 'criteria':
        return <CriteriaSelection />;
      case 'selection':
        return <FileSelection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Existing content wrapped in a flex-grow div */}
      <div className="flex-grow">
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
          {renderTabContent()}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex justify-end items-center max-w-7xl mx-auto">
          <button
            onClick={handleSave}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              isSaved 
                ? 'bg-green-500 text-white'
                : 'bg-[#068EF1] text-white hover:bg-[#0576C8]'
            }`}
          >
            {isSaved ? (
              <>
                <FaCheck className="w-4 h-4" />
                Saved
              </>
            ) : (
              'Save Pipeline'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SLRPipeline; 