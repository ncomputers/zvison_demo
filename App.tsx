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
        // Seed history with 10 points
        initialHistory[key] = Array.from({length: 10}, (_, i) => ({
            value: generateValue(metric.value_range.min, metric.value_range.max, val),
            timestamp: now - ((10 - i) * 2000)
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

  return (
    <div className="flex flex-col h-screen bg-black text-white font-sans overflow-hidden">
      <Header />
      
      <main className="flex-1 overflow-auto p-4 bg-black">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 pb-10">
          
          {DASHBOARD_CONFIG.layout_groups.map((group) => {
            // Determine grid span based on content size to mimic the "Masonry-ish" look of PI Vision
            let colSpan = "col-span-1";
            if (group.widgets.length > 4) colSpan = "col-span-1 md:col-span-2 lg:col-span-3";
            else if (group.widgets.length > 2) colSpan = "col-span-1 md:col-span-2";

            return (
              <div key={group.group_id} className={`bg-[#1e1e1e] border border-[#333] rounded-sm flex flex-col ${colSpan} shadow-lg shadow-black/50`}>
                <div className="bg-[#2d2d2d] px-3 py-1.5 border-b border-[#333] flex justify-between items-center">
                  <h3 className="text-xs font-bold text-gray-200 uppercase tracking-wide">{group.title}</h3>
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                </div>
                
                <div className="p-2 flex-1">
                   <div className={`grid gap-2 h-full ${
                       group.widgets.length === 1 ? 'grid-cols-1' :
                       group.widgets.length === 2 ? 'grid-cols-2' : 
                       group.widgets.length === 3 ? 'grid-cols-3' : 
                       'grid-cols-2 sm:grid-cols-4'
                   }`}>
                      {group.widgets.map(renderWidget)}
                   </div>
                </div>
              </div>
            );
          })}

        </div>
      </main>
      
      {/* Footer / Status Bar */}
      <footer className="bg-[#1a1a1a] border-t border-[#333] p-1 px-4 flex justify-between items-center text-[10px] text-gray-500">
        <div>Connected to: PI-AF-SERVER-01 | Latency: 45ms</div>
        <div>User: UNIT_HEAD_VIEW | Last Update: Live</div>
      </footer>
    </div>
  );
};

export default App;