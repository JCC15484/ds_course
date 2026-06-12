import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getAllPracticeProgress,
  getAllProjectProgress,
  getRecentHistory,
  loadStore,
  resetStore,
} from '../lib/store';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('progress');
  const [, setTick] = useState(0);

  useEffect(() => {
    setTick((t) => t + 1);
  }, [activeTab]);

  const store = loadStore();
  const practiceProgress = getAllPracticeProgress();
  const projectProgress = getAllProjectProgress();
  const history = getRecentHistory(100);
  const { wrongAnswers } = store;

  const choiceRecords = store.choiceRecords;
  const codeRecords = store.codeRecords;
  const projectRecords = store.projectStepRecords;

  const totalChoiceDone = choiceRecords.length;
  const totalChoiceCorrect = choiceRecords.filter((r) => r.isCorrect).length;
  const choiceCorrectRate =
    totalChoiceDone > 0
      ? Math.round((totalChoiceCorrect / totalChoiceDone) * 100)
      : 0;

  const totalCodeDone = codeRecords.length;
  const totalCodeCorrect = codeRecords.filter((r) => r.passed).length;
  const codeCorrectRate =
    totalCodeDone > 0
      ? Math.round((totalCodeCorrect / totalCodeDone) * 100)
      : 0;

  const totalPracticeSets =
    new Set([
      ...practiceProgress.map((p) => p.title),
      ...projectProgress.map((p) => p.title),
    ]).size || 0;

  const completedPracticeSets =
    practiceProgress.filter(
      (p) => p.choiceDone === p.choiceTotal && p.codeDone === p.codeTotal,
    ).length + projectProgress.filter((p) => p.completedSteps === p.totalSteps).length;

  const handleReset = () => {
    if (
      window.confirm(
        '确定要清空所有学习数据吗？此操作不可撤销，所有错题、历史和进度都会丢失。',
      )
    ) {
      resetStore();
      setTick((t) => t + 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1a365d] dark:text-white mb-2">
            👤 个人学习中心
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            数据来源：浏览器本地存储，真实学习记录
          </p>
        </div>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm transition-colors"
        >
          🗑 清空学习数据
        </button>
      </div>

      {/* 用户信息卡片 */}
      <div className="bg-gradient-to-r from-[#4299e1] to-[#2c5282] rounded-xl p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-5xl">
            👤
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">{store.userInfo.name}</h2>
            <p className="opacity-90 mb-2">{store.userInfo.email}</p>
            <p className="text-sm opacity-75">
              加入时间：{store.userInfo.joinDate}
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              to="/practice"
              className="px-4 py-2 bg-white text-[#4299e1] rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              📖 去练习
            </Link>
            <Link
              to="/projects"
              className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors"
            >
              💻 看项目
            </Link>
          </div>
        </div>
      </div>

      {/* 统计卡片 - 真实数据 */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
          <div className="text-3xl mb-2">📚</div>
          <div className="text-2xl font-bold text-[#1a365d] dark:text-white">
            {completedPracticeSets}/{totalPracticeSets}
          </div>
          <div className="text-sm text-gray-500">已完成课程/题库</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
          <div className="text-3xl mb-2">✍️</div>
          <div className="text-2xl font-bold text-[#1a365d] dark:text-white">
            {totalChoiceDone + totalCodeDone + projectRecords.length}
          </div>
          <div className="text-sm text-gray-500">完成题目总数</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
          <div className="text-3xl mb-2">✅</div>
          <div className="text-2xl font-bold text-green-600">
            {choiceCorrectRate}%
          </div>
          <div className="text-sm text-gray-500">选择题正确率</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
          <div className="text-3xl mb-2">💻</div>
          <div className="text-2xl font-bold text-orange-600">
            {codeCorrectRate}%
          </div>
          <div className="text-sm text-gray-500">实操题正确率</div>
        </div>
      </div>

      {/* 标签页 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="flex border-b dark:border-gray-700 overflow-x-auto">
          {[
            { id: 'progress', label: '学习进度' },
            { id: 'wrong', label: '错题本' },
            { id: 'history', label: '历史记录' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-6 py-4 font-medium whitespace-nowrap transition-colors ${
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
          {activeTab === 'progress' && (
            <div className="space-y-4">
              {/* 练习题库进度 */}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-[#1a365d] dark:text-white mb-3">
                  📖 练习题库进度
                </h3>
                {practiceProgress.length === 0 ? (
                  <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg text-center text-gray-500 dark:text-gray-400">
                    暂无练习进度，
                    <Link
                      to="/practice"
                      className="text-[#4299e1] hover:underline"
                    >
                      去练习 →
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {practiceProgress.map((p, idx) => {
                      const total =
                        (p.choiceTotal || 0) + (p.codeTotal || 0);
                      const done = (p.choiceDone || 0) + (p.codeDone || 0);
                      const pct =
                        total > 0 ? Math.round((done / total) * 100) : 0;
                      return (
                        <div
                          key={`pp-${idx}`}
                          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <div>
                            <h4 className="font-semibold text-[#1a365d] dark:text-white">
                              {p.title}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              选择 {p.choiceDone}/{p.choiceTotal} · 实操{' '}
                              {p.codeDone}/{p.codeTotal}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all ${
                                  pct >= 80
                                    ? 'bg-green-500'
                                    : pct > 0
                                      ? 'bg-blue-500'
                                      : 'bg-gray-400'
                                }`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span
                              className={`text-sm font-semibold whitespace-nowrap ${
                                pct >= 80
                                  ? 'text-green-600'
                                  : pct > 0
                                    ? 'text-blue-600'
                                    : 'text-gray-600'
                              }`}
                            >
                              {pct}%
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 项目学习进度 */}
              <div>
                <h3 className="text-lg font-bold text-[#1a365d] dark:text-white mb-3">
                  💻 项目实战进度
                </h3>
                {projectProgress.length === 0 ? (
                  <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg text-center text-gray-500 dark:text-gray-400">
                    暂无项目进度，
                    <Link
                      to="/projects"
                      className="text-[#4299e1] hover:underline"
                    >
                      查看项目 →
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {projectProgress.map((p, idx) => {
                      const pct =
                        p.totalSteps > 0
                          ? Math.round((p.completedSteps / p.totalSteps) * 100)
                          : 0;
                      return (
                        <div
                          key={`pj-${idx}`}
                          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <div>
                            <h4 className="font-semibold text-[#1a365d] dark:text-white">
                              {p.title}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              已学习 {p.completedSteps}/{p.totalSteps} 步骤
                              {p.passedSteps > 0 ? ` · 通过 ${p.passedSteps}` : ''}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all ${
                                  pct >= 80
                                    ? 'bg-green-500'
                                    : pct > 0
                                      ? 'bg-purple-500'
                                      : 'bg-gray-400'
                                }`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span
                              className={`text-sm font-semibold whitespace-nowrap ${
                                pct >= 80
                                  ? 'text-green-600'
                                  : pct > 0
                                    ? 'text-purple-600'
                                    : 'text-gray-600'
                              }`}
                            >
                              {pct}%
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'wrong' && (
            <div className="space-y-6">
              {/* 选择题错题 */}
              <div>
                <h3 className="text-lg font-bold text-[#1a365d] dark:text-white mb-3">
                  📝 选择题错题（{wrongAnswers.choice.length} 题）
                </h3>
                {wrongAnswers.choice.length === 0 ? (
                  <div className="p-6 bg-green-50 dark:bg-gray-700 rounded-lg text-center text-green-600 dark:text-green-400">
                    🎉 太棒了！暂无选择题错题
                  </div>
                ) : (
                  <div className="space-y-3">
                    {wrongAnswers.choice.map((item, idx) => (
                      <div
                        key={`wrong-choice-${item.id}-${idx}`}
                        className="p-4 bg-red-50 dark:bg-gray-700 rounded-lg"
                      >
                        <p className="font-medium text-[#1a365d] dark:text-white mb-2">
                          练习集 #{item.practiceSetId} — 第 {item.questionIndex + 1} 题
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                          {item.questionText}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <span className="text-red-600">
                            🚫 你的答案：{item.selectedAnswer}
                          </span>
                          <span className="text-green-600">
                            ✅ 正确答案：{item.correctAnswer}
                          </span>
                        </div>
                        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                          记录时间：{new Date(item.timestamp).toLocaleString('zh-CN')}
                        </div>
                        <div className="mt-3 flex gap-2">
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
                )}
              </div>

              {/* 实操题错题 */}
              <div>
                <h3 className="text-lg font-bold text-[#1a365d] dark:text-white mb-3">
                  💻 实操题错题（{wrongAnswers.code.length} 题）
                </h3>
                {wrongAnswers.code.length === 0 ? (
                  <div className="p-6 bg-green-50 dark:bg-gray-700 rounded-lg text-center text-green-600 dark:text-green-400">
                    🎉 太棒了！暂无实操题错题
                  </div>
                ) : (
                  <div className="space-y-3">
                    {wrongAnswers.code.map((item, idx) => (
                      <div
                        key={`wrong-code-${item.id}-${idx}`}
                        className="p-4 bg-orange-50 dark:bg-gray-700 rounded-lg"
                      >
                        <p className="font-medium text-[#1a365d] dark:text-white mb-2">
                          练习集 #{item.practiceSetId} — 任务 {item.questionIndex + 1}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                          {item.questionText}
                        </p>
                        {item.userCode && (
                          <div className="bg-gray-900 text-green-400 p-3 rounded text-xs font-mono overflow-x-auto mb-2">
                            <pre>{item.userCode}</pre>
                          </div>
                        )}
                        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                          记录时间：{new Date(item.timestamp).toLocaleString('zh-CN')}
                        </div>
                        <div className="mt-3 flex gap-2">
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
                )}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-3">
              {history.length === 0 ? (
                <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg text-center text-gray-500 dark:text-gray-400">
                  暂无历史记录，开始你的第一题吧！
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    最近 {history.length} 条记录（按时间倒序）
                  </p>
                  {history.map((item, idx) => (
                    <div
                      key={`history-${idx}`}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-[#1a365d] dark:text-white truncate">
                          {item.action}：{item.target}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {item.date}
                        </p>
                      </div>
                      <div className="text-right ml-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
                            item.isCorrect
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {item.type === 'choice'
                            ? '选择'
                            : item.type === 'code'
                              ? '实操'
                              : '项目'}{' '}
                          · {item.isCorrect ? '通过' : '未通过'}
                        </span>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
