import React, { useState, useEffect } from 'react';
import SynonymList from './SynonymList';
import axios from 'axios';
import {  FaArrowRight, FaCheck, FaDownload, FaSync } from 'react-icons/fa';
import { SavedQuery } from '../App'; // Import the SavedQuery interface from App
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import "react-step-progress-bar/styles.css";
import '../styles/progressBar.css';
import { useLocation } from 'react-router-dom';
import PubMedQueryBuilder from './PubMedQueryBuilder';
import userPlaceholder from '../assets/scientifique.png'; // Add this placeholder image to your assets

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface QueryGeneratorProps {
  initialData?: any;
  onSaveQuery: (query: SavedQuery) => void;
  savedQueries: SavedQuery[]; // Use the savedQueries prop
  onClearQueries: () => void; // Add this new prop
}

interface CollectedDocuments {
  pubmed: number;
  semanticScholar: number;
}

// Add this type definition
interface SynonymGroup {
  concept: string;
  abstraction: string;
  synonyms: string[];
}

// Add interface at the top of the file
interface Subquery {
  content: string;
  operator: string;
}

const QueryGenerator: React.FC<QueryGeneratorProps> = ({ initialData, ...props }) => {
  const location = useLocation();
  const initialDescription = location.state?.description || initialData?.description || '';

  const [step, setStep] = useState(0);
  const [queryName, setQueryName] = useState('');
  const [naturalLanguageQuery, setNaturalLanguageQuery] = useState(initialDescription);
  const [pubMedQuery, setPubMedQuery] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const [estimatedDocuments] = useState<number | null>(null);
  const [isCollecting, setIsCollecting] = useState(false);
  const [isCollected, setIsCollected] = useState(false);
  const [collectedDocuments, setCollectedDocuments] = useState<CollectedDocuments>({ pubmed: 0, semanticScholar: 0 });
  const [totalDocuments, setTotalDocuments] = useState<number>(0);
  const [synonymGroups, setSynonymGroups] = useState<SynonymGroup[]>([]);
  const [isSynonymsLoading, setIsSynonymsLoading] = useState(false);
  const [selectedConceptIndex, setSelectedConceptIndex] = useState(0);

  // Add these states at the beginning of the component
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [isGeneratingPubMed, setIsGeneratingPubMed] = useState(false);
  const [isGeneratingSynonyms, setIsGeneratingSynonyms] = useState(false);

  // Add these new state variables at the beginning of the component
  const [synonymPopupPosition, setSynonymPopupPosition] = useState<{ top: number; left: number } | null>(null);
  const [showSynonymPopup, setShowSynonymPopup] = useState(false);

  // Add this state for the info message
  const [showInfoMessage, setShowInfoMessage] = useState(true);

  // Single useEffect for handling all initializations
  useEffect(() => {
    console.log('Full initialData:', initialData);
    
    if (initialData?.description) {
      setNaturalLanguageQuery(initialData.description);
      
      // Check both direct properties and queryData
      if (initialData.questions || initialData.answers || initialData.pubmedQuery ||
          initialData.queryData?.questions || initialData.queryData?.answers || initialData.queryData?.pubmedQuery) {
        console.log('Found saved data');
        
        // Set questions and answers
        const savedQuestions = initialData.questions || initialData.queryData?.questions || [];
        const savedAnswers = initialData.answers || initialData.queryData?.answers || {};
        const savedPubmedQuery = initialData.pubmedQuery || initialData.queryData?.pubmedQuery || '';
        
        setQuestions(savedQuestions);
        setAnswers(savedAnswers);
        setPubMedQuery(savedPubmedQuery);
        setStep(1);
        
        if (initialData.synonymGroups || initialData.queryData?.synonymGroups) {
          setSynonymGroups(initialData.synonymGroups || initialData.queryData?.synonymGroups || []);
        }
      } else {
        // Only generate new questions if we don't have saved data
        console.log('No saved data found, will generate new questions');
        handleGenerateQuestions();
      }
    }
  }, [initialData]); // Only depend on initialData

  // Add debug logging in the render to verify the state
  console.log('Current state:', { questions, answers, pubMedQuery, step });

  const generateQuestions = async (query: string) => {
    //For production in replit, replace by:
    //const response = await axios.post('/generate_questions', { query });
    const response = await axios.post('/generate_questions', { query });
    return response.data;
  };

  const generatePubMedQuery = async (query: string, answers: Record<string, string>) => {
    try {
      //For production in replit, replace by:
      //const response = await axios.post('/generate_pubmed_query', { query, answers });
      const response = await axios.post('/generate_pubmed_query', { query, answers });

      // Format the received query with proper structure
      const rawQuery = response.data.query.replace(/```/g, '').trim();

      // Split the query into main groups (split by AND)
      const mainGroups: string[] = rawQuery.split(/\bAND\b/).map((group: string) => group.trim());

      // Format each group
      const formattedGroups: string[] = mainGroups.map((group: string) => {
        // Remove extra parentheses
        let cleanGroup: string = group.replace(/^\(+|\)+$/g, '').trim();

        // Split by OR and clean up each term
        const terms: string[] = cleanGroup.split(/\bOR\b/).map((term: string) => {
          // Remove extra quotes and trim
          let cleanTerm: string = term.trim().replace(/^["']+|["']+$/g, '');
          // Only add quotes if term contains spaces and isn't already quoted
          if (cleanTerm.includes(' ') && !cleanTerm.includes('"')) {
            cleanTerm = `"${cleanTerm}"`;
          }
          return cleanTerm;
        });

        // Join terms with OR and wrap in parentheses
        return `(${terms.join(' OR ')})`;
      });

      // Join groups with AND
      const formattedQuery = formattedGroups.join('\n\nAND\n\n');

      return { query: formattedQuery };
    } catch (error) {
      console.error('Error generating PubMed query:', error);
      throw error;
    }
  };

  const [projectId] = useState(() => Date.now().toString());

  const handleCollectDocuments = async () => {
    setIsCollecting(true);
    const projectId = Date.now().toString();

    try {
      // Get stats from backend instead of DocumentStats
      const response = await axios.post('/generate_stats', {
        projectId: projectId
      });
      
      const stats = response.data;
      
      // Simulate collection process
      const steps = 20;
      const stepSize = stats.total / steps;
      
      for (let i = 0; i <= steps; i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        setCollectedDocuments({
          pubmed: Math.round(i * stepSize * 0.6),
          semanticScholar: Math.round(i * stepSize * 0.4)
        });
      }

      // Set final numbers
      setCollectedDocuments({
        pubmed: stats.pubmed,
        semanticScholar: stats.semanticScholar
      });
      setTotalDocuments(stats.total);
      setIsCollected(true);
    } catch (error) {
      console.error('Error collecting documents:', error);
    } finally {
      setIsCollecting(false);
    }
  };

  const handleNextStep = async () => {
    try {
      if (step === 0) {
        setIsGeneratingPubMed(true);
        // First, generate PubMed query only
        const data = await generatePubMedQuery(naturalLanguageQuery, answers);
        const cleanedQuery = data.query.replace(/```/g, '').trim();
        setPubMedQuery(cleanedQuery);
        setIsGeneratingPubMed(false);
        setStep(1);

        // After PubMed query is displayed, generate synonyms
        setTimeout(async () => {
          setIsGeneratingSynonyms(true);
          try {
            //For production in replit, replace by:
            //const synonymsResponse = await axios.post('/generate_synonyms', {
            const synonymsResponse = await axios.post('/generate_synonyms', {
              description: naturalLanguageQuery,
              questions: questions,
              answers: answers,
              query: cleanedQuery,
            });
            if (Array.isArray(synonymsResponse.data.synonym_groups)) {
              setSynonymGroups(synonymsResponse.data.synonym_groups);
            }
          } catch (error) {
            console.error('Error generating initial synonyms:', error);
            setSynonymGroups([]);
          } finally {
            setIsGeneratingSynonyms(false);
          }
        }, 100); // Small delay to ensure query is displayed first
      } else if (step === 1 && isCollected) {
        setStep(2);
      }
    } catch (error) {
      console.error('Error in step transition:', error);
      setIsGeneratingPubMed(false);
    }
  };

  const handleSaveQuery = () => {
    const newQuery: SavedQuery = {
      id: Date.now().toString(),
      projectId: initialData?.projectId || 'project-1',
      name: queryName,
      fileScreening: 'in_progress' as const,
      totalFiles: totalDocuments,
      duplicates: Math.round(totalDocuments * 0.15),
      fileSelection: totalDocuments - Math.round(totalDocuments * 0.15),
      criteria: 5,
      lastModified: new Date().toISOString(),
      currentStep: 'screening' as const,
      screeningStep: 'generator' as const,
      queryData: {
        description: naturalLanguageQuery,
        query: pubMedQuery,
        projectTitle: queryName,
        projectId: initialData?.projectId || 'project-1',
        questions: questions,
        answers: answers,
        pubmedQuery: pubMedQuery,
        generatedQuery: true
      }
    };

    props.onSaveQuery(newQuery);
    
    // Reset form
    setStep(0);
    setQueryName('');
    setNaturalLanguageQuery('');
    setPubMedQuery('');
    setQuestions([]);
    setAnswers({});
    setCollectedDocuments({ pubmed: 0, semanticScholar: 0 });
    setIsCollected(false);
  };

  const handleAnswerChange = (question: string, answer: string) => {
    setAnswers(prev => {
      const newAnswers = { ...prev, [question]: answer };
      
      // Update project in localStorage
      const currentProject = JSON.parse(localStorage.getItem('currentProject') || '{}');
      const updatedProject = {
        ...currentProject,
        answers: newAnswers
      };
      localStorage.setItem('currentProject', JSON.stringify(updatedProject));
      
      return newAnswers;
    });
  };

  const handleGetSynonyms = async () => {
    setIsSynonymsLoading(true);
    try {
      //For production in replit, replace by:
      //const response = await axios.post('/generate_synonyms', {
      const response = await axios.post('/generate_synonyms', {
        description: naturalLanguageQuery,
        questions: questions,
        answers: answers,
        query: pubMedQuery,
      });
      if (Array.isArray(response.data.synonym_groups)) {
        setSynonymGroups(response.data.synonym_groups);
      } else {
        console.error('Unexpected synonyms format:', response.data);
        setSynonymGroups([]);
      }
    } catch (error) {
      console.error('Error generating synonyms:', error);
      setSynonymGroups([]);
    } finally {
      setIsSynonymsLoading(false);
    }
  };

  const handleSynonymClick = (synonym: string) => {
    setPubMedQuery(prevQuery => prevQuery + ' OR ' + synonym);
  };

  // Replace the existing handleReturn function with this one
  const handleReturn = () => {
    switch (step) {
      case 0: // At questions step
      case 1: // At pubmed query step
        // Return to landing page
        props.onSaveQuery(null as any);
        break;
      case 2: // At save step
        // Return to pubmed query step
        setStep(1);
        break;
      default:
        break;
    }
  };

  // Add these functions to handle Enter key press in answers and query name
  const handleAnswerKeyPress = (e: React.KeyboardEvent, isLast: boolean) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (isLast) {
        handleNextStep();
      }
    }
  };

  const handleQueryNameKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSaveQuery();
    }
  };

  // Add this handler in QueryGenerator
  const handleConceptSelect = (index: number) => {
    setSelectedConceptIndex(index);
  };

  // Add this handler for the lightbulb button click
  const handleLightbulbClick = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    
    setSelectedConceptIndex(index);
    setSynonymPopupPosition({
      top: rect.bottom + window.scrollY + 5, // 5px below the button
      left: rect.left + window.scrollX
    });
    setShowSynonymPopup(true);
  };

  // Add handler to close the popup
  const handleCloseSynonymPopup = () => {
    setShowSynonymPopup(false);
    setSynonymPopupPosition(null);
  };

  // Separate function for generating new questions
  const handleGenerateQuestions = async () => {
    setIsGeneratingQuestions(true);
    try {
      const data = await generateQuestions(naturalLanguageQuery);
      setQuestions(data.questions || []);
    } catch (error) {
      console.error('Error generating questions:', error);
    } finally {
      setIsGeneratingQuestions(false);
    }
  };

  // Add handleGenerateQuery function
  const handleGenerateQuery = async () => {
    setIsGeneratingPubMed(true);
    setIsGeneratingSynonyms(true);
    
    try {
      // Generate PubMed query
      const queryResponse = await axios.post('/generate_pubmed_query', {
        query: naturalLanguageQuery,
        answers: answers
      });

      console.log('Query response:', queryResponse.data);

      // Store the query response immediately
      const queryString = JSON.stringify(queryResponse.data);
      setPubMedQuery(queryString);

      // Create the SavedQuery structure with the query we just generated
      const updatedData: SavedQuery = {
        id: Date.now().toString(),
        projectId: initialData?.projectId || 'project-1',
        name: 'New Query',
        fileScreening: 'in_progress',
        totalFiles: 0,
        duplicates: 0,
        fileSelection: 0,
        criteria: 5,
        lastModified: new Date().toISOString(),
        currentStep: 'screening',
        screeningStep: 'generator',
        queryData: {
          description: naturalLanguageQuery,
          query: '',
          projectTitle: 'New Query',
          projectId: initialData?.projectId || 'project-1',
          questions: questions,
          answers: answers,
          pubmedQuery: queryString, // Use the query we just generated
          generatedQuery: true
        }
      };
      
      console.log('handleGenerateQuery - Sending data to parent:', updatedData);
      props.onSaveQuery(updatedData);

      // Generate synonyms
      const synonymsResponse = await axios.post('/generate_synonyms', {

        description: naturalLanguageQuery,
        questions: questions,
        answers: answers,
        query: queryResponse.data.subqueries
          .map((sq: Subquery) => `(${sq.content})`)
          .join(' AND ')
      });
      
      if (Array.isArray(synonymsResponse.data.synonym_groups)) {
        setSynonymGroups(synonymsResponse.data.synonym_groups);
      }

    } catch (error) {
      console.error('Error generating query and synonyms:', error);
    } finally {
      setIsGeneratingPubMed(false);
      setIsGeneratingSynonyms(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:  // Changed from case 1
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-[#068EF1]">Generated Questions</h2>
            {isGeneratingQuestions ? (
              <div className="text-center py-4 flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-[#068EF1]" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <p>Generating questions...</p>
              </div>
            ) : (
              <>
                {questions.map((question, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-semibold">{question}</p>
                    <input
                      type="text"
                      value={answers[question] || ''}
                      onChange={(e) => handleAnswerChange(question, e.target.value)}
                      onKeyPress={(e) => handleAnswerKeyPress(e, index === questions.length - 1)}
                      className="w-full px-3 py-2 border border-[#BDBDBD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#068EF1] focus:ring-offset-2 flex items-center justify-center"
                      placeholder="Your answer..."
                    />
                  </div>
                ))}
                <button
                  onClick={handleNextStep}
                  className="mt-4 px-4 py-2 bg-[#068EF1] text-white rounded-md hover:bg-[#068EF1] focus:outline-none focus:ring-2 focus:ring-[#068EF1] focus:ring-offset-2 flex items-center justify-center"
                  disabled={isGeneratingPubMed}
                >
                  {isGeneratingPubMed ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Generating PubMed Query...
                    </>
                  ) : (
                    <>
                      Generate PubMed Query <FaArrowRight className="ml-2" />
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        );
      case 1:  // PubMed Query step
        return (
          <div>
            <h2 className="text-2xl font-semibold mb-8 text-black text-center">Generated PubMed Query</h2>
            {isGeneratingPubMed ? (
              <div className="text-center py-4 flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3 text-[#068EF1]" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <p>Generating PubMed query...</p>
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                <div className="w-full">
                  <div className="bg-white p-4 rounded-xl border-2 border-[#068EF1] shadow-sm">

                    {pubMedQuery.split('\n\nAND\n\n').map((part, index, array) => (
                      <React.Fragment key={index}>
                        {index > 0 && (
                          <div className="flex items-center my-2">
                            <span className="px-4 py-1 text-[#068EF1] rounded-full font-bold">
                              AND
                            </span>
                            <div className="flex-grow  border-gray-200 ml-2"></div>
                          </div>
                        )}
                        <textarea
                          value={part}
                          onChange={(e) => {
                            const newParts = [...pubMedQuery.split('\n\nAND\n\n')];
                            newParts[index] = e.target.value;
                            setPubMedQuery(newParts.join('\n\nAND\n\n'));
                          }}
                          className="w-full font-mono  text-base text-gray-700 focus:outline-none resize-none"
                          style={{
                            lineHeight: '1.5',
                            minHeight: '50px',
                            height: '50px',
                            padding: '12px'

                          }}
                        />
                      </React.Fragment>
                    ))}
                  </div>
                  {estimatedDocuments !== null && (
                    <p className="mt-2 text-[#068EF1]">
                      Estimated number of documents: <span className="font-bold">{estimatedDocuments}</span>
                    </p>
                  )}
                </div>
                {isGeneratingSynonyms ? (
                  <div className="text-center py-4 flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-[#068EF1]" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <p>Generating synonyms...</p>
                  </div>
                ) : (
                  <div className="w-full">
                    {showSynonymPopup && synonymPopupPosition && (
                      <SynonymList 
                        synonymGroups={synonymGroups} 
                        selectedConceptIndex={selectedConceptIndex}
                        onSynonymClick={handleSynonymClick}
                        onConceptSelect={handleConceptSelect}
                        onGetSynonyms={handleGetSynonyms}
                        isSynonymsLoading={isSynonymsLoading}
                        position={synonymPopupPosition}
                        onClose={handleCloseSynonymPopup}
                      />
                    )}
                  </div>
                )}

                <div className="mt-4">
                  <button
                    onClick={handleCollectDocuments}
                    className={`w-full px-4 py-2 ${isCollected ? 'bg-[#068EF1]' : 'bg-[#068EF1]'} text-white rounded-md hover:bg-[#068EF1] focus:outline-none focus:ring-2 focus:ring-[#068EF1] focus:ring-offset-2 flex items-center justify-center`}
                    disabled={isCollecting || isCollected}
                  >
                    {isCollecting ? 'Collecting...' : isCollected ? 'Documents Collected' : 'Collect Documents'}
                    <FaDownload className="ml-2" />
                  </button>

                  {isCollecting && (
                    <div className="mt-4">
                      <p className="text-[#068EF1]">
                        Collecting documents: {collectedDocuments.pubmed + collectedDocuments.semanticScholar} / {totalDocuments}
                      </p>
                      <div className="w-full bg-[#BDBDBD] rounded-full h-2.5 mt-2">
                        <div 
                          className="bg-[#068EF1] h-2.5 rounded-full transition-all duration-200" 
                          style={{ width: `${((collectedDocuments.pubmed + collectedDocuments.semanticScholar) / totalDocuments) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {isCollected && (
                    <div className="mt-4">
                      <p className="text-[#068EF1] text-center">
                        Collection complete! {totalDocuments} documents collected
                      </p>
                      <button
                        onClick={() => setStep(2)}
                        className="mt-4 w-full px-4 py-2 bg-[#068EF1] text-white rounded-md hover:bg-[#068EF1] focus:outline-none focus:ring-2 focus:ring-[#068EF1] focus:ring-offset-2 flex items-center justify-center"
                      >
                        Save Query <FaArrowRight className="ml-2" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      case 2:  // Changed from case 3
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-black">Save Query</h2>
            <input
              type="text"
              value={queryName}
              onChange={(e) => setQueryName(e.target.value)}
              onKeyPress={handleQueryNameKeyPress}
              className="w-full px-3 py-2 border border-[#BDBDBD] rounded-md focus:outline-none focus:ring-2 focus:ring-[#068EF1] focus:ring-offset-2 flex items-center justify-center"
              placeholder="Enter query name"
            />
            <button
              onClick={handleSaveQuery}
              className="mt-4 px-4 py-2 bg-[#068EF1] text-white rounded-md hover:bg-[#068EF1] focus:outline-none focus:ring-2 focus:ring-[#068EF1] focus:ring-offset-2 flex items-center justify-center"
            >
              Save Query <FaCheck className="ml-2" />
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-1 relative">
      {/* Return button */}
      <div className="flex justify-start mb-6">

      </div>

      {/* Two-column layout */}
      <div className="flex gap-8">
        {/* Left column */}
        <div className="w-1/2">
          {/* Description box */}
          <div className="bg-white rounded-xl border border-[#BDBDBD] border-b-4 p-6 mb-8">
            <div className="flex items-start gap-4">
              {/* User Avatar */}
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                <img
                  src={userPlaceholder}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Description Input and Refresh Button */}
              <div className="flex-grow">
                <div className="flex gap-2">
                  <textarea
                    value={naturalLanguageQuery}
                    onChange={(e) => setNaturalLanguageQuery(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleGenerateQuestions();
                      }
                    }}
                    className="flex-grow px-4 py-3 rounded-lg border border-[#BDBDBD]rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#068EF1] focus:ring-offset-2"
                    placeholder="Describe your research..."
                    rows={4}
                  />
                  {questions.length > 0 && (
                    <button
                      onClick={() => handleGenerateQuestions()}
                      className="p-2 text-[#068EF1] hover:text-white rounded-lg hover:bg-[#C2E2EB] transition-colors self-start border border-[#BDBDBD]"
                      disabled={isGeneratingQuestions}
                    >
                      <FaSync className={`w-4 h-4 ${isGeneratingQuestions ? 'animate-spin' : ''}`} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Questions Box */}
          <div className="bg-white rounded-xl border border-[#BDBDBD] border-b-4 p-6">
            {/* Info Message */}
            {showInfoMessage && (
              <div className="mb-6 bg-[#DCF8FF] text-[#006298] px-4 py-3 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#006298]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>Answering questions helps generating more precise queries.</span>
                </div>
                <button
                  onClick={() => setShowInfoMessage(false)}
                  className="text-[#006298] hover:text-[#004970] ml-4"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            {/* Questions Section */}
            <div>
              <h2 className="text-xl font-semibold text-black mb-6">Generated Questions</h2>
              {isGeneratingQuestions ? (
                <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#068EF1]" />
                  <span className="ml-3 text-gray-600">Generating questions...</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {questions.map((question, index) => (
                    <div key={index} className="mb-4">
                      <p className="font-semibold mb-2">{question}</p>
                      <input
                        type="text"
                        value={answers[question] || ''}
                        onChange={(e) => handleAnswerChange(question, e.target.value)}
                        className="w-full px-4 py-3 border border-[#BDBDBD] rounded-md focus:outline-none focus:ring-2 focus:ring-[#068EF1] focus:ring-offset-2"
                        placeholder="Your answer..."
                      />
                    </div>
                  ))}
                  
                  {questions.length > 0 && (
                    <div className="flex justify-end">
                      <button
                        onClick={handleGenerateQuery}
                        className="mt-4 px-6 py-2 bg-gray-200 text-gray-700 hover:bg-[#068EF1] hover:text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#068EF1] focus:ring-offset-2 flex items-center justify-center"
                        disabled={isGeneratingPubMed || isGeneratingSynonyms}
                      >
                        {(isGeneratingPubMed || isGeneratingSynonyms) ? (
                          <div className="flex items-end">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                            Generating query...
                          </div>
                        ) : (
                          <>Apply</>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="w-1/2">
          <PubMedQueryBuilder
            query={pubMedQuery}
            onQueryChange={setPubMedQuery}
            onLightbulbClick={handleLightbulbClick}
            isGeneratingPubMed={isGeneratingPubMed}
            estimatedDocuments={estimatedDocuments}
            synonymGroups={synonymGroups}
            documentStats={{
              files: totalDocuments,
              duplicates: Math.round(totalDocuments * 0.15) // Default 15% duplicates
            }}
            onCollect={handleCollectDocuments}
            description={naturalLanguageQuery}
            questions={questions}
            answers={answers}
          />
        </div>
      </div>
    </div>
  );
};

export default QueryGenerator;
