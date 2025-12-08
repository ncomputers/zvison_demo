import React from 'react';
import { LineChart, Line, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface TimeSeriesWidgetProps {
  data: { value: number; timestamp: number }[];
  currentValue: number;
  title: string;
  unit: string;
  min: number;
  max: number;
}

const CustomTooltip = ({ active, payload, label, unit }: any) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    const date = new Date(dataPoint.timestamp);
    return (
      <div className="bg-gray-900/95 backdrop-blur border border-gray-600 p-2 rounded shadow-2xl z-50 min-w-[120px]">
        <div className="flex justify-between items-center border-b border-gray-700 pb-1 mb-1">
            <span className="text-[9px] text-gray-400 uppercase tracking-wider">Time</span>
            <span className="text-[10px] font-mono text-gray-200">
                {date.toLocaleTimeString([], { hour12: false })}
            </span>
        </div>
        <div className="flex justify-between items-baseline">
           <span className="text-[9px] text-gray-400 uppercase tracking-wider mr-2">Val</span>
           <span className="text-sm font-bold text-green-400 font-mono">
             {payload[0].value.toFixed(2)}
             <span className="text-[10px] text-gray-500 ml-0.5">{unit}</span>
           </span>
        </div>
      </div>
    );
  }
  return null;
};

const TimeSeriesWidget: React.FC<TimeSeriesWidgetProps> = ({ data, currentValue, title, unit, min, max }) => {
  return (
    <div className="flex flex-col h-full w-full p-2 bg-gray-800/50 rounded border border-gray-700/50 relative group">
      <div className="flex justify-between items-baseline mb-1 z-10">
        <span className="text-xs font-medium text-gray-300 truncate mr-1" title={title}>{title}</span>
        <span className="text-sm font-bold text-blue-400 font-mono">
            {currentValue.toFixed(2)} <span className="text-[10px] text-gray-500">{unit}</span>
        </span>
      </div>
      <div className="flex-1 w-full min-h-[40px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
            <YAxis domain={[min, max]} hide />
            <Tooltip 
                content={<CustomTooltip unit={unit} />} 
                cursor={{ stroke: '#6b7280', strokeWidth: 1, strokeDasharray: '3 3' }}
                isAnimationActive={false}
                animationDuration={0}
            />
            <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#10b981" 
                strokeWidth={2} 
                dot={false}
                activeDot={{ r: 4, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
                isAnimationActive={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TimeSeriesWidget;