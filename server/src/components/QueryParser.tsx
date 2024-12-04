import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PubMedQueryBuilder from './PubMedQueryBuilder';
import userPlaceholder from '../assets/scientifique.png';

interface Subquery {
  content: string;
  operator: 'AND' | 'OR';
}

const QueryParser: React.FC = () => {
  const location = useLocation();
  const [currentQuery, setCurrentQuery] = useState(location.state?.description || '');
  const [parsedSubqueries, setParsedSubqueries] = useState<Subquery[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);

  useEffect(() => {
    if (currentQuery) {
      parseQuery(currentQuery);
    }
  }, []);

  const validateQueryFormat = (query: string): { isValid: boolean; error: string | null } => {
    // Check if query has balanced parentheses
    if ((query.match(/\(/g) || []).length !== (query.match(/\)/g) || []).length) {
      return { 
        isValid: false, 
        error: "Unbalanced parentheses. Each group must be enclosed in parentheses." 
      };
    }

    // Check for AND between parentheses
    if (query.match(/\([^)]*AND[^)]*\)/)) {
      return { 
        isValid: false, 
        error: "AND operator is not allowed inside parentheses. Use OR to combine terms within groups." 
      };
    }

    // Check for OR between groups
    if (query.match(/\)\s*OR\s*\(/)) {
      return { 
        isValid: false, 
        error: "OR operator is not allowed between groups. Use AND to combine groups." 
      };
    }

    // Check overall structure: (terms) AND (terms) AND (terms)
    const pattern = /^\s*\([^()]+\)(\s+AND\s+\([^()]+\))*\s*$/;
    if (!pattern.test(query)) {
      return { 
        isValid: false, 
        error: `Invalid query format. The query must follow this structure:
        - Terms within parentheses: (term1 OR term2 OR term3)
        - Groups connected with AND: (group1) AND (group2) AND (group3)
        - Use OR only within groups
        - Use AND only between groups
        
Example: (covid OR coronavirus) AND (vaccine OR vaccination) AND (efficacy OR effectiveness)`
      };
    }

    return { isValid: true, error: null };
  };

  const parseQuery = (query: string) => {
    setParseError(null);

    const validation = validateQueryFormat(query);
    if (!validation.isValid) {
      setParseError(validation.error);
      return;
    }

    try {
      // Split by AND first
      const mainGroups = query.split(/\bAND\b/).map(group => group.trim());
      
      // Process each group
      const subqueries: Subquery[] = mainGroups.map((group, index) => {
        // Remove outer parentheses
        const cleanGroup = group.replace(/^\(|\)$/g, '').trim();
        
        return {
          content: cleanGroup,
          operator: index < mainGroups.length - 1 ? 'AND' : 'OR'
        };
      });

      setParsedSubqueries(subqueries);
    } catch (error) {
      setParseError("Error parsing query. Please check the format.");
    }
  };

  const handleApply = () => {
    parseQuery(currentQuery);
  };

  return (
    <div className="p-6 relative">
      <div className="flex gap-8">
        {/* Left column - Original Query Display */}
        <div className="w-1/2">
          <div className="bg-white rounded-xl border border-[#BDBDBD] border-b-4 p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                <img
                  src={userPlaceholder}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-grow">
                <div className="flex flex-col gap-4">
                  <textarea
                    value={currentQuery}
                    onChange={(e) => setCurrentQuery(e.target.value)}
                    className="flex-grow px-4 py-3 border border-[#BDBDBD] rounded-md focus:outline-none focus:ring-2 focus:ring-[#068EF1] focus:ring-offset-2"
                    rows={8}
                    placeholder="Enter your PubMed query in the format: (term1 OR term2) AND (term3 OR term4) AND (...)"
                  />
                  
                  {parseError && (
                    <div className="px-6 py-4 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-red-600 text-sm whitespace-pre-line font-medium mb-2">Format Error:</p>
                      <p className="text-red-600 text-sm whitespace-pre-line">{parseError}</p>
                    </div>
                  )}

                  <button
                    onClick={handleApply}
                    className="mt-4 px-6 py-2 bg-gray-200 text-gray-700 hover:bg-[#068EF1] hover:text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#068EF1] focus:ring-offset-2 flex items-center justify-center"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - PubMed Query Builder */}
        <div className="w-1/2">
          <PubMedQueryBuilder
            query={JSON.stringify({ subqueries: parsedSubqueries })}
            onQueryChange={() => {}} // Read-only in this context
            onLightbulbClick={() => {}} // Disabled in this context
            isGeneratingPubMed={false}
            estimatedDocuments={null}
            synonymGroups={[]}
            documentStats={{
              files: 0,
              duplicates: 0
            }}
            description={currentQuery}
            questions={[]}
            answers={{}}
          />
        </div>
      </div>
    </div>
  );
};

export default QueryParser; 