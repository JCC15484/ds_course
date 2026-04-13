import { useState } from 'react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('courses');

  // 模拟课程数据
  const courses = [
    {
      id: '1',
      title: 'Python数据分析基础',
      instructor: '张教授',
      category: '基础',
      level: 'beginner',
      status: 'published',
      students: 120,
      created_at: '2026-01-01'
    },
    {
      id: '2',
      title: '商务数据可视化',
      instructor: '李教授',
      category: '可视化',
      level: 'intermediate',
      status: 'published',
      students: 85,
      created_at: '2026-01-05'
    },
    {
      id: '3',
      title: '机器学习实战',
      instructor: '王教授',
      category: '机器学习',
      level: 'advanced',
      status: 'draft',
      students: 0,
      created_at: '2026-01-10'
    }
  ];

  // 模拟用户数据
  const users = [
    {
      id: '1',
      name: '张三',
      email: 'zhangsan@example.com',
      role: 'user',
      join_date: '2026-01-01',
      last_login: '2026-01-15'
    },
    {
      id: '2',
      name: '李四',
      email: 'lisi@example.com',
      role: 'premium',
      join_date: '2026-01-02',
      last_login: '2026-01-14'
    },
    {
      id: '3',
      name: '王五',
      email: 'wangwu@example.com',
      role: 'instructor',
      join_date: '2026-01-03',
      last_login: '2026-01-13'
    }
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-pixel-fade-in">
          <h1 className="text-3xl font-bold text-[#1a365d] mb-4 font-pixel">管理后台</h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-pixel text-sm">
            管理课程、用户和平台设置
          </p>
        </div>

        {/* 标签页 */}
        <div className="border-b-4 border-[#1a365d] mb-8 animate-pixel-fade-in">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="admin-tabs" role="tablist">
            <li className="mr-2" role="presentation">
              <button
                className={`inline-block p-4 border-b-4 rounded-t-lg ${activeTab === 'courses' ? 'border-[#ed8936] text-[#ed8936]' : 'border-transparent hover:text-gray-600 hover:border-gray-300'} font-pixel`}
                onClick={() => setActiveTab('courses')}
              >
                课程管理
              </button>
            </li>
            <li className="mr-2" role="presentation">
              <button
                className={`inline-block p-4 border-b-4 rounded-t-lg ${activeTab === 'users' ? 'border-[#ed8936] text-[#ed8936]' : 'border-transparent hover:text-gray-600 hover:border-gray-300'} font-pixel`}
                onClick={() => setActiveTab('users')}
              >
                用户管理
              </button>
            </li>
            <li role="presentation">
              <button
                className={`inline-block p-4 border-b-4 rounded-t-lg ${activeTab === 'settings' ? 'border-[#ed8936] text-[#ed8936]' : 'border-transparent hover:text-gray-600 hover:border-gray-300'} font-pixel`}
                onClick={() => setActiveTab('settings')}
              >
                平台设置
              </button>
            </li>
          </ul>
        </div>

        {/* 标签页内容 */}
        <div className="tab-content animate-pixel-fade-in">
          {/* 课程管理 */}
          {activeTab === 'courses' && (
            <div className="bg-white rounded-md border-4 border-[#1a365d] shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold font-pixel">课程管理</h2>
                  <button className="px-4 py-2 bg-[#4299e1] border-2 border-[#1a365d] text-white rounded-md hover:bg-[#3182ce] transition-colors font-pixel text-sm animate-pixel-bounce">
                    创建课程
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-2 border-[#1a365d]">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-6 py-3 text-left text-xs font-pixel text-gray-500 uppercase tracking-wider border-b-2 border-[#1a365d]">课程名称</th>
                        <th className="px-6 py-3 text-left text-xs font-pixel text-gray-500 uppercase tracking-wider border-b-2 border-[#1a365d]">讲师</th>
                        <th className="px-6 py-3 text-left text-xs font-pixel text-gray-500 uppercase tracking-wider border-b-2 border-[#1a365d]">分类</th>
                        <th className="px-6 py-3 text-left text-xs font-pixel text-gray-500 uppercase tracking-wider border-b-2 border-[#1a365d]">级别</th>
                        <th className="px-6 py-3 text-left text-xs font-pixel text-gray-500 uppercase tracking-wider border-b-2 border-[#1a365d]">状态</th>
                        <th className="px-6 py-3 text-left text-xs font-pixel text-gray-500 uppercase tracking-wider border-b-2 border-[#1a365d]">学生数</th>
                        <th className="px-6 py-3 text-left text-xs font-pixel text-gray-500 uppercase tracking-wider border-b-2 border-[#1a365d]">创建日期</th>
                        <th className="px-6 py-3 text-left text-xs font-pixel text-gray-500 uppercase tracking-wider border-b-2 border-[#1a365d]">操作</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {courses.map((course, index) => (
                        <tr key={course.id} className="border-b-2 border-[#1a365d] animate-pixel-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900 font-pixel text-sm">{course.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900 font-pixel text-sm">{course.instructor}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-pixel rounded-md bg-gray-100 text-gray-800 border-2 border-gray-800">
                              {course.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-pixel rounded-md border-2 ${course.level === 'beginner' ? 'bg-green-100 text-green-800 border-green-800' : course.level === 'intermediate' ? 'bg-blue-100 text-blue-800 border-blue-800' : 'bg-purple-100 text-purple-800 border-purple-800'}`}>
                              {course.level === 'beginner' ? '初级' : course.level === 'intermediate' ? '中级' : '高级'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-pixel rounded-md border-2 ${course.status === 'published' ? 'bg-green-100 text-green-800 border-green-800' : 'bg-gray-100 text-gray-800 border-gray-800'}`}>
                              {course.status === 'published' ? '已发布' : '草稿'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900 font-pixel text-sm">{course.students}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-500 font-pixel text-xs">{course.created_at}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-pixel">
                            <a href="#" className="text-[#4299e1] hover:text-[#3182ce] mr-3">编辑</a>
                            <a href="#" className="text-[#e53e3e] hover:text-[#c53030]">删除</a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 用户管理 */}
          {activeTab === 'users' && (
            <div className="bg-white rounded-md border-4 border-[#1a365d] shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold font-pixel">用户管理</h2>
                  <button className="px-4 py-2 bg-[#4299e1] border-2 border-[#1a365d] text-white rounded-md hover:bg-[#3182ce] transition-colors font-pixel text-sm animate-pixel-bounce">
                    添加用户
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-2 border-[#1a365d]">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-6 py-3 text-left text-xs font-pixel text-gray-500 uppercase tracking-wider border-b-2 border-[#1a365d]">用户名</th>
                        <th className="px-6 py-3 text-left text-xs font-pixel text-gray-500 uppercase tracking-wider border-b-2 border-[#1a365d]">邮箱</th>
                        <th className="px-6 py-3 text-left text-xs font-pixel text-gray-500 uppercase tracking-wider border-b-2 border-[#1a365d]">角色</th>
                        <th className="px-6 py-3 text-left text-xs font-pixel text-gray-500 uppercase tracking-wider border-b-2 border-[#1a365d]">加入日期</th>
                        <th className="px-6 py-3 text-left text-xs font-pixel text-gray-500 uppercase tracking-wider border-b-2 border-[#1a365d]">最后登录</th>
                        <th className="px-6 py-3 text-left text-xs font-pixel text-gray-500 uppercase tracking-wider border-b-2 border-[#1a365d]">操作</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {users.map((user, index) => (
                        <tr key={user.id} className="border-b-2 border-[#1a365d] animate-pixel-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900 font-pixel text-sm">{user.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900 font-pixel text-sm">{user.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-pixel rounded-md border-2 ${user.role === 'user' ? 'bg-gray-100 text-gray-800 border-gray-800' : user.role === 'premium' ? 'bg-blue-100 text-blue-800 border-blue-800' : 'bg-purple-100 text-purple-800 border-purple-800'}`}>
                              {user.role === 'user' ? '普通用户' : user.role === 'premium' ? '付费用户' : '讲师'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-500 font-pixel text-xs">{user.join_date}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-500 font-pixel text-xs">{user.last_login}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-pixel">
                            <a href="#" className="text-[#4299e1] hover:text-[#3182ce] mr-3">编辑</a>
                            <a href="#" className="text-[#e53e3e] hover:text-[#c53030]">删除</a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 平台设置 */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-md border-4 border-[#1a365d] shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 font-pixel">平台设置</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold mb-4 font-pixel">基本设置</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 font-pixel">平台名称</label>
                        <input 
                          type="text" 
                          defaultValue="数据分析教育平台" 
                          className="w-full px-4 py-2 border-2 border-[#1a365d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ed8936] font-pixel text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 font-pixel">平台描述</label>
                        <textarea 
                          defaultValue="基于Python的数据分析在线教育平台，为商务数据分析与应用专业的学生提供系统化的学习资源和实践环境。" 
                          rows={3}
                          className="w-full px-4 py-2 border-2 border-[#1a365d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ed8936] font-pixel text-sm"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-4 font-pixel">邮件设置</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 font-pixel">SMTP服务器</label>
                        <input 
                          type="text" 
                          defaultValue="smtp.example.com" 
                          className="w-full px-4 py-2 border-2 border-[#1a365d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ed8936] font-pixel text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 font-pixel">SMTP端口</label>
                        <input 
                          type="number" 
                          defaultValue="587" 
                          className="w-full px-4 py-2 border-2 border-[#1a365d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ed8936] font-pixel text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pt-4">
                    <button className="px-4 py-2 bg-[#4299e1] border-2 border-[#1a365d] text-white rounded-md hover:bg-[#3182ce] transition-colors font-pixel text-sm animate-pixel-bounce">
                      保存设置
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;