import React from 'react';
import { Maximize2 } from 'lucide-react';

interface GaugeProps {
  value: number;
  min: number;
  max: number;
  title: string;
  unit: string;
  showMax?: boolean;
  history?: { value: number; timestamp: number }[];
  onClick?: () => void;
}

const Gauge: React.FC<GaugeProps> = ({ value, min, max, title, unit, onClick }) => {
  const radius = 40;
  const strokeWidth = 6;
  const normalizedValue = Math.min(Math.max(value, min), max);
  const percentage = (normalizedValue - min) / (max - min);
  const circumference = Math.PI * radius;
  const offset = circumference * (1 - percentage);

  let strokeColor = "#3b82f6";
  if (percentage > 0.85) strokeColor = "#ef4444";
  else if (percentage > 0.7) strokeColor = "#f97316";
  else strokeColor = "#22c55e";

  return (
    <div 
      onClick={onClick}
      className="flex flex-col items-center justify-between p-3 h-full w-full bg-[#1e1e1e] border border-[#333] rounded-lg hover:border-gray-500 transition-colors cursor-pointer group relative"
    >
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
         <Maximize2 size={14} className="text-gray-400" />
      </div>

      <div className="relative flex items-center justify-center flex-none mt-2">
        <svg width="120" height="65" viewBox="0 0 100 60" className="overflow-visible">
          <path d="M10,50 A40,40 0 1,1 90,50" fill="none" stroke="#2a2a2a" strokeWidth={strokeWidth} strokeLinecap="round" />
          <path d="M10,50 A40,40 0 1,1 90,50" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-500 ease-out" />
          <text x="10" y="62" className="text-[8px] fill-gray-500 font-mono" textAnchor="middle">{min}</text>
          <text x="90" y="62" className="text-[8px] fill-gray-500 font-mono" textAnchor="middle">{max}</text>
        </svg>
        <div className="absolute top-8 text-center">
          <div className="text-xl font-bold text-white tracking-tighter shadow-black drop-shadow-sm font-mono">
            {value.toFixed(1)}
          </div>
          <div className="text-[10px] text-gray-400 font-bold">{unit}</div>
        </div>
      </div>
      <div className="w-full text-center mt-1 border-t border-gray-800 pt-2">
        <div className="text-[11px] font-semibold text-gray-300 truncate px-1">{title}</div>
      </div>
    </div>
  );
};

export default Gauge;
