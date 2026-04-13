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
    <header className="bg-[#1a365d] text-white shadow-md border-b-4 border-[#ed8936]">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 animate-pixel-bounce">
            <div className="w-12 h-12 bg-[#4299e1] rounded-md border-2 border-white flex items-center justify-center">
              <span className="text-xl font-bold font-pixel">PyData</span>
            </div>
            <span className="text-lg font-bold font-pixel">数据分析教育平台</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-[#ed8936] transition-colors font-pixel text-sm hover:scale-105 transition-transform">首页</Link>
            <Link to="/courses" className="hover:text-[#ed8936] transition-colors font-pixel text-sm hover:scale-105 transition-transform">课程</Link>
            <Link to="/learning-center" className="hover:text-[#ed8936] transition-colors font-pixel text-sm hover:scale-105 transition-transform">学习中心</Link>
            <Link to="/sql-learning" className="hover:text-[#ed8936] transition-colors font-pixel text-sm hover:scale-105 transition-transform">SQL学习</Link>
            <Link to="/practice" className="hover:text-[#ed8936] transition-colors font-pixel text-sm hover:scale-105 transition-transform">实践环境</Link>
            <Link to="/community" className="hover:text-[#ed8936] transition-colors font-pixel text-sm hover:scale-105 transition-transform">社区</Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-4">
            <button 
              onClick={handleLogin}
              className="px-4 py-2 bg-[#2a4a6d] border-2 border-white rounded-md hover:bg-[#3a5a7d] transition-colors font-pixel text-xs"
            >
              登录
            </button>
            <button 
              onClick={handleRegister}
              className="px-4 py-2 bg-[#ed8936] border-2 border-white rounded-md hover:bg-[#d69e4f] transition-colors font-pixel text-xs animate-pixel-pulse"
            >
              注册
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4 animate-pixel-slide-in">
            <Link to="/" className="block hover:text-[#ed8936] transition-colors font-pixel">首页</Link>
            <Link to="/courses" className="block hover:text-[#ed8936] transition-colors font-pixel">课程</Link>
            <Link to="/learning-center" className="block hover:text-[#ed8936] transition-colors font-pixel">学习中心</Link>
            <Link to="/sql-learning" className="block hover:text-[#ed8936] transition-colors font-pixel">SQL学习</Link>
            <Link to="/practice" className="block hover:text-[#ed8936] transition-colors font-pixel">实践环境</Link>
            <Link to="/community" className="block hover:text-[#ed8936] transition-colors font-pixel">社区</Link>
            <div className="flex space-x-4 pt-2">
              <button 
                onClick={handleLogin}
                className="flex-1 px-4 py-2 bg-[#2a4a6d] border-2 border-white rounded-md hover:bg-[#3a5a7d] transition-colors font-pixel text-xs"
              >
                登录
              </button>
              <button 
                onClick={handleRegister}
                className="flex-1 px-4 py-2 bg-[#ed8936] border-2 border-white rounded-md hover:bg-[#d69e4f] transition-colors font-pixel text-xs"
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