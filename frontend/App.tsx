
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { WindowInstance } from './types';
import { APPS } from './constants';
import Desktop from './components/desktop/Desktop';
import Window from './components/window/Window';
import Taskbar from './components/taskbar/Taskbar';
import MobileLayout from './components/mobile/MobileLayout';
import MobileWindow from './components/mobile/MobileWindow';
import { useIsMobile } from './hooks/useIsMobile';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
    const [windows, setWindows] = useState<WindowInstance[]>([]);
    const [nextZIndex, setNextZIndex] = useState(10);
    const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
    const [init, setInit] = useState(false);
    const isMobile = useIsMobile();

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = async (container: any) => {
        console.log("Particles loaded", container);
    };
    
    const options = useMemo(
        () => ({
            background: {
                color: {
                    value: "#0d1117",
                },
            },
            fpsLimit: 60,
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    value: "#00ff99",
                },
                links: {
                    color: "#00ff99",
                    distance: 150,
                    enable: true,
                    opacity: 0.15,
                    width: 1,
                },
                move: {
                    direction: "none" as const,
                    enable: true,
                    outModes: {
                        default: "bounce" as const,
                    },
                    random: false,
                    speed: 1,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: 120,
                },
                opacity: {
                    value: 0.2,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 3 },
                },
            },
            detectRetina: true,
        }),
        [],
    );

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
            // Default open in maximized state; remember previous size/position for restore
            const prevPos = { x: 100 + windows.length * 30, y: 100 + windows.length * 30 };
            const prevSize = app.defaultSize;
            const newWindow: WindowInstance = {
                id: app.id,
                app: app,
                position: { x: 0, y: 0 },
                size: { width: window.innerWidth, height: window.innerHeight - 48 },
                isMinimized: false,
                isMaximized: true,
                zIndex: newZ,
                previousState: { position: prevPos, size: prevSize },
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

    const toggleMaximizeWindow = (id: string) => {
        setWindows(currentWindows =>
            currentWindows.map(win => {
                if (win.id === id) {
                    if (win.isMaximized) {
                        // Restore
                        return {
                            ...win,
                            isMaximized: false,
                            position: win.previousState?.position || { x: 150, y: 150 },
                            size: win.previousState?.size || { width: 800, height: 600 },
                        };
                    } else {
                        // Maximize
                        return {
                            ...win,
                            isMaximized: true,
                            previousState: { position: win.position, size: win.size },
                            position: { x: 0, y: 0 },
                            size: { width: window.innerWidth, height: window.innerHeight - 48 }, // 48px for taskbar
                        };
                    }
                }
                return win;
            })
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

    if (!init) {
        return null;
    }

    // Mobile Layout
    if (isMobile) {
        return (
            <div className="w-screen h-screen bg-[#0d1117] overflow-hidden dark">
                <MobileLayout onOpenApp={openApp} />
                
                <AnimatePresence>
                    {windows.map(win => (
                        <MobileWindow
                            key={win.id}
                            instance={win}
                            onClose={closeWindow}
                            isActive={activeWindowId === win.id}
                        />
                    ))}
                </AnimatePresence>
            </div>
        );
    }

    // Desktop Layout
    return (
        <div className="w-screen h-screen bg-[#0d1117] overflow-hidden dark">
            <Particles
                id="tsparticles"
                particlesLoaded={particlesLoaded}
                options={options}
                className="absolute inset-0 -z-10"
            />
            <Desktop onOpenApp={openApp} />
            
            <div className="w-full h-full pointer-events-none">
                <AnimatePresence>
                    {windows.map(win => (
                        <Window
                            key={win.id}
                            instance={win}
                            onClose={closeWindow}
                            onFocus={focusWindow}
                            onMinimize={minimizeWindow}
                            onToggleMaximize={toggleMaximizeWindow}
                            onPositionChange={handlePositionChange}
                            isActive={activeWindowId === win.id}
                        />
                    ))}
                </AnimatePresence>
            </div>
            
            <Taskbar windows={windows} onTabClick={handleTaskbarClick} activeWindowId={activeWindowId} />
        </div>
    );
};

export default App;
