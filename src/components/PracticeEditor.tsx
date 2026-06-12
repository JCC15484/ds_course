import { useState, useEffect, useRef } from 'react';

interface PracticeEditorProps {
  initialCode?: string;
  title?: string;
  answer?: string;
  expectedOutputs?: string[];
  enableValidate?: boolean;
  onPassed?: () => void;
  onFailed?: () => void;
}

// 全局 Pyodide 实例 - 避免重复初始化
let globalPyodide: any = null;
let globalInitPromise: Promise<any> | null = null;

// 预置示例数据 - 在 Pyodide 初始化后写入虚拟文件系统
const setupSampleData = async (pyodide: any) => {
  try {
    // 创建销售数据 CSV
    const salesCsv = `date,product,quantity,price
2024-01-05,苹果,10,5.5
2024-01-06,香蕉,20,3.0
2024-01-07,橙子,15,4.5
2024-01-08,苹果,8,5.5
2024-01-09,香蕉,25,3.0
2024-01-10,橙子,18,4.5
2024-01-11,苹果,12,5.5
2024-01-12,香蕉,22,3.0
2024-01-13,橙子,16,4.5
2024-01-14,苹果,14,5.5
2024-02-01,香蕉,30,3.2
2024-02-05,橙子,25,4.8
2024-02-10,苹果,18,5.8
2024-02-15,香蕉,28,3.2
2024-02-20,橙子,22,4.8
2024-03-01,苹果,20,5.6
2024-03-05,香蕉,35,3.1
2024-03-10,橙子,28,4.6
2024-03-15,苹果,22,5.6
2024-03-20,香蕉,32,3.1
2024-03-25,橙子,26,4.6`;

    // 购物篮数据
    const basketCsv = `transaction_id,product
1,牛奶
1,面包
1,鸡蛋
2,牛奶
2,面包
3,牛奶
3,鸡蛋
4,面包
4,鸡蛋
4,黄油
5,牛奶
5,面包
5,鸡蛋
5,黄油
6,牛奶
6,鸡蛋
7,面包
7,黄油
8,牛奶
8,面包
8,鸡蛋
9,鸡蛋
9,黄油
10,牛奶
10,面包
10,黄油`;

    pyodide.FS.writeFile('/sales_data.csv', salesCsv, { encoding: 'utf8' });
    pyodide.FS.writeFile('/basket_data.csv', basketCsv, { encoding: 'utf8' });
  } catch (e) {
    console.warn('Sample data setup warning:', e);
  }
};

const PracticeEditor: React.FC<PracticeEditorProps> = ({
  initialCode = '',
  title = '代码编辑器',
  answer,
  expectedOutputs = [],
  enableValidate = true,
  onPassed,
  onFailed,
}) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [pyodideReady, setPyodideReady] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [validateResult, setValidateResult] = useState<{ passed: boolean; message: string } | null>(null);
  const pyodideRef = useRef<any>(null);

  // 初始化 Pyodide - 全局共享
  useEffect(() => {
    const initPyodide = async () => {
      // 如果已经有全局实例，直接使用
      if (globalPyodide) {
        pyodideRef.current = globalPyodide;
        setPyodideReady(true);
        setOutput('✅ Python 环境已就绪！可以开始编写代码了。\n');
        return;
      }

      // 如果正在初始化中，等待它完成
      if (globalInitPromise) {
        try {
          const py = await globalInitPromise;
          pyodideRef.current = py;
          setPyodideReady(true);
          setOutput('✅ Python 环境已就绪！可以开始编写代码了。\n');
        } catch (e) {
          setOutput(`❌ 加载失败: ${e}\n`);
        }
        return;
      }

      try {
        setLoadingMessage('正在加载 Python 环境...');

        const initPromise = (async () => {
          const pyodide = await (window as any).loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.29.3/full/',
          });

          setLoadingMessage('正在安装 Pandas 和 NumPy...');
          await pyodide.loadPackage(['pandas', 'numpy']);

          // 安装示例数据
          await setupSampleData(pyodide);

          return pyodide;
        })();

        globalInitPromise = initPromise;
        const pyodide = await initPromise;

        globalPyodide = pyodide;
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

    if ((window as any).loadPyodide) {
      initPyodide();
    } else {
      const existingScript = document.querySelector('script[src*="pyodide"]');
      if (existingScript) {
        existingScript.addEventListener('load', initPyodide);
      } else {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.29.3/full/pyodide.js';
        script.onload = initPyodide;
        document.head.appendChild(script);
      }
    }
  }, []);

  // 核心代码执行逻辑 - 更稳健的实现
  const executeCode = async (userCode: string): Promise<{ stdout: string; stderr: string; error: string | null }> => {
    const pyodide = pyodideRef.current;
    if (!pyodide) {
      return { stdout: '', stderr: '', error: 'Python 环境未就绪' };
    }

    let capturedStdout = '';
    let capturedStderr = '';
    let execError: string | null = null;

    try {
      // 使用 setStdout / setStderr 回调 - 更稳健的方式
      const stdoutCallback = (text: string) => {
        capturedStdout += text;
      };
      const stderrCallback = (text: string) => {
        capturedStderr += text;
      };

      // 设置 stdout 回调
      pyodide.setStdout({ batched: (s: string) => stdoutCallback(s) });
      pyodide.setStderr({ batched: (s: string) => stderrCallback(s) });

      // 执行用户代码
      await pyodide.runPythonAsync(userCode);

      // 恢复默认输出
      pyodide.setStdout({ batched: () => {} });
      pyodide.setStderr({ batched: () => {} });

    } catch (err: any) {
      // 清理错误 - 尝试恢复默认 stdout
      try {
        if (pyodideRef.current) {
          pyodideRef.current.setStdout({ batched: () => {} });
          pyodideRef.current.setStderr({ batched: () => {} });
        }
      } catch (e) {
        // ignore
      }
      
      // 改进错误信息显示
      let errorMsg = err?.message || String(err);
      
      // 清理 Python 错误信息中的特殊字符和冗余内容
      errorMsg = errorMsg
        .replace(/File "<exec>", /g, '')
        .replace(/File ".*?", line (\d+)/g, '第$1行')
        .replace(/\n\n/g, '\n')
        .trim();
      
      execError = errorMsg;
    }

    return {
      stdout: capturedStdout,
      stderr: capturedStderr,
      error: execError,
    };
  };

  // 运行代码 - 只显示输出，不验证
  const handleRunCode = async () => {
    if (!pyodideReady || !pyodideRef.current) {
      setOutput('⏳ Python 环境还在加载中，请稍候...\n');
      return;
    }

    if (!code.trim()) {
      setOutput('⚠️ 请先输入代码再运行。\n');
      return;
    }

    setIsRunning(true);
    setValidateResult(null);
    setOutput('🚀 正在执行代码...\n\n');

    try {
      const result = await executeCode(code);

      let finalOutput = '';

      if (result.error) {
        // 格式化错误信息，让用户更容易理解
        let errorHint = '';
        const errorLower = result.error.toLowerCase();
        
        if (errorLower.includes('syntaxerror')) {
          errorHint = '语法错误：请检查括号、引号、逗号等是否匹配';
        } else if (errorLower.includes('nameerror')) {
          errorHint = '名称错误：变量或函数名可能拼写错误或未定义';
        } else if (errorLower.includes('typeerror')) {
          errorHint = '类型错误：数据类型不匹配，例如字符串和数字不能直接相加';
        } else if (errorLower.includes('indexerror')) {
          errorHint = '索引错误：列表或数组的索引超出了范围';
        } else if (errorLower.includes('attributeerror')) {
          errorHint = '属性错误：对象没有这个属性或方法，请检查方法名是否正确';
        } else if (errorLower.includes('indentationerror')) {
          errorHint = '缩进错误：Python靠缩进区分代码块，请检查空格或Tab是否一致';
        } else {
          errorHint = '请检查代码语法、变量名、缩进等是否正确';
        }
        
        finalOutput = `❌ 执行错误：\n${result.error}\n\n💡 ${errorHint}\n`;
        
        if (answer) {
          finalOutput += `可以点击"查看答案"参考正确写法。\n`;
        }
      } else {
        if (result.stdout) {
          finalOutput += result.stdout;
        }
        if (result.stderr && result.stderr.trim()) {
          finalOutput += `\n⚠️ 警告信息：\n${result.stderr}\n`;
        }
        if (!finalOutput.trim()) {
          finalOutput = '✅ 代码执行完成（无输出）\n';
        }
      }

      setOutput(finalOutput);
    } catch (error) {
      console.error('代码执行错误:', error);
      setOutput(`❌ 系统错误: ${error}\n请刷新页面重试。\n`);
    } finally {
      setIsRunning(false);
    }
  };

  // 验证代码 - 运行并检查输出是否包含预期内容
  const handleValidate = async () => {
    if (!pyodideReady || !pyodideRef.current) {
      setOutput('⏳ Python 环境还在加载中，请稍候...\n');
      return;
    }

    if (!code.trim()) {
      setOutput('⚠️ 请先输入代码再验证。\n');
      setValidateResult({
        passed: false,
        message: '代码为空，请先编写代码。',
      });
      return;
    }

    setIsValidating(true);
    setValidateResult(null);
    setOutput('🔍 正在验证代码...\n\n');

    try {
      const result = await executeCode(code);

      let finalOutput = '';
      let hasError = false;

      if (result.error) {
        finalOutput = `❌ 执行错误：\n${result.error}\n`;
        hasError = true;
      } else {
        if (result.stdout) {
          finalOutput += result.stdout;
        }
        if (result.stderr && result.stderr.trim()) {
          finalOutput += `\n⚠️ 警告信息：\n${result.stderr}\n`;
        }
        if (!finalOutput.trim()) {
          finalOutput = '（无输出）\n';
        }
      }

      setOutput(finalOutput);

      // 验证逻辑
      if (enableValidate && expectedOutputs.length > 0 && !hasError) {
        // 规范化：移除空白字符，做宽松比较
        const normalizedOutput = finalOutput.replace(/\s+/g, '').toLowerCase();
        let allPassed = true;
        const failedExpects: string[] = [];

        for (const expected of expectedOutputs) {
          const normalizedExpected = expected.replace(/\s+/g, '').toLowerCase();
          if (!normalizedOutput.includes(normalizedExpected)) {
            allPassed = false;
            failedExpects.push(expected);
          }
        }

        if (allPassed) {
          setValidateResult({
            passed: true,
            message: '🎉 验证通过！你的代码输出包含了所有预期内容。干得好！',
          });
          onPassed?.();
        } else {
          setValidateResult({
            passed: false,
            message:
              '❌ 验证未通过！你的输出与预期不符。\n\n' +
              '📋 预期输出应包含：\n' +
              failedExpects.map((e) => '   • ' + e).join('\n') +
              '\n\n💡 请检查：\n' +
              '   • 你的代码输出内容是否正确\n' +
              '   • 是否有额外的空格或换行\n' +
              '   • 中英文标点是否一致\n' +
              (answer ? '\n📝 点击"查看答案"参考正确写法' : ''),
          });
          onFailed?.();
        }
      } else if (enableValidate && expectedOutputs.length > 0 && hasError) {
        setValidateResult({
          passed: false,
          message: '❌ 代码执行出错，无法通过验证。请修正代码后再试。',
        });
        onFailed?.();
      } else if (enableValidate && !hasError) {
        setValidateResult({
          passed: true,
          message: '✅ 代码已成功执行！',
        });
        onPassed?.();
      }
    } catch (error) {
      console.error('验证错误:', error);
      setOutput(`❌ 验证错误: ${error}\n`);
    } finally {
      setIsValidating(false);
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

  const handleResetCode = () => {
    setCode('');
    setOutput('');
    setValidateResult(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      {/* 工具栏 */}
      <div className="bg-gray-100 dark:bg-gray-700 p-3 border-b dark:border-gray-600 flex justify-between items-center flex-wrap gap-2">
        <h3 className="font-bold text-[#1a365d] dark:text-white text-sm">{title}</h3>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handleRunCode}
            disabled={isRunning || !pyodideReady}
            className="px-4 py-2 bg-[#4299e1] hover:bg-[#2c5282] disabled:bg-gray-400 text-white rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
          >
            {isRunning ? '运行中...' : '▶ 运行代码'}
          </button>
          {enableValidate && (
            <button
              onClick={handleValidate}
              disabled={isValidating || !pyodideReady}
              className="px-4 py-2 bg-[#38a169] hover:bg-[#276749] disabled:bg-gray-400 text-white rounded-lg font-medium text-sm transition-colors"
            >
              {isValidating ? '验证中...' : '✓ 验证对错'}
            </button>
          )}
          <button
            onClick={handleResetCode}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-white rounded-lg font-medium text-sm transition-colors"
          >
            清空
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
        {/* 代码编辑器 - 初始为空 */}
        <div className="lg:w-1/2 border-r-0 lg:border-r dark:border-gray-600">
          <div className="p-3 bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600 flex justify-between items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">📝 代码编辑区</span>
            <span className="text-xs text-gray-400">从空白开始编写你的代码</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full min-h-[300px] lg:min-h-[400px] p-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-[#4299e1]"
            placeholder={`请在这里编写你的 Python 代码...\n\n例如：\nprint('Hello, World!')\n\n提示：示例数据文件已准备好\n  - /sales_data.csv (销售数据)\n  - /basket_data.csv (购物篮数据)\n\n可以直接使用 pd.read_csv('/sales_data.csv') 读取`}
            spellCheck={false}
          />
        </div>

        {/* 输出结果 */}
        <div className="lg:w-1/2">
          <div className="p-3 bg-gray-800 text-white border-b dark:border-gray-600 flex justify-between items-center">
            <span className="text-xs">📤 输出结果</span>
            {!pyodideReady && (
              <span className="text-xs text-yellow-400 animate-pulse ml-2">⏳ 加载中...</span>
            )}
          </div>
          <div className="min-h-[300px] lg:min-h-[400px] p-4 bg-gray-900 text-green-400 font-mono text-sm overflow-auto whitespace-pre-wrap">
            {output}
          </div>
        </div>
      </div>

      {/* 验证结果显示 */}
      {validateResult && (
        <div
          className={`p-4 border-t-4 ${
            validateResult.passed
              ? 'bg-green-50 border-green-400 text-green-800 dark:bg-green-900/30 dark:text-green-300'
              : 'bg-red-50 border-red-400 text-red-800 dark:bg-red-900/30 dark:text-red-300'
          }`}
        >
          <div className="font-bold text-base mb-1">
            {validateResult.passed ? '✅ 正确！' : '❌ 需要检查'}
          </div>
          <div className="text-sm whitespace-pre-wrap">{validateResult.message}</div>
        </div>
      )}

      {/* 答案展示 */}
      {showAnswer && answer && (
        <div className="p-4 bg-blue-50 dark:bg-gray-700 border-t-2 border-blue-300">
          <h3 className="text-sm font-bold text-blue-800 dark:text-white mb-2">📝 参考答案</h3>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-auto whitespace-pre-wrap">
            {answer}
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
