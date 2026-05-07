import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('两次密码输入不一致');
      return;
    }
    console.log('注册信息:', formData);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a365d] to-[#2c5282] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#4299e1] to-[#ed8936] rounded-xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
              Py
            </div>
            <h1 className="text-2xl font-bold text-[#1a365d]">欢迎注册</h1>
            <p className="text-gray-500 mt-2">加入Python数据分析学习实训平台</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                昵称
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4299e1] focus:border-transparent outline-none transition-all"
                placeholder="请输入昵称"
                required
              />
            </div>

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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                确认密码
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4299e1] focus:border-transparent outline-none transition-all"
                placeholder="请再次输入密码"
                required
              />
            </div>

            <div className="flex items-center">
              <input type="checkbox" className="w-4 h-4 text-[#4299e1] border-gray-300 rounded focus:ring-[#4299e1]" required />
              <span className="ml-2 text-sm text-gray-600">
                我同意<span className="text-[#4299e1]">《用户协议》</span>和<span className="text-[#4299e1]">《隐私政策》</span>
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#ed8936] hover:bg-[#dd6b20] text-white py-3 rounded-lg font-semibold transition-colors"
            >
              注册
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              已有账号？
              <Link to="/login" className="text-[#4299e1] hover:underline ml-1">
                立即登录
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

export default Register;
