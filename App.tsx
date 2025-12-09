import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import KPIBar from './components/KPIBar';
import AlarmPanel from './components/AlarmPanel';
import ExpandedView from './components/ExpandedView';
import Gauge from './components/Gauge';
import Tank from './components/Tank';
import BarWidget from './components/BarWidget';
import NumericCard from './components/NumericCard';
import TimeSeriesWidget from './components/TimeSeriesWidget';
import StatusCard from './components/StatusCard';
import DonutWidget from './components/DonutWidget';
import { DASHBOARD_CONFIG } from './constants';
import { generateValue, generateHistory } from './utils';
import { WidgetConfig, LiveData, Timeframe, HistoryPoint, MetricDefinition } from './types';

type HistoryBuffer = { [key: string]: HistoryPoint[] };

const App: React.FC = () => {
  const [liveData, setLiveData] = useState<LiveData>({});
  const [history, setHistory] = useState<HistoryBuffer>({});
  const [isAlarmPanelOpen, setIsAlarmPanelOpen] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>('LIVE');
  const [expandedWidget, setExpandedWidget] = useState<WidgetConfig | null>(null);

  // Initialize Data & History
  useEffect(() => {
    const initialData: LiveData = {};
    const initialHistory: HistoryBuffer = {};
    
    Object.entries(DASHBOARD_CONFIG.metrics).forEach(([key, metric]) => {
        initialData[key] = generateValue(metric.value_range.min, metric.value_range.max);
        initialHistory[key] = generateHistory(metric, selectedTimeframe);
    });
    setLiveData(initialData);
    setHistory(initialHistory);
  }, [selectedTimeframe]);

  // Simulation Loop
  useEffect(() => {
    if (selectedTimeframe !== 'LIVE') return; // Only animate in LIVE mode

    const interval = setInterval(() => {
      const now = Date.now();
      setLiveData((prevData) => {
        const newData: LiveData = { ...prevData };
        const newHistoryDelta: { [key: string]: HistoryPoint } = {};

        Object.entries(DASHBOARD_CONFIG.metrics).forEach(([key, metric]) => {
          let newVal: number;
          if (metric.role === 'status') {
             // Respect value range if fixed (e.g. min=1, max=1 means always 1)
             if (metric.value_range.min === metric.value_range.max) {
                 newVal = metric.value_range.min;
             } else {
                 newVal = Math.random() > 0.95 ? (prevData[key] > 0.5 ? 0 : 1) : prevData[key];
             }
          } else {
             newVal = generateValue(metric.value_range.min, metric.value_range.max, prevData[key]);
          }
          newData[key] = newVal;
          newHistoryDelta[key] = { value: newVal, timestamp: now };
        });

        setHistory(prevHist => {
            const nextHist = { ...prevHist };
            Object.keys(newHistoryDelta).forEach(key => {
                if (!nextHist[key]) nextHist[key] = [];
                const updatedArr = [...nextHist[key], newHistoryDelta[key]];
                if (updatedArr.length > 50) updatedArr.shift(); 
                nextHist[key] = updatedArr;
            });
            return nextHist;
        });

        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedTimeframe]);

  const handleWidgetClick = (widget: WidgetConfig) => {
    setExpandedWidget(widget);
  };

  const renderWidget = useCallback((widget: WidgetConfig) => {
    const metricDef = DASHBOARD_CONFIG.metrics[widget.linked_metric_id];
    const value = liveData[widget.linked_metric_id] || 0;
    const historyData = history[widget.linked_metric_id] || [];
    
    const min = widget.display_min ?? metricDef?.value_range.min ?? 0;
    const max = widget.display_max ?? metricDef?.value_range.max ?? 100;

    const commonProps = {
        key: widget.widget_id,
        value, title: widget.title, unit: widget.unit, min, max,
        onClick: () => handleWidgetClick(widget)
    };

    switch (widget.type) {
      case 'gauge':
        return <Gauge {...commonProps} history={historyData} />;
      case 'vertical_tank':
        return <Tank {...commonProps} />;
      case 'bar':
        return <BarWidget {...commonProps} />;
      case 'time_series':
        return <TimeSeriesWidget {...commonProps} data={historyData} currentValue={value} />;
      case 'status_card':
        return <StatusCard {...commonProps} />;
      case 'donut':
        return <DonutWidget {...commonProps} />;
      case 'numeric_card':
      default:
        return <NumericCard {...commonProps} history={historyData} />;
    }
  }, [liveData, history]);

  const getLayoutConfig = (groupId: string) => {
    // Highly optimized for 1920x1080 and up without Sidebar
    switch (groupId) {
      case 'stack_parameters':
        return { span: 'col-span-12 xl:col-span-4', cols: 'grid-cols-2 md:grid-cols-4 xl:grid-cols-2' };
      case 'sulphuric_acid_stock_level_mt':
        return { span: 'col-span-12 xl:col-span-4', cols: 'grid-cols-4' };
      case 'equipment_status':
         return { span: 'col-span-12 xl:col-span-4', cols: 'grid-cols-2' };
      
      case 'enhancer_and_process_parameters':
        return { span: 'col-span-12 xl:col-span-8', cols: 'grid-cols-2 md:grid-cols-4 xl:grid-cols-5' };
      case 'plant_throughput':
        return { span: 'col-span-12 xl:col-span-4', cols: 'grid-cols-3' };

      // Bottom Section Dense Layout
      case 'quality_control':
        return { span: 'col-span-12 xl:col-span-3', cols: 'grid-cols-2' };
      case 'electrical_and_mech_feedbacks':
        // Changed to xl:grid-cols-2 to make it 2 rows high, matching QC and balancing the vertical flow
        return { span: 'col-span-12 xl:col-span-6', cols: 'grid-cols-2 md:grid-cols-4 xl:grid-cols-2' };
      case 'maintenance_stats':
         // Vertical side panel arrangement spanning 2 rows
        return { span: 'col-span-12 xl:col-span-3 xl:row-span-2', cols: 'grid-cols-1' };
      
      case 'energy_monitoring':
        return { span: 'col-span-12 xl:col-span-3', cols: 'grid-cols-2' };
      case 'mill_pressures_and_loads':
        return { span: 'col-span-12 md:col-span-6 xl:col-span-3', cols: 'grid-cols-1' };
      case 'flow_totalisers_and_manual_entries':
        return { span: 'col-span-12 md:col-span-6 xl:col-span-3', cols: 'grid-cols-2 xl:grid-cols-2' };

      default:
        return { span: 'col-span-12 xl:col-span-4', cols: 'grid-cols-3' };
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] text-white font-sans overflow-hidden">
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
            toggleAlarmPanel={() => setIsAlarmPanelOpen(!isAlarmPanelOpen)} 
            selectedTimeframe={selectedTimeframe}
            onTimeframeChange={setSelectedTimeframe}
        />
        
        <main className="flex-1 overflow-y-auto p-4 relative scroll-smooth bg-gradient-to-b from-[#111] to-[#050505]">
          <div className="max-w-[2000px] mx-auto space-y-4">
            <KPIBar />
            
            <div className="grid grid-cols-12 gap-4 pb-10 grid-flow-dense">
                {DASHBOARD_CONFIG.layout_groups.map((group) => {
                const layout = getLayoutConfig(group.group_id);
                return (
                    <div key={group.group_id} className={`bg-[#181818] border border-[#2a2a2a] rounded-lg flex flex-col ${layout.span} shadow-xl overflow-hidden`}>
                    <div className="bg-[#202020] px-3 py-2 border-b border-[#333] flex justify-between items-center h-10 shrink-0">
                        <h3 className="text-xs font-bold text-gray-300 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1.5 h-4 bg-blue-600 rounded-sm"></span>
                        {group.title}
                        </h3>
                    </div>
                    <div className="p-3 flex-1">
                        <div className={`grid gap-3 h-full ${layout.cols}`}>
                            {group.widgets.map((widget) => (
                                <div key={widget.widget_id} className="h-full min-h-[120px]">
                                {renderWidget(widget)}
                                </div>
                            ))}
                        </div>
                    </div>
                    </div>
                );
                })}
            </div>
          </div>
        </main>
        
        <footer className="bg-[#0f0f0f] border-t border-[#222] px-6 py-2 flex justify-between items-center text-[11px] text-gray-500 shrink-0 select-none">
           <div>Connected to: <span className="text-gray-300">PI-AF-SERVER-01</span></div>
           <div>Latency: <span className="text-green-500">24ms</span></div>
        </footer>
      </div>

      <AlarmPanel isOpen={isAlarmPanelOpen} onClose={() => setIsAlarmPanelOpen(false)} />
      
      <ExpandedView 
         isOpen={!!expandedWidget} 
         onClose={() => setExpandedWidget(null)} 
         widget={expandedWidget}
         history={expandedWidget ? history[expandedWidget.linked_metric_id] : []}
         metric={expandedWidget ? DASHBOARD_CONFIG.metrics[expandedWidget.linked_metric_id] : null}
      />
    </div>
  );
};

export default App;