const Profile = () => {
  // 模拟用户数据
  const userData = {
    name: '张三',
    email: 'zhangsan@example.com',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20male%20student%20avatar&image_size=square',
    role: '普通用户',
    joinDate: '2026-01-01',
    bio: '商务数据分析与应用专业学生，热爱数据分析和可视化',
    skills: ['Python', 'Pandas', 'Matplotlib', 'SQL', 'Excel'],
    socialLinks: {
      github: 'https://github.com/zhangsan',
      linkedin: 'https://linkedin.com/in/zhangsan',
      twitter: 'https://twitter.com/zhangsan'
    },
    stats: {
      coursesCompleted: 2,
      coursesInProgress: 3,
      totalHours: 24,
      totalPoints: 1200,
      badges: 3
    }
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#1a365d] mb-4">个人资料</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            查看和编辑你的个人信息
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧个人信息 */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-[#1a365d] h-24"></div>
              <div className="p-6">
                <div className="flex justify-center -mt-16 mb-4">
                  <img 
                    src={userData.avatar} 
                    alt={userData.name} 
                    className="w-32 h-32 rounded-full border-4 border-white object-cover"
                  />
                </div>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-1">{userData.name}</h2>
                  <p className="text-gray-500 mb-2">{userData.role}</p>
                  <p className="text-gray-500 text-sm">加入时间: {userData.joinDate}</p>
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-2">个人简介</h3>
                  <p className="text-gray-600">{userData.bio}</p>
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-2">技能</h3>
                  <div className="flex flex-wrap gap-2">
                    {userData.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">社交链接</h3>
                  <div className="flex space-x-4">
                    {userData.socialLinks.github && (
                      <a href={userData.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#4299e1]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                    {userData.socialLinks.linkedin && (
                      <a href={userData.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#4299e1]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    )}
                    {userData.socialLinks.twitter && (
                      <a href={userData.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#4299e1]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
                <button className="w-full mt-6 py-2 border border-[#4299e1] text-[#4299e1] rounded-md hover:bg-[#4299e1] hover:text-white transition-colors">
                  编辑资料
                </button>
              </div>
            </div>
          </div>

          {/* 右侧学习统计 */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">学习统计</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm mb-1">已完成课程</p>
                  <p className="text-2xl font-bold">{userData.stats.coursesCompleted}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm mb-1">进行中课程</p>
                  <p className="text-2xl font-bold">{userData.stats.coursesInProgress}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm mb-1">学习时长</p>
                  <p className="text-2xl font-bold">{userData.stats.totalHours} 小时</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-500 text-sm mb-1">总积分</p>
                  <p className="text-2xl font-bold">{userData.stats.totalPoints}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">最近活动</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-[#4299e1] rounded-full flex items-center justify-center text-white mr-4">
                    📚
                  </div>
                  <div>
                    <p className="font-medium">开始学习课程 <span className="text-[#4299e1]">商务数据可视化</span></p>
                    <p className="text-gray-500 text-sm">2026-01-15 14:30</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-[#38a169] rounded-full flex items-center justify-center text-white mr-4">
                    ✅
                  </div>
                  <div>
                    <p className="font-medium">完成课程 <span className="text-[#38a169]">Python数据分析基础</span></p>
                    <p className="text-gray-500 text-sm">2026-01-10 10:15</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-[#ed8936] rounded-full flex items-center justify-center text-white mr-4">
                    🏆
                  </div>
                  <div>
                    <p className="font-medium">获得徽章 <span className="text-[#ed8936]">学习达人</span></p>
                    <p className="text-gray-500 text-sm">2026-01-08 09:45</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-[#805ad5] rounded-full flex items-center justify-center text-white mr-4">
                    💬
                  </div>
                  <div>
                    <p className="font-medium">在论坛发表帖子 <span className="text-[#805ad5]">如何使用Pandas进行数据清洗？</span></p>
                    <p className="text-gray-500 text-sm">2026-01-05 16:20</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;