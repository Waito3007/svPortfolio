
import React from 'react';

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);


const Contact: React.FC = () => {
    return (
        <div className="p-8 h-full flex flex-col justify-center items-center text-gray-800 dark:text-gray-200">
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Get In Touch</h1>
            <div className="space-y-6 w-full max-w-md">
                <div className="flex items-center p-4 bg-white dark:bg-gray-700/50 rounded-lg shadow-sm">
                    <MailIcon />
                    <a href="mailto:johndoe@email.com" className="text-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">johndoe@email.com</a>
                </div>
                 <div className="flex items-center p-4 bg-white dark:bg-gray-700/50 rounded-lg shadow-sm">
                    <PhoneIcon />
                    <span className="text-lg text-gray-700 dark:text-gray-300">(123) 456-7890</span>
                </div>
                 <div className="flex items-center p-4 bg-white dark:bg-gray-700/50 rounded-lg shadow-sm">
                    <LocationIcon />
                    <span className="text-lg text-gray-700 dark:text-gray-300">San Francisco, CA</span>
                </div>
            </div>
             <p className="mt-10 text-center text-gray-500 dark:text-gray-400">
                I'm currently open to new opportunities. <br/> Feel free to reach out!
            </p>
        </div>
    );
};

export default Contact;
