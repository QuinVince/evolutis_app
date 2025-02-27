import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { FaFolder, FaEdit, FaPlus, FaChevronRight, FaSearch, FaFilter } from 'react-icons/fa';
import { TbCircleDotted } from "react-icons/tb";
import { GrUser } from "react-icons/gr";
import { AiOutlineTags } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { addProject, updateProject, Project } from '../store/projectSlice';
import { RootState } from '../store/store';
import QueryTable from './QueryTable';

interface Tag {
  id: string;
  name: string;
}

const generateUniqueName = (projects: Project[], baseName: string = "New project"): string => {
  let name = baseName;
  let counter = 1;
  
  console.log('Generating unique name. Current projects:', projects.map(p => p.name));
  
  while (projects.some(p => p.name === name)) {
    name = `${baseName} (${counter})`;
    counter++;
    console.log('Name already exists, trying:', name);
  }
  
  console.log('Final unique name:', name);
  return name;
};

const getTagColor = (index: number): string => {
  const colors = [
    'bg-blue-100 text-black',    // Blue
    'bg-green-100 text-black',  // Green
    'bg-purple-100 text-black', // Purple
    'bg-pink-100 text-black',    // Pink
    'bg-yellow-100 text-black', // Yellow
    'bg-indigo-100 text-black', // Indigo
    'bg-red-100 text-black',      // Red
    'bg-teal-100 text-black'     // Teal
  ];
  return colors[index % colors.length];
};

const NewProject: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId } = useParams<{ projectId: string }>();
  const projects = useSelector((state: RootState) => state.projects.projects);
  const hasDispatchedRef = React.useRef(false);
  
  useEffect(() => {
    if (!projectId && !hasDispatchedRef.current) {
      console.log('Starting project creation...');
      hasDispatchedRef.current = true;
      
      const newProjectId = Date.now().toString();
      const existingNames = projects.map(p => p.name);
      console.log('Existing project names:', existingNames);
      
      let name = "New project";
      let counter = 1;
      while (existingNames.includes(name)) {
        name = `New project (${counter})`;
        counter++;
        console.log('Trying name:', name);
      }
      
      const projectData = {
        id: newProjectId,
        name: name,
        status: 'in_progress' as const,
        author: "Fanny M.",
        createdAt: new Date().toISOString(),
        queryCount: 0,
        tags: []
      };
      
      console.log('Creating project with data:', projectData);
      dispatch(addProject(projectData));
      navigate(`/project/${newProjectId}`, { replace: true });
    }
    
    return () => {
      hasDispatchedRef.current = false;
    };
  }, [projectId]);  // Remove projects, dispatch, navigate from dependencies

  // Get project from store if editing existing project
  const existingProject = useSelector((state: RootState) => 
    projectId ? state.projects.projects.find(p => p.id === projectId) : null
  );

  const [projectTitle, setProjectTitle] = useState(existingProject?.name || "New project");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [assignee] = useState(existingProject?.author || "Fanny M.");
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState("");
  const [showTagInput, setShowTagInput] = useState(false);
  const [localProjectId, setLocalProjectId] = useState(Date.now().toString());

  // Update local state when existing project is loaded or changed
  useEffect(() => {
    console.log('Project change detected:', {
      projectId,
      existingProject,
      timestamp: new Date().toISOString()
    });

    if (existingProject) {
      console.log('Loading project:', {
        id: existingProject.id,
        name: existingProject.name,
        tags: existingProject.tags,
        timestamp: new Date().toISOString()
      });
      
      setProjectTitle(existingProject.name);
      
      // Clear existing tags first, then set new ones
      setTags([]); // Clear existing tags
      const newTags = existingProject.tags.map(tag => ({
        id: `${Date.now()}-${Math.random()}`, // Ensure unique IDs
        name: tag
      }));
      
      console.log('Setting new tags:', {
        newTags,
        timestamp: new Date().toISOString()
      });
      
      setTags(newTags);
    } else {
      // Reset everything when no project is found
      console.log('No project found, clearing state', {
        projectId,
        timestamp: new Date().toISOString()
      });
      setTags([]);
      setProjectTitle("New project");
    }
  }, [existingProject?.id]); // Change dependency to existingProject?.id

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
    console.log('Adding tag:', {
      newTag,
      existingProjectId: existingProject?.id,
      currentTags: tags,
      timestamp: new Date().toISOString()
    });

    if (newTag.trim() && existingProject) {
      const newTagObject = { id: Date.now().toString(), name: newTag.trim() };
      setTags(prevTags => {
        console.log('Updating tags:', {
          prevTags,
          newTag: newTagObject,
          projectId: existingProject.id,
          timestamp: new Date().toISOString()
        });
        return [...prevTags, newTagObject];
      });
      
      console.log('Dispatching project update:', {
        projectId: existingProject.id,
        updatedTags: [...tags.map(t => t.name), newTag.trim()],
        timestamp: new Date().toISOString()
      });

      dispatch(updateProject({
        ...existingProject,
        tags: [...tags.map(t => t.name), newTag.trim()]
      }));
      
      setNewTag("");
      setShowTagInput(false);
    }
  };

  const handleRemoveTag = (tagId: string) => {
    if (existingProject) {
      const updatedTags = tags.filter(t => t.id !== tagId);
      setTags(updatedTags);
      
      // Update project in store with removed tag
      dispatch(updateProject({
        ...existingProject,
        tags: updatedTags.map(t => t.name)
      }));
    }
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
              {tags.map((tag, index) => (
                <span
                  key={tag.id}
                  className={`inline-flex items-center px-2 py-1 rounded-md text-sm ${getTagColor(index)}`}
                >
                  {tag.name}
                  <button
                    onClick={() => handleRemoveTag(tag.id)}
                    className="ml-1 hover:text-gray-700"
                  >
                    ×
                  </button>
                </span>
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
          <h2 className="text-xl font-semibold">Reviews</h2>
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search reviews..."
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
              <span>New Review</span>
            </button>
          </div>
        </div>

        <QueryTable projectId={existingProject?.id || localProjectId} />
      </div>
    </div>
  );
};

export default NewProject;