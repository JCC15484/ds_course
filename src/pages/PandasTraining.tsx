import { useState } from 'react'

const PandasTraining = () => {
  const [activeLevel, setActiveLevel] = useState(1)
  const [completedLevels, setCompletedLevels] = useState<number[]>([])
  const [expanded, setExpanded] = useState<number | null>(null)

  const trainingLevels = [
    {
      id: 1,
      title: '电商订单清洗工坊',
      phase: '第一阶段：基础清洗与重塑',
      phaseNumber: 1,
      scenario: '某Excel导出的订单表包含多余的表头行、合并单元格、缺失值标记为“/”。',
      skills: [
        'pd.read_excel 的 skiprows, header 参数精准读取脏数据',
        'df.replace 将奇怪的占位符（如 /, NULL）转化为 NaN',
        'df.dropna 处理缺失值策略'
      ],
      output: '一份行列规整、缺失值可识别的标准化DataFrame'
    },
    {
      id: 2,
      title: '销售数据的宽表变长表',
      phase: '第一阶段：基础清洗与重塑',
      phaseNumber: 1,
      scenario: '财务给的是“二维交叉表”（行是月份，列是产品），无法直接画图分析趋势。',
      skills: [
        'pd.melt 逆透视操作',
        'df.pivot_table 重塑回汇总表，理解数据形状的变换逻辑'
      ],
      output: '将宽表转为长表，方便后续 groupby 聚合'
    },
    {
      id: 3,
      title: '物联网传感器时序对齐',
      phase: '第一阶段：基础清洗与重塑',
      phaseNumber: 1,
      scenario: '两个传感器采样频率不同（一个每秒1次，一个每5秒1次），需要合并分析。',
      skills: [
        'pd.to_datetime 强制转换标准时间戳',
        'df.set_index 建立时间索引',
        'df.resample + 插值方法（ffill, interpolate）实现时间对齐'
      ],
      output: '统一频率的时间序列数据集'
    },
    {
      id: 4,
      title: '银行客户画像标签系统',
      phase: '第二阶段：逻辑运算与特征工程',
      phaseNumber: 2,
      scenario: '根据年龄、收入、贷款额生成高维度的业务标签（如：高龄高净值、青年负债比高）。',
      skills: [
        'np.select 或 pd.cut 处理多条件逻辑判断（AI时代最重要的特征工程基础）',
        'df.query 快速筛选特定客群'
      ],
      output: '为每位客户打上3个新的衍生标签列'
    },
    {
      id: 5,
      title: '脏乱的企业名称实体对齐',
      phase: '第二阶段：逻辑运算与特征工程',
      phaseNumber: 2,
      scenario: '用户手动输入的公司名带有括号、空格、大小写不一致（例如 "Huawei Tech" vs "华为技术有限公司"）。',
      skills: [
        '向量化字符串操作：df[\\\'col\\\'].str.replace, .str.lower, .str.strip',
        '利用 map 函数进行对照表清洗'
      ],
      output: '原本100个乱写的客户名，映射为20个标准集团名'
    },
    {
      id: 6,
      title: '电商A/B测试分组有效性检验',
      phase: '第二阶段：逻辑运算与特征工程',
      phaseNumber: 2,
      scenario: '实验组和对照组的用户ID是否重复？分组比例是否均衡？',
      skills: [
        'df.merge (内连接、外连接、左连接) 检查ID泄露',
        'df.groupby(\\\'group\\\')[\\\'user_id\\\'].nunique() 统计唯一值',
        'crosstab 制作列联表观察分组随机性'
      ],
      output: '一份A/B测试的数据质量审计报告（代码即报告）'
    },
    {
      id: 7,
      title: '零售业的RFM用户分层模型',
      phase: '第三阶段：分组聚合与业务洞察',
      phaseNumber: 3,
      scenario: '如何从百万行交易记录中，快速算出每个用户“最近一次消费”、“消费频率”、“消费金额”？',
      skills: [
        '核心难点：groupby 配合 agg 使用字典定义不同列的聚合函数',
        '进阶：transform 用于计算组内占比'
      ],
      output: '一张包含每个客户 R、F、M 三个维度的得分表'
    },
    {
      id: 8,
      title: '制造业生产良率动态看板',
      phase: '第三阶段：分组聚合与业务洞察',
      phaseNumber: 3,
      scenario: '每天有多个班次、多条产线，需要按“周”和“产线”维度计算平均良率。',
      skills: [
        '多级索引 MultiIndex 的操作与切片 df.xs',
        'unstack 将数据展开为更直观的表格形式'
      ],
      output: '一个透视形式的周报数据透视表'
    },
    {
      id: 9,
      title: '地理围栏与距离计算（不用For循环）',
      phase: '第四阶段：向量化运算与效率优化',
      phaseNumber: 4,
      scenario: '外卖平台有100万条订单和1000个商家，计算每个订单离最近商家的直线距离。如果用For循环遍历，代码要跑半小时。',
      skills: [
        'Pandas 核心哲学：向量化计算。利用 numpy 的广播机制 (df[\\\'lat\\\'] - center_lat)**2',
        'pd.cut 对经纬度进行粗分箱加速匹配'
      ],
      output: '体会 O(n*m) 循环逻辑与 O(1) 向量化逻辑的天壤之别。这是AI数据预处理必须掌握的性能意识'
    },
    {
      id: 10,
      title: 'AI训练前的数据管道封装',
      phase: '第四阶段：向量化运算与效率优化',
      phaseNumber: 4,
      scenario: '训练集、测试集、新来的预测数据，都需要经过完全相同的清洗步骤（缺失值填充均值、独热编码）。',
      skills: [
        '链式调用：(df.pipe(func1).pipe(func2)) 构建处理流水线',
        'pd.get_dummies 处理分类变量（为决策树模型准备）',
        'df.sample 数据抽样'
      ],
      output: '一个 process_data(raw_df) 函数，输入脏数据，输出可直接扔进 sklearn 的干净特征矩阵 X'
    }
  ]

  const toggleLevel = (id: number) => {
    setExpanded(expanded === id ? null : id)
  }

  const toggleComplete = (id: number) => {
    if (completedLevels.includes(id)) {
      setCompletedLevels(completedLevels.filter(l => l !== id))
    } else {
      setCompletedLevels([...completedLevels, id])
    }
  }

  const isPhaseCompleted = (phaseNumber: number) => {
    const phaseLevels = trainingLevels.filter(l => l.phaseNumber === phaseNumber)
    return phaseLevels.every(l => completedLevels.includes(l.id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-pixel-fade-in">
          <h1 className="text-4xl font-bold text-[#1a365d] mb-4 font-pixel">
            AI时代数据分析入门
          </h1>
          <h2 className="text-2xl font-bold text-[#4299e1] mb-4 font-pixel">
            10级闯关训练
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto font-pixel text-sm leading-relaxed">
            放弃枯燥的语法背诵，直接用真实的数据痛点驱动 Pandas 学习。
            所有项目均基于真实业务场景，覆盖数据清洗、特征工程、基础建模全链路。
            完成这10个项目后，你将具备独立使用Pandas处理数万行表格、
            并为后续机器学习准备数据的能力。
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* 阶段导航 */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[1, 2, 3, 4].map(phase => (
              <button
                key={phase}
                onClick={() => setActiveLevel((phase - 1) * 3 + 1)}
                className={`px-6 py-3 border-4 rounded-md font-pixel text-sm transition-all ${
                  isPhaseCompleted(phase)
                    ? 'bg-green-500 text-white border-green-700'
                    : 'bg-white text-[#1a365d] border-[#1a365d] hover:bg-gray-100'
                }`}
              >
                阶段 {phase}
                {isPhaseCompleted(phase) && ' ✓'}
              </button>
            ))}
          </div>

          {/* 进度展示 */}
          <div className="bg-white border-4 border-[#1a365d] rounded-md p-6 mb-10 shadow-md animate-pixel-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#1a365d] font-pixel">学习进度</h3>
              <span className="text-lg font-bold text-[#ed8936] font-pixel">
                {completedLevels.length} / {trainingLevels.length}
              </span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {trainingLevels.map(level => (
                <div
                  key={level.id}
                  className={`w-10 h-10 flex items-center justify-center border-2 rounded-md font-pixel cursor-pointer transition-all ${
                    completedLevels.includes(level.id)
                      ? 'bg-green-500 text-white border-green-700 animate-pixel-bounce'
                      : 'bg-gray-100 text-gray-600 border-gray-400 hover:bg-gray-200'
                  }`}
                  onClick={() => {
                    setActiveLevel(level.id)
                    setExpanded(level.id)
                  }}
                >
                  {level.id}
                </div>
              ))}
            </div>
          </div>

          {/* 关卡列表 */}
          <div className="space-y-6">
            {trainingLevels.map((level, index) => (
              <div
                key={level.id}
                className={`bg-white border-4 rounded-md shadow-md overflow-hidden transition-all ${
                  completedLevels.includes(level.id)
                    ? 'border-green-500 bg-green-50'
                    : 'border-[#1a365d]'
                } animate-pixel-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleLevel(level.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-md text-sm font-pixel border-2 ${
                          completedLevels.includes(level.id)
                            ? 'bg-green-500 text-white border-green-700'
                            : 'bg-[#4299e1] text-white border-[#1a365d]'
                        }`}>
                          关卡 {level.id}
                        </span>
                        <span className="text-sm text-gray-500 font-pixel">{level.phase}</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#1a365d] font-pixel mb-2">
                        {level.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleComplete(level.id)
                        }}
                        className={`px-4 py-2 border-2 rounded-md font-pixel text-sm transition-colors ${
                          completedLevels.includes(level.id)
                            ? 'bg-green-500 text-white border-green-700 hover:bg-green-600'
                            : 'bg-white text-[#1a365d] border-[#1a365d] hover:bg-gray-100'
                        }`}
                      >
                        {completedLevels.includes(level.id) ? '✓ 已完成' : '标记完成'}
                      </button>
                      <svg
                        className={`w-6 h-6 text-[#1a365d] transition-transform ${
                          expanded === level.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {expanded === level.id && (
                  <div className="px-6 pb-6 border-t-2 border-gray-200 animate-pixel-fade-in">
                    <div className="space-y-6 mt-6">
                      {/* 场景痛点 */}
                      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-md p-4">
                        <h4 className="font-bold text-yellow-800 mb-2 font-pixel">🎯 场景痛点</h4>
                        <p className="text-gray-700 font-pixel text-sm leading-relaxed">{level.scenario}</p>
                      </div>

                      {/* 训练技能 */}
                      <div className="bg-blue-50 border-2 border-blue-300 rounded-md p-4">
                        <h4 className="font-bold text-blue-800 mb-3 font-pixel">💪 训练技能</h4>
                        <ul className="space-y-2">
                          {level.skills.map((skill, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-blue-600 font-pixel mt-1">•</span>
                              <span className="text-gray-700 font-pixel text-sm leading-relaxed">{skill}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* 产出物 */}
                      <div className="bg-green-50 border-2 border-green-300 rounded-md p-4">
                        <h4 className="font-bold text-green-800 mb-2 font-pixel">📦 预期产出</h4>
                        <p className="text-gray-700 font-pixel text-sm leading-relaxed">{level.output}</p>
                      </div>

                      {/* 开始练习按钮 */}
                      <button
                        className="w-full py-4 bg-[#ed8936] text-white border-2 border-[#1a365d] rounded-md font-pixel text-sm hover:bg-[#d69e4f] transition-colors animate-pixel-bounce"
                      >
                        🚀 开始实践
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 完成庆祝区域 */}
          {completedLevels.length === trainingLevels.length && (
            <div className="mt-12 bg-gradient-to-r from-green-400 to-blue-500 border-4 border-[#1a365d] rounded-md p-8 text-center animate-pixel-fade-in">
              <div className="text-6xl mb-4 animate-pixel-bounce">🎊</div>
              <h3 className="text-3xl font-bold text-white mb-4 font-pixel">恭喜！通关完成！</h3>
              <p className="text-white font-pixel text-lg mb-6">
                你已经掌握了Pandas的核心技能，可以独立处理数据分析任务，并为AI训练准备数据！
              </p>
              <button className="px-8 py-4 bg-white text-[#1a365d] border-4 border-[#1a365d] rounded-md font-pixel text-lg hover:bg-gray-100 transition-colors animate-pixel-bounce">
                📚 继续学习进阶内容
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PandasTraining
