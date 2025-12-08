import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import KPIBar from './components/KPIBar';
import AlarmPanel from './components/AlarmPanel';
import Gauge from './components/Gauge';
import Tank from './components/Tank';
import BarWidget from './components/BarWidget';
import NumericCard from './components/NumericCard';
import TimeSeriesWidget from './components/TimeSeriesWidget';
import StatusCard from './components/StatusCard';
import DonutWidget from './components/DonutWidget';
import { DASHBOARD_CONFIG } from './constants';
import { generateValue } from './utils';
import { WidgetConfig, LiveData } from './types';

// Type for history buffer for sparklines
type HistoryPoint = { value: number; timestamp: number };
type HistoryBuffer = { [key: string]: HistoryPoint[] };

const App: React.FC = () => {
  const [liveData, setLiveData] = useState<LiveData>({});
  const [history, setHistory] = useState<HistoryBuffer>({});
  const [isAlarmPanelOpen, setIsAlarmPanelOpen] = useState(false);

  // Initialize Data
  useEffect(() => {
    const initialData: LiveData = {};
    const initialHistory: HistoryBuffer = {};
    const now = Date.now();
    
    // Seed initial data
    Object.entries(DASHBOARD_CONFIG.metrics).forEach(([key, metric]) => {
        const val = generateValue(metric.value_range.min, metric.value_range.max);
        initialData[key] = val;
        // Seed history with 20 points
        initialHistory[key] = Array.from({length: 20}, (_, i) => ({
            value: generateValue(metric.value_range.min, metric.value_range.max, val),
            timestamp: now - ((20 - i) * 2000)
        }));
    });
    setLiveData(initialData);
    setHistory(initialHistory);
  }, []);

  // Simulation Loop
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setLiveData((prevData) => {
        const newData: LiveData = { ...prevData };
        const newHistoryDelta: { [key: string]: HistoryPoint } = {};

        Object.entries(DASHBOARD_CONFIG.metrics).forEach(([key, metric]) => {
          // Generate new value based on previous value to simulate realistic drift
          let newVal: number;
          if (metric.role === 'status') {
             // For status, occasionally flip (low prob) or keep same
             newVal = Math.random() > 0.95 ? (prevData[key] > 0.5 ? 0 : 1) : prevData[key];
          } else {
             newVal = generateValue(metric.value_range.min, metric.value_range.max, prevData[key]);
          }
          newData[key] = newVal;
          newHistoryDelta[key] = { value: newVal, timestamp: now };
        });

        // Update History
        setHistory(prevHist => {
            const nextHist = { ...prevHist };
            Object.keys(newHistoryDelta).forEach(key => {
                if (!nextHist[key]) nextHist[key] = [];
                const updatedArr = [...nextHist[key], newHistoryDelta[key]];
                if (updatedArr.length > 20) updatedArr.shift(); // Keep last 20 points
                nextHist[key] = updatedArr;
            });
            return nextHist;
        });

        return newData;
      });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const renderWidget = useCallback((widget: WidgetConfig) => {
    const metricDef = DASHBOARD_CONFIG.metrics[widget.linked_metric_id];
    const value = liveData[widget.linked_metric_id] || 0;
    const historyData = history[widget.linked_metric_id] || [];
    
    const min = widget.display_min ?? metricDef?.value_range.min ?? 0;
    const max = widget.display_max ?? metricDef?.value_range.max ?? 100;

    switch (widget.type) {
      case 'gauge':
        return <Gauge key={widget.widget_id} value={value} min={min} max={max} title={widget.title} unit={widget.unit} showMax={widget.show_today_max} history={historyData} />;
      case 'vertical_tank':
        return <Tank key={widget.widget_id} value={value} min={min} max={max} title={widget.title} unit={widget.unit} />;
      case 'bar':
        return <BarWidget key={widget.widget_id} value={value} max={max} title={widget.title} unit={widget.unit} />;
      case 'time_series':
        return <TimeSeriesWidget key={widget.widget_id} data={historyData} currentValue={value} min={min} max={max} title={widget.title} unit={widget.unit} />;
      case 'status_card':
        return <StatusCard key={widget.widget_id} value={value} title={widget.title} />;
      case 'donut':
        return <DonutWidget key={widget.widget_id} value={value} title={widget.title} unit={widget.unit} />;
      case 'numeric_card':
      default:
        return <NumericCard key={widget.widget_id} value={value} title={widget.title} unit={widget.unit} history={historyData} min={min} max={max} />;
    }
  }, [liveData, history]);

  const getWidgetSpan = (groupId: string, index: number) => {
    if (groupId === 'enhancer_and_process_parameters') {
       if (index < 3) return 'col-span-1 sm:col-span-1 lg:col-span-2';
       return 'col-span-1 sm:col-span-1 lg:col-span-3';
    }
    return '';
  };

  const getLayoutConfig = (groupId: string) => {
    switch (groupId) {
      // TOP ROW
      case 'stack_parameters':
        return { span: 'col-span-12 lg:col-span-4', cols: 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4' };
      case 'sulphuric_acid_stock_level_mt':
        return { span: 'col-span-12 lg:col-span-4', cols: 'grid-cols-4 sm:grid-cols-4' };
      case 'plant_throughput':
        return { span: 'col-span-12 lg:col-span-4', cols: 'grid-cols-3' };

      // ROW 2
      case 'equipment_status':
        return { span: 'col-span-12 lg:col-span-6 xl:col-span-3', cols: 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-2' };
      case 'enhancer_and_process_parameters':
        return { span: 'col-span-12 lg:col-span-6 xl:col-span-6', cols: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6' };
      case 'product_and_coal_furnace_temperature':
        return { span: 'col-span-12 lg:col-span-6 xl:col-span-3', cols: 'grid-cols-2' };

      // ROW 3
      case 'quality_control':
        return { span: 'col-span-12 lg:col-span-4', cols: 'grid-cols-3' };
      case 'energy_monitoring':
        return { span: 'col-span-12 lg:col-span-4', cols: 'grid-cols-3' };
      case 'maintenance_stats':
        return { span: 'col-span-12 lg:col-span-4', cols: 'grid-cols-3' };

      // ROW 4
      case 'electrical_and_mech_feedbacks':
        return { span: 'col-span-12 lg:col-span-7', cols: 'grid-cols-2 sm:grid-cols-4' };
      case 'mill_pressures_and_loads':
        return { span: 'col-span-12 lg:col-span-3', cols: 'grid-cols-1 sm:grid-cols-2' };
      case 'flow_totalisers_and_manual_entries':
        return { span: 'col-span-12 lg:col-span-2', cols: 'grid-cols-1 sm:grid-cols-3 lg:grid-cols-1' };

      default:
        return { span: 'col-span-12', cols: 'grid-cols-4' };
    }
  };

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 bg-[#0a0a0a]">
        <Header toggleAlarmPanel={() => setIsAlarmPanelOpen(!isAlarmPanelOpen)} />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-2 sm:p-3 relative scroll-smooth">
          <KPIBar />
          
          <div className="grid grid-cols-12 gap-3 pb-10 max-w-[1920px] mx-auto">
            {DASHBOARD_CONFIG.layout_groups.map((group) => {
              const layout = getLayoutConfig(group.group_id);
              return (
                <div key={group.group_id} className={`bg-[#1e1e1e]/80 backdrop-blur-sm border border-[#333] rounded-lg flex flex-col ${layout.span} shadow-lg shadow-black/20 group hover:border-gray-600 transition-colors`}>
                  <div className="bg-[#252525]/50 px-3 py-1.5 border-b border-[#333] flex justify-between items-center h-9 shrink-0">
                    <h3 className="text-[11px] font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                       <span className="w-1 h-3 bg-blue-500 rounded-full opacity-60"></span>
                       {group.title}
                    </h3>
                  </div>
                  <div className="p-2 flex-1 min-h-0">
                     <div className={`grid gap-2 h-full ${layout.cols}`}>
                        {group.widgets.map((widget, index) => {
                           const spanClass = getWidgetSpan(group.group_id, index);
                           return (
                             <div key={widget.widget_id} className={`${spanClass} h-full min-h-[100px]`}>
                               {renderWidget(widget)}
                             </div>
                           );
                        })}
                     </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
        
        <footer className="bg-[#151515] border-t border-[#333] px-4 py-1.5 flex flex-col sm:flex-row justify-between items-center text-[10px] text-gray-500 shrink-0 select-none z-30">
          <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div> PLC Online</span>
              <span className="hidden sm:inline">|</span>
              <span className="truncate">Server: <span className="text-gray-400">PI-AF-01</span></span>
          </div>
          <div className="flex items-center gap-4">
              <span>Latency: <span className="text-green-500 font-mono">24ms</span></span>
              <span className="hidden sm:inline">|</span>
              <span>Build: v2.4.0</span>
          </div>
        </footer>
      </div>

      <AlarmPanel isOpen={isAlarmPanelOpen} onClose={() => setIsAlarmPanelOpen(false)} />
    </div>
  );
};

export default App;