import React, { useState } from 'react';

interface AnswerSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (answer: string, note: string) => void;
  currentAnswer?: string;
  position: { x: number; y: number };
}

const AnswerSelectionModal: React.FC<AnswerSelectionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentAnswer = '',
  position
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(currentAnswer.toLowerCase());
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  return (
    <div 
      className="absolute bg-white rounded-lg shadow-lg border border-gray-200 w-72 z-50"
      style={{ 
        top: position.y,
        left: position.x
      }}
    >
      <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-t border-l border-gray-200 transform rotate-45" />
      
      <div className="relative p-4 space-y-4">
        {/* Answer options */}
        <div className="space-y-2">
          {[
            { value: 'yes', label: 'Yes', color: 'bg-[#9FE5A1]' },
            { value: 'no', label: 'No', color: 'bg-[#E08F8F]' },
            { value: 'unsure', label: 'Unsure', color: 'bg-[#D9D9D9]' }
          ].map(({ value, label, color }) => (
            <label key={value} className="flex items-center gap-2 cursor-pointer">
              <div className="relative flex items-center">
                <input
                  type="radio"
                  name="answer"
                  value={value}
                  checked={selectedAnswer === value}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border ${
                  selectedAnswer === value ? 'border-gray-700' : 'border-gray-300'
                }`}>
                  {selectedAnswer === value && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-gray-700" />
                    </div>
                  )}
                </div>
              </div>
              <span className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${color}`} />
                {label}
              </span>
            </label>
          ))}
        </div>

        {/* Note input */}
        <div>
          <textarea
            placeholder="Note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#068EF1] resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(selectedAnswer, note)}
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnswerSelectionModal; 