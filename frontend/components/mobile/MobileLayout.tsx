import React, { useState } from 'react';
import { APPS } from '../../constants';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileLayoutProps {
  onOpenApp: (appId: string) => void;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ onOpenApp }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
  <div className="w-full h-full bg-gradient-to-b from-[#0d1117] to-[#121826] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <img
            src="https://avatars.githubusercontent.com/u/80162938?s=40&v=4"
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-emerald-400"
          />
          <div>
            <h1 className="text-white font-semibold text-lg">Vũ Phan Hoài Sang</h1>
            <p className="text-emerald-400 text-xs">Sinh viên năm cuối</p>
          </div>
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 right-0 bg-black/85 backdrop-blur-md z-50 p-4"
          >
            <div className="grid grid-cols-3 gap-4">
              {APPS.map((app) => (
                <motion.button
                  key={app.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: APPS.indexOf(app) * 0.1 }}
                  onClick={() => {
                    onOpenApp(app.id);
                    setIsMenuOpen(false);
                  }}
                  className="flex flex-col items-center p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/15 transition-colors"
                >
                  <div className="mb-2 scale-75">
                    {app.icon}
                  </div>
                  <span className="text-white text-sm font-medium">{app.title}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 p-4 overflow-hidden">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <img
              src="https://avatars.githubusercontent.com/u/80162938?s=120&v=4"
              alt="Profile"
              className="w-24 h-24 mx-auto rounded-full border-4 border-emerald-400 shadow-lg"
            />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl font-bold text-white mb-2"
          >
            Vũ Phan Hoài Sang
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-emerald-400 mb-1"
          >
            Fullstack Developer
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-gray-300 text-sm"
          >
            Sinh viên năm cuối • Tìm cơ hội thực tập
          </motion.p>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 gap-4 mb-8"
        >
          {APPS.map((app, index) => (
            <motion.button
              key={app.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              onClick={() => onOpenApp(app.id)}
              className="flex items-center p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/15 transition-colors"
            >
              <div className="mr-4 scale-75">
                {app.icon}
              </div>
              <div className="text-left">
                <h3 className="text-white font-medium">{app.title}</h3>
                <p className="text-gray-400 text-sm">
                  {app.id === 'about' && 'Tìm hiểu về tôi và kỹ năng'}
                  {app.id === 'projects' && 'Xem các dự án đã thực hiện'}
                  {app.id === 'contact' && 'Thông tin liên hệ'}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="bg-gradient-to-r from-emerald-400/15 to-sky-400/15 border border-emerald-400/30 rounded-lg p-4 text-center"
        >
          <div className="flex items-center justify-center mb-2">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse mr-2"></div>
            <span className="text-emerald-400 font-medium">Sẵn sàng làm việc</span>
          </div>
          <p className="text-gray-300 text-sm">
            Đang tìm kiếm cơ hội thực tập trong lĩnh vực phát triển phần mềm
          </p>
        </motion.div>
      </div>

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 10,
            }}
            animate={{
              y: -10,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileLayout;
