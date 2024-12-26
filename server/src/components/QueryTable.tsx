import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { FaCheck, FaFile, FaCopy, FaList, FaClock, FaChevronRight } from 'react-icons/fa';
import { Pipeline } from '../store/pipelineSlice';
import { createSelector } from '@reduxjs/toolkit';

interface QueryTableProps {
  projectId: string;
}

// Create a memoized selector outside the component
const selectPipelinesByProjectId = createSelector(
  [(state: RootState) => state.pipelines.pipelines, 
   (_state: RootState, projectId: string) => projectId],
  (pipelines, projectId) => pipelines.filter(p => p.projectId === projectId)
);

const QueryTable: React.FC<QueryTableProps> = ({ projectId }) => {
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

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              File screening
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
            pipelines.map((pipeline) => (
              <tr key={pipeline.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button
                    onClick={() => handleQueryClick(pipeline)}
                    className="group flex items-center space-x-1 hover:text-[#068EF1] transition-colors duration-200"
                  >
                    <span className="font-medium">{pipeline.name}</span>
                    <FaChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    pipeline.fileScreening === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {pipeline.fileScreening === 'completed' ? 'Completed' : 'In Progress'}
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
                No queries yet. Click "New Query" to create one.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default QueryTable; 