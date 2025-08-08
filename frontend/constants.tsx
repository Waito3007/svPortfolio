
import React from 'react';
import AboutMe from './components/views/AboutMe';
import Projects from './components/views/Projects';
import Contact from './components/views/Contact';
import { AppType } from './types';

const FolderIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M19.5 21a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-5.25a3 3 0 0 1-2.65-1.5L9.9 3.45A3 3 0 0 0 7.25 2H4.5a3 3 0 0 0-3 3v13.5a3 3 0 0 0 3 3h15Z" />
    </svg>
);

const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
    </svg>
);

const MailIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
    </svg>
);


export const APPS: AppType[] = [
    {
        id: 'about',
        title: 'Về tôi',
        icon: <UserIcon className="w-16 h-16 text-sky-400" />,
        component: AboutMe,
        defaultSize: { width: 600, height: 450 },
    },
    {
        id: 'projects',
        title: 'Dự án',
        icon: <FolderIcon className="w-16 h-16 text-amber-400" />,
        component: Projects,
        defaultSize: { width: 800, height: 600 },
    },
    {
        id: 'contact',
        title: 'Liên hệ',
        icon: <MailIcon className="w-16 h-16 text-teal-400" />,
        component: Contact,
        defaultSize: { width: 500, height: 400 },
    },
];
