import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProjectById, projects } from '../data/projects';
import PracticeEditor from '../components/PracticeEditor';
import { recordProjectStep } from '../lib/store';

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [stepPassed, setStepPassed] = useState<boolean>(false);

  const projectId = id ? parseInt(id) : 1;
  const project = getProjectById(projectId);

  useEffect(() => {
    setCurrentStepIndex(0);
    setShowHint(false);
    setStepPassed(false);
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1a365d] dark:text-white mb-4">
            项目不存在
          </h2>
          <button
            onClick={() => navigate('/projects')}
            className="px-6 py-3 bg-[#4299e1] hover:bg-[#2c5282] text-white rounded-lg font-semibold transition-colors"
          >
            返回项目列表
          </button>
        </div>
      </div>
    );
  }

  const currentStep = project.steps[currentStepIndex];

  // 当用户在代码编辑器中点击"验证对错"后通过了，触发 onPassed 回调
  const handleEditorPassed = () => {
    setStepPassed(true);
    try {
      recordProjectStep({
        projectId: project.id,
        projectTitle: project.title,
        stepIndex: currentStepIndex,
        stepTitle: currentStep.title,
        userCode: '(用户在项目内编写并通过验证的代码)',
        passed: true,
        totalSteps: project.steps.length,
      });
    } catch (e) {
      console.warn('Failed to record project step:', e);
    }
  };

  const handleEditorFailed = () => {
    setStepPassed(false);
    try {
      recordProjectStep({
        projectId: project.id,
        projectTitle: project.title,
        stepIndex: currentStepIndex,
        stepTitle: currentStep.title,
        userCode: '(用户在项目内编写但未通过验证的代码)',
        passed: false,
        totalSteps: project.steps.length,
      });
    } catch (e) {
      console.warn('Failed to record project step:', e);
    }
  };

  const prevStep = () => {
    const newIdx = Math.max(0, currentStepIndex - 1);
    setCurrentStepIndex(newIdx);
    setStepPassed(false);
    setShowHint(false);
  };
  const nextStep = () => {
    const newIdx = Math.min(project.steps.length - 1, currentStepIndex + 1);
    setCurrentStepIndex(newIdx);
    setStepPassed(false);
    setShowHint(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 项目头部 */}
      <section className={`bg-gradient-to-r ${project.color} text-white`}>
        <div className="container mx-auto px-4 py-12">
          <button
            onClick={() => navigate('/projects')}
            className="mb-6 text-white/80 hover:text-white transition-colors flex items-center"
          >
            ← 返回项目列表
          </button>
          <div className="flex items-start gap-6 flex-wrap">
            <div className="text-6xl">{project.icon}</div>
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                {project.title}
              </h1>
              <p className="text-lg opacity-90 mb-4">{project.description}</p>
              <div className="flex gap-3 flex-wrap">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  难度：{project.difficulty}
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  时长：{project.duration}
                </span>
                {project.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 学习目标 */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold text-[#1a365d] dark:text-white mb-4">
            🎯 学习目标
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {project.learningGoals.map((goal, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-[#4299e1] font-bold mt-0.5">{index + 1}.</span>
                <span className="text-gray-700 dark:text-gray-300">{goal}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 步骤导航和内容区域 */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-6">
            {/* 左侧步骤导航 */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sticky top-4">
                <h3 className="font-bold text-[#1a365d] dark:text-white mb-4">
                  📋 学习步骤
                </h3>
                <div className="space-y-2">
                  {project.steps.map((step, index) => (
                    <button
                      key={step.id}
                      onClick={() => {
                        setCurrentStepIndex(index);
                        setShowHint(false);
                        setStepPassed(false);
                      }}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        currentStepIndex === index
                          ? 'bg-[#4299e1] text-white'
                          : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      <div className="font-medium text-sm">
                        步骤 {index + 1}
                      </div>
                      <div className="text-xs opacity-80 truncate">
                        {step.title}
                      </div>
                    </button>
                  ))}
                </div>

                {/* 进度 */}
                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    学习进度：{currentStepIndex + 1}/ {project.steps.length}
                  </div>
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#4299e1] transition-all"
                      style={{
                        width: `${((currentStepIndex + 1) / project.steps.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 右侧内容 */}
            <div className="lg:col-span-9 space-y-6">
              {/* 当前步骤说明 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-sm text-[#4299e1] font-semibold">
                      步骤 {currentStepIndex + 1} / {project.steps.length}
                    </span>
                    <h2 className="text-xl font-bold text-[#1a365d] dark:text-white mt-1">
                      {currentStep.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="px-4 py-2 bg-[#ed8936] hover:bg-[#dd6b20] text-white rounded-lg text-sm transition-colors"
                  >
                    {showHint ? '隐藏说明' : '查看说明'}
                  </button>
                </div>

                {showHint && (
                  <div className="mb-4 p-4 bg-yellow-50 dark:bg-gray-700 rounded-lg border-l-4 border-yellow-400">
                    <p className="text-gray-700 dark:text-gray-300">
                      {currentStep.description}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      预期输出应包含：{currentStep.expectedOutput}
                    </p>
                  </div>
                )}

                <p className="text-gray-600 dark:text-gray-400">
                  {currentStep.description}
                </p>

                {stepPassed && (
                  <div className="mt-4 p-3 bg-green-50 border-l-4 border-green-500 rounded">
                    <p className="text-sm font-medium text-green-800">
                      ✅ 本步骤已通过验证，进度已保存
                    </p>
                  </div>
                )}
              </div>

              {/* 代码编辑器 - 初始为空，用户自己编写 */}
              <PracticeEditor
                initialCode=""
                title={`${currentStep.title} - 在线练习`}
                answer={currentStep.codeTemplate}
                expectedOutputs={[currentStep.expectedOutput]}
                enableValidate={true}
                onPassed={handleEditorPassed}
                onFailed={handleEditorFailed}
              />

              {/* 步骤导航 */}
              <div className="flex justify-between items-center">
                <button
                  onClick={prevStep}
                  disabled={currentStepIndex === 0}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                >
                  ← 上一步
                </button>

                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {currentStepIndex + 1} / {project.steps.length}
                </span>

                <button
                  onClick={nextStep}
                  disabled={currentStepIndex === project.steps.length - 1}
                  className="px-6 py-3 bg-[#4299e1] hover:bg-[#2c5282] text-white rounded-lg font-semibold transition-colors disabled:opacity-50"
                >
                  下一步 →
                </button>
              </div>

              {/* 其他项目推荐 */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-600">
                <h3 className="text-xl font-bold text-[#1a365d] dark:text-white mb-6">
                  📚 推荐继续学习
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {projects
                    .filter((p) => p.id !== projectId)
                    .slice(0, 3)
                    .map((p) => (
                      <Link
                        key={p.id}
                        to={`/projects/${p.id}`}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden"
                      >
                        <div className={`p-4 bg-gradient-to-br ${p.color} text-white`}>
                          <div className="text-4xl">{p.icon}</div>
                        </div>
                        <div className="p-4">
                          <h4 className="font-bold text-[#1a365d] dark:text-white mb-2">
                            {p.title}
                          </h4>
                          <div className="flex gap-2 text-xs">
                            <span className="text-gray-500 dark:text-gray-400">
                              {p.difficulty}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400">
                              · {p.duration}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
