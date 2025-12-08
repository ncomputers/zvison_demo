import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Gauge from './components/Gauge';
import Tank from './components/Tank';
import BarWidget from './components/BarWidget';
import NumericCard from './components/NumericCard';
import TimeSeriesWidget from './components/TimeSeriesWidget';
import { DASHBOARD_CONFIG } from './constants';
import { generateValue } from './utils';
import { WidgetConfig, LiveData } from './types';

// Type for history buffer for sparklines
type HistoryPoint = { value: number; timestamp: number };
type HistoryBuffer = { [key: string]: HistoryPoint[] };

const App: React.FC = () => {
  const [liveData, setLiveData] = useState<LiveData>({});
  const [history, setHistory] = useState<HistoryBuffer>({});

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
          const newVal = generateValue(metric.value_range.min, metric.value_range.max, prevData[key]);
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
    
    // Fallback display range to metric range if not specified in widget config
    const min = widget.display_min ?? metricDef?.value_range.min ?? 0;
    const max = widget.display_max ?? metricDef?.value_range.max ?? 100;

    switch (widget.type) {
      case 'gauge':
        return (
          <Gauge
            key={widget.widget_id}
            value={value}
            min={min}
            max={max}
            title={widget.title}
            unit={widget.unit}
            showMax={widget.show_today_max}
            history={historyData}
          />
        );
      case 'vertical_tank':
        return (
          <Tank
            key={widget.widget_id}
            value={value}
            min={min}
            max={max}
            title={widget.title}
            unit={widget.unit}
          />
        );
      case 'bar':
        return (
          <BarWidget
            key={widget.widget_id}
            value={value}
            max={max}
            title={widget.title}
            unit={widget.unit}
          />
        );
      case 'time_series':
        return (
          <TimeSeriesWidget
            key={widget.widget_id}
            data={historyData}
            currentValue={value}
            min={min}
            max={max}
            title={widget.title}
            unit={widget.unit}
          />
        );
      case 'numeric_card':
      default:
        return (
            <NumericCard
                key={widget.widget_id}
                value={value}
                title={widget.title}
                unit={widget.unit}
                history={historyData}
                min={min}
                max={max}
            />
        );
    }
  }, [liveData, history]);

  // Define layout structure for a 12-column grid
  // Use specific spans to create a dense, symmetrical dashboard
  const getLayoutConfig = (groupId: string) => {
    switch (groupId) {
      // ROW 1
      case 'stack_parameters':
        return { span: 'col-span-12 lg:col-span-4', cols: 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4' }; // 4 items
      case 'sulphuric_acid_stock_level_mt':
        return { span: 'col-span-12 lg:col-span-4', cols: 'grid-cols-4' }; // 4 items
      case 'plant_throughput':
        return { span: 'col-span-12 lg:col-span-4', cols: 'grid-cols-3' }; // 3 items

      // ROW 2
      case 'inventory_parameters':
        return { span: 'col-span-12 lg:col-span-3', cols: 'grid-cols-2' }; // 2 items
      case 'enhancer_and_process_parameters':
        return { span: 'col-span-12 lg:col-span-6', cols: 'grid-cols-3' }; // 5 items (wraps 3 top, 2 bottom)
      case 'product_and_coal_furnace_temperature':
        return { span: 'col-span-12 lg:col-span-3', cols: 'grid-cols-2' }; // 2 items

      // ROW 3
      case 'electrical_and_mech_feedbacks':
        return { span: 'col-span-12 lg:col-span-6', cols: 'grid-cols-2 sm:grid-cols-4' }; // 4 items
      case 'mill_pressures_and_loads':
        return { span: 'col-span-12 lg:col-span-3', cols: 'grid-cols-1 sm:grid-cols-2' }; // 2 items
      case 'flow_totalisers_and_manual_entries':
        return { span: 'col-span-12 lg:col-span-3', cols: 'grid-cols-1 sm:grid-cols-3 lg:grid-cols-1' }; // 3 items stacked vertical on large screens for symmetry

      default:
        return { span: 'col-span-12', cols: 'grid-cols-4' };
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans overflow-hidden">
      <Header />
      
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-2 bg-[#101010]">
        <div className="grid grid-cols-12 gap-2 pb-10 max-w-[1920px] mx-auto">
          
          {DASHBOARD_CONFIG.layout_groups.map((group) => {
            const layout = getLayoutConfig(group.group_id);

            return (
              <div key={group.group_id} className={`bg-[#1e1e1e] border border-[#333] rounded flex flex-col ${layout.span} shadow-lg shadow-black/40`}>
                <div className="bg-[#2a2a2a] px-3 py-1 border-b border-[#333] flex justify-between items-center h-8 shrink-0">
                  <h3 className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">{group.title}</h3>
                  <div className="flex items-center space-x-1">
                     <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-[pulse_2s_ease-in-out_infinite]"></div>
                  </div>
                </div>
                
                <div className="p-2 flex-1 min-h-0">
                   <div className={`grid gap-2 h-full ${layout.cols}`}>
                      {group.widgets.map(renderWidget)}
                   </div>
                </div>
              </div>
            );
          })}

        </div>
      </main>
      
      {/* Footer / Status Bar */}
      <footer className="bg-[#1a1a1a] border-t border-[#333] px-4 py-1 flex justify-between items-center text-[10px] text-gray-500 shrink-0 select-none">
        <div className="flex space-x-4">
            <span>Connected to: <span className="text-gray-400">PI-AF-SERVER-01</span></span>
            <span>Latency: <span className="text-green-500">45ms</span></span>
        </div>
        <div className="flex space-x-4">
            <span>User: <span className="text-gray-400">UNIT_HEAD_VIEW</span></span>
            <span>Last Update: <span className="text-blue-400">Live</span></span>
        </div>
      </footer>
    </div>
  );
};

export default App;