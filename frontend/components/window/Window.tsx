import React, { useState, useRef, useEffect } from 'react';
import { WindowInstance } from '../types';

interface WindowProps {
  instance: WindowInstance;
  onClose: (id: string) => void;
  onFocus: (id:string) => void;
  onMinimize: (id:string) => void;
  onPositionChange: (id: string, newPosition: { x: number; y: number }) => void;
  isActive: boolean;
}

const Window: React.FC<WindowProps> = ({ instance, onClose, onFocus, onMinimize, onPositionChange, isActive }) => {
  const { id, app, position, size, isMinimized } = instance;
  const ContentComponent = app.component;

  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    onFocus(id);
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !windowRef.current) return;
      
      const parentRect = windowRef.current.parentElement?.getBoundingClientRect();
      if (!parentRect) return;

      let newX = e.clientX - dragStartPos.current.x;
      let newY = e.clientY - dragStartPos.current.y;

      // Clamp position to be within viewport (minus taskbar height)
      newX = Math.max(0, Math.min(newX, parentRect.width - size.width));
      newY = Math.max(0, Math.min(newY, parentRect.height - size.height - 48)); // 48px for taskbar

      onPositionChange(id, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, id, onPositionChange, size.width, size.height]);
  
  if (isMinimized) return null;

  return (
    <div
      ref={windowRef}
      className="absolute bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur-md rounded-lg flex flex-col overflow-hidden transition-opacity duration-200 pointer-events-auto"
      style={{
        top: position.y,
        left: position.x,
        width: size.width,
        height: size.height,
        zIndex: instance.zIndex,
        boxShadow: isActive ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
        border: isActive ? '1px solid rgba(59, 130, 246, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
        opacity: isDragging ? 0.8 : 1,
      }}
      onMouseDown={() => onFocus(id)}
    >
      <header
        onMouseDown={handleMouseDown}
        className={`flex items-center justify-between px-2 h-9 text-sm font-semibold cursor-grab active:cursor-grabbing border-b ${isActive ? 'bg-white/30 dark:bg-gray-700/50 border-black/10 dark:border-white/10' : 'bg-gray-200/50 dark:bg-gray-900/50 border-black/5 dark:border-white/5'} text-gray-900 dark:text-gray-100`}
      >
        <div className="flex items-center space-x-2 pointer-events-none">
            {React.cloneElement(app.icon, { className: 'w-4 h-4' })}
            <span>{app.title}</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <button onClick={() => onMinimize(id)} title="Minimize" className="w-5 h-5 rounded-full bg-yellow-400 hover:bg-yellow-500 border border-black/20"></button>
          <button onClick={() => onClose(id)} title="Close" className="w-5 h-5 rounded-full bg-red-500 hover:bg-red-600 border border-black/20"></button>
        </div>
      </header>
      <main className="flex-1 overflow-hidden bg-white dark:bg-gray-800/60">
        <ContentComponent />
      </main>
    </div>
  );
};

export default Window;
