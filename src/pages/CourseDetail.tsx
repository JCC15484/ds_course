import { useParams, Link } from 'react-router-dom';
import PracticeEditor from '../components/PracticeEditor';

const CourseDetail = () => {
  const { id } = useParams();
  
  const course = {
    id: id || '1',
    title: 'Python基础语法入门',
    category: 'Python基础',
    difficulty: '入门',
    lessons: 20,
    students: 1523,
    description: '学习Python基本语法、变量、数据类型、控制流程等核心概念',
    progress: 30
  };

  const lessons = [
    {
      id: 1,
      title: 'Python环境搭建',
      duration: '15分钟',
      completed: true,
      type: 'video'
    },
    {
      id: 2,
      title: '变量与数据类型',
      duration: '30分钟',
      completed: true,
      type: 'video'
    },
    {
      id: 3,
      title: '条件判断',
      duration: '25分钟',
      completed: false,
      type: 'video'
    },
    {
      id: 4,
      title: '循环结构',
      duration: '35分钟',
      completed: false,
      type: 'video'
    },
    {
      id: 5,
      title: '函数基础',
      duration: '40分钟',
      completed: false,
      type: 'video'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/courses" className="text-[#4299e1] hover:text-[#2c5282]">
          ← 返回课程列表
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* 课程内容 */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
            <div className="flex gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {course.category}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {course.difficulty}
              </span>
            </div>
            
            <h1 className="text-2xl font-bold text-[#1a365d] dark:text-white mb-4">
              {course.title}
            </h1>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {course.description}
            </p>

            <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex gap-6">
                <div>
                  <div className="text-2xl font-bold text-[#1a365d] dark:text-white">{course.lessons}</div>
                  <div className="text-sm text-gray-500">总课时</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{course.students}</div>
                  <div className="text-sm text-gray-500">学习人数</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#1a365d] dark:text-white">{course.progress}%</div>
                <div className="text-sm text-gray-500">学习进度</div>
              </div>
            </div>

            {/* 课程内容 */}
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#1a365d] dark:text-white mb-4">课程内容</h2>
              <div className="prose dark:prose-invert max-w-none">
                <p>Python是一种广泛使用的高级编程语言，具有简洁易读的语法。本课程将带你从零开始学习Python基础语法。</p>
                
                <h3 className="text-lg font-semibold mt-4 mb-2">📖 知识点</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Python环境的安装与配置</li>
                  <li>变量、运算符、数据类型</li>
                  <li>条件判断语句（if-elif-else）</li>
                  <li>循环结构（for循环、while循环）</li>
                  <li>函数的定义与调用</li>
                </ul>

                <h3 className="text-lg font-semibold mt-4 mb-2">💻 示例代码</h3>
                <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg font-mono text-sm">
                  <pre className="text-green-600">{`# Python 第一个程序
print("Hello, World!")

# 变量定义
name = "Python"
age = 25

# 条件判断
if age >= 18:
    print(f"{name}已经成年了")
else:
    print(f"{name}还是未成年人")

# for循环
for i in range(5):
    print(f"第{i}次循环")`}</pre>
                </div>

                <h3 className="text-lg font-semibold mt-4 mb-2">✍️ 练习题</h3>
                <p>学完本课程后，请完成配套练习题来巩固所学知识。</p>
                <Link
                  to="/practice"
                  className="inline-block mt-2 px-4 py-2 bg-[#4299e1] hover:bg-[#2c5282] text-white rounded-lg font-medium transition-colors"
                >
                  开始练习 →
                </Link>
              </div>
            </div>
          </div>

          {/* 在线实操 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-[#1a365d] dark:text-white mb-4">💻 在线实操</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              在下方编辑器中编写代码，立即运行查看结果
            </p>
            <PracticeEditor
              initialCode={`# 在这里编写Python代码
print("Hello, Python!")

# 尝试创建一个变量并输出
name = "数据分析学习平台"
print(f"欢迎来到{name}")`}
              title="在线代码编辑器"
            />
          </div>
        </div>

        {/* 课程章节 */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-20">
            <h2 className="text-xl font-bold text-[#1a365d] dark:text-white mb-4">课程章节</h2>
            <div className="space-y-3">
              {lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    lesson.completed
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-[#4299e1]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        lesson.completed
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}>
                        {lesson.completed ? '✓' : index + 1}
                      </div>
                      <span className={`font-medium ${
                        lesson.completed
                          ? 'text-green-700 dark:text-green-300'
                          : 'text-[#1a365d] dark:text-white'
                      }`}>
                        {lesson.title}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500 ml-11">
                    <span>{lesson.type === 'video' ? '📹 视频' : '📖 文档'}</span>
                    <span>{lesson.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
