import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // 这里可以实现登录逻辑
    console.log('Login clicked');
  };

  const handleRegister = () => {
    // 这里可以实现注册逻辑
    console.log('Register clicked');
  };

  return (
    <header className="bg-[#1a365d] text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[#4299e1] rounded-lg flex items-center justify-center">
              <span className="text-xl font-bold">PyData</span>
            </div>
            <span className="text-xl font-bold">数据分析教育平台</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-[#ed8936] transition-colors">首页</Link>
            <Link to="/courses" className="hover:text-[#ed8936] transition-colors">课程</Link>
            <Link to="/learning-center" className="hover:text-[#ed8936] transition-colors">学习中心</Link>
            <Link to="/practice" className="hover:text-[#ed8936] transition-colors">实践环境</Link>
            <Link to="/community" className="hover:text-[#ed8936] transition-colors">社区</Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-4">
            <button 
              onClick={handleLogin}
              className="px-4 py-2 rounded-md hover:bg-[#2a4a6d] transition-colors"
            >
              登录
            </button>
            <button 
              onClick={handleRegister}
              className="px-4 py-2 bg-[#ed8936] rounded-md hover:bg-[#d69e4f] transition-colors"
            >
              注册
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4">
            <Link to="/" className="block hover:text-[#ed8936] transition-colors">首页</Link>
            <Link to="/courses" className="block hover:text-[#ed8936] transition-colors">课程</Link>
            <Link to="/learning-center" className="block hover:text-[#ed8936] transition-colors">学习中心</Link>
            <Link to="/practice" className="block hover:text-[#ed8936] transition-colors">实践环境</Link>
            <Link to="/community" className="block hover:text-[#ed8936] transition-colors">社区</Link>
            <div className="flex space-x-4 pt-2">
              <button 
                onClick={handleLogin}
                className="flex-1 px-4 py-2 rounded-md hover:bg-[#2a4a6d] transition-colors"
              >
                登录
              </button>
              <button 
                onClick={handleRegister}
                className="flex-1 px-4 py-2 bg-[#ed8936] rounded-md hover:bg-[#d69e4f] transition-colors"
              >
                注册
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;