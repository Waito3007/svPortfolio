
import React from 'react';

const projects = [
  {
    title: 'AI-Powered Data Visualizer',
    description: 'A platform that uses Gemini API to generate insightful charts and graphs from user-provided data sets.',
    image: 'https://picsum.photos/seed/project1/400/250',
    tags: ['React', 'Gemini API', 'D3.js', 'Tailwind CSS'],
  },
  {
    title: 'Interactive E-commerce Store',
    description: 'A modern e-commerce website with a focus on seamless user experience and beautiful product presentation.',
    image: 'https://picsum.photos/seed/project2/400/250',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'GraphQL'],
  },
  {
    title: 'Desktop OS in Browser',
    description: 'This very portfolio! An interactive desktop experience built entirely with React and web technologies.',
    image: 'https://picsum.photos/seed/project3/400/250',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: 'Real-time Chat Application',
    description: 'A scalable chat app built with WebSockets for instant communication and a rich user interface.',
    image: 'https://picsum.photos/seed/project4/400/250',
    tags: ['React', 'Node.js', 'Socket.IO', 'MongoDB'],
  },
];

const Projects: React.FC = () => {
  return (
    <div className="p-6 h-full overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-white dark:bg-gray-700/50 rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 group">
            <img src={project.image} alt={project.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{project.title}</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{project.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 text-xs font-medium rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
