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
    return (
      <div className="bg-gray-900 border border-gray-700 p-2 rounded shadow-lg z-50">
        <p className="text-[10px] text-gray-400 mb-0.5">
            {new Date(dataPoint.timestamp).toLocaleTimeString()}
        </p>
        <p className="text-sm font-bold text-white">
          {payload[0].value.toFixed(2)}
          <span className="text-xs font-normal text-gray-500 ml-1">{unit}</span>
        </p>
      </div>
    );
  }
  return null;
};

const TimeSeriesWidget: React.FC<TimeSeriesWidgetProps> = ({ data, currentValue, title, unit, min, max }) => {
  return (
    <div className="flex flex-col h-full w-full p-2 bg-gray-800/50 rounded border border-gray-700/50">
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-xs font-medium text-gray-300 truncate mr-1" title={title}>{title}</span>
        <span className="text-sm font-bold text-blue-400 font-mono">
            {currentValue.toFixed(2)} <span className="text-[10px] text-gray-500">{unit}</span>
        </span>
      </div>
      <div className="flex-1 w-full min-h-[40px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <YAxis domain={[min, max]} hide />
            <Tooltip 
                content={<CustomTooltip unit={unit} />} 
                cursor={{ stroke: '#4b5563', strokeWidth: 1, strokeDasharray: '3 3' }}
                isAnimationActive={false}
            />
            <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#10b981" 
                strokeWidth={2} 
                dot={{ r: 2, fill: '#10b981' }} 
                activeDot={{ r: 4, fill: '#34d399', stroke: '#fff' }}
                isAnimationActive={false} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TimeSeriesWidget;