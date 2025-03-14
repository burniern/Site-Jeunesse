import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  const arrowClasses = {
    top: 'bottom-[-6px] left-1/2 -translate-x-1/2 border-t-gray-800',
    bottom: 'top-[-6px] left-1/2 -translate-x-1/2 border-b-gray-800',
    left: 'right-[-6px] top-1/2 -translate-y-1/2 border-l-gray-800',
    right: 'left-[-6px] top-1/2 -translate-y-1/2 border-r-gray-800'
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {isVisible && (
        <div className={`absolute z-50 ${positionClasses[position]}`}>
          <div className="bg-gray-800 text-white text-sm rounded px-2 py-1 whitespace-nowrap">
            {content}
            <div 
              className={`absolute w-2 h-2 transform rotate-45 border-4 border-transparent ${arrowClasses[position]}`}
            />
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Tooltip;