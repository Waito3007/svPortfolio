
import React, { useState, useRef, useEffect } from 'react';
import { APPS } from '../../constants';
import Icon from './Icon';

interface DesktopProps {
    onOpenApp: (id: string) => void;
}

const Desktop: React.FC<DesktopProps> = ({ onOpenApp }) => {
    const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (menu && menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setMenu(null);
            }
        };
        window.addEventListener('mousedown', handleClick);
        return () => window.removeEventListener('mousedown', handleClick);
    }, [menu]);

    const handleContextMenu = (e: React.MouseEvent) => {
        // Only show menu if right click on desktop background, not on icon
        if ((e.target as HTMLElement).closest('.desktop-icon')) return;
        e.preventDefault();
        setMenu({ x: e.clientX, y: e.clientY });
    };

    return (
        <div
            className="absolute inset-0 p-4 pt-6"
            onContextMenu={handleContextMenu}
            style={{ position: 'relative' }}
        >
            <div className="grid grid-cols-1 gap-y-4 w-fit">
               {APPS.map(app => (
                    <div className="desktop-icon" key={app.id}>
                        <Icon app={app} onOpen={onOpenApp} />
                    </div>
                ))}
            </div>
            {/* Context menu */}
            {menu && (
                <div
                    ref={menuRef}
                    className="fixed z-50 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded shadow-lg"
                    style={{ top: menu.y, left: menu.x, minWidth: 160 }}
                >
                    {APPS.map(app => (
                        <button
                            key={app.id}
                            className="block w-full text-left px-4 py-2 hover:bg-emerald-100 dark:hover:bg-emerald-900 text-gray-800 dark:text-gray-200"
                            onClick={() => {
                                onOpenApp(app.id);
                                setMenu(null);
                            }}
                        >
                            {app.title}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Desktop;
