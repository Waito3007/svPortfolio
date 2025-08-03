import React, { useState, useEffect } from 'react';
import { WindowInstance } from '../types';

interface TaskbarProps {
  windows: WindowInstance[];
  onTabClick: (id: string) => void;
  activeWindowId: string | null;
}

const Taskbar: React.FC<TaskbarProps> = ({ windows, onTabClick, activeWindowId }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 10000); // Update every 10 seconds
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-gray-900/70 backdrop-blur-xl text-white flex items-center justify-between px-2 z-[100] border-t border-white/10">
      <div className="flex items-center space-x-2">
         <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold text-lg text-white shadow-lg">P</div>
      </div>
      
      <div className="flex-1 flex items-center justify-start ml-2 space-x-1 overflow-x-auto">
        {windows.map(win => {
           const isActive = win.id === activeWindowId && !win.isMinimized;
           const isMinimized = win.isMinimized;
           const iconElement = React.cloneElement(win.app.icon, { className: 'w-5 h-5' });
           
           return (
            <button 
                key={win.id} 
                title={win.app.title}
                onClick={() => onTabClick(win.id)}
                className={`px-3 py-1.5 text-sm rounded-md flex-shrink-0 flex items-center space-x-2 transition-all duration-200 ease-in-out relative ${isActive ? 'bg-white/20' : 'bg-white/5 hover:bg-white/10'} ${isMinimized ? 'opacity-70' : ''}`}
            >
                {iconElement}
                <span className="hidden sm:inline">{win.app.title}</span>
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 rounded-full w-1/2 transition-opacity ${!isMinimized ? 'bg-blue-400 opacity-100' : 'opacity-0'}`}></div>
            </button>
        )})}
      </div>

      <div className="text-right text-xs font-medium px-2 flex-shrink-0">
        <div>{formatTime(time)}</div>
        <div className="hidden sm:block opacity-70">{new Date().toLocaleDateString()}</div>
      </div>
    </div>
  );
};

export default Taskbar;
