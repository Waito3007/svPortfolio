import React from 'react';
import { AppType } from '../../types';
import { motion } from 'framer-motion';

interface IconProps {
    app: AppType;
    onOpen: (id: string) => void;
}

const Icon: React.FC<IconProps> = ({ app, onOpen }) => {
    return (
        <motion.div
            className="flex flex-col items-center justify-center text-center space-y-2 p-2 rounded-lg hover:bg-cyan-400/10 transition-colors duration-200 cursor-pointer w-24"
            onDoubleClick={() => onOpen(app.id)}
            title={`Double-click to open ${app.title}`}
            whileHover={{ scale: 1.1, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
            <motion.div whileTap={{ scale: 0.9 }}>
                {app.icon}
            </motion.div>
            <span 
                className="text-white text-xs font-medium break-words"
                style={{ textShadow: '0 1px 3px rgba(0, 255, 255, 0.5)' }}
            >
                {app.title}
            </span>
        </motion.div>
    );
};

export default Icon;