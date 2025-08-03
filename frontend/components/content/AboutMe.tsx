
import React from 'react';

const AboutMe: React.FC = () => {
  return (
    <div className="p-6 h-full overflow-y-auto text-gray-800 dark:text-gray-200">
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <img
          src="https://picsum.photos/seed/avatar/120/120"
          alt="Profile"
          className="w-30 h-30 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center sm:text-left">John Doe</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center sm:text-left">Senior Frontend React Engineer</p>
        </div>
      </div>
      <div className="mt-8 space-y-4 text-sm sm:text-base">
        <p>
          World-class senior frontend React engineer with deep expertise in Gemini API and UI/UX design. Passionate about building beautiful, functional, and user-friendly web applications.
        </p>
        <p>
          I thrive on turning complex problems into elegant solutions, leveraging modern technologies and best practices to deliver high-quality products. My experience spans across various domains, always with a focus on performance, scalability, and maintainability.
        </p>
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Core Skills</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            <li>React 18+ & TypeScript</li>
            <li>Tailwind CSS & UI/UX Design</li>
            <li>State Management (Redux, Zustand, Context API)</li>
            <li>API Integration (REST, GraphQL, Gemini API)</li>
            <li>Performance Optimization & Web Vitals</li>
            <li>Agile Methodologies & Team Collaboration</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
