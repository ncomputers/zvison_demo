import React, { useState, useEffect } from 'react';
import { Menu, Settings, Bell, Home } from 'lucide-react';

const Header: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-scada-panel border-b border-scada-border h-14 flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center space-x-4">
         <div className="flex items-center text-orange-500 font-bold text-lg tracking-wide">
            <span className="mr-2 text-2xl">⚡</span>
            Coromandel
         </div>
         <div className="h-6 w-px bg-gray-600 mx-2"></div>
         <div className="flex items-center text-sm text-gray-300">
            <span className="bg-orange-600 text-white text-xs px-1.5 py-0.5 rounded mr-2">Nandesari</span>
            <span className="font-semibold">Nandesari Unit Head</span>
         </div>
      </div>

      <div className="flex items-center space-x-6 text-gray-400">
         <div className="text-center leading-tight">
            <div className="text-xs font-mono text-gray-500">SYSTEM TIME</div>
            <div className="text-sm font-bold text-white font-mono">
                {time.toLocaleTimeString([], { hour12: false })}
            </div>
            <div className="text-[10px] text-gray-500">
                {time.toLocaleDateString()}
            </div>
         </div>
         <div className="flex space-x-3">
             <button className="hover:text-white transition-colors"><Home size={18} /></button>
             <button className="hover:text-white transition-colors"><Bell size={18} /></button>
             <button className="hover:text-white transition-colors"><Settings size={18} /></button>
             <button className="hover:text-white transition-colors"><Menu size={18} /></button>
         </div>
      </div>
    </header>
  );
};

export default Header;