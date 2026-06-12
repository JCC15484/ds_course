export interface ChoiceQuestion {
  id: number;
  content: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CodeQuestion {
  id: number;
  content: string;
  hint: string;
  testCases: { input?: string; expected: string }[];
  referenceCode: string;
}

export interface PracticeSet {
  id: number;
  title: string;
  category: string;
  difficulty: string;
  color: string;
  description: string;
  choiceQuestions: ChoiceQuestion[];
  codeQuestions: CodeQuestion[];
}

export const practiceSets: PracticeSet[] = [
  {
    id: 1,
    title: 'Python基础 - 核心语法练习',
    category: 'Python基础',
    difficulty: '入门',
    color: 'from-green-400 to-green-600',
    description: '掌握Python基本语法，包括变量、数据类型、列表、字典等',
    choiceQuestions: [
      {
        id: 1,
        content: '下列哪个选项可以创建一个空列表？',
        options: ['list()', '{}', '()', 'None'],
        correctIndex: 0,
        explanation: 'list() 或 [] 可以创建空列表，{} 创建空字典，() 创建空元组，None 是空对象。'
      },
      {
        id: 2,
        content: '如何获取列表 [1, 2, 3, 4, 5] 的最后一个元素？',
        options: ['list[-1]', 'list[-0]', 'list[5]', 'list[last]'],
        correctIndex: 0,
        explanation: '列表索引从0开始，-1表示倒数第一个元素，即最后一个元素。索引5会超出范围（最大索引是4）。'
      },
      {
        id: 3,
        content: '以下哪个是Python中的字符串？',
        options: ['123', '"hello"', '[1, 2, 3]', '{"name": "Tom"}'],
        correctIndex: 1,
        explanation: '使用单引号或双引号括起来的是字符串。123是整数，[1,2,3]是列表，{"name":"Tom"}是字典。'
      },
      {
        id: 4,
        content: '执行 print(3 + 4 * 2) 的结果是？',
        options: ['14', '11', '24', '10'],
        correctIndex: 1,
        explanation: '根据运算符优先级，先算乘法 4*2=8，再算加法 3+8=11。如果想要 (3+4)*2=14，需要使用括号。'
      },
      {
        id: 5,
        content: '以下哪个关键字用于定义函数？',
        options: ['function', 'def', 'func', 'define'],
        correctIndex: 1,
        explanation: 'Python 使用 def 关键字来定义函数，例如：def my_function(): pass'
      }
    ],
    codeQuestions: [
      {
        id: 1,
        content: '任务：创建一个包含数字1到5的列表，并打印该列表。',
        hint: '使用方括号 [] 创建列表，用 print() 输出',
        testCases: [
          { expected: '[1, 2, 3, 4, 5]' }
        ],
        referenceCode: `my_list = [1, 2, 3, 4, 5]
print(my_list)`
      },
      {
        id: 2,
        content: '任务：向列表 fruits = ["苹果", "香蕉", "橙子"] 中添加 "葡萄"，然后打印完整列表。',
        hint: '使用 .append() 方法向列表末尾添加元素',
        testCases: [
          { expected: "['苹果', '香蕉', '橙子', '葡萄']" }
        ],
        referenceCode: `fruits = ["苹果", "香蕉", "橙子"]
fruits.append("葡萄")
print(fruits)`
      },
      {
        id: 3,
        content: '任务：定义一个函数 add，接受两个参数 a 和 b，返回它们的和，并调用函数计算 10 + 20，打印结果。',
        hint: '使用 def 关键字定义函数，用 return 返回结果',
        testCases: [
          { expected: '30' }
        ],
        referenceCode: `def add(a, b):
    return a + b

result = add(10, 20)
print(result)`
      },
      {
        id: 4,
        content: '任务：创建一个字典 student，包含 name: "小明"、age: 18、grade: "高三"，然后打印整个字典。',
        hint: '使用花括号 {} 创建字典，键值对用冒号分隔',
        testCases: [
          { expected: "{'name': '小明', 'age': 18, 'grade': '高三'}" }
        ],
        referenceCode: `student = {
    "name": "小明",
    "age": 18,
    "grade": "高三"
}
print(student)`
      },
      {
        id: 5,
        content: '任务：使用 for 循环打印 1 到 5 的每个数字（每行一个）。',
        hint: '使用 range() 函数和 for 循环',
        testCases: [
          { expected: '1\n2\n3\n4\n5' }
        ],
        referenceCode: `for i in range(1, 6):
    print(i)`
      }
    ]
  },
  {
    id: 2,
    title: 'NumPy数值计算 - 数组操作基础',
    category: '数值计算',
    difficulty: '基础',
    color: 'from-blue-400 to-blue-600',
    description: '学习NumPy数组的创建、索引、切片和基本运算',
    choiceQuestions: [
      {
        id: 1,
        content: '下列哪个选项用于创建一个全零的NumPy数组？',
        options: ['np.zeros()', 'np.ones()', 'np.empty()', 'np.full()'],
        correctIndex: 0,
        explanation: 'np.zeros() 创建全零数组，np.ones() 创建全1数组，np.empty() 创建未初始化数组，np.full() 用指定值填充。'
      },
      {
        id: 2,
        content: '对于数组 arr = np.array([1, 2, 3, 4, 5])，arr[2] 的值是？',
        options: ['1', '2', '3', '4'],
        correctIndex: 2,
        explanation: 'NumPy数组索引从0开始，arr[0]=1, arr[1]=2, arr[2]=3。'
      },
      {
        id: 3,
        content: 'np.arange(0, 10, 2) 会生成什么？',
        options: ['[0, 2, 4, 6, 8]', '[0, 2, 4, 6, 8, 10]', '[1, 3, 5, 7, 9]', '[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]'],
        correctIndex: 0,
        explanation: 'arange(start, stop, step) 从0开始到10（不包含），步长2，得到 [0, 2, 4, 6, 8]。'
      },
      {
        id: 4,
        content: '两个形状相同的NumPy数组 a 和 b 相加，应该使用？',
        options: ['a + b', 'np.add(a, b)', '两者都可以', 'a.add(b)'],
        correctIndex: 2,
        explanation: 'NumPy支持运算符重载，a + b 和 np.add(a, b) 都可以实现逐元素相加。'
      },
      {
        id: 5,
        content: 'np.array([1, 2, 3]).shape 的结果是？',
        options: ['(3,)', '(1, 3)', '(3, 1)', '3'],
        correctIndex: 0,
        explanation: '一维数组的形状是 (n,)，其中n是元素个数。二维数组才是 (行, 列)。'
      }
    ],
    codeQuestions: [
      {
        id: 1,
        content: '任务：导入numpy库并命名为np，创建一个包含 [1, 2, 3, 4, 5] 的数组并打印。',
        hint: '使用 import numpy as np 导入，用 np.array() 创建数组',
        testCases: [
          { expected: '[1 2 3 4 5]' }
        ],
        referenceCode: `import numpy as np

arr = np.array([1, 2, 3, 4, 5])
print(arr)`
      },
      {
        id: 2,
        content: '任务：创建一个 3x3 的全0数组（整数类型）并打印。',
        hint: '使用 np.zeros((3, 3), dtype=int)',
        testCases: [
          { expected: '[[0 0 0]' }
        ],
        referenceCode: `import numpy as np

zeros = np.zeros((3, 3), dtype=int)
print(zeros)`
      },
      {
        id: 3,
        content: '任务：创建数组 a = [1, 2, 3] 和数组 b = [4, 5, 6]，计算它们的和、差、乘积并打印。',
        hint: '直接使用 +, -, * 运算符进行逐元素运算',
        testCases: [
          { expected: '[5 7 9]' }
        ],
        referenceCode: `import numpy as np

a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
print(a + b)
print(a - b)
print(a * b)`
      },
      {
        id: 4,
        content: '任务：创建数组 arr = np.array([10, 20, 30, 40, 50])，计算并打印它的平均值和最大值。',
        hint: '使用 arr.mean() 计算平均值，arr.max() 计算最大值',
        testCases: [
          { expected: '30.0' }
        ],
        referenceCode: `import numpy as np

arr = np.array([10, 20, 30, 40, 50])
print(arr.mean())
print(arr.max())`
      },
      {
        id: 5,
        content: '任务：使用 np.linspace 创建从 0 到 10 的 5 个等间隔数字的数组，并打印。',
        hint: 'np.linspace(start, stop, num) 包括端点',
        testCases: [
          { expected: '[ 0.   2.5  5.   7.5 10. ]' }
        ],
        referenceCode: `import numpy as np

arr = np.linspace(0, 10, 5)
print(arr)`
      }
    ]
  },
  {
    id: 3,
    title: 'Pandas数据处理 - DataFrame基础',
    category: '表格处理',
    difficulty: '基础',
    color: 'from-purple-400 to-purple-600',
    description: '掌握Pandas核心数据结构和基础操作',
    choiceQuestions: [
      {
        id: 1,
        content: 'Pandas中用于处理二维表格数据的主要数据结构是？',
        options: ['Series', 'DataFrame', 'Panel', 'Array'],
        correctIndex: 1,
        explanation: 'DataFrame是Pandas处理二维表格数据的核心结构，Series用于一维数据。'
      },
      {
        id: 2,
        content: '要从CSV文件读取数据，应该使用哪个函数？',
        options: ['pd.read_csv()', 'pd.load_csv()', 'pd.open_csv()', 'pd.csv_read()'],
        correctIndex: 0,
        explanation: 'pd.read_csv() 是Pandas提供的读取CSV文件的标准函数。'
      },
      {
        id: 3,
        content: '对于 DataFrame df，获取 "name" 列数据的正确方式是？',
        options: ['df.name', 'df["name"]', '两者都可以', 'df.column("name")'],
        correctIndex: 2,
        explanation: 'df["name"] 和 df.name 都可以访问列，但方括号语法更稳健，特别是当列名包含空格时。'
      },
      {
        id: 4,
        content: '以下哪个方法用于查看 DataFrame 的前5行数据？',
        options: ['df.top()', 'df.head()', 'df.first()', 'df.preview()'],
        correctIndex: 1,
        explanation: 'df.head(n) 返回前n行数据，默认5行。df.tail() 返回后n行。'
      },
      {
        id: 5,
        content: '要获取 DataFrame 的形状（行数和列数），应该使用？',
        options: ['df.shape', 'df.size', 'df.length', 'df.dim'],
        correctIndex: 0,
        explanation: 'df.shape 返回 (行数, 列数) 的元组。df.size 返回元素总数。'
      }
    ],
    codeQuestions: [
      {
        id: 1,
        content: '任务：导入pandas并命名为pd，从字典创建一个DataFrame，包含 name: ["小明", "小红", "小刚"] 和 age: [18, 19, 17]，然后打印。',
        hint: '使用 pd.DataFrame(dict) 创建DataFrame',
        testCases: [
          { expected: 'name  age' }
        ],
        referenceCode: `import pandas as pd

data = {
    "name": ["小明", "小红", "小刚"],
    "age": [18, 19, 17]
}
df = pd.DataFrame(data)
print(df)`
      },
      {
        id: 2,
        content: '任务：创建一个简单的DataFrame，包含 product: ["A", "B", "C"] 和 sales: [100, 200, 150]，然后打印它的形状 (shape)。',
        hint: 'df.shape 返回 (行数, 列数)',
        testCases: [
          { expected: '(3, 2)' }
        ],
        referenceCode: `import pandas as pd

data = {"product": ["A", "B", "C"], "sales": [100, 200, 150]}
df = pd.DataFrame(data)
print(df.shape)`
      },
      {
        id: 3,
        content: '任务：创建DataFrame，包含 name: ["Tom", "Jerry", "Mickey"] 和 score: [85, 92, 78]，然后只打印 score 列。',
        hint: '使用 df["score"] 或 df.score 选择列',
        testCases: [
          { expected: '85' }
        ],
        referenceCode: `import pandas as pd

data = {"name": ["Tom", "Jerry", "Mickey"], "score": [85, 92, 78]}
df = pd.DataFrame(data)
print(df["score"])`
      },
      {
        id: 4,
        content: '任务：创建一个DataFrame，包含 subject: ["语文", "数学", "英语"] 和 score: [85, 92, 78]，计算并打印分数列的平均值和总和。',
        hint: '使用 df["score"].mean() 和 df["score"].sum()',
        testCases: [
          { expected: '85.0' }
        ],
        referenceCode: `import pandas as pd

data = {"subject": ["语文", "数学", "英语"], "score": [85, 92, 78]}
df = pd.DataFrame(data)
print(df["score"].mean())
print(df["score"].sum())`
      },
      {
        id: 5,
        content: '任务：创建 DataFrame，包含 city: ["北京", "上海", "广州", "深圳"] 和 population_million: [2189, 2487, 1530, 1344]，使用 sort_values 按人口从大到小排序并打印。',
        hint: '使用 df.sort_values("population_million", ascending=False)',
        testCases: [
          { expected: '上海' }
        ],
        referenceCode: `import pandas as pd

data = {"city": ["北京", "上海", "广州", "深圳"],
        "population_million": [2189, 2487, 1530, 1344]}
df = pd.DataFrame(data)
df_sorted = df.sort_values("population_million", ascending=False)
print(df_sorted)`
      }
    ]
  },
  {
    id: 4,
    title: '数据清洗 - 缺失值与异常值处理',
    category: '数据清洗',
    difficulty: '基础',
    color: 'from-orange-400 to-orange-600',
    description: '学习检测和处理缺失值、异常值的常用方法',
    choiceQuestions: [
      {
        id: 1,
        content: '检测DataFrame中每个元素是否为缺失值(NaN)，应使用？',
        options: ['df.isna()', 'df.null()', 'df.missing()', 'df.empty()'],
        correctIndex: 0,
        explanation: 'df.isna() 或 df.isnull() 可以检测缺失值，返回布尔值DataFrame。'
      },
      {
        id: 2,
        content: '统计每列缺失值的数量，最简洁的写法是？',
        options: ['df.isna().sum()', 'df.count()', 'df.sum().isna()', 'df.missing_count()'],
        correctIndex: 0,
        explanation: 'df.isna().sum() 先将缺失值标记为True(1)，非缺失值标记为False(0)，再按列求和即得缺失值数量。'
      },
      {
        id: 3,
        content: '用前向填充（用上一个非缺失值填充）缺失值，应使用？',
        options: ['df.fillna(method="ffill")', 'df.fillna(0)', 'df.dropna()', 'df.interpolate()'],
        correctIndex: 0,
        explanation: 'method="ffill" 表示 forward fill，即用前一个值填充。bfill是后向填充。'
      },
      {
        id: 4,
        content: 'IQR方法检测异常值中，IQR指的是？',
        options: ['第25百分位数与第75百分位数之差', '最大值与最小值之差', '平均值与中位数之差', '标准差的两倍'],
        correctIndex: 0,
        explanation: 'IQR = Q3 - Q1，即上四分位数与下四分位数之差。常用规则：异常值 = < Q1-1.5*IQR 或 > Q3+1.5*IQR。'
      },
      {
        id: 5,
        content: '删除包含缺失值的行，应使用？',
        options: ['df.dropna()', 'df.fillna()', 'df.drop()', 'df.remove_na()'],
        correctIndex: 0,
        explanation: 'df.dropna() 默认删除任何包含NaN的行。axis=1 删除包含缺失值的列。'
      }
    ],
    codeQuestions: [
      {
        id: 1,
        content: '任务：创建一个包含缺失值的DataFrame（用 None 或 np.nan），包含 name: ["A", "B", None, "D"] 和 score: [85, None, 78, 92]，然后打印每列的缺失值数量。',
        hint: '使用 df.isna().sum() 统计缺失值',
        testCases: [
          { expected: '1' }
        ],
        referenceCode: `import pandas as pd
import numpy as np

data = {"name": ["A", "B", None, "D"], "score": [85, None, 78, 92]}
df = pd.DataFrame(data)
print(df.isna().sum())`
      },
      {
        id: 2,
        content: '任务：创建一个 DataFrame，包含 value: [10, np.nan, 30, np.nan, 50]，使用 0 填充缺失值并打印。',
        hint: '使用 df.fillna(0)',
        testCases: [
          { expected: '0.0' }
        ],
        referenceCode: `import pandas as pd
import numpy as np

df = pd.DataFrame({"value": [10, np.nan, 30, np.nan, 50]})
df_filled = df.fillna(0)
print(df_filled)`
      },
      {
        id: 3,
        content: '任务：创建 DataFrame data = {"score": [10, 20, 30, np.nan, 50]}，使用前向填充 ffill 处理缺失值并打印结果。',
        hint: '使用 df.fillna(method="ffill") 或 df.ffill()',
        testCases: [
          { expected: '30.0' }
        ],
        referenceCode: `import pandas as pd
import numpy as np

df = pd.DataFrame({"score": [10, 20, 30, np.nan, 50]})
df_filled = df.ffill()
print(df_filled)`
      },
      {
        id: 4,
        content: '任务：创建 DataFrame，包含 data: [1, 2, 3, 4, 5, 100, 6, 7, 8, 9]，计算 IQR 并找出大于 Q3+1.5*IQR 的异常值。提示：使用 quantile(0.75) 和 quantile(0.25)。',
        hint: 'IQR = Q3 - Q1，异常值阈值 = Q3 + 1.5 * IQR',
        testCases: [
          { expected: '100' }
        ],
        referenceCode: `import pandas as pd

df = pd.DataFrame({"data": [1, 2, 3, 4, 5, 100, 6, 7, 8, 9]})
Q1 = df["data"].quantile(0.25)
Q3 = df["data"].quantile(0.75)
IQR = Q3 - Q1
upper = Q3 + 1.5 * IQR
outliers = df[df["data"] > upper]
print(outliers)`
      },
      {
        id: 5,
        content: '任务：创建 DataFrame，包含 score: [88, 92, np.nan, 85, 90, np.nan, 78]，使用列的平均值填充缺失值并打印。',
        hint: '使用 df.fillna(df.mean())',
        testCases: [
          { expected: '86.6' }
        ],
        referenceCode: `import pandas as pd
import numpy as np

df = pd.DataFrame({"score": [88, 92, np.nan, 85, 90, np.nan, 78]})
mean_val = df["score"].mean()
df_filled = df.fillna(mean_val)
print(df_filled)`
      }
    ]
  },
  {
    id: 5,
    title: 'Matplotlib可视化 - 图表绘制入门',
    category: '图表制作',
    difficulty: '基础',
    color: 'from-pink-400 to-pink-600',
    description: '学习绘制折线图、柱状图、散点图等基本图表',
    choiceQuestions: [
      {
        id: 1,
        content: '以下哪个函数用于绘制折线图？',
        options: ['plt.plot()', 'plt.bar()', 'plt.scatter()', 'plt.line()'],
        correctIndex: 0,
        explanation: 'plt.plot() 绘制折线图，plt.bar() 是柱状图，plt.scatter() 是散点图。'
      },
      {
        id: 2,
        content: '显示图表的命令是？',
        options: ['plt.show()', 'plt.display()', 'plt.print()', 'plt.view()'],
        correctIndex: 0,
        explanation: 'plt.show() 用于显示绘制好的图表，是标准显示方法。'
      },
      {
        id: 3,
        content: '为图表添加标题应该使用哪个函数？',
        options: ['plt.title()', 'plt.label()', 'plt.header()', 'plt.caption()'],
        correctIndex: 0,
        explanation: 'plt.title() 设置标题，plt.xlabel()/plt.ylabel() 设置坐标轴标签。'
      },
      {
        id: 4,
        content: '绘制柱状图应该使用？',
        options: ['plt.bar()', 'plt.column()', 'plt.hist()', 'plt.box()'],
        correctIndex: 0,
        explanation: 'plt.bar() 绘制柱状图，plt.hist() 绘制直方图。'
      },
      {
        id: 5,
        content: '以下哪种方法可以正确导入Matplotlib用于绘图？',
        options: ['import matplotlib.pyplot as plt', 'import matplotlib as plt', 'import pyplot as plt', 'import mpl.pyplot as plt'],
        correctIndex: 0,
        explanation: '标准导入方式是 import matplotlib.pyplot as plt，pyplot 是Matplotlib的绘图子模块。'
      }
    ],
    codeQuestions: [
      {
        id: 1,
        content: '任务：创建列表 x = [1, 2, 3, 4, 5]，y = [10, 20, 15, 25, 30]，使用 matplotlib 绘制折线图，设置标题为 "Sales Trend"，并打印 "绘图完成"。',
        hint: '使用 plt.plot(x, y)，plt.title() 设置标题，plt.close() 关闭图',
        testCases: [
          { expected: '绘图完成' }
        ],
        referenceCode: `import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [10, 20, 15, 25, 30]
plt.plot(x, y)
plt.title("Sales Trend")
print("绘图完成")
plt.close()`
      },
      {
        id: 2,
        content: '任务：创建数据 categories = ["A", "B", "C", "D"]，values = [25, 40, 30, 50]，绘制柱状图，设置 x 轴标签为 "Category"，y 轴标签为 "Value"，然后打印 "柱状图已创建"。',
        hint: 'plt.bar() 绘制柱状图',
        testCases: [
          { expected: '柱状图已创建' }
        ],
        referenceCode: `import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

categories = ["A", "B", "C", "D"]
values = [25, 40, 30, 50]
plt.bar(categories, values)
plt.xlabel("Category")
plt.ylabel("Value")
print("柱状图已创建")
plt.close()`
      },
      {
        id: 3,
        content: '任务：生成随机散点数据 x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]，y = [5, 3, 8, 6, 12, 10, 15, 12, 18, 15]，绘制散点图，并打印 "散点图已绘制"。',
        hint: 'plt.scatter() 绘制散点图',
        testCases: [
          { expected: '散点图已绘制' }
        ],
        referenceCode: `import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
y = [5, 3, 8, 6, 12, 10, 15, 12, 18, 15]
plt.scatter(x, y)
print("散点图已绘制")
plt.close()`
      },
      {
        id: 4,
        content: '任务：创建月份数据 months = ["Jan", "Feb", "Mar", "Apr", "May"]，sales = [120, 150, 135, 180, 200]，绘制柱状图并添加图例 label="Sales"，然后打印 "销售数据图表完成"。',
        hint: '在 plt.bar() 中添加 label 参数，使用 plt.legend() 显示图例',
        testCases: [
          { expected: '销售数据图表完成' }
        ],
        referenceCode: `import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

months = ["Jan", "Feb", "Mar", "Apr", "May"]
sales = [120, 150, 135, 180, 200]
plt.bar(months, sales, label="Sales")
plt.legend()
print("销售数据图表完成")
plt.close()`
      },
      {
        id: 5,
        content: '任务：绘制一条正弦曲线，使用 numpy 生成 x 从 0 到 2*pi 的数据，y = sin(x)，然后打印 "正弦曲线已绘制"。',
        hint: '使用 np.linspace() 生成 x 值，np.sin() 计算正弦',
        testCases: [
          { expected: '正弦曲线已绘制' }
        ],
        referenceCode: `import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 2 * np.pi, 100)
y = np.sin(x)
plt.plot(x, y)
print("正弦曲线已绘制")
plt.close()`
      }
    ]
  },
  {
    id: 6,
    title: '数据分析综合 - 数据探索实战',
    category: '综合练习',
    difficulty: '进阶',
    color: 'from-indigo-400 to-indigo-600',
    description: '综合运用数据分析技能，完成完整的数据探索任务',
    choiceQuestions: [
      {
        id: 1,
        content: '要按某列分组并计算每组的平均值，应该使用？',
        options: ['df.groupby("column").mean()', 'df.group("column").avg()', 'df.grouping("column").mean()', 'df.aggregate("column")'],
        correctIndex: 0,
        explanation: 'df.groupby("列名") 用于分组，其后可跟.mean(), .sum(), .count() 等聚合函数。'
      },
      {
        id: 2,
        content: '以下哪个方法可以筛选出 score 列大于80的所有行？',
        options: ['df[df["score"] > 80]', 'df.filter(score > 80)', 'df.select(score > 80)', 'df.where(score > 80)'],
        correctIndex: 0,
        explanation: '布尔索引是Pandas最常用的筛选方法：df[条件] 会返回满足条件的行。'
      },
      {
        id: 3,
        content: 'DataFrame 的 describe() 方法会返回哪些统计信息？',
        options: ['计数、均值、标准差、四分位数、最小/最大值', '仅平均值', '仅标准差和范围', '排序后的前几行'],
        correctIndex: 0,
        explanation: 'describe() 返回 count, mean, std, min, 25%, 50%(median), 75%, max 等基本统计量。'
      },
      {
        id: 4,
        content: '要将两列合并并创建新列，正确的写法是？',
        options: ['df["total"] = df["a"] + df["b"]', 'df.total = df.a + df.b', 'df.new(total = a + b)', 'df.combine("a", "b", "total")'],
        correctIndex: 0,
        explanation: '直接通过赋值创建新列是Pandas的标准方式。'
      },
      {
        id: 5,
        content: '查看数据中各列的数据类型，应该使用？',
        options: ['df.dtypes', 'df.types', 'df.info()', 'df.dtype'],
        correctIndex: 0,
        explanation: 'df.dtypes 查看各列数据类型，df.info() 提供更完整信息包括类型和非空值数量。'
      }
    ],
    codeQuestions: [
      {
        id: 1,
        content: '任务：创建一个 DataFrame，包含 student: ["张", "王", "李", "赵", "陈"], score: [85, 92, 78, 95, 88], class: ["A", "B", "A", "B", "A"]。打印整个 DataFrame。',
        hint: '使用字典列表创建 DataFrame',
        testCases: [
          { expected: 'student  score class' }
        ],
        referenceCode: `import pandas as pd

df = pd.DataFrame({
    "student": ["张", "王", "李", "赵", "陈"],
    "score": [85, 92, 78, 95, 88],
    "class": ["A", "B", "A", "B", "A"]
})
print(df)`
      },
      {
        id: 2,
        content: '任务：使用上面同样的数据，按 class 分组并计算每组的平均分，然后打印结果。',
        hint: '使用 groupby("class")["score"].mean()',
        testCases: [
          { expected: '83.666' }
        ],
        referenceCode: `import pandas as pd

df = pd.DataFrame({
    "student": ["张", "王", "李", "赵", "陈"],
    "score": [85, 92, 78, 95, 88],
    "class": ["A", "B", "A", "B", "A"]
})
grouped = df.groupby("class")["score"].mean()
print(grouped)`
      },
      {
        id: 3,
        content: '任务：创建 DataFrame，包含 product: ["X", "Y", "X", "Y", "X"], sales: [100, 150, 120, 180, 200]，使用 pivot_table 按产品汇总销售额并打印。',
        hint: '使用 pd.pivot_table(df, values="sales", index="product", aggfunc="sum")',
        testCases: [
          { expected: '420' }
        ],
        referenceCode: `import pandas as pd

df = pd.DataFrame({
    "product": ["X", "Y", "X", "Y", "X"],
    "sales": [100, 150, 120, 180, 200]
})
pivot = pd.pivot_table(df, values="sales", index="product", aggfunc="sum")
print(pivot)`
      },
      {
        id: 4,
        content: '任务：创建 DataFrame，包含 name: ["Alice", "Bob", "Charlie", "David"], age: [25, 30, 35, 40], salary: [5000, 7000, 8000, 6000]。筛选出 age >= 30 且 salary > 6000 的行并打印。',
        hint: '使用 df[(条件1) & (条件2)] 进行多条件筛选',
        testCases: [
          { expected: 'Charlie' }
        ],
        referenceCode: `import pandas as pd

df = pd.DataFrame({
    "name": ["Alice", "Bob", "Charlie", "David"],
    "age": [25, 30, 35, 40],
    "salary": [5000, 7000, 8000, 6000]
})
filtered = df[(df["age"] >= 30) & (df["salary"] > 6000)]
print(filtered)`
      },
      {
        id: 5,
        content: '任务：创建 DataFrame，包含 category: ["电子", "服装", "食品", "电子", "服装", "食品"], amount: [100, 50, 80, 150, 70, 90]。计算每个类别的总金额，按金额从大到小排序并打印。',
        hint: 'groupby + sum + sort_values',
        testCases: [
          { expected: '250' }
        ],
        referenceCode: `import pandas as pd

df = pd.DataFrame({
    "category": ["电子", "服装", "食品", "电子", "服装", "食品"],
    "amount": [100, 50, 80, 150, 70, 90]
})
result = df.groupby("category")["amount"].sum().sort_values(ascending=False)
print(result)`
      }
    ]
  }
];

export const getPracticeSetById = (id: number): PracticeSet | undefined => {
  return practiceSets.find((p) => p.id === id);
};

export default practiceSets;
