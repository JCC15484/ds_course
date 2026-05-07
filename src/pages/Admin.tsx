import { useState } from 'react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = {
    totalUsers: 1523,
    totalCourses: 25,
    totalPractices: 1850,
    avgCorrectRate: 78
  };

  const recentUsers = [
    { id: 1, name: '张三', email: 'zhangsan@example.com', joinDate: '2024-01-15' },
    { id: 2, name: '李四', email: 'lisi@example.com', joinDate: '2024-01-14' },
    { id: 3, name: '王五', email: 'wangwu@example.com', joinDate: '2024-01-13' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a365d] dark:text-white mb-2">
          ⚙️ 后台管理系统
        </h1>
      </div>

      {/* 统计卡片 */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <div className="text-3xl mb-2">👥</div>
          <div className="text-2xl font-bold text-[#1a365d] dark:text-white">{stats.totalUsers}</div>
          <div className="text-sm text-gray-500">注册用户</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <div className="text-3xl mb-2">📚</div>
          <div className="text-2xl font-bold text-[#1a365d] dark:text-white">{stats.totalCourses}</div>
          <div className="text-sm text-gray-500">课程数量</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <div className="text-3xl mb-2">✍️</div>
          <div className="text-2xl font-bold text-[#1a365d] dark:text-white">{stats.totalPractices}</div>
          <div className="text-sm text-gray-500">练习总数</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <div className="text-3xl mb-2">✅</div>
          <div className="text-2xl font-bold text-green-600">{stats.avgCorrectRate}%</div>
          <div className="text-sm text-gray-500">平均正确率</div>
        </div>
      </div>

      {/* 标签页 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="flex border-b dark:border-gray-700 overflow-x-auto">
          {['dashboard', 'courses', 'questions', 'users'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-medium transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-[#4299e1] text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {tab === 'dashboard' && '数据统计'}
              {tab === 'courses' && '课程管理'}
              {tab === 'questions' && '题库管理'}
              {tab === 'users' && '用户管理'}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-bold text-[#1a365d] dark:text-white mb-4">📊 学习趋势</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">今日学习人数</span>
                      <span className="font-semibold text-[#1a365d] dark:text-white">156人</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">今日练习次数</span>
                      <span className="font-semibold text-[#1a365d] dark:text-white">428次</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">本周新增用户</span>
                      <span className="font-semibold text-[#1a365d] dark:text-white">89人</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-bold text-[#1a365d] dark:text-white mb-4">📈 正确率统计</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">选择题正确率</span>
                      <span className="font-semibold text-green-600">82%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">实操题正确率</span>
                      <span className="font-semibold text-orange-600">65%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">整体正确率</span>
                      <span className="font-semibold text-blue-600">78%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-[#1a365d] dark:text-white">课程列表</h3>
                <button className="px-4 py-2 bg-[#4299e1] hover:bg-[#2c5282] text-white rounded-lg font-medium text-sm transition-colors">
                  添加课程
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">课程名称</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">分类</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">难度</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b dark:border-gray-700">
                      <td className="py-3 px-4 text-sm text-[#1a365d] dark:text-white">Python基础语法入门</td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Python基础</td>
                      <td className="py-3 px-4"><span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">入门</span></td>
                      <td className="py-3 px-4">
                        <button className="text-blue-600 hover:underline text-sm mr-2">编辑</button>
                        <button className="text-red-600 hover:underline text-sm">删除</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'questions' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-[#1a365d] dark:text-white">题库管理</h3>
                <button className="px-4 py-2 bg-[#4299e1] hover:bg-[#2c5282] text-white rounded-lg font-medium text-sm transition-colors">
                  添加题目
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">题目内容</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">类型</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">分类</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b dark:border-gray-700">
                      <td className="py-3 px-4 text-sm text-[#1a365d] dark:text-white">下列哪个选项可以创建一个空列表？</td>
                      <td className="py-3 px-4"><span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">选择题</span></td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">Python基础</td>
                      <td className="py-3 px-4">
                        <button className="text-blue-600 hover:underline text-sm mr-2">编辑</button>
                        <button className="text-red-600 hover:underline text-sm">删除</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-[#1a365d] dark:text-white">用户管理</h3>
                <input
                  type="text"
                  placeholder="搜索用户..."
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#4299e1] outline-none text-sm"
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">用户</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">邮箱</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">注册时间</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user.id} className="border-b dark:border-gray-700">
                        <td className="py-3 px-4 text-sm text-[#1a365d] dark:text-white">{user.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{user.email}</td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{user.joinDate}</td>
                        <td className="py-3 px-4">
                          <button className="text-blue-600 hover:underline text-sm mr-2">查看</button>
                          <button className="text-red-600 hover:underline text-sm">禁用</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
