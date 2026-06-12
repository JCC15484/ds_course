export interface ProjectStep {
  id: number;
  title: string;
  description: string;
  codeTemplate: string;
  expectedOutput: string;
}

export interface Project {
  id: number;
  title: string;
  difficulty: string;
  duration: string;
  tags: string[];
  description: string;
  learningGoals: string[];
  steps: ProjectStep[];
  icon: string;
  color: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: '销售数据基础分析',
    difficulty: '入门',
    duration: '30分钟',
    tags: ['read_csv', 'to_datetime', 'groupby', 'pivot_table'],
    description: '构造销售数据，进行日期转换、特征工程、分组聚合和透视表分析。',
    learningGoals: [
      '掌握 DataFrame 构造与基本查看方法',
      '熟练使用 to_datetime 进行日期转换',
      '掌握 groupby + agg 的分组聚合方法',
      '理解 pivot_table 创建多维透视表',
    ],
    icon: '📊',
    color: 'from-blue-400 to-blue-600',
    steps: [
      {
        id: 1,
        title: '步骤1：数据构造与查看',
        description: '使用字典构造 DataFrame，查看前几行、形状、列类型。',
        codeTemplate: `import pandas as pd
data = pd.DataFrame({
    'date': ['2023-01-05','2023-01-12','2023-02-03','2023-02-20','2023-03-08','2023-03-15','2023-04-02','2023-04-18'],
    'product': ['苹果','香蕉','苹果','橙子','香蕉','苹果','橙子','香蕉'],
    'quantity': [10, 20, 15, 8, 25, 12, 18, 30],
    'price': [5.0, 3.0, 5.5, 4.0, 3.2, 5.8, 4.2, 3.5]
})
print(data.head())
print("形状:", data.shape)
print(data.dtypes)`,
        expectedOutput: '苹果',
      },
      {
        id: 2,
        title: '步骤2：日期转换与类型检查',
        description: '将date列转为datetime，并提取月份。',
        codeTemplate: `import pandas as pd
data = pd.DataFrame({
    'date': ['2023-01-05','2023-02-03','2023-03-08','2023-04-02'],
    'product': ['苹果','香蕉','橙子','苹果'],
    'quantity': [10, 20, 15, 12]
})
data['date'] = pd.to_datetime(data['date'], errors='coerce')
data['month'] = data['date'].dt.month
print(data[['date', 'month']])`,
        expectedOutput: '2023',
      },
      {
        id: 3,
        title: '步骤3：特征工程',
        description: '提取年、月、星期几，计算订单金额。',
        codeTemplate: `import pandas as pd
data = pd.DataFrame({
    'date': pd.to_datetime(['2023-01-05','2023-02-03','2023-03-08','2023-04-02','2023-05-10']),
    'product': ['苹果','香蕉','橙子','苹果','香蕉'],
    'quantity': [10, 20, 15, 12, 25],
    'price': [5.0, 3.0, 4.0, 5.5, 3.2]
})
data['year'] = data['date'].dt.year
data['month'] = data['date'].dt.month
data['day_of_week'] = data['date'].dt.dayofweek
data['amount'] = data['quantity'] * data['price']
print(data[['date', 'amount']])`,
        expectedOutput: 'amount',
      },
      {
        id: 4,
        title: '步骤4：分组聚合分析',
        description: '按产品统计销售额，找出Top产品。',
        codeTemplate: `import pandas as pd
data = pd.DataFrame({
    'product': ['苹果','香蕉','苹果','橙子','香蕉','苹果','橙子','香蕉'],
    'quantity': [10, 20, 15, 8, 25, 12, 18, 30],
    'price': [5.0, 3.0, 5.5, 4.0, 3.2, 5.8, 4.2, 3.5]
})
data['amount'] = data['quantity'] * data['price']
by_product = data.groupby('product')['amount'].sum().sort_values(ascending=False)
print(by_product)`,
        expectedOutput: '苹果',
      },
      {
        id: 5,
        title: '步骤5：创建透视表',
        description: '生成产品×月份的销售矩阵透视表。',
        codeTemplate: `import pandas as pd
data = pd.DataFrame({
    'date': pd.to_datetime(['2023-01-05','2023-01-12','2023-02-03','2023-02-20','2023-03-08','2023-03-15']),
    'product': ['苹果','香蕉','苹果','橙子','香蕉','苹果'],
    'quantity': [10, 20, 15, 8, 25, 12],
    'price': [5.0, 3.0, 5.5, 4.0, 3.2, 5.8]
})
data['month'] = data['date'].dt.month
data['amount'] = data['quantity'] * data['price']
pivot = pd.pivot_table(data, values='amount', index='product', columns='month', aggfunc='sum', fill_value=0)
print(pivot)`,
        expectedOutput: '苹果',
      },
    ],
  },
  {
    id: 2,
    title: '购物篮分析',
    difficulty: '进阶',
    duration: '45分钟',
    tags: ['crosstab', 'merge', '关联规则'],
    description: '通过 crosstab 构建交易矩阵，计算支持度、置信度、提升度，找出产品关联规则。',
    learningGoals: [
      '理解关联规则的基本概念（支持度、置信度、提升度）',
      '熟练使用 crosstab 创建二进制矩阵',
      '掌握使用 combinations 生成组合对',
      '能够根据阈值筛选强关联规则',
    ],
    icon: '🛒',
    color: 'from-orange-400 to-orange-600',
    steps: [
      {
        id: 1,
        title: '步骤1：构建交易-产品矩阵',
        description: '将交易明细转换为一个二进制矩阵，行是交易ID，列是产品。',
        codeTemplate: `import pandas as pd
data = pd.DataFrame({
    'transaction_id': [1,1,1, 2,2, 3,3,3, 4,4, 5,5,5],
    'product': ['面包','牛奶','鸡蛋', '面包','牛奶', '牛奶','鸡蛋','咖啡', '面包','鸡蛋', '牛奶','咖啡','糖']
})
basket = pd.crosstab(data['transaction_id'], data['product'])
print("矩阵形状:", basket.shape)
print(basket)`,
        expectedOutput: '牛奶',
      },
      {
        id: 2,
        title: '步骤2：计算单项支持度',
        description: '支持度 = 包含该商品的交易数 / 总交易数。',
        codeTemplate: `import pandas as pd
data = pd.DataFrame({
    'transaction_id': [1,1,1, 2,2, 3,3,3, 4,4, 5,5,5, 6,6],
    'product': ['面包','牛奶','鸡蛋', '面包','牛奶', '牛奶','鸡蛋','咖啡', '面包','鸡蛋', '牛奶','咖啡','糖', '面包','糖']
})
basket = pd.crosstab(data['transaction_id'], data['product'])
support = basket.mean()
print(support.sort_values(ascending=False))`,
        expectedOutput: '牛奶',
      },
      {
        id: 3,
        title: '步骤3：生成产品对并计算支持度',
        description: '使用combinations生成所有产品对，计算同时购买的支持度。',
        codeTemplate: `import pandas as pd
from itertools import combinations
data = pd.DataFrame({
    'transaction_id': [1,1,1, 2,2, 3,3,3, 4,4, 5,5,5, 6,6],
    'product': ['面包','牛奶','鸡蛋', '面包','牛奶', '牛奶','鸡蛋','咖啡', '面包','鸡蛋', '牛奶','咖啡','糖', '面包','糖']
})
basket = pd.crosstab(data['transaction_id'], data['product'])
product_pairs = list(combinations(basket.columns, 2))
pair_support = {}
for a, b in product_pairs:
    pair_support[(a, b)] = ((basket[a] == 1) & (basket[b] == 1)).mean()
for (a, b), s in list(pair_support.items())[:5]:
    print(f"{a} & {b}: {s:.2f}")`,
        expectedOutput: '牛奶',
      },
      {
        id: 4,
        title: '步骤4：计算置信度与提升度',
        description: 'Confidence(A→B) = 支持度(A∩B) / 支持度(A)，Lift = 置信度 / 支持度(B)。',
        codeTemplate: `import pandas as pd
from itertools import combinations
data = pd.DataFrame({
    'transaction_id': [1,1,1, 2,2, 3,3,3, 4,4, 5,5,5, 6,6, 7,7, 8,8],
    'product': ['面包','牛奶','鸡蛋', '面包','牛奶', '牛奶','鸡蛋','咖啡', '面包','鸡蛋', '牛奶','咖啡','糖', '面包','糖', '面包','牛奶', '牛奶','鸡蛋']
})
basket = pd.crosstab(data['transaction_id'], data['product'])
support = basket.mean()
product_pairs = list(combinations(basket.columns, 2))
pair_support = {}
for a, b in product_pairs:
    pair_support[(a, b)] = ((basket[a] == 1) & (basket[b] == 1)).mean()
rules = []
for a, b in product_pairs:
    sup_a = support[a]
    sup_b = support[b]
    sup_ab = pair_support[(a, b)]
    if sup_ab > 0.01 and sup_a > 0 and sup_b > 0:
        conf = sup_ab / sup_a
        lift = conf / sup_b
        rules.append((a, b, round(sup_ab, 3), round(conf, 3), round(lift, 3)))
rules_df = pd.DataFrame(rules, columns=['antecedent', 'consequent', 'support', 'confidence', 'lift'])
print(rules_df.sort_values('lift', ascending=False).head(10))`,
        expectedOutput: 'lift',
      },
      {
        id: 5,
        title: '步骤5：筛选强关联规则',
        description: '保留 lift>1.0 且 confidence>0.3 的规则。',
        codeTemplate: `import pandas as pd
from itertools import combinations
data = pd.DataFrame({
    'transaction_id': [1,1,1, 2,2, 3,3,3, 4,4, 5,5,5, 6,6, 7,7, 8,8],
    'product': ['面包','牛奶','鸡蛋', '面包','牛奶', '牛奶','鸡蛋','咖啡', '面包','鸡蛋', '牛奶','咖啡','糖', '面包','糖', '面包','牛奶', '牛奶','鸡蛋']
})
basket = pd.crosstab(data['transaction_id'], data['product'])
support = basket.mean()
product_pairs = list(combinations(basket.columns, 2))
pair_support = {}
for a, b in product_pairs:
    pair_support[(a, b)] = ((basket[a] == 1) & (basket[b] == 1)).mean()
rules = []
for a, b in product_pairs:
    sup_a = support[a]
    sup_b = support[b]
    sup_ab = pair_support[(a, b)]
    if sup_ab > 0 and sup_a > 0 and sup_b > 0:
        conf = sup_ab / sup_a
        lift = conf / sup_b
        rules.append((a, b, sup_ab, conf, lift))
rules_df = pd.DataFrame(rules, columns=['antecedent', 'consequent', 'support', 'confidence', 'lift'])
strong_rules = rules_df[(rules_df['lift'] > 1.0) & (rules_df['confidence'] > 0.3)]
print(strong_rules)`,
        expectedOutput: 'antecedent',
      },
    ],
  },
  {
    id: 3,
    title: '用户行为漏斗分析',
    difficulty: '进阶',
    duration: '40分钟',
    tags: ['shift', 'value_counts', '转化率'],
    description: '对用户行为日志进行漏斗分析，计算每步转化率，并进行用户活跃度分群。',
    learningGoals: [
      '掌握 value_counts 统计事件分布',
      '理解 groupby + diff/shift 计算时间间隔',
      '掌握漏斗分析和转化率计算方法',
      '学会用 pd.cut 进行数值分群',
    ],
    icon: '👥',
    color: 'from-green-400 to-green-600',
    steps: [
      {
        id: 1,
        title: '步骤1：事件分布统计',
        description: '统计各种行为事件的发生次数。',
        codeTemplate: `import pandas as pd
data = pd.DataFrame({
    'user_id': [1,1,1,2,2,2,2,3,3,3,4,4,5,5,5,5],
    'event': ['page_view','search','product_view','page_view','product_view','add_to_cart','purchase','page_view','product_view','add_to_cart','page_view','search','page_view','product_view','add_to_cart','checkout']
})
print(data['event'].value_counts())`,
        expectedOutput: 'page_view',
      },
      {
        id: 2,
        title: '步骤2：计算事件时间间隔',
        description: '按用户分组，计算前后事件的时间差。',
        codeTemplate: `import pandas as pd
data = pd.DataFrame({
    'user_id': [1,1,1,2,2,2,3,3],
    'event': ['view','click','purchase','view','click','purchase','view','click'],
    'timestamp': pd.to_datetime(['2023-06-01 09:00','2023-06-01 09:05','2023-06-01 09:12','2023-06-01 10:00','2023-06-01 10:08','2023-06-01 10:20','2023-06-01 11:00','2023-06-01 11:15'])
})
data = data.sort_values(['user_id', 'timestamp'])
data['time_diff'] = data.groupby('user_id')['timestamp'].diff()
data['time_diff_sec'] = data['time_diff'].dt.total_seconds()
print(data[['user_id', 'event', 'time_diff_sec']])`,
        expectedOutput: 'purchase',
      },
      {
        id: 3,
        title: '步骤3：漏斗步骤定义与用户数统计',
        description: '定义漏斗步骤，统计每一步的独立用户数。',
        codeTemplate: `import pandas as pd
data = pd.DataFrame({
    'user_id': [1,1,1,1,1, 2,2,2, 3,3,3,3, 4,4, 5,5,5, 6,6,6,6,6],
    'event': ['page_view','search','product_view','add_to_cart','purchase',
              'page_view','product_view','purchase',
              'page_view','product_view','add_to_cart','purchase',
              'page_view','search',
              'page_view','product_view','add_to_cart',
              'page_view','product_view','add_to_cart','checkout','purchase']
})
funnel_steps = ['page_view', 'product_view', 'add_to_cart', 'checkout', 'purchase']
funnel = {}
for step in funnel_steps:
    funnel[step] = data[data['event'] == step]['user_id'].nunique()
funnel_df = pd.DataFrame(list(funnel.items()), columns=['步骤', '用户数'])
print(funnel_df)`,
        expectedOutput: 'purchase',
      },
      {
        id: 4,
        title: '步骤4：计算总体转化率和步骤转化率',
        description: '总体转化率 = 步骤用户数/第一步用户数；步骤转化率 = 本步/上一步。',
        codeTemplate: `import pandas as pd
data = pd.DataFrame({
    'user_id': [1,1,1,1,1, 2,2,2, 3,3,3,3, 4,4, 5,5,5, 6,6,6,6,6],
    'event': ['page_view','search','product_view','add_to_cart','purchase',
              'page_view','product_view','purchase',
              'page_view','product_view','add_to_cart','purchase',
              'page_view','search',
              'page_view','product_view','add_to_cart',
              'page_view','product_view','add_to_cart','checkout','purchase']
})
funnel_steps = ['page_view', 'product_view', 'add_to_cart', 'checkout', 'purchase']
funnel = {step: data[data['event'] == step]['user_id'].nunique() for step in funnel_steps}
funnel_df = pd.DataFrame(list(funnel.items()), columns=['步骤', '用户数'])
first_count = funnel_df['用户数'].iloc[0]
funnel_df['总体转化率%'] = (funnel_df['用户数'] / first_count * 100).round(2)
funnel_df['步骤转化率%'] = (funnel_df['用户数'] / funnel_df['用户数'].shift(1) * 100).round(2)
print(funnel_df)`,
        expectedOutput: '转化率',
      },
      {
        id: 5,
        title: '步骤5：用户活跃度分群',
        description: '根据用户行为次数，用cut分成低/中/高/超级活跃。',
        codeTemplate: `import pandas as pd
data = pd.DataFrame({
    'user_id': [1]*3 + [2]*8 + [3]*15 + [4]*25 + [5]*6 + [6]*12 + [7]*18 + [8]*2 + [9]*22 + [10]*4,
    'event': ['click'] * (3+8+15+25+6+12+18+2+22+4)
})
event_count = data.groupby('user_id')['event'].count()
segments = pd.cut(event_count, bins=[0, 5, 10, 20, float('inf')],
                  labels=['低活跃', '中活跃', '高活跃', '超级活跃'])
print(segments.value_counts())`,
        expectedOutput: '活跃',
      },
    ],
  },
  {
    id: 4,
    title: 'RFM客户价值分析',
    difficulty: '进阶',
    duration: '50分钟',
    tags: ['groupby', 'qcut', 'apply'],
    description: '计算每个客户的Recency（最近购买天数）、Frequency（购买次数）、Monetary（消费总额），进行客户分层。',
    learningGoals: [
      '理解 RFM 模型的三个维度含义',
      '掌握 groupby + agg 的多列聚合写法',
      '熟练使用 qcut 进行分位数打分',
      '掌握 apply 自定义函数进行行级分类',
    ],
    icon: '💼',
    color: 'from-purple-400 to-purple-600',
    steps: [
      {
        id: 1,
        title: '步骤1：计算R、F、M值',
        description: '以2023-12-31为参考日期，计算每个客户的最近购买距今天数、购买次数、消费总额。',
        codeTemplate: `import pandas as pd
data = pd.DataFrame({
    'customer_id': [1,1,1, 2,2, 3,3,3,3, 4, 5,5, 6,6,6, 7, 8,8,8,8],
    'order_date': pd.to_datetime(['2023-11-01','2023-12-10','2023-12-28',
                                  '2023-09-15','2023-11-20',
                                  '2023-06-01','2023-08-15','2023-10-10','2023-12-05',
                                  '2023-12-30',
                                  '2023-07-10','2023-10-25',
                                  '2023-10-01','2023-11-15','2023-12-20',
                                  '2023-12-01',
                                  '2023-05-01','2023-07-20','2023-09-10','2023-12-01']),
    'order_amount': [100, 250, 180, 300, 150, 80, 200, 120, 280, 500, 90, 220, 150, 320, 400, 180, 60, 110, 250, 190]
})
reference_date = pd.to_datetime('2023-12-31')
rfm = data.groupby('customer_id').agg(
    last_order=('order_date', 'max'),
    frequency=('order_date', 'count'),
    monetary=('order_amount', 'sum')
)
rfm['recency'] = (reference_date - rfm['last_order']).dt.days
rfm = rfm.drop('last_order', axis=1)
print(rfm)`,
        expectedOutput: 'recency',
      },
      {
        id: 2,
        title: '步骤2：用qcut进行RFM打分',
        description: '每个维度按分位打1-4分（4为最好）。',
        codeTemplate: `import pandas as pd
rfm = pd.DataFrame({
    'recency': [3, 41, 26, 1, 158, 11, 30, 244],
    'frequency': [3, 2, 4, 1, 2, 3, 1, 4],
    'monetary': [530, 450, 680, 500, 310, 870, 180, 610]
})
rfm['R_score'] = pd.qcut(rfm['recency'], 4, labels=[4, 3, 2, 1])
rfm['F_score'] = pd.qcut(rfm['frequency'].rank(method='first'), 4, labels=[1, 2, 3, 4])
rfm['M_score'] = pd.qcut(rfm['monetary'], 4, labels=[1, 2, 3, 4])
rfm['RFM_score'] = rfm['R_score'].astype(str) + rfm['F_score'].astype(str) + rfm['M_score'].astype(str)
print(rfm)`,
        expectedOutput: 'RFM_score',
      },
      {
        id: 3,
        title: '步骤3：定义客户分层函数',
        description: '根据R、F、M得分高低划分客户层级。',
        codeTemplate: `import pandas as pd
rfm = pd.DataFrame({
    'recency': [3, 41, 26, 1, 158, 11, 30, 244],
    'frequency': [3, 2, 4, 1, 2, 3, 1, 4],
    'monetary': [530, 450, 680, 500, 310, 870, 180, 610]
})
rfm['R_score'] = pd.qcut(rfm['recency'], 4, labels=[4, 3, 2, 1])
rfm['F_score'] = pd.qcut(rfm['frequency'].rank(method='first'), 4, labels=[1, 2, 3, 4])
rfm['M_score'] = pd.qcut(rfm['monetary'], 4, labels=[1, 2, 3, 4])

def rfm_segment(row):
    r = int(row['R_score'])
    f = int(row['F_score'])
    m = int(row['M_score'])
    if r >= 3 and f >= 3 and m >= 3:
        return '重要价值客户'
    elif r >= 3 and f <= 2:
        return '重要发展客户'
    elif r <= 2 and f >= 3:
        return '重要保持客户'
    elif r <= 2 and f <= 2:
        return '重要挽留客户'
    else:
        return '一般客户'

rfm['segment'] = rfm.apply(rfm_segment, axis=1)
print(rfm['segment'].value_counts())`,
        expectedOutput: '客户',
      },
      {
        id: 4,
        title: '步骤4：分层统计',
        description: '计算各客户层级的RFM均值。',
        codeTemplate: `import pandas as pd
rfm = pd.DataFrame({
    'recency': [3, 41, 26, 1, 158, 11, 30, 244],
    'frequency': [3, 2, 4, 1, 2, 3, 1, 4],
    'monetary': [530, 450, 680, 500, 310, 870, 180, 610]
})
rfm['R_score'] = pd.qcut(rfm['recency'], 4, labels=[4, 3, 2, 1])
rfm['F_score'] = pd.qcut(rfm['frequency'].rank(method='first'), 4, labels=[1, 2, 3, 4])
rfm['M_score'] = pd.qcut(rfm['monetary'], 4, labels=[1, 2, 3, 4])

def rfm_segment(row):
    r = int(row['R_score'])
    f = int(row['F_score'])
    m = int(row['M_score'])
    if r >= 3 and f >= 3 and m >= 3: return '重要价值客户'
    elif r >= 3 and f <= 2: return '重要发展客户'
    elif r <= 2 and f >= 3: return '重要保持客户'
    elif r <= 2 and f <= 2: return '重要挽留客户'
    else: return '一般客户'

rfm['segment'] = rfm.apply(rfm_segment, axis=1)
stats = rfm.groupby('segment').agg({'recency': 'mean', 'frequency': 'mean', 'monetary': 'mean'}).round(1)
print(stats)`,
        expectedOutput: '重要价值',
      },
    ],
  },
  {
    id: 5,
    title: '股票数据技术分析',
    difficulty: '挑战',
    duration: '60分钟',
    tags: ['rolling', 'ewm', 'apply'],
    description: '计算移动平均线、MACD、RSI、布林带等技术指标，进行日线转周线重采样。',
    learningGoals: [
      '掌握 rolling 窗口计算移动平均',
      '学会用 ewm 计算指数移动平均',
      '能够编写自定义函数并通过apply应用',
      '掌握 resample 进行时间周期转换',
    ],
    icon: '📈',
    color: 'from-red-400 to-red-600',
    steps: [
      {
        id: 1,
        title: '步骤1：移动平均线与交叉信号',
        description: '计算5日和20日移动平均，标记金叉死叉。',
        codeTemplate: `import pandas as pd
import numpy as np
np.random.seed(42)
dates = pd.date_range('2023-01-01', periods=30, freq='D')
prices = 100 + np.cumsum(np.random.randn(30) * 2)
data = pd.DataFrame({'date': dates, 'close': prices})
data = data.set_index('date')
data['MA5'] = data['close'].rolling(5).mean()
data['MA20'] = data['close'].rolling(20).mean()
data['signal'] = 0
data.loc[data['MA5'] > data['MA20'], 'signal'] = 1
data['position'] = data['signal'].diff()
print(data[['close', 'MA5', 'MA20', 'position']].tail(10))`,
        expectedOutput: 'MA20',
      },
      {
        id: 2,
        title: '步骤2：MACD指标',
        description: '计算EMA12、EMA26，得到MACD线、信号线和柱状图。',
        codeTemplate: `import pandas as pd
import numpy as np
np.random.seed(42)
dates = pd.date_range('2023-01-01', periods=40, freq='D')
prices = 100 + np.cumsum(np.random.randn(40) * 2)
data = pd.DataFrame({'date': dates, 'close': prices})
data = data.set_index('date')
exp12 = data['close'].ewm(span=12, adjust=False).mean()
exp26 = data['close'].ewm(span=26, adjust=False).mean()
data['MACD'] = exp12 - exp26
data['Signal_line'] = data['MACD'].ewm(span=9, adjust=False).mean()
data['MACD_hist'] = data['MACD'] - data['Signal_line']
print(data[['close', 'MACD', 'Signal_line', 'MACD_hist']].tail(10))`,
        expectedOutput: 'MACD',
      },
      {
        id: 3,
        title: '步骤3：自定义RSI函数',
        description: '编写计算14日RSI的函数，并应用到close列。',
        codeTemplate: `import pandas as pd
import numpy as np
np.random.seed(42)
dates = pd.date_range('2023-01-01', periods=30, freq='D')
prices = 100 + np.cumsum(np.random.randn(30) * 2)
data = pd.DataFrame({'date': dates, 'close': prices})
data = data.set_index('date')

def rsi(series, period=14):
    delta = series.diff()
    gain = delta.clip(lower=0)
    loss = -delta.clip(upper=0)
    avg_gain = gain.rolling(period).mean()
    avg_loss = loss.rolling(period).mean()
    rs = avg_gain / avg_loss
    return 100 - (100 / (1 + rs))

data['RSI'] = rsi(data['close'])
print(data[['close', 'RSI']].tail(10))`,
        expectedOutput: 'RSI',
      },
      {
        id: 4,
        title: '步骤4：布林带',
        description: '计算20日均线和上下轨（2倍标准差）。',
        codeTemplate: `import pandas as pd
import numpy as np
np.random.seed(42)
dates = pd.date_range('2023-01-01', periods=30, freq='D')
prices = 100 + np.cumsum(np.random.randn(30) * 2)
data = pd.DataFrame({'date': dates, 'close': prices})
data = data.set_index('date')
data['BB_mid'] = data['close'].rolling(20).mean()
std = data['close'].rolling(20).std()
data['BB_up'] = data['BB_mid'] + 2 * std
data['BB_low'] = data['BB_mid'] - 2 * std
print(data[['close', 'BB_mid', 'BB_up', 'BB_low']].tail(10))`,
        expectedOutput: 'BB_up',
      },
      {
        id: 5,
        title: '步骤5：周线重采样',
        description: '将日线数据聚合成周线。',
        codeTemplate: `import pandas as pd
import numpy as np
np.random.seed(42)
dates = pd.date_range('2023-01-01', periods=30, freq='D')
data = pd.DataFrame({
    'open': 100 + np.cumsum(np.random.randn(30)),
    'high': 102 + np.cumsum(np.random.randn(30)),
    'low': 98 + np.cumsum(np.random.randn(30)),
    'close': 100 + np.cumsum(np.random.randn(30) * 2),
    'volume': np.random.randint(1000, 5000, 30)
}, index=dates)
weekly = data.resample('W').agg({
    'open': 'first', 'high': 'max', 'low': 'min', 'close': 'last', 'volume': 'sum'
})
print(weekly)`,
        expectedOutput: 'close',
      },
    ],
  },
  {
    id: 6,
    title: '文本数据情感分析',
    difficulty: '入门',
    duration: '35分钟',
    tags: ['str', 'apply', '词频'],
    description: '对评论文本进行长度分析、关键词检测，基于评分打情感标签，统计高频词。',
    learningGoals: [
      '掌握 str 访问器进行字符串操作',
      '熟练使用 apply 将函数应用到Series',
      '学会词频统计的基本方法',
      '掌握 groupby + agg 的汇总统计',
    ],
    icon: '💬',
    color: 'from-pink-400 to-pink-600',
    steps: [
      {
        id: 1,
        title: '步骤1：文本长度与关键词检测',
        description: '计算文本长度，检查是否包含正面/负面词。',
        codeTemplate: `import pandas as pd
data = pd.DataFrame({
    'text': ['这个产品真的很棒 很推荐', '质量太差了 非常失望', '还不错 可以考虑', '真的好喜欢这个', '很糟糕 有点后悔买了', '性价比高 很满意', '不好用 不推荐', '非常棒的体验']
})
data['text_len'] = data['text'].str.len()
data['is_positive'] = data['text'].str.contains('好|棒|喜欢|推荐|满意|不错')
data['is_negative'] = data['text'].str.contains('差|失望|不好|后悔|糟糕')
print(data)`,
        expectedOutput: 'is_positive',
      },
      {
        id: 2,
        title: '步骤2：根据评分生成情感标签',
        description: '评分>=4为正面，<=2为负面，其余中性。',
        codeTemplate: `import pandas as pd
data = pd.DataFrame({
    'text': ['非常好', '太差了', '一般般', '很推荐', '不喜欢', '很棒', '普通', '强烈推荐', '很失望', '还可以'],
    'rating': [5, 1, 3, 5, 2, 4, 3, 5, 1, 3]
})

def label_sentiment(rating):
    if rating >= 4: return '正面'
    elif rating <= 2: return '负面'
    else: return '中性'

data['sentiment'] = data['rating'].apply(label_sentiment)
print(data['sentiment'].value_counts())`,
        expectedOutput: '正面',
      },
      {
        id: 3,
        title: '步骤3：高频词统计',
        description: '拼接所有文本，分割后统计词频。',
        codeTemplate: `import pandas as pd
texts = ['产品 质量 好', '推荐 购买 质量', '产品 好 价格 便宜', '质量 好 值得 购买', '产品 价格 贵', '质量 一般 产品', '好 产品 推荐', '购买 产品 质量']
word_list = []
for t in texts:
    word_list.extend(t.split())
word_freq = pd.Series(word_list).value_counts().head(10)
print(word_freq)`,
        expectedOutput: '产品',
      },
      {
        id: 4,
        title: '步骤4：各情感类别的文本长度分析',
        description: '按情感分组计算平均文本长度和评论数。',
        codeTemplate: `import pandas as pd
data = pd.DataFrame({
    'text': ['这个产品非常棒 很推荐给朋友', '质量太差了', '还不错', '真的好喜欢这个产品', '很糟糕 后悔了', '性价比高 很满意的一次购物', '不好用 不推荐', '非常棒的体验', '很失望', '不错的选择'],
    'rating': [5, 1, 3, 5, 1, 5, 2, 4, 2, 3]
})
data['text_len'] = data['text'].str.len()
data['sentiment'] = data['rating'].apply(lambda r: '正面' if r >= 4 else ('负面' if r <= 2 else '中性'))
stats = data.groupby('sentiment').agg(
    平均长度=('text_len', 'mean'),
    评论数=('text', 'count')
)
print(stats)`,
        expectedOutput: '正面',
      },
    ],
  },
  {
    id: 7,
    title: '多表关联与数据整合',
    difficulty: '进阶',
    duration: '50分钟',
    tags: ['merge', 'concat', 'pivot', 'melt'],
    description: '将订单、用户、产品表merge整合，演示concat、pivot_table、melt的各种用法。',
    learningGoals: [
      '掌握 merge 进行表间关联（inner/left/right/outer）',
      '理解 concat 纵向拼接数据',
      '熟练使用 pivot_table 创建多维透视表',
      '掌握 melt 将宽表转为长表',
    ],
    icon: '🔗',
    color: 'from-teal-400 to-teal-600',
    steps: [
      {
        id: 1,
        title: '步骤1：内连接三张表',
        description: '将orders、users、products三表merge，得到完整订单详情。',
        codeTemplate: `import pandas as pd
orders = pd.DataFrame({'order_id':[1,2,3,4,5], 'user_id':[101,102,101,103,102], 'product_id':[201,202,203,201,202], 'quantity':[2,1,3,2,1]})
users = pd.DataFrame({'user_id':[101,102,103], 'name':['小明','小红','小刚'], 'city':['北京','上海','广州']})
products = pd.DataFrame({'product_id':[201,202,203], 'product_name':['书','笔','本'], 'category':['文具','文具','文具'], 'price':[30,10,15]})
order_details = orders.merge(users, on='user_id', how='inner')
order_details = order_details.merge(products, on='product_id', how='inner')
order_details['total_amount'] = order_details['quantity'] * order_details['price']
print(order_details[['order_id', 'name', 'product_name', 'total_amount']])`,
        expectedOutput: '小明',
      },
      {
        id: 2,
        title: '步骤2：左连接与未匹配检查',
        description: '以订单表为主，左连接用户表，查找无用户信息的订单。',
        codeTemplate: `import pandas as pd
orders = pd.DataFrame({'order_id':[1,2,3,4], 'user_id':[101,102,101,104], 'product_id':[201,202,203,201], 'quantity':[2,1,3,2]})
users = pd.DataFrame({'user_id':[101,102,103], 'name':['小明','小红','小刚'], 'city':['北京','上海','广州']})
all_orders = orders.merge(users[['user_id', 'name', 'city']], on='user_id', how='left')
unmatched = all_orders[all_orders['name'].isna()]
print("未匹配订单数:", len(unmatched))
print(all_orders)`,
        expectedOutput: '未匹配',
      },
      {
        id: 3,
        title: '步骤3：concat拼接多月数据',
        description: '模拟1月和2月数据纵向拼接。',
        codeTemplate: `import pandas as pd
jan = pd.DataFrame({'order_id':[1,2,3], 'amount':[100,200,150], 'month':['Jan','Jan','Jan']})
feb = pd.DataFrame({'order_id':[4,5,6,7], 'amount':[180,220,160,300], 'month':['Feb','Feb','Feb','Feb']})
combined = pd.concat([jan, feb], ignore_index=True)
print(len(jan), len(feb), len(combined))
print(combined)`,
        expectedOutput: 'Jan',
      },
      {
        id: 4,
        title: '步骤4：pivot_table创建透视表',
        description: '按品类和季度汇总销售额。',
        codeTemplate: `import pandas as pd
orders = pd.DataFrame({
    'order_id': [1,2,3,4,5,6,7,8],
    'user_id': [101,102,101,103,102,101,103,102],
    'product_id': [201,202,203,201,202,203,201,202],
    'quantity': [2,1,3,2,1,4,2,3],
    'order_date': pd.to_datetime(['2023-01-05','2023-02-10','2023-03-15','2023-04-20','2023-05-25','2023-07-01','2023-08-10','2023-10-15'])
})
products = pd.DataFrame({'product_id':[201,202,203], 'product_name':['书','笔','本'], 'category':['图书','文具','文具'], 'price':[30,10,15]})
order_details = orders.merge(products, on='product_id')
order_details['total_amount'] = order_details['quantity'] * order_details['price']
quarterly = order_details.pivot_table(
    values='total_amount', index='category',
    columns=order_details['order_date'].dt.quarter, aggfunc='sum', fill_value=0
)
quarterly.columns = ['Q' + str(int(i)) for i in quarterly.columns]
print(quarterly)`,
        expectedOutput: '图书',
      },
      {
        id: 5,
        title: '步骤5：melt长表转回',
        description: '将上述透视表转回长表格式。',
        codeTemplate: `import pandas as pd
data = pd.DataFrame({
    'category': ['图书', '文具'],
    'Q1': [60, 100],
    'Q2': [0, 60],
    'Q3': [60, 0],
    'Q4': [0, 30]
})
long_df = data.melt(id_vars='category', var_name='quarter', value_name='sales')
print(long_df)`,
        expectedOutput: 'sales',
      },
    ],
  },
  {
    id: 8,
    title: '缺失值与异常值处理',
    difficulty: '入门',
    duration: '40分钟',
    tags: ['fillna', 'interpolate', 'IQR'],
    description: '学习如何检测缺失值，演示前向填充、均值填充、插值等方法，并用IQR法处理异常值。',
    learningGoals: [
      '掌握 isna/dropna/fillna 的使用',
      '理解 interpolate 的时间插值方法',
      '掌握 IQR 四分位法检测异常值',
      '学会 clip 和 replace 处理异常值',
    ],
    icon: '🧹',
    color: 'from-yellow-400 to-yellow-600',
    steps: [
      {
        id: 1,
        title: '步骤1：检测缺失值',
        description: '统计各列缺失数量和比例。',
        codeTemplate: `import pandas as pd
import numpy as np
data = pd.DataFrame({
    'temperature': [25.0, np.nan, 26.5, 27.0, np.nan, 28.0, 30.5, np.nan, 26.0, 25.5],
    'humidity': [60, 62, np.nan, 58, 55, np.nan, 50, 48, np.nan, 60],
    'city': ['北京','北京','北京','上海','上海','上海','广州','广州','广州','广州']
})
print(data.isna().sum())
print("缺失比例:\\n", (data.isna().sum() / len(data) * 100).round(2))`,
        expectedOutput: 'temperature',
      },
      {
        id: 2,
        title: '步骤2：填充缺失值（前向、均值、插值）',
        description: '演示三种填充方法。',
        codeTemplate: `import pandas as pd
import numpy as np
data = pd.DataFrame({
    'temperature': [25.0, np.nan, 26.5, 27.0, np.nan, 28.0, 30.5, np.nan, 26.0, 25.5]
}, index=pd.date_range('2023-06-01', periods=10, freq='D'))
df_ffill = data.ffill()
df_mean = data.fillna(data.mean())
df_interp = data.interpolate(method='time')
print("前向填充后缺失数:", df_ffill.isna().sum().sum())
print("均值填充后缺失数:", df_mean.isna().sum().sum())
print("插值后缺失数:", df_interp.isna().sum().sum())
print(df_interp)`,
        expectedOutput: 'temperature',
      },
      {
        id: 3,
        title: '步骤3：IQR法检测异常值',
        description: '对temperature列计算四分位数，找出异常值。',
        codeTemplate: `import pandas as pd
import numpy as np
data = pd.DataFrame({'temperature': [25.0, 26.5, 27.0, 28.0, 26.0, 25.5, 24.8, 99.9, 27.2, 28.5, -20.0, 26.8]})
Q1 = data['temperature'].quantile(0.25)
Q3 = data['temperature'].quantile(0.75)
IQR = Q3 - Q1
lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR
outliers = data[(data['temperature'] < lower) | (data['temperature'] > upper)]
print("下界:", lower, "上界:", upper)
print("异常值个数:", len(outliers))
print(outliers)`,
        expectedOutput: '异常值',
      },
      {
        id: 4,
        title: '步骤4：处理异常值（中位数替换/clip）',
        description: '用中位数替换或截断处理异常值。',
        codeTemplate: `import pandas as pd
import numpy as np
data = pd.DataFrame({'temperature': [25.0, 26.5, 27.0, 28.0, 26.0, 25.5, 24.8, 99.9, 27.2, 28.5, -20.0, 26.8]})
Q1 = data['temperature'].quantile(0.25)
Q3 = data['temperature'].quantile(0.75)
IQR = Q3 - Q1
lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR
outliers = data[(data['temperature'] < lower) | (data['temperature'] > upper)]
median = data['temperature'].median()
data_fixed = data.copy()
data_fixed.loc[outliers.index, 'temperature'] = median
data_fixed['temp_clipped'] = data['temperature'].clip(lower, upper)
print("处理后温度统计:\\n", data_fixed[['temperature', 'temp_clipped']].describe())`,
        expectedOutput: 'temp_clipped',
      },
    ],
  },
  {
    id: 9,
    title: '数据透视与多维度交叉分析',
    difficulty: '挑战',
    duration: '55分钟',
    tags: ['pivot_table', 'transform', '同比环比'],
    description: '深入学习多层级透视表，掌握transform组内计算，计算同比环比增长率。',
    learningGoals: [
      '掌握多层级 index/columns 的 pivot_table',
      '理解 groupby + unstack 的展开方式',
      '掌握 pct_change 和 groupby+shift 计算同比环比',
      '理解 transform 的组内占比计算',
    ],
    icon: '🔄',
    color: 'from-indigo-400 to-indigo-600',
    steps: [
      {
        id: 1,
        title: '步骤1：多维度透视表（多index和columns）',
        description: '创建门店+品类为行，年份为列的销售额透视表。',
        codeTemplate: `import pandas as pd
data = pd.DataFrame({
    'store': ['门店1','门店1','门店1','门店1','门店2','门店2','门店2','门店2','门店1','门店1','门店2','门店2'],
    'category': ['食品','食品','日用品','日用品','食品','食品','日用品','日用品','食品','日用品','食品','日用品'],
    'year': [2022,2023,2022,2023,2022,2023,2022,2023,2023,2023,2023,2023],
    'sales': [100,120,80,90,150,170,110,130,50,60,70,80]
})
pivot = pd.pivot_table(data, values='sales', index=['store', 'category'], columns='year', aggfunc='sum', margins=True)
print(pivot)`,
        expectedOutput: '门店1',
      },
      {
        id: 2,
        title: '步骤2：groupby+unstack实现类似透视',
        description: '先groupby再用unstack展开。',
        codeTemplate: `import pandas as pd
data = pd.DataFrame({
    'store': ['门店1','门店1','门店1','门店2','门店2','门店2','门店1','门店2'],
    'month': ['1月','2月','3月','1月','2月','3月','1月','2月'],
    'sales': [100,120,80,150,170,110,50,70]
})
matrix = data.groupby(['store', 'month'])['sales'].sum().unstack()
print(matrix)`,
        expectedOutput: '门店1',
      },
      {
        id: 3,
        title: '步骤3：计算环比和同比',
        description: '先按年月汇总，然后pct_change()算环比，按月份分组shift算同比。',
        codeTemplate: `import pandas as pd
data = pd.DataFrame({
    'year': [2022]*12 + [2023]*12,
    'month': list(range(1, 13)) * 2,
    'sales': [100,110,105,120,130,125,140,145,135,150,155,160, 110,125,120,135,145,140,155,160,150,165,170,180]
})
monthly = data.groupby(['year', 'month'])['sales'].sum().reset_index().sort_values(['year', 'month'])
monthly['mom'] = monthly['sales'].pct_change() * 100
monthly['yoy'] = monthly.groupby('month')['sales'].pct_change() * 100
print(monthly.head(15))`,
        expectedOutput: 'yoy',
      },
      {
        id: 4,
        title: '步骤4：transform计算组内占比',
        description: '计算每个门店内各品类的销售占比。',
        codeTemplate: `import pandas as pd
data = pd.DataFrame({
    'store': ['门店1','门店1','门店1','门店2','门店2','门店2'],
    'category': ['食品','日用品','服装','食品','日用品','服装'],
    'sales': [100,80,120,150,110,140]
})
data['pct_of_store'] = data.groupby('store')['sales'].transform(lambda x: (x / x.sum()) * 100).round(2)
print(data)`,
        expectedOutput: 'pct_of_store',
      },
      {
        id: 5,
        title: '步骤5：多层级索引的切片',
        description: '对多级索引进行取值和交换层级。',
        codeTemplate: `import pandas as pd
data = pd.DataFrame({
    'store': ['门店1','门店1','门店1','门店2','门店2','门店2'],
    'category': ['食品','日用品','服装','食品','日用品','服装'],
    '2022': [100,80,120,150,110,140],
    '2023': [120,90,135,170,130,160]
})
pivot = data.set_index(['store', 'category'])
print("切片:\\n", pivot.loc[('门店1', '食品')])
print("交换层级:\\n", pivot.swaplevel().head())`,
        expectedOutput: '门店1',
      },
    ],
  },
  {
    id: 10,
    title: '大数据分块处理与性能优化',
    difficulty: '挑战',
    duration: '70分钟',
    tags: ['chunksize', 'category', 'eval', '向量化'],
    description: '学习分块处理大型数据，优化数据类型减少内存，对比eval/向量化与apply的性能差异。',
    learningGoals: [
      '掌握手动分块处理数据的方法',
      '理解 category 类型对内存的优化作用',
      '掌握 df.eval/df.query 的高级用法',
      '理解向量化操作相比 apply 的性能优势',
    ],
    icon: '⚡',
    color: 'from-cyan-400 to-cyan-600',
    steps: [
      {
        id: 1,
        title: '步骤1：分块处理与聚合',
        description: '模拟分块处理大表，在每个块中分组求和，最后汇总。',
        codeTemplate: `import pandas as pd
import numpy as np
np.random.seed(42)
big_data = pd.DataFrame({
    'category': np.random.choice(['A','B','C','D'], 1000),
    'value1': np.random.randint(1, 100, 1000),
    'value2': np.random.randint(1, 100, 1000),
    'value3': np.random.randint(1, 100, 1000)
})
chunk_size = 250
chunk_list = []
for i in range(0, len(big_data), chunk_size):
    chunk = big_data.iloc[i:i+chunk_size]
    chunk_agg = chunk.groupby('category')['value1'].sum()
    chunk_list.append(chunk_agg)
result = pd.concat(chunk_list).groupby(level=0).sum()
print(result)`,
        expectedOutput: 'category',
      },
      {
        id: 2,
        title: '步骤2：数据类型优化',
        description: '查看内存占用，将object转为category，int64转小类型。',
        codeTemplate: `import pandas as pd
import numpy as np
np.random.seed(42)
data = pd.DataFrame({
    'id': np.arange(1000),
    'category': np.random.choice(['A','B','C','D','E','F'], 1000).astype('object'),
    'value1': np.random.randint(1, 100, 1000).astype('int64'),
    'value2': np.random.randint(1, 100, 1000).astype('int64')
})
print("原始内存(KB):", data.memory_usage(deep=True).sum() / 1024)
data['category'] = data['category'].astype('category')
data['id'] = data['id'].astype('int32')
data['value1'] = data['value1'].astype('int16')
print("优化后内存(KB):", data.memory_usage(deep=True).sum() / 1024)`,
        expectedOutput: '优化',
      },
      {
        id: 3,
        title: '步骤3：使用eval和query加速',
        description: '用df.eval()创建新列，df.query()筛选，对比传统方法速度。',
        codeTemplate: `import pandas as pd
import numpy as np
import time
np.random.seed(42)
data = pd.DataFrame({
    'value1': np.random.randint(1, 100, 10000),
    'value2': np.random.randint(1, 100, 10000),
    'value3': np.random.randint(1, 100, 10000)
})
start = time.time()
data['sum_val'] = data['value1'] + data['value2'] + data['value3']
print("普通用时(s):", round(time.time() - start, 6))
start = time.time()
data.eval('sum_val2 = value1 + value2 + value3', inplace=True)
print("eval用时(s):", round(time.time() - start, 6))
print("结果相等:", (data['sum_val'] == data['sum_val2']).all())`,
        expectedOutput: 'eval',
      },
      {
        id: 4,
        title: '步骤4：apply、map与向量化性能对比',
        description: '对value1列进行平方操作，比较apply、map和直接向量化的时间。',
        codeTemplate: `import pandas as pd
import numpy as np
import time
np.random.seed(42)
data = pd.DataFrame({'value1': np.random.randint(1, 100, 10000)})
start = time.time()
data['square1'] = data['value1'].apply(lambda x: x ** 2)
print("apply用时(s):", round(time.time() - start, 6))
start = time.time()
data['square2'] = data['value1'] ** 2
print("向量化用时(s):", round(time.time() - start, 6))
print("结果相等:", (data['square1'] == data['square2']).all())`,
        expectedOutput: '向量化',
      },
      {
        id: 5,
        title: '步骤5：query条件筛选',
        description: '使用df.query()进行复杂条件筛选。',
        codeTemplate: `import pandas as pd
import numpy as np
np.random.seed(42)
data = pd.DataFrame({
    'id': np.arange(100),
    'category': np.random.choice(['A','B','C','D'], 100),
    'value1': np.random.randint(1, 100, 100),
    'value2': np.random.randint(1, 100, 100)
})
filtered = data.query('category == "A" and value1 > 50 and value2 < 80')
print("筛选后行数:", len(filtered))
print(filtered.head())`,
        expectedOutput: 'category',
      },
    ],
  },
];

export const getProjectById = (id: number): Project | undefined => {
  return projects.find((p) => p.id === id);
};

export default projects;
