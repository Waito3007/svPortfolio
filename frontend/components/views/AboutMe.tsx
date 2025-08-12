
import React, { useState, useRef, useEffect } from 'react';
import {
  SiDotnet,
  SiNodedotjs,
  SiExpress,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiGooglecloud,
  SiGit
} from 'react-icons/si';
import { RiDatabase2Fill } from 'react-icons/ri';
import { MdApi } from 'react-icons/md';

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
      className="p-4 sm:p-6 h-full overflow-y-auto bg-gray-900 text-white"
      onContextMenu={handleContextMenu}
      style={{ position: 'relative' }}
    >
      {/* Profile card */}
      <section className="bg-gray-800 border border-gray-700 rounded-xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <img
            src="https://avatars.githubusercontent.com/u/80162938?s=240&v=4"
            alt="Profile"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover ring-4 ring-gray-700"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold">Vũ Phan Hoài Sang</h1>
            <p className="mt-1 text-sm sm:text-base text-gray-300">Sinh viên năm cuối • Backend Developer</p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
              <span className="px-3 py-1 text-xs rounded-full bg-gray-700 border border-gray-600">Backend</span>
              <span className="px-3 py-1 text-xs rounded-full bg-gray-700 border border-gray-600">API Design</span>
              <span className="px-3 py-1 text-xs rounded-full bg-gray-700 border border-gray-600">Database</span>
            </div>
          </div>
        </div>
      </section>

      {/* Skills grid */}
      <section className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Backend */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-3 text-gray-100">Backend</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 bg-gray-900/40 border border-gray-700 rounded-lg px-3 py-2">
              <SiDotnet color="#512BD4" size={20} />
              <span className="text-sm text-gray-200">.NET Core</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-900/40 border border-gray-700 rounded-lg px-3 py-2">
              <SiNodedotjs color="#5FA04E" size={20} />
              <span className="text-sm text-gray-200">Node.js</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-900/40 border border-gray-700 rounded-lg px-3 py-2">
              <SiExpress color="#9CA3AF" size={20} />
              <span className="text-sm text-gray-200">Express</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-900/40 border border-gray-700 rounded-lg px-3 py-2">
              <MdApi color="#9CA3AF" size={20} />
              <span className="text-sm text-gray-200">RESTful API</span>
            </div>
          </div>
        </div>

        {/* Frontend */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-3 text-gray-100">Frontend</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 bg-gray-900/40 border border-gray-700 rounded-lg px-3 py-2">
              <SiReact color="#61DAFB" size={20} />
              <span className="text-sm text-gray-200">React</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-900/40 border border-gray-700 rounded-lg px-3 py-2">
              <SiTypescript color="#3178C6" size={20} />
              <span className="text-sm text-gray-200">TypeScript</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-900/40 border border-gray-700 rounded-lg px-3 py-2">
              <SiTailwindcss color="#38BDF8" size={20} />
              <span className="text-sm text-gray-200">Tailwind</span>
            </div>
          </div>
        </div>

        {/* Database */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-3 text-gray-100">Database</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 bg-gray-900/40 border border-gray-700 rounded-lg px-3 py-2">
              <RiDatabase2Fill color="#CC2927" size={20} />
              <span className="text-sm text-gray-200">SQL Server</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-900/40 border border-gray-700 rounded-lg px-3 py-2">
              <SiMongodb color="#47A248" size={20} />
              <span className="text-sm text-gray-200">MongoDB</span>
            </div>
          </div>
        </div>

        {/* Tools & Cloud */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold mb-3 text-gray-100">Tools & Cloud</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 bg-gray-900/40 border border-gray-700 rounded-lg px-3 py-2">
              <SiGooglecloud color="#4285F4" size={20} />
              <span className="text-sm text-gray-200">Google Cloud</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-900/40 border border-gray-700 rounded-lg px-3 py-2">
              <SiGit color="#F05032" size={20} />
              <span className="text-sm text-gray-200">Git & GitHub</span>
            </div>
          </div>
        </div>
      </section>
      {/* Context menu */}
      {menu && (
        <div
          ref={menuRef}
          className="fixed z-50 bg-gray-800 border border-gray-600 rounded shadow-lg"
          style={{ top: menu.y, left: menu.x, minWidth: 160 }}
        >
          {contextMenuItems.map((item, idx) => (
            <button
              key={idx}
              className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-white"
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