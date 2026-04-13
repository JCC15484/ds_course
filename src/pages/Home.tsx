import { Link } from 'react-router-dom';

const Home = () => {
  // 模拟课程数据
  const courses = [
    {
      id: '1',
      title: 'Python数据分析基础',
      description: '掌握Python数据分析的核心概念和基础库',
      level: 'beginner',
      rating: 4.8,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Python%20data%20analysis%20course%20cover%20with%20pandas%20and%20numpy%20visualization&image_size=landscape_16_9'
    },
    {
      id: '2',
      title: '商务数据可视化',
      description: '使用Matplotlib和Seaborn创建专业的数据可视化',
      level: 'intermediate',
      rating: 4.6,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Business%20data%20visualization%20course%20cover%20with%20charts%20and%20graphs&image_size=landscape_16_9'
    },
    {
      id: '3',
      title: '机器学习实战',
      description: '从理论到实践，掌握机器学习算法的应用',
      level: 'advanced',
      rating: 4.9,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Machine%20learning%20course%20cover%20with%20AI%20concepts%20and%20data%20models&image_size=landscape_16_9'
    }
  ];

  // 学习路径数据
  const learningPaths = [
    {
      id: '1',
      title: '数据分析师入门',
      description: '适合零基础学员，从Python基础到数据分析实战',
      courses: 4,
      duration: '3个月',
      icon: '📊'
    },
    {
      id: '2',
      title: '商务数据分析师',
      description: '针对商务场景的数据分析技能，包括市场分析、财务分析',
      courses: 5,
      duration: '4个月',
      icon: '💼'
    },
    {
      id: '3',
      title: '机器学习工程师',
      description: '深入学习机器学习算法和模型部署',
      courses: 6,
      duration: '6个月',
      icon: '🤖'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* 英雄区 */}
      <section className="relative bg-gradient-to-r from-[#1a365d] to-[#2a4a6d] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              掌握数据分析技能，开启数据驱动未来
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              为商务数据分析与应用专业学生打造的系统化学习平台，从基础到高级，全方位提升数据分析能力。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/courses" 
                className="px-8 py-3 bg-[#ed8936] rounded-md hover:bg-[#d69e4f] transition-colors text-center font-medium"
              >
                浏览课程
              </Link>
              <Link 
                to="/register" 
                className="px-8 py-3 border border-white rounded-md hover:bg-white hover:text-[#1a365d] transition-colors text-center font-medium"
              >
                免费注册
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* 课程推荐 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1a365d] mb-4">推荐课程</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              精心挑选的优质课程，帮助你快速掌握数据分析技能
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${course.level === 'beginner' ? 'bg-green-100 text-green-800' : course.level === 'intermediate' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                      {course.level === 'beginner' ? '初级' : course.level === 'intermediate' ? '中级' : '高级'}
                    </span>
                    <div className="flex items-center ml-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      <span className="ml-1 text-sm font-medium">{course.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-[#1a365d]">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <Link 
                    to={`/courses/${course.id}`} 
                    className="inline-block px-4 py-2 bg-[#4299e1] text-white rounded-md hover:bg-[#3182ce] transition-colors"
                  >
                    查看详情
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link 
              to="/courses" 
              className="inline-block px-6 py-3 border border-[#4299e1] text-[#4299e1] rounded-md hover:bg-[#4299e1] hover:text-white transition-colors font-medium"
            >
              查看全部课程
            </Link>
          </div>
        </div>
      </section>

      {/* 学习路径 */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1a365d] mb-4">学习路径</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              系统化的学习路径，帮助你从入门到精通，实现职业目标
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {learningPaths.map((path, index) => (
              <div key={path.id} className="bg-white rounded-lg shadow-md p-6 relative hover:shadow-lg transition-shadow">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#ed8936] rounded-full flex items-center justify-center text-2xl">
                  {path.icon}
                </div>
                <div className="ml-8">
                  <h3 className="text-xl font-bold mb-2 text-[#1a365d]">{path.title}</h3>
                  <p className="text-gray-600 mb-4">{path.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">{path.courses} 门课程</span>
                    <span className="text-sm text-gray-500">{path.duration}</span>
                  </div>
                  <Link 
                    to="/courses" 
                    className="inline-block px-4 py-2 bg-[#1a365d] text-white rounded-md hover:bg-[#2a4a6d] transition-colors"
                  >
                    开始学习
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 特色功能 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1a365d] mb-4">平台特色</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              为商务数据分析与应用专业学生打造的专属学习平台
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#4299e1] rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-4">
                📚
              </div>
              <h3 className="text-lg font-bold mb-2 text-[#1a365d]">完整课程体系</h3>
              <p className="text-gray-600">
                从基础到高级的完整课程体系，覆盖数据分析全领域
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#ed8936] rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-4">
                💻
              </div>
              <h3 className="text-lg font-bold mb-2 text-[#1a365d]">互动式学习</h3>
              <p className="text-gray-600">
                实时互动、协作学习、讨论功能，提升学习效果
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#38a169] rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-4">
                ✅
              </div>
              <h3 className="text-lg font-bold mb-2 text-[#1a365d]">学习练习测评</h3>
              <p className="text-gray-600">
                在线练习、测验、作业提交，全方位评估学习成果
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#805ad5] rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-4">
                🏆
              </div>
              <h3 className="text-lg font-bold mb-2 text-[#1a365d]">成就激励系统</h3>
              <p className="text-gray-600">
                徽章、积分、排行榜，激发学习动力
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;