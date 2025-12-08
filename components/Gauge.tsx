import React from 'react';
import { LineChart, Line, YAxis, ResponsiveContainer } from 'recharts';

interface GaugeProps {
  value: number;
  min: number;
  max: number;
  title: string;
  unit: string;
  showMax?: boolean;
  history?: { value: number; timestamp: number }[];
}

const Gauge: React.FC<GaugeProps> = ({ value, min, max, title, unit, showMax, history = [] }) => {
  // Semi-circle gauge logic
  const radius = 40;
  const strokeWidth = 8;
  const normalizedValue = Math.min(Math.max(value, min), max);
  const percentage = (normalizedValue - min) / (max - min);
  
  // Arc calculation
  // Start angle 180 (left), end angle 0 (right) for semi-circle at top
  const circumference = Math.PI * radius;
  const offset = circumference * (1 - percentage);

  // Status color
  let strokeColor = "#3b82f6"; // Blue default
  if (percentage > 0.85) strokeColor = "#ef4444";
  else if (percentage > 0.7) strokeColor = "#f97316";
  else strokeColor = "#22c55e";

  return (
    <div className="flex flex-col items-center justify-between p-2 h-full w-full">
      <div className="relative flex items-center justify-center flex-none">
        <svg width="120" height="70" viewBox="0 0 100 60" className="overflow-visible">
          {/* Background Track */}
          <path
            d="M10,50 A40,40 0 1,1 90,50"
            fill="none"
            stroke="#334155"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          {/* Progress Path */}
          <path
            d="M10,50 A40,40 0 1,1 90,50"
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700 ease-in-out"
          />
          {/* Ticks */}
          <text x="5" y="60" className="text-[10px] fill-gray-400" textAnchor="start">{min}</text>
          <text x="95" y="60" className="text-[10px] fill-gray-400" textAnchor="end">{max}</text>
        </svg>
        
        {/* Needle/Value Center */}
        <div className="absolute top-8 text-center">
          <div className="text-xl font-bold text-white tracking-tighter shadow-black drop-shadow-md">
            {value.toFixed(1)}
          </div>
          <div className="text-[10px] text-gray-400">{unit}</div>
        </div>
      </div>
      
      <div className="w-full text-center flex-1 flex flex-col justify-end min-h-0">
        <div className="text-xs font-medium text-gray-300 truncate w-full px-1">{title}</div>
        {showMax && (
          <div className="text-[10px] text-gray-500 mb-1">
            Max: {(value * 1.05).toFixed(1)}
          </div>
        )}
        {history.length > 0 && (
          <div className="h-8 w-full mt-1 opacity-50">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={history}>
                   <YAxis domain={[min, max]} hide />
                   <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={strokeColor} 
                      strokeWidth={1.5} 
                      dot={false} 
                      isAnimationActive={false} 
                   />
                </LineChart>
             </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gauge;