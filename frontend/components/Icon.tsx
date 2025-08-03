
import React from 'react';
import { AppType } from '../types';

interface IconProps {
    app: AppType;
    onOpen: (id: string) => void;
}

const Icon: React.FC<IconProps> = ({ app, onOpen }) => {
    return (
        <div
            className="flex flex-col items-center justify-center text-center space-y-1 p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer w-24"
            onDoubleClick={() => onOpen(app.id)}
            title={`Double-click to open ${app.title}`}
        >
            {app.icon}
            <span className="text-white text-xs font-medium drop-shadow-lg break-words">{app.title}</span>
        </div>
    );
};

export default Icon;
