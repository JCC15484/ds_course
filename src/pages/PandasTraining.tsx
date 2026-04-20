import { useState } from 'react'
import { Link } from 'react-router-dom'

const PandasTraining = () => {
  const [activeLevel, setActiveLevel] = useState(1)
  const [completedLevels, setCompletedLevels] = useState<number[]>([])
  const [expanded, setExpanded] = useState<number | null>(null)
  const [activeDifficulty, setActiveDifficulty] = useState<'easy' | 'medium' | 'hard' | 'all'>('all')

  const trainingLevels = [
    // 第一部分：基础入门项目 (简单)
    {
      id: 1,
      title: 'CSV 文件的精准读入与乱码处理',
      difficulty: 'easy',
      phase: '第一部分：基础入门项目',
      scenario: '从网页下载的 CSV 用 Excel 打开是乱码，且包含多余的表头说明行。',
      skills: [
        'pd.read_csv() 的 encoding 参数（尝试 gbk, utf-8）',
        'skiprows 跳过无用行，header 指定列名行',
        'df.head() / df.tail() 快速预览'
      ],
      output: '正确读取并预览数据，无乱码'
    },
    {
      id: 2,
      title: '脏数据的标准缺失值识别',
      difficulty: 'easy',
      phase: '第一部分：基础入门项目',
      scenario: '数据录入人员用 "暂无"、"NULL"、" " 或 "-" 表示没有数据。',
      skills: [
        'df.replace() 将非标准占位符统一替换为 np.nan',
        'df.isnull().sum() 统计每列缺失值数量'
      ],
      output: '标准化的缺失值识别结果'
    },
    {
      id: 3,
      title: '列名标准化与清理',
      difficulty: 'easy',
      phase: '第一部分：基础入门项目',
      scenario: '列名包含空格、中文括号、特殊符号（如 "销售额 (元)"），导致代码引用报错。',
      skills: [
        'df.columns 属性直接修改',
        '列表推导式结合 .str.replace() 批量去除空格和下划线'
      ],
      output: '干净的列名，便于代码引用'
    },
    {
      id: 4,
      title: '基本数据类型转换',
      difficulty: 'easy',
      phase: '第一部分：基础入门项目',
      scenario: '从 Excel 读取后，数字变成了 object 类型，无法直接求和。',
      skills: [
        'pd.to_numeric() 强制转换，errors=\'coerce\' 处理顽固字符',
        'df.dtypes 检查数据类型'
      ],
      output: '正确的数据类型，可直接进行数值运算'
    },
    {
      id: 5,
      title: '按条件快速筛选行',
      difficulty: 'easy',
      phase: '第一部分：基础入门项目',
      scenario: '需要找出"销售额大于5000"或"地区属于华北"的所有记录。',
      skills: [
        '布尔索引：df[df[\'Sales\'] > 5000]',
        'isin() 方法：df[df[\'Region\'].isin([\'North\', \'East\'])]'
      ],
      output: '符合条件的筛选结果'
    },
    {
      id: 6,
      title: '单列数据的排序与极值查看',
      difficulty: 'easy',
      phase: '第一部分：基础入门项目',
      scenario: '老板要看销量最高的前10名产品，以及销量为0的异常产品。',
      skills: [
        'df.sort_values() 按值排序',
        'df.nlargest() / df.nsmallest()'
      ],
      output: '排序结果和极值数据'
    },
    {
      id: 7,
      title: '重复值的发现与剔除',
      difficulty: 'easy',
      phase: '第一部分：基础入门项目',
      scenario: '系统导出日志时，因网络抖动产生了完全相同的重复记录。',
      skills: [
        'df.duplicated().sum() 统计重复数量',
        'df.drop_duplicates(subset=[\'ID\']) 按主键去重'
      ],
      output: '去重后的数据'
    },
    {
      id: 8,
      title: '简单的字符串切片提取信息',
      difficulty: 'easy',
      phase: '第一部分：基础入门项目',
      scenario: '身份证号中包含出生年月，手机号中包含运营商信息。',
      skills: [
        '.str.slice() 切片',
        '.str.contains() 模糊匹配筛选'
      ],
      output: '从字符串中提取的有效信息'
    },
    {
      id: 9,
      title: '利用 Map 函数做字典映射',
      difficulty: 'easy',
      phase: '第一部分：基础入门项目',
      scenario: '数据表中存储的是 \'M\' / \'F\'，需要转换为全称 \'Male\' / \'Female\' 便于展示。',
      skills: [
        'map() 函数配合字典 {\'M\': \'Male\', \'F\': \'Female\'}'
      ],
      output: '转换后的全称数据'
    },
    {
      id: 10,
      title: '导出清洗后的数据',
      difficulty: 'easy',
      phase: '第一部分：基础入门项目',
      scenario: '数据洗好了，如何存回 Excel 且不包含 Pandas 自动生成的数字索引？',
      skills: [
        'df.to_csv(index=False)',
        'df.to_excel(\'clean_data.xlsx\', index=False)'
      ],
      output: '干净的导出文件'
    },

    // 第二部分：进阶应用项目 (中等)
    {
      id: 11,
      title: '销售宽表转长表（逆透视）',
      difficulty: 'medium',
      phase: '第二部分：进阶应用项目',
      scenario: '财务表格是二维交叉表（1月列、2月列...），无法直接画折线图。',
      skills: [
        'pd.melt() 重塑数据，理解 id_vars 和 value_vars'
      ],
      output: '转换后的长表数据，便于可视化'
    },
    {
      id: 12,
      title: '分组聚合下的多重统计',
      difficulty: 'medium',
      phase: '第二部分：进阶应用项目',
      scenario: '需要按"部门"同时计算薪资的平均值、最大值和人数。',
      skills: [
        'df.groupby(\'Dept\')[\'Salary\'].agg([\'mean\', \'max\', \'count\'])',
        '使用字典对不同列应用不同函数：agg({\'Age\': \'mean\', \'Score\': \'max\'})'
      ],
      output: '多维度的分组统计结果'
    },
    {
      id: 13,
      title: 'RFM 简易用户分层模型',
      difficulty: 'medium',
      phase: '第二部分：进阶应用项目',
      scenario: '电商订单表，需计算每个用户最近一次消费距今(Recency)、频率(Frequency)。',
      skills: [
        'groupby 结合 datetime 计算时间差',
        'pd.cut 将 R、F、M 值分箱打分'
      ],
      output: '用户 RFM 分层结果'
    },
    {
      id: 14,
      title: '多表关联查询（VLOOKUP 平替）',
      difficulty: 'medium',
      phase: '第二部分：进阶应用项目',
      scenario: '订单表只有 ProductID，需要从产品表里拉取 ProductName 和 Price。',
      skills: [
        'pd.merge(left, right, on=\'ID\', how=\'left\')',
        '理解 inner, left, outer 的区别'
      ],
      output: '关联后的完整订单数据'
    },
    {
      id: 15,
      title: '时间序列的重采样与对齐',
      difficulty: 'medium',
      phase: '第二部分：进阶应用项目',
      scenario: '秒级传感器数据量太大，需要转换成"每 5 分钟平均值"进行分析。',
      skills: [
        'df.set_index(\'timestamp\')',
        'df.resample(\'5T\').mean()'
      ],
      output: '重采样后的时间序列数据'
    },
    {
      id: 16,
      title: '自定义函数的高效应用',
      difficulty: 'medium',
      phase: '第二部分：进阶应用项目',
      scenario: '根据销售额和成本列，计算复杂的加权利润率（逻辑无法用单一向量表达式完成）。',
      skills: [
        'df.apply(lambda row: func(row), axis=1)'
      ],
      output: '计算后的加权利润率'
    },
    {
      id: 17,
      title: '分类变量的独热编码',
      difficulty: 'medium',
      phase: '第二部分：进阶应用项目',
      scenario: '机器学习模型（如线性回归）无法处理中文"省份"特征，必须转为数字。',
      skills: [
        'pd.get_dummies(df, columns=[\'Province\'], prefix=\'P\')'
      ],
      output: '独热编码后的特征矩阵'
    },
    {
      id: 18,
      title: '累计值、滚动窗口计算',
      difficulty: 'medium',
      phase: '第二部分：进阶应用项目',
      scenario: '计算股票 7 日移动平均线，或计算店铺的累计销售额。',
      skills: [
        'df[\'Sales\'].rolling(7).mean()',
        'df[\'Sales\'].cumsum()'
      ],
      output: '滚动计算和累计计算结果'
    },
    {
      id: 19,
      title: '基于分位数的异常值检测与截断',
      difficulty: 'medium',
      phase: '第二部分：进阶应用项目',
      scenario: '数据中有极少数的天价订单（刷单），严重影响均值统计。',
      skills: [
        'q_low = df[\'Price\'].quantile(0.01)',
        'df[\'Price\'].clip(lower=q_low, upper=q_high)'
      ],
      output: '处理后的异常值数据'
    },
    {
      id: 20,
      title: '数据透视表与交叉表',
      difficulty: 'medium',
      phase: '第二部分：进阶应用项目',
      scenario: '需要制作"地区 x 产品类别"的销售金额汇总热力图。',
      skills: [
        'pd.pivot_table(df, values=\'Sales\', index=\'Region\', columns=\'Category\', aggfunc=\'sum\')'
      ],
      output: '数据透视表结果'
    },

    // 第三部分：高阶实战项目 (困难)
    {
      id: 21,
      title: '海量数据的向量化地理围栏计算',
      difficulty: 'hard',
      phase: '第三部分：高阶实战项目',
      scenario: '100万条骑行轨迹，需要匹配到最近的 5000 个地铁站（循环遍历需要数小时）。',
      skills: [
        '放弃 for 循环：利用 numpy 广播机制计算欧氏距离矩阵',
        '使用 pd.cut 先按经纬度分块粗筛，再精算，将时间复杂度从 O(N*M) 降至近似 O(N)'
      ],
      output: '快速匹配的地理围栏结果'
    },
    {
      id: 22,
      title: 'Memory 深度优化：向下转型读取巨型 CSV',
      difficulty: 'hard',
      phase: '第三部分：高阶实战项目',
      scenario: 'Pandas 读取一个 5GB 的日志文件直接内存溢出崩溃。',
      skills: [
        '读取时指定 dtype：将 int64 转为 int32，float64 转为 float16',
        'pd.read_csv(chunksize=100000) 分块读取处理并即时聚合'
      ],
      output: '成功读取并处理的巨型数据'
    },
    {
      id: 23,
      title: '脏乱文本的向量化模糊清洗与实体对齐',
      difficulty: 'hard',
      phase: '第三部分：高阶实战项目',
      scenario: '用户输入的公司名包含 "阿里"、"阿里巴巴集团"、"淘宝(中国)"，需映射到标准名称 "阿里巴巴"。',
      skills: [
        '构建正则表达式映射字典，利用 df[\'col\'].str.replace(r\'...\', \'...\', regex=True) 向量化批量替换',
        '结合 np.select 实现多条件分支匹配'
      ],
      output: '标准化的实体名称'
    },
    {
      id: 24,
      title: '处理非结构化 JSON 嵌套列',
      difficulty: 'hard',
      phase: '第三部分：高阶实战项目',
      scenario: 'API 返回的 CSV 中，某列存储的是 JSON 字符串（如 \'{"age": 25, "city": "BJ"}\')。',
      skills: [
        'json_normalize() 将 JSON 列展平为多列',
        '结合 apply 与 json.loads 安全解析（仅限少量数据，大量数据需用向量化方法）'
      ],
      output: '展平后的结构化数据'
    },
    {
      id: 25,
      title: '基于滚动时间窗口的复杂滑窗特征工程',
      difficulty: 'hard',
      phase: '第三部分：高阶实战项目',
      scenario: '风控模型需要计算过去 30 分钟内该 IP 的登录失败次数（实时流计算模拟）。',
      skills: [
        'df.set_index(\'time\').rolling(\'30min\', closed=\'left\').count()',
        '理解时间窗口索引的闭包细节'
      ],
      output: '滚动时间窗口计算结果'
    },
    {
      id: 26,
      title: '构建完全可复用的数据预处理 Pipeline',
      difficulty: 'hard',
      phase: '第三部分：高阶实战项目',
      scenario: '训练集、测试集、未来预测数据需要经过完全一致的缺失值填充和标准化流程。',
      skills: [
        '面向对象编程 + Pandas pipe 方法',
        '编写 DataCleaner 类，保存训练集的均值/标准差用于测试集变换（避免数据泄露）'
      ],
      output: '可复用的数据预处理管道'
    },
    {
      id: 27,
      title: '多级行索引 (MultiIndex) 的进阶切片与运算',
      difficulty: 'hard',
      phase: '第三部分：高阶实战项目',
      scenario: '数据结构为 (国家, 省份, 城市) 三级索引，需要提取所有"广东省"数据并与"江苏省"做环比计算。',
      skills: [
        'df.xs(\'Guangdong\', level=\'Province\') 跨级切片',
        'df.unstack(level=0) 变换形状以简化计算'
      ],
      output: '多级索引的切片和计算结果'
    },
    {
      id: 28,
      title: '高性能 Eval 与 Query 加速筛选',
      difficulty: 'hard',
      phase: '第三部分：高阶实战项目',
      scenario: '在千万级 DataFrame 上执行复杂的布尔筛选，传统写法 df[(df.A > 0) & (df.B < 0)] 占用内存大。',
      skills: [
        '使用 df.query(\'A > 0 and B < 0\') 调用 Numexpr 引擎加速',
        '使用 pd.eval() 进行列间运算'
      ],
      output: '高性能筛选结果'
    },
    {
      id: 29,
      title: '自定义加权分箱与评分卡映射',
      difficulty: 'hard',
      phase: '第三部分：高阶实战项目',
      scenario: '根据复杂的业务规则（如年龄、负债率的不同组合对应不同风险分数）生成信用分。',
      skills: [
        '结合 pd.cut 与 np.select',
        '利用 .groupby().rank(pct=True) 做归一化排名转换'
      ],
      output: '生成的信用评分结果'
    },
    {
      id: 30,
      title: 'AI 建模前的最终数据检视报告生成',
      difficulty: 'hard',
      phase: '第三部分：高阶实战项目',
      scenario: '交给算法工程师的数据，必须附带一份自动化质检报告（缺失率、偏度、异常值）。',
      skills: [
        'Pandas Profiling 替代方案：手写 describe(include=\'all\') 扩展函数',
        '利用 .skew(), .kurtosis() 输出分布指标',
        '生成 Markdown 格式的数据字典输出'
      ],
      output: '自动化数据质检报告'
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

  const filteredLevels = activeDifficulty === 'all' 
    ? trainingLevels 
    : trainingLevels.filter(level => level.difficulty === activeDifficulty)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500'
      case 'medium': return 'bg-yellow-500'
      case 'hard': return 'bg-red-500'
      default: return 'bg-blue-500'
    }
  }

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '🟢 简单'
      case 'medium': return '🟡 中等'
      case 'hard': return '🔴 困难'
      default: return ''
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-pixel-fade-in">
          <h1 className="text-4xl font-bold text-[#1a365d] mb-4 font-pixel">
            AI时代 Python 数据分析实战训练营
          </h1>
          <h2 className="text-2xl font-bold text-[#4299e1] mb-4 font-pixel">
            Pandas 从清洗到建模 (30项闯关)
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto font-pixel text-sm leading-relaxed">
            通过 30 个由浅入深、源自真实业务场景的 Pandas 实战项目，彻底掌握数据清洗、特征工程、
            高性能向量化计算的核心技能，为后续的机器学习与 AI 大模型应用打下坚实的数据处理地基。
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* 难度筛选 */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button
              onClick={() => setActiveDifficulty('all')}
              className={`px-6 py-3 border-4 rounded-md font-pixel text-sm transition-all ${
                activeDifficulty === 'all'
                  ? 'bg-[#4299e1] text-white border-[#1a365d]'
                  : 'bg-white text-[#1a365d] border-[#1a365d] hover:bg-gray-100'
              }`}
            >
              全部项目
            </button>
            <button
              onClick={() => setActiveDifficulty('easy')}
              className={`px-6 py-3 border-4 rounded-md font-pixel text-sm transition-all ${
                activeDifficulty === 'easy'
                  ? 'bg-green-500 text-white border-green-700'
                  : 'bg-white text-[#1a365d] border-[#1a365d] hover:bg-gray-100'
              }`}
            >
              🟢 简单 (1-10)
            </button>
            <button
              onClick={() => setActiveDifficulty('medium')}
              className={`px-6 py-3 border-4 rounded-md font-pixel text-sm transition-all ${
                activeDifficulty === 'medium'
                  ? 'bg-yellow-500 text-white border-yellow-700'
                  : 'bg-white text-[#1a365d] border-[#1a365d] hover:bg-gray-100'
              }`}
            >
              🟡 中等 (11-20)
            </button>
            <button
              onClick={() => setActiveDifficulty('hard')}
              className={`px-6 py-3 border-4 rounded-md font-pixel text-sm transition-all ${
                activeDifficulty === 'hard'
                  ? 'bg-red-500 text-white border-red-700'
                  : 'bg-white text-[#1a365d] border-[#1a365d] hover:bg-gray-100'
              }`}
            >
              🔴 困难 (21-30)
            </button>
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
                      : `${getDifficultyColor(level.difficulty)} text-white border-gray-400 hover:opacity-80`
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
            {filteredLevels.map((level, index) => (
              <div
                key={level.id}
                className={`bg-white border-4 rounded-md shadow-md overflow-hidden transition-all ${
                  completedLevels.includes(level.id)
                    ? 'border-green-500 bg-green-50'
                    : 'border-[#1a365d]'
                } animate-pixel-fade-in`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleLevel(level.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-md text-sm font-pixel border-2 ${getDifficultyColor(level.difficulty)} text-white border-gray-400`}>
                          项目 {level.id}
                        </span>
                        <span className="text-sm text-gray-500 font-pixel">{getDifficultyLabel(level.difficulty)}</span>
                        <span className="text-sm text-gray-500 font-pixel">|</span>
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
                      <Link
                        to="/practice"
                        className="block w-full py-4 bg-[#ed8936] text-white border-2 border-[#1a365d] rounded-md font-pixel text-sm hover:bg-[#d69e4f] transition-colors animate-pixel-bounce text-center"
                      >
                        🚀 前往实践环境练习
                      </Link>
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
