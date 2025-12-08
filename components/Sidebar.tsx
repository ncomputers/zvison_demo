import React from 'react';
import { LayoutDashboard, Factory, Map, Activity, Zap, FileText, Settings, Database } from 'lucide-react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', active: true },
    { icon: Factory, label: 'Plant View' },
    { icon: Map, label: 'Areas' },
    { icon: Activity, label: 'Sensors' },
    { icon: Zap, label: 'Energy' },
    { icon: FileText, label: 'Reports' },
  ];

  const bottomItems = [
    { icon: Database, label: 'Historian' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-16 lg:w-64 bg-black/40 border-r border-gray-800 backdrop-blur-md shrink-0 transition-all duration-300">
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 hidden lg:block px-2">Main Navigation</div>
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            className={`flex items-center gap-3 p-2 rounded-lg transition-all group ${
              item.active 
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(37,99,235,0.1)]' 
                : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
            }`}
          >
            <item.icon size={20} className={`${item.active ? 'text-blue-400' : 'group-hover:text-gray-100'}`} />
            <span className="hidden lg:block text-sm font-medium">{item.label}</span>
            {item.active && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)] hidden lg:block" />
            )}
          </button>
        ))}
        
        <div className="mt-auto">
          <div className="w-full h-px bg-gray-800 my-2 hidden lg:block"></div>
          {bottomItems.map((item, idx) => (
            <button
              key={idx}
              className="flex items-center gap-3 p-2 rounded-lg text-gray-400 hover:bg-white/5 hover:text-gray-200 w-full transition-colors"
            >
              <item.icon size={20} />
              <span className="hidden lg:block text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;