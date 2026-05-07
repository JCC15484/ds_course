import { Link } from 'react-router-dom';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: '电商销售数据分析',
      category: '综合实战',
      difficulty: '进阶',
      description: '对电商平台的销售数据进行全流程分析，包括数据清洗、可视化和销售趋势洞察',
      icon: '🛒',
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: 2,
      title: '学生成绩统计与分析',
      category: '数据分析',
      difficulty: '基础',
      description: '对学生的考试成绩进行统计分析，包括平均分、及格率、各科目对比等',
      icon: '📚',
      color: 'from-green-400 to-green-600'
    },
    {
      id: 3,
      title: '股票数据可视化分析',
      category: '数据可视化',
      difficulty: '进阶',
      description: '对股票历史数据进行可视化分析，包括K线图、成交量分析等',
      icon: '📈',
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: 4,
      title: '用户行为日志分析',
      category: '数据分析',
      difficulty: '基础',
      description: '分析用户行为日志数据，挖掘用户行为模式和兴趣偏好',
      icon: '👥',
      color: 'from-orange-400 to-orange-600'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a365d] dark:text-white mb-2">
          💼 实战项目案例
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          完整数据分析案例，边学边练，快速提升实战能力
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
          >
            <div className={`bg-gradient-to-br ${project.color} p-8 text-white`}>
              <div className="flex justify-between items-start">
                <div className="text-6xl">{project.icon}</div>
                <div className="flex flex-col gap-2">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs">
                    {project.category}
                  </span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs">
                    {project.difficulty}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#1a365d] dark:text-white mb-3">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {project.description}
              </p>
              <div className="flex gap-3">
                <Link
                  to={`/projects/${project.id}`}
                  className="flex-1 px-4 py-2 bg-[#4299e1] hover:bg-[#2c5282] text-white rounded-lg font-medium text-center transition-colors"
                >
                  查看详情
                </Link>
                <button className="px-4 py-2 bg-[#ed8936] hover:bg-[#dd6b20] text-white rounded-lg font-medium transition-colors">
                  在线复刻
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 dark:bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-[#1a365d] dark:text-white mb-4">
          📖 项目学习说明
        </h3>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <li>• 每个项目包含项目背景、分析思路、完整源码</li>
          <li>• 提供示例数据文件，可直接下载使用</li>
          <li>• 支持在线打开代码编辑器，复刻项目代码</li>
          <li>• 可自行修改代码，调试运行学习</li>
        </ul>
      </div>
    </div>
  );
};

export default Projects;
