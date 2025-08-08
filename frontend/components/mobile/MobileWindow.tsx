import React from 'react';
import { motion } from 'framer-motion';
import { WindowInstance } from '../../types';

interface MobileWindowProps {
  instance: WindowInstance;
  onClose: (id: string) => void;
  isActive: boolean;
}

const MobileWindow: React.FC<MobileWindowProps> = ({ instance, onClose, isActive }) => {
  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-white dark:bg-gray-800 z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="scale-50">
            {instance.app.icon}
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {instance.app.title}
          </h2>
        </div>
        <button
          onClick={() => onClose(instance.id)}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <instance.app.component />
      </div>
    </motion.div>
  );
};

export default MobileWindow;
