import { useState } from 'react';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [category, setCategory] = useState('all');
  const [level, setLevel] = useState('all');
  const [search, setSearch] = useState('');

  // 模拟课程数据
  const courses = [
    {
      id: '1',
      title: 'Python数据分析基础',
      description: '掌握Python数据分析的核心概念和基础库',
      category: '基础',
      level: 'beginner',
      rating: 4.8,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Python%20data%20analysis%20course%20cover%20with%20pandas%20and%20numpy%20visualization&image_size=landscape_16_9'
    },
    {
      id: '2',
      title: '商务数据可视化',
      description: '使用Matplotlib和Seaborn创建专业的数据可视化',
      category: '可视化',
      level: 'intermediate',
      rating: 4.6,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Business%20data%20visualization%20course%20cover%20with%20charts%20and%20graphs&image_size=landscape_16_9'
    },
    {
      id: '3',
      title: '机器学习实战',
      description: '从理论到实践，掌握机器学习算法的应用',
      category: '机器学习',
      level: 'advanced',
      rating: 4.9,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Machine%20learning%20course%20cover%20with%20AI%20concepts%20and%20data%20models&image_size=landscape_16_9'
    },
    {
      id: '4',
      title: '商务数据分析',
      description: '针对商务场景的数据分析方法和技巧',
      category: '商务',
      level: 'intermediate',
      rating: 4.7,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Business%20data%20analysis%20course%20cover%20with%20business%20charts%20and%20analytics&image_size=landscape_16_9'
    },
    {
      id: '5',
      title: 'SQL数据库基础',
      description: '掌握SQL查询和数据库操作',
      category: '数据库',
      level: 'beginner',
      rating: 4.5,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=SQL%20database%20course%20cover%20with%20database%20tables%20and%20queries&image_size=landscape_16_9'
    },
    {
      id: '6',
      title: '大数据分析',
      description: '使用Spark和Hadoop处理大规模数据',
      category: '大数据',
      level: 'advanced',
      rating: 4.8,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Big%20data%20analysis%20course%20cover%20with%20data%20cloud%20and%20processing&image_size=landscape_16_9'
    }
  ];

  // 筛选课程
  const filteredCourses = courses.filter(course => {
    const matchesCategory = category === 'all' || course.category === category;
    const matchesLevel = level === 'all' || course.level === level;
    const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase()) || 
                         course.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesLevel && matchesSearch;
  });

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#1a365d] mb-4">课程列表</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            浏览我们的课程，找到适合你的学习内容
          </p>
        </div>

        {/* 筛选和搜索 */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索课程..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4299e1]"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute right-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4299e1]"
              >
                <option value="all">全部分类</option>
                <option value="基础">基础</option>
                <option value="可视化">可视化</option>
                <option value="机器学习">机器学习</option>
                <option value="商务">商务</option>
                <option value="数据库">数据库</option>
                <option value="大数据">大数据</option>
              </select>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4299e1]"
              >
                <option value="all">全部级别</option>
                <option value="beginner">初级</option>
                <option value="intermediate">中级</option>
                <option value="advanced">高级</option>
              </select>
            </div>
          </div>
        </div>

        {/* 课程列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${course.level === 'beginner' ? 'bg-green-100 text-green-800' : course.level === 'intermediate' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}`}>
                    {course.level === 'beginner' ? '初级' : course.level === 'intermediate' ? '中级' : '高级'}
                  </span>
                  <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800 ml-2">
                    {course.category}
                  </span>
                  <div className="flex items-center ml-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span className="ml-1 text-sm font-medium">{course.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#1a365d]">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <Link 
                  to={`/courses/${course.id}`} 
                  className="inline-block px-4 py-2 bg-[#4299e1] text-white rounded-md hover:bg-[#3182ce] transition-colors"
                >
                  查看详情
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">没有找到匹配的课程</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;