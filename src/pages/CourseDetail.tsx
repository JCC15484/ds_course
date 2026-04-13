import { useState } from 'react';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');

  // 模拟课程详情数据
  const course = {
    id: id,
    title: 'Python数据分析基础',
    description: '本课程将带你掌握Python数据分析的核心概念和基础库，包括NumPy、Pandas、Matplotlib等，为数据分析工作打下坚实的基础。',
    instructor: {
      name: '张教授',
      title: '数据科学教授',
      bio: '拥有10年数据分析教学经验，曾在多家知名企业担任数据分析师',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pixel%20art%20professional%20male%20professor%20portrait%208-bit%20style&image_size=square'
    },
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pixel%20art%20Python%20data%20analysis%20course%208-bit%20style&image_size=landscape_16_9',
    rating: 4.8,
    reviewCount: 120,
    level: 'beginner',
    category: '基础',
    duration: '8周',
    lessons: 24,
    price: 0,
    is_premium: false,
    modules: [
      {
        id: '1',
        title: 'Python基础',
        lessons: [
          { id: '1-1', title: 'Python环境搭建', duration: '45分钟' },
          { id: '1-2', title: 'Python基础语法', duration: '60分钟' },
          { id: '1-3', title: 'Python数据类型', duration: '45分钟' }
        ]
      },
      {
        id: '2',
        title: 'NumPy基础',
        lessons: [
          { id: '2-1', title: 'NumPy数组', duration: '60分钟' },
          { id: '2-2', title: 'NumPy运算', duration: '45分钟' },
          { id: '2-3', title: 'NumPy索引和切片', duration: '45分钟' }
        ]
      },
      {
        id: '3',
        title: 'Pandas基础',
        lessons: [
          { id: '3-1', title: 'Series和DataFrame', duration: '60分钟' },
          { id: '3-2', title: '数据读取和写入', duration: '45分钟' },
          { id: '3-3', title: '数据清洗和处理', duration: '60分钟' }
        ]
      },
      {
        id: '4',
        title: '数据可视化',
        lessons: [
          { id: '4-1', title: 'Matplotlib基础', duration: '60分钟' },
          { id: '4-2', title: 'Seaborn高级可视化', duration: '45分钟' },
          { id: '4-3', title: '交互式可视化', duration: '45分钟' }
        ]
      }
    ],
    reviewList: [
      {
        id: '1',
        user: '李明',
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pixel%20art%20young%20male%20student%20avatar%208-bit%20style&image_size=square',
        rating: 5,
        comment: '课程内容非常详细，老师讲解清晰，适合零基础学习',
        date: '2026-01-15'
      },
      {
        id: '2',
        user: '王芳',
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pixel%20art%20young%20female%20student%20avatar%208-bit%20style&image_size=square',
        rating: 4,
        comment: '课程内容很好，但是练习题目可以更多一些',
        date: '2026-01-10'
      },
      {
        id: '3',
        user: '张伟',
        avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pixel%20art%20middle%20age%20male%20student%20avatar%208-bit%20style&image_size=square',
        rating: 5,
        comment: '老师的讲解非常专业，学到了很多实用的技能',
        date: '2026-01-05'
      }
    ]
  };

  const handleEnroll = () => {
    // 这里可以实现报名逻辑
    console.log('Enroll clicked');
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        {/* 课程头部 */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12 animate-pixel-fade-in">
          <div className="lg:w-2/3">
            <h1 className="text-3xl font-bold text-[#1a365d] mb-4 font-pixel">{course.title}</h1>
            <div className="flex items-center mb-4">
                  <span className={`px-2 py-1 rounded text-xs font-pixel ${course.level === 'beginner' ? 'bg-green-100 text-green-800 border-2 border-green-800' : course.level === 'intermediate' ? 'bg-blue-100 text-blue-800 border-2 border-blue-800' : 'bg-purple-100 text-purple-800 border-2 border-purple-800'}`}>
                    {course.level === 'beginner' ? '初级' : course.level === 'intermediate' ? '中级' : '高级'}
                  </span>
                  <span className="px-2 py-1 rounded text-xs font-pixel bg-gray-100 text-gray-800 ml-2 border-2 border-gray-800">
                    {course.category}
                  </span>
                  <div className="flex items-center ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span className="ml-1 font-pixel">{course.rating}</span>
                    <span className="ml-2 text-gray-500 font-pixel text-sm">({course.reviewCount} 评价)</span>
                  </div>
                </div>
            <p className="text-gray-600 mb-6 font-pixel text-sm leading-relaxed">{course.description}</p>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center font-pixel text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#4299e1] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center font-pixel text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#4299e1] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>{course.lessons} 课时</span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3">
            <div className="bg-white rounded-md border-4 border-[#1a365d] shadow-md overflow-hidden animate-pixel-fade-in">
              <div className="h-48 overflow-hidden border-b-4 border-[#ed8936]">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold mb-2 font-pixel">{course.title}</h3>
                  <div className="flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span className="ml-1 font-pixel">{course.rating}</span>
                    <span className="ml-2 text-gray-500 font-pixel text-sm">({course.reviewCount} 评价)</span>
                  </div>
                  <div className="text-2xl font-bold mb-4 font-pixel">
                    {course.price === 0 ? '免费' : `¥${course.price}`}
                  </div>
                </div>
                <button 
                  onClick={handleEnroll}
                  className="w-full py-3 bg-[#ed8936] border-2 border-[#1a365d] text-white rounded-md hover:bg-[#d69e4f] transition-colors font-pixel text-sm animate-pixel-bounce"
                >
                  立即报名
                </button>
                <button className="w-full mt-3 py-3 border-2 border-[#4299e1] text-[#4299e1] rounded-md hover:bg-[#4299e1] hover:text-white transition-colors font-pixel text-sm">
                  加入收藏
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 标签页 */}
        <div className="border-b-4 border-[#1a365d] mb-8 animate-pixel-fade-in">
          <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="course-tabs" role="tablist">
            <li className="mr-2" role="presentation">
              <button
                className={`inline-block p-4 border-b-4 rounded-t-lg ${activeTab === 'overview' ? 'border-[#ed8936] text-[#ed8936]' : 'border-transparent hover:text-gray-600 hover:border-gray-300'} font-pixel`}
                onClick={() => setActiveTab('overview')}
              >
                课程概览
              </button>
            </li>
            <li className="mr-2" role="presentation">
              <button
                className={`inline-block p-4 border-b-4 rounded-t-lg ${activeTab === 'curriculum' ? 'border-[#ed8936] text-[#ed8936]' : 'border-transparent hover:text-gray-600 hover:border-gray-300'} font-pixel`}
                onClick={() => setActiveTab('curriculum')}
              >
                课程大纲
              </button>
            </li>
            <li className="mr-2" role="presentation">
              <button
                className={`inline-block p-4 border-b-4 rounded-t-lg ${activeTab === 'instructor' ? 'border-[#ed8936] text-[#ed8936]' : 'border-transparent hover:text-gray-600 hover:border-gray-300'} font-pixel`}
                onClick={() => setActiveTab('instructor')}
              >
                讲师介绍
              </button>
            </li>
            <li role="presentation">
              <button
                className={`inline-block p-4 border-b-4 rounded-t-lg ${activeTab === 'reviews' ? 'border-[#ed8936] text-[#ed8936]' : 'border-transparent hover:text-gray-600 hover:border-gray-300'} font-pixel`}
                onClick={() => setActiveTab('reviews')}
              >
                学员评价
              </button>
            </li>
          </ul>
        </div>

        {/* 标签页内容 */}
        <div className="tab-content animate-pixel-fade-in">
          {/* 课程概览 */}
          {activeTab === 'overview' && (
            <div className="prose max-w-none font-pixel">
              <h2 className="text-2xl font-bold text-[#1a365d] mb-4 font-pixel">课程简介</h2>
              <p className="text-gray-600 mb-4 font-pixel text-sm leading-relaxed">{course.description}</p>
              <h3 className="text-xl font-bold text-[#1a365d] mb-2 font-pixel">课程目标</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2 font-pixel text-sm">
                <li>掌握Python基础语法和数据类型</li>
                <li>熟悉NumPy库的使用</li>
                <li>掌握Pandas库进行数据处理</li>
                <li>学会使用Matplotlib和Seaborn进行数据可视化</li>
                <li>能够独立完成简单的数据分析任务</li>
              </ul>
              <h3 className="text-xl font-bold text-[#1a365d] mb-2 font-pixel">适合人群</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2 font-pixel text-sm">
                <li>商务数据分析与应用专业的学生</li>
                <li>想入门数据分析的初学者</li>
                <li>需要提升数据分析技能的职场人士</li>
              </ul>
              <h3 className="text-xl font-bold text-[#1a365d] mb-2 font-pixel">课程要求</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2 font-pixel text-sm">
                <li>基本的计算机操作能力</li>
                <li>对编程有兴趣</li>
                <li>不需要Python基础</li>
              </ul>
            </div>
          )}

          {/* 课程大纲 */}
          {activeTab === 'curriculum' && (
            <div>
              {course.modules.map((module, index) => (
                <div key={module.id} className="mb-6 animate-pixel-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="bg-gray-100 p-4 rounded-md border-2 border-[#1a365d]">
                    <h3 className="text-lg font-bold text-[#1a365d] font-pixel">{module.title}</h3>
                  </div>
                  <div className="mt-2 space-y-2">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div key={lesson.id} className="flex items-center p-3 border-2 border-[#1a365d] rounded-md bg-white animate-pixel-fade-in" style={{ animationDelay: `${(index * 0.2) + (lessonIndex * 0.1)}s` }}>
                        <div className="w-8 h-8 bg-[#4299e1] rounded-md border-2 border-[#1a365d] flex items-center justify-center text-white font-pixel mr-3">
                          {lesson.id.split('-')[1]}
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-pixel text-sm">{lesson.title}</h4>
                        </div>
                        <div className="text-gray-500 font-pixel text-xs">{lesson.duration}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 讲师介绍 */}
          {activeTab === 'instructor' && (
            <div className="flex flex-col md:flex-row gap-8 animate-pixel-fade-in">
              <div className="md:w-1/4">
                <div className="bg-white rounded-md border-4 border-[#1a365d] shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex justify-center mb-4">
                      <img 
                        src={course.instructor.avatar} 
                        alt={course.instructor.name} 
                        className="w-32 h-32 rounded-md border-2 border-[#1a365d] object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-center mb-2 font-pixel">{course.instructor.name}</h3>
                    <p className="text-gray-600 text-center mb-4 font-pixel text-xs">{course.instructor.title}</p>
                  </div>
                </div>
              </div>
              <div className="md:w-3/4">
                <h2 className="text-2xl font-bold mb-4 font-pixel">关于讲师</h2>
                <p className="text-gray-600 mb-4 font-pixel text-sm leading-relaxed">{course.instructor.bio}</p>
                <h3 className="text-xl font-bold mb-2 font-pixel">专业背景</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2 font-pixel text-sm">
                  <li>北京大学计算机科学博士</li>
                  <li>10年数据分析教学经验</li>
                  <li>曾在阿里巴巴、腾讯等公司担任数据分析师</li>
                  <li>发表过多篇数据分析相关论文</li>
                  <li>著有《Python数据分析实战》等书籍</li>
                </ul>
              </div>
            </div>
          )}

          {/* 学员评价 */}
          {activeTab === 'reviews' && (
            <div>
              <div className="mb-8 animate-pixel-fade-in">
                <div className="flex items-center mb-4">
                  <div className="text-4xl font-bold mr-4 font-pixel">{course.rating}</div>
                  <div>
                    <div className="flex mb-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < Math.floor(course.rating) ? 'text-yellow-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 font-pixel text-sm">{course.reviewCount} 条评价</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                {course.reviewList.map((review, index) => (
                  <div key={review.id} className="bg-white p-6 rounded-md border-4 border-[#1a365d] shadow-md animate-pixel-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className="flex items-center mb-4">
                      <img 
                        src={review.avatar} 
                        alt={review.user} 
                        className="w-12 h-12 rounded-md border-2 border-[#1a365d] object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-bold font-pixel">{review.user}</h4>
                        <div className="flex mb-1">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                          ))}
                        </div>
                        <p className="text-gray-500 text-xs font-pixel">{review.date}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 font-pixel text-sm leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;