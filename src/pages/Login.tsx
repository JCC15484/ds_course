import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('登录信息:', formData);
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a365d] to-[#2c5282] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#4299e1] to-[#ed8936] rounded-xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
              Py
            </div>
            <h1 className="text-2xl font-bold text-[#1a365d]">欢迎登录</h1>
            <p className="text-gray-500 mt-2">Python数据分析学习实训平台</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                邮箱地址
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4299e1] focus:border-transparent outline-none transition-all"
                placeholder="请输入邮箱"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                密码
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4299e1] focus:border-transparent outline-none transition-all"
                placeholder="请输入密码"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-[#4299e1] border-gray-300 rounded focus:ring-[#4299e1]" />
                <span className="ml-2 text-sm text-gray-600">记住我</span>
              </label>
              <a href="#" className="text-sm text-[#4299e1] hover:underline">
                忘记密码？
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#4299e1] hover:bg-[#2c5282] text-white py-3 rounded-lg font-semibold transition-colors"
            >
              登录
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              还没有账号？
              <Link to="/register" className="text-[#4299e1] hover:underline ml-1">
                立即注册
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-white text-sm">
          <Link to="/" className="hover:underline">
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
