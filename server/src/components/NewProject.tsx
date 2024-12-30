import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { FaFolder, FaEdit, FaPlus, FaChevronRight, FaSearch, FaFilter } from 'react-icons/fa';
import { TbCircleDotted } from "react-icons/tb";
import { GrUser } from "react-icons/gr";
import { AiOutlineTags } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { addProject, updateProject } from '../store/projectSlice';
import { RootState } from '../store/store';
import QueryTable from './QueryTable';

interface Tag {
  id: string;
  name: string;
}

const NewProject: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId } = useParams<{ projectId: string }>();
  
  // Get project from store if editing existing project
  const existingProject = useSelector((state: RootState) => 
    projectId ? state.projects.projects.find(p => p.id === projectId) : null
  );

  const [projectTitle, setProjectTitle] = useState(existingProject?.name || "New project");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [assignee] = useState(existingProject?.author || "Fanny M.");
  const [tags, setTags] = useState<Tag[]>(
    existingProject?.tags.map(tag => ({ id: Date.now().toString(), name: tag })) || []
  );
  const [newTag, setNewTag] = useState("");
  const [showTagInput, setShowTagInput] = useState(false);
  const [localProjectId, setLocalProjectId] = useState(Date.now().toString());

  // Update local state when existing project is loaded
  useEffect(() => {
    if (existingProject) {
      setProjectTitle(existingProject.name);
      setTags(existingProject.tags.map(tag => ({ id: Date.now().toString(), name: tag })));
    }
  }, [existingProject]);

  const handleTitleSubmit = () => {
    setIsEditingTitle(false);
    const projectData = {
      id: existingProject?.id || localProjectId,
      name: projectTitle,
      status: 'in_progress' as const,
      author: assignee,
      createdAt: existingProject?.createdAt || new Date().toISOString(),
      queryCount: existingProject?.queryCount || 0,
      tags: tags.map(tag => tag.name)
    };
    
    if (existingProject) {
      dispatch(updateProject(projectData));
    } else {
      dispatch(addProject(projectData));
    }
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags([...tags, { id: Date.now().toString(), name: newTag.trim() }]);
      setNewTag("");
      setShowTagInput(false);
    }
  };

  const handleRemoveTag = (tagId: string) => {
    setTags(tags.filter(tag => tag.id !== tagId));
  };

  const handleNewQuery = () => {
    navigate('/slr-pipeline', { 
      state: { 
        mode: 'new',
        initialData: {
          projectTitle: projectTitle,
          projectId: existingProject?.id || localProjectId
        }
      }
    });
  };

  return (
    <div className="p-8">
      {/* Updated Breadcrumb */}
      <nav className="flex items-center space-x-2 mb-8 text-sm">
        <Link to="/" className="text-gray-500 hover:text-gray-700">
          Home
        </Link>
        <FaChevronRight className="text-gray-400 w-3 h-3" />
        <span className="text-gray-700">{projectTitle}</span>
      </nav>

      {/* Project Header */}
      <div className="space-y-4">
        {/* Title Section */}
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-lg bg-[#DCF8FF]">
            <FaFolder className="w-6 h-6 text-[#068EF1]" />
          </div>
          <div className="flex items-center space-x-3">
            {isEditingTitle ? (
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                onBlur={handleTitleSubmit}
                onKeyPress={(e) => e.key === 'Enter' && handleTitleSubmit()}
                className="text-2xl font-bold bg-transparent border-b-2 border-[#068EF1] focus:outline-none"
                autoFocus
              />
            ) : (
              <h1 className="text-2xl font-bold">{projectTitle}</h1>
            )}
            <button
              onClick={() => setIsEditingTitle(!isEditingTitle)}
              className="text-gray-400 hover:text-[#068EF1]"
            >
              <FaEdit className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Status */}
          <div className="pl-4 flex items-center gap-2">
          <TbCircleDotted className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500 w-24">Status</span>
            <div className="ml-4">

            <span className="px-3 py-1 bg-[#5CABFF] text-white rounded-lg text-sm">
              In progress
            </span>
          </div>
        </div>

        {/* Assignees */}
          <div className="pl-4 flex items-center gap-2">
          <GrUser className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-500 w-24">Assignees</span>
            <div className="ml-4">

            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-lg">
                
                <span className="text-sm text-gray-700">{assignee}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="pl-4 flex items-start">
          <div className="flex items-center gap-2">
            <AiOutlineTags className="w-4 h-4" />
            <span className="text-sm text-gray-500 w-24">Tags</span>
          </div>
          <div className="ml-4">
            <div className="flex items-center flex-wrap gap-2">
              {tags.map(tag => (
                <div
                  key={tag.id}
                  className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-full"
                >
                  <span className="text-sm text-gray-700">{tag.name}</span>
                  <button
                    onClick={() => handleRemoveTag(tag.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    
                  </button>
                </div>
              ))}
              {showTagInput ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onBlur={handleAddTag}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    className="px-3 py-1 text-sm border rounded-full focus:outline-none focus:border-[#068EF1]"
                    placeholder="Add tag..."
                    autoFocus
                  />
                </div>
              ) : (
                <button
                  onClick={() => setShowTagInput(true)}
                  className="flex items-center space-x-1 px-3 py-1 text-[#068EF1] hover:bg-[#DCF8FF] rounded-full transition-colors"
                >
                  <FaPlus className="w-3 h-3" />
                  <span className="text-sm">Add tag</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Query Section */}
      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Queries</h2>
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search queries..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#068EF1] w-64"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            
            {/* Filter Button */}
            <button className="p-2 text-gray-600 hover:text-gray-800">
              <FaFilter className="w-5 h-5" />
            </button>
            
            {/* New Query Button */}
            <button
              onClick={handleNewQuery}
              className="px-4 py-2 bg-[#068EF1] text-white rounded-lg hover:bg-[#068EF1]/90 transition-colors flex items-center gap-2"
            >
              <FaPlus className="w-4 h-4" />
              <span>New Query</span>
            </button>
          </div>
        </div>

        <QueryTable projectId={existingProject?.id || localProjectId} />
      </div>
    </div>
  );
};

export default NewProject;