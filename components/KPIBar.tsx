import React from 'react';
import { Target, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';

const KPIBar: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2 p-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700/50">
      <div className="bg-gray-800/60 rounded-lg p-2 border border-gray-700 flex items-center justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-full blur-xl -mr-4 -mt-4 group-hover:bg-blue-500/20 transition-all"></div>
        <div>
           <div className="text-[10px] text-gray-400 uppercase font-semibold">Today Target</div>
           <div className="text-xl font-bold text-white font-mono">4,500 <span className="text-xs text-gray-500 font-sans">MT</span></div>
        </div>
        <Target className="text-blue-500" size={24} />
      </div>

      <div className="bg-gray-800/60 rounded-lg p-2 border border-gray-700 flex items-center justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-full blur-xl -mr-4 -mt-4 group-hover:bg-green-500/20 transition-all"></div>
        <div>
           <div className="text-[10px] text-gray-400 uppercase font-semibold">Actual Prod</div>
           <div className="text-xl font-bold text-green-400 font-mono">3,806 <span className="text-xs text-gray-500 font-sans">MT</span></div>
        </div>
        <TrendingUp className="text-green-500" size={24} />
      </div>

      <div className="bg-gray-800/60 rounded-lg p-2 border border-gray-700 flex items-center justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-16 h-16 bg-orange-500/10 rounded-full blur-xl -mr-4 -mt-4 group-hover:bg-orange-500/20 transition-all"></div>
        <div>
           <div className="text-[10px] text-gray-400 uppercase font-semibold">Efficiency</div>
           <div className="text-xl font-bold text-orange-400 font-mono">84.5 <span className="text-xs text-gray-500 font-sans">%</span></div>
        </div>
        <div className="relative h-6 w-6">
           <svg className="w-full h-full transform -rotate-90">
             <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" className="text-gray-700" />
             <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" className="text-orange-500" strokeDasharray="62.8" strokeDashoffset="9.4" />
           </svg>
        </div>
      </div>

      <div className="bg-gray-800/60 rounded-lg p-2 border border-gray-700 flex items-center justify-between relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-full blur-xl -mr-4 -mt-4 group-hover:bg-purple-500/20 transition-all"></div>
        <div>
           <div className="text-[10px] text-gray-400 uppercase font-semibold">Plant OEE</div>
           <div className="text-xl font-bold text-purple-400 font-mono">92.1 <span className="text-xs text-gray-500 font-sans">%</span></div>
        </div>
        <CheckCircle2 className="text-purple-500" size={24} />
      </div>
    </div>
  );
};

export default KPIBar;