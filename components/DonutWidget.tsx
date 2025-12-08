import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface DonutWidgetProps {
  value: number; // Just one value passed, we simulate a split for demo
  title: string;
  unit: string;
}

const DonutWidget: React.FC<DonutWidgetProps> = ({ value, title, unit }) => {
  // Simulate data split based on value
  const planned = 10;
  const unplanned = Math.max(0, value); 
  const data = [
    { name: 'Planned', value: planned, color: '#3b82f6' },
    { name: 'Unplanned', value: unplanned, color: '#ef4444' },
  ];

  return (
    <div className="flex flex-col h-full w-full p-2 bg-gray-800 border border-gray-700 rounded relative">
      <div className="text-xs text-gray-300 font-medium mb-1 truncate">{title}</div>
      <div className="flex-1 min-h-[60px] relative">
         <ResponsiveContainer width="100%" height="100%">
            <PieChart>
               <Pie
                 data={data}
                 cx="50%"
                 cy="50%"
                 innerRadius={25}
                 outerRadius={35}
                 paddingAngle={5}
                 dataKey="value"
                 stroke="none"
               >
                 {data.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill={entry.color} />
                 ))}
               </Pie>
               <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', fontSize: '12px' }}
                  itemStyle={{ color: '#e5e7eb' }}
                  formatter={(value: number) => [`${value} hrs`, '']}
               />
            </PieChart>
         </ResponsiveContainer>
         {/* Center Label */}
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
               <div className="text-xs font-bold text-white">{value.toFixed(1)}</div>
               <div className="text-[8px] text-gray-500">{unit}</div>
            </div>
         </div>
      </div>
      <div className="flex justify-center gap-3 mt-1">
         {data.map(d => (
            <div key={d.name} className="flex items-center gap-1">
               <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: d.color }}></div>
               <span className="text-[9px] text-gray-400">{d.name}</span>
            </div>
         ))}
      </div>
    </div>
  );
};

export default DonutWidget;