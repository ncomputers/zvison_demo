import React, { useId } from 'react';
import { AreaChart, Area, YAxis, ResponsiveContainer } from 'recharts';

interface NumericCardProps {
  value: number;
  title: string;
  unit: string;
  history?: { value: number; timestamp: number }[];
  min?: number;
  max?: number;
}

const NumericCard: React.FC<NumericCardProps> = ({ value, title, unit, history = [], min, max }) => {
  const rawId = useId();
  const gradientId = `grad-${rawId.replace(/:/g, '')}`;

  return (
    <div className="flex flex-col h-full w-full justify-between items-center p-2 bg-gray-800 border border-gray-700 rounded shadow-sm relative overflow-hidden">
      <div className="text-xs text-gray-400 text-center mb-1 uppercase tracking-wider truncate w-full z-10 relative">{title}</div>
      
      <div className="flex flex-col items-center justify-center flex-1 w-full z-10 relative">
        <div className="text-xl font-bold text-white font-mono leading-none mb-1">{value.toFixed(2)}</div>
        <div className="text-[10px] text-blue-400">{unit}</div>
      </div>

      {history.length > 1 && (
        <div className="h-12 w-full mt-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history}>
                  <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  {min !== undefined && max !== undefined ? (
                      <YAxis domain={[min, max]} hide />
                  ) : (
                      <YAxis domain={['auto', 'auto']} hide />
                  )}
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