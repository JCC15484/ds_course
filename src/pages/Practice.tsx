import { useState } from 'react';

const Practice = () => {
  const [activeTab, setActiveTab] = useState('notebook');
  const [code, setCode] = useState(`import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 创建示例数据
data = {
    'name': ['Alice', 'Bob', 'Charlie', 'David', 'Eve'],
    'age': [25, 30, 35, 40, 45],
    'salary': [50000, 60000, 70000, 80000, 90000]
}

df = pd.DataFrame(data)

# 显示数据
print(df)

# 绘制工资分布图
plt.figure(figsize=(10, 6))
plt.bar(df['name'], df['salary'])
plt.title('Salary Distribution')
plt.xlabel('Name')
plt.ylabel('Salary')
plt.show()`);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleRunCode = () => {
    setIsRunning(true);
    // 模拟代码执行
    setTimeout(() => {
      setOutput(`   name  age  salary
0  Alice   25   50000
1    Bob   30   60000
2    Charlie   35   70000
3    David   40   80000
4    Eve   45   90000

[5 rows x 3 columns]

# 图表已生成: Salary Distribution`);
      setIsRunning(false);
    }, 1500);
  };

  const handleSaveNotebook = () => {
    // 模拟保存操作
    alert('Notebook saved successfully!');
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-pixel-fade-in">
          <h1 className="text-3xl font-bold text-[#1a365d] mb-4 font-pixel">实践环境</h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-pixel text-sm">
            在浏览器中运行Python代码，进行数据分析和可视化
          </p>
        </div>

        {/* 标签页 */}
        <div className="border-b-4 border-[#1a365d] mb-8 animate-pixel-fade-in">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="practice-tabs" role="tablist">
            <li className="mr-2" role="presentation">
              <button
                className={`inline-block p-4 border-b-4 rounded-t-lg ${activeTab === 'notebook' ? 'border-[#ed8936] text-[#ed8936]' : 'border-transparent hover:text-gray-600 hover:border-gray-300'} font-pixel`}
                onClick={() => setActiveTab('notebook')}
              >
                Jupyter Notebook
              </button>
            </li>
            <li role="presentation">
              <button
                className={`inline-block p-4 border-b-4 rounded-t-lg ${activeTab === 'files' ? 'border-[#ed8936] text-[#ed8936]' : 'border-transparent hover:text-gray-600 hover:border-gray-300'} font-pixel`}
                onClick={() => setActiveTab('files')}
              >
                文件管理
              </button>
            </li>
          </ul>
        </div>

        {/* 标签页内容 */}
        <div className="tab-content animate-pixel-fade-in">
          {/* Jupyter Notebook */}
          {activeTab === 'notebook' && (
            <div className="bg-white rounded-md border-4 border-[#1a365d] shadow-md overflow-hidden">
              {/* 工具栏 */}
              <div className="bg-gray-100 p-4 border-b-4 border-[#ed8936] flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={handleRunCode}
                    className="px-4 py-2 bg-[#4299e1] border-2 border-[#1a365d] text-white rounded-md hover:bg-[#3182ce] transition-colors flex items-center font-pixel text-xs animate-pixel-bounce"
                    disabled={isRunning}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {isRunning ? '运行中...' : '运行代码'}
                  </button>
                  <button 
                    onClick={handleSaveNotebook}
                    className="px-4 py-2 border-2 border-[#1a365d] rounded-md hover:bg-gray-200 transition-colors flex items-center font-pixel text-xs"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    保存
                  </button>
                </div>
                <div>
                  <span className="text-sm text-gray-500 font-pixel">Python 3.9</span>
                </div>
              </div>

              {/* 代码编辑器 */}
              <div className="flex flex-col md:flex-row">
                {/* 代码输入区 */}
                <div className="md:w-1/2 border-r-4 border-[#ed8936]">
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-2 font-pixel">代码</h3>
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full h-[500px] p-4 border-2 border-[#1a365d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ed8936] font-mono text-sm"
                      placeholder="输入Python代码..."
                    ></textarea>
                  </div>
                </div>

                {/* 输出区 */}
                <div className="md:w-1/2">
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-2 font-pixel">输出</h3>
                    <div className="w-full h-[500px] p-4 border-2 border-[#1a365d] rounded-md bg-gray-100 font-mono text-sm overflow-auto">
                      {output || '运行代码查看输出...'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 文件管理 */}
          {activeTab === 'files' && (
            <div className="bg-white rounded-md border-4 border-[#1a365d] shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold font-pixel">文件管理</h2>
                <button className="px-4 py-2 bg-[#4299e1] border-2 border-[#1a365d] text-white rounded-md hover:bg-[#3182ce] transition-colors font-pixel text-xs">
                  上传文件
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full border-2 border-[#1a365d]">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-6 py-3 text-left text-xs font-pixel text-gray-500 uppercase tracking-wider border-b-2 border-[#1a365d]">文件名</th>
                      <th className="px-6 py-3 text-left text-xs font-pixel text-gray-500 uppercase tracking-wider border-b-2 border-[#1a365d]">类型</th>
                      <th className="px-6 py-3 text-left text-xs font-pixel text-gray-500 uppercase tracking-wider border-b-2 border-[#1a365d]">大小</th>
                      <th className="px-6 py-3 text-left text-xs font-pixel text-gray-500 uppercase tracking-wider border-b-2 border-[#1a365d]">修改时间</th>
                      <th className="px-6 py-3 text-left text-xs font-pixel text-gray-500 uppercase tracking-wider border-b-2 border-[#1a365d]">操作</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="border-b-2 border-[#1a365d]">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="font-pixel text-sm">analysis.ipynb</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-pixel rounded-md bg-blue-100 text-blue-800 border-2 border-blue-800">Notebook</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-500 font-pixel">2.4 KB</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-500 font-pixel">2026-01-15 14:30</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-pixel">
                        <a href="#" className="text-[#4299e1] hover:text-[#3182ce] mr-3">打开</a>
                        <a href="#" className="text-[#38a169] hover:text-[#2f855a] mr-3">下载</a>
                        <a href="#" className="text-[#e53e3e] hover:text-[#c53030]">删除</a>
                      </td>
                    </tr>
                    <tr className="border-b-2 border-[#1a365d]">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="font-pixel text-sm">data.csv</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-pixel rounded-md bg-green-100 text-green-800 border-2 border-green-800">CSV</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-500 font-pixel">1.2 KB</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-500 font-pixel">2026-01-14 10:15</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-pixel">
                        <a href="#" className="text-[#4299e1] hover:text-[#3182ce] mr-3">打开</a>
                        <a href="#" className="text-[#38a169] hover:text-[#2f855a] mr-3">下载</a>
                        <a href="#" className="text-[#e53e3e] hover:text-[#c53030]">删除</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="font-pixel text-sm">visualization.py</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-pixel rounded-md bg-yellow-100 text-yellow-800 border-2 border-yellow-800">Python</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-500 font-pixel">856 B</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-500 font-pixel">2026-01-13 09:45</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-pixel">
                        <a href="#" className="text-[#4299e1] hover:text-[#3182ce] mr-3">打开</a>
                        <a href="#" className="text-[#38a169] hover:text-[#2f855a] mr-3">下载</a>
                        <a href="#" className="text-[#e53e3e] hover:text-[#c53030]">删除</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Practice;