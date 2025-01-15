import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { FaChevronRight, FaTrash } from 'react-icons/fa';
import { Pipeline } from '../store/pipelineSlice';
import { createSelector } from '@reduxjs/toolkit';
import { deletePipeline } from '../store/pipelineSlice';

interface QueryTableProps {
  projectId: string;
}

// Create a memoized selector outside the component
const selectPipelinesByProjectId = createSelector(
  [(state: RootState) => state.pipelines.pipelines, 
   (_state: RootState, projectId: string) => projectId],
  (pipelines, projectId) => pipelines.filter((p: Pipeline) => p.projectId === projectId)
);

const QueryTable: React.FC<QueryTableProps> = ({ projectId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Use the memoized selector
  const pipelines = useSelector((state: RootState) => {
    console.log('QueryTable state:', {
      projectId,
      allPipelines: state.pipelines.pipelines,
      filteredPipelines: selectPipelinesByProjectId(state, projectId)
    });
    return selectPipelinesByProjectId(state, projectId);
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleQueryClick = (pipeline: Pipeline) => {
    console.log('Pipeline data being passed:', {
      pipeline,
      queryData: pipeline.queryData,
      questions: pipeline.queryData.questions,
      answers: pipeline.queryData.answers
    });

    navigate('/slr-pipeline', {
      state: {
        mode: pipeline.screeningStep === 'parser' ? 'parser' : 'generator',
        initialData: {
          pipelineId: pipeline.id,
          projectId: pipeline.projectId,
          currentStep: pipeline.currentStep,
          description: pipeline.queryData.description,
          query: pipeline.queryData.query,
          projectTitle: pipeline.queryData.projectTitle,
          questions: pipeline.queryData.questions,
          answers: pipeline.queryData.answers,
          pubmedQuery: pipeline.queryData.pubmedQuery,
          generatedQuery: true,
          queryData: pipeline.queryData,
          savedState: {
            fileScreening: pipeline.fileScreening,
            totalFiles: pipeline.totalFiles,
            duplicates: pipeline.duplicates,
            fileSelection: pipeline.fileSelection,
            criteria: pipeline.criteria,
          }
        }
      }
    });
  };

  const handleDelete = (e: React.MouseEvent, pipelineId: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this pipeline?')) {
      dispatch(deletePipeline(pipelineId));
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Progress
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Files
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Duplicates
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              File selection
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Criteria
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Modified
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pipelines.length > 0 ? (
            pipelines.map((pipeline: Pipeline) => (
              <tr key={pipeline.id} className="group">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleQueryClick(pipeline)}
                      className="flex items-center space-x-1 hover:text-[#068EF1]"
                    >
                      <span className="font-medium">{pipeline.name}</span>
                      <FaChevronRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, pipeline.id)}
                      className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 transition-all"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    pipeline.currentStep === 'screening' 
                      ? 'bg-blue-100 text-blue-800'
                      : pipeline.currentStep === 'criteria'
                      ? 'bg-yellow-100 text-yellow-800'
                      : pipeline.currentStep === 'abstract'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {pipeline.currentStep === 'screening'
                      ? 'Query definition'
                      : pipeline.currentStep === 'criteria'
                      ? 'Criteria selection'
                      : pipeline.currentStep === 'abstract'
                      ? 'Abstract review'
                      : pipeline.currentStep.charAt(0).toUpperCase() + pipeline.currentStep.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {pipeline.totalFiles ?? '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {pipeline.duplicates ?? '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {pipeline.fileSelection ?? '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {pipeline.criteria ?? '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(pipeline.lastModified)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                No reviews yet. Click "New review" to create one.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default QueryTable; 