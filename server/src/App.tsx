import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import NewProject from './components/NewProject';
import QueryGenerator from './components/QueryGenerator';
import Layout from './components/Layout';

// Add these type definitions
export interface SavedQuery {
  id: string;
  name: string;
  description: string;
  questions: string[];
  answers: Record<string, string>;
  pubmedQuery: string;

  collectedDocuments: {
    pubmed: number;
    semanticScholar: number;
    removedDuplicates?: number;
  };
  paperCount: number;

  freeFullTextCount: number;
  yearDistribution: Record<number, number>;
}

export interface AnalysisData {
  selectedQuery: SavedQuery | null;
  documents: Array<{
    id: number;
    title: string;
    abstract: string;
    date: string;
    authors: string[];
    citationCount: number; // Add this line
    pubmedLink?: string;  // Add this line
    selected: boolean;
    abstractExpanded: boolean;
    studyType: 'Meta-analysis' | 'Systematic Review' | 'RCT' | 'Cohort study' | 'Case-control study' | 'Case report' | 'Case series' | 'Expert opinion' | 'Narrative review' | 'Animal study' | 'In vitro study';
    pico: {
      population: string;
      intervention: string;
      comparator: string;
      outcome: string;
      expanded: boolean;
    };
  }>;
  criteria: Array<{
    id: number;
    description: string;
  }>;
  analysisResults: {
    [documentId: number]: {
      [criterionId: number]: 'Yes' | 'No' | 'Uncertain';
    };
  };
}

// Update LayoutProps to match Layout component requirements
interface LayoutProps {
  children: React.ReactNode;
  projectTitle: string;
  onProjectTitleChange: (title: string) => void;
}

const App: React.FC = () => {
  const [savedQueries, setSavedQueries] = useState<SavedQuery[]>([]);
  const [projectTitle, setProjectTitle] = useState('New project');
  
  const handleSaveQuery = (query: SavedQuery | null) => {
    if (query) {
      setSavedQueries(prev => [...prev, query]);
    }
  };

  const handleClearQueries = () => {
    setSavedQueries([]);
  };

  return (
    <Router>
      <Layout 
        projectTitle={projectTitle} 
        onProjectTitleChange={setProjectTitle}
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/new-project" element={<NewProject />} />
          <Route 
            path="/query-generator" 
            element={
              <QueryGenerator 
                onSaveQuery={handleSaveQuery}
                savedQueries={savedQueries}
                onClearQueries={handleClearQueries}
              />
            } 
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
