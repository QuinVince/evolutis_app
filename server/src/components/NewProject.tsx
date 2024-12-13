import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { FaFolder, FaEdit, FaUser, FaTimes, FaPlus, FaChevronRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addProject, updateProject } from '../store/projectSlice';
import { RootState } from '../store/store';

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
      id: existingProject?.id || Date.now().toString(),
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
    navigate('/new-query');
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

  return (
    <div className="p-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 mb-8 text-sm">
        <Link to="/" className="text-gray-500 hover:text-gray-700">
          Home
        </Link>
        <FaChevronRight className="text-gray-400 w-3 h-3" />
        <Link to="/new-project" className="text-gray-500 hover:text-gray-700">
          New project
        </Link>
        <FaChevronRight className="text-gray-400 w-3 h-3" />
        <span className="text-gray-400">New query</span>
      </nav>

      {/* Project Header */}
      <div className="space-y-6">
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
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Status</span>
          <span className="px-3 py-1 bg-[#DCF8FF] text-[#068EF1] rounded-full text-sm">
            In progress
          </span>
        </div>

        {/* Assignees */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Assignees</span>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-full">
              <FaUser className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">{assignee}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center space-x-2 flex-wrap">
          <span className="text-sm text-gray-500">Tags</span>
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
                  <FaTimes className="w-3 h-3" />
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
  );
};

export default NewProject;