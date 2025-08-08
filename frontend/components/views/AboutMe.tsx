
import React, { useState, useRef, useEffect } from 'react';

const contextMenuItems: { label: string; action: () => void }[] = [
  { label: 'Giới thiệu', action: () => { window.location.hash = '#about'; } },
  { label: 'Dự án', action: () => { window.location.hash = '#projects'; } },
  { label: 'Liên hệ', action: () => { window.location.hash = '#contact'; } },
];

const AboutMe: React.FC = () => {
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
    e.preventDefault();
    setMenu({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="p-4 sm:p-6 h-full overflow-y-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
      onContextMenu={handleContextMenu}
      style={{ position: 'relative' }}
    >
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <img
          src="https://avatars.githubusercontent.com/u/80162938?s=120&v=4"
          alt="Profile"
          className="w-24 h-24 sm:w-30 sm:h-30 rounded-full object-cover border-4 border-emerald-500 dark:border-emerald-700 shadow-lg"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-700 dark:text-emerald-300">Vũ Phan Hoài Sang</h1>
          <p className="text-base sm:text-lg text-gray-900 dark:text-gray-100">Sinh viên năm cuối </p>
          <p className="text-sm sm:text-base text-sky-700 dark:text-sky-300 font-semibold">BackEnd Developer</p>
        </div>
      </div>
      <div className="mt-6 sm:mt-8 space-y-4 text-sm sm:text-base">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-violet-700 dark:text-violet-300">Kỹ năng công nghệ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <h3 className="font-medium text-emerald-700 dark:text-emerald-300 mb-1">Backend</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-900 dark:text-gray-100 text-sm">
                <li>.NET Core API</li>
                <li>Node.js & Express</li>
                <li>RESTful API Design</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-sky-700 dark:text-sky-300 mb-1">Frontend</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-900 dark:text-gray-100 text-sm">
                <li>React & TypeScript</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-violet-700 dark:text-violet-300 mb-1">Database</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-900 dark:text-gray-100 text-sm">
                <li>SQL Server</li>
                <li>MongoDB</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-amber-700 dark:text-amber-300 mb-1">Tools & Cloud</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-900 dark:text-gray-100 text-sm">
                <li>Google Cloud Platform</li>
                <li>Git & GitHub</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Context menu */}
      {menu && (
        <div
          ref={menuRef}
          className="fixed z-50 bg-white dark:bg-gray-800 border border-emerald-300 dark:border-emerald-700 rounded shadow-lg"
          style={{ top: menu.y, left: menu.x, minWidth: 160 }}
        >
          {contextMenuItems.map((item, idx) => (
            <button
              key={idx}
              className="block w-full text-left px-4 py-2 hover:bg-emerald-100 dark:hover:bg-emerald-900 text-gray-900 dark:text-white"
              onClick={() => {
                item.action();
                setMenu(null);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AboutMe;