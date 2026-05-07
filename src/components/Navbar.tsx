import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { name: '首页', path: '/' },
    { name: '课程学习', path: '/courses' },
    { name: '练习题库', path: '/practice' },
    { name: '实战案例', path: '/projects' },
    { name: '学习路线', path: '/learning-path' },
    { name: '个人中心', path: '/profile' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <header className="bg-gradient-to-r from-[#1a365d] to-[#2c5282] text-white shadow-lg border-b-4 border-[#4299e1] sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-[#4299e1] to-[#ed8936] rounded-lg border-2 border-white flex items-center justify-center shadow-md">
              <span className="text-lg font-bold font-mono">Py</span>
            </div>
            <div>
              <span className="text-lg font-bold tracking-wide">Python数据分析学习实训平台</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-[#4299e1] text-white shadow-md'
                    : 'hover:bg-white/10 text-white/90 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              title="切换主题"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Admin Link */}
            <Link
              to="/admin"
              className="px-3 py-2 text-sm rounded-lg hover:bg-white/10 transition-colors border border-white/30"
            >
              后台管理
            </Link>

            {/* Auth Buttons */}
            <button
              onClick={handleLogin}
              className="px-4 py-2 text-sm rounded-lg bg-white/10 hover:bg-white/20 transition-colors border border-white/30"
            >
              登录
            </button>
            <button
              onClick={handleRegister}
              className="px-4 py-2 text-sm rounded-lg bg-[#ed8936] hover:bg-[#dd6b20] transition-colors shadow-md"
            >
              注册
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
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
          <div className="lg:hidden pb-4 space-y-2 animate-slideDown">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-[#4299e1] text-white'
                    : 'hover:bg-white/10 text-white/90'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <Link
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-sm font-medium border border-white/30 hover:bg-white/10"
              >
                后台管理
              </Link>
              <button
                onClick={() => {
                  handleLogin();
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-3 rounded-lg text-sm font-medium bg-white/10 hover:bg-white/20 border border-white/30"
              >
                登录
              </button>
              <button
                onClick={() => {
                  handleRegister();
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-3 rounded-lg text-sm font-medium bg-[#ed8936] hover:bg-[#dd6b20]"
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
