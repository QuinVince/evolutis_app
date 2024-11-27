import React from 'react';
import { FaLightbulb, FaPlus, FaTimes } from 'react-icons/fa';
import SynonymTooltip from './SynonymTooltip';

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
}

interface Subquery {
  content: string;
  operator: 'AND' | 'OR';
}

const PubMedQueryBuilder: React.FC<PubMedQueryBuilderProps> = ({
  query,
  onQueryChange,
  onLightbulbClick,
  isGeneratingPubMed,
  estimatedDocuments,
  synonymGroups
}) => {
  const [subqueries, setSubqueries] = React.useState<Subquery[]>([]);
  const [activeSynonymIndex, setActiveSynonymIndex] = React.useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = React.useState<{ top: number; left: number } | null>(null);
  const [addedSynonyms, setAddedSynonyms] = React.useState<Map<number, Set<string>>>(new Map());

  React.useEffect(() => {
    try {
      if (query) {
        const queryData = JSON.parse(query);
        if (queryData.subqueries && Array.isArray(queryData.subqueries)) {
          setSubqueries(queryData.subqueries);
        }
      }
    } catch (e) {
      console.error('Error parsing query:', e);
    }
  }, [query]);

  const handleSubqueryChange = (index: number, content: string) => {
    const newSubqueries = [...subqueries];
    newSubqueries[index].content = content;
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
        top: rect.bottom + window.scrollY + 5,
        left: rect.left + window.scrollX - 200 // Offset to show tooltip to the left
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

  if (isGeneratingPubMed) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-50 rounded-xl border-2 border-[#62B6CB] border-dashed">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#62B6CB]" />
        <span className="ml-3 text-gray-600 font-medium">Generating PubMed query...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#BDBDBD] p-6 border-b-4 shadow-sm">
      <div className="space-y">
        {subqueries.length > 0 ? (
          <>
            {subqueries.map((subquery, index) => (
              <div key={index} className="space-y-3">
                {/* Query Box */}
                <div className="flex gap-3">
                  <div className="flex-grow rounded-xl border border-b-4 border-gray-200 relative">
                    <button
                      onClick={() => handleDeleteSubquery(index)}
                      className="absolute top-2 right-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200 
                        transition-colors group z-10"
                      title="Remove concept"
                    >
                      <FaTimes className="w-2.5 h-2.5 text-gray-400 group-hover:text-gray-600" />
                    </button>
                    
                    <div className="flex items-center justify-center">
                      <textarea
                        value={subquery.content}
                        onChange={(e) => handleSubqueryChange(index, e.target.value)}
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
                  <button
                    onClick={(e) => handleLightbulbClick(index, e)}
                    className="p-2 text-[#62B6CB] hover:text-white rounded-full hover:bg-[#62B6CB] transition-colors"
                    title="Show synonyms"
                  >
                    <FaLightbulb className="w-5 h-5" />
                  </button>
                </div>

                {/* Operator Selection */}
                {index < subqueries.length - 1 && (
                  <div className="flex items-center">
                    <select
                      value={subquery.operator}
                      onChange={(e) => handleOperatorChange(index, e.target.value as 'AND' | 'OR')}
                      className="w-24 px-4 py-1.5 rounded-xl border border-[#62B6CB] text-[#62B6CB] bg-white 
                        focus:outline-none focus:ring-2 focus:ring-[#62B6CB] text-center font-semibold
                        appearance-none cursor-pointer relative ml-2 mb-3"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2362B6CB'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 8px center',
                        backgroundSize: '16px',
                        paddingRight: '32px'
                      }}
                    >
                      <option value="AND">AND</option>
                      <option value="OR">OR</option>
                    </select>
                  </div>
                )}
              </div>
            ))}

            {/* Add New Subquery Button */}
            <div className="flex justify-center pt-2">
              <button
                onClick={addNewSubquery}
                className="flex items-center gap-2 px-4 py-2 text-[#62B6CB] border-2 border-[#62B6CB] 
                  rounded-xl hover:bg-[#62B6CB] hover:text-white transition-colors font-semibold"
              >
                <FaPlus className="w-4 h-4" />
                Add concept
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-[200px] text-gray-400 bg-gray-50 rounded-xl border-2 border-gray-200 border-dashed">
            No query generated yet
          </div>
        )}

        {/* Estimated Documents */}
        {estimatedDocuments !== null && (
          <div className="flex items-center mt-4">
            <span className="text-sm text-black font-bold">Estimated documents</span>
            <span className="px-3 py-1 rounded-xl bg-[#D5F7FF] text-[#296A7A] text-sm font-bold ml-2">
              {estimatedDocuments}
            </span>
          </div>
        )}
      </div>

      {/* Add the tooltip */}
      {activeSynonymIndex !== null && tooltipPosition && (
        <SynonymTooltip
          synonyms={synonymGroups[activeSynonymIndex]?.synonyms || []}
          position={tooltipPosition}
          onClose={() => {
            setActiveSynonymIndex(null);
            setTooltipPosition(null);
          }}
          onSynonymClick={(synonym, isAdded) => handleSynonymClick(activeSynonymIndex, synonym, isAdded)}
          addedSynonyms={addedSynonyms.get(activeSynonymIndex) || new Set()}
        />
      )}
    </div>
  );
};

export default PubMedQueryBuilder; 