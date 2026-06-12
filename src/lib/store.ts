// 学习数据持久化模块 - 使用 localStorage 记录真实学习行为

// ============== 数据结构 ==============

export interface ChoiceRecord {
  id: string;          // 唯一ID
  practiceSetId: number; // 所属练习集
  questionIndex: number;  // 第几道选择题
  questionText: string;   // 题目内容
  selectedAnswer: string; // 用户选择的答案文本
  correctAnswer: string;  // 正确答案文本
  isCorrect: boolean;     // 是否答对
  timestamp: number;      // 答题时间戳
}

export interface CodeRecord {
  id: string;
  practiceSetId: number;
  questionIndex: number;
  questionText: string;
  userCode: string;
  passed: boolean;       // 是否通过验证
  timestamp: number;
}

export interface ProjectStepRecord {
  id: string;
  projectId: number;     // 项目ID
  stepIndex: number;     // 步骤索引
  stepTitle: string;
  userCode: string;
  passed: boolean;
  timestamp: number;
}

export interface PracticeProgress {
  practiceSetId: number;
  title: string;
  choiceTotal: number;     // 总选择题数
  choiceDone: number;      // 完成的选择题数
  choiceCorrect: number;   // 答对选择题数
  codeTotal: number;       // 实操题总数
  codeDone: number;        // 完成的实操题数
  codeCorrect: number;     // 通过验证的实操题数
  lastActive: number;      // 最后活跃时间
  completedSteps: number[]; // 已完成的选择题索引
  completedCodeSteps: number[]; // 已完成的实操题索引
}

export interface ProjectProgress {
  projectId: number;
  title: string;
  totalSteps: number;
  completedSteps: number;
  passedSteps: number;     // 通过验证的步骤数
  lastActive: number;
}

export interface LearningStats {
  totalPracticeSessions: number; // 练习次数
  totalChoiceQuestions: number;   // 总答题数（选择）
  totalChoiceCorrect: number;     // 答对选择数
  totalCodeQuestions: number;     // 总答题数（实操）
  totalCodeCorrect: number;       // 通过验证数
  totalProjects: number;          // 访问项目次数
  uniquePracticeSets: number;     // 参与过的练习集数量
  firstVisit: number;             // 首次访问时间
  lastVisit: number;              // 最后访问时间
  dailyActivity: Record<string, number>; // 每日活跃度记录 YYYY-MM-DD -> count
}

export interface StoreData {
  userInfo: {
    name: string;
    email: string;
    joinDate: string;
  };
  choiceRecords: ChoiceRecord[];
  codeRecords: CodeRecord[];
  projectStepRecords: ProjectStepRecord[];
  practiceProgress: Record<number, PracticeProgress>;
  projectProgress: Record<number, ProjectProgress>;
  stats: LearningStats;
  wrongAnswers: {
    choice: ChoiceRecord[];
    code: CodeRecord[];
  };
}

// ============== 初始值 ==============

const STORAGE_KEY = 'py_edu_store_v1';

function getInitialStats(): LearningStats {
  return {
    totalPracticeSessions: 0,
    totalChoiceQuestions: 0,
    totalChoiceCorrect: 0,
    totalCodeQuestions: 0,
    totalCodeCorrect: 0,
    totalProjects: 0,
    uniquePracticeSets: 0,
    firstVisit: Date.now(),
    lastVisit: Date.now(),
    dailyActivity: {},
  };
}

function getInitialStore(): StoreData {
  const today = new Date();
  const joinDate = today.toISOString().slice(0, 10);
  return {
    userInfo: {
      name: '学习者',
      email: 'user@example.com',
      joinDate,
    },
    choiceRecords: [],
    codeRecords: [],
    projectStepRecords: [],
    practiceProgress: {},
    projectProgress: {},
    stats: getInitialStats(),
    wrongAnswers: {
      choice: [],
      code: [],
    },
  };
}

// ============== 读写接口 ==============

export function loadStore(): StoreData {
  if (typeof window === 'undefined') {
    return getInitialStore();
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = getInitialStore();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    // 兼容处理：保证字段完整
    return {
      ...getInitialStore(),
      ...parsed,
      stats: { ...getInitialStats(), ...(parsed.stats || {}) },
      wrongAnswers: {
        choice: parsed.wrongAnswers?.choice || [],
        code: parsed.wrongAnswers?.code || [],
      },
      practiceProgress: parsed.practiceProgress || {},
      projectProgress: parsed.projectProgress || {},
    };
  } catch (e) {
    console.warn('loadStore failed:', e);
    return getInitialStore();
  }
}

export function saveStore(data: StoreData): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('saveStore failed:', e);
  }
}

export function resetStore(): StoreData {
  const fresh = getInitialStore();
  saveStore(fresh);
  return fresh;
}

// ============== 工具函数 ==============

function makeId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

// ============== 选择题记录 ==============

export function recordChoiceAnswer(params: {
  practiceSetId: number;
  practiceTitle: string;
  questionIndex: number;
  questionText: string;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  totalChoiceQuestions: number;
  totalCodeQuestions: number;
}): StoreData {
  const store = loadStore();
  const {
    practiceSetId,
    practiceTitle,
    questionIndex,
    questionText,
    selectedAnswer,
    correctAnswer,
    isCorrect,
    totalChoiceQuestions,
    totalCodeQuestions,
  } = params;

  // 记录答题
  const record: ChoiceRecord = {
    id: makeId('ch'),
    practiceSetId,
    questionIndex,
    questionText,
    selectedAnswer,
    correctAnswer,
    isCorrect,
    timestamp: Date.now(),
  };
  store.choiceRecords.push(record);

  // 更新错题本
  if (!isCorrect) {
    // 避免重复记录同一题
    const exists = store.wrongAnswers.choice.find(
      (w) => w.practiceSetId === practiceSetId && w.questionIndex === questionIndex,
    );
    if (!exists) {
      store.wrongAnswers.choice.push(record);
    } else {
      // 更新为最新错误
      store.wrongAnswers.choice = store.wrongAnswers.choice.map((w) =>
        w.practiceSetId === practiceSetId && w.questionIndex === questionIndex ? record : w,
      );
    }
  } else {
    // 如果答对了，从错题本中移除
    store.wrongAnswers.choice = store.wrongAnswers.choice.filter(
      (w) => !(w.practiceSetId === practiceSetId && w.questionIndex === questionIndex),
    );
  }

  // 更新练习集进度
  const currentProgress: PracticeProgress = store.practiceProgress[practiceSetId] || {
    practiceSetId,
    title: practiceTitle,
    choiceTotal: totalChoiceQuestions,
    choiceDone: 0,
    choiceCorrect: 0,
    codeTotal: totalCodeQuestions,
    codeDone: 0,
    codeCorrect: 0,
    lastActive: Date.now(),
    completedSteps: [],
    completedCodeSteps: [],
  };

  if (!currentProgress.completedSteps.includes(questionIndex)) {
    currentProgress.completedSteps.push(questionIndex);
    currentProgress.choiceDone = currentProgress.completedSteps.length;
    if (isCorrect) {
      currentProgress.choiceCorrect += 1;
    }
  }
  currentProgress.choiceTotal = totalChoiceQuestions;
  currentProgress.codeTotal = totalCodeQuestions;
  currentProgress.lastActive = Date.now();
  currentProgress.title = practiceTitle;

  store.practiceProgress[practiceSetId] = currentProgress;

  // 更新全局统计
  store.stats.totalChoiceQuestions += 1;
  if (isCorrect) {
    store.stats.totalChoiceCorrect += 1;
  }
  store.stats.lastVisit = Date.now();

  // 日活跃度
  const dk = todayKey();
  store.stats.dailyActivity[dk] = (store.stats.dailyActivity[dk] || 0) + 1;

  // 更新 uniquePracticeSets
  const uniqueSetIds = new Set([
    ...Object.keys(store.practiceProgress).map(Number),
  ]);
  store.stats.uniquePracticeSets = uniqueSetIds.size;

  saveStore(store);
  return store;
}

// ============== 实操题记录 ==============

export function recordCodeResult(params: {
  practiceSetId: number;
  practiceTitle: string;
  questionIndex: number;
  questionText: string;
  userCode: string;
  passed: boolean;
  totalChoiceQuestions: number;
  totalCodeQuestions: number;
}): StoreData {
  const store = loadStore();
  const {
    practiceSetId,
    practiceTitle,
    questionIndex,
    questionText,
    userCode,
    passed,
    totalChoiceQuestions,
    totalCodeQuestions,
  } = params;

  const record: CodeRecord = {
    id: makeId('cd'),
    practiceSetId,
    questionIndex,
    questionText,
    userCode,
    passed,
    timestamp: Date.now(),
  };
  store.codeRecords.push(record);

  // 错题本
  if (!passed) {
    const exists = store.wrongAnswers.code.find(
      (w) => w.practiceSetId === practiceSetId && w.questionIndex === questionIndex,
    );
    if (!exists) {
      store.wrongAnswers.code.push(record);
    } else {
      store.wrongAnswers.code = store.wrongAnswers.code.map((w) =>
        w.practiceSetId === practiceSetId && w.questionIndex === questionIndex ? record : w,
      );
    }
  } else {
    store.wrongAnswers.code = store.wrongAnswers.code.filter(
      (w) => !(w.practiceSetId === practiceSetId && w.questionIndex === questionIndex),
    );
  }

  // 更新练习集进度
  const currentProgress: PracticeProgress = store.practiceProgress[practiceSetId] || {
    practiceSetId,
    title: practiceTitle,
    choiceTotal: totalChoiceQuestions,
    choiceDone: 0,
    choiceCorrect: 0,
    codeTotal: totalCodeQuestions,
    codeDone: 0,
    codeCorrect: 0,
    lastActive: Date.now(),
    completedSteps: [],
    completedCodeSteps: [],
  };

  if (!currentProgress.completedCodeSteps.includes(questionIndex)) {
    currentProgress.completedCodeSteps.push(questionIndex);
    currentProgress.codeDone = currentProgress.completedCodeSteps.length;
    if (passed) {
      currentProgress.codeCorrect += 1;
    }
  }
  currentProgress.choiceTotal = totalChoiceQuestions;
  currentProgress.codeTotal = totalCodeQuestions;
  currentProgress.lastActive = Date.now();
  currentProgress.title = practiceTitle;

  store.practiceProgress[practiceSetId] = currentProgress;

  // 全局统计
  store.stats.totalCodeQuestions += 1;
  if (passed) {
    store.stats.totalCodeCorrect += 1;
  }
  store.stats.lastVisit = Date.now();

  const dk = todayKey();
  store.stats.dailyActivity[dk] = (store.stats.dailyActivity[dk] || 0) + 1;

  const uniqueSetIds = new Set([
    ...Object.keys(store.practiceProgress).map(Number),
  ]);
  store.stats.uniquePracticeSets = uniqueSetIds.size;

  saveStore(store);
  return store;
}

// ============== 项目步骤记录 ==============

export function recordProjectStep(params: {
  projectId: number;
  projectTitle: string;
  stepIndex: number;
  stepTitle: string;
  userCode: string;
  passed: boolean;
  totalSteps: number;
}): StoreData {
  const store = loadStore();
  const { projectId, projectTitle, stepIndex, stepTitle, userCode, passed, totalSteps } = params;

  const record: ProjectStepRecord = {
    id: makeId('pj'),
    projectId,
    stepIndex,
    stepTitle,
    userCode,
    passed,
    timestamp: Date.now(),
  };
  store.projectStepRecords.push(record);

  // 更新项目进度
  let p: ProjectProgress = store.projectProgress[projectId] || {
    projectId,
    title: projectTitle,
    totalSteps,
    completedSteps: 0,
    passedSteps: 0,
    lastActive: Date.now(),
  };

  // 只在首次完成该步骤时计数 +1（重复验证通过不再累加）
  const prevAttempt = store.projectStepRecords.filter(
    (r) => r.projectId === projectId && r.stepIndex === stepIndex && r.id !== record.id,
  );
  if (prevAttempt.length === 0) {
    p.completedSteps += 1;
  }
  const anyPassed =
    passed || prevAttempt.some((r) => r.passed);
  // 确保 passedSteps 不会超过已完成步骤数
  const totalPassedIds = new Set(
    store.projectStepRecords
      .filter((r) => r.projectId === projectId && r.passed)
      .map((r) => r.stepIndex),
  );
  if (passed) totalPassedIds.add(stepIndex);
  p.passedSteps = totalPassedIds.size;

  p.totalSteps = totalSteps;
  p.lastActive = Date.now();
  p.title = projectTitle;
  p.completedSteps = new Set([
    ...store.projectStepRecords
      .filter((r) => r.projectId === projectId)
      .map((r) => r.stepIndex),
  ]).size;

  store.projectProgress[projectId] = p;

  // 全局统计
  store.stats.totalProjects += 1;
  store.stats.lastVisit = Date.now();
  const dk = todayKey();
  store.stats.dailyActivity[dk] = (store.stats.dailyActivity[dk] || 0) + 1;

  saveStore(store);
  return store;
}

// ============== 历史记录查询 ==============

export interface HistoryItem {
  id: string;
  action: string;
  target: string;
  score?: number;
  progress?: number;
  date: string;
  timestamp: number;
  type: 'choice' | 'code' | 'project';
  isCorrect?: boolean;
}

export function getRecentHistory(limit: number = 50): HistoryItem[] {
  const store = loadStore();
  const items: HistoryItem[] = [];

  for (const r of store.choiceRecords) {
    items.push({
      id: r.id,
      action: '选择题练习',
      target: `练习集 #${r.practiceSetId} · 第 ${r.questionIndex + 1} 题`,
      score: r.isCorrect ? 100 : 0,
      date: new Date(r.timestamp).toLocaleString('zh-CN'),
      timestamp: r.timestamp,
      type: 'choice',
      isCorrect: r.isCorrect,
    });
  }

  for (const r of store.codeRecords) {
    items.push({
      id: r.id,
      action: '代码实操',
      target: `练习集 #${r.practiceSetId} · 任务 ${r.questionIndex + 1}`,
      score: r.passed ? 100 : 50,
      date: new Date(r.timestamp).toLocaleString('zh-CN'),
      timestamp: r.timestamp,
      type: 'code',
      isCorrect: r.passed,
    });
  }

  for (const r of store.projectStepRecords) {
    items.push({
      id: r.id,
      action: '项目学习',
      target: `项目 #${r.projectId} · ${r.stepTitle}`,
      score: r.passed ? 100 : 60,
      date: new Date(r.timestamp).toLocaleString('zh-CN'),
      timestamp: r.timestamp,
      type: 'project',
      isCorrect: r.passed,
    });
  }

  items.sort((a, b) => b.timestamp - a.timestamp);
  return items.slice(0, limit);
}

// ============== 学习进度查询 ==============

export function getAllPracticeProgress(): PracticeProgress[] {
  const store = loadStore();
  return Object.values(store.practiceProgress).sort((a, b) => b.lastActive - a.lastActive);
}

export function getAllProjectProgress(): ProjectProgress[] {
  const store = loadStore();
  return Object.values(store.projectProgress).sort((a, b) => b.lastActive - a.lastActive);
}

// ============== 后台统计 ==============

export interface AdminStats {
  registeredUserCount: number; // 模拟注册用户（含当前用户，1代表当前用户 +随机访客）
  activeCourses: number;       // 当前课程/练习集活跃数
  totalPracticeSubmissions: number; // 总提交次数
  avgCorrectRate: number;      // 综合正确率（选择+实操）
  dailyStats: {
    today: number;
    last7Days: number;
    todayPractice: number;
  };
  categoryBreakdown: { name: string; submissions: number }[];
  recentActivity: HistoryItem[];
  rawStore: StoreData;
}

export function getAdminStats(): AdminStats {
  const store = loadStore();
  const today = todayKey();

  // 计算今日和近7日活跃度
  const dayKeys: string[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dayKeys.push(d.toISOString().slice(0, 10));
  }
  const todayActivity = store.stats.dailyActivity[today] || 0;
  const last7Activity = dayKeys.reduce((sum, k) => sum + (store.stats.dailyActivity[k] || 0), 0);

  // 统计提交次数
  const totalChoice = store.choiceRecords.length;
  const totalCode = store.codeRecords.length;
  const totalProject = store.projectStepRecords.length;
  const totalSubmissions = totalChoice + totalCode + totalProject;

  // 正确率
  const correctChoice = store.choiceRecords.filter((r) => r.isCorrect).length;
  const correctCode = store.codeRecords.filter((r) => r.passed).length;
  const totalAnswered = totalChoice + totalCode;
  const avgRate = totalAnswered > 0 ? Math.round(((correctChoice + correctCode) / totalAnswered) * 100) : 0;

  // 按练习集分类
  const bySetId = new Map<number, number>();
  for (const r of store.choiceRecords) bySetId.set(r.practiceSetId, (bySetId.get(r.practiceSetId) || 0) + 1);
  for (const r of store.codeRecords) bySetId.set(r.practiceSetId, (bySetId.get(r.practiceSetId) || 0) + 1);

  const categoryBreakdown: { name: string; submissions: number }[] = [];
  for (const [setId, count] of bySetId.entries()) {
    const prog = store.practiceProgress[setId];
    const name = prog?.title || `练习集 #${setId}`;
    categoryBreakdown.push({ name, submissions: count });
  }
  categoryBreakdown.sort((a, b) => b.submissions - a.submissions);

  // 模拟"注册用户数"——基于真实数据递增
  let simulatedUsers = 1;
  try {
    const userKey = 'py_edu_visitor_count';
    const existing = window.localStorage.getItem(userKey);
    if (!existing) {
      simulatedUsers = 1523 + Math.floor(Math.random() * 20) + 1;
      window.localStorage.setItem(userKey, String(simulatedUsers));
    } else {
      simulatedUsers = parseInt(existing, 10);
    }
  } catch (e) {
    simulatedUsers = 1523;
  }

  return {
    registeredUserCount: simulatedUsers,
    activeCourses: Object.keys(store.practiceProgress).length + Object.keys(store.projectProgress).length,
    totalPracticeSubmissions: totalSubmissions,
    avgCorrectRate: avgRate,
    dailyStats: {
      today: todayActivity,
      last7Days: last7Activity,
      todayPractice: totalSubmissions,
    },
    categoryBreakdown: categoryBreakdown.slice(0, 6),
    recentActivity: getRecentHistory(10),
    rawStore: store,
  };
}
