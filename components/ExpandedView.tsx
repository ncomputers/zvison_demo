import React, { useState, useEffect } from 'react';
import { X, Maximize2, Download, Activity, CalendarClock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { WidgetConfig, HistoryPoint, MetricDefinition, Timeframe } from '../types';
import { generateHistory, formatTimeAxis } from '../utils';

interface ExpandedViewProps {
  isOpen: boolean;
  onClose: () => void;
  widget: WidgetConfig | null;
  history: HistoryPoint[];
  metric: MetricDefinition | null;
}

const ExpandedView: React.FC<ExpandedViewProps> = ({ isOpen, onClose, widget, history, metric }) => {
  const [activeTimeframe, setActiveTimeframe] = useState<Timeframe>('LIVE');
  const [displayData, setDisplayData] = useState<HistoryPoint[]>([]);

  // Update display data when modal opens, timeframe changes, or history props update (for LIVE)
  useEffect(() => {
    if (!isOpen || !metric) return;

    if (activeTimeframe === 'LIVE') {
      // For LIVE, use the accumulated history passed from App.tsx
      setDisplayData(history);
    } else {
      // For historical views, generate synthetic data on the fly
      const generated = generateHistory(metric, activeTimeframe);
      setDisplayData(generated);
    }
  }, [isOpen, activeTimeframe, history, metric]);

  if (!isOpen || !widget || !metric) return null;

  const currentVal = displayData.length > 0 ? displayData[displayData.length - 1].value : 0;
  const maxVal = displayData.length > 0 ? Math.max(...displayData.map(h => h.value)) : 0;
  const minVal = displayData.length > 0 ? Math.min(...displayData.map(h => h.value)) : 0;
  const avgVal = displayData.length > 0 ? displayData.reduce((acc, curr) => acc + curr.value, 0) / displayData.length : 0;

  const timeframes: Timeframe[] = ['LIVE', '1H', '8H', '24H', '7D', '30D'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#1a1a1a] w-full max-w-6xl h-[700px] rounded-xl border border-gray-700 shadow-2xl flex flex-col overflow-hidden">
        
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
           
           <div className="flex items-center gap-4">
              {/* Timeframe Selector */}
              <div className="flex items-center bg-gray-900 rounded-lg p-1 border border-gray-700">
                {timeframes.map((tf) => (
                    <button
                        key={tf}
                        onClick={() => setActiveTimeframe(tf)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                            activeTimeframe === tf 
                            ? 'bg-blue-600 text-white shadow-md' 
                            : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                        }`}
                    >
                        {tf}
                    </button>
                ))}
              </div>

              <div className="h-6 w-px bg-gray-700"></div>

              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 transition-colors" title="Download CSV">
                    <Download size={20} />
                </button>
                <button onClick={onClose} className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-lg text-gray-400 transition-colors">
                    <X size={24} />
                </button>
              </div>
           </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
           {/* Chart Area */}
           <div className="flex-1 p-6 relative flex flex-col">
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={displayData}>
                        <defs>
                        <linearGradient id="colorValueExpanded" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <XAxis 
                        dataKey="timestamp" 
                        tickFormatter={(ts) => formatTimeAxis(ts, activeTimeframe)}
                        stroke="#555"
                        tick={{fontSize: 12, fill: '#888'}}
                        minTickGap={50}
                        />
                        <YAxis 
                        domain={[metric.value_range.min, metric.value_range.max]} 
                        stroke="#555"
                        tick={{fontSize: 12, fill: '#888'}}
                        />
                        <Tooltip 
                        contentStyle={{backgroundColor: '#111', borderColor: '#444', color: '#fff'}}
                        labelFormatter={(label) => new Date(label).toLocaleTimeString()}
                        formatter={(value: number) => [value.toFixed(metric.decimals), widget.unit]}
                        />
                        <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3b82f6" 
                        strokeWidth={3} 
                        fillOpacity={1} 
                        fill="url(#colorValueExpanded)" 
                        animationDuration={500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
              </div>
           </div>

           {/* Sidebar Stats */}
           <div className="w-full lg:w-72 bg-[#151515] border-t lg:border-t-0 lg:border-l border-gray-800 p-6 flex flex-col gap-6 overflow-y-auto">
               <div className="pb-4 border-b border-gray-800">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-2">
                     <CalendarClock size={12} />
                     Selected Period
                  </div>
                  <div className="text-lg font-bold text-white">{activeTimeframe === 'LIVE' ? 'Real-time Feed' : `Past ${activeTimeframe}`}</div>
               </div>

               <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Current Value</div>
                  <div className="text-4xl font-bold text-white font-mono">{currentVal.toFixed(metric.decimals)} <span className="text-lg text-gray-500">{widget.unit}</span></div>
               </div>
               
               <div className="space-y-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
                     <div className="flex justify-between items-end mb-2">
                        <span className="text-xs text-gray-400 font-medium uppercase">Average</span>
                        <span className="font-mono text-xl text-blue-400 font-bold">{avgVal.toFixed(metric.decimals)}</span>
                     </div>
                     <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full" style={{width: `${((avgVal - metric.value_range.min) / (metric.value_range.max - metric.value_range.min)) * 100}%`}}></div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
                        <div className="text-xs text-gray-400 mb-1">Max Peak</div>
                        <div className="font-mono text-lg text-red-400 font-bold">{maxVal.toFixed(metric.decimals)}</div>
                    </div>

                    <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
                        <div className="text-xs text-gray-400 mb-1">Min Low</div>
                        <div className="font-mono text-lg text-green-400 font-bold">{minVal.toFixed(metric.decimals)}</div>
                    </div>
                  </div>
               </div>

               <div className="mt-auto pt-4 border-t border-gray-800">
                  <div className="text-xs text-gray-500 mb-2 font-medium">Instrument Range</div>
                  <div className="flex justify-between text-xs font-mono text-gray-400 bg-gray-900 p-2 rounded">
                     <span>L: {metric.value_range.min}</span>
                     <span>H: {metric.value_range.max}</span>
                  </div>
               </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedView;