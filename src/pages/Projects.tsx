import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

const Projects = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a365d] dark:text-white mb-2">
          💼 实战项目案例
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          完整数据分析案例，边学边练，快速提升实战能力（共 {projects.length} 个项目）
        </p>
      </div>

      {/* 项目卡片列表 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className={`bg-gradient-to-br ${project.color} p-6 text-white`}>
              <div className="flex justify-between items-start">
                <div className="text-5xl">{project.icon}</div>
                <div className="flex flex-col gap-2 items-end">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                    {project.difficulty}
                  </span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                    {project.duration}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-[#1a365d] dark:text-white mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1 mb-4">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="px-2 py-1 text-gray-500 dark:text-gray-400 text-xs">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {project.steps.length} 个学习步骤
                </span>
                <span className="px-4 py-2 bg-[#4299e1] text-white rounded-lg text-sm font-medium hover:bg-[#2c5282] transition-colors">
                  开始学习 →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 项目学习说明 */}
      <div className="mt-12 bg-blue-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-[#1a365d] dark:text-white mb-4">
          📖 项目学习说明
        </h3>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <li>• 每个项目包含项目背景、学习目标、分步骤教学</li>
          <li>• 每个步骤都有预置代码和说明，点击运行即可看到结果</li>
          <li>• 支持在浏览器中直接修改和运行代码，无需安装环境</li>
          <li>• 提供参考答案，便于对比学习</li>
          <li>• 从入门到进阶，循序渐进掌握 Pandas 数据分析</li>
        </ul>
      </div>
    </div>
  );
};

export default Projects;
