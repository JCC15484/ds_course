import { useState } from 'react';

const Community = () => {
  const [activeTab, setActiveTab] = useState('discussions');
  const [search, setSearch] = useState('');

  // 模拟讨论帖子数据
  const discussions = [
    {
      id: '1',
      title: '如何使用Pandas进行数据清洗？',
      author: '李明',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pixel%20art%20young%20male%20student%20avatar%208-bit%20style&image_size=square',
      category: '技术讨论',
      replies: 12,
      views: 156,
      lastUpdated: '2026-01-15 14:30',
      content: '我在处理CSV数据时遇到了一些问题，特别是缺失值的处理。请问有什么好的方法吗？'
    },
    {
      id: '2',
      title: '机器学习模型选择指南',
      author: '王芳',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pixel%20art%20young%20female%20student%20avatar%208-bit%20style&image_size=square',
      category: '机器学习',
      replies: 8,
      views: 98,
      lastUpdated: '2026-01-14 10:15',
      content: '对于不同类型的问题，应该如何选择合适的机器学习模型？有什么经验可以分享吗？'
    },
    {
      id: '3',
      title: '商务数据分析案例分享',
      author: '张伟',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pixel%20art%20middle%20age%20male%20student%20avatar%208-bit%20style&image_size=square',
      category: '商务分析',
      replies: 15,
      views: 203,
      lastUpdated: '2026-01-13 09:45',
      content: '我最近完成了一个销售数据分析项目，想和大家分享一下我的分析思路和结果。'
    }
  ];

  // 模拟问答数据
  const questions = [
    {
      id: '1',
      title: 'Python中如何实现数据可视化？',
      author: '赵强',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pixel%20art%20young%20male%20student%20avatar%208-bit%20style&image_size=square',
      category: '技术问答',
      answers: 5,
      views: 124,
      lastUpdated: '2026-01-15 16:45',
      content: '我想学习Python的数据可视化，应该从哪个库开始？有什么好的学习资源推荐吗？'
    },
    {
      id: '2',
      title: '如何处理大数据集？',
      author: '刘静',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pixel%20art%20young%20female%20student%20avatar%208-bit%20style&image_size=square',
      category: '技术问答',
      answers: 3,
      views: 76,
      lastUpdated: '2026-01-14 13:20',
      content: '当数据集很大时，如何提高处理速度？有什么优化技巧吗？'
    },
    {
      id: '3',
      title: '数据分析职业发展路径',
      author: '陈波',
      avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=pixel%20art%20middle%20age%20male%20student%20avatar%208-bit%20style&image_size=square',
      category: '职业规划',
      answers: 7,
      views: 189,
      lastUpdated: '2026-01-13 11:30',
      content: '作为一名数据分析师，未来的职业发展路径有哪些？需要掌握哪些技能？'
    }
  ];

  // 筛选帖子
  const filteredDiscussions = discussions.filter(discussion => 
    discussion.title.toLowerCase().includes(search.toLowerCase()) ||
    discussion.content.toLowerCase().includes(search.toLowerCase())
  );

  const filteredQuestions = questions.filter(question => 
    question.title.toLowerCase().includes(search.toLowerCase()) ||
    question.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-pixel-fade-in">
          <h1 className="text-3xl font-bold text-[#1a365d] mb-4 font-pixel">社区论坛</h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-pixel text-sm">
            与其他学习者交流，分享知识和经验
          </p>
        </div>

        {/* 搜索和标签页 */}
        <div className="mb-8 animate-pixel-fade-in">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索帖子..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-[#1a365d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ed8936] font-pixel text-sm"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute right-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <button className="px-4 py-2 bg-[#4299e1] border-2 border-[#1a365d] text-white rounded-md hover:bg-[#3182ce] transition-colors font-pixel text-xs animate-pixel-bounce">
              发布新帖
            </button>
          </div>

          {/* 标签页 */}
          <div className="border-b-4 border-[#1a365d]">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="community-tabs" role="tablist">
              <li className="mr-2" role="presentation">
                <button
                  className={`inline-block p-4 border-b-4 rounded-t-lg ${activeTab === 'discussions' ? 'border-[#ed8936] text-[#ed8936]' : 'border-transparent hover:text-gray-600 hover:border-gray-300'} font-pixel`}
                  onClick={() => setActiveTab('discussions')}
                >
                  讨论区
                </button>
              </li>
              <li role="presentation">
                <button
                  className={`inline-block p-4 border-b-4 rounded-t-lg ${activeTab === 'questions' ? 'border-[#ed8936] text-[#ed8936]' : 'border-transparent hover:text-gray-600 hover:border-gray-300'} font-pixel`}
                  onClick={() => setActiveTab('questions')}
                >
                  问答区
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* 标签页内容 */}
        <div className="tab-content">
          {/* 讨论区 */}
          {activeTab === 'discussions' && (
            <div className="space-y-4">
              {filteredDiscussions.map((discussion, index) => (
                <div key={discussion.id} className="bg-white rounded-md border-4 border-[#1a365d] shadow-md p-6 hover:shadow-lg transition-shadow animate-pixel-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="flex items-start">
                    <img 
                      src={discussion.avatar} 
                      alt={discussion.author} 
                      className="w-12 h-12 rounded-md border-2 border-[#1a365d] object-cover mr-4"
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-[#1a365d] font-pixel">{discussion.title}</h3>
                        <span className="px-2 py-1 text-xs font-pixel rounded-md bg-blue-100 text-blue-800 border-2 border-blue-800">
                          {discussion.category}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4 font-pixel text-sm leading-relaxed">{discussion.content}</p>
                      <div className="flex items-center text-xs text-gray-500 font-pixel">
                        <span className="mr-4">作者: {discussion.author}</span>
                        <span className="mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          {discussion.views} 浏览
                        </span>
                        <span className="mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                          {discussion.replies} 回复
                        </span>
                        <span>最后更新: {discussion.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredDiscussions.length === 0 && (
                <div className="text-center py-12 animate-pixel-fade-in">
                  <p className="text-gray-600 font-pixel">没有找到匹配的讨论</p>
                </div>
              )}
            </div>
          )}

          {/* 问答区 */}
          {activeTab === 'questions' && (
            <div className="space-y-4">
              {filteredQuestions.map((question, index) => (
                <div key={question.id} className="bg-white rounded-md border-4 border-[#1a365d] shadow-md p-6 hover:shadow-lg transition-shadow animate-pixel-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="flex items-start">
                    <img 
                      src={question.avatar} 
                      alt={question.author} 
                      className="w-12 h-12 rounded-md border-2 border-[#1a365d] object-cover mr-4"
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-[#1a365d] font-pixel">{question.title}</h3>
                        <span className="px-2 py-1 text-xs font-pixel rounded-md bg-green-100 text-green-800 border-2 border-green-800">
                          {question.category}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4 font-pixel text-sm leading-relaxed">{question.content}</p>
                      <div className="flex items-center text-xs text-gray-500 font-pixel">
                        <span className="mr-4">作者: {question.author}</span>
                        <span className="mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          {question.views} 浏览
                        </span>
                        <span className="mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                          {question.answers} 回答
                        </span>
                        <span>最后更新: {question.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {filteredQuestions.length === 0 && (
                <div className="text-center py-12 animate-pixel-fade-in">
                  <p className="text-gray-600 font-pixel">没有找到匹配的问题</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;