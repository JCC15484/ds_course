import { Link } from 'react-router-dom';

const LearningPath = () => {
  const learningPath = [
    {
      stage: 1,
      title: 'Python基础入门',
      icon: '🐍',
      color: 'from-green-400 to-green-600',
      progress: 60,
      courses: [
        { name: 'Python环境搭建', status: 'completed' },
        { name: '变量与数据类型', status: 'completed' },
        { name: '条件判断', status: 'in-progress' },
        { name: '循环结构', status: 'pending' },
        { name: '函数基础', status: 'pending' },
        { name: '列表与字典', status: 'pending' }
      ]
    },
    {
      stage: 2,
      title: 'NumPy数值计算',
      icon: '🔢',
      color: 'from-blue-400 to-blue-600',
      progress: 20,
      courses: [
        { name: 'NumPy数组创建', status: 'completed' },
        { name: '数组索引与切片', status: 'in-progress' },
        { name: '数组运算', status: 'pending' },
        { name: '统计函数', status: 'pending' },
        { name: '矩阵操作', status: 'pending' }
      ]
    },
    {
      stage: 3,
      title: 'Pandas数据处理',
      icon: '📊',
      color: 'from-purple-400 to-purple-600',
      progress: 0,
      courses: [
        { name: 'Series与DataFrame', status: 'pending' },
        { name: '数据选择与筛选', status: 'pending' },
        { name: '数据清洗', status: 'pending' },
        { name: '分组聚合', status: 'pending' },
        { name: '数据合并', status: 'pending' }
      ]
    },
    {
      stage: 4,
      title: '数据可视化',
      icon: '📈',
      color: 'from-pink-400 to-pink-600',
      progress: 0,
      courses: [
        { name: 'Matplotlib基础', status: 'pending' },
        { name: '折线图与柱状图', status: 'pending' },
        { name: '散点图与饼图', status: 'pending' },
        { name: '多图布局', status: 'pending' },
        { name: '图表美化', status: 'pending' }
      ]
    },
    {
      stage: 5,
      title: '数据分析实战',
      icon: '💼',
      color: 'from-indigo-400 to-indigo-600',
      progress: 0,
      courses: [
        { name: '数据读取与存储', status: 'pending' },
        { name: '数据探索性分析', status: 'pending' },
        { name: '特征工程', status: 'pending' },
        { name: '实战项目', status: 'pending' },
        { name: '报告撰写', status: 'pending' }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a365d] dark:text-white mb-2">
          🗺️ 学习路线
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          从零基础到数据分析专家，系统化学习路径
        </p>
      </div>

      {/* 总体进度 */}
      <div className="bg-gradient-to-r from-[#4299e1] to-[#2c5282] rounded-xl p-6 mb-8 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">总体学习进度</h2>
          <span className="text-2xl font-bold">20%</span>
        </div>
        <div className="w-full bg-white/30 rounded-full h-3">
          <div className="bg-white h-3 rounded-full transition-all" style={{ width: '20%' }} />
        </div>
        <p className="mt-2 text-sm opacity-90">已完成 5/25 个知识点</p>
      </div>

      {/* 学习路径 */}
      <div className="space-y-6">
        {learningPath.map((stage) => (
          <div
            key={stage.stage}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            <div className={`bg-gradient-to-r ${stage.color} p-6 text-white`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{stage.icon}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm opacity-75">阶段 {stage.stage}</span>
                      <span className="px-2 py-0.5 bg-white/20 rounded text-xs">
                        {stage.progress}% 完成
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold">{stage.title}</h3>
                  </div>
                </div>
                <Link
                  to="/courses"
                  className="px-4 py-2 bg-white text-gray-800 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  开始学习
                </Link>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stage.courses.map((course, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      course.status === 'completed'
                        ? 'bg-green-500 text-white'
                        : course.status === 'in-progress'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-gray-600 dark:bg-gray-500 dark:text-gray-300'
                    }`}>
                      {course.status === 'completed' ? '✓' : 
                       course.status === 'in-progress' ? '▶' : 
                       index + 1}
                    </div>
                    <span className={`text-sm ${
                      course.status === 'completed'
                        ? 'text-green-700 dark:text-green-300'
                        : course.status === 'in-progress'
                        ? 'text-blue-700 dark:text-blue-300'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {course.name}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all ${
                    stage.color.includes('green') ? 'bg-green-500' :
                    stage.color.includes('blue') ? 'bg-blue-500' :
                    stage.color.includes('purple') ? 'bg-purple-500' :
                    stage.color.includes('pink') ? 'bg-pink-500' :
                    'bg-indigo-500'
                  }`}
                  style={{ width: `${stage.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningPath;
