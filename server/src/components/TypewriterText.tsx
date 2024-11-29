import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  duration?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text = '', duration = 600 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!text) return;
    
    setDisplayedText(''); // Reset text when input changes
    const increment = Math.floor(duration / text.length);
    let currentIndex = 0;
    
    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(prev => prev + text[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, increment);

    return () => clearInterval(timer);
  }, [text, duration]);

  return (
    <span className="inline-block min-w-[1px]">
      {displayedText}
      {displayedText.length < text?.length && (
        <span className="animate-blink">|</span>
      )}
    </span>
  );
};

export default TypewriterText; 