import { useState } from 'react'
import PracticeEditor from '../components/PracticeEditor'

const PandasTraining = () => {
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
      output: '正确读取并预览数据，无乱码',
      initialCode: `# CSV 文件的精准读入与乱码处理
import pandas as pd

# 示例：读取可能有乱码的 CSV 文件
# 尝试不同的编码
# df = pd.read_csv('data.csv', encoding='gbk', skiprows=2, header=0)

# 模拟数据
import io

# 创建模拟的 CSV 数据
csv_data = '''
说明行1: 这是多余的说明
说明行2: 请忽略

姓名,年龄,城市
张三,25,北京
李四,30,上海
王五,28,广州
''' 

# 读取 CSV 数据
df = pd.read_csv(io.StringIO(csv_data), skiprows=3)
print("读取的数据:")
print(df)
print("\n数据形状:", df.shape)
`
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
      output: '标准化的缺失值识别结果',
      initialCode: `# 脏数据的标准缺失值识别
import pandas as pd
import numpy as np

# 创建包含脏数据的 DataFrame
data = {
    '姓名': ['张三', '李四', '王五', '赵六'],
    '年龄': [25, '暂无', 28, 30],
    '工资': [8000, 'NULL', 12000, '-'],
    '城市': ['北京', '上海', ' ', '广州']
}

df = pd.DataFrame(data)
print("原始数据:")
print(df)
print("\n" + "="*50 + "\n")

# 将非标准缺失值替换为 NaN
missing_values = ['暂无', 'NULL', '-', ' ']
df_clean = df.replace(missing_values, np.nan)

print("处理后的数据:")
print(df_clean)
print("\n" + "="*50 + "\n")

# 统计每列缺失值数量
print("缺失值统计:")
print(df_clean.isnull().sum())
`
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
      output: '干净的列名，便于代码引用',
      initialCode: `# 列名标准化与清理
import pandas as pd

# 创建带有脏列名的 DataFrame
data = {
    ' 姓名 ': [ '张三', '李四', '王五' ],
    '年龄(岁)': [25, 30, 28],
    '销售额 (元)': [10000, 15000, 12000],
    '城市-地区': ['北京-朝阳', '上海-浦东', '广州-天河']
}

df = pd.DataFrame(data)
print("原始列名:")
print(df.columns)
print("\n" + "="*50 + "\n")

# 清理列名
# 去除空格、括号、特殊符号，转为小写
df.columns = df.columns.str.strip()  # 去除首尾空格
df.columns = df.columns.str.replace('[()（）]', '', regex=True)  # 去除括号
df.columns = df.columns.str.replace(' ', '_')  # 空格替换为下划线
df.columns = df.columns.str.replace('-', '_')  # 连字符替换为下划线
df.columns = df.columns.str.lower()  # 转为小写

print("清理后的列名:")
print(df.columns)
print("\n" + "="*50 + "\n")
print("数据:")
print(df)
`
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
      output: '正确的数据类型，可直接进行数值运算',
      initialCode: `# 基本数据类型转换
import pandas as pd

# 创建包含不同类型数据的 DataFrame
data = {
    '姓名': ['张三', '李四', '王五'],
    '年龄': ['25', '30', '28'],  # 字符串类型的数字
    '工资': ['8000', '12000', '10000'],  # 字符串类型的数字
    '销售额': ['15000', 'abc', '20000']  # 包含非数字字符
}

df = pd.DataFrame(data)
print("原始数据类型:")
print(df.dtypes)
print("\n" + "="*50 + "\n")

# 转换数据类型
df['年龄'] = pd.to_numeric(df['年龄'], errors='coerce')
df['工资'] = pd.to_numeric(df['工资'], errors='coerce')
df['销售额'] = pd.to_numeric(df['销售额'], errors='coerce')

print("转换后的数据类型:")
print(df.dtypes)
print("\n" + "="*50 + "\n")
print("数据:")
print(df)
print("\n" + "="*50 + "\n")

# 计算总和
print("工资总和:", df['工资'].sum())
print("销售额总和:", df['销售额'].sum())
`
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
      output: '符合条件的筛选结果',
      initialCode: `# 按条件快速筛选行
import pandas as pd

# 创建销售数据
data = {
    '姓名': ['张三', '李四', '王五', '赵六', '钱七'],
    '地区': ['华北', '华南', '华东', '华北', '西南'],
    '销售额': [8000, 4500, 6000, 9000, 3000],
    '产品': ['A', 'B', 'A', 'C', 'B']
}

df = pd.DataFrame(data)
print("原始数据:")
print(df)
print("\n" + "="*50 + "\n")

# 筛选条件1：销售额大于5000
print("销售额大于5000的记录:")
result1 = df[df['销售额'] > 5000]
print(result1)
print("\n" + "="*50 + "\n")

# 筛选条件2：地区属于华北或华东
print("地区属于华北或华东的记录:")
result2 = df[df['地区'].isin(['华北', '华东'])]
print(result2)
print("\n" + "="*50 + "\n")

# 组合条件：销售额大于5000 且 地区属于华北
print("销售额大于5000 且 地区属于华北的记录:")
result3 = df[(df['销售额'] > 5000) & (df['地区'] == '华北')]
print(result3)
`
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
      output: '排序结果和极值数据',
      initialCode: `# 单列数据的排序与极值查看
import pandas as pd
import numpy as np

# 创建产品销量数据
np.random.seed(42)
data = {
    '产品': [f'产品{i}' for i in range(1, 21)],
    '销量': np.random.randint(0, 1000, 20)
}

df = pd.DataFrame(data)
print("原始数据:")
print(df)
print("\n" + "="*50 + "\n")

# 按销量降序排序
print("按销量降序排序:")
df_sorted = df.sort_values('销量', ascending=False)
print(df_sorted)
print("\n" + "="*50 + "\n")

# 销量最高的前5名产品
print("销量最高的前5名产品:")
top5 = df.nlargest(5, '销量')
print(top5)
print("\n" + "="*50 + "\n")

# 销量最低的后5名产品
print("销量最低的后5名产品:")
bottom5 = df.nsmallest(5, '销量')
print(bottom5)
print("\n" + "="*50 + "\n")

# 销量为0的产品
print("销量为0的产品:")
zero_sales = df[df['销量'] == 0]
print(zero_sales)
`
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
      output: '去重后的数据',
      initialCode: `# 重复值的发现与剔除
import pandas as pd

# 创建包含重复值的数据
data = {
    'ID': [1, 2, 3, 4, 2, 5, 3, 6],
    '姓名': ['张三', '李四', '王五', '赵六', '李四', '钱七', '王五', '孙八'],
    '年龄': [25, 30, 28, 35, 30, 40, 28, 22]
}

df = pd.DataFrame(data)
print("原始数据:")
print(df)
print("\n" + "="*50 + "\n")

# 统计重复行数量
print("重复行数量:", df.duplicated().sum())
print("\n" + "="*50 + "\n")

# 查看重复行
print("重复行:")
print(df[df.duplicated()])
print("\n" + "="*50 + "\n")

# 按ID去重
print("按ID去重后:")
df_unique = df.drop_duplicates(subset=['ID'])
print(df_unique)
print("\n" + "="*50 + "\n")
print("去重后的数据形状:", df_unique.shape)
`
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
      output: '从字符串中提取的有效信息',
      initialCode: `# 简单的字符串切片提取信息
import pandas as pd

# 创建包含身份证号和手机号的数据
data = {
    '姓名': ['张三', '李四', '王五'],
    '身份证号': ['110101199001011234', '310101199203045678', '440106199506079876'],
    '手机号': ['13912345678', '13887654321', '15911112222']
}

df = pd.DataFrame(data)
print("原始数据:")
print(df)
print("\n" + "="*50 + "\n")

# 从身份证号提取出生年月 (第7-14位)
df['出生年月'] = df['身份证号'].str.slice(6, 14)
df['出生年月'] = pd.to_datetime(df['出生年月'], format='%Y%m%d')

# 从手机号提取运营商信息 (前3位)
def get_operator(phone):
    operator_map = {
        '139': '移动',
        '138': '移动',
        '159': '移动',
        '130': '联通',
        '131': '联通',
        '186': '联通',
        '133': '电信',
        '153': '电信',
        '189': '电信'
    }
    prefix = phone[:3]
    return operator_map.get(prefix, '未知')

df['运营商'] = df['手机号'].apply(get_operator)

print("提取信息后:")
print(df)
print("\n" + "="*50 + "\n")

# 筛选移动用户
print("移动用户:")
print(df[df['运营商'] == '移动'])
`
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
      output: '转换后的全称数据',
      initialCode: `# 利用 Map 函数做字典映射
import pandas as pd

# 创建包含性别代码的数据
data = {
    '姓名': ['张三', '李四', '王五', '赵六', '钱七'],
    '性别代码': ['M', 'F', 'M', 'M', 'F'],
    '年龄': [25, 30, 28, 35, 40]
}

df = pd.DataFrame(data)
print("原始数据:")
print(df)
print("\n" + "="*50 + "\n")

# 定义映射字典
gender_map = {'M': 'Male', 'F': 'Female'}

# 使用 map 函数转换
df['性别全称'] = df['性别代码'].map(gender_map)

print("转换后的数据:")
print(df)
print("\n" + "="*50 + "\n")

# 另一个示例：映射年龄段
def get_age_group(age):
    if age < 30:
        return '青年'
    elif age < 40:
        return '中年'
    else:
        return '老年'

df['年龄段'] = df['年龄'].apply(get_age_group)

print("添加年龄段后:")
print(df)
`
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
      output: '干净的导出文件',
      initialCode: `# 导出清洗后的数据
import pandas as pd
import io

# 创建清洗后的数据
data = {
    '姓名': ['张三', '李四', '王五', '赵六'],
    '年龄': [25, 30, 28, 35],
    '城市': ['北京', '上海', '广州', '深圳'],
    '工资': [8000, 12000, 10000, 15000]
}

df = pd.DataFrame(data)
print("清洗后的数据:")
print(df)
print("\n" + "="*50 + "\n")

# 导出为 CSV (不包含索引)
csv_output = df.to_csv(index=False)
print("CSV 输出预览:")
print(csv_output)
print("\n" + "="*50 + "\n")

# 实际导出到文件
# df.to_csv('clean_data.csv', index=False)
# df.to_excel('clean_data.xlsx', index=False)

print("数据已准备好导出！")
print("在实际环境中，取消注释上面的代码以导出文件。")
`
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
      output: '转换后的长表数据，便于可视化',
      initialCode: `# 销售宽表转长表（逆透视）
import pandas as pd

# 创建宽表数据
data = {
    '产品': ['产品A', '产品B', '产品C'],
    '1月': [100, 200, 150],
    '2月': [120, 220, 160],
    '3月': [110, 210, 170],
    '4月': [130, 230, 180]
}

df_wide = pd.DataFrame(data)
print("宽表数据:")
print(df_wide)
print("\n" + "="*50 + "\n")

# 使用 melt 转换为长表
df_long = pd.melt(
    df_wide,
    id_vars=['产品'],  # 保持不变的列
    var_name='月份',  # 变量列的名称
    value_name='销售额'  # 值列的名称
)

print("长表数据:")
print(df_long)
print("\n" + "="*50 + "\n")

# 按产品和月份排序
df_long_sorted = df_long.sort_values(['产品', '月份'])
print("排序后的长表:")
print(df_long_sorted)
`
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
      output: '多维度的分组统计结果',
      initialCode: `# 分组聚合下的多重统计
import pandas as pd

# 创建员工数据
data = {
    '部门': ['技术部', '技术部', '市场部', '市场部', '销售部', '销售部'],
    '姓名': ['张三', '李四', '王五', '赵六', '钱七', '孙八'],
    '年龄': [28, 32, 25, 30, 26, 29],
    '薪资': [15000, 18000, 12000, 14000, 10000, 13000]
}

df = pd.DataFrame(data)
print("员工数据:")
print(df)
print("\n" + "="*50 + "\n")

# 按部门分组，计算薪资的平均值、最大值和人数
print("按部门统计薪资:")
dept_stats = df.groupby('部门')['薪资'].agg(['mean', 'max', 'count'])
dept_stats.columns = ['平均薪资', '最高薪资', '人数']
print(dept_stats)
print("\n" + "="*50 + "\n")

# 对不同列应用不同的聚合函数
print("按部门统计多个指标:")
dept_multi_stats = df.groupby('部门').agg({
    '薪资': ['mean', 'max'],
    '年龄': 'mean'
})
print(dept_multi_stats)
`
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
      output: '用户 RFM 分层结果',
      initialCode: `# RFM 简易用户分层模型
import pandas as pd
from datetime import datetime, timedelta

# 创建订单数据
dates = pd.date_range(start='2024-01-01', end='2024-03-31', periods=20)
customers = ['用户A', '用户B', '用户C', '用户D'] * 5
amounts = [100, 200, 150, 300, 250, 180, 120, 220] * 2 + [160, 190]

data = {
    '用户': customers,
    '订单日期': dates,
    '金额': amounts
}

df = pd.DataFrame(data)
print("订单数据:")
print(df)
print("\n" + "="*50 + "\n")

# 计算 RFM 指标
reference_date = df['订单日期'].max() + timedelta(days=1)

rfm = df.groupby('用户').agg({
    '订单日期': lambda x: (reference_date - x.max()).days,  # Recency
    '订单日期': 'count',  # Frequency
    '金额': 'sum'  # Monetary
})

# 重命名列
rfm.columns = ['Recency', 'Frequency', 'Monetary']
print("RFM 指标:")
print(rfm)
print("\n" + "="*50 + "\n")

# RFM 评分（5分制，5最好）
rfm['R_score'] = pd.qcut(rfm['Recency'], 5, labels=[5, 4, 3, 2, 1])  # 注意：Recency 越小越好
rfm['F_score'] = pd.qcut(rfm['Frequency'], 5, labels=[1, 2, 3, 4, 5])
rfm['M_score'] = pd.qcut(rfm['Monetary'], 5, labels=[1, 2, 3, 4, 5])

# 计算总分
rfm['Total_Score'] = rfm['R_score'].astype(int) + rfm['F_score'].astype(int) + rfm['M_score'].astype(int)

print("RFM 评分结果:")
print(rfm)
`
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
      output: '关联后的完整订单数据',
      initialCode: `# 多表关联查询（VLOOKUP 平替）
import pandas as pd

# 创建产品表
products = {
    'ProductID': [1, 2, 3, 4, 5],
    'ProductName': ['产品A', '产品B', '产品C', '产品D', '产品E'],
    'Price': [100, 200, 150, 300, 250]
}
products_df = pd.DataFrame(products)

# 创建订单表
orders = {
    'OrderID': [101, 102, 103, 104, 105],
    'ProductID': [1, 2, 3, 1, 6],  # 注意：ProductID=6 在产品表中不存在
    'Quantity': [2, 1, 3, 1, 2]
}
orders_df = pd.DataFrame(orders)

print("产品表:")
print(products_df)
print("\n" + "="*50 + "\n")
print("订单表:")
print(orders_df)
print("\n" + "="*50 + "\n")

# 左连接：保留订单表的所有数据
print("左连接结果:")
left_join = pd.merge(orders_df, products_df, on='ProductID', how='left')
print(left_join)
print("\n" + "="*50 + "\n")

# 内连接：只保留两边都有的数据
print("内连接结果:")
inner_join = pd.merge(orders_df, products_df, on='ProductID', how='inner')
print(inner_join)
print("\n" + "="*50 + "\n")

# 计算订单金额
left_join['Amount'] = left_join['Price'] * left_join['Quantity']
print("计算订单金额:")
print(left_join)
`
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
      output: '重采样后的时间序列数据',
      initialCode: `# 时间序列的重采样与对齐
import pandas as pd
import numpy as np

# 创建秒级传感器数据
times = pd.date_range(start='2024-01-01 00:00:00', periods=100, freq='S')
data = {
    'timestamp': times,
    'temperature': np.random.normal(25, 2, 100),
    'humidity': np.random.normal(60, 5, 100)
}

df = pd.DataFrame(data)
print("原始秒级数据 (前10行):")
print(df.head(10))
print("\n" + "="*50 + "\n")

# 设置时间索引
df.set_index('timestamp', inplace=True)

# 重采样为5分钟平均值
print("5分钟平均值:")
df_5min = df.resample('5T').mean()
print(df_5min)
print("\n" + "="*50 + "\n")

# 重采样为1分钟平均值
print("1分钟平均值:")
df_1min = df.resample('1T').mean()
print(df_1min)
`
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
      output: '计算后的加权利润率',
      initialCode: `# 自定义函数的高效应用
import pandas as pd

# 创建销售数据
data = {
    '产品': ['产品A', '产品B', '产品C', '产品D'],
    '销售额': [10000, 15000, 12000, 8000],
    '成本': [6000, 9000, 7000, 5000],
    '权重': [1.2, 1.0, 1.5, 0.8]
}

df = pd.DataFrame(data)
print("销售数据:")
print(df)
print("\n" + "="*50 + "\n")

# 定义复杂的计算函数
def calculate_weighted_profit(row):
    """计算加权利润率"""
    revenue = row['销售额']
    cost = row['成本']
    weight = row['权重']
    
    # 计算基础利润率
    profit = revenue - cost
    profit_rate = profit / revenue if revenue > 0 else 0
    
    # 应用权重
    weighted_profit_rate = profit_rate * weight
    
    return weighted_profit_rate

# 使用 apply 应用函数
df['加权利润率'] = df.apply(calculate_weighted_profit, axis=1)

print("计算加权利润率后:")
print(df)
print("\n" + "="*50 + "\n")

# 计算总加权利润率
total_weighted_profit_rate = (df['加权利润率'] * df['销售额']).sum() / df['销售额'].sum()
print("总加权利润率:", total_weighted_profit_rate)
`
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
      output: '独热编码后的特征矩阵',
      initialCode: `# 分类变量的独热编码
import pandas as pd

# 创建包含分类变量的数据
data = {
    '姓名': ['张三', '李四', '王五', '赵六', '钱七'],
    '省份': ['北京', '上海', '广东', '北京', '上海'],
    '年龄': [25, 30, 28, 35, 40],
    '薪资': [8000, 12000, 10000, 15000, 13000]
}

df = pd.DataFrame(data)
print("原始数据:")
print(df)
print("\n" + "="*50 + "\n")

# 独热编码
df_encoded = pd.get_dummies(df, columns=['省份'], prefix='省份')

print("独热编码后:")
print(df_encoded)
print("\n" + "="*50 + "\n")

# 查看数据类型
print("数据类型:")
print(df_encoded.dtypes)
`
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
      output: '滚动计算和累计计算结果',
      initialCode: `# 累计值、滚动窗口计算
import pandas as pd
import numpy as np

# 创建销售数据
dates = pd.date_range(start='2024-01-01', periods=30, freq='D')
sales = np.random.randint(1000, 5000, 30)

data = {
    '日期': dates,
    '销售额': sales
}

df = pd.DataFrame(data)
df.set_index('日期', inplace=True)
print("销售数据 (前10行):")
print(df.head(10))
print("\n" + "="*50 + "\n")

# 计算累计销售额
df['累计销售额'] = df['销售额'].cumsum()

# 计算7日移动平均线
df['7日移动平均'] = df['销售额'].rolling(7).mean()

print("计算结果:")
print(df)
print("\n" + "="*50 + "\n")

# 查看最后几天的数据
print("最后10天的数据:")
print(df.tail(10))
`
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
      output: '处理后的异常值数据',
      initialCode: `# 基于分位数的异常值检测与截断
import pandas as pd
import numpy as np

# 创建包含异常值的数据
np.random.seed(42)
normal_prices = np.random.normal(100, 20, 98)  # 98个正常价格
outliers = [500, 600]  # 2个异常值
prices = np.concatenate([normal_prices, outliers])

# 创建DataFrame
df = pd.DataFrame({'价格': prices})
print("原始数据 (包含异常值):")
print(df)
print("\n" + "="*50 + "\n")

# 计算分位数
q_low = df['价格'].quantile(0.01)  # 1%分位数
q_high = df['价格'].quantile(0.99)  # 99%分位数
print(f"1%分位数: {q_low}")
print(f"99%分位数: {q_high}")
print("\n" + "="*50 + "\n")

# 截断异常值
df['价格_截断'] = df['价格'].clip(lower=q_low, upper=q_high)

print("处理后的数据:")
print(df)
print("\n" + "="*50 + "\n")

# 比较处理前后的统计信息
print("处理前的统计信息:")
print(df['价格'].describe())
print("\n处理后的统计信息:")
print(df['价格_截断'].describe())
`
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
      output: '数据透视表结果',
      initialCode: `# 数据透视表与交叉表
import pandas as pd
import numpy as np

# 创建销售数据
regions = ['华北', '华东', '华南', '西南'] * 5
categories = ['电子产品', '服装', '食品', '电子产品', '服装'] * 4
products = ['产品A', '产品B', '产品C', '产品D', '产品E'] * 4
amounts = np.random.randint(1000, 10000, 20)

data = {
    '地区': regions,
    '类别': categories,
    '产品': products,
    '销售额': amounts
}

df = pd.DataFrame(data)
print("销售数据:")
print(df)
print("\n" + "="*50 + "\n")

# 创建数据透视表
print("地区 x 类别的销售金额汇总:")
pivot_table = pd.pivot_table(
    df, 
    values='销售额', 
    index='地区', 
    columns='类别', 
    aggfunc='sum',
    fill_value=0
)
print(pivot_table)
print("\n" + "="*50 + "\n")

# 创建交叉表
print("地区 x 类别的销售次数:")
cross_table = pd.crosstab(df['地区'], df['类别'])
print(cross_table)
`
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
      output: '快速匹配的地理围栏结果',
      initialCode: `# 海量数据的向量化地理围栏计算
import pandas as pd
import numpy as np

# 模拟数据
np.random.seed(42)

# 生成 10000 条骑行轨迹数据（实际应用中可能是100万条）
ride_lat = np.random.uniform(39.8, 40.2, 10000)
ride_lng = np.random.uniform(116.2, 116.6, 10000)
rides = pd.DataFrame({'lat': ride_lat, 'lng': ride_lng})

# 生成 50 个地铁站数据（实际应用中可能是5000个）
subway_lat = np.random.uniform(39.8, 40.2, 50)
subway_lng = np.random.uniform(116.2, 116.6, 50)
subways = pd.DataFrame({'lat': subway_lat, 'lng': subway_lng, 'id': range(1, 51)})

print("骑行轨迹数据 (前5行):")
print(rides.head())
print("\n地铁站数据 (前5行):")
print(subways.head())
print("\n" + "="*50 + "\n")

# 方法1：使用向量化计算欧氏距离
print("使用向量化计算最近地铁站...")

# 将数据转换为 numpy 数组
ride_coords = rides[['lat', 'lng']].values
subway_coords = subways[['lat', 'lng']].values

# 使用广播计算距离矩阵 (向量化操作，无显式循环)
distances = np.sqrt(
    np.sum(
        (ride_coords[:, np.newaxis, :] - subway_coords[np.newaxis, :, :]) ** 2,
        axis=2
    )
)

# 找到每个骑行点最近的地铁站索引
nearest_subway_indices = np.argmin(distances, axis=1)

# 获取最近地铁站的信息
rides['nearest_subway_id'] = subways.iloc[nearest_subway_indices]['id'].values
rides['nearest_subway_distance'] = np.min(distances, axis=1)

print("计算完成！结果 (前10行):")
print(rides.head(10))
`
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
      output: '成功读取并处理巨型 CSV 文件',
      initialCode: `# Memory 深度优化：向下转型读取巨型 CSV
import pandas as pd
import numpy as np

# 模拟生成大型数据
print("生成模拟数据...")

# 生成 100 万行数据
n_rows = 1000000

# 生成不同类型的数据
ids = np.arange(n_rows, dtype=np.int32)  # 使用 int32 节省内存
ages = np.random.randint(0, 100, n_rows, dtype=np.int16)  # 使用 int16 节省内存
scores = np.random.normal(75, 15, n_rows).astype(np.float16)  # 使用 float16 节省内存
is_active = np.random.choice([True, False], n_rows)

# 创建 DataFrame
df = pd.DataFrame({
    'id': ids,
    'age': ages,
    'score': scores,
    'is_active': is_active
})

print(f"原始数据形状: {df.shape}")
print(f"原始数据内存使用: {df.memory_usage(deep=True).sum() / 1024 / 1024:.2f} MB")
print("\n" + "="*50 + "\n")

# 方法1：指定 dtype 读取
print("方法1：指定 dtype 读取")
# 保存为 CSV
csv_path = 'large_data.csv'
df.to_csv(csv_path, index=False)

# 定义优化的 dtype
optimized_dtypes = {
    'id': 'int32',
    'age': 'int16',
    'score': 'float16',
    'is_active': 'bool'
}

# 读取时指定 dtype
df_optimized = pd.read_csv(csv_path, dtype=optimized_dtypes)
print(f"优化后数据内存使用: {df_optimized.memory_usage(deep=True).sum() / 1024 / 1024:.2f} MB")
print("\n" + "="*50 + "\n")

# 方法2：分块读取
print("方法2：分块读取")
chunk_size = 100000
chunks = []

for chunk in pd.read_csv(csv_path, chunksize=chunk_size):
    # 处理每个块
    chunk['score_normalized'] = (chunk['score'] - chunk['score'].mean()) / chunk['score'].std()
    chunks.append(chunk)

# 合并所有块
df_chunked = pd.concat(chunks)
print(f"分块读取后数据形状: {df_chunked.shape}")
print("分块读取成功！")
`
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
      output: '标准化的公司名称',
      initialCode: `# 脏乱文本的向量化模糊清洗与实体对齐
import pandas as pd
import numpy as np

# 模拟用户输入的公司名称数据
company_names = [
    '阿里巴巴集团有限公司',
    '阿里云计算',
    '淘宝(中国)软件有限公司',
    '支付宝（中国）网络技术有限公司',
    '阿里巴巴影业集团',
    '腾讯科技有限公司',
    '腾讯控股',
    '微信支付',
    '百度在线网络技术有限公司',
    '百度搜索',
    '字节跳动科技有限公司',
    '抖音',
    '今日头条'
]

# 创建 DataFrame
df = pd.DataFrame({'company_raw': company_names})
print("原始公司名称:")
print(df)
print("\n" + "="*50 + "\n")

# 方法1：使用正则表达式映射字典进行向量化替换
print("方法1：使用正则表达式映射")

# 定义映射规则
mapping_rules = {
    r'.*阿里.*|.*淘宝.*|.*支付宝.*': '阿里巴巴',
    r'.*腾讯.*|.*微信.*': '腾讯',
    r'.*百度.*': '百度',
    r'.*字节跳动.*|.*抖音.*|.*今日头条.*': '字节跳动'
}

# 向量化替换
df['company_standard'] = df['company_raw']
for pattern, replacement in mapping_rules.items():
    df['company_standard'] = df['company_standard'].str.replace(pattern, replacement, regex=True)

print("标准化后的公司名称:")
print(df)
print("\n" + "="*50 + "\n")

# 方法2：使用 np.select 实现多条件分支匹配
print("方法2：使用 np.select 实现多条件匹配")

# 定义条件和对应的值
conditions = [
    df['company_raw'].str.contains(r'.*阿里.*|.*淘宝.*|.*支付宝.*', regex=True),
    df['company_raw'].str.contains(r'.*腾讯.*|.*微信.*', regex=True),
    df['company_raw'].str.contains(r'.*百度.*', regex=True),
    df['company_raw'].str.contains(r'.*字节跳动.*|.*抖音.*|.*今日头条.*', regex=True)
]

values = ['阿里巴巴', '腾讯', '百度', '字节跳动']

# 使用 np.select 进行匹配
df['company_standard_2'] = np.select(conditions, values, default=df['company_raw'])

print("使用 np.select 标准化后的公司名称:")
print(df[['company_raw', 'company_standard_2']])
`
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
      output: '展平的结构化数据',
      initialCode: `# 处理非结构化 JSON 嵌套列
import pandas as pd
import json

# 模拟包含 JSON 字符串的数据
 data = {
    'id': [1, 2, 3, 4, 5],
    'user_info': [
        '{"name": "张三", "age": 25, "city": "北京"}',
        '{"name": "李四", "age": 30, "city": "上海", "job": "工程师"}',
        '{"name": "王五", "age": 28, "city": "广州", "job": "设计师", "salary": 15000}',
        '{"name": "赵六", "age": 35, "city": "深圳"}',
        '{"name": "钱七", "age": 40, "city": "杭州", "job": "产品经理", "salary": 20000}'
    ],
    'score': [85, 90, 78, 92, 88]
}

df = pd.DataFrame(data)
print("原始数据:")
print(df)
print("\n" + "="*50 + "\n")

# 方法1：使用 apply 和 json.loads 解析
print("方法1：使用 apply 解析 JSON")

def parse_json(json_str):
    try:
        return json.loads(json_str)
    except:
        return {}

# 解析 JSON 列
df['user_info_dict'] = df['user_info'].apply(parse_json)

# 展平为多列
user_info_df = pd.json_normalize(df['user_info_dict'])

# 合并回原始 DataFrame
df_merged = pd.concat([df.drop('user_info_dict', axis=1), user_info_df], axis=1)

print("解析后的 dataFrame:")
print(df_merged)
print("\n" + "="*50 + "\n")

# 方法2：直接使用 json_normalize（适用于列表中的字典）
print("方法2：直接使用 json_normalize")
# 准备数据为字典列表
user_dicts = df['user_info'].apply(parse_json).tolist()
df_normalized = pd.json_normalize(user_dicts)

print("直接归一化后的 dataFrame:")
print(df_normalized)
`
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
      output: '滚动时间窗口计算结果',
      initialCode: `# 基于滚动时间窗口的复杂滑窗特征工程
import pandas as pd
import numpy as np

# 模拟登录数据
np.random.seed(42)

# 生成时间序列
times = pd.date_range(start='2024-01-01 00:00:00', periods=100, freq='2min')

# 生成 IP 地址
ips = [f'192.168.1.{i}' for i in range(1, 6)] * 20

# 生成登录结果（0 失败，1 成功）
success = np.random.choice([0, 1], size=100, p=[0.3, 0.7])

# 创建 DataFrame
df = pd.DataFrame({
    'time': times,
    'ip': ips,
    'success': success
})

# 按 IP 和时间排序
df = df.sort_values(['ip', 'time']).reset_index(drop=True)

print("原始登录数据 (前20行):")
print(df.head(20))
print("\n" + "="*50 + "\n")

# 计算每个 IP 过去 30 分钟内的失败次数
print("计算过去 30 分钟内的失败次数...")

# 为每个 IP 单独处理
results = []
for ip, group in df.groupby('ip'):
    # 设置时间索引
    group = group.set_index('time')
    
    # 标记失败记录
    group['failure'] = 1 - group['success']
    
    # 计算 30 分钟滚动窗口内的失败次数（不包含当前记录）
    group['failure_count_30min'] = group['failure'].rolling('30min', closed='left').sum()
    
    # 重置索引
    group = group.reset_index()
    results.append(group)

# 合并结果
df_result = pd.concat(results).sort_values('time').reset_index(drop=True)

print("计算结果 (前20行):")
print(df_result[['time', 'ip', 'success', 'failure_count_30min']].head(20))
`
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
      output: '标准化处理后的数据',
      initialCode: `# 构建完全可复用的数据预处理 Pipeline
import pandas as pd
import numpy as np

# 定义数据清洗器类
class DataCleaner:
    def __init__(self):
        self.means = {}
        self.std = {}
        self.fill_values = {}
    
    def fit(self, df, numeric_cols, categorical_cols):
        """在训练集上拟合，保存统计信息"""
        # 保存数值列的均值和标准差
        for col in numeric_cols:
            self.means[col] = df[col].mean()
            self.std[col] = df[col].std()
        
        # 保存分类列的填充值（使用众数）
        for col in categorical_cols:
            self.fill_values[col] = df[col].mode()[0]
        
        return self
    
    def transform(self, df, numeric_cols, categorical_cols):
        """使用保存的统计信息转换数据"""
        df_copy = df.copy()
        
        # 填充缺失值
        for col in numeric_cols:
            df_copy[col] = df_copy[col].fillna(self.means[col])
        
        for col in categorical_cols:
            df_copy[col] = df_copy[col].fillna(self.fill_values[col])
        
        # 标准化数值列
        for col in numeric_cols:
            df_copy[f'{col}_standardized'] = (df_copy[col] - self.means[col]) / self.std[col]
        
        return df_copy

# 模拟数据
np.random.seed(42)

# 训练集
train_data = {
    'age': [25, 30, np.nan, 35, 40],
    'salary': [5000, 6000, 7000, np.nan, 9000],
    'gender': ['M', 'F', 'M', np.nan, 'F'],
    'score': [85, 90, 78, 92, 88]
}

train_df = pd.DataFrame(train_data)

# 测试集
test_data = {
    'age': [28, np.nan, 32],
    'salary': [5500, 6500, np.nan],
    'gender': [np.nan, 'M', 'F'],
    'score': [82, 87, 91]
}

test_df = pd.DataFrame(test_data)

print("训练集:")
print(train_df)
print("\n测试集:")
print(test_df)
print("\n" + "="*50 + "\n")

# 使用数据清洗器
cleaner = DataCleaner()

# 在训练集上拟合
cleaner.fit(
    train_df,
    numeric_cols=['age', 'salary'],
    categorical_cols=['gender']
)

# 转换训练集和测试集
train_cleaned = cleaner.transform(
    train_df,
    numeric_cols=['age', 'salary'],
    categorical_cols=['gender']
)

test_cleaned = cleaner.transform(
    test_df,
    numeric_cols=['age', 'salary'],
    categorical_cols=['gender']
)

print("清洗后的训练集:")
print(train_cleaned)
print("\n清洗后的测试集:")
print(test_cleaned)
`
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
      output: '多级索引的切片和计算结果',
      initialCode: `# 多级行索引 (MultiIndex) 的进阶切片与运算
import pandas as pd
import numpy as np

# 创建多级索引数据
countries = ['中国', '中国', '中国', '中国', '中国', '中国']
provinces = ['广东省', '广东省', '江苏省', '江苏省', '浙江省', '浙江省']
cities = ['广州', '深圳', '南京', '苏州', '杭州', '宁波']

# 创建索引
index = pd.MultiIndex.from_tuples(
    list(zip(countries, provinces, cities)),
    names=['国家', '省份', '城市']
)

# 生成数据
data = {
    '人口': np.random.randint(1000000, 10000000, 6),
    'GDP': np.random.randint(100000000000, 500000000000, 6),
    '面积': np.random.randint(1000, 10000, 6)
}

# 创建 DataFrame
df = pd.DataFrame(data, index=index)

print("多级索引数据:")
print(df)
print("\n" + "="*50 + "\n")

# 方法1：使用 xs 进行跨级切片
print("方法1：使用 xs 提取广东省数据:")
guangdong_data = df.xs('广东省', level='省份')
print(guangdong_data)
print("\n" + "="*50 + "\n")

# 方法2：使用 loc 进行切片
print("方法2：使用 loc 提取江苏省数据:")
jiangsu_data = df.loc[('中国', '江苏省', slice(None))]
print(jiangsu_data)
print("\n" + "="*50 + "\n")

# 方法3：unstack 变换形状
print("方法3：unstack 变换形状:")
df_unstacked = df.unstack(level='省份')
print(df_unstacked)
print("\n" + "="*50 + "\n")

# 计算广东省和江苏省的 GDP 环比
print("计算广东省和江苏省的 GDP 环比:")
guangdong_gdp = df.xs('广东省', level='省份')['GDP'].sum()
jiangsu_gdp = df.xs('江苏省', level='省份')['GDP'].sum()
growth_rate = (guangdong_gdp - jiangsu_gdp) / jiangsu_gdp * 100

print(f"广东省 GDP: {guangdong_gdp}")
print(f"江苏省 GDP: {jiangsu_gdp}")
print(f"广东省 GDP 比江苏省高: {growth_rate:.2f}%")
`
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
      output: '加速后的筛选结果',
      initialCode: `## 高性能 Eval 与 Query 加速筛选
import pandas as pd
import numpy as np
import time

# 生成大型数据
print("生成大型数据...")
np.random.seed(42)

# 生成 100 万行数据
n_rows = 1000000
data = {
    'A': np.random.normal(0, 1, n_rows),
    'B': np.random.normal(0, 1, n_rows),
    'C': np.random.normal(0, 1, n_rows),
    'D': np.random.normal(0, 1, n_rows)
}

df = pd.DataFrame(data)
print(f"数据形状: {df.shape}")
print("\n" + "="*50 + "\n")

# 方法1：传统布尔索引
print("方法1：传统布尔索引")
start_time = time.time()
result1 = df[(df['A'] > 0) & (df['B'] < 0) & (df['C'] > df['D'])]
end_time = time.time()
print(f"执行时间: {end_time - start_time:.4f} 秒")
print(f"结果行数: {len(result1)}")
print("\n" + "="*50 + "\n")

# 方法2：使用 query 方法
print("方法2：使用 query 方法")
start_time = time.time()
result2 = df.query('A > 0 and B < 0 and C > D')
end_time = time.time()
print(f"执行时间: {end_time - start_time:.4f} 秒")
print(f"结果行数: {len(result2)}")
print("\n" + "="*50 + "\n")

# 方法3：使用 eval 进行列间运算
print("方法3：使用 eval 进行列间运算")
start_time = time.time()
df['E'] = pd.eval('(A + B) / (C + D)', engine='numexpr')
end_time = time.time()
print(f"执行时间: {end_time - start_time:.4f} 秒")
print(f"新列 'E' 的前5个值:")
print(df['E'].head())
`
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
      output: '生成的信用评分卡',
      initialCode: `# 自定义加权分箱与评分卡映射
import pandas as pd
import numpy as np

# 模拟用户数据
np.random.seed(42)

n_users = 1000
data = {
    'user_id': range(1, n_users + 1),
    'age': np.random.randint(18, 70, n_users),
    'debt_ratio': np.random.uniform(0, 1, n_users),
    'income': np.random.normal(10000, 5000, n_users),
    'credit_history': np.random.randint(0, 10, n_users)
}

df = pd.DataFrame(data)
print("原始用户数据 (前10行):")
print(df.head(10))
print("\n" + "="*50 + "\n")

# 1. 年龄分箱
print("1. 年龄分箱:")
age_bins = [18, 30, 40, 50, 60, 70]
age_labels = [5, 4, 3, 2, 1]  # 年龄越小分数越高
df['age_score'] = pd.cut(df['age'], bins=age_bins, labels=age_labels, right=False)
df['age_score'] = df['age_score'].astype(int)
print(df[['age', 'age_score']].head(10))
print("\n" + "="*50 + "\n")

# 2. 负债率分箱
print("2. 负债率分箱:")
debt_bins = [0, 0.3, 0.6, 1.0]
debt_labels = [5, 3, 1]  # 负债率越低分数越高
df['debt_score'] = pd.cut(df['debt_ratio'], bins=debt_bins, labels=debt_labels, right=False)
df['debt_score'] = df['debt_score'].astype(int)
print(df[['debt_ratio', 'debt_score']].head(10))
print("\n" + "="*50 + "\n")

# 3. 收入归一化评分
print("3. 收入归一化评分:")
df['income_rank'] = df['income'].rank(pct=True)
df['income_score'] = pd.cut(df['income_rank'], bins=5, labels=[1, 2, 3, 4, 5])
df['income_score'] = df['income_score'].astype(int)
print(df[['income', 'income_score']].head(10))
print("\n" + "="*50 + "\n")

# 4. 信用历史评分
print("4. 信用历史评分:")
df['credit_score'] = df['credit_history']
print(df[['credit_history', 'credit_score']].head(10))
print("\n" + "="*50 + "\n")

# 5. 计算总信用分（加权平均）
print("5. 计算总信用分:")
weights = {
    'age_score': 0.2,
    'debt_score': 0.3,
    'income_score': 0.3,
    'credit_score': 0.2
}

df['total_score'] = (
    df['age_score'] * weights['age_score'] +
    df['debt_score'] * weights['debt_score'] +
    df['income_score'] * weights['income_score'] +
    df['credit_score'] * weights['credit_score']
).round(2)

# 信用等级
score_bins = [0, 2, 3, 4, 5]
score_labels = ['低', '中低', '中高', '高']
df['credit_level'] = pd.cut(df['total_score'], bins=score_bins, labels=score_labels, right=False)

print("最终信用评分结果 (前10行):")
print(df[['user_id', 'total_score', 'credit_level']].head(10))
`
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
      output: '自动化数据质检报告',
      initialCode: `# AI 建模前的最终数据检视报告生成
import pandas as pd
import numpy as np

# 模拟数据
np.random.seed(42)

n_rows = 1000
data = {
    'numeric_1': np.random.normal(100, 10, n_rows),
    'numeric_2': np.random.normal(50, 5, n_rows),
    'numeric_3': np.random.uniform(0, 1, n_rows),
    'categorical_1': np.random.choice(['A', 'B', 'C'], size=n_rows),
    'categorical_2': np.random.choice(['X', 'Y'], size=n_rows),
    'date': pd.date_range(start='2024-01-01', periods=n_rows, freq='D')
}

# 添加一些缺失值
data['numeric_1'][::10] = np.nan  # 10% 缺失值
data['numeric_2'][::20] = np.nan  # 5% 缺失值
data['categorical_1'][::15] = np.nan  # ~6.7% 缺失值

# 创建 DataFrame
df = pd.DataFrame(data)
print("原始数据 (前10行):")
print(df.head(10))
print("\n" + "="*50 + "\n")

# 1. 基本信息
print("1. 基本信息:")
print(f"数据形状: {df.shape}")
print(f"列数: {df.shape[1]}")
print(f"行数: {df.shape[0]}")
print("\n" + "="*50 + "\n")

# 2. 数据类型
print("2. 数据类型:")
print(df.dtypes)
print("\n" + "="*50 + "\n")

# 3. 缺失值统计
print("3. 缺失值统计:")
missing_stats = df.isnull().sum().reset_index()
missing_stats.columns = ['列名', '缺失值数量']
missing_stats['缺失率(%)'] = (missing_stats['缺失值数量'] / len(df) * 100).round(2)
print(missing_stats)
print("\n" + "="*50 + "\n")

# 4. 数值型变量统计
print("4. 数值型变量统计:")
numeric_cols = df.select_dtypes(include=['float64', 'int64']).columns
print(df[numeric_cols].describe())
print("\n" + "="*50 + "\n")

# 5. 分布指标（偏度和峰度）
print("5. 分布指标:")
distribution_stats = pd.DataFrame()
distribution_stats['均值'] = df[numeric_cols].mean()
distribution_stats['标准差'] = df[numeric_cols].std()
distribution_stats['偏度'] = df[numeric_cols].skew()
distribution_stats['峰度'] = df[numeric_cols].kurtosis()
print(distribution_stats)
print("\n" + "="*50 + "\n")

# 6. 分类变量统计
print("6. 分类变量统计:")
categorical_cols = df.select_dtypes(include=['object', 'category']).columns
for col in categorical_cols:
    print(f"\n{col} 分布:")
    print(df[col].value_counts())
print("\n" + "="*50 + "\n")

# 7. 生成 Markdown 格式的数据字典
print("7. 数据字典 (Markdown 格式):")
print("| 列名 | 数据类型 | 缺失率(%) | 描述 |")
print("|------|----------|----------|------|")
for col in df.columns:
    dtype = str(df[col].dtype)
    missing_rate = (df[col].isnull().sum() / len(df) * 100).round(2)
    description = f"{col} 字段"
    print(f"| {col} | {dtype} | {missing_rate} | {description} |")
`
    }
  ]

  // 过滤项目
  const filteredProjects = activeDifficulty === 'all' 
    ? trainingLevels 
    : trainingLevels.filter(project => project.difficulty === activeDifficulty)

  const toggleExpand = (id: number) => {
    setExpanded(expanded === id ? null : id)
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-pixel-fade-in">
          <h1 className="text-3xl font-bold text-[#1a365d] mb-4 font-pixel">AI时代 Python 数据分析实战训练营</h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-pixel text-sm">
            通过 30 个由浅入深、源自真实业务场景的 Pandas 实战项目，彻底掌握数据清洗、特征工程、高性能向量化计算的核心技能
          </p>
        </div>

        {/* 难度筛选 */}
        <div className="bg-white rounded-md border-4 border-[#1a365d] shadow-md p-6 mb-8 animate-pixel-fade-in">
          <h3 className="text-lg font-bold text-[#1a365d] mb-4 font-pixel">🎯 难度筛选</h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setActiveDifficulty('all')}
              className={`px-4 py-2 border-2 rounded-md font-pixel text-sm transition-colors ${
                activeDifficulty === 'all'
                  ? 'bg-[#ed8936] text-white border-[#1a365d]'
                  : 'bg-white text-[#1a365d] border-[#1a365d] hover:bg-gray-100'
              }`}
            >
              全部难度
            </button>
            <button
              onClick={() => setActiveDifficulty('easy')}
              className={`px-4 py-2 border-2 rounded-md font-pixel text-sm transition-colors ${
                activeDifficulty === 'easy'
                  ? 'bg-[#48bb78] text-white border-[#1a365d]'
                  : 'bg-white text-[#1a365d] border-[#1a365d] hover:bg-gray-100'
              }`}
            >
              🟢 简单 (1-10)
            </button>
            <button
              onClick={() => setActiveDifficulty('medium')}
              className={`px-4 py-2 border-2 rounded-md font-pixel text-sm transition-colors ${
                activeDifficulty === 'medium'
                  ? 'bg-[#ed8936] text-white border-[#1a365d]'
                  : 'bg-white text-[#1a365d] border-[#1a365d] hover:bg-gray-100'
              }`}
            >
              🟡 中等 (11-20)
            </button>
            <button
              onClick={() => setActiveDifficulty('hard')}
              className={`px-4 py-2 border-2 rounded-md font-pixel text-sm transition-colors ${
                activeDifficulty === 'hard'
                  ? 'bg-[#f56565] text-white border-[#1a365d]'
                  : 'bg-white text-[#1a365d] border-[#1a365d] hover:bg-gray-100'
              }`}
            >
              🔴 困难 (21-30)
            </button>
          </div>
        </div>

        {/* 项目列表 */}
        <div className="space-y-8 animate-pixel-fade-in">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-md border-4 border-[#1a365d] shadow-md overflow-hidden">
              {/* 项目标题和难度 */}
              <div 
                className="bg-gray-100 p-6 border-b-4 border-[#ed8936] cursor-pointer"
                onClick={() => toggleExpand(project.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-[#1a365d] font-pixel">
                      项目 {project.id}: {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-pixel mt-1">
                      {project.phase}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-pixel ${
                      project.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                      project.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {project.difficulty === 'easy' ? '🟢 简单' :
                       project.difficulty === 'medium' ? '🟡 中等' :
                       '🔴 困难'}
                    </span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 text-[#1a365d] transition-transform ${
                        expanded === project.id ? 'transform rotate-180' : ''
                      }`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* 项目详情 */}
              {expanded === project.id && (
                <div className="p-6 space-y-6">
                  {/* 场景描述 */}
                  <div>
                    <h4 className="text-md font-bold text-[#1a365d] mb-2 font-pixel">🎯 场景痛点</h4>
                    <p className="text-gray-700 font-pixel text-sm">{project.scenario}</p>
                  </div>

                  {/* 训练技能 */}
                  <div>
                    <h4 className="text-md font-bold text-[#1a365d] mb-2 font-pixel">🛠️ 训练技能</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 font-pixel text-sm">
                      {project.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>

                  {/* 预期输出 */}
                  <div>
                    <h4 className="text-md font-bold text-[#1a365d] mb-2 font-pixel">📊 预期输出</h4>
                    <p className="text-gray-700 font-pixel text-sm">{project.output}</p>
                  </div>

                  {/* 代码编辑器 */}
                  <div className="mt-6">
                    <h4 className="text-md font-bold text-[#1a365d] mb-4 font-pixel">💻 实践环境</h4>
                    <PracticeEditor 
                      initialCode={project.initialCode}
                      title={`项目 ${project.id}: ${project.title}`}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PandasTraining