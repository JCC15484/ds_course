import { useState, useEffect } from 'react';import { useState, useEffect } from 'react';
import { Link } from 'react-routerimport { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setimport { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks]import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements,import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id:import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHEREimport { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1',
          title: '单表查询import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1',
          title: '单表查询练习',
          description: '从"员工信息表"或"学生表"中import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1',
          title: '单表查询练习',
          description: '从"员工信息表"或"学生表"中，练习使用 WHERE 进行各种条件筛选。',
          difficulty: 'easy',
          points: 10
        },import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1',
          title: '单表查询练习',
          description: '从"员工信息表"或"学生表"中，练习使用 WHERE 进行各种条件筛选。',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'task-1-2',
          title:import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1',
          title: '单表查询练习',
          description: '从"员工信息表"或"学生表"中，练习使用 WHERE 进行各种条件筛选。',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'task-1-2',
          title: '查询1990年出生的学生信息',
          description: '使用WHEREimport { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1',
          title: '单表查询练习',
          description: '从"员工信息表"或"学生表"中，练习使用 WHERE 进行各种条件筛选。',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'task-1-2',
          title: '查询1990年出生的学生信息',
          description: '使用WHERE子句筛选1990年出生的import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1',
          title: '单表查询练习',
          description: '从"员工信息表"或"学生表"中，练习使用 WHERE 进行各种条件筛选。',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'task-1-2',
          title: '查询1990年出生的学生信息',
          description: '使用WHERE子句筛选1990年出生的学生。',
          difficulty: 'easy',
          points: 15
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1',
          title: '单表查询练习',
          description: '从"员工信息表"或"学生表"中，练习使用 WHERE 进行各种条件筛选。',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'task-1-2',
          title: '查询1990年出生的学生信息',
          description: '使用WHERE子句筛选1990年出生的学生。',
          difficulty: 'easy',
          points: 15
        },
        {
          id: 'task-1-3',
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1',
          title: '单表查询练习',
          description: '从"员工信息表"或"学生表"中，练习使用 WHERE 进行各种条件筛选。',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'task-1-2',
          title: '查询1990年出生的学生信息',
          description: '使用WHERE子句筛选1990年出生的学生。',
          difficulty: 'easy',
          points: 15
        },
        {
          id: 'task-1-3',
          title: '查询所有课程成绩小于60分的学生信息',
          description:import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1',
          title: '单表查询练习',
          description: '从"员工信息表"或"学生表"中，练习使用 WHERE 进行各种条件筛选。',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'task-1-2',
          title: '查询1990年出生的学生信息',
          description: '使用WHERE子句筛选1990年出生的学生。',
          difficulty: 'easy',
          points: 15
        },
        {
          id: 'task-1-3',
          title: '查询所有课程成绩小于60分的学生信息',
          description: '使用WHERE子句筛选成绩小于60import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1',
          title: '单表查询练习',
          description: '从"员工信息表"或"学生表"中，练习使用 WHERE 进行各种条件筛选。',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'task-1-2',
          title: '查询1990年出生的学生信息',
          description: '使用WHERE子句筛选1990年出生的学生。',
          difficulty: 'easy',
          points: 15
        },
        {
          id: 'task-1-3',
          title: '查询所有课程成绩小于60分的学生信息',
          description: '使用WHERE子句筛选成绩小于60分的学生。',
          difficulty: 'medium',
          points: 2import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1',
          title: '单表查询练习',
          description: '从"员工信息表"或"学生表"中，练习使用 WHERE 进行各种条件筛选。',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'task-1-2',
          title: '查询1990年出生的学生信息',
          description: '使用WHERE子句筛选1990年出生的学生。',
          difficulty: 'easy',
          points: 15
        },
        {
          id: 'task-1-3',
          title: '查询所有课程成绩小于60分的学生信息',
          description: '使用WHERE子句筛选成绩小于60分的学生。',
          difficulty: 'medium',
          points: 20
        },
        {
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1',
          title: '单表查询练习',
          description: '从"员工信息表"或"学生表"中，练习使用 WHERE 进行各种条件筛选。',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'task-1-2',
          title: '查询1990年出生的学生信息',
          description: '使用WHERE子句筛选1990年出生的学生。',
          difficulty: 'easy',
          points: 15
        },
        {
          id: 'task-1-3',
          title: '查询所有课程成绩小于60分的学生信息',
          description: '使用WHERE子句筛选成绩小于60分的学生。',
          difficulty: 'medium',
          points: 20
        },
        {
          id: 'task-1-4',
          title: '查询所有姓"李import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1',
          title: '单表查询练习',
          description: '从"员工信息表"或"学生表"中，练习使用 WHERE 进行各种条件筛选。',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'task-1-2',
          title: '查询1990年出生的学生信息',
          description: '使用WHERE子句筛选1990年出生的学生。',
          difficulty: 'easy',
          points: 15
        },
        {
          id: 'task-1-3',
          title: '查询所有课程成绩小于60分的学生信息',
          description: '使用WHERE子句筛选成绩小于60分的学生。',
          difficulty: 'medium',
          points: 20
        },
        {
          id: 'task-1-4',
          title: '查询所有姓"李"的老师的个数',
          description: '使用COUNT()函数和WHERE子句import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1',
          title: '单表查询练习',
          description: '从"员工信息表"或"学生表"中，练习使用 WHERE 进行各种条件筛选。',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'task-1-2',
          title: '查询1990年出生的学生信息',
          description: '使用WHERE子句筛选1990年出生的学生。',
          difficulty: 'easy',
          points: 15
        },
        {
          id: 'task-1-3',
          title: '查询所有课程成绩小于60分的学生信息',
          description: '使用WHERE子句筛选成绩小于60分的学生。',
          difficulty: 'medium',
          points: 20
        },
        {
          id: 'task-1-4',
          title: '查询所有姓"李"的老师的个数',
          description: '使用COUNT()函数和WHERE子句统计姓李的老师数量。',
          difficulty: 'medium',
          points:import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1',
          title: '单表查询练习',
          description: '从"员工信息表"或"学生表"中，练习使用 WHERE 进行各种条件筛选。',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'task-1-2',
          title: '查询1990年出生的学生信息',
          description: '使用WHERE子句筛选1990年出生的学生。',
          difficulty: 'easy',
          points: 15
        },
        {
          id: 'task-1-3',
          title: '查询所有课程成绩小于60分的学生信息',
          description: '使用WHERE子句筛选成绩小于60分的学生。',
          difficulty: 'medium',
          points: 20
        },
        {
          id: 'task-1-4',
          title: '查询所有姓"李"的老师的个数',
          description: '使用COUNT()函数和WHERE子句统计姓李的老师数量。',
          difficulty: 'medium',
          points: 15
        }
      ]
    },
    {
      idimport { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1',
          title: '单表查询练习',
          description: '从"员工信息表"或"学生表"中，练习使用 WHERE 进行各种条件筛选。',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'task-1-2',
          title: '查询1990年出生的学生信息',
          description: '使用WHERE子句筛选1990年出生的学生。',
          difficulty: 'easy',
          points: 15
        },
        {
          id: 'task-1-3',
          title: '查询所有课程成绩小于60分的学生信息',
          description: '使用WHERE子句筛选成绩小于60分的学生。',
          difficulty: 'medium',
          points: 20
        },
        {
          id: 'task-1-4',
          title: '查询所有姓"李"的老师的个数',
          description: '使用COUNT()函数和WHERE子句统计姓李的老师数量。',
          difficulty: 'medium',
          points: 15
        }
      ]
    },
    {
      id: 2,
      title: '数据import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1',
          title: '单表查询练习',
          description: '从"员工信息表"或"学生表"中，练习使用 WHERE 进行各种条件筛选。',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'task-1-2',
          title: '查询1990年出生的学生信息',
          description: '使用WHERE子句筛选1990年出生的学生。',
          difficulty: 'easy',
          points: 15
        },
        {
          id: 'task-1-3',
          title: '查询所有课程成绩小于60分的学生信息',
          description: '使用WHERE子句筛选成绩小于60分的学生。',
          difficulty: 'medium',
          points: 20
        },
        {
          id: 'task-1-4',
          title: '查询所有姓"李"的老师的个数',
          description: '使用COUNT()函数和WHERE子句统计姓李的老师数量。',
          difficulty: 'medium',
          points: 15
        }
      ]
    },
    {
      id: 2,
      title: '数据操作与深入查询',
      duration:import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1',
          title: '单表查询练习',
          description: '从"员工信息表"或"学生表"中，练习使用 WHERE 进行各种条件筛选。',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'task-1-2',
          title: '查询1990年出生的学生信息',
          description: '使用WHERE子句筛选1990年出生的学生。',
          difficulty: 'easy',
          points: 15
        },
        {
          id: 'task-1-3',
          title: '查询所有课程成绩小于60分的学生信息',
          description: '使用WHERE子句筛选成绩小于60分的学生。',
          difficulty: 'medium',
          points: 20
        },
        {
          id: 'task-1-4',
          title: '查询所有姓"李"的老师的个数',
          description: '使用COUNT()函数和WHERE子句统计姓李的老师数量。',
          difficulty: 'medium',
          points: 15
        }
      ]
    },
    {
      id: 2,
      title: '数据操作与深入查询',
      duration: '第2-3周',
      target: '能够对数据进行增删改import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1',
          title: '单表查询练习',
          description: '从"员工信息表"或"学生表"中，练习使用 WHERE 进行各种条件筛选。',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'task-1-2',
          title: '查询1990年出生的学生信息',
          description: '使用WHERE子句筛选1990年出生的学生。',
          difficulty: 'easy',
          points: 15
        },
        {
          id: 'task-1-3',
          title: '查询所有课程成绩小于60分的学生信息',
          description: '使用WHERE子句筛选成绩小于60分的学生。',
          difficulty: 'medium',
          points: 20
        },
        {
          id: 'task-1-4',
          title: '查询所有姓"李"的老师的个数',
          description: '使用COUNT()函数和WHERE子句统计姓李的老师数量。',
          difficulty: 'medium',
          points: 15
        }
      ]
    },
    {
      id: 2,
      title: '数据操作与深入查询',
      duration: '第2-3周',
      target: '能够对数据进行增删改，并执行更复杂的查询。',
      content: [
        '数据操作import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1',
          title: '单表查询练习',
          description: '从"员工信息表"或"学生表"中，练习使用 WHERE 进行各种条件筛选。',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'task-1-2',
          title: '查询1990年出生的学生信息',
          description: '使用WHERE子句筛选1990年出生的学生。',
          difficulty: 'easy',
          points: 15
        },
        {
          id: 'task-1-3',
          title: '查询所有课程成绩小于60分的学生信息',
          description: '使用WHERE子句筛选成绩小于60分的学生。',
          difficulty: 'medium',
          points: 20
        },
        {
          id: 'task-1-4',
          title: '查询所有姓"李"的老师的个数',
          description: '使用COUNT()函数和WHERE子句统计姓李的老师数量。',
          difficulty: 'medium',
          points: 15
        }
      ]
    },
    {
      id: 2,
      title: '数据操作与深入查询',
      duration: '第2-3周',
      target: '能够对数据进行增删改，并执行更复杂的查询。',
      content: [
        '数据操作语言（DML）：INSERT INTO、UPDATE、DELETE。',
        '数据定义import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1',
          title: '单表查询练习',
          description: '从"员工信息表"或"学生表"中，练习使用 WHERE 进行各种条件筛选。',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'task-1-2',
          title: '查询1990年出生的学生信息',
          description: '使用WHERE子句筛选1990年出生的学生。',
          difficulty: 'easy',
          points: 15
        },
        {
          id: 'task-1-3',
          title: '查询所有课程成绩小于60分的学生信息',
          description: '使用WHERE子句筛选成绩小于60分的学生。',
          difficulty: 'medium',
          points: 20
        },
        {
          id: 'task-1-4',
          title: '查询所有姓"李"的老师的个数',
          description: '使用COUNT()函数和WHERE子句统计姓李的老师数量。',
          difficulty: 'medium',
          points: 15
        }
      ]
    },
    {
      id: 2,
      title: '数据操作与深入查询',
      duration: '第2-3周',
      target: '能够对数据进行增删改，并执行更复杂的查询。',
      content: [
        '数据操作语言（DML）：INSERT INTO、UPDATE、DELETE。',
        '数据定义语言（DDL）基础：CREATE DATABASE/TABLE、ALTER TABLE、DROP TABLE。',import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1',
          title: '单表查询练习',
          description: '从"员工信息表"或"学生表"中，练习使用 WHERE 进行各种条件筛选。',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'task-1-2',
          title: '查询1990年出生的学生信息',
          description: '使用WHERE子句筛选1990年出生的学生。',
          difficulty: 'easy',
          points: 15
        },
        {
          id: 'task-1-3',
          title: '查询所有课程成绩小于60分的学生信息',
          description: '使用WHERE子句筛选成绩小于60分的学生。',
          difficulty: 'medium',
          points: 20
        },
        {
          id: 'task-1-4',
          title: '查询所有姓"李"的老师的个数',
          description: '使用COUNT()函数和WHERE子句统计姓李的老师数量。',
          difficulty: 'medium',
          points: 15
        }
      ]
    },
    {
      id: 2,
      title: '数据操作与深入查询',
      duration: '第2-3周',
      target: '能够对数据进行增删改，并执行更复杂的查询。',
      content: [
        '数据操作语言（DML）：INSERT INTO、UPDATE、DELETE。',
        '数据定义语言（DDL）基础：CREATE DATABASE/TABLE、ALTER TABLE、DROP TABLE。',
        '高级查询技巧：聚合函数、GROUP BY 子句、HAVINGimport { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1',
          title: '单表查询练习',
          description: '从"员工信息表"或"学生表"中，练习使用 WHERE 进行各种条件筛选。',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'task-1-2',
          title: '查询1990年出生的学生信息',
          description: '使用WHERE子句筛选1990年出生的学生。',
          difficulty: 'easy',
          points: 15
        },
        {
          id: 'task-1-3',
          title: '查询所有课程成绩小于60分的学生信息',
          description: '使用WHERE子句筛选成绩小于60分的学生。',
          difficulty: 'medium',
          points: 20
        },
        {
          id: 'task-1-4',
          title: '查询所有姓"李"的老师的个数',
          description: '使用COUNT()函数和WHERE子句统计姓李的老师数量。',
          difficulty: 'medium',
          points: 15
        }
      ]
    },
    {
      id: 2,
      title: '数据操作与深入查询',
      duration: '第2-3周',
      target: '能够对数据进行增删改，并执行更复杂的查询。',
      content: [
        '数据操作语言（DML）：INSERT INTO、UPDATE、DELETE。',
        '数据定义语言（DDL）基础：CREATE DATABASE/TABLE、ALTER TABLE、DROP TABLE。',
        '高级查询技巧：聚合函数、GROUP BY 子句、HAVING 子句、去重：DISTINCT 关键字。'
      ],
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1',
          title: '单表查询练习',
          description: '从"员工信息表"或"学生表"中，练习使用 WHERE 进行各种条件筛选。',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'task-1-2',
          title: '查询1990年出生的学生信息',
          description: '使用WHERE子句筛选1990年出生的学生。',
          difficulty: 'easy',
          points: 15
        },
        {
          id: 'task-1-3',
          title: '查询所有课程成绩小于60分的学生信息',
          description: '使用WHERE子句筛选成绩小于60分的学生。',
          difficulty: 'medium',
          points: 20
        },
        {
          id: 'task-1-4',
          title: '查询所有姓"李"的老师的个数',
          description: '使用COUNT()函数和WHERE子句统计姓李的老师数量。',
          difficulty: 'medium',
          points: 15
        }
      ]
    },
    {
      id: 2,
      title: '数据操作与深入查询',
      duration: '第2-3周',
      target: '能够对数据进行增删改，并执行更复杂的查询。',
      content: [
        '数据操作语言（DML）：INSERT INTO、UPDATE、DELETE。',
        '数据定义语言（DDL）基础：CREATE DATABASE/TABLE、ALTER TABLE、DROP TABLE。',
        '高级查询技巧：聚合函数、GROUP BY 子句、HAVING 子句、去重：DISTINCT 关键字。'
      ],
      tasks: [
        {
          id: 'task-2-1',
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1',
          title: '单表查询练习',
          description: '从"员工信息表"或"学生表"中，练习使用 WHERE 进行各种条件筛选。',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'task-1-2',
          title: '查询1990年出生的学生信息',
          description: '使用WHERE子句筛选1990年出生的学生。',
          difficulty: 'easy',
          points: 15
        },
        {
          id: 'task-1-3',
          title: '查询所有课程成绩小于60分的学生信息',
          description: '使用WHERE子句筛选成绩小于60分的学生。',
          difficulty: 'medium',
          points: 20
        },
        {
          id: 'task-1-4',
          title: '查询所有姓"李"的老师的个数',
          description: '使用COUNT()函数和WHERE子句统计姓李的老师数量。',
          difficulty: 'medium',
          points: 15
        }
      ]
    },
    {
      id: 2,
      title: '数据操作与深入查询',
      duration: '第2-3周',
      target: '能够对数据进行增删改，并执行更复杂的查询。',
      content: [
        '数据操作语言（DML）：INSERT INTO、UPDATE、DELETE。',
        '数据定义语言（DDL）基础：CREATE DATABASE/TABLE、ALTER TABLE、DROP TABLE。',
        '高级查询技巧：聚合函数、GROUP BY 子句、HAVING 子句、去重：DISTINCT 关键字。'
      ],
      tasks: [
        {
          id: 'task-2-1',
          title: 'DML/DDL练习',
          description: '创建一个"import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1',
          title: '单表查询练习',
          description: '从"员工信息表"或"学生表"中，练习使用 WHERE 进行各种条件筛选。',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'task-1-2',
          title: '查询1990年出生的学生信息',
          description: '使用WHERE子句筛选1990年出生的学生。',
          difficulty: 'easy',
          points: 15
        },
        {
          id: 'task-1-3',
          title: '查询所有课程成绩小于60分的学生信息',
          description: '使用WHERE子句筛选成绩小于60分的学生。',
          difficulty: 'medium',
          points: 20
        },
        {
          id: 'task-1-4',
          title: '查询所有姓"李"的老师的个数',
          description: '使用COUNT()函数和WHERE子句统计姓李的老师数量。',
          difficulty: 'medium',
          points: 15
        }
      ]
    },
    {
      id: 2,
      title: '数据操作与深入查询',
      duration: '第2-3周',
      target: '能够对数据进行增删改，并执行更复杂的查询。',
      content: [
        '数据操作语言（DML）：INSERT INTO、UPDATE、DELETE。',
        '数据定义语言（DDL）基础：CREATE DATABASE/TABLE、ALTER TABLE、DROP TABLE。',
        '高级查询技巧：聚合函数、GROUP BY 子句、HAVING 子句、去重：DISTINCT 关键字。'
      ],
      tasks: [
        {
          id: 'task-2-1',
          title: 'DML/DDL练习',
          description: '创建一个"地址簿"表，并进行插入、更新、添加列等操作。',
          difficultyimport { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1',
          title: '单表查询练习',
          description: '从"员工信息表"或"学生表"中，练习使用 WHERE 进行各种条件筛选。',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'task-1-2',
          title: '查询1990年出生的学生信息',
          description: '使用WHERE子句筛选1990年出生的学生。',
          difficulty: 'easy',
          points: 15
        },
        {
          id: 'task-1-3',
          title: '查询所有课程成绩小于60分的学生信息',
          description: '使用WHERE子句筛选成绩小于60分的学生。',
          difficulty: 'medium',
          points: 20
        },
        {
          id: 'task-1-4',
          title: '查询所有姓"李"的老师的个数',
          description: '使用COUNT()函数和WHERE子句统计姓李的老师数量。',
          difficulty: 'medium',
          points: 15
        }
      ]
    },
    {
      id: 2,
      title: '数据操作与深入查询',
      duration: '第2-3周',
      target: '能够对数据进行增删改，并执行更复杂的查询。',
      content: [
        '数据操作语言（DML）：INSERT INTO、UPDATE、DELETE。',
        '数据定义语言（DDL）基础：CREATE DATABASE/TABLE、ALTER TABLE、DROP TABLE。',
        '高级查询技巧：聚合函数、GROUP BY 子句、HAVING 子句、去重：DISTINCT 关键字。'
      ],
      tasks: [
        {
          id: 'task-2-1',
          title: 'DML/DDL练习',
          description: '创建一个"地址簿"表，并进行插入、更新、添加列等操作。',
          difficulty: 'medium',
          points: 25
        },
        {
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1',
          title: '单表查询练习',
          description: '从"员工信息表"或"学生表"中，练习使用 WHERE 进行各种条件筛选。',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'task-1-2',
          title: '查询1990年出生的学生信息',
          description: '使用WHERE子句筛选1990年出生的学生。',
          difficulty: 'easy',
          points: 15
        },
        {
          id: 'task-1-3',
          title: '查询所有课程成绩小于60分的学生信息',
          description: '使用WHERE子句筛选成绩小于60分的学生。',
          difficulty: 'medium',
          points: 20
        },
        {
          id: 'task-1-4',
          title: '查询所有姓"李"的老师的个数',
          description: '使用COUNT()函数和WHERE子句统计姓李的老师数量。',
          difficulty: 'medium',
          points: 15
        }
      ]
    },
    {
      id: 2,
      title: '数据操作与深入查询',
      duration: '第2-3周',
      target: '能够对数据进行增删改，并执行更复杂的查询。',
      content: [
        '数据操作语言（DML）：INSERT INTO、UPDATE、DELETE。',
        '数据定义语言（DDL）基础：CREATE DATABASE/TABLE、ALTER TABLE、DROP TABLE。',
        '高级查询技巧：聚合函数、GROUP BY 子句、HAVING 子句、去重：DISTINCT 关键字。'
      ],
      tasks: [
        {
          id: 'task-2-1',
          title: 'DML/DDL练习',
          description: '创建一个"地址簿"表，并进行插入、更新、添加列等操作。',
          difficulty: 'medium',
          points: 25
        },
        {
          id: 'task-2-2',import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1',
          title: '单表查询练习',
          description: '从"员工信息表"或"学生表"中，练习使用 WHERE 进行各种条件筛选。',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'task-1-2',
          title: '查询1990年出生的学生信息',
          description: '使用WHERE子句筛选1990年出生的学生。',
          difficulty: 'easy',
          points: 15
        },
        {
          id: 'task-1-3',
          title: '查询所有课程成绩小于60分的学生信息',
          description: '使用WHERE子句筛选成绩小于60分的学生。',
          difficulty: 'medium',
          points: 20
        },
        {
          id: 'task-1-4',
          title: '查询所有姓"李"的老师的个数',
          description: '使用COUNT()函数和WHERE子句统计姓李的老师数量。',
          difficulty: 'medium',
          points: 15
        }
      ]
    },
    {
      id: 2,
      title: '数据操作与深入查询',
      duration: '第2-3周',
      target: '能够对数据进行增删改，并执行更复杂的查询。',
      content: [
        '数据操作语言（DML）：INSERT INTO、UPDATE、DELETE。',
        '数据定义语言（DDL）基础：CREATE DATABASE/TABLE、ALTER TABLE、DROP TABLE。',
        '高级查询技巧：聚合函数、GROUP BY 子句、HAVING 子句、去重：DISTINCT 关键字。'
      ],
      tasks: [
        {
          id: 'task-2-1',
          title: 'DML/DDL练习',
          description: '创建一个"地址簿"表，并进行插入、更新、添加列等操作。',
          difficulty: 'medium',
          points: 25
        },
        {
          id: 'task-2-2',
          title: '查询平均成绩大于等于60分的同学信息',
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SQLStudy = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());

  // 学习阶段数据
  const phases = [
    {
      id: 1,
      title: '基础概念与环境搭建',
      duration: '第1周',
      target: '理解数据库是什么，搭建学习环境，掌握最核心的SQL语句。',
      content: [
        '核心概念：理解数据库、表、行（记录）、列（字段）、主键、外键、SQL语言的作用。',
        'SQL分类：了解DDL（数据定义语言）、DML（数据操作语言）、DQL（数据查询语言）、DCL（数据控制语言）的区别。',
        '环境搭建：安装MySQL或SQLite（轻量级，适合入门），安装一个图形化客户端工具，如DBeaver、Navicat或MySQL Workbench。',
        '数据查询语言（DQL）核心：SELECT 语句、FROM 子句、WHERE 子句、ORDER BY 子句、LIMIT 子句。'
      ],
      tasks: [
        {
          id: 'task-1-1',
          title: '单表查询练习',
          description: '从"员工信息表"或"学生表"中，练习使用 WHERE 进行各种条件筛选。',
          difficulty: 'easy',
          points: 10
        },
        {
          id: 'task-1-2',
          title: '查询1990年出生的学生信息',
          description: '使用WHERE子句筛选1990年出生的学生。',
          difficulty: 'easy',
          points: 15
        },
        {
          id: 'task-1-3',
          title: '查询所有课程成绩小于60分的学生信息',
          description: '使用WHERE子句筛选成绩小于60分的学生。',
          difficulty: 'medium',
          points: 20
        },
        {
          id: 'task-1-4',
          title: '查询所有姓"李"的老师的个数',
          description: '使用COUNT()函数和WHERE子句统计姓李的老师数量。',
          difficulty: 'medium',
          points: 15
        }
      ]
    },
    {
      id: 2,
      title: '数据操作与深入查询',
      duration: '第2-3周',
      target: '能够对数据进行增删改，并执行更复杂的查询。',
      content: [
        '数据操作语言（DML）：INSERT INTO、UPDATE、DELETE。',
        '数据定义语言（DDL）基础：CREATE DATABASE/TABLE、ALTER TABLE、DROP TABLE。',
        '高级查询技巧：聚合函数、GROUP BY 子句、HAVING 子句、去重：DISTINCT 关键字。'
      ],
      tasks: [
        {
          id: 'task-2-1',
          title: 'DML/DDL练习',
          description: '创建一个"地址簿"表，并进行插入、更新、添加列等操作。',
          difficulty: 'medium',
          points: 25
        },
        {
          id: 'task-2-2',
          title: '查询平均成绩大于等于60分的同学信息',
          description: '使用AVG()函数和