
import React from 'react';
import { WindowInstance } from '../../types';
import { motion } from 'framer-motion';

interface WindowProps {
  instance: WindowInstance;
  onClose: (id: string) => void;
  onFocus: (id: string) => void;
  onMinimize: (id: string) => void;
  onToggleMaximize: (id: string) => void;
  onPositionChange: (id: string, newPosition: { x: number; y: number }) => void;
  isActive: boolean;
}

const MaximizeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
    </svg>
);

const RestoreIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
    </svg>
);

const Window: React.FC<WindowProps> = ({ instance, onClose, onFocus, onMinimize, onToggleMaximize, onPositionChange, isActive }) => {
  const { id, app, position, size, isMaximized } = instance;
  const ContentComponent = app.component;

  if (instance.isMinimized) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
        top: position.y,
        left: position.x,
        width: size.width,
        height: size.height,
      }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15 } }}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
      drag={!isMaximized}
      dragMomentum={false}
      dragConstraints={{ top: 0, left: 0, right: window.innerWidth - size.width, bottom: window.innerHeight - size.height - 48 }}
      onDragStart={() => onFocus(id)}
  onDragEnd={(_, info) => onPositionChange(id, { x: info.point.x, y: info.point.y })}
  className={`absolute bg-black/50 backdrop-blur-2xl flex flex-col overflow-hidden pointer-events-auto shadow-2xl shadow-emerald-500/15 ${isMaximized ? 'rounded-none' : 'rounded-lg'}`}
      style={{
        zIndex: instance.zIndex,
  border: isActive ? '1px solid rgba(16, 185, 129, 0.45)' : '1px solid rgba(255, 255, 255, 0.15)',
      }}
      onMouseDown={() => onFocus(id)}
    >
      <motion.header
        onDoubleClick={() => onToggleMaximize(id)}
  className={`flex items-center justify-between pl-3 pr-2 h-9 text-sm font-semibold ${isMaximized ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'} border-b ${isActive ? 'bg-emerald-500/15 border-emerald-400/40' : 'bg-black/20 border-white/10'} text-gray-100`}
      >
        <div className="flex items-center space-x-2 pointer-events-none">
            {React.cloneElement(app.icon, { className: 'w-4 h-4' })}
            <span>{app.title}</span>
        </div>
        <div className="flex items-center space-x-2">
      <button onClick={() => onMinimize(id)} title="Minimize" className="w-4 h-4 rounded-full bg-yellow-400/90 hover:bg-yellow-400 border border-white/20 flex items-center justify-center"></button>
      <button onClick={() => onToggleMaximize(id)} title={isMaximized ? "Restore" : "Maximize"} className="w-4 h-4 rounded-full bg-emerald-400/90 hover:bg-emerald-400 border border-white/20 flex items-center justify-center">
            {isMaximized ? <RestoreIcon /> : <MaximizeIcon />}
          </button>
      <button onClick={() => onClose(id)} title="Close" className="w-4 h-4 rounded-full bg-rose-500/90 hover:bg-rose-500 border border-white/20"></button>
        </div>
      </motion.header>
    <main className="flex-1 overflow-hidden bg-black/35">
        <ContentComponent />
      </main>
    </motion.div>
  );
};

export default Window;
