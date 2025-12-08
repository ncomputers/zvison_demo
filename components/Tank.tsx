import React from 'react';

interface TankProps {
  value: number; // 0 to 1 fraction usually
  title: string;
  maxCapacity?: number;
  unit: string;
}

const Tank: React.FC<TankProps> = ({ value, title, unit }) => {
  // Clamp value 0-1 if it's a fraction, or normalize if it's absolute.
  // Based on JSON, these are fraction_of_capacity (0-1)
  const percentage = Math.min(Math.max(value * 100, 0), 100);

  return (
    <div className="flex flex-col items-center justify-end h-full p-2">
      <div className="relative w-16 h-32 border-2 border-gray-500 rounded-lg bg-gray-800 overflow-hidden shadow-inner">
        {/* Gloss effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent z-10 pointer-events-none"></div>
        
        {/* Ticks */}
        <div className="absolute right-0 top-0 h-full w-2 flex flex-col justify-between py-1 z-20">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full h-[1px] bg-gray-600"></div>
            ))}
        </div>

        {/* Liquid */}
        <div 
          className="absolute bottom-0 left-0 w-full bg-cyan-600 transition-all duration-1000 ease-in-out opacity-80"
          style={{ height: `${percentage}%` }}
        >
             <div className="w-full h-2 bg-cyan-400 opacity-50 absolute top-0"></div>
        </div>
        
        {/* Value overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
            <span className="text-sm font-bold text-white drop-shadow-md bg-black/40 px-1 rounded">
                {percentage.toFixed(1)}%
            </span>
        </div>
      </div>
      <div className="mt-2 text-center">
        <span className="text-xs font-medium text-gray-300 block">{title}</span>
        <span className="text-[10px] text-gray-500">{unit}</span>
      </div>
    </div>
  );
};

export default Tank;