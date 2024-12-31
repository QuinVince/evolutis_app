import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Layout from './components/Layout';
import { Provider } from 'react-redux';
import { store } from './store/store';
import NewProject from './components/NewProject';
import SLRPipeline from './components/SLRPipeline';

// Add these type definitions
export interface SavedQuery {
  id: string;
  projectId: string;
  name: string;
  fileScreening: 'in_progress' | 'completed';
  totalFiles: number;
  duplicates: number;
  fileSelection: number;
  criteria: number;
  lastModified: string;
  currentStep: 'screening' | 'selection';
  screeningStep: 'generator' | 'parser';
  queryData: {
    description: string;
    query: string;
    projectTitle: string;
    projectId: string;
    questions: string[];
    answers: Record<string, string>;
    pubmedQuery: string;
    generatedQuery: boolean;
  };
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


// Create a wrapper component to handle location state
const SLRPipelineWrapper: React.FC = () => {
  const location = useLocation();
  const state = location.state as { mode: 'generator' | 'parser'; initialData?: any } | null;

  return (
    <SLRPipeline 
      mode={state?.mode || 'generator'}
      initialData={state?.initialData}
    />
  );
};

const App: React.FC = () => {
  const [projectTitle, setProjectTitle] = useState('New project');
  

  return (
    <Provider store={store}>
      <Router>
        <Layout 
          projectTitle={projectTitle} 
          onProjectTitleChange={setProjectTitle}
        >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/new-project" element={<NewProject />} />
            <Route path="/project/:projectId" element={<NewProject />} />
            <Route path="/slr-pipeline" element={<SLRPipelineWrapper />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
