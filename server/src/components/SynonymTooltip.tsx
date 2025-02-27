import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

interface SynonymTooltipProps {
  synonyms: string[];
  position: { top: number; left: number };
  onClose: () => void;
  onSynonymClick: (synonym: string, isAdded: boolean) => void;
  addedSynonyms: Set<string>;
  abstraction: string;
}

const SynonymTooltip: React.FC<SynonymTooltipProps> = ({
  synonyms,
  position,
  onClose,
  onSynonymClick,
  addedSynonyms,
  abstraction
}) => {
  return (
    <div 
      className="fixed bg-white p-4 rounded-xl shadow-lg border border-[#068EF1] z-50"
      style={{ 
        top: position.top,
        left: position.left,
        minWidth: '300px',
        maxWidth: '400px'
      }}
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-700 capitalize">{abstraction}</h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
      <div className="space-y-2">
        {synonyms.map((synonym, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="text-gray-700">{synonym}</span>
            <button
              onClick={() => onSynonymClick(synonym, addedSynonyms.has(synonym))}
              className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                addedSynonyms.has(synonym) 
                  ? 'bg-[#068EF1] hover:bg-red-600' 
                  : 'bg-[#068EF1] hover:bg-[#4A8F9F]'
              }`}
            >
              {addedSynonyms.has(synonym) 
                ? <FaMinus className="w-2 h-2 text-white" /> 
                : <FaPlus className="w-2 h-2 text-white" />
              }
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SynonymTooltip; 