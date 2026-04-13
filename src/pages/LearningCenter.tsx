const LearningCenter = () => {
  // 模拟学习数据
  const learningData = {
    totalCourses: 5,
    completedCourses: 2,
    inProgressCourses: 3,
    totalHours: 24,
    totalPoints: 1200,
    certificates: [
      {
        id: '1',
        course: 'Python数据分析基础',
        issuedDate: '2026-01-15',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pixel%20art%20certificate%20of%20completion%208-bit%20style&image_size=landscape_16_9'
      },
      {
        id: '2',
        course: 'SQL数据库基础',
        issuedDate: '2026-01-10',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pixel%20art%20certificate%20of%20completion%208-bit%20style&image_size=landscape_16_9'
      }
    ],
    inProgress: [
      {
        id: '1',
        title: '商务数据可视化',
        progress: 60,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pixel%20art%20business%20data%20visualization%208-bit%20style&image_size=landscape_16_9'
      },
      {
        id: '2',
        title: '机器学习实战',
        progress: 30,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pixel%20art%20machine%20learning%208-bit%20style&image_size=landscape_16_9'
      },
      {
        id: '3',
        title: '商务数据分析',
        progress: 10,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pixel%20art%20business%20data%20analysis%208-bit%20style&image_size=landscape_16_9'
      }
    ],
    badges: [
      {
        id: '1',
        name: '初学者',
        description: '完成第一门课程',
        icon: '🏆',
        earnedDate: '2026-01-10'
      },
      {
        id: '2',
        name: '数据分析师',
        description: '完成5门数据分析课程',
        icon: '📊',
        earnedDate: '2026-01-15'
      },
      {
        id: '3',
        name: '学习达人',
        description: '累计学习20小时',
        icon: '⏱️',
        earnedDate: '2026-01-12'
      }
    ]
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-pixel-fade-in">
          <h1 className="text-3xl font-bold text-[#1a365d] mb-4 font-pixel">学习中心</h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-pixel text-sm">
            查看你的学习进度和成就
          </p>
        </div>

        {/* 学习统计 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-md border-4 border-[#1a365d] shadow-md p-6 animate-pixel-fade-in" style={{ animationDelay: '0s' }}>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-[#4299e1] rounded-md border-2 border-[#1a365d] flex items-center justify-center text-white text-xl mr-4 animate-pixel-bounce">
                📚
              </div>
              <div>
                <p className="text-gray-500 text-xs font-pixel">总课程数</p>
                <p className="text-2xl font-bold font-pixel">{learningData.totalCourses}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-md border-4 border-[#1a365d] shadow-md p-6 animate-pixel-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-[#38a169] rounded-md border-2 border-[#1a365d] flex items-center justify-center text-white text-xl mr-4 animate-pixel-bounce">
                ✅
              </div>
              <div>
                <p className="text-gray-500 text-xs font-pixel">已完成课程</p>
                <p className="text-2xl font-bold font-pixel">{learningData.completedCourses}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-md border-4 border-[#1a365d] shadow-md p-6 animate-pixel-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-[#ed8936] rounded-md border-2 border-[#1a365d] flex items-center justify-center text-white text-xl mr-4 animate-pixel-bounce">
                ⏱️
              </div>
              <div>
                <p className="text-gray-500 text-xs font-pixel">学习时长</p>
                <p className="text-2xl font-bold font-pixel">{learningData.totalHours} 小时</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-md border-4 border-[#1a365d] shadow-md p-6 animate-pixel-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-[#805ad5] rounded-md border-2 border-[#1a365d] flex items-center justify-center text-white text-xl mr-4 animate-pixel-bounce">
                🏆
              </div>
              <div>
                <p className="text-gray-500 text-xs font-pixel">总积分</p>
                <p className="text-2xl font-bold font-pixel">{learningData.totalPoints}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 进行中的课程 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a365d] mb-6 font-pixel animate-pixel-fade-in">进行中的课程</h2>
          <div className="space-y-4">
            {learningData.inProgress.map((course, index) => (
              <div key={course.id} className="bg-white rounded-md border-4 border-[#1a365d] shadow-md overflow-hidden animate-pixel-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 border-r-4 border-[#ed8936]">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="md:w-3/4 p-6">
                    <h3 className="text-lg font-bold mb-2 font-pixel">{course.title}</h3>
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-gray-500 font-pixel">学习进度</span>
                        <span className="text-xs font-bold font-pixel">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-md border-2 border-[#1a365d] h-4">
                        <div 
                          className="bg-[#4299e1] h-4 rounded-md" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-[#4299e1] border-2 border-[#1a365d] text-white rounded-md hover:bg-[#3182ce] transition-colors font-pixel text-xs">
                      继续学习
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 获得的证书 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a365d] mb-6 font-pixel animate-pixel-fade-in">获得的证书</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningData.certificates.map((certificate, index) => (
              <div key={certificate.id} className="bg-white rounded-md border-4 border-[#1a365d] shadow-md overflow-hidden animate-pixel-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="h-48 overflow-hidden border-b-4 border-[#ed8936]">
                  <img 
                    src={certificate.image} 
                    alt={certificate.course} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2 font-pixel">{certificate.course}</h3>
                  <p className="text-gray-500 font-pixel text-xs">颁发日期: {certificate.issuedDate}</p>
                  <button className="mt-4 px-4 py-2 border-2 border-[#4299e1] text-[#4299e1] rounded-md hover:bg-[#4299e1] hover:text-white transition-colors font-pixel text-xs">
                    查看证书
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 获得的徽章 */}
        <div>
          <h2 className="text-2xl font-bold text-[#1a365d] mb-6 font-pixel animate-pixel-fade-in">获得的徽章</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {learningData.badges.map((badge, index) => (
              <div key={badge.id} className="bg-white rounded-md border-4 border-[#1a365d] shadow-md p-6 text-center animate-pixel-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="text-4xl mb-4 animate-pixel-bounce">{badge.icon}</div>
                <h3 className="text-lg font-bold mb-2 font-pixel">{badge.name}</h3>
                <p className="text-gray-600 text-xs font-pixel mb-4">{badge.description}</p>
                <p className="text-gray-500 text-xs font-pixel">获得日期: {badge.earnedDate}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningCenter;