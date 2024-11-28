import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { FaChevronDown, FaChevronUp, FaTrash, FaEdit } from 'react-icons/fa';
import { deleteQuery } from '../store/querySlice';

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const savedQueries = useSelector((state: RootState) => state.query.savedQueries);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  const toggleProject = (id: string) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  const handleDeleteClick = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    setProjectToDelete(projectId);
  };

  const confirmDelete = () => {
    if (projectToDelete) {
      dispatch(deleteQuery(projectToDelete));
      setProjectToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Projects</h1>
        
        {savedQueries.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
            <p className="text-gray-500">No projects found. Start a new project to begin.</p>
            <button
              onClick={() => navigate('/new-project')}
              className="mt-4 px-6 py-2 bg-[#62B6CB] text-white rounded-lg hover:bg-opacity-90"
            >
              Start New Project
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {savedQueries.map((project) => (
              <div key={project.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div 
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleProject(project.id)}
                >
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-semibold text-gray-800">{project.name}</h2>
                    <span className="px-3 py-1 bg-[#DCF8FF] text-[#296A7A] rounded-full text-sm">
                      {project.paperCount} papers
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle edit
                      }}
                      className="p-2 text-gray-500 hover:text-[#62B6CB]"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => handleDeleteClick(e, project.id)}
                      className="p-2 text-gray-500 hover:text-red-500"
                      title="Delete project"
                    >
                      <FaTrash />
                    </button>
                    {expandedProject === project.id ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </div>
                
                {expandedProject === project.id && (
                  <div className="p-6 border-t border-gray-200 bg-gray-50">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 mb-2">Description</h3>
                        <p className="text-gray-700">{project.description}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 mb-2">Questions & Answers</h3>
                        <div className="space-y-2">
                          {project.questions.map((question, index) => (
                            <div key={index} className="bg-white p-3 rounded-lg border border-gray-200">
                              <p className="font-medium text-gray-700">{question}</p>
                              <p className="text-gray-600 mt-1">{project.answers[question]}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 mb-2">PubMed Query</h3>
                        <div className="bg-white p-4 rounded-lg border border-gray-200 font-mono text-sm">
                          {project.pubmedQuery}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 mb-2">Statistics</h3>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="text-sm text-gray-500">Total Papers</p>
                            <p className="text-2xl font-bold text-[#296A7A]">{project.paperCount}</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="text-sm text-gray-500">Free Full Text</p>
                            <p className="text-2xl font-bold text-[#296A7A]">{project.freeFullTextCount}</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="text-sm text-gray-500">Duplicates Removed</p>
                            <p className="text-2xl font-bold text-[#296A7A]">
                              {project.collectedDocuments.removedDuplicates || 0}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {projectToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Delete Project</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this project? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setProjectToDelete(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage; 