import React from 'react';
import { X, Maximize2, Download, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { WidgetConfig, HistoryPoint, MetricDefinition } from '../types';

interface ExpandedViewProps {
  isOpen: boolean;
  onClose: () => void;
  widget: WidgetConfig | null;
  history: HistoryPoint[];
  metric: MetricDefinition | null;
}

const ExpandedView: React.FC<ExpandedViewProps> = ({ isOpen, onClose, widget, history, metric }) => {
  if (!isOpen || !widget || !metric) return null;

  const currentVal = history.length > 0 ? history[history.length - 1].value : 0;
  const maxVal = Math.max(...history.map(h => h.value));
  const minVal = Math.min(...history.map(h => h.value));
  const avgVal = history.reduce((acc, curr) => acc + curr.value, 0) / history.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#1a1a1a] w-full max-w-5xl h-[600px] rounded-xl border border-gray-700 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-[#222]">
           <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                 <Activity className="text-blue-400" size={24} />
              </div>
              <div>
                 <h2 className="text-xl font-bold text-white">{widget.title}</h2>
                 <div className="text-sm text-gray-400 font-mono">{widget.linked_metric_id}</div>
              </div>
           </div>
           <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 transition-colors">
                 <Download size={20} />
              </button>
              <button onClick={onClose} className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-lg text-gray-400 transition-colors">
                 <X size={24} />
              </button>
           </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col lg:flex-row">
           {/* Chart Area */}
           <div className="flex-1 p-6 relative">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={history}>
                    <defs>
                       <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis 
                       dataKey="timestamp" 
                       tickFormatter={(ts) => new Date(ts).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                       stroke="#555"
                       tick={{fontSize: 12, fill: '#888'}}
                       minTickGap={30}
                    />
                    <YAxis 
                       domain={[metric.value_range.min, metric.value_range.max]} 
                       stroke="#555"
                       tick={{fontSize: 12, fill: '#888'}}
                    />
                    <Tooltip 
                       contentStyle={{backgroundColor: '#111', borderColor: '#444', color: '#fff'}}
                       labelFormatter={(label) => new Date(label).toLocaleTimeString()}
                    />
                    <Area 
                       type="monotone" 
                       dataKey="value" 
                       stroke="#3b82f6" 
                       strokeWidth={3} 
                       fillOpacity={1} 
                       fill="url(#colorValue)" 
                    />
                 </AreaChart>
              </ResponsiveContainer>
           </div>

           {/* Sidebar Stats */}
           <div className="w-full lg:w-64 bg-[#151515] border-t lg:border-t-0 lg:border-l border-gray-800 p-6 flex flex-col gap-6">
               <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Current Value</div>
                  <div className="text-4xl font-bold text-white font-mono">{currentVal.toFixed(metric.decimals)} <span className="text-lg text-gray-500">{widget.unit}</span></div>
               </div>
               
               <div className="space-y-4">
                  <div className="p-3 bg-gray-800/50 rounded border border-gray-700/50">
                     <div className="flex justify-between items-end">
                        <span className="text-xs text-gray-400">Average</span>
                        <span className="font-mono text-lg text-blue-300">{avgVal.toFixed(metric.decimals)}</span>
                     </div>
                     <div className="w-full bg-gray-700 h-1 mt-2 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full" style={{width: '60%'}}></div>
                     </div>
                  </div>

                  <div className="p-3 bg-gray-800/50 rounded border border-gray-700/50">
                     <div className="flex justify-between items-end">
                        <span className="text-xs text-gray-400">Max Peak</span>
                        <span className="font-mono text-lg text-red-300">{maxVal.toFixed(metric.decimals)}</span>
                     </div>
                  </div>

                  <div className="p-3 bg-gray-800/50 rounded border border-gray-700/50">
                     <div className="flex justify-between items-end">
                        <span className="text-xs text-gray-400">Min Low</span>
                        <span className="font-mono text-lg text-green-300">{minVal.toFixed(metric.decimals)}</span>
                     </div>
                  </div>
               </div>

               <div className="mt-auto pt-4 border-t border-gray-800">
                  <div className="text-xs text-gray-500 mb-2">Range Config</div>
                  <div className="flex justify-between text-xs font-mono text-gray-400">
                     <span>Min: {metric.value_range.min}</span>
                     <span>Max: {metric.value_range.max}</span>
                  </div>
               </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedView;
