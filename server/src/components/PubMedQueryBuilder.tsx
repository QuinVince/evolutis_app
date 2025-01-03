import React, { useState, useEffect } from 'react';
import { FaPlus, FaTimes, FaCheck } from 'react-icons/fa';
import bulbIcon from '../assets/image_bulb.png';
import SynonymTooltip from './SynonymTooltip';
import { useDispatch } from 'react-redux';
import { saveQuery } from '../store/querySlice';
import { SavedQuery } from '../App';
import axios from 'axios';



interface PubMedQueryBuilderProps {
  query: string;
  onQueryChange: (newQuery: string) => void;
  onLightbulbClick: (index: number, event: React.MouseEvent<HTMLButtonElement>) => void;
  isGeneratingPubMed: boolean;
  estimatedDocuments: number | null;
  synonymGroups: Array<{
    concept: string;
    abstraction: string;
    synonyms: string[];
  }>;
  documentStats?: {
    files: number;
    duplicates: number;
  };
  onCollect?: () => void;
  description: string;
  questions: string[];
  answers: Record<string, string>;
}

interface Subquery {
  content: string;
  operator: 'AND' | 'OR';
}

type QueryMode = 'build' | 'finished';

const PubMedQueryBuilder: React.FC<PubMedQueryBuilderProps> = ({
  query,
  onQueryChange,
  onLightbulbClick,
  isGeneratingPubMed,
  estimatedDocuments,
  synonymGroups,
  documentStats = { files: 873, duplicates: 144 },
  onCollect,
  description,
  questions,
  answers
}) => {
  const [processedQuery, setProcessedQuery] = useState('');
  const [subqueries, setSubqueries] = React.useState<Subquery[]>([]);
  const [activeSynonymIndex, setActiveSynonymIndex] = React.useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = React.useState<{ top: number; left: number } | null>(null);
  const [addedSynonyms, setAddedSynonyms] = React.useState<Map<number, Set<string>>>(new Map());
  const [duplicatesTreated, setDuplicatesTreated] = useState(false);
  const [remainingDuplicates, setRemainingDuplicates] = useState(documentStats.duplicates);
  const [statsNeedUpdate, setStatsNeedUpdate] = useState(false);
  const [currentStatsId] = useState('');
  const [localDocumentStats, setLocalDocumentStats] = useState({
    files: documentStats.files,
    duplicates: documentStats.duplicates
  });
  const dispatch = useDispatch();
  const [lastStatsQuery, setLastStatsQuery] = useState('');
  const [needsSave, setNeedsSave] = useState(false);
  const [isCollecting, setIsCollecting] = useState(false);
  const [collectionProgress, setCollectionProgress] = useState(0);
  const [hasRefreshedStats, setHasRefreshedStats] = useState(false);
  const [mode, setMode] = useState<QueryMode>('build');

  const generateStats = async (queryString: string) => {
    try {
      const projectId = btoa(queryString).slice(0, 10);
      const response = await axios.post('/generate_stats', {
        projectId
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return {
        files: response.data.total,
        duplicates: response.data.duplicates
      };
    } catch (error) {
      console.error('Error generating stats:', error);
      return null;
    }
  };

  useEffect(() => {
    if (query) {
      try {
        setProcessedQuery(query);
        
        // Try to parse as JSON first (for saved queries)
        try {
          const parsedQuery = JSON.parse(query);
          if (parsedQuery.subqueries) {
            setSubqueries(parsedQuery.subqueries);
            console.log('Loaded saved subqueries:', parsedQuery.subqueries);
            return;
          }
        } catch (e) {
          // If JSON parsing fails, treat as plain text query
          console.log('Parsing as plain text query');
        }

        // Fall back to splitting plain text query
        const parts = query.split(/\n\nAND\n\n/);
        const newSubqueries = parts.map(part => ({
          content: part.trim().replace(/^\(|\)$/g, ''),
          operator: 'AND' as const
        }));
        
        setSubqueries(newSubqueries);
        console.log('Setting subqueries from plain text:', newSubqueries);
      } catch (error) {
        console.error('Error processing query:', error);
      }
    }
  }, [query]);

  useEffect(() => {
    const loadInitialStats = async () => {
      if (currentStatsId) {
        const stats = await generateStats(currentStatsId);
        if (stats) {
          setLocalDocumentStats(stats);
        }
      }
    };
    
    loadInitialStats();
  }, [currentStatsId]);

  useEffect(() => {
    if (subqueries.length > 0) {
      const currentQueryString = JSON.stringify(subqueries);
      
      if (currentQueryString !== lastStatsQuery) {
        setStatsNeedUpdate(true);
      }
    }
  }, [subqueries, lastStatsQuery]);

  const handleSubqueryChange = (index: number, content: string) => {
    const newSubqueries = [...subqueries];
    newSubqueries[index].content = content;
    setStatsNeedUpdate(true);
    setNeedsSave(true);
    updateQuery(newSubqueries);
  };

  const handleOperatorChange = (index: number, operator: 'AND' | 'OR') => {
    const newSubqueries = [...subqueries];
    newSubqueries[index].operator = operator;
    updateQuery(newSubqueries);
  };

  const addNewSubquery = () => {
    const newSubqueries: Subquery[] = [
      ...subqueries,
      { content: '', operator: 'AND' as const }
    ];
    updateQuery(newSubqueries);
  };

  const updateQuery = (newSubqueries: Subquery[]) => {
    setSubqueries(newSubqueries);
    onQueryChange(JSON.stringify({ subqueries: newSubqueries }));
  };

  const handleLightbulbClick = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    
    if (activeSynonymIndex === index) {
      setActiveSynonymIndex(null);
      setTooltipPosition(null);
    } else {
      setActiveSynonymIndex(index);
      setTooltipPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX - 420  // 420px to the left of the button (tooltip width + margin)
      });
      onLightbulbClick(index, event);
    }
  };

  const handleSynonymClick = (index: number, synonym: string, isAdded: boolean) => {
    setAddedSynonyms(prev => {
      const newMap = new Map(prev);
      let subquerySet = newMap.get(index) || new Set();
      
      if (isAdded) {
        // Remove synonym
        subquerySet.delete(synonym);
        // Remove OR + synonym from the query, handling both possible formats
        let newContent = subqueries[index].content;
        newContent = newContent.replace(` OR ${synonym}`, '')  // Remove if it's in the middle/end
                             .replace(`${synonym} OR `, '')    // Remove if it's at the start
                             .replace(synonym, '');            // Remove if it's the only term
        
        // Clean up any leftover " OR " at the start or end
        newContent = newContent.trim().replace(/^OR\s+|\s+OR$/g, '').trim();
        
        handleSubqueryChange(index, newContent);
      } else {
        // Add synonym if not already present
        if (!subquerySet.has(synonym)) {
          subquerySet.add(synonym);
          // Add OR + synonym to the query only if not already present
          const currentTerms = subqueries[index].content.split(' OR ').map(t => t.trim());
          if (!currentTerms.includes(synonym)) {
            const newContent = subqueries[index].content
              ? `${subqueries[index].content} OR ${synonym}`
              : synonym;
            handleSubqueryChange(index, newContent);
          }
        }
      }
      
      newMap.set(index, subquerySet);
      return newMap;
    });
  };

  const handleDeleteSubquery = (index: number) => {
    const newSubqueries = subqueries.filter((_, i) => i !== index);
    updateQuery(newSubqueries);
  };

  const simulateCollection = () => {
    setIsCollecting(true);
    setCollectionProgress(0);
    
    const startTime = Date.now();
    const duration = 3000;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      
      setCollectionProgress(progress);

      if (progress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        handleCollectionComplete();
      }
    };

    requestAnimationFrame(updateProgress);
  };

  const handleCollectClick = () => {
    if (duplicatesTreated) {
      const newQuery: SavedQuery = {
        id: Date.now().toString(),
        projectId: 'project-1',
        name: 'Query ' + new Date().toLocaleDateString(),
        fileScreening: 'in_progress',
        totalFiles: 0,
        duplicates: 0,
        fileSelection: 0,
        criteria: 5,
        lastModified: new Date().toISOString(),
        currentStep: 'screening',
        screeningStep: 'generator',
        queryData: {
          description: description,
          query: query,
          projectTitle: 'Query ' + new Date().toLocaleDateString(),
          projectId: 'project-1',
          questions: questions,
          answers: answers,
          pubmedQuery: query,
          generatedQuery: true
        }
      };

      dispatch(saveQuery(newQuery));
      setNeedsSave(false);
    } else {
      simulateCollection();
    }
  };

  const handleCollectionComplete = () => {
    setMode('finished');
    setIsCollecting(false);
    setDuplicatesTreated(true);
    if (onCollect) onCollect();
  };

  const handleUpdateStats = async () => {
    if (!statsNeedUpdate || subqueries.length === 0) return;

    try {
      const queryString = JSON.stringify(subqueries);
      const newStats = await generateStats(queryString);
      
      if (newStats) {
        setLocalDocumentStats(newStats);
        setStatsNeedUpdate(false);
        setLastStatsQuery(queryString);
        setDuplicatesTreated(false);
        setRemainingDuplicates(newStats.duplicates);
        setNeedsSave(true);
        setHasRefreshedStats(true);
      }
    } catch (error) {
      console.error('Failed to update stats:', error);
    }
  };

  useEffect(() => {
    if (statsNeedUpdate) {
      setHasRefreshedStats(false);
    }
  }, [statsNeedUpdate]);

  const handleModifyClick = () => {
    setMode('build');
    setDuplicatesTreated(false);
    setHasRefreshedStats(false);
    setStatsNeedUpdate(true);
  };

  if (isGeneratingPubMed) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-50 rounded-xl border-2 border-[#068EF1] border-dashed">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#068EF1]" />
        <span className="ml-3 text-gray-600 font-medium">Generating PubMed query...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#BDBDBD] p-6 border-b-4 shadow-sm">
      <div className="space-y-6">
        {subqueries.length > 0 ? (
          <>
            {subqueries.map((subquery, index) => (
              <div key={index} className="space-y-3">
                {/* Query Box */}
                <div className="flex gap-3">
                  <div className={`flex-grow rounded-xl border ${
                    mode === 'finished' ? 'border-white' : 'border-b-4 border-gray-200'
                  } relative`}>
                    {mode === 'build' && (
                      <button
                        onClick={() => handleDeleteSubquery(index)}
                        className="absolute top-2 right-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200 
                          transition-colors group z-10"
                        title="Remove concept"
                      >
                        <FaTimes className="w-2.5 h-2.5 text-gray-400 group-hover:text-gray-600" />
                      </button>
                    )}
                    
                    <div className="flex items-center justify-center">
                      <textarea
                        value={subquery.content}
                        onChange={(e) => handleSubqueryChange(index, e.target.value)}
                        disabled={mode === 'finished'}
                        className="w-full p-2 bg-transparent border-none font-mono text-base text-gray-700 resize-none overflow-hidden min-h-[20px] max-h-[200px]"
                        placeholder="Enter search terms..."
                        style={{ height: 'auto' }}
                        onInput={(e) => {
                          const target = e.target as HTMLTextAreaElement;
                          target.style.height = 'auto';
                          target.style.height = `${target.scrollHeight}px`;
                        }}
                      />
                    </div>
                  </div>
                  {/* Only show bulb icon in build mode */}
                  {mode === 'build' && (
                    <button
                      onClick={(e) => handleLightbulbClick(index, e)}
                      className="p-2 text-[#068EF1] hover:text-white rounded-full hover:bg-[#C2E2EB] transition-colors"
                      title="Show synonyms"
                    >
                      <img src={bulbIcon} alt="Show synonyms" className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Operator Selection */}
                {index < subqueries.length - 1 && (
                  <div className="flex items-center">
                    <select
                      value={subquery.operator}
                      onChange={(e) => handleOperatorChange(index, e.target.value as 'AND' | 'OR')}
                      disabled={mode === 'finished'}
                      className={`w-24 px-4 py-1.5 rounded-xl ${
                        mode === 'finished' 
                          ? 'border-white text-gray-700' 
                          : 'border border-[#068EF1] text-[#068EF1]'
                      } bg-white focus:outline-none focus:ring-2 focus:ring-[#068EF1] text-center font-semibold
                        appearance-none cursor-pointer relative ml-2 mb-3`}
                    >
                      <option value="AND">AND</option>
                      <option value="OR">OR</option>
                    </select>
                  </div>
                )}
              </div>
            ))}

            {/* Add New Subquery Button - Only show in build mode */}
            {mode === 'build' && (
              <div className="flex justify-center pt-2">
                <button
                  onClick={addNewSubquery}
                  className="flex items-center gap-2 px-4 py-2 text-[#068EF1] border-2 border-[#068EF1] 
                    rounded-xl hover:bg-[#068EF1] hover:text-white transition-colors font-semibold"
                >
                  <FaPlus className="w-4 h-4" />
                  Add concept
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-[200px] text-gray-400 bg-gray-50 rounded-xl border-2 border-gray-200 border-dashed">
            No query generated yet
          </div>
        )}

        {/* Document Stats Box */}
        <div className="mt-8 flex items-center justify-between bg-white rounded-xl border border-[#BDBDBD] p-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">
                {duplicatesTreated ? "Collected papers" : "Papers"}
              </span>
              <span className="px-3 py-1 bg-[#DCF8FF] text-[#296A7A] rounded-full font-semibold">
                {localDocumentStats.files - (duplicatesTreated ? remainingDuplicates : 0)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">Duplicates</span>
              {duplicatesTreated ? (
                <span className="w-8 h-8 flex items-center justify-center bg-[#D7ECD4] text-[#408038] rounded-full">
                  <FaCheck className="w-4 h-4" />
                </span>
              ) : (
                <span className="px-3 py-1 bg-[#FFF4DB] text-[#B98900] rounded-full font-semibold">
                  {localDocumentStats.duplicates}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleUpdateStats}
              disabled={!statsNeedUpdate || mode === 'finished'}
              className={`px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-2
                ${mode === 'finished'
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : statsNeedUpdate 
                    ? 'bg-[#DCF8FF] text-[#296A7A] hover:bg-[#C2E2EB]' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
            >
              Refresh
            </button>
            <button
              onClick={mode === 'finished' ? handleModifyClick : handleCollectClick}
              disabled={mode === 'build' && (!hasRefreshedStats || isCollecting)}
              className={`px-6 py-2 ${
                mode === 'finished'
                  ? 'bg-white border border-[#068EF1] text-[#068EF1] hover:bg-gray-50'
                  : !hasRefreshedStats
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-[#068EF1] hover:bg-[#0576C8] text-white'
              } rounded-lg font-semibold transition-colors flex items-center gap-2`}
            >
              {mode === 'finished' ? 'Modify' : 'Collect'}
            </button>
          </div>
        </div>
      </div>

      {/* Add the tooltip */}
      {activeSynonymIndex !== null && tooltipPosition && (
        <div className="relative">
          <SynonymTooltip
            synonyms={synonymGroups[activeSynonymIndex]?.synonyms || []}
            position={tooltipPosition}
            onClose={() => {
              setActiveSynonymIndex(null);
              setTooltipPosition(null);
            }}
            onSynonymClick={(synonym, isAdded) => handleSynonymClick(activeSynonymIndex, synonym, isAdded)}
            addedSynonyms={addedSynonyms.get(activeSynonymIndex) || new Set()}
            abstraction={synonymGroups[activeSynonymIndex]?.abstraction || ''}
          />
        </div>
      )}
      {/* Add Collection Progress Bar */}
      {isCollecting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-6">Collecting Documents</h2>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[#296A7A] bg-[#DCF8FF]">
                    Progress
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-[#296A7A]">
                    {Math.round(collectionProgress)}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[#DCF8FF]">
                <div
                  style={{ width: `${collectionProgress}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#068EF1] transition-all duration-100"
                />
              </div>
              <p className="text-sm text-gray-600 text-center">
                Retrieving {localDocumentStats.files} documents...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PubMedQueryBuilder; 