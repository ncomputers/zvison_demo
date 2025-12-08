import React from 'react';
import { AlertTriangle, X, CheckCheck, Bell } from 'lucide-react';

interface AlarmPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AlarmPanel: React.FC<AlarmPanelProps> = ({ isOpen, onClose }) => {
  const alarms = [
    { id: 1, time: '13:42:15', tag: 'TIC-101', msg: 'Reactor Temp High Critical', severity: 'critical', ack: false },
    { id: 2, time: '13:38:00', tag: 'LIC-204', msg: 'Acid Tank 2 Level Low', severity: 'warning', ack: false },
    { id: 3, time: '13:15:22', tag: 'PI-303', msg: 'Blower Discharge Press High', severity: 'warning', ack: true },
    { id: 4, time: '12:50:10', tag: 'II-401', msg: 'Conveyor 3 Belt Slip', severity: 'critical', ack: true },
    { id: 5, time: '11:20:05', tag: 'FI-102', msg: 'Water Flow Deviation', severity: 'normal', ack: true },
  ];

  return (
    <div 
      className={`fixed top-14 right-0 bottom-0 w-80 bg-[#151515] border-l border-gray-800 shadow-2xl transform transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      <div className="h-full flex flex-col">
        <div className="p-3 border-b border-gray-800 flex justify-between items-center bg-[#1a1a1a]">
           <div className="flex items-center gap-2">
             <div className="relative">
                <Bell size={18} className="text-red-500 animate-[swing_2s_infinite]" />
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
             </div>
             <span className="font-bold text-gray-200">Active Alarms (2)</span>
           </div>
           <button onClick={onClose} className="text-gray-500 hover:text-white"><X size={18} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {alarms.map((alarm) => (
             <div 
               key={alarm.id} 
               className={`p-2 rounded border-l-4 relative group ${
                 alarm.severity === 'critical' ? 'bg-red-900/10 border-red-500' : 
                 alarm.severity === 'warning' ? 'bg-orange-900/10 border-orange-500' : 
                 'bg-gray-800 border-blue-500'
               }`}
             >
                {alarm.severity === 'critical' && !alarm.ack && (
                    <div className="absolute inset-0 bg-red-500/10 animate-pulse pointer-events-none"></div>
                )}
                <div className="flex justify-between items-start mb-1">
                   <span className="text-[10px] font-mono text-gray-400">{alarm.time}</span>
                   <span className={`text-[9px] uppercase font-bold px-1 rounded ${
                      alarm.severity === 'critical' ? 'bg-red-500 text-white' : 
                      alarm.severity === 'warning' ? 'bg-orange-500 text-black' : 'bg-blue-500 text-white'
                   }`}>{alarm.severity}</span>
                </div>
                <div className="text-sm font-semibold text-gray-200 leading-tight mb-1">{alarm.msg}</div>
                <div className="flex justify-between items-center">
                   <span className="text-[10px] text-gray-500 font-mono">{alarm.tag}</span>
                   {!alarm.ack ? (
                       <button className="text-[10px] text-blue-400 hover:text-blue-300 hover:underline">Acknowledge</button>
                   ) : (
                       <div className="flex items-center text-green-600 text-[10px] gap-1">
                          <CheckCheck size={12} /> Ack
                       </div>
                   )}
                </div>
             </div>
          ))}
        </div>
        
        <div className="p-2 border-t border-gray-800 bg-[#1a1a1a]">
           <button className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs py-2 rounded border border-gray-700 transition-colors">
              View Alarm History
           </button>
        </div>
      </div>
    </div>
  );
};

export default AlarmPanel;