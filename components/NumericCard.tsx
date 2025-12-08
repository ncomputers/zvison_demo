import React, { useId } from 'react';
import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import { Maximize2 } from 'lucide-react';

interface NumericCardProps {
  value: number;
  title: string;
  unit: string;
  history?: { value: number; timestamp: number }[];
  min?: number;
  max?: number;
  onClick?: () => void;
}

const NumericCard: React.FC<NumericCardProps> = ({ value, title, unit, history = [], min, max, onClick }) => {
  const rawId = useId();
  const gradientId = `grad-${rawId.replace(/:/g, '')}`;

  return (
    <div 
      onClick={onClick}
      className="flex flex-col h-full w-full justify-between items-center p-3 bg-[#1e1e1e] border border-[#333] rounded-lg hover:border-gray-500 transition-colors cursor-pointer group relative overflow-hidden"
    >
       <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
         <Maximize2 size={14} className="text-gray-400" />
      </div>

      <div className="text-[11px] font-semibold text-gray-400 text-center mb-1 uppercase tracking-wide truncate w-full z-10">{title}</div>
      
      <div className="flex flex-col items-center justify-center flex-1 w-full z-10">
        <div className="text-2xl font-bold text-white font-mono leading-none mb-1">{value.toFixed(2)}</div>
        <div className="text-[10px] font-bold text-blue-500">{unit}</div>
      </div>

      {history.length > 1 && (
        <div className="h-10 w-full mt-2 opacity-50 grayscale group-hover:grayscale-0 transition-all">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history}>
                  <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <YAxis domain={min !== undefined ? [min, max!] : ['auto', 'auto']} hide />
                  <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#60a5fa" 
                      strokeWidth={2} 
                      fill={`url(#${gradientId})`}
                      isAnimationActive={false} 
                  />
              </AreaChart>
            </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default NumericCard;
