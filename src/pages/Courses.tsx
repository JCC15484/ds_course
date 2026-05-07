import { useState } from 'react';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: '全部课程' },
    { id: 'python-basic', name: 'Python基础' },
    { id: 'numpy', name: 'NumPy数值计算' },
    { id: 'pandas', name: 'Pandas数据处理' },
    { id: 'cleaning', name: '数据清洗' },
    { id: 'visualization', name: '数据可视化' }
  ];

  const courses = [
    {
      id: 1,
      title: 'Python基础语法入门',
      category: 'python-basic',
      difficulty: '入门',
      lessons: 20,
      students: 1523,
      description: '学习Python基本语法、变量、数据类型、控制流程等核心概念',
      progress: 30,
      image: '🐍'
    },
    {
      id: 2,
      title: '列表、元组与字典',
      category: 'python-basic',
      difficulty: '基础',
      lessons: 15,
      students: 986,
      description: '掌握Python常用数据容器的使用方法',
      progress: 0,
      image: '📦'
    },
    {
      id: 3,
      title: 'NumPy数组操作详解',
      category: 'numpy',
      difficulty: '基础',
      lessons: 25,
      students: 1342,
      description: '学习NumPy数组的创建、索引、切片、运算等操作',
      progress: 0,
      image: '🔢'
    },
    {
      id: 4,
      title: 'Pandas数据处理基础',
      category: 'pandas',
      difficulty: '基础',
      lessons: 30,
      students: 1689,
      description: '掌握Series和DataFrame的创建、索引、选择等操作',
      progress: 0,
      image: '📊'
    },
    {
      id: 5,
      title: '数据读取与存储',
      category: 'pandas',
      difficulty: '基础',
      lessons: 18,
      students: 876,
      description: '学习使用Pandas读取CSV、Excel、JSON等格式文件',
      progress: 0,
      image: '💾'
    },
    {
      id: 6,
      title: '数据清洗与预处理',
      category: 'cleaning',
      difficulty: '进阶',
      lessons: 22,
      students: 745,
      description: '处理缺失值、重复值、异常值等数据质量问题',
      progress: 0,
      image: '🧹'
    },
    {
      id: 7,
      title: 'Matplotlib数据可视化',
      category: 'visualization',
      difficulty: '基础',
      lessons: 20,
      students: 1123,
      description: '学习绘制折线图、柱状图、散点图等常用图表',
      progress: 0,
      image: '📈'
    },
    {
      id: 8,
      title: '数据分组与聚合',
      category: 'pandas',
      difficulty: '进阶',
      lessons: 16,
      students: 654,
      description: '掌握groupby、聚合函数、数据透视表等操作',
      progress: 0,
      image: '📊'
    }
  ];

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a365d] dark:text-white mb-2">
          📚 课程学习
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          系统化学习Python数据分析，从基础到实战
        </p>
      </div>

      {/* 分类筛选 */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedCategory === category.id
                ? 'bg-[#4299e1] text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* 课程列表 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Link
            key={course.id}
            to={`/courses/${course.id}`}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all group"
          >
            <div className="h-40 bg-gradient-to-br from-[#4299e1] to-[#2c5282] flex items-center justify-center relative">
              <span className="text-7xl group-hover:scale-110 transition-transform">
                {course.image}
              </span>
              {course.progress > 0 && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-4 py-2">
                  <div className="flex justify-between text-xs text-white mb-1">
                    <span>学习进度</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-white/30 rounded-full h-2">
                    <div 
                      className="bg-[#ed8936] h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="p-5">
              <div className="flex gap-2 mb-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  course.difficulty === '入门' ? 'bg-green-100 text-green-800' :
                  course.difficulty === '基础' ? 'bg-blue-100 text-blue-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {course.difficulty}
                </span>
              </div>
              <h3 className="font-bold text-lg text-[#1a365d] dark:text-white mb-2">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {course.description}
              </p>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>📚 {course.lessons}节</span>
                <span>👥 {course.students}人学习</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">该分类下暂无课程</p>
        </div>
      )}
    </div>
  );
};

export default Courses;
