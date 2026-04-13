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
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pixel%20art%20Python%20data%20analysis%20course%20cover%208-bit%20style&image_size=landscape_16_9'
    },
    {
      id: '2',
      title: '商务数据可视化',
      description: '使用Matplotlib和Seaborn创建专业的数据可视化',
      level: 'intermediate',
      rating: 4.6,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pixel%20art%20business%20data%20visualization%20course%208-bit%20style&image_size=landscape_16_9'
    },
    {
      id: '3',
      title: '机器学习实战',
      description: '从理论到实践，掌握机器学习算法的应用',
      level: 'advanced',
      rating: 4.9,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pixel%20art%20machine%20learning%20course%208-bit%20style&image_size=landscape_16_9'
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
      <section className="relative bg-[#1a365d] text-white py-20 border-b-4 border-[#ed8936]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl animate-pixel-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 font-pixel leading-tight">
              掌握数据分析技能，开启数据驱动未来
            </h1>
            <p className="text-sm md:text-base mb-8 text-gray-200 font-pixel leading-relaxed">
              为商务数据分析与应用专业学生打造的系统化学习平台，从基础到高级，全方位提升数据分析能力。
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/courses" 
                className="px-6 py-3 bg-[#ed8936] border-2 border-white rounded-md hover:bg-[#d69e4f] transition-colors text-center font-pixel text-sm animate-pixel-bounce"
              >
                浏览课程
              </Link>
              <Link 
                to="/register" 
                className="px-6 py-3 border-2 border-white rounded-md hover:bg-white hover:text-[#1a365d] transition-colors text-center font-pixel text-sm"
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
          <div className="text-center mb-12 animate-pixel-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a365d] mb-4 font-pixel">推荐课程</h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-pixel text-sm">
              精心挑选的优质课程，帮助你快速掌握数据分析技能
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div key={course.id} className="bg-white rounded-md border-4 border-[#1a365d] shadow-md overflow-hidden hover:shadow-lg transition-shadow animate-pixel-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="h-48 overflow-hidden border-b-4 border-[#ed8936]">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-pixel ${course.level === 'beginner' ? 'bg-green-100 text-green-800 border-2 border-green-800' : course.level === 'intermediate' ? 'bg-blue-100 text-blue-800 border-2 border-blue-800' : 'bg-purple-100 text-purple-800 border-2 border-purple-800'}`}>
                      {course.level === 'beginner' ? '初级' : course.level === 'intermediate' ? '中级' : '高级'}
                    </span>
                    <div className="flex items-center ml-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                      <span className="ml-1 text-sm font-pixel">{course.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-[#1a365d] font-pixel">{course.title}</h3>
                  <p className="text-gray-600 mb-4 font-pixel text-xs leading-relaxed">{course.description}</p>
                  <Link 
                    to={`/courses/${course.id}`} 
                    className="inline-block px-4 py-2 bg-[#4299e1] border-2 border-[#1a365d] rounded-md hover:bg-[#3182ce] transition-colors font-pixel text-xs"
                  >
                    查看详情
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 animate-pixel-fade-in">
            <Link 
              to="/courses" 
              className="inline-block px-6 py-3 border-2 border-[#4299e1] text-[#4299e1] rounded-md hover:bg-[#4299e1] hover:text-white transition-colors font-pixel text-xs"
            >
              查看全部课程
            </Link>
          </div>
        </div>
      </section>

      {/* 学习路径 */}
      <section className="py-16 bg-gray-100 border-t-4 border-b-4 border-[#1a365d]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-pixel-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a365d] mb-4 font-pixel">学习路径</h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-pixel text-sm">
              系统化的学习路径，帮助你从入门到精通，实现职业目标
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {learningPaths.map((path, index) => (
              <div key={path.id} className="bg-white rounded-md border-4 border-[#1a365d] shadow-md p-6 relative hover:shadow-lg transition-shadow animate-pixel-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#ed8936] rounded-md border-2 border-white flex items-center justify-center text-2xl animate-pixel-bounce">
                  {path.icon}
                </div>
                <div className="ml-8">
                  <h3 className="text-lg font-bold mb-2 text-[#1a365d] font-pixel">{path.title}</h3>
                  <p className="text-gray-600 mb-4 font-pixel text-xs leading-relaxed">{path.description}</p>
                  <div className="flex justify-between items-center mb-4 font-pixel text-xs">
                    <span className="text-gray-500">{path.courses} 门课程</span>
                    <span className="text-gray-500">{path.duration}</span>
                  </div>
                  <Link 
                    to="/courses" 
                    className="inline-block px-4 py-2 bg-[#1a365d] border-2 border-[#ed8936] rounded-md hover:bg-[#2a4a6d] transition-colors font-pixel text-xs"
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
          <div className="text-center mb-12 animate-pixel-fade-in">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a365d] mb-4 font-pixel">平台特色</h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-pixel text-sm">
              为商务数据分析与应用专业学生打造的专属学习平台
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center border-4 border-[#1a365d] rounded-md p-6 hover:shadow-lg transition-shadow animate-pixel-fade-in" style={{ animationDelay: '0s' }}>
              <div className="w-16 h-16 bg-[#4299e1] rounded-md border-2 border-[#1a365d] flex items-center justify-center text-2xl text-white mx-auto mb-4 animate-pixel-bounce">
                📚
              </div>
              <h3 className="text-lg font-bold mb-2 text-[#1a365d] font-pixel">完整课程体系</h3>
              <p className="text-gray-600 font-pixel text-xs leading-relaxed">
                从基础到高级的完整课程体系，覆盖数据分析全领域
              </p>
            </div>
            <div className="text-center border-4 border-[#1a365d] rounded-md p-6 hover:shadow-lg transition-shadow animate-pixel-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-[#ed8936] rounded-md border-2 border-[#1a365d] flex items-center justify-center text-2xl text-white mx-auto mb-4 animate-pixel-bounce">
                💻
              </div>
              <h3 className="text-lg font-bold mb-2 text-[#1a365d] font-pixel">互动式学习</h3>
              <p className="text-gray-600 font-pixel text-xs leading-relaxed">
                实时互动、协作学习、讨论功能，提升学习效果
              </p>
            </div>
            <div className="text-center border-4 border-[#1a365d] rounded-md p-6 hover:shadow-lg transition-shadow animate-pixel-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-[#38a169] rounded-md border-2 border-[#1a365d] flex items-center justify-center text-2xl text-white mx-auto mb-4 animate-pixel-bounce">
                ✅
              </div>
              <h3 className="text-lg font-bold mb-2 text-[#1a365d] font-pixel">学习练习测评</h3>
              <p className="text-gray-600 font-pixel text-xs leading-relaxed">
                在线练习、测验、作业提交，全方位评估学习成果
              </p>
            </div>
            <div className="text-center border-4 border-[#1a365d] rounded-md p-6 hover:shadow-lg transition-shadow animate-pixel-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="w-16 h-16 bg-[#805ad5] rounded-md border-2 border-[#1a365d] flex items-center justify-center text-2xl text-white mx-auto mb-4 animate-pixel-bounce">
                🏆
              </div>
              <h3 className="text-lg font-bold mb-2 text-[#1a365d] font-pixel">成就激励系统</h3>
              <p className="text-gray-600 font-pixel text-xs leading-relaxed">
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