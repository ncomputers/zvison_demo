import React, { useState, useEffect } from 'react';
import { Menu, Settings, Bell, Home, User, Sun } from 'lucide-react';

interface HeaderProps {
  toggleAlarmPanel: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleAlarmPanel }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-scada-panel border-b border-scada-border h-14 flex items-center justify-between px-4 shrink-0 z-40 relative shadow-sm">
      <div className="flex items-center gap-4">
         <button className="text-gray-400 hover:text-white md:hidden"><Menu size={20} /></button>
         <div className="flex items-center text-orange-500 font-bold text-lg tracking-wide">
            <span className="mr-2 text-2xl drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">⚡</span>
            <span className="hidden sm:inline">Coromandel</span>
         </div>
         <div className="h-6 w-px bg-gray-700 mx-2 hidden sm:block"></div>
         <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-300">
            <span className="bg-orange-600/90 text-white text-[10px] sm:text-xs px-1.5 py-0.5 rounded sm:mr-2 w-max shadow-sm">Nandesari</span>
            <span className="font-semibold text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">Unit Head Dashboard</span>
         </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6 text-gray-400">
         {/* Shift Info */}
         <div className="hidden lg:flex items-center gap-3 bg-gray-800/50 px-3 py-1 rounded border border-gray-700">
             <div className="flex flex-col items-end leading-none">
                 <span className="text-[10px] text-gray-400 uppercase">Operator</span>
                 <span className="text-xs font-bold text-gray-200">A. Sharma</span>
             </div>
             <div className="h-8 w-8 rounded bg-gray-700 flex items-center justify-center text-gray-300 border border-gray-600">
                 <User size={16} />
             </div>
             <div className="h-full w-px bg-gray-700 mx-1"></div>
             <div className="flex flex-col items-start leading-none">
                 <span className="text-[10px] text-gray-400 uppercase">Shift</span>
                 <span className="text-xs font-bold text-blue-400 bg-blue-900/30 px-1 rounded">B</span>
             </div>
         </div>

         <div className="text-center leading-tight hidden md:block">
            <div className="text-[10px] font-mono text-gray-500 tracking-wider">SYSTEM TIME</div>
            <div className="text-sm font-bold text-white font-mono">
                {time.toLocaleTimeString([], { hour12: false })}
            </div>
         </div>

         <div className="flex gap-2 sm:gap-3">
             <button className="p-2 hover:bg-white/10 rounded-full transition-colors relative" onClick={toggleAlarmPanel}>
                <Bell size={18} className="text-gray-300" />
                <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-[#1e1e1e] animate-pulse"></span>
             </button>
             <button className="p-2 hover:bg-white/10 rounded-full transition-colors hidden sm:block"><Settings size={18} /></button>
         </div>
      </div>
    </header>
  );
};

export default Header;