import React from 'react';
import { createPortal } from 'react-dom';

interface CriteriaTooltipProps {
  description: string;
  isVisible: boolean;
  position: { x: number; y: number };
}

const CriteriaTooltip: React.FC<CriteriaTooltipProps> = ({ description, isVisible, position }) => {
  if (!isVisible) return null;

  return createPortal(
    <div 
      className="fixed bg-white text-left text-sm rounded-lg py-2 px-3 w-80 shadow-lg border border-gray-200"
      style={{ 
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -100%)',
        zIndex: 9999
      }}
    >
      <div className="text-gray-800 whitespace-pre-line">
        {description}
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 
                    rotate-45 w-2 h-2 bg-white border-r border-b border-gray-200"/>
    </div>,
    document.body
  );
};

export default CriteriaTooltip; 