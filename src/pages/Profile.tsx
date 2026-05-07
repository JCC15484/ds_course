import { useState } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('progress');

  const userData = {
    name: '学习者',
    email: 'user@example.com',
    joinDate: '2024-01-01',
    totalCourses: 8,
    completedCourses: 2,
    totalPractices: 50,
    correctRate: 75,
    choiceCorrectRate: 85,
    codeCorrectRate: 65
  };

  const wrongAnswers = {
    choice: [
      { id: 1, question: '下列哪个选项可以创建一个空列表？', yourAnswer: 'B', correctAnswer: 'A', date: '2024-01-15' },
      { id: 2, question: '如何获取列表的最后一个元素？', yourAnswer: 'C', correctAnswer: 'A', date: '2024-01-15' }
    ],
    code: [
      { id: 1, question: '列表操作练习题', code: 'my_list = [1,2,3]\nmy_list.append(4)\nprint(my_list)', date: '2024-01-15' }
    ]
  };

  const history = [
    { id: 1, action: '完成练习', target: 'Python基础选择题', date: '2024-01-15', score: 80 },
    { id: 2, action: '学习课程', target: '变量与数据类型', date: '2024-01-14', progress: 100 },
    { id: 3, action: '完成练习', target: '列表操作实操题', date: '2024-01-13', score: 90 }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a365d] dark:text-white mb-2">
          👤 个人学习中心
        </h1>
      </div>

      {/* 用户信息卡片 */}
      <div className="bg-gradient-to-r from-[#4299e1] to-[#2c5282] rounded-xl p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl">
            👤
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">{userData.name}</h2>
            <p className="opacity-90 mb-2">{userData.email}</p>
            <p className="text-sm opacity-75">加入时间：{userData.joinDate}</p>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-white text-[#4299e1] rounded-lg font-medium hover:bg-gray-100 transition-colors">
              修改资料
            </button>
            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors">
              修改密码
            </button>
          </div>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
          <div className="text-3xl mb-2">📚</div>
          <div className="text-2xl font-bold text-[#1a365d] dark:text-white">
            {userData.completedCourses}/{userData.totalCourses}
          </div>
          <div className="text-sm text-gray-500">已完成课程</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
          <div className="text-3xl mb-2">✍️</div>
          <div className="text-2xl font-bold text-[#1a365d] dark:text-white">
            {userData.totalPractices}
          </div>
          <div className="text-sm text-gray-500">完成题目</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
          <div className="text-3xl mb-2">✅</div>
          <div className="text-2xl font-bold text-green-600">
            {userData.choiceCorrectRate}%
          </div>
          <div className="text-sm text-gray-500">选择题正确率</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
          <div className="text-3xl mb-2">💻</div>
          <div className="text-2xl font-bold text-orange-600">
            {userData.codeCorrectRate}%
          </div>
          <div className="text-sm text-gray-500">实操题正确率</div>
        </div>
      </div>

      {/* 标签页 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="flex border-b dark:border-gray-700">
          <button
            onClick={() => setActiveTab('progress')}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              activeTab === 'progress'
                ? 'bg-[#4299e1] text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            学习进度
          </button>
          <button
            onClick={() => setActiveTab('wrong')}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              activeTab === 'wrong'
                ? 'bg-[#4299e1] text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            错题本
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              activeTab === 'history'
                ? 'bg-[#4299e1] text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            历史记录
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'progress' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h3 className="font-semibold text-[#1a365d] dark:text-white">Python基础入门</h3>
                  <p className="text-sm text-gray-500">6个知识点</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '60%' }} />
                  </div>
                  <span className="text-sm font-semibold text-green-600">60%</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h3 className="font-semibold text-[#1a365d] dark:text-white">NumPy数值计算</h3>
                  <p className="text-sm text-gray-500">5个知识点</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '20%' }} />
                  </div>
                  <span className="text-sm font-semibold text-blue-600">20%</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h3 className="font-semibold text-[#1a365d] dark:text-white">Pandas数据处理</h3>
                  <p className="text-sm text-gray-500">5个知识点</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '0%' }} />
                  </div>
                  <span className="text-sm font-semibold text-gray-600">0%</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'wrong' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#1a365d] dark:text-white mb-3">
                  📝 选择题错题
                </h3>
                {wrongAnswers.choice.map((item) => (
                  <div key={item.id} className="p-4 bg-red-50 dark:bg-gray-700 rounded-lg mb-3">
                    <p className="font-medium text-[#1a365d] dark:text-white mb-2">
                      {item.question}
                    </p>
                    <div className="flex gap-4 text-sm">
                      <span className="text-red-600">你的答案：{item.yourAnswer}</span>
                      <span className="text-green-600">正确答案：{item.correctAnswer}</span>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <Link
                        to="/practice"
                        className="text-sm text-[#4299e1] hover:underline"
                      >
                        重新练习 →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1a365d] dark:text-white mb-3">
                  💻 实操题错题
                </h3>
                {wrongAnswers.code.map((item) => (
                  <div key={item.id} className="p-4 bg-orange-50 dark:bg-gray-700 rounded-lg mb-3">
                    <p className="font-medium text-[#1a365d] dark:text-white mb-2">
                      {item.question}
                    </p>
                    <div className="bg-gray-800 text-green-400 p-3 rounded text-sm font-mono overflow-x-auto">
                      <pre>{item.code}</pre>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <Link
                        to="/practice"
                        className="text-sm text-[#4299e1] hover:underline"
                      >
                        查看答案 →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-[#1a365d] dark:text-white">
                      {item.action}：{item.target}
                    </p>
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </div>
                  <div className="text-right">
                    {item.score && (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.score >= 60 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {item.score}分
                      </span>
                    )}
                    {item.progress && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {item.progress}% 完成
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
