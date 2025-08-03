
import React, { useState, useCallback } from 'react';
import { WindowInstance } from './types';
import { APPS } from './constants';
import Desktop from './components/Desktop';
import Window from './components/Window';
import Taskbar from './components/Taskbar';

const App: React.FC = () => {
    const [windows, setWindows] = useState<WindowInstance[]>([]);
    const [nextZIndex, setNextZIndex] = useState(10);
    const [activeWindowId, setActiveWindowId] = useState<string | null>(null);

    const openApp = useCallback((appId: string) => {
        const app = APPS.find(a => a.id === appId);
        if (!app) return;

        const existingWindow = windows.find(win => win.id === appId);
        const newZ = nextZIndex + 1;

        if (existingWindow) {
            setWindows(currentWindows =>
                currentWindows.map(win =>
                    win.id === appId ? { ...win, isMinimized: false, zIndex: newZ } : win
                )
            );
        } else {
            const newWindow: WindowInstance = {
                id: app.id,
                app: app,
                position: { x: 100 + windows.length * 30, y: 100 + windows.length * 30 },
                size: app.defaultSize,
                isMinimized: false,
                zIndex: newZ,
            };
            setWindows(currentWindows => [...currentWindows, newWindow]);
        }
        setActiveWindowId(appId);
        setNextZIndex(newZ);
    }, [nextZIndex, windows]);

    const closeWindow = (id: string) => {
        setWindows(currentWindows => currentWindows.filter(win => win.id !== id));
        if (activeWindowId === id) {
           const remainingWindows = windows.filter(win => win.id !== id && !win.isMinimized);
           if (remainingWindows.length > 0) {
               const topWindow = remainingWindows.reduce((prev, current) => (prev.zIndex > current.zIndex) ? prev : current);
               setActiveWindowId(topWindow.id);
           } else {
               setActiveWindowId(null);
           }
        }
    };

    const minimizeWindow = (id: string) => {
        setWindows(currentWindows => currentWindows.map(win => win.id === id ? { ...win, isMinimized: true } : win));
        if (activeWindowId === id) {
            const otherWindows = windows.filter(w => w.id !== id && !w.isMinimized);
            if(otherWindows.length > 0) {
                const topWindow = otherWindows.reduce((prev, current) => (prev.zIndex > current.zIndex) ? prev : current);
                setActiveWindowId(topWindow.id);
            } else {
                setActiveWindowId(null);
            }
        }
    };
    
    const focusWindow = (id: string) => {
        if (activeWindowId === id) return;
        
        const newZ = nextZIndex + 1;
        setNextZIndex(newZ);
        setActiveWindowId(id);

        setWindows(currentWindows =>
            currentWindows.map(win =>
                win.id === id ? { ...win, zIndex: newZ, isMinimized: false } : win
            )
        );
    };

    const handleTaskbarClick = (id: string) => {
       const targetWindow = windows.find(w => w.id === id);
       if (targetWindow?.id === activeWindowId && !targetWindow?.isMinimized) {
           minimizeWindow(id);
       } else {
           focusWindow(id);
       }
    };

    const handlePositionChange = (id: string, newPosition: { x: number; y: number }) => {
        setWindows(currentWindows =>
            currentWindows.map(win =>
                win.id === id ? { ...win, position: newPosition } : win
            )
        );
    };

    return (
        <div className="w-screen h-screen bg-cover bg-center overflow-hidden dark" style={{ backgroundImage: "url('https://picsum.photos/seed/wallpaper2/1920/1080')" }}>
            <Desktop onOpenApp={openApp} />
            
            <div className="w-full h-full pointer-events-none">
                {windows.map(win => (
                    <Window
                        key={win.id}
                        instance={win}
                        onClose={closeWindow}
                        onFocus={focusWindow}
                        onMinimize={minimizeWindow}
                        onPositionChange={handlePositionChange}
                        isActive={activeWindowId === win.id}
                    />
                ))}
            </div>
            
            <Taskbar windows={windows} onTabClick={handleTaskbarClick} activeWindowId={activeWindowId} />
        </div>
    );
};

export default App;
