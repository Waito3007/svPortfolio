import React, { useState, useEffect } from 'react';
import { WindowInstance } from '../../types';
import { motion } from 'framer-motion';

interface TaskbarProps {
  windows: WindowInstance[];
  onTabClick: (id: string) => void;
  activeWindowId: string | null;
}

const Taskbar: React.FC<TaskbarProps> = ({ windows, onTabClick, activeWindowId }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 10000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-black/50 backdrop-blur-xl text-white flex items-center justify-between px-4 z-[100] border-t border-emerald-300/20">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center font-bold text-2xl text-black shadow-lg shadow-emerald-500/40">P</div>
    </div>
      
    <div className="flex-1 flex items-center justify-start ml-3 space-x-2 overflow-x-auto">
    {windows.map(win => {
       const isActive = win.id === activeWindowId && !win.isMinimized;
       const isMinimized = win.isMinimized;
       const iconElement = React.cloneElement(win.app.icon, { className: 'w-7 h-7' });
           
       return (
      <button 
        key={win.id} 
        title={win.app.title}
        onClick={() => onTabClick(win.id)}
        className={`px-5 py-2 text-base rounded-lg flex-shrink-0 flex items-center space-x-3 transition-all duration-200 ease-in-out relative ${isActive ? 'bg-emerald-400/20' : 'bg-white/5 hover:bg-white/10'} ${isMinimized ? 'opacity-60' : ''}`}
      >
        {iconElement}
        <span className="hidden sm:inline font-semibold">{win.app.title}</span>
        {isActive && (
      <motion.div 
            layoutId="active-window-indicator"
      className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-400"
            initial={false}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        )}
      </button>
    )})}
    </div>

    <div className="text-right text-sm font-semibold px-3 flex-shrink-0" style={{ textShadow: '0 0 5px rgba(16, 185, 129, 0.6)' }}>
        <div>{formatTime(time)}</div>
        <div className="hidden sm:block opacity-70">{new Date().toLocaleDateString()}</div>
      </div>
    </div>
  );
};

export default Taskbar;