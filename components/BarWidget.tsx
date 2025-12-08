import React from 'react';

interface BarWidgetProps {
  value: number;
  max: number;
  title: string;
  unit: string;
}

const BarWidget: React.FC<BarWidgetProps> = ({ value, max, title, unit }) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className="flex flex-col h-full w-full p-2 items-center">
      <div className="flex-1 w-full flex items-end justify-center bg-gray-900/50 rounded border border-gray-700 p-1 relative">
         <div 
            className="w-8 bg-blue-500 rounded-t transition-all duration-500"
            style={{ height: `${percentage}%` }}
         ></div>
         {/* Value Label inside or above */}
         <div className="absolute bottom-2 w-full text-center text-xs font-bold text-white mix-blend-difference">
            {value.toFixed(0)}
         </div>
      </div>
      <div className="mt-1 text-center">
          <div className="text-xs text-gray-300 truncate">{title}</div>
          <div className="text-[10px] text-gray-500">{unit}</div>
      </div>
    </div>
  );
};

export default BarWidget;