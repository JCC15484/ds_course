import { useState, useEffect, useRef } from 'react';
import { loadPyodide, PyodideInterface } from 'pyodide';

interface PracticeEditorProps {
  initialCode?: string;
  title?: string;
  answer?: string;
}

const PracticeEditor: React.FC<PracticeEditorProps> = ({ 
  initialCode = '# Pandas 练习\nimport pandas as pd\nimport numpy as np\n\n# 编写你的代码...\n',
  title = '代码编辑器',
  answer
}) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [pyodideReady, setPyodideReady] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const pyodideRef = useRef<PyodideInterface | null>(null);

  useEffect(() => {
    const initPyodide = async () => {
      try {
        setLoadingMessage('正在加载 Python 环境...');
        const pyodide = await loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.29.3/full/'
        });
        
        setLoadingMessage('正在安装 Pandas 和 NumPy...');
        await pyodide.loadPackage(['pandas', 'numpy']);
        
        pyodideRef.current = pyodide;
        setPyodideReady(true);
        setLoadingMessage('');
        setOutput('✅ Python 环境已就绪！可以开始编写代码了。\n');
      } catch (error) {
        console.error('Failed to load Pyodide:', error);
        setOutput(`❌ 加载失败: ${error}\n`);
        setLoadingMessage('');
      }
    };

    initPyodide();
  }, []);

  const handleRunCode = async () => {
    if (!pyodideReady || !pyodideRef.current) {
      setOutput('⏳ Python 环境还在加载中，请稍候...\n');
      return;
    }

    setIsRunning(true);
    setOutput('🚀 正在执行代码...\n\n');

    try {
      const pyodide = pyodideRef.current;
      
      let finalOutput = '';
      
      try {
        // 重定向 stdout 来捕获 print 输出
        await pyodide.runPythonAsync(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
        `);
        
        // 执行用户代码
        await pyodide.runPythonAsync(code);
        
        // 获取标准输出
        const stdoutContent = await pyodide.runPythonAsync(`sys.stdout.getvalue()`);
        const stderrContent = await pyodide.runPythonAsync(`sys.stderr.getvalue()`);
        
        if (stdoutContent && stdoutContent.trim()) {
          finalOutput += stdoutContent;
        }
        
        if (stderrContent && stderrContent.trim()) {
          finalOutput += `⚠️ 警告:\n${stderrContent}\n`;
        }
        
        // 恢复 stdout
        await pyodide.runPythonAsync(`
import sys
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
        `);
        
      } catch (execError) {
        // 捕获执行错误
        const errorMsg = execError instanceof Error ? execError.message : String(execError);
        finalOutput += `❌ 执行错误:\n${errorMsg}\n`;
        
        // 确保恢复 stdout
        try {
          await pyodide.runPythonAsync(`
import sys
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
          `);
        } catch (e) {
          // ignore
        }
      }
      
      if (finalOutput.trim()) {
        setOutput(finalOutput);
      } else {
        setOutput('✅ 代码执行完成（无输出）\n');
      }
      
    } catch (error) {
      console.error('代码执行错误:', error);
      setOutput(`❌ 执行错误:\n${error}\n`);
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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      {/* 工具栏 */}
      <div className="bg-gray-100 dark:bg-gray-700 p-3 border-b dark:border-gray-600 flex justify-between items-center flex-wrap gap-2">
        <h3 className="font-bold text-[#1a365d] dark:text-white text-sm">{title}</h3>
        <div className="flex gap-2">
          <button
            onClick={handleRunCode}
            disabled={isRunning || !pyodideReady}
            className="px-4 py-2 bg-[#4299e1] hover:bg-[#2c5282] disabled:bg-gray-400 text-white rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
          >
            {isRunning ? (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                运行中...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
                运行代码
              </>
            )}
          </button>
          <button
            onClick={handleCopyCode}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-white rounded-lg font-medium text-sm transition-colors"
          >
            复制代码
          </button>
          {answer && (
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="px-4 py-2 bg-[#ed8936] hover:bg-[#dd6b20] text-white rounded-lg font-medium text-sm transition-colors"
            >
              {showAnswer ? '隐藏答案' : '查看答案'}
            </button>
          )}
        </div>
      </div>

      {/* 编辑器和输出区域 */}
      <div className="flex flex-col lg:flex-row">
        {/* 代码编辑器 */}
        <div className="lg:w-1/2 border-r-0 lg:border-r dark:border-gray-600">
          <div className="p-3 bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
            <span className="text-xs text-gray-500 dark:text-gray-400">📝 代码编辑区</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-[300px] lg:h-[400px] p-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-mono text-sm resize-none focus:outline-none"
            placeholder="输入 Python 代码..."
            spellCheck={false}
          />
        </div>

        {/* 输出结果 */}
        <div className="lg:w-1/2">
          <div className="p-3 bg-gray-800 text-white border-b dark:border-gray-600">
            <span className="text-xs">📤 输出结果</span>
            {!pyodideReady && (
              <span className="ml-2 text-yellow-400 text-xs animate-pulse">⏳ 加载中...</span>
            )}
          </div>
          <div className="h-[300px] lg:h-[400px] p-4 bg-gray-900 text-green-400 font-mono text-sm overflow-auto">
            <pre className="whitespace-pre-wrap">{output}</pre>
          </div>
        </div>
      </div>

      {/* 答案展示 */}
      {showAnswer && answer && (
        <div className="p-4 bg-blue-50 dark:bg-gray-700 border-t-2 border-blue-300">
          <h3 className="text-sm font-bold text-blue-800 dark:text-white mb-2">📝 参考答案</h3>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-auto">
            <pre>{answer}</pre>
          </div>
        </div>
      )}

      {/* 加载提示 */}
      {loadingMessage && (
        <div className="p-4 bg-yellow-50 dark:bg-gray-700 border-t-2 border-yellow-300">
          <p className="text-yellow-800 dark:text-yellow-200 text-sm animate-pulse">
            {loadingMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default PracticeEditor;
