import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { projects } from '../data/projects';

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const banners = [
    {
      title: '零基础入门，轻松学习Python数据分析',
      description: '专为初学者设计，从零开始掌握数据分析技能',
      icon: '🎯'
    },
    {
      title: '在线编程，无需安装任何软件',
      description: '浏览器即可运行Python代码，打开就能学',
      icon: '💻'
    },
    {
      title: '学练结合，边学边实操',
      description: '理论知识与实践相结合，快速提升技能',
      icon: '🚀'
    }
  ];

  const [showDemoOutput, setShowDemoOutput] = useState(false);

  const learningPath = [
    { name: 'Python基础', icon: '🐍', progress: 0, color: 'from-green-400 to-green-600', detail: '20+ 知识点，50+ 选择题，10+ 实操题' },
    { name: 'NumPy数值计算', icon: '🔢', progress: 0, color: 'from-blue-400 to-blue-600', detail: '15+ 知识点，30+ 选择题，5+ 实操题' },
    { name: 'Pandas数据处理', icon: '📊', progress: 0, color: 'from-purple-400 to-purple-600', detail: '25+ 知识点，40+ 选择题，8+ 实操题' },
    { name: '数据清洗整理', icon: '🧹', progress: 0, color: 'from-orange-400 to-orange-600', detail: '12+ 知识点，25+ 选择题，6+ 实操题' },
    { name: 'Matplotlib可视化', icon: '📈', progress: 0, color: 'from-pink-400 to-pink-600', detail: '18+ 知识点，30+ 选择题，7+ 实操题' },
    { name: '数据分析实战', icon: '💼', progress: 0, color: 'from-indigo-400 to-indigo-600', detail: '6 个完整实战项目，综合训练' }
  ];

  const popularCourses = [
    { id: 1, title: 'Python基础语法入门', lessons: 20, students: 1523 },
    { id: 2, title: 'NumPy数组操作详解', lessons: 15, students: 986 },
    { id: 3, title: 'Pandas数据处理基础', lessons: 25, students: 1342 },
    { id: 4, title: '数据可视化快速上手', lessons: 18, students: 876 }
  ];

  const dailyPractice = [
    { id: 1, title: 'Python基础选择题', type: '选择题', difficulty: '入门' },
    { id: 2, title: '列表操作实操题', type: '代码题', difficulty: '基础' },
    { id: 3, title: 'NumPy数组练习', type: '代码题', difficulty: '基础' }
  ];

  const features = [
    {
      icon: '📚',
      title: '在线听课',
      description: '章节化课程内容，知识点详细讲解'
    },
    {
      icon: '✅',
      title: '选择题刷题',
      description: '自动批改，实时查看正确答案和解析'
    },
    {
      icon: '💻',
      title: 'Python在线实操',
      description: '浏览器内直接运行代码，无需配置环境'
    },
    {
      icon: '🤖',
      title: '自动判题',
      description: '选择题和实操题自动评分，无需人工干预'
    },
    {
      icon: '📝',
      title: '错题本',
      description: '自动记录错题，方便复习巩固'
    },
    {
      icon: '💾',
      title: '学习进度保存',
      description: '登录账号自动同步，换设备也能继续学习'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 英雄区 - 轮播Banner */}
      <section className="relative bg-gradient-to-r from-[#1a365d] to-[#2c5282] text-white overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {banners[currentSlide].title}
              </h1>
              <p className="text-lg md:text-xl text-blue-100">
                {banners[currentSlide].description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/courses"
                  className="px-8 py-4 bg-[#ed8936] hover:bg-[#dd6b20] rounded-lg font-semibold text-center transition-colors shadow-lg"
                >
                  开始学习
                </Link>
                <Link
                  to="/practice"
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 border-2 border-white/30 rounded-lg font-semibold text-center transition-colors"
                >
                  立即练习
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="text-9xl animate-bounce">
                {banners[currentSlide].icon}
              </div>
            </div>
          </div>
          
          {/* 轮播指示器 */}
          <div className="flex justify-center gap-2 mt-8">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-50 to-transparent dark:from-gray-900"></div>
      </section>

      {/* 学习路线导航 */}
      <section className="py-16 bg-white dark:bg-gray-800 border-b-4 border-[#4299e1]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#1a365d] dark:text-white mb-4">
            📚 学习路线
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            从Python基础到数据分析实战，系统化的学习路径
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {learningPath.map((step, index) => (
              <div
                key={index}
                onClick={() => navigate(`/practice/${index + 1}`)}
                className="group relative cursor-pointer"
              >
                <div className={`bg-gradient-to-br ${step.color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                  <div className="text-4xl mb-3">{step.icon}</div>
                  <div className="font-semibold text-sm">{step.name}</div>
                  <div className="text-xs opacity-75 mt-1">点击进入练习 →</div>
                </div>
                <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2 px-2">
                  {step.detail}
                </div>
                {index < learningPath.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-gray-400">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 热门课程入口 */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#1a365d] dark:text-white mb-4">
            🔥 热门课程
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            新手入门必学章节，快速掌握核心技能
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCourses.map((course) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <div className="h-32 bg-gradient-to-br from-[#4299e1] to-[#2c5282] flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-110 transition-transform">📖</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#1a365d] dark:text-white mb-2">{course.title}</h3>
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>📚 {course.lessons}节</span>
                    <span>👥 {course.students}人学习</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link
              to="/courses"
              className="inline-block px-8 py-3 bg-[#4299e1] hover:bg-[#2c5282] text-white rounded-lg font-semibold transition-colors"
            >
              查看全部课程 →
            </Link>
          </div>
        </div>
      </section>

      {/* 题库练习入口 */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#1a365d] dark:text-white mb-4">
            📝 每日练习
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            精选练习题目，巩固所学知识
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {dailyPractice.map((practice) => (
              <Link
                key={practice.id}
                to={`/practice/${practice.id}`}
                className="bg-gradient-to-br from-[#ed8936] to-[#dd6b20] rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-4xl">✍️</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    practice.difficulty === '入门' ? 'bg-green-500' :
                    practice.difficulty === '基础' ? 'bg-blue-500' : 'bg-purple-500'
                  }`}>
                    {practice.difficulty}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2">{practice.title}</h3>
                <p className="text-sm opacity-90">{practice.type}</p>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link
              to="/practice"
              className="inline-block px-8 py-3 bg-[#ed8936] hover:bg-[#dd6b20] text-white rounded-lg font-semibold transition-colors"
            >
              进入题库 →
            </Link>
          </div>
        </div>
      </section>

      {/* 实战项目案例 */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#1a365d] dark:text-white mb-4">
            💼 实战项目案例
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            从入门到进阶，完整的 Pandas 数据分析实战项目，含分步骤教学和在线代码编辑器
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {projects.slice(0, 6).map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                <div className={`bg-gradient-to-br ${project.color} p-5 text-white`}>
                  <div className="flex justify-between items-start">
                    <div className="text-4xl">{project.icon}</div>
                    <div className="flex flex-col gap-2 items-end">
                      <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                        {project.difficulty}
                      </span>
                      <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                        {project.duration}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-[#1a365d] dark:text-white mb-2 text-base">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {project.steps.length} 个步骤
                    </span>
                    <span className="text-xs text-[#4299e1] font-medium">开始学习 →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/projects"
              className="inline-block px-8 py-3 bg-[#4299e1] hover:bg-[#2c5282] text-white rounded-lg font-semibold transition-colors"
            >
              查看全部 {projects.length} 个项目 →
            </Link>
          </div>
        </div>
      </section>

      {/* 平台功能介绍 */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#1a365d] dark:text-white mb-4">
            ✨ 平台功能
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            专为数据分析学习打造的功能平台
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-lg text-[#1a365d] dark:text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 修改 1：在线体验示例区域 */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#1a365d] dark:text-white mb-4">
            ✨ 即刻体验：浏览器内运行 Python
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            无需安装任何软件，真实在线编程环境即将开放。点击下方按钮预览效果。
          </p>

          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            {/* 代码区域 */}
            <div className="bg-gray-900 rounded-lg p-4 mb-4 font-mono text-sm">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span className="ml-2 text-gray-400 text-xs">demo.py</span>
              </div>
              <div className="text-gray-300">
                <span className="text-purple-400">print</span>
                <span className="text-gray-200">(</span>
                <span className="text-green-300">"Hello, 数据分析!"</span>
                <span className="text-gray-200">)</span>
              </div>
            </div>

            {/* 运行按钮 */}
            <div className="text-center mb-4">
              <button
                onClick={() => setShowDemoOutput(true)}
                title="即将开放"
                className="px-6 py-3 bg-[#4299e1] hover:bg-[#2c5282] text-white rounded-lg font-semibold transition-colors shadow-md"
                style={{ cursor: 'pointer' }}
              >
                ▶ 点击运行示例
              </button>
            </div>

            {/* 输出区域 */}
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 border-l-4 border-[#4299e1]">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-semibold">
                [输出结果]
              </div>
              <div className="font-mono text-sm text-[#1a365d] dark:text-white">
                {showDemoOutput ? 'Hello, 数据分析!' : '（点击"运行示例"按钮预览输出）'}
              </div>
            </div>

            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
              💡 这是演示效果，进入平台后可体验真实的在线代码编辑器
            </p>
          </div>

          {/* 课程统计卡片 */}
          <div className="max-w-3xl mx-auto mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-center text-[#1a365d] dark:text-white mb-6">
              📊 课程统计
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4">
                <div className="text-3xl font-bold text-[#4299e1]">200+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">练习题</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-[#ed8936]">6</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">实战项目</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-[#48bb78]">120+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">知识点</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-[#9f7aea]">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">学时</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 修改 2：学习社区与答疑 */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#1a365d] to-[#2c5282] rounded-xl p-8 shadow-lg text-white">
            <h2 className="text-2xl font-bold text-center mb-4">
              💬 学习交流与答疑
            </h2>
            <p className="text-center text-blue-100 mb-6">
              学习中遇到困惑？欢迎加入我们的学习社区（筹备中）。届时你将获得：
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
                <div className="text-3xl mb-2">❓</div>
                <div className="font-semibold text-sm">答疑解惑</div>
                <div className="text-xs text-blue-200 mt-1">遇到问题及时解答</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
                <div className="text-3xl mb-2">💡</div>
                <div className="font-semibold text-sm">项目讨论</div>
                <div className="text-xs text-blue-200 mt-1">交流实战经验</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center backdrop-blur-sm">
                <div className="text-3xl mb-2">🤝</div>
                <div className="font-semibold text-sm">学习伙伴</div>
                <div className="text-xs text-blue-200 mt-1">结识志同道合的朋友</div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => alert('功能即将开放，请关注后续更新')}
                title="即将开放"
                className="px-8 py-3 bg-[#ed8936] hover:bg-[#dd6b20] text-white rounded-lg font-semibold transition-colors shadow-md"
                style={{ cursor: 'pointer' }}
              >
                📢 开放时通知我
              </button>
              <div className="mt-3 text-xs text-blue-200">
                或发送邮件至：<a href="mailto:contact@pydata-edu.com" className="underline hover:text-[#ed8936]">contact@pydata-edu.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
