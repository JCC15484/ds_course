import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PracticeEditor from '../components/PracticeEditor';

interface Question {
  id: number;
  type: 'choice' | 'code';
  content: string;
  options?: string[];
  correctAnswer?: string | string[];
  explanation?: string;
  codeTemplate?: string;
  testCases?: { input: string; expected: string }[];
}

interface PracticeData {
  id: number;
  title: string;
  category: string;
  difficulty: string;
  questions: Question[];
}

const Practice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [choiceCompleted, setChoiceCompleted] = useState(false);
  const [codeSubmitted, setCodeSubmitted] = useState(false);
  const [codeScore, setCodeScore] = useState(0);
  
  const practiceData: PracticeData = {
    id: 1,
    title: 'Python基础 - 列表操作练习',
    category: 'Python基础',
    difficulty: '入门',
    questions: [
      {
        id: 1,
        type: 'choice',
        content: '下列哪个选项可以创建一个空列表？',
        options: ['A. list()', 'B. {}', 'C. ()', 'D. None'],
        correctAnswer: 'A',
        explanation: 'list() 或 [] 可以创建空列表，{} 创建空字典，() 创建空元组。'
      },
      {
        id: 2,
        type: 'choice',
        content: '如何获取列表 [1, 2, 3, 4, 5] 的最后一个元素？',
        options: ['A. list[-1]', 'B. list[-0]', 'C. list[5]', 'D. list[last]'],
        correctAnswer: 'A',
        explanation: '列表索引从0开始，-1表示倒数第一个元素，即最后一个元素。'
      },
      {
        id: 3,
        type: 'code',
        content: '任务要求：请创建一个包含数字1-5的列表，然后向其中添加数字6，最后输出列表。',
        codeTemplate: `# 请完成以下任务：
# 1. 创建一个包含数字1, 2, 3, 4, 5的列表
my_list = 

# 2. 向列表中添加数字6
my_list.

# 3. 输出列表
print(my_list)
`,
        testCases: [
          { input: '', expected: '[1, 2, 3, 4, 5, 6]' }
        ]
      }
    ]
  };

  const currentQuestion = practiceData.questions[currentQuestionIndex];
  const choiceQuestions = practiceData.questions.filter(q => q.type === 'choice');
  const codeQuestion = practiceData.questions.find(q => q.type === 'code');

  const handleOptionSelect = (option: string) => {
    if (submitted) return;
    
    const question = choiceQuestions[currentQuestionIndex];
    if (question.options && question.options[0]?.includes('单选')) {
      setSelectedAnswers([option]);
    } else {
      if (selectedAnswers.includes(option)) {
        setSelectedAnswers(selectedAnswers.filter(a => a !== option));
      } else {
        setSelectedAnswers([...selectedAnswers, option]);
      }
    }
  };

  const handleSubmitChoice = () => {
    if (selectedAnswers.length === 0) {
      alert('请选择答案');
      return;
    }

    const question = choiceQuestions[currentQuestionIndex];
    const correct = Array.isArray(question.correctAnswer) 
      ? JSON.stringify(selectedAnswers.sort()) === JSON.stringify(question.correctAnswer.sort())
      : selectedAnswers.includes(question.correctAnswer as string);

    setIsCorrect(correct);
    setSubmitted(true);

    if (!correct) {
      console.log('错题记录:', {
        questionId: question.id,
        userAnswer: selectedAnswers,
        correctAnswer: question.correctAnswer,
        timestamp: new Date().toISOString()
      });
    }
  };

  const handleNextChoice = () => {
    if (currentQuestionIndex < choiceQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswers([]);
      setSubmitted(false);
      setIsCorrect(false);
    } else {
      setChoiceCompleted(true);
    }
  };

  const handleCodeSubmit = (code: string, output: string) => {
    const testCase = codeQuestion?.testCases?.[0];
    if (testCase && output.includes(testCase.expected.replace(/[\[\] ]/g, ''))) {
      setCodeScore(100);
    } else {
      setCodeScore(0);
    }
    setCodeSubmitted(true);
  };

  const handleReset = () => {
    setCodeSubmitted(false);
    setCodeScore(0);
  };

  if (id) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <button 
              onClick={() => navigate('/practice')}
              className="text-[#4299e1] hover:text-[#2c5282] mb-4 flex items-center"
            >
              ← 返回题库
            </button>
            <h1 className="text-2xl font-bold text-[#1a365d] dark:text-white">
              {practiceData.title}
            </h1>
            <div className="flex gap-2 mt-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {practiceData.category}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {practiceData.difficulty}
              </span>
            </div>
          </div>

          {!choiceCompleted ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
              <div className="mb-4">
                <span className="text-sm text-gray-500">
                  知识点选择题 ({currentQuestionIndex + 1}/{choiceQuestions.length})
                </span>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-[#4299e1] h-2 rounded-full transition-all"
                    style={{ width: `${((currentQuestionIndex + 1) / choiceQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-6 text-[#1a365d] dark:text-white">
                {currentQuestion.content}
              </h2>

              <div className="space-y-3 mb-6">
                {currentQuestion.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    disabled={submitted}
                    className={`w-full p-4 rounded-lg text-left transition-all ${
                      submitted
                        ? option === currentQuestion.correctAnswer
                          ? 'bg-green-100 border-2 border-green-500'
                          : selectedAnswers.includes(option)
                          ? 'bg-red-100 border-2 border-red-500'
                          : 'bg-gray-100 border-2 border-transparent'
                        : selectedAnswers.includes(option)
                        ? 'bg-blue-100 border-2 border-[#4299e1]'
                        : 'bg-gray-50 border-2 border-gray-200 hover:border-[#4299e1]'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {submitted && (
                <div className={`p-4 rounded-lg mb-6 ${
                  isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-center mb-2">
                    <span className={`text-2xl mr-2 ${isCorrect ? '✅' : '❌'}`}>
                      {isCorrect ? '✅' : '❌'}
                    </span>
                    <span className={`font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      {isCorrect ? '回答正确！' : '回答错误'}
                    </span>
                  </div>
                  {!isCorrect && (
                    <div className="text-sm text-gray-600 mt-2">
                      <p className="font-semibold">正确答案：{currentQuestion.correctAnswer}</p>
                    </div>
                  )}
                  <div className="text-sm text-gray-600 mt-2">
                    <p className="font-semibold">📖 知识点解析：</p>
                    <p>{currentQuestion.explanation}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
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
                    {currentQuestionIndex < choiceQuestions.length - 1 ? '下一题' : '完成选择题'}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-[#4299e1] to-[#2c5282] rounded-xl shadow-lg p-6 mb-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">🎉 选择题已完成</h3>
                  <p className="opacity-90">现在可以进入代码实操题</p>
                </div>
                <button
                  onClick={() => setCurrentQuestionIndex(choiceQuestions.length)}
                  className="px-6 py-3 bg-white text-[#4299e1] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  开始实操题 →
                </button>
              </div>
            </div>
          )}

          {choiceCompleted && codeQuestion && currentQuestionIndex === choiceQuestions.length && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="mb-4">
                <span className="text-sm text-gray-500">代码实操题</span>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-[#ed8936] h-2 rounded-full w-full" />
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-4 text-[#1a365d] dark:text-white">
                {codeQuestion.content}
              </h2>

              {codeQuestion.testCases && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-blue-800">
                    <strong>预期输出：</strong> {codeQuestion.testCases[0].expected}
                  </p>
                </div>
              )}

              <PracticeEditor
                initialCode={codeQuestion.codeTemplate}
                title="在线代码编辑器"
                answer={`# 参考答案：
my_list = [1, 2, 3, 4, 5]
my_list.append(6)
print(my_list)`}
              />

              {codeSubmitted && (
                <div className={`mt-4 p-4 rounded-lg ${
                  codeScore === 100 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">{codeScore === 100 ? '🎉' : '😢'}</span>
                    <div>
                      <p className={`font-bold ${codeScore === 100 ? 'text-green-700' : 'text-red-700'}`}>
                        {codeScore === 100 ? '答案正确！得分：100分' : '答案错误，请检查代码'}
                      </p>
                      {codeScore !== 100 && (
                        <p className="text-sm text-gray-600 mt-1">
                          点击"查看答案"按钮查看参考代码
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors"
                >
                  重置
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  const categories = [
    { name: 'Python基础题库', count: 50, color: 'from-green-400 to-green-600' },
    { name: '数值计算题库', count: 35, color: 'from-blue-400 to-blue-600' },
    { name: '表格处理题库', count: 45, color: 'from-purple-400 to-purple-600' },
    { name: '数据清洗题库', count: 30, color: 'from-orange-400 to-orange-600' },
    { name: '图表制作题库', count: 25, color: 'from-pink-400 to-pink-600' },
    { name: '综合练习题库', count: 20, color: 'from-indigo-400 to-indigo-600' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a365d] dark:text-white mb-2">
          📝 练习题库
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          选择知识点分类，开始练习
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
          >
            <div className={`bg-gradient-to-br ${category.color} p-6 text-white`}>
              <h3 className="text-xl font-bold mb-2">{category.name}</h3>
              <p className="opacity-90">{category.count} 道练习题</p>
            </div>
            <div className="p-4">
              <button
                onClick={() => navigate(`/practice/${index + 1}`)}
                className="w-full px-4 py-2 bg-[#4299e1] hover:bg-[#2c5282] text-white rounded-lg font-semibold transition-colors"
              >
                开始练习
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-yellow-800 mb-2">📌 练习说明</h3>
        <ul className="text-sm text-yellow-700 space-y-2">
          <li>• 每道练习题包含知识点选择题和代码实操题两部分</li>
          <li>• 必须先完成选择题，才能解锁代码实操题</li>
          <li>• 选择题自动批改，提交后可查看正确答案和解析</li>
          <li>• 代码实操题支持在线编写、运行、调试</li>
          <li>• 做错的题目会自动记录到错题本，方便复习</li>
        </ul>
      </div>
    </div>
  );
};

export default Practice;
