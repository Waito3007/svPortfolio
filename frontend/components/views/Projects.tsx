
import React from 'react';

const projects = [
  {
    title: 'SHNGear E-commerce Platform',
    description: 'Dự án TMĐT với vai trò Team Leader, phát triển hệ thống backend bằng .NET Core API, xử lý các nghiệp vụ cốt lõi của trang thương mại điện tử.',
    image: 'https://picsum.photos/seed/ecommerce/400/250',
    tags: ['.NET Core', 'API', 'E-commerce', 'Team Leader'],
    status: 'Completed',
  },
  {
    title: 'StayNight Hotel Booking',
    description: 'Web đặt phòng khách sạn với vai trò Leader, thiết kế và phát triển hệ thống RESTful API bằng Node.js cho tìm kiếm, đặt phòng và thanh toán.',
    image: 'https://picsum.photos/seed/hotel/400/250',
    tags: ['Node.js', 'RESTful API', 'Hotel Booking', 'Team Leader'],
    status: 'Completed',
  },
  {
    title: 'KLTN: Ứng Dụng AI Trong Quản Lý Và Phân Công Công Việc',
    description: 'Nghiên cứu và phát triển ứng dụng AI để quản lý công việc. Crawl và xử lý hơn 100k mẫu dữ liệu commit từ GitHub với độ chính xác cao, sử dụng Google Cloud.',
    image: 'https://picsum.photos/seed/ai-project/400/250',
    tags: ['AI/ML', 'Google Cloud', 'GitHub API', 'Data Processing'],
    status: 'In Progress (95% hoàn thành)',
  },
  {
    title: 'Desktop Portfolio OS',
    description: 'Portfolio cá nhân dưới dạng desktop OS trong trình duyệt, được xây dựng hoàn toàn bằng React và TypeScript với giao diện responsive.',
    image: 'https://picsum.photos/seed/portfolio/400/250',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Portfolio'],
    status: 'Current Project',
  },
];

const Projects: React.FC = () => {
  return (
    <div className="p-4 sm:p-6 h-full overflow-y-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">Dự án của tôi</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {projects.map((project, index) => (
          <div key={index} className="bg-white dark:bg-gray-700/50 rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 group border border-gray-200/60 dark:border-white/10">
            <img src={project.image} alt={project.title} className="w-full h-32 sm:h-40 object-cover" />
            <div className="p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1 sm:mb-0">{project.title}</h2>
                <span className={`text-xs px-2 py-1 rounded-full font-medium self-start sm:self-auto ${
                  project.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200' :
                  project.status.includes('Progress') ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200' :
                  'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-200'
                }`}>
                  {project.status}
                </span>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{project.description}</p>
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-1 sm:gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-gray-100 text-xs font-medium rounded-full border border-gray-200/70 dark:border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 sm:mt-8 bg-gradient-to-r from-emerald-50 to-sky-50 dark:from-emerald-900/15 dark:to-sky-900/15 p-4 sm:p-6 rounded-lg border border-emerald-200/70 dark:border-emerald-700/40">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">🚀 Kinh nghiệm Team Leadership</h3>
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
          Với vai trò <strong>Team Leader</strong> trong 2 dự án lớn, tôi đã có kinh nghiệm:
        </p>
        <ul className="mt-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
          <li>Quản lý và phân công công việc cho team</li>
          <li>Thiết kế kiến trúc hệ thống backend</li>
          <li>Code review và đảm bảo chất lượng code</li>
          <li>Giao tiếp với stakeholders và báo cáo tiến độ</li>
        </ul>
      </div>
    </div>
  );
};

export default Projects;
