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
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=certificate%20of%20completion%20for%20Python%20data%20analysis%20course&image_size=landscape_16_9'
      },
      {
        id: '2',
        course: 'SQL数据库基础',
        issuedDate: '2026-01-10',
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=certificate%20of%20completion%20for%20SQL%20database%20course&image_size=landscape_16_9'
      }
    ],
    inProgress: [
      {
        id: '1',
        title: '商务数据可视化',
        progress: 60,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Business%20data%20visualization%20course%20cover&image_size=landscape_16_9'
      },
      {
        id: '2',
        title: '机器学习实战',
        progress: 30,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Machine%20learning%20course%20cover&image_size=landscape_16_9'
      },
      {
        id: '3',
        title: '商务数据分析',
        progress: 10,
        image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Business%20data%20analysis%20course%20cover&image_size=landscape_16_9'
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
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#1a365d] mb-4">学习中心</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            查看你的学习进度和成就
          </p>
        </div>

        {/* 学习统计 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-[#4299e1] rounded-full flex items-center justify-center text-white text-xl mr-4">
                📚
              </div>
              <div>
                <p className="text-gray-500 text-sm">总课程数</p>
                <p className="text-2xl font-bold">{learningData.totalCourses}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-[#38a169] rounded-full flex items-center justify-center text-white text-xl mr-4">
                ✅
              </div>
              <div>
                <p className="text-gray-500 text-sm">已完成课程</p>
                <p className="text-2xl font-bold">{learningData.completedCourses}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-[#ed8936] rounded-full flex items-center justify-center text-white text-xl mr-4">
                ⏱️
              </div>
              <div>
                <p className="text-gray-500 text-sm">学习时长</p>
                <p className="text-2xl font-bold">{learningData.totalHours} 小时</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-[#805ad5] rounded-full flex items-center justify-center text-white text-xl mr-4">
                🏆
              </div>
              <div>
                <p className="text-gray-500 text-sm">总积分</p>
                <p className="text-2xl font-bold">{learningData.totalPoints}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 进行中的课程 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#1a365d] mb-6">进行中的课程</h2>
          <div className="space-y-4">
            {learningData.inProgress.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="md:w-3/4 p-6">
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-500">学习进度</span>
                        <span className="text-sm font-medium">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#4299e1] h-2 rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-[#4299e1] text-white rounded-md hover:bg-[#3182ce] transition-colors">
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
          <h2 className="text-2xl font-bold text-[#1a365d] mb-6">获得的证书</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningData.certificates.map((certificate) => (
              <div key={certificate.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={certificate.image} 
                    alt={certificate.course} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{certificate.course}</h3>
                  <p className="text-gray-500">颁发日期: {certificate.issuedDate}</p>
                  <button className="mt-4 px-4 py-2 border border-[#4299e1] text-[#4299e1] rounded-md hover:bg-[#4299e1] hover:text-white transition-colors">
                    查看证书
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 获得的徽章 */}
        <div>
          <h2 className="text-2xl font-bold text-[#1a365d] mb-6">获得的徽章</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {learningData.badges.map((badge) => (
              <div key={badge.id} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="text-4xl mb-4">{badge.icon}</div>
                <h3 className="text-lg font-bold mb-2">{badge.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{badge.description}</p>
                <p className="text-gray-500 text-xs">获得日期: {badge.earnedDate}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningCenter;