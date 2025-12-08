import React from 'react';

interface TankProps {
  value: number;
  min: number;
  max: number;
  title: string;
  unit: string;
}

const Tank: React.FC<TankProps> = ({ value, min, max, title, unit }) => {
  // Normalize value to percentage (0-100) based on min/max range
  const range = max - min;
  const normalized = range === 0 ? 0 : ((value - min) / range) * 100;
  const percentage = Math.min(Math.max(normalized, 0), 100);

  return (
    <div className="flex flex-col items-center justify-between h-full w-full p-2">
      <div className="relative w-full max-w-[80px] flex-1 min-h-[120px] border-2 border-gray-600 rounded-lg bg-gray-800 overflow-hidden shadow-inner mb-2 group">
        {/* Gloss effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent z-10 pointer-events-none"></div>
        
        {/* Max Capacity Indicator */}
        <div className="absolute top-0 right-0 w-full flex items-center justify-end pr-1 pt-1 z-20 opacity-60 group-hover:opacity-100 transition-opacity">
           <span className="text-[9px] text-gray-400 font-mono mr-1">MAX</span>
           <div className="h-px w-2 bg-red-500/50"></div>
        </div>
        
        {/* Ticks */}
        <div className="absolute right-0 top-0 h-full w-2 flex flex-col justify-between py-2 z-20 opacity-50">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full h-[1px] bg-gray-500"></div>
            ))}
        </div>

        {/* Liquid */}
        <div 
          className="absolute bottom-0 left-0 w-full bg-cyan-600 transition-all duration-[1500ms] cubic-bezier(0.4, 0, 0.2, 1) opacity-90"
          style={{ height: `${percentage}%` }}
        >
             {/* Liquid Top Surface Highlight */}
             <div className="w-full h-0.5 bg-white/40 absolute top-0 shadow-[0_0_10px_rgba(255,255,255,0.4)]"></div>
        </div>
        
        {/* Value overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="flex flex-col items-center">
              <span className="text-sm font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] bg-black/20 px-1.5 py-0.5 rounded backdrop-blur-[2px]">
                  {(value * 100).toFixed(1)}%
              </span>
            </div>
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="text-center w-full">
        <span className="text-[10px] uppercase font-bold text-gray-400 block truncate" title={title}>{title}</span>
        <div className="flex justify-between w-full max-w-[80px] mx-auto px-1 mt-0.5">
           <span className="text-[9px] text-gray-600">{min}</span>
           <span className="text-[9px] text-gray-600 font-mono">{unit}</span>
           <span className="text-[9px] text-gray-600">{max}</span>
        </div>
      </div>
    </div>
  );
};

export default Tank;