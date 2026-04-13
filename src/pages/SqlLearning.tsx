import { useState } from 'react';
import { Link } from 'react-router-dom';

const SqlLearning = () => {
  const [activePhase, setActivePhase] = useState('phase1');
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);

  // 学习大纲数据
  const learningOutline = {
    phase1: {
      title: '第一阶段：基础概念与环境搭建',
      duration: '第1周',
      goal: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        {
          title: '核心概念',
          items: [
            '理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。'
          ]
        },
        {
          title: 'SQL分类',
          items: [
            '了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。'
          ]
        },
        {
          title: '环境搭建',
          items: [
            '安装MySQL或SQLite（轻量级，适合入门）。',
            '安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。'
          ]
        },
        {
          title: '数据查询语言（DQL）核心',
          items: [
            'SELECT 语句：检索数据。',
            'FROM 子句：指定数据来源。',
            'WHERE 子句：使用 =、>、<、!=、BETWEEN、IN、LIKE、IS NULL 进行条件过滤。',
            'ORDER BY 子句：对结果进行排序（ASC升序，DESC降序）。',
            'LIMIT 子句：限制返回的行数。'
          ]
        }
      ],
      exercises: [
        '单表查询：从“员工信息表”或“学生表”中，练习使用 WHERE 进行各种条件筛选。',
        '查询“1990年出生的学生信息”。（题目31）',
        '查询所有课程成绩小于60分的学生信息。（类似题目4的思路）',
        '查询所有姓“李”的老师的个数。（类似题目6）'
      ],
      tasks: [
        { id: 'task1-1', title: '安装MySQL或SQLite', completed: false },
        { id: 'task1-2', title: '安装图形化客户端工具', completed: false },
        { id: 'task1-3', title: '完成单表查询练习', completed: false },
        { id: 'task1-4', title: '完成经典50题相关练习', completed: false }
      ],
      badge: { id: 'badge1', name: 'SQL新手', description: '完成第一阶段学习', icon: '🎯' }
    },
    phase2: {
      title: '第二阶段：数据操作与深入查询',
      duration: '第2-3周',
      goal: '能够对数据进行增删改，并执行更复杂的查询。',
      content: [
        {
          title: '数据操作语言（DML）',
          items: [
            'INSERT INTO：向表中插入新数据。',
            'UPDATE：更新表中现有数据。',
            'DELETE：从表中删除数据。'
          ]
        },
        {
          title: '数据定义语言（DDL）基础',
          items: [
            'CREATE DATABASE/TABLE：创建数据库和表。',
            'ALTER TABLE：修改表结构（如添加列）。',
            'DROP TABLE：删除表。'
          ]
        },
        {
          title: '高级查询技巧',
          items: [
            '聚合函数：COUNT()、SUM()、AVG()、MAX()、MIN()。',
            'GROUP BY 子句：对数据进行分组。',
            'HAVING 子句：对分组后的结果进行过滤（与WHERE区别）。',
            '去重：DISTINCT 关键字。'
          ]
        }
      ],
      exercises: [
        'DML/DDL练习：创建一个“地址簿”表，并进行插入、更新、添加列等操作。（参考《SQL基础教程》第1章练习题）',
        '查询平均成绩大于等于60分的同学的学生编号、姓名和平均成绩。（题目3）',
        '查询每门课程的平均成绩，结果按平均成绩降序排列，平均成绩相同时，按课程编号升序排列。（题目32）',
        '查询至少有一门课与学号为“01”的同学所学相同的同学的信息。（题目12）',
        '查询各学生的年龄（按照出生日期来算）。（题目46）'
      ],
      tasks: [
        { id: 'task2-1', title: '完成DML操作练习', completed: false },
        { id: 'task2-2', title: '完成DDL操作练习', completed: false },
        { id: 'task2-3', title: '掌握聚合函数和分组查询', completed: false },
        { id: 'task2-4', title: '完成经典50题核心练习', completed: false }
      ],
      badge: { id: 'badge2', name: 'SQL进阶', description: '完成第二阶段学习', icon: '📈' }
    },
    phase3: {
      title: '第三阶段：多表操作与实战巩固',
      duration: '第4周',
      goal: '掌握关系数据库的核心——表关联，并能解决实际问题。',
      content: [
        {
          title: '多表连接（JOIN）',
          items: [
            '理解关系表设计（为什么需要多个表）。',
            'INNER JOIN：返回两个表中匹配的行。',
            'LEFT JOIN：返回左表所有行，即使右表没有匹配。',
            'RIGHT JOIN：返回右表所有行，即使左表没有匹配。'
          ]
        },
        {
          title: '子查询',
          items: [
            '在 WHERE、FROM、SELECT 子句中嵌套查询。'
          ]
        },
        {
          title: '综合实战',
          items: [
            '将单表查询、聚合、分组、多表连接组合起来解决复杂问题。'
          ]
        }
      ],
      exercises: [
        '查询“01”课程比“02”课程成绩高的学生的信息及课程分数。（题目1）',
        '查询学过“张三”老师授课的同学的信息。（题目7）',
        '查询学过编号为“01”并且也学过编号为“02”课程的学生信息。（题目9）',
        '查询选修“张三”老师所授课程的学生中，成绩最高的学生信息及其成绩。（题目40）',
        '查询选修了全部课程的学生信息。（题目45）'
      ],
      tasks: [
        { id: 'task3-1', title: '掌握多表连接操作', completed: false },
        { id: 'task3-2', title: '掌握子查询技巧', completed: false },
        { id: 'task3-3', title: '完成经典50题综合练习', completed: false },
        { id: 'task3-4', title: '解决复杂SQL查询问题', completed: false }
      ],
      badge: { id: 'badge3', name: 'SQL专家', description: '完成第三阶段学习', icon: '🏆' }
    },
    phase4: {
      title: '第四阶段：进阶与优化',
      duration: '持续学习',
      goal: '了解高级功能，编写更高效、更强大的SQL。',
      content: [
        {
          title: '窗口函数',
          items: [
            'ROW_NUMBER()， RANK()， DENSE_RANK()， LEAD()/LAG()（用于排名和跨行计算）。'
          ]
        },
        {
          title: '常用函数',
          items: [
            '字符串函数（CONCAT， SUBSTRING）、日期函数（DATE_FORMAT， DATEDIFF）。'
          ]
        },
        {
          title: '索引与性能基础',
          items: [
            '了解索引的作用，以及如何避免导致索引失效的写法（如对索引列使用函数）。'
          ]
        },
        {
          title: '事务概念',
          items: [
            '了解ACID属性，保证数据一致性。'
          ]
        }
      ],
      exercises: [
        '在掌握前三阶段后，可到 LeetCode 或 牛客网 的SQL题库进行系统性练习。',
        '尝试设计并实现一个简单的“学生选课系统”或“图书管理系统”的数据库，完成从建表到复杂查询的全过程。'
      ],
      tasks: [
        { id: 'task4-1', title: '学习窗口函数', completed: false },
        { id: 'task4-2', title: '掌握常用函数', completed: false },
        { id: 'task4-3', title: '了解索引与性能优化', completed: false },
        { id: 'task4-4', title: '完成项目实践', completed: false }
      ],
      badge: { id: 'badge4', name: 'SQL大师', description: '完成第四阶段学习', icon: '💎' }
    }
  };

  // 处理任务完成状态
  const handleTaskToggle = (taskId: string) => {
    if (completedTasks.includes(taskId)) {
      setCompletedTasks(completedTasks.filter(id => id !== taskId));
    } else {
      const newCompletedTasks = [...completedTasks, taskId];
      setCompletedTasks(newCompletedTasks);
      
      // 检查是否完成了当前阶段的所有任务
      const currentPhaseTasks = learningOutline[activePhase as keyof typeof learningOutline].tasks;
      const allTasksCompleted = currentPhaseTasks.every(task => newCompletedTasks.includes(task.id));
      
      // 如果完成了所有任务，授予徽章
      if (allTasksCompleted) {
        const currentBadge = learningOutline[activePhase as keyof typeof learningOutline].badge;
        if (!earnedBadges.includes(currentBadge.id)) {
          setEarnedBadges([...earnedBadges, currentBadge.id]);
        }
      }
    }
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-pixel-fade-in">
          <h1 className="text-3xl font-bold text-[#1a365d] mb-4 font-pixel">SQL入门学习大纲</h1>
          <p className="text-gray-600 max-w-2xl mx-auto font-pixel text-sm">
            从零到熟练的SQL学习路径
          </p>
        </div>

        {/* 学习阶段导航 */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-pixel-fade-in">
          {Object.entries(learningOutline).map(([key, phase]) => (
            <button
              key={key}
              className={`px-6 py-3 border-4 rounded-md font-pixel text-sm transition-colors ${activePhase === key ? 'bg-[#ed8936] text-white border-[#1a365d]' : 'bg-white text-[#1a365d] border-[#1a365d] hover:bg-gray-100'}`}
              onClick={() => setActivePhase(key)}
            >
              {phase.title}
            </button>
          ))}
        </div>

        {/* 当前阶段内容 */}
        <div className="bg-white rounded-md border-4 border-[#1a365d] shadow-md p-6 mb-12 animate-pixel-fade-in">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#1a365d] mb-2 font-pixel">
              {learningOutline[activePhase as keyof typeof learningOutline].title}
            </h2>
            <p className="text-gray-500 font-pixel text-sm mb-4">
              {learningOutline[activePhase as keyof typeof learningOutline].duration}
            </p>
            <div className="bg-gray-100 p-4 rounded-md border-2 border-[#1a365d] mb-6">
              <h3 className="font-bold mb-2 font-pixel">学习目标</h3>
              <p className="text-gray-600 font-pixel text-sm">
                {learningOutline[activePhase as keyof typeof learningOutline].goal}
              </p>
            </div>
          </div>

          {/* 学习内容 */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#1a365d] mb-4 font-pixel">学习内容</h3>
            <div className="space-y-6">
              {learningOutline[activePhase as keyof typeof learningOutline].content.map((section, index) => (
                <div key={index} className="border-2 border-[#1a365d] rounded-md p-4 animate-pixel-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  <h4 className="font-bold mb-2 font-pixel">{section.title}</h4>
                  <ul className="list-disc list-inside space-y-2 font-pixel text-sm">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-600">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 练习题 */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#1a365d] mb-4 font-pixel">配套练习题</h3>
            <div className="border-2 border-[#1a365d] rounded-md p-4">
              <ul className="list-disc list-inside space-y-2 font-pixel text-sm">
                {learningOutline[activePhase as keyof typeof learningOutline].exercises.map((exercise, index) => (
                  <li key={index} className="text-gray-600">{exercise}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 任务列表 */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#1a365d] mb-4 font-pixel">学习任务</h3>
            <div className="space-y-3">
              {learningOutline[activePhase as keyof typeof learningOutline].tasks.map((task, index) => (
                <div 
                  key={task.id} 
                  className={`flex items-center p-4 border-2 rounded-md font-pixel text-sm ${completedTasks.includes(task.id) ? 'bg-green-100 border-green-800' : 'bg-white border-[#1a365d]'}`}
                  onClick={() => handleTaskToggle(task.id)}
                >
                  <div className={`w-6 h-6 mr-3 flex items-center justify-center border-2 rounded ${completedTasks.includes(task.id) ? 'bg-green-800 border-green-800 text-white' : 'border-[#1a365d]'}`}>
                    {completedTasks.includes(task.id) ? '✓' : ''}
                  </div>
                  <span>{task.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 阶段徽章 */}
          <div>
            <h3 className="text-xl font-bold text-[#1a365d] mb-4 font-pixel">阶段成就</h3>
            <div className="flex items-center">
              <div className={`w-16 h-16 flex items-center justify-center text-3xl rounded-md border-4 ${earnedBadges.includes(learningOutline[activePhase as keyof typeof learningOutline].badge.id) ? 'bg-yellow-100 border-yellow-800 animate-pixel-bounce' : 'bg-gray-100 border-gray-400'}`}>
                {learningOutline[activePhase as keyof typeof learningOutline].badge.icon}
              </div>
              <div className="ml-4">
                <h4 className="font-bold font-pixel">{learningOutline[activePhase as keyof typeof learningOutline].badge.name}</h4>
                <p className="text-sm text-gray-600 font-pixel">{learningOutline[activePhase as keyof typeof learningOutline].badge.description}</p>
                <p className={`text-xs font-pixel mt-1 ${earnedBadges.includes(learningOutline[activePhase as keyof typeof learningOutline].badge.id) ? 'text-green-600' : 'text-gray-500'}`}>
                  {earnedBadges.includes(learningOutline[activePhase as keyof typeof learningOutline].badge.id) ? '✓ 已获得' : '⏳ 完成所有任务后获得'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 成就展示 */}
        <div className="bg-white rounded-md border-4 border-[#1a365d] shadow-md p-6 animate-pixel-fade-in">
          <h2 className="text-2xl font-bold text-[#1a365d] mb-6 font-pixel">我的成就</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(learningOutline).map(([key, phase]) => (
              <div key={key} className={`border-4 rounded-md p-4 text-center ${earnedBadges.includes(phase.badge.id) ? 'bg-yellow-50 border-yellow-800 animate-pixel-bounce' : 'bg-gray-50 border-gray-400'}`}>
                <div className="text-4xl mb-3">{phase.badge.icon}</div>
                <h3 className="font-bold mb-1 font-pixel">{phase.badge.name}</h3>
                <p className="text-xs text-gray-600 font-pixel">{phase.badge.description}</p>
                <p className={`text-xs font-pixel mt-2 ${earnedBadges.includes(phase.badge.id) ? 'text-green-600' : 'text-gray-500'}`}>
                  {earnedBadges.includes(phase.badge.id) ? '✓ 已获得' : '⏳ 未获得'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 学习建议 */}
        <div className="mt-12 bg-white rounded-md border-4 border-[#1a365d] shadow-md p-6 animate-pixel-fade-in">
          <h2 className="text-2xl font-bold text-[#1a365d] mb-4 font-pixel">学习建议</h2>
          <ul className="list-disc list-inside space-y-2 font-pixel text-sm text-gray-600">
            <li>每天坚持学习30-60分钟，保持学习的连贯性。</li>
            <li>理论与实践相结合，多做练习题巩固知识点。</li>
            <li>遇到问题时，查阅官方文档或向社区寻求帮助。</li>
            <li>尝试将SQL知识应用到实际项目中，加深理解。</li>
            <li>定期复习已学内容，确保知识点的掌握。</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SqlLearning;