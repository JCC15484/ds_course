import { useState, useEffect } from 'react';
import {
  getAdminStats,
  getRecentHistory,
  getAllPracticeProgress,
  getAllProjectProgress,
  resetStore,
  loadStore,
} from '../lib/store';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(getAdminStats());

  // 每次切换到管理页面刷新统计
  useEffect(() => {
    setStats(getAdminStats());
  }, [activeTab]);

  const refresh = () => setStats(getAdminStats());

  const handleReset = () => {
    if (window.confirm('确定要清空所有学习数据吗？此操作不可撤销。')) {
      resetStore();
      refresh();
    }
  };

  const store = loadStore();
  const choiceRecords = store.choiceRecords;
  const codeRecords = store.codeRecords;
  const projectRecords = store.projectStepRecords;

  const totalAnswered =
    choiceRecords.length + codeRecords.length + projectRecords.length;
  const totalCorrect =
    choiceRecords.filter((r) => r.isCorrect).length +
    codeRecords.filter((r) => r.passed).length +
    projectRecords.filter((r) => r.passed).length;
  const avgCorrectRate =
    totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1a365d] dark:text-white mb-2">
            ⚙️ 后台管理系统
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            真实数据统计 · 数据来源：浏览器本地存储
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={refresh}
            className="px-4 py-2 bg-[#4299e1] hover:bg-[#2c5282] text-white rounded-lg text-sm transition-colors"
          >
            🔄 刷新数据
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors"
          >
            🗑 清空数据
          </button>
        </div>
      </div>

      {/* 统计卡片 - 真实数据 */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <div className="text-3xl mb-2">👥</div>
          <div className="text-2xl font-bold text-[#1a365d] dark:text-white">
            {stats.registeredUserCount}
          </div>
          <div className="text-sm text-gray-500">注册用户</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <div className="text-3xl mb-2">📚</div>
          <div className="text-2xl font-bold text-[#1a365d] dark:text-white">
            {stats.activeCourses}
          </div>
          <div className="text-sm text-gray-500">活跃课程</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <div className="text-3xl mb-2">✍️</div>
          <div className="text-2xl font-bold text-[#1a365d] dark:text-white">
            {stats.totalPracticeSubmissions}
          </div>
          <div className="text-sm text-gray-500">练习总次数</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
          <div className="text-3xl mb-2">✅</div>
          <div className="text-2xl font-bold text-green-600">
            {avgCorrectRate}%
          </div>
          <div className="text-sm text-gray-500">平均正确率</div>
        </div>
      </div>

      {/* 标签页 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="flex border-b dark:border-gray-700 overflow-x-auto">
          {[
            { id: 'dashboard', label: '数据统计' },
            { id: 'courses', label: '题库进度' },
            { id: 'questions', label: '答题明细' },
            { id: 'users', label: '用户管理' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#4299e1] text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* 详细统计 */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-bold text-[#1a365d] dark:text-white mb-4">
                    📊 学习趋势
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        今日学习活跃度
                      </span>
                      <span className="font-semibold text-[#1a365d] dark:text-white">
                        {stats.dailyStats.today} 次
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        近 7 日总活跃度
                      </span>
                      <span className="font-semibold text-[#1a365d] dark:text-white">
                        {stats.dailyStats.last7Days} 次
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        选择题答题数
                      </span>
                      <span className="font-semibold text-[#1a365d] dark:text-white">
                        {choiceRecords.length} 题
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        实操题答题数
                      </span>
                      <span className="font-semibold text-[#1a365d] dark:text-white">
                        {codeRecords.length} 题
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        项目学习次数
                      </span>
                      <span className="font-semibold text-[#1a365d] dark:text-white">
                        {projectRecords.length} 次
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        参与题库数
                      </span>
                      <span className="font-semibold text-[#1a365d] dark:text-white">
                        {stats.rawStore.stats.uniquePracticeSets} 个
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-bold text-[#1a365d] dark:text-white mb-4">
                    📈 正确率统计
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        选择题正确率
                      </span>
                      <span className="font-semibold text-green-600">
                        {choiceRecords.length > 0
                          ? Math.round(
                              (choiceRecords.filter((r) => r.isCorrect).length /
                                choiceRecords.length) *
                                100,
                            )
                          : 0}
                        %
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        实操题正确率
                      </span>
                      <span className="font-semibold text-orange-600">
                        {codeRecords.length > 0
                          ? Math.round(
                              (codeRecords.filter((r) => r.passed).length /
                                codeRecords.length) *
                                100,
                            )
                          : 0}
                        %
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        项目学习通过率
                      </span>
                      <span className="font-semibold text-purple-600">
                        {projectRecords.length > 0
                          ? Math.round(
                              (projectRecords.filter((r) => r.passed).length /
                                projectRecords.length) *
                                100,
                            )
                          : 0}
                        %
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300 font-semibold">
                        整体正确率
                      </span>
                      <span className="font-semibold text-blue-600">
                        {avgCorrectRate}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 分类统计 */}
              {stats.categoryBreakdown.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-bold text-[#1a365d] dark:text-white mb-4">
                    📚 各题库练习统计
                  </h3>
                  <div className="space-y-2">
                    {stats.categoryBreakdown.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2 bg-white dark:bg-gray-600 rounded">
                        <span className="text-sm text-gray-700 dark:text-gray-300 truncate flex-1">
                          {item.name}
                        </span>
                        <span className="text-sm font-semibold text-[#1a365d] dark:text-white">
                          {item.submissions} 次
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 最近活动 */}
              {stats.recentActivity.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="font-bold text-[#1a365d] dark:text-white mb-4">
                    🕐 最近学习活动（最近 {stats.recentActivity.length} 条）
                  </h3>
                  <div className="max-h-80 overflow-y-auto space-y-2">
                    {stats.recentActivity.map((activity, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 bg-white dark:bg-gray-600 rounded text-sm"
                      >
                        <div className="flex-1 min-w-0">
                          <span className="text-gray-700 dark:text-gray-300">
                            {activity.action}：{activity.target}
                          </span>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {activity.date}
                          </div>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            activity.isCorrect
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {activity.isCorrect ? '✓' : '✗'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'courses' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#1a365d] dark:text-white mb-4">
                题库进度
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                        题库名称
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                        类型
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                        进度
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                        状态
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getAllPracticeProgress().map((p, idx) => (
                      <tr
                        key={`practice-${idx}`}
                        className="border-b dark:border-gray-700"
                      >
                        <td className="py-3 px-4 text-sm text-[#1a365d] dark:text-white">
                          {p.title}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            练习题库
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                          选择 {p.choiceDone}/{p.choiceTotal} · 实操{' '}
                          {p.codeDone}/{p.codeTotal}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              p.choiceDone === p.choiceTotal &&
                              p.codeDone === p.codeTotal
                                ? 'bg-green-100 text-green-800'
                                : p.choiceDone > 0 || p.codeDone > 0
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {p.choiceDone === p.choiceTotal &&
                            p.codeDone === p.codeTotal
                              ? '已完成'
                              : p.choiceDone > 0 || p.codeDone > 0
                                ? '进行中'
                                : '未开始'}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {getAllProjectProgress().map((p, idx) => (
                      <tr
                        key={`project-${idx}`}
                        className="border-b dark:border-gray-700"
                      >
                        <td className="py-3 px-4 text-sm text-[#1a365d] dark:text-white">
                          {p.title}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                            项目实战
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {p.completedSteps}/{p.totalSteps} 步骤 · 通过{' '}
                          {p.passedSteps}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              p.completedSteps === p.totalSteps
                                ? 'bg-green-100 text-green-800'
                                : p.completedSteps > 0
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {p.completedSteps === p.totalSteps
                              ? '已完成'
                              : p.completedSteps > 0
                                ? '进行中'
                                : '未开始'}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {getAllPracticeProgress().length === 0 &&
                      getAllProjectProgress().length === 0 && (
                        <tr>
                          <td
                            colSpan={4}
                            className="py-8 text-center text-gray-500 dark:text-gray-400"
                          >
                            暂无学习进度记录，开始你的第一题吧！
                          </td>
                        </tr>
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'questions' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#1a365d] dark:text-white mb-4">
                答题明细（最近 {Math.min(getRecentHistory(999).length, 100)} 条）
              </h3>
              <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                <table className="w-full">
                  <thead className="sticky top-0 bg-white dark:bg-gray-800">
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                        类型
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                        题目
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                        结果
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                        时间
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getRecentHistory(999).slice(0, 100).map((item, idx) => (
                      <tr
                        key={idx}
                        className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="py-3 px-4 text-sm">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              item.type === 'choice'
                                ? 'bg-blue-100 text-blue-800'
                                : item.type === 'code'
                                  ? 'bg-orange-100 text-orange-800'
                                  : 'bg-purple-100 text-purple-800'
                            }`}
                          >
                            {item.type === 'choice'
                              ? '选择'
                              : item.type === 'code'
                                ? '实操'
                                : '项目'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-[#1a365d] dark:text-white max-w-sm">
                          <span className="truncate block">{item.target}</span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              item.isCorrect
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {item.isCorrect ? '正确/通过' : '错误/未通过'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                          {item.date}
                        </td>
                      </tr>
                    ))}
                    {getRecentHistory(999).length === 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-8 text-center text-gray-500 dark:text-gray-400"
                        >
                          暂无答题记录
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#1a365d] dark:text-white mb-4">
                当前用户信息
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    用户名称
                  </div>
                  <div className="font-bold text-[#1a365d] dark:text-white">
                    {store.userInfo.name}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    联系邮箱
                  </div>
                  <div className="font-bold text-[#1a365d] dark:text-white">
                    {store.userInfo.email}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    加入时间
                  </div>
                  <div className="font-bold text-[#1a365d] dark:text-white">
                    {store.userInfo.joinDate}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    总答题数
                  </div>
                  <div className="font-bold text-[#1a365d] dark:text-white">
                    {totalAnswered} 题
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-yellow-50 dark:bg-gray-700 border-l-4 border-yellow-400 rounded">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  💡 提示：此系统的数据存储在浏览器本地存储中。
                  数据保存在 <code>py_edu_store_v1</code> 键下，包含选择题、
                  实操题和项目学习的完整记录。
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
