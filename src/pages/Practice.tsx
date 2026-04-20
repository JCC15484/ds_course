import { useState, useEffect, useRef } from 'react';
import { loadPyodide, PyodideInterface } from 'pyodide';

const practiceTemplates = {
  basic: `# Pandas 基础操作练习
import pandas as pd
import numpy as np

# 1. 创建 DataFrame
data = {
    'name': ['Alice', 'Bob', 'Charlie', 'David', 'Eve'],
    'age': [25, 30, 35, 40, 45],
    'salary': [50000, 60000, 70000, 80000, 90000],
    'department': ['IT', 'Finance', 'IT', 'HR', 'Finance']
}

df = pd.DataFrame(data)
print("原始数据:")
print(df)
print("\\n" + "="*50 + "\\n")

# 2. 查看基本信息
print("数据形状:", df.shape)
print("\\n数据类型:")
print(df.dtypes)
print("\\n描述统计:")
print(df.describe())
print("\\n" + "="*50 + "\\n")

# 3. 选择和过滤
print("选择 name 和 salary 列:")
print(df[['name', 'salary']])
print("\\n" + "="*50 + "\\n")

print("工资大于 60000 的员工:")
print(df[df['salary'] > 60000])
print("\\n" + "="*50 + "\\n")

# 4. 分组统计
print("按部门统计平均工资:")
print(df.groupby('department')['salary'].mean())
`,

  cleaning: `# Pandas 数据清洗练习
import pandas as pd
import numpy as np

# 1. 创建有缺失值的数据
data = {
    'product': ['A', 'B', np.nan, 'D', 'E', 'A'],
    'price': [100, np.nan, 300, 400, np.nan, 100],
    'quantity': [5, 8, 12, np.nan, 15, 5],
    'date': ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05', '2024-01-01']
}

df = pd.DataFrame(data)
print("原始数据:")
print(df)
print("\\n" + "="*50 + "\\n")

# 2. 检查缺失值
print("缺失值统计:")
print(df.isnull().sum())
print("\\n" + "="*50 + "\\n")

# 3. 处理缺失值 - 方法1: 删除
df_drop = df.dropna()
print("删除缺失值后:")
print(df_drop)
print("\\n" + "="*50 + "\\n")

# 4. 处理缺失值 - 方法2: 填充
df_fill = df.copy()
df_fill['product'] = df_fill['product'].fillna('Unknown')
df_fill['price'] = df_fill['price'].fillna(df_fill['price'].mean())
df_fill['quantity'] = df_fill['quantity'].fillna(df_fill['quantity'].median())
print("填充缺失值后:")
print(df_fill)
print("\\n" + "="*50 + "\\n")

# 5. 处理重复值
print("重复行数:", df.duplicated().sum())
df_unique = df.drop_duplicates()
print("删除重复值后:")
print(df_unique)
`,

  merging: `# Pandas 数据合并练习
import pandas as pd
import numpy as np

# 1. 创建两个数据集
users_data = {
    'user_id': [1, 2, 3, 4, 5],
    'name': ['Alice', 'Bob', 'Charlie', 'David', 'Eve'],
    'city': ['北京', '上海', '广州', '深圳', '杭州']
}

orders_data = {
    'order_id': [101, 102, 103, 104, 105, 106],
    'user_id': [1, 1, 2, 3, 3, 6],
    'product': ['手机', '电脑', '平板', '耳机', '键盘', '鼠标'],
    'amount': [2999, 5999, 1999, 899, 299, 199]
}

users_df = pd.DataFrame(users_data)
orders_df = pd.DataFrame(orders_data)

print("用户数据:")
print(users_df)
print("\\n" + "="*50 + "\\n")
print("订单数据:")
print(orders_df)
print("\\n" + "="*50 + "\\n")

# 2. 内连接 - 只保留两边都有的
inner_merge = pd.merge(users_df, orders_df, on='user_id', how='inner')
print("内连接结果:")
print(inner_merge)
print("\\n" + "="*50 + "\\n")

# 3. 左连接 - 保留左边所有数据
left_merge = pd.merge(users_df, orders_df, on='user_id', how='left')
print("左连接结果:")
print(left_merge)
print("\\n" + "="*50 + "\\n")

# 4. 统计分析
print("每个用户的订单数量:")
print(left_merge.groupby('name').size())
print("\\n" + "="*50 + "\\n")
print("每个用户的总消费:")
print(left_merge.groupby('name')['amount'].sum())
`,

  rfm: `# Pandas RFM 分析练习
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

# 1. 创建销售数据
dates = pd.date_range(start='2024-01-01', end='2024-12-31', periods=500)
customers = np.random.choice(['Customer_A', 'Customer_B', 'Customer_C', 'Customer_D', 'Customer_E', 
                               'Customer_F', 'Customer_G', 'Customer_H'], size=500)
amounts = np.random.uniform(10, 1000, size=500).round(2)

sales_data = pd.DataFrame({
    'date': dates,
    'customer': customers,
    'amount': amounts
})

print("销售数据前10行:")
print(sales_data.head(10))
print("\\n" + "="*50 + "\\n")

# 2. 计算 RFM 指标
reference_date = sales_data['date'].max() + timedelta(days=1)

rfm = sales_data.groupby('customer').agg({
    'date': lambda x: (reference_date - x.max()).days,  # Recency
    'amount': ['count', 'sum']                            # Frequency & Monetary
}).round(2)

# 重命名列
rfm.columns = ['Recency', 'Frequency', 'Monetary']
print("RFM 指标:")
print(rfm)
print("\\n" + "="*50 + "\\n")

# 3. RFM 评分（五分制，5是最好）
rfm['R_score'] = pd.qcut(rfm['Recency'], 5, labels=[1, 2, 3, 4, 5])
rfm['F_score'] = pd.qcut(rfm['Frequency'], 5, labels=[1, 2, 3, 4, 5], duplicates='drop')
rfm['M_score'] = pd.qcut(rfm['Monetary'], 5, labels=[1, 2, 3, 4, 5])

# 计算总分
rfm['Total_Score'] = rfm['R_score'].astype(int) + rfm['F_score'].astype(int) + rfm['M_score'].astype(int)

print("RFM 评分结果:")
print(rfm)
`
};

const templateNames = {
  basic: '基础操作',
  cleaning: '数据清洗',
  merging: '数据合并',
  rfm: 'RFM 分析'
};

const Practice = () => {
  const [activeTab, setActiveTab] = useState('notebook');
  const [selectedTemplate, setSelectedTemplate] = useState('basic');
  const [code, setCode] = useState(practiceTemplates.basic);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [pyodideReady, setPyodideReady] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const pyodideRef = useRef<PyodideInterface | null>(null);

  // 初始化 Pyodide
  useEffect(() => {
    const initPyodide = async () => {
      try {
        setLoadingMessage('正在加载 Python 环境...');
        const pyodide = await loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/'
        });
        
        setLoadingMessage('正在安装 Pandas 和 NumPy...');
        await pyodide.loadPackage(['pandas', 'numpy']);
        
        pyodideRef.current = pyodide;
        setPyodideReady(true);
        setLoadingMessage('');
        setOutput('✅ Python 环境已就绪！可以开始编写代码了。');
      } catch (error) {
        console.error('Failed to load Pyodide:', error);
        setOutput(`❌ 加载失败: ${error}`);
        setLoadingMessage('');
      }
    };

    initPyodide();
  }, []);

  const handleTemplateChange = (templateKey: string) => {
    setSelectedTemplate(templateKey);
    setCode(practiceTemplates[templateKey as keyof typeof practiceTemplates]);
    setOutput('');
  };

  const handleRunCode = async () => {
    if (!pyodideReady || !pyodideRef.current) {
      setOutput('⏳ Python 环境还在加载中，请稍候...');
      return;
    }

    setIsRunning(true);
    setOutput('🚀 正在执行代码...');

    try {
      const pyodide = pyodideRef.current;
      
      // 捕获 print 输出
      let printedOutput = '';
      pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
      `);

      // 运行用户代码
      await pyodide.runPythonAsync(code);

      // 获取输出
      const result = pyodide.runPython(`
output = sys.stdout.getvalue()
sys.stdout = sys.__stdout__
output
      `);

      setOutput(result || '✅ 代码执行完成（无输出）');
    } catch (error) {
      setOutput(`❌ 执行错误:\n${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      alert('✅ 代码已复制到剪贴板！');
    } catch (error) {
      alert('❌ 复制失败，请手动复制');
    }
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-pixel-fade-in">
          <h1 className="text-3xl font-bold text-[#1a365d] mb-4 font-pixel">实践环境</h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-pixel text-sm">
            选择练习模板，编写 Pandas 代码进行数据分析练习
          </p>
          {loadingMessage && (
            <div className="mt-4 text-[#ed8936] font-pixel text-sm animate-pixel-bounce">
              {loadingMessage}
            </div>
          )}
        </div>

        {/* 模板选择器 */}
        <div className="bg-white rounded-md border-4 border-[#1a365d] shadow-md p-6 mb-8 animate-pixel-fade-in">
          <h3 className="text-lg font-bold text-[#1a365d] mb-4 font-pixel">📚 选择练习模板</h3>
          <div className="flex flex-wrap gap-4">
            {Object.entries(templateNames).map(([key, name]) => (
              <button
                key={key}
                onClick={() => handleTemplateChange(key)}
                className={`px-4 py-2 border-2 rounded-md font-pixel text-sm transition-colors ${
                  selectedTemplate === key
                    ? 'bg-[#ed8936] text-white border-[#1a365d]'
                    : 'bg-white text-[#1a365d] border-[#1a365d] hover:bg-gray-100'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* 标签页 */}
        <div className="border-b-4 border-[#1a365d] mb-8 animate-pixel-fade-in">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="practice-tabs" role="tablist">
            <li className="mr-2" role="presentation">
              <button
                className={`inline-block p-4 border-b-4 rounded-t-lg ${activeTab === 'notebook' ? 'border-[#ed8936] text-[#ed8936]' : 'border-transparent hover:text-gray-600 hover:border-gray-300'} font-pixel`}
                onClick={() => setActiveTab('notebook')}
              >
                代码编辑器
              </button>
            </li>
            <li role="presentation">
              <button
                className={`inline-block p-4 border-b-4 rounded-t-lg ${activeTab === 'files' ? 'border-[#ed8936] text-[#ed8936]' : 'border-transparent hover:text-gray-600 hover:border-gray-300'} font-pixel`}
                onClick={() => setActiveTab('files')}
              >
                参考资源
              </button>
            </li>
          </ul>
        </div>

        {/* 标签页内容 */}
        <div className="tab-content animate-pixel-fade-in">
          {/* 代码编辑器 */}
          {activeTab === 'notebook' && (
            <div className="bg-white rounded-md border-4 border-[#1a365d] shadow-md overflow-hidden">
              {/* 工具栏 */}
              <div className="bg-gray-100 p-4 border-b-4 border-[#ed8936] flex justify-between items-center flex-wrap gap-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleRunCode}
                    className="px-4 py-2 bg-[#4299e1] border-2 border-[#1a365d] text-white rounded-md hover:bg-[#3182ce] transition-colors flex items-center font-pixel text-xs animate-pixel-bounce"
                    disabled={isRunning || !pyodideReady}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {isRunning ? '运行中...' : '▶ 运行代码'}
                  </button>
                  <button
                    onClick={handleCopyCode}
                    className="px-4 py-2 border-2 border-[#1a365d] rounded-md hover:bg-gray-200 transition-colors flex items-center font-pixel text-xs"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    💾 复制代码
                  </button>
                </div>
                <div>
                  <span className={`text-sm font-pixel ${pyodideReady ? 'text-green-600' : 'text-yellow-600'}`}>
                    🐍 Python / Pandas {pyodideReady ? '✅ 就绪' : '⏳ 加载中'}
                  </span>
                </div>
              </div>

              {/* 代码编辑器 */}
              <div className="flex flex-col md:flex-row">
                {/* 代码输入区 */}
                <div className="md:w-1/2 border-r-4 border-[#ed8936]">
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-2 font-pixel">📝 代码编辑区</h3>
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full h-[500px] p-4 border-2 border-[#1a365d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ed8936] font-mono text-sm bg-gray-50"
                      placeholder="输入 Python 代码..."
                    ></textarea>
                  </div>
                </div>

                {/* 输出区 */}
                <div className="md:w-1/2">
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-2 font-pixel">📤 输出结果</h3>
                    <div className="w-full h-[500px] p-4 border-2 border-[#1a365d] rounded-md bg-gray-900 text-green-400 font-mono text-sm overflow-auto">
                      <pre>{output}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 参考资源 */}
          {activeTab === 'files' && (
            <div className="bg-white rounded-md border-4 border-[#1a365d] shadow-md p-6">
              <h2 className="text-xl font-bold font-pixel mb-6">📖 学习资源推荐</h2>

              <div className="space-y-6">
                <div className="border-2 border-[#1a365d] rounded-md p-4">
                  <h3 className="font-bold text-[#1a365d] mb-3 font-pixel">🌐 在线运行环境</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-blue-600">•</span>
                      <a href="https://colab.research.google.com" target="_blank" rel="noopener noreferrer" className="text-[#4299e1] hover:underline font-pixel text-sm">
                        Google Colab - 免费云端 Jupyter
                      </a>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-600">•</span>
                      <a href="https://www.kaggle.com/notebooks" target="_blank" rel="noopener noreferrer" className="text-[#4299e1] hover:underline font-pixel text-sm">
                        Kaggle Notebooks - 数据科学社区
                      </a>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-600">•</span>
                      <a href="https://jupyter.org/try-jupyter" target="_blank" rel="noopener noreferrer" className="text-[#4299e1] hover:underline font-pixel text-sm">
                        JupyterLite - 纯前端 Jupyter
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="border-2 border-[#1a365d] rounded-md p-4">
                  <h3 className="font-bold text-[#1a365d] mb-3 font-pixel">📚 官方文档</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-blue-600">•</span>
                      <a href="https://pandas.pydata.org/docs/" target="_blank" rel="noopener noreferrer" className="text-[#4299e1] hover:underline font-pixel text-sm">
                        Pandas 官方文档
                      </a>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-600">•</span>
                      <a href="https://numpy.org/doc/" target="_blank" rel="noopener noreferrer" className="text-[#4299e1] hover:underline font-pixel text-sm">
                        NumPy 官方文档
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="border-2 border-[#1a365d] rounded-md p-4">
                  <h3 className="font-bold text-[#1a365d] mb-3 font-pixel">💡 快速参考</h3>
                  <ul className="space-y-2 text-gray-700 font-pixel text-sm">
                    <li>• df = pd.DataFrame(data) - 创建数据框</li>
                    <li>• df.head() / df.tail() - 查看首尾数据</li>
                    <li>• df.describe() - 统计信息</li>
                    <li>• df['col'] - 选择列</li>
                    <li>• df[df['col'] gt x] - 条件过滤</li>
                    <li>• df.groupby('col').agg(...) - 分组聚合</li>
                    <li>• pd.merge(df1, df2, on='id') - 数据合并</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Practice;
