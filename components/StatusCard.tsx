import React from 'react';
import { Settings2, Power } from 'lucide-react';

interface StatusCardProps {
  value: number; // 0 = Stop, 1 = Run
  title: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ value, title }) => {
  const isRunning = value > 0.5;

  return (
    <div className="flex items-center justify-between p-3 bg-gray-800 border border-gray-700 rounded shadow-sm h-full relative overflow-hidden">
      {/* Background glow for running state */}
      {isRunning && (
        <div className="absolute -right-4 -top-4 w-16 h-16 bg-green-500/10 blur-xl rounded-full animate-pulse"></div>
      )}

      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full border ${isRunning ? 'border-green-500/30 bg-green-500/10' : 'border-gray-600 bg-gray-700/30'}`}>
           <Settings2 
             size={20} 
             className={`${isRunning ? 'text-green-500 animate-[spin_3s_linear_infinite]' : 'text-gray-500'}`} 
           />
        </div>
        <div>
           <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">{title}</div>
           <div className={`text-sm font-bold flex items-center gap-1.5 ${isRunning ? 'text-green-400' : 'text-red-400'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isRunning ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-red-500'}`}></span>
              {isRunning ? 'RUNNING' : 'STOPPED'}
           </div>
        </div>
      </div>
      
      <div className="flex flex-col items-end gap-1">
         <Power size={14} className={isRunning ? 'text-green-600' : 'text-red-900'} />
         <span className="text-[10px] text-gray-600 font-mono">Auto</span>
      </div>
    </div>
  );
};

export default StatusCard;