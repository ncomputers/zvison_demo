import React, { useId } from 'react';
import { AreaChart, Area, YAxis, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { Maximize2 } from 'lucide-react';

interface TimeSeriesWidgetProps {
  data: { value: number; timestamp: number }[];
  currentValue: number;
  title: string;
  unit: string;
  min: number;
  max: number;
  onClick?: () => void;
}

const TimeSeriesWidget: React.FC<TimeSeriesWidgetProps> = ({ data, currentValue, title, unit, min, max, onClick }) => {
  const id = useId();
  const gradId = `grad-${id.replace(/:/g, '')}`;

  return (
    <div 
      onClick={onClick}
      className="flex flex-col h-full w-full p-3 bg-[#1e1e1e] rounded-lg border border-[#333] hover:border-gray-500 transition-all cursor-pointer group relative overflow-hidden"
    >
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
         <Maximize2 size={14} className="text-gray-400" />
      </div>

      <div className="flex justify-between items-start mb-2 z-10">
        <div className="flex flex-col overflow-hidden mr-2">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide truncate" title={title}>{title}</span>
            <span className="text-xl font-bold text-white font-mono leading-tight mt-0.5">
                {currentValue.toFixed(2)} <span className="text-xs text-gray-500 font-sans ml-0.5">{unit}</span>
            </span>
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-[60px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <YAxis domain={[min, max]} hide />
            <XAxis dataKey="timestamp" hide />
            <Tooltip 
                contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '4px' }}
                itemStyle={{ color: '#fff', fontSize: '12px' }}
                labelStyle={{ display: 'none' }}
                formatter={(val: number) => [val.toFixed(2), '']}
            />
            <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#10b981" 
                strokeWidth={2} 
                fill={`url(#${gradId})`}
                isAnimationActive={false} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TimeSeriesWidget;
