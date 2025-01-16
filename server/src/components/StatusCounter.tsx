import React from 'react';

interface StatusCounterProps {
  included: number;
  excluded: number;
  unsure: number;
}

const StatusCounter: React.FC<StatusCounterProps> = ({ included, excluded, unsure }) => {
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#9FE5A1]" />
        <span className="text-sm text-gray-600">
          Included: <span className="font-semibold text-black">{included}</span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#E08F8F]" />
        <span className="text-sm text-gray-600">
          Excluded: <span className="font-semibold text-black">{excluded}</span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#D9D9D9]" />
        <span className="text-sm text-gray-600">
          Unsure: <span className="font-semibold text-black">{unsure}</span>
        </span>
      </div>
    </div>
  );
};

export default StatusCounter; 