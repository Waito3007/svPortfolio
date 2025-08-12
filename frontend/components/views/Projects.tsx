
import React from 'react';
import {
  SiDotnet,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiPython,
  SiPytorch,
  SiGooglecloud,
  SiGithub,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiVite
} from 'react-icons/si';
import { RiDatabase2Fill } from 'react-icons/ri';

const projects = [
  {
    title: 'SHNGear E-commerce Platform',
    description: 'Hệ thống thương mại điện tử đầy đủ với quản lý sản phẩm, giỏ hàng, thanh toán và đơn hàng. Hỗ trợ đa người dùng với phân quyền admin và khách hàng.',
    image: 'https://picsum.photos/seed/ecommerce/400/250',
    tags: ['.NET Core', 'API', 'E-commerce'],
  technologies: ['dotnet', 'csharp', 'microsoftsqlserver', 'javascript', 'html5', 'css3'],
    status: 'Completed',
  },
  {
    title: 'StayNight Hotel Booking',
    description: 'Ứng dụng đặt phòng khách sạn với tính năng tìm kiếm theo tiêu chí, xem chi tiết phòng, đặt phòng trực tuyến và quản lý booking. Tích hợp thanh toán online.',
    image: 'https://picsum.photos/seed/hotel/400/250',
    tags: ['Node.js', 'RESTful API', 'Hotel Booking'],
  technologies: ['nodedotjs', 'javascript', 'mongodb', 'express', 'html5', 'css3'],
    status: 'Completed',
  },
  {
    title: 'KLTN: Ứng Dụng AI Trong Quản Lý Và Phân Công Công Việc',
    description: 'Hệ thống AI thông minh phân tích pattern làm việc từ dữ liệu Git commits để đề xuất phân công task phù hợp với từng developer. Xử lý hơn 100k mẫu dữ liệu với độ chính xác cao.',
    image: 'https://picsum.photos/seed/ai-project/400/250',
    tags: ['AI/ML', 'Google Cloud', 'GitHub API', 'Python', 'Pytorch', 'Data Processing'],
  technologies: ['python', 'pytorch', 'googlecloud', 'github'],
    status: 'In Progress (95% hoàn thành)',
  },
  {
    title: 'Desktop Portfolio OS',
    description: 'Portfolio tương tác mô phỏng hệ điều hành desktop trong browser với window management, taskbar, context menu và responsive design. Trải nghiệm người dùng như desktop thật.',
    image: 'https://picsum.photos/seed/portfolio/400/250',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Portfolio'],
  technologies: ['react', 'typescript', 'tailwindcss', 'vite', 'html5', 'css3'],
    status: 'Current Project',
  },
];

const Projects: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    dotnet: <SiDotnet color="#512BD4" size={18} />,
    csharp: <SiDotnet color="#239120" size={18} />,
    microsoftsqlserver: <RiDatabase2Fill color="#CC2927" size={18} />,
    javascript: <SiJavascript color="#F7DF1E" size={18} />,
    html5: <SiHtml5 color="#E34F26" size={18} />,
    css3: <SiCss3 color="#1572B6" size={18} />,
    nodedotjs: <SiNodedotjs color="#5FA04E" size={18} />,
    mongodb: <SiMongodb color="#47A248" size={18} />,
    express: <SiExpress color="#9CA3AF" size={18} />,
    python: <SiPython color="#3776AB" size={18} />,
    pytorch: <SiPytorch color="#EE4C2C" size={18} />,
    googlecloud: <SiGooglecloud color="#4285F4" size={18} />,
  github: <SiGithub color="#FFFFFF" size={18} />,
    react: <SiReact color="#61DAFB" size={18} />,
    typescript: <SiTypescript color="#3178C6" size={18} />,
    tailwindcss: <SiTailwindcss color="#38BDF8" size={18} />,
    vite: <SiVite color="#646CFF" size={18} />
  };

  return (
    <div className="p-4 sm:p-6 h-full overflow-y-auto bg-gray-900 text-white">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-200">Dự án của tôi</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-gray-800 rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 group border border-gray-700">
            <img src={project.image} alt={project.title} className="w-full h-32 sm:h-40 object-cover" />
            <div className="p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h2 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-0">{project.title}</h2>
                <span className={`text-xs px-2 py-1 rounded-full font-medium self-start sm:self-auto ${
                  project.status === 'Completed' ? 'bg-gray-700 text-gray-300' :
                  project.status.includes('Progress') ? 'bg-gray-700 text-gray-300' :
                  'bg-gray-700 text-gray-300'
                }`}>
                  {project.status}
                </span>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-gray-400 leading-relaxed">{project.description}</p>
              {/* Technology Icons */}
              <div className="mt-3 flex flex-wrap gap-3 items-center">
                {project.technologies?.map((tech) => (
                  <span key={tech} title={tech} className="inline-flex items-center">
                    {iconMap[tech] ?? null}
                  </span>
                ))}
              </div>
              
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-1 sm:gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs font-medium rounded-full border border-gray-600">
                    {tag}
                  </span>
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
