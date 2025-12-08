import React, { useState, useEffect } from 'react';
import { Settings, Bell, Zap, LayoutGrid, Clock } from 'lucide-react';
import { Timeframe } from '../types';

interface HeaderProps {
  toggleAlarmPanel: () => void;
  selectedTimeframe: Timeframe;
  onTimeframeChange: (tf: Timeframe) => void;
}

const Header: React.FC<HeaderProps> = ({ toggleAlarmPanel, selectedTimeframe, onTimeframeChange }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-[#151515] border-b border-[#333] h-14 flex items-center justify-between px-6 shrink-0 z-40 relative shadow-md">
      <div className="flex items-center gap-6">
         <div className="flex items-center text-orange-500 font-bold text-xl tracking-tight">
            <Zap className="mr-2 fill-orange-500 text-orange-400" size={20} />
            <span>Coromandel</span>
         </div>
         <div className="h-6 w-px bg-gray-700 hidden sm:block"></div>
         <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-300">
            <span className="bg-orange-600/20 text-orange-400 border border-orange-500/30 text-[10px] px-2 py-0.5 rounded sm:mr-3 w-max uppercase font-bold tracking-wider">Nandesari</span>
            <span className="font-medium text-gray-400">Unit Head Dashboard</span>
         </div>
      </div>

      <div className="flex items-center gap-6">
         {/* Timeframe Selector */}
         <div className="hidden md:flex items-center bg-gray-800/50 rounded-lg p-1 border border-gray-700">
            {(['LIVE', '1H', '8H', '24H'] as Timeframe[]).map((tf) => (
              <button
                key={tf}
                onClick={() => onTimeframeChange(tf)}
                className={`px-3 py-1 text-xs font-bold rounded transition-all ${
                  selectedTimeframe === tf 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                }`}
              >
                {tf}
              </button>
            ))}
         </div>

         <div className="h-6 w-px bg-gray-700 hidden md:block"></div>

         <div className="text-right hidden lg:block">
            <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">System Time</div>
            <div className="text-sm font-bold text-gray-200 font-mono">
                {time.toLocaleTimeString([], { hour12: false })}
            </div>
         </div>

         <div className="flex gap-3">
             <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full text-gray-400 transition-colors relative border border-gray-700" onClick={toggleAlarmPanel}>
                <Bell size={18} />
                <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-[#151515] animate-pulse"></span>
             </button>
         </div>
      </div>
    </header>
  );
};

export default Header;
