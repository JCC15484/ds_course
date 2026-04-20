import { useState, useEffect, useRef } from 'react';
import { loadPyodide, PyodideInterface } from 'pyodide';

interface PracticeEditorProps {
  initialCode?: string;
  title?: string;
}

const PracticeEditor: React.FC<PracticeEditorProps> = ({ 
  initialCode = `# Pandas 练习
import pandas as pd
import numpy as np

# 编写你的代码...
`,
  title = '代码编辑器'
}) => {
  const [code, setCode] = useState(initialCode);
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
    <div className="bg-white rounded-md border-4 border-[#1a365d] shadow-md overflow-hidden">
      {/* 工具栏 */}
      <div className="bg-gray-100 p-4 border-b-4 border-[#ed8936] flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center space-x-4">
          <h3 className="font-pixel text-sm font-bold text-[#1a365d]">{title}</h3>
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
              className="w-full h-[400px] p-4 border-2 border-[#1a365d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ed8936] font-mono text-sm bg-gray-50"
              placeholder="输入 Python 代码..."
            ></textarea>
          </div>
        </div>

        {/* 输出区 */}
        <div className="md:w-1/2">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-500 mb-2 font-pixel">📤 输出结果</h3>
            <div className="w-full h-[400px] p-4 border-2 border-[#1a365d] rounded-md bg-gray-900 text-green-400 font-mono text-sm overflow-auto">
              <pre>{output}</pre>
            </div>
          </div>
        </div>
      </div>

      {/* 加载状态 */}
      {loadingMessage && (
        <div className="p-4 bg-yellow-50 border-t-2 border-yellow-300">
          <p className="text-yellow-800 font-pixel text-sm animate-pixel-bounce">{loadingMessage}</p>
        </div>
      )}
    </div>
  );
};

export default PracticeEditor;
