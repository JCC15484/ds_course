import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PracticeEditor from '../components/PracticeEditor';
import { practiceSets, getPracticeSetById } from '../data/practiceData';
import {
  recordChoiceAnswer,
  recordCodeResult,
  getRecentHistory,
  loadStore,
} from '../lib/store';

// 工具函数 - Fisher-Yates 洗牌算法
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 处理后的选择题（包含随机选项）
interface ProcessedChoice {
  id: number;
  content: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// 处理每道题 - 打乱选项，同时记录正确答案位置
function processQuestion(q: {
  id: number;
  content: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}): ProcessedChoice {
  const optionText = q.options;
  const correctText = optionText[q.correctIndex];
  const shuffled = shuffleArray(optionText);
  const newCorrectIdx = shuffled.indexOf(correctText);
  return {
    id: q.id,
    content: q.content,
    options: shuffled,
    correctIndex: newCorrectIdx,
    explanation: q.explanation,
  };
}

const Practice = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const practiceSet = useMemo(() => {
    const sid = id ? parseInt(id) : 1;
    return getPracticeSetById(sid) || practiceSets[0];
  }, [id]);

  // 选择题处理 - 在组件首次加载时随机化
  const [processedChoices, setProcessedChoices] = useState<ProcessedChoice[]>([]);
  const [currentChoiceIdx, setCurrentChoiceIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [allChoiceFinished, setAllChoiceFinished] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  // 实操题相关
  const [currentCodeIdx, setCurrentCodeIdx] = useState(0);
  const [codeScore, setCodeScore] = useState({ correct: 0, total: 0 });
  const [showCodeHint, setShowCodeHint] = useState(false);

  // 每切换到一个新的练习集，重新随机化选项
  useEffect(() => {
    if (practiceSet?.choiceQuestions) {
      const processed = practiceSet.choiceQuestions.map((q) => processQuestion(q));
      setProcessedChoices(processed);
      setCurrentChoiceIdx(0);
      setSelectedIdx(null);
      setSubmitted(false);
      setAllChoiceFinished(false);
      setScore({ correct: 0, total: 0 });
      setCurrentCodeIdx(0);
      setCodeScore({ correct: 0, total: 0 });
      setShowCodeHint(false);
    }
  }, [practiceSet]);

  // 处理选项点击
  const handleOptionSelect = (idx: number) => {
    if (submitted) return;
    setSelectedIdx(idx);
  };

  // 提交选择题 - 并写入学习记录
  const handleSubmitChoice = () => {
    if (selectedIdx === null) {
      alert('请选择一个答案');
      return;
    }
    setSubmitted(true);
    const current = processedChoices[currentChoiceIdx];
    const isCorrect = selectedIdx === current.correctIndex;
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    // 写入学习记录
    try {
      recordChoiceAnswer({
        practiceSetId: practiceSet.id,
        practiceTitle: practiceSet.title,
        questionIndex: currentChoiceIdx,
        questionText: current.content,
        selectedAnswer: current.options[selectedIdx],
        correctAnswer: current.options[current.correctIndex],
        isCorrect,
        totalChoiceQuestions: practiceSet.choiceQuestions.length,
        totalCodeQuestions: practiceSet.codeQuestions.length,
      });
    } catch (e) {
      console.warn('Failed to record choice answer:', e);
    }
  };

  // 下一题
  const handleNextChoice = () => {
    if (currentChoiceIdx < processedChoices.length - 1) {
      setCurrentChoiceIdx(currentChoiceIdx + 1);
      setSelectedIdx(null);
      setSubmitted(false);
    } else {
      setAllChoiceFinished(true);
    }
  };

  // 重新开始选择题（再次随机）
  const handleRestartChoice = () => {
    const processed = practiceSet.choiceQuestions.map((q) => processQuestion(q));
    setProcessedChoices(processed);
    setCurrentChoiceIdx(0);
    setSelectedIdx(null);
    setSubmitted(false);
    setAllChoiceFinished(false);
    setScore({ correct: 0, total: 0 });
  };

  // 代码题验证成功 - 记录
  const handleMarkCodeCorrect = () => {
    const code = practiceSet.codeQuestions[currentCodeIdx];
    try {
      recordCodeResult({
        practiceSetId: practiceSet.id,
        practiceTitle: practiceSet.title,
        questionIndex: currentCodeIdx,
        questionText: code.content,
        userCode: '(用户运行并通过验证的代码)',
        passed: true,
        totalChoiceQuestions: practiceSet.choiceQuestions.length,
        totalCodeQuestions: practiceSet.codeQuestions.length,
      });
    } catch (e) {
      console.warn('Failed to record code result:', e);
    }
    setCodeScore((prev) => ({
      correct: prev.correct + 1,
      total: prev.total + 1,
    }));
  };

  // 代码题未通过 - 仍记录但标记为未通过
  const handleMarkCodeIncorrect = () => {
    const code = practiceSet.codeQuestions[currentCodeIdx];
    try {
      recordCodeResult({
        practiceSetId: practiceSet.id,
        practiceTitle: practiceSet.title,
        questionIndex: currentCodeIdx,
        questionText: code.content,
        userCode: '(用户运行但未通过验证的代码)',
        passed: false,
        totalChoiceQuestions: practiceSet.choiceQuestions.length,
        totalCodeQuestions: practiceSet.codeQuestions.length,
      });
    } catch (e) {
      console.warn('Failed to record code result:', e);
    }
    setCodeScore((prev) => ({
      correct: prev.correct,
      total: prev.total + 1,
    }));
  };

  const handleNextCode = () => {
    if (currentCodeIdx < practiceSet.codeQuestions.length - 1) {
      setCurrentCodeIdx(currentCodeIdx + 1);
      setShowCodeHint(false);
    }
  };

  // ==================== 列表视图（不带 id 时） ====================
  if (!id) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1a365d] dark:text-white mb-2">
            📝 练习题库
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            选择一个练习集开始学习 - 每题包含选择题与代码实操两部分
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceSets.map((ps) => (
            <div
              key={ps.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
              onClick={() => navigate(`/practice/${ps.id}`)}
            >
              <div
                className={`p-5 bg-gradient-to-br ${ps.color} text-white`}
              >
                <h3 className="text-lg font-bold">{ps.title}</h3>
                <span className="text-sm opacity-90">
                  {ps.category} · {ps.difficulty}
                </span>
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {ps.description}
                </p>
                <div className="flex gap-3 text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md">
                    📝 {ps.choiceQuestions.length} 道选择题
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md">
                    💻 {ps.codeQuestions.length} 道实操题
                  </span>
                </div>
                <button
                  onClick={() => navigate(`/practice/${ps.id}`)}
                  className="w-full px-4 py-2 bg-[#4299e1] hover:bg-[#2c5282] text-white rounded-lg font-semibold transition-colors"
                >
                  开始练习 →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 历史练习记录 - 有则显示 */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-[#1a365d] dark:text-white mb-4">
            📜 最近练习记录
          </h2>
          <RecentHistoryList onNavigate={() => {}} />
        </div>
      </div>
    );
  }

  // ==================== 答题视图（带 id 时） ====================
  if (!practiceSet) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">找不到该练习</p>
        <button
          onClick={() => navigate('/practice')}
          className="px-6 py-2 bg-[#4299e1] hover:bg-[#2c5282] text-white rounded-lg font-semibold transition-colors"
        >
          返回练习列表
        </button>
      </div>
    );
  }

  const currentChoice = processedChoices[currentChoiceIdx];
  const currentCode = practiceSet.codeQuestions[currentCodeIdx];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 顶部信息 */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/practice')}
          className="text-[#4299e1] hover:text-[#2c5282] mb-4 text-sm flex items-center"
        >
          ← 返回练习列表
        </button>
        <h1 className="text-2xl font-bold text-[#1a365d] dark:text-white mb-2">
          {practiceSet.title}
        </h1>
        <div className="flex gap-3 text-sm text-gray-600 dark:text-gray-400">
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md">
            {practiceSet.category}
          </span>
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-md">
            {practiceSet.difficulty}
          </span>
        </div>
      </div>

      {/* =========== 选择题部分 =========== */}
      {!allChoiceFinished && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-[#1a365d] dark:text-white text-sm">
                第一部分 · 选择题
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                当前 {currentChoiceIdx + 1} / {processedChoices.length}
                <span className="ml-3">
                  · 已答对 {score.correct} / {score.total}
                </span>
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#4299e1] transition-all"
                style={{ width: `${((currentChoiceIdx + 1) / processedChoices.length) * 100}%` }}
              />
            </div>
          </div>

          {currentChoice && (
            <>
              <h2 className="text-xl font-semibold mb-6 text-[#1a365d] dark:text-white leading-relaxed">
                第 {currentChoiceIdx + 1} 题：{currentChoice.content}
              </h2>

              <div className="space-y-3 mb-6">
                {currentChoice.options.map((opt, idx) => {
                  const isSelected = selectedIdx === idx;
                  const isCorrectAnswer = idx === currentChoice.correctIndex;
                  let bgClass =
                    'bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 border-gray-200';
                  if (submitted) {
                    if (isCorrectAnswer) {
                      bgClass = 'bg-green-100 border-green-500 border-2';
                    } else if (isSelected) {
                      bgClass = 'bg-red-100 border-red-500 border-2';
                    } else {
                      bgClass = 'bg-gray-100 border-gray-200 opacity-60';
                    }
                  } else if (isSelected) {
                    bgClass = 'bg-blue-100 border-[#4299e1] border-2';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(idx)}
                      disabled={submitted}
                      className={`w-full p-4 rounded-lg text-left transition-all font-medium ${bgClass}`}
                    >
                      <span className="font-bold mr-2">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div
                  className={`p-4 rounded-lg mb-6 border-l-4 ${
                    selectedIdx === currentChoice.correctIndex
                      ? 'bg-green-50 border-green-500'
                      : 'bg-red-50 border-red-500'
                  }`}
                >
                  <div className="font-bold text-lg mb-2">
                    {selectedIdx === currentChoice.correctIndex
                      ? '✅ 回答正确！'
                      : '❌ 回答错误'}
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-400">
                    <span className="font-semibold">解析：</span>
                    {currentChoice.explanation}
                  </div>
                </div>
              )}

              <div className="flex gap-3 justify-end">
                {!submitted ? (
                  <button
                    onClick={handleSubmitChoice}
                    className="px-6 py-3 bg-[#4299e1] hover:bg-[#2c5282] text-white rounded-lg font-semibold transition-colors"
                  >
                    提交答案
                  </button>
                ) : (
                  <button
                    onClick={handleNextChoice}
                    className="px-6 py-3 bg-[#ed8936] hover:bg-[#dd6b20] text-white rounded-lg font-semibold transition-colors"
                  >
                    {currentChoiceIdx < processedChoices.length - 1
                      ? '下一题 →'
                      : '完成选择题'}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}

      {/* =========== 选择部分完成 + 实操题部分 =========== */}
      {allChoiceFinished && (
        <div className="bg-gradient-to-r from-[#4299e1] to-[#2c5282] text-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="text-xl font-bold mb-1">🎉 选择题部分完成！</h3>
              <p className="text-sm opacity-90">
                选择题得分：{score.correct} / {score.total}
                {'（' +
                  Math.round(
                    (score.correct / Math.max(score.total, 1)) * 100,
                  ) +
                  '%）'}
              </p>
            </div>
            <button
              onClick={handleRestartChoice}
              className="px-4 py-2 bg-white text-[#4299e1] rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm"
            >
              🔄 重新做题（再次随机选项）
            </button>
          </div>
        </div>
      )}

      {allChoiceFinished && currentCode && (
        <div className="space-y-6">
          {/* 代码题卡片 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-[#1a365d] dark:text-white text-sm">
                  第二部分 · 代码实操题
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  当前 {currentCodeIdx + 1} / {practiceSet.codeQuestions.length}
                  <span className="ml-3">
                    · 已正确 {codeScore.correct} / {codeScore.total}
                  </span>
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#ed8936] transition-all"
                  style={{
                    width: `${((currentCodeIdx + 1) / practiceSet.codeQuestions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-3 text-[#1a365d] dark:text-white">
              任务 {currentCodeIdx + 1}：{currentCode.content}
            </h2>

            {/* 提示 */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <div className="flex gap-2 justify-between items-start">
                <div className="text-sm text-gray-700 dark:text-gray-400">
                  <span className="font-semibold">💡 提示：</span>
                  {showCodeHint
                    ? currentCode.hint
                    : '点击右侧按钮查看提示（建议先自己思考后再看）'}
                </div>
                <button
                  onClick={() => setShowCodeHint(!showCodeHint)}
                  className="px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 text-xs rounded-md font-medium transition-colors flex-shrink-0"
                >
                  {showCodeHint ? '隐藏提示' : '查看提示'}
                </button>
              </div>
            </div>

            {/* 预期输出提示 */}
            {currentCode.testCases && currentCode.testCases.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 p-4 mb-4 rounded-lg">
                <p className="text-sm text-blue-800 font-semibold mb-1">
                  🎯 预期输出应包含：
                </p>
                <div className="text-xs text-blue-700 font-mono space-y-1">
                  {currentCode.testCases.map((tc, idx) => (
                    <div key={idx}>• {tc.expected}</div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 代码编辑器 - 初始为空 */}
          <PracticeEditor
            initialCode=""
            title={`代码编辑器 · 任务 ${currentCodeIdx + 1}`}
            answer={currentCode.referenceCode}
            expectedOutputs={currentCode.testCases.map((t) => t.expected)}
            enableValidate={true}
          />

          {/* 自我评估 - 用户决定是否做对 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                代码执行完毕并通过验证后，请标记你的完成状态：
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <button
                  onClick={handleMarkCodeCorrect}
                  className="px-5 py-2 bg-[#38a169] hover:bg-[#276749] text-white rounded-lg font-medium transition-colors text-sm"
                >
                  ✅ 我做对了，下一题
                </button>
                <button
                  onClick={handleMarkCodeIncorrect}
                  className="px-5 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white rounded-lg font-medium transition-colors text-sm"
                >
                  ❌ 先这样，下一题
                </button>
              </div>
            </div>

            {currentCodeIdx < practiceSet.codeQuestions.length - 1 && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleNextCode}
                  className="px-6 py-2 bg-[#ed8936] hover:bg-[#dd6b20] text-white rounded-lg font-semibold transition-colors text-sm"
                >
                  下一题 →
                </button>
              </div>
            )}

            {currentCodeIdx === practiceSet.codeQuestions.length - 1 &&
              codeScore.total > 0 && (
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 rounded-lg text-center">
                  <h3 className="text-lg font-bold text-[#1a365d] dark:text-white mb-2">
                    🏆 练习完成！
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                    选择题：{score.correct} / {score.total}　 　 代码题：
                    {codeScore.correct} / {codeScore.total}
                  </p>
                  <button
                    onClick={() => navigate('/practice')}
                    className="px-6 py-2 bg-[#4299e1] hover:bg-[#2c5282] text-white rounded-lg font-semibold transition-colors text-sm"
                  >
                    返回题库列表 →
                  </button>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
};

// 小组件：显示最近练习记录
function RecentHistoryList({
  onNavigate: _onNavigate,
}: {
  onNavigate: () => void;
}) {
  const history = getRecentHistory(10);
  if (history.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center text-gray-500 dark:text-gray-400">
        暂无练习记录，开始你的第一题吧 ✨
      </div>
    );
  }
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md divide-y dark:divide-gray-700 overflow-hidden">
      {history.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <div className="text-left">
            <p className="text-sm font-medium text-[#1a365d] dark:text-white">
              {item.action}：{item.target}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{item.date}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              item.isCorrect
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {item.isCorrect ? '正确' : '未通过'}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Practice;
