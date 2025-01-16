import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface AbstractModalProps {
  title: string;
  abstract: string;
  onClose: () => void;
}

const AbstractModal: React.FC<AbstractModalProps> = ({ title, abstract, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[800px] max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Abstract</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 overflow-y-auto flex-1">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Title</h3>
              <p className="text-gray-600">{title}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Abstract</h3>
              <p className="text-gray-600 whitespace-pre-wrap">{abstract}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbstractModal; 