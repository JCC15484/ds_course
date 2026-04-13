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
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#1a365d] mb-4">管理后台</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            管理课程、用户和平台设置
          </p>
        </div>

        {/* 标签页 */}
        <div className="border-b border-gray-200 mb-8">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="admin-tabs" role="tablist">
            <li className="mr-2" role="presentation">
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'courses' ? 'border-[#4299e1] text-[#4299e1]' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}
                onClick={() => setActiveTab('courses')}
              >
                课程管理
              </button>
            </li>
            <li className="mr-2" role="presentation">
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'users' ? 'border-[#4299e1] text-[#4299e1]' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}
                onClick={() => setActiveTab('users')}
              >
                用户管理
              </button>
            </li>
            <li role="presentation">
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'settings' ? 'border-[#4299e1] text-[#4299e1]' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}
                onClick={() => setActiveTab('settings')}
              >
                平台设置
              </button>
            </li>
          </ul>
        </div>

        {/* 标签页内容 */}
        <div className="tab-content">
          {/* 课程管理 */}
          {activeTab === 'courses' && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">课程管理</h2>
                  <button className="px-4 py-2 bg-[#4299e1] text-white rounded-md hover:bg-[#3182ce] transition-colors">
                    创建课程
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">课程名称</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">讲师</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">分类</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">级别</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">学生数</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">创建日期</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {courses.map((course) => (
                        <tr key={course.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{course.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900">{course.instructor}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                              {course.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${course.level === 'beginner' ? 'bg-green-100 text-green-800' : course.level === 'intermediate' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                              {course.level === 'beginner' ? '初级' : course.level === 'intermediate' ? '中级' : '高级'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${course.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                              {course.status === 'published' ? '已发布' : '草稿'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900">{course.students}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-500">{course.created_at}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
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
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">用户管理</h2>
                  <button className="px-4 py-2 bg-[#4299e1] text-white rounded-md hover:bg-[#3182ce] transition-colors">
                    添加用户
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户名</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">邮箱</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">角色</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">加入日期</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最后登录</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{user.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-900">{user.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.role === 'user' ? 'bg-gray-100 text-gray-800' : user.role === 'premium' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                              {user.role === 'user' ? '普通用户' : user.role === 'premium' ? '付费用户' : '讲师'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-500">{user.join_date}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-gray-500">{user.last_login}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
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
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">平台设置</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">基本设置</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">平台名称</label>
                        <input 
                          type="text" 
                          defaultValue="数据分析教育平台" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4299e1]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">平台描述</label>
                        <textarea 
                          defaultValue="基于Python的数据分析在线教育平台，为商务数据分析与应用专业的学生提供系统化的学习资源和实践环境。" 
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4299e1]"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-4">邮件设置</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">SMTP服务器</label>
                        <input 
                          type="text" 
                          defaultValue="smtp.example.com" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4299e1]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">SMTP端口</label>
                        <input 
                          type="number" 
                          defaultValue="587" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4299e1]"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pt-4">
                    <button className="px-4 py-2 bg-[#4299e1] text-white rounded-md hover:bg-[#3182ce] transition-colors">
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