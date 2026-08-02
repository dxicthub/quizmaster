// AdminAnalytics.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaChartLine, FaChartPie, FaChartBar, FaCalendar,
  FaDownload, FaArrowUp, FaArrowDown, FaFilter,
  FaTimes, FaSearch, FaSpinner, FaTrophy, FaUsers,
  FaClock, FaCheckCircle, FaTimesCircle, FaStar,
  FaMedal, FaUserGraduate, FaBookOpen, FaBrain,
  FaFire, FaAward, FaInfoCircle, FaUserPlus,
  FaUserCheck, FaUserClock, FaUserSlash,
  FaChartArea, FaThList, FaThLarge
} from 'react-icons/fa';
import { useAdmin } from '../../context/AdminContext.jsx';
import { quizCategories } from '../../data/quizCategories.js';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie,
  Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, ComposedChart, RadialBarChart, RadialBar
} from 'recharts';
import { format, subDays, subWeeks, subMonths } from 'date-fns';

function AdminAnalytics() {
  const { loadQuizAttempts, students } = useAdmin();
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedQuiz, setSelectedQuiz] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [timeFilter, setTimeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [drillDownData, setDrillDownData] = useState(null);
  const [showDrillDown, setShowDrillDown] = useState(false);
  const [chartType, setChartType] = useState('bar');

  const [stats, setStats] = useState({
    totalAttempts: 0,
    averageScore: 0,
    highestScore: 0,
    lowestScore: 0,
    passRate: 0,
    totalStudents: 0,
    totalQuizzes: 0,
    activeStudents: 0,
    completionRate: 0,
    averageTime: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const loadedAttempts = loadQuizAttempts();
        setAttempts(loadedAttempts || []);
      } catch (error) {
        console.error('Error loading attempts:', error);
        setAttempts([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [loadQuizAttempts]);

  // Enhanced filtering with date-fns
  const filteredAttempts = useMemo(() => {
    let filtered = [...attempts];
    
    if (selectedQuiz !== 'all') {
      filtered = filtered.filter(a => a.quizId === selectedQuiz);
    }
    
    if (selectedStudent !== 'all') {
      filtered = filtered.filter(a => a.studentId === selectedStudent);
    }
    
    if (statusFilter === 'passed') {
      filtered = filtered.filter(a => (a.score || 0) >= 70);
    } else if (statusFilter === 'failed') {
      filtered = filtered.filter(a => (a.score || 0) < 70);
    }
    
    if (dateRange.start) {
      filtered = filtered.filter(a => new Date(a.date) >= new Date(dateRange.start));
    }
    if (dateRange.end) {
      filtered = filtered.filter(a => new Date(a.date) <= new Date(dateRange.end));
    }
    
    const now = new Date();
    if (timeFilter === 'today') {
      filtered = filtered.filter(a => format(new Date(a.date), 'yyyy-MM-dd') === format(now, 'yyyy-MM-dd'));
    } else if (timeFilter === 'week') {
      const weekAgo = subWeeks(now, 1);
      filtered = filtered.filter(a => new Date(a.date) >= weekAgo);
    } else if (timeFilter === 'month') {
      const monthAgo = subMonths(now, 1);
      filtered = filtered.filter(a => new Date(a.date) >= monthAgo);
    } else if (timeFilter === 'quarter') {
      const quarterAgo = subMonths(now, 3);
      filtered = filtered.filter(a => new Date(a.date) >= quarterAgo);
    } else if (timeFilter === 'year') {
      const yearAgo = subMonths(now, 12);
      filtered = filtered.filter(a => new Date(a.date) >= yearAgo);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(a => 
        a.studentName?.toLowerCase().includes(term) ||
        a.studentEmail?.toLowerCase().includes(term) ||
        a.quizName?.toLowerCase().includes(term)
      );
    }
    
    return filtered;
  }, [attempts, selectedQuiz, selectedStudent, statusFilter, dateRange, timeFilter, searchTerm]);

  // Enhanced stats calculation
  const computedStats = useMemo(() => {
    const total = filteredAttempts.length;
    const avg = total > 0 
      ? Math.round(filteredAttempts.reduce((acc, a) => acc + (a.score || 0), 0) / total)
      : 0;
    const highest = total > 0 
      ? Math.max(...filteredAttempts.map(a => a.score || 0))
      : 0;
    const lowest = total > 0 
      ? Math.min(...filteredAttempts.map(a => a.score || 0))
      : 0;
    const passed = filteredAttempts.filter(a => (a.score || 0) >= 70).length;
    
    const thirtyDaysAgo = subDays(new Date(), 30);
    const activeStudents = new Set(
      filteredAttempts
        .filter(a => new Date(a.date) >= thirtyDaysAgo)
        .map(a => a.studentId)
    ).size;
    
    const totalQuestions = filteredAttempts.reduce((acc, a) => acc + (a.answeredQuestions || 0), 0);
    const totalPossible = filteredAttempts.length * 10;
    const completionRate = totalPossible > 0 ? Math.round((totalQuestions / totalPossible) * 100) : 0;
    
    const avgTime = total > 0 
      ? Math.round(filteredAttempts.reduce((acc, a) => acc + (a.timeSpent || 0), 0) / total / 60)
      : 0;

    return {
      totalAttempts: total,
      averageScore: avg,
      highestScore: highest,
      lowestScore: lowest,
      passRate: total > 0 ? Math.round((passed / total) * 100) : 0,
      totalStudents: students?.length || 0,
      totalQuizzes: quizCategories?.length || 0,
      activeStudents: activeStudents,
      completionRate: completionRate,
      averageTime: avgTime,
    };
  }, [filteredAttempts, students]);

  useEffect(() => {
    setStats(computedStats);
  }, [computedStats]);

  // Chart data
  const quizPerformanceData = useMemo(() => {
    return quizCategories.map(q => {
      const quizAttempts = attempts.filter(a => a.quizId === q.id);
      const avgScore = quizAttempts.length > 0
        ? Math.round(quizAttempts.reduce((acc, a) => acc + (a.score || 0), 0) / quizAttempts.length)
        : 0;
      const passRate = quizAttempts.length > 0
        ? Math.round((quizAttempts.filter(a => (a.score || 0) >= 70).length / quizAttempts.length) * 100)
        : 0;
      const completionRate = quizAttempts.length > 0
        ? Math.round(quizAttempts.reduce((acc, a) => acc + (a.answeredQuestions || 0), 0) / (quizAttempts.length * 10) * 100)
        : 0;
      return {
        id: q.id,
        name: q.title,
        score: avgScore,
        attempts: quizAttempts.length,
        passRate: passRate,
        completionRate: completionRate,
        difficulty: q.difficulty || 'medium',
        category: q.category || 'General'
      };
    }).filter(q => q.attempts > 0);
  }, [attempts]);

  const weeklyData = useMemo(() => {
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return weekDays.map(day => {
      const dayAttempts = filteredAttempts.filter(a => {
        const date = new Date(a.date);
        return date.toLocaleDateString('en-US', { weekday: 'short' }) === day;
      });
      const passed = dayAttempts.filter(a => (a.score || 0) >= 70).length;
      const avgScore = dayAttempts.length > 0
        ? Math.round(dayAttempts.reduce((acc, a) => acc + (a.score || 0), 0) / dayAttempts.length)
        : 0;
      const avgTime = dayAttempts.length > 0
        ? Math.round(dayAttempts.reduce((acc, a) => acc + (a.timeSpent || 0), 0) / dayAttempts.length / 60)
        : 0;
      return {
        day,
        attempts: dayAttempts.length,
        passed,
        failed: dayAttempts.length - passed,
        avgScore,
        avgTime,
      };
    });
  }, [filteredAttempts]);

  const scoreDistribution = useMemo(() => {
    const ranges = [
      { label: '0-20', min: 0, max: 20, color: '#ef4444' },
      { label: '20-40', min: 20, max: 40, color: '#f97316' },
      { label: '40-60', min: 40, max: 60, color: '#f59e0b' },
      { label: '60-80', min: 60, max: 80, color: '#3b82f6' },
      { label: '80-100', min: 80, max: 100, color: '#10b981' },
    ];

    return ranges.map(range => {
      const count = filteredAttempts.filter(a => 
        (a.score || 0) >= range.min && (a.score || 0) < range.max
      ).length;
      return {
        ...range,
        count,
        percentage: filteredAttempts.length > 0 
          ? Math.round((count / filteredAttempts.length) * 100)
          : 0
      };
    });
  }, [filteredAttempts]);

  const difficultyAnalysis = useMemo(() => {
    return quizPerformanceData.map(q => {
      let difficulty = 'medium';
      if (q.passRate < 40) difficulty = 'hard';
      else if (q.passRate > 70) difficulty = 'easy';
      
      return {
        ...q,
        difficulty: difficulty,
        difficultyScore: q.passRate < 40 ? 80 : q.passRate > 70 ? 20 : 50
      };
    });
  }, [quizPerformanceData]);

  // Student leaderboard
  const leaderboardData = useMemo(() => {
    const studentMap = new Map();
    filteredAttempts.forEach(a => {
      if (!studentMap.has(a.studentId)) {
        studentMap.set(a.studentId, {
          studentId: a.studentId,
          name: a.studentName || 'Unknown',
          attempts: 0,
          totalScore: 0,
          passed: 0,
          averageScore: 0,
          passRate: 0,
        });
      }
      const student = studentMap.get(a.studentId);
      student.attempts += 1;
      student.totalScore += (a.score || 0);
      if ((a.score || 0) >= 70) student.passed += 1;
    });

    const studentsData = Array.from(studentMap.values()).map(s => ({
      ...s,
      averageScore: s.attempts > 0 ? Math.round(s.totalScore / s.attempts) : 0,
      passRate: s.attempts > 0 ? Math.round((s.passed / s.attempts) * 100) : 0,
    }));

    return studentsData.sort((a, b) => b.averageScore - a.averageScore);
  }, [filteredAttempts]);

  const handleExport = useCallback(() => {
    const data = {
      stats,
      attempts: filteredAttempts,
      quizPerformance: quizPerformanceData,
      weeklyData,
      scoreDistribution,
      leaderboardData,
      difficultyAnalysis,
      exportDate: new Date().toISOString(),
      filters: { selectedQuiz, dateRange, timeFilter, selectedStudent, statusFilter }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [stats, filteredAttempts, quizPerformanceData, weeklyData, scoreDistribution, leaderboardData, difficultyAnalysis, selectedQuiz, dateRange, timeFilter, selectedStudent, statusFilter]);

  const clearFilters = useCallback(() => {
    setSelectedQuiz('all');
    setDateRange({ start: '', end: '' });
    setSearchTerm('');
    setSelectedStudent('all');
    setStatusFilter('all');
    setTimeFilter('all');
  }, []);

  const handleDrillDown = useCallback((data) => {
    setDrillDownData(data);
    setShowDrillDown(true);
  }, []);

  const COLORS = ['#8b5cf6', '#6366f1', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <FaSpinner className="text-6xl text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300 font-medium">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  // Stat cards configuration
  const statCards = [
    { 
      label: 'Total Attempts', 
      value: stats.totalAttempts, 
      icon: FaChartBar, 
      color: 'blue',
      description: 'Total quiz attempts across all quizzes',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    { 
      label: 'Avg Score', 
      value: `${stats.averageScore}%`, 
      icon: FaChartLine, 
      color: 'green',
      description: 'Average score across all attempts',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400'
    },
    { 
      label: 'Pass Rate', 
      value: `${stats.passRate}%`, 
      icon: FaChartPie, 
      color: 'purple',
      description: 'Percentage of attempts that passed',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400'
    },
    { 
      label: 'Active Students', 
      value: stats.activeStudents, 
      icon: FaUserCheck, 
      color: 'emerald',
      description: 'Students active in last 30 days',
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/20',
      textColor: 'text-emerald-600 dark:text-emerald-400'
    },
    { 
      label: 'Completion Rate', 
      value: `${stats.completionRate}%`, 
      icon: FaCheckCircle, 
      color: 'indigo',
      description: 'Average quiz completion rate',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/20',
      textColor: 'text-indigo-600 dark:text-indigo-400'
    },
    { 
      label: 'Avg Time', 
      value: `${stats.averageTime}m`, 
      icon: FaClock, 
      color: 'orange',
      description: 'Average time spent per quiz',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
      textColor: 'text-orange-600 dark:text-orange-400'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
          >
            Analytics Dashboard
          </motion.h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {filteredAttempts.length} attempts analyzed • Last updated: {new Date().toLocaleString()}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <FaThLarge />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <FaThList />
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg text-gray-700 dark:text-gray-200 rounded-xl font-medium flex items-center gap-2 transition-all duration-200 border border-gray-200 dark:border-gray-700"
          >
            <FaFilter />
            Filters
            {(selectedQuiz !== 'all' || dateRange.start || dateRange.end || searchTerm || selectedStudent !== 'all' || statusFilter !== 'all' || timeFilter !== 'all') && (
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            )}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExport}
            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-purple-500/30"
          >
            <FaDownload />
            Export Report
          </motion.button>
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="glassmorphism card-shadow rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or quiz..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                  />
                </div>

                <select
                  value={selectedQuiz}
                  onChange={(e) => setSelectedQuiz(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                >
                  <option value="all">All Quizzes</option>
                  {quizCategories.map(quiz => (
                    <option key={quiz.id} value={quiz.id}>{quiz.title}</option>
                  ))}
                </select>

                <select
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                >
                  <option value="all">All Students</option>
                  {students?.map(student => (
                    <option key={student.id} value={student.id}>{student.name}</option>
                  ))}
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                >
                  <option value="all">All Status</option>
                  <option value="passed">Passed</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                  />
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                  />
                </div>

                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                >
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">Last 3 Months</option>
                  <option value="year">This Year</option>
                </select>

                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <FaTimes />
                  Clear Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="glassmorphism card-shadow rounded-2xl p-4 text-center border-t-4 border-purple-500 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 relative cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`${stat.bgColor} ${stat.textColor} p-2 rounded-lg`}>
                  <Icon className="text-xl" />
                </div>
                <AnimatePresence>
                  {hoveredCard === index && stat.description && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute -top-2 -right-2"
                    >
                      <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded-lg shadow-lg">
                        {stat.description}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 font-mono">
                {stat.value}
              </div>
              
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {stat.label}
              </div>

              {typeof stat.value === 'string' && stat.value.includes('%') && (
                <div className="w-full h-1 mt-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: stat.value }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${stat.textColor} rounded-full`}
                  />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Quiz Performance Chart */}
        <div className="glassmorphism card-shadow rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <FaChartBar className="text-purple-500" />
              Quiz Performance
            </h3>
            <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {['bar', 'line', 'area'].map(type => (
                <button
                  key={type}
                  onClick={() => setChartType(type)}
                  className={`px-2 py-1 text-xs rounded-md transition-colors ${
                    chartType === type ? 'bg-white dark:bg-gray-600 shadow' : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'bar' ? (
                <BarChart data={quizPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Bar dataKey="score" fill="#8b5cf6" radius={[4, 4, 0, 0]}>
                    {quizPerformanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              ) : chartType === 'line' ? (
                <LineChart data={quizPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6' }} />
                </LineChart>
              ) : (
                <AreaChart data={quizPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Activity Chart */}
        <div className="glassmorphism card-shadow rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-xl">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <FaCalendar className="text-purple-500" />
            Weekly Activity
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '8px' }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="attempts" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="left" dataKey="passed" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="avgScore" stroke="#f59e0b" strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Advanced Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Score Distribution */}
        <div className="glassmorphism card-shadow rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-xl">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <FaChartPie className="text-purple-500" />
            Score Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={scoreDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ label, percentage }) => `${label} (${percentage}%)`}
                >
                  {scoreDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="glassmorphism card-shadow rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-xl">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <FaBrain className="text-purple-500" />
            Skills Analysis
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={quizPerformanceData.slice(0, 6)}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar name="Score" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                <Radar name="Completion" dataKey="completionRate" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '8px' }}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Difficulty Analysis and Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Difficulty Analysis */}
        <div className="glassmorphism card-shadow rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-xl">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <FaFire className="text-purple-500" />
            Quiz Difficulty Analysis
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart 
                data={difficultyAnalysis.slice(0, 5)} 
                innerRadius="20%" 
                outerRadius="100%"
                startAngle={180}
                endAngle={0}
              >
                <RadialBar
                  minAngle={15}
                  label={{ position: 'insideStart', fill: '#fff', fontSize: 10 }}
                  background
                  clockWise
                  dataKey="difficultyScore"
                />
                <Legend 
                  iconSize={10} 
                  layout="vertical" 
                  verticalAlign="middle" 
                  align="right"
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '8px' }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Student Leaderboard */}
        <div className="glassmorphism card-shadow rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-xl">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
            <FaTrophy className="text-yellow-500" />
            Student Leaderboard
          </h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {leaderboardData.slice(0, 10).map((student, index) => (
              <motion.div
                key={student.studentId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleDrillDown(student)}
              >
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-800 dark:text-gray-200 truncate">
                    {student.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {student.attempts} attempts • {student.passRate}% pass rate
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    {student.averageScore}%
                  </div>
                  <div className="text-xs text-gray-400">
                    Avg Score
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Timeline */}
      <div className="glassmorphism card-shadow rounded-2xl p-6 bg-white dark:bg-gray-800 shadow-xl mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2">
          <FaClock className="text-purple-500" />
          Recent Activity
        </h3>
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {filteredAttempts.slice(0, 10).map((attempt, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-md transition-shadow"
            >
              <div className={`w-2 h-2 rounded-full ${(attempt.score || 0) >= 70 ? 'bg-green-500' : 'bg-red-500'}`} />
              <div className="flex-1">
                <div className="font-medium text-gray-800 dark:text-gray-200">
                  {attempt.studentName || 'Unknown Student'} completed "{attempt.quizName || 'Unknown Quiz'}"
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(attempt.date).toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <div className={`font-bold ${(attempt.score || 0) >= 70 ? 'text-green-500' : 'text-red-500'}`}>
                  {attempt.score || 0}%
                </div>
                <div className="text-xs text-gray-400">
                  {attempt.timeSpent ? `${Math.round(attempt.timeSpent / 60)}m` : 'N/A'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredAttempts.length === 0 && (
        <div className="glassmorphism card-shadow rounded-2xl p-12 bg-white dark:bg-gray-800 shadow-xl text-center">
          <FaBookOpen className="text-6xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
            No Data Available
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            No quiz attempts found matching your filters. Try adjusting your filters or wait for students to start taking quizzes.
          </p>
        </div>
      )}

      {/* Drill Down Modal */}
      <AnimatePresence>
        {showDrillDown && drillDownData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDrillDown(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  Detailed Analytics
                </h2>
                <button
                  onClick={() => setShowDrillDown(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <FaTimes className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="glassmorphism p-4 rounded-xl bg-gray-50 dark:bg-gray-700">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Name</div>
                    <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                      {drillDownData.name || drillDownData.studentName || 'N/A'}
                    </p>
                  </div>
                  <div className="glassmorphism p-4 rounded-xl bg-gray-50 dark:bg-gray-700">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Score</div>
                    <p className="text-lg font-bold text-purple-500">
                      {drillDownData.score || drillDownData.averageScore || 0}%
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="glassmorphism p-3 rounded-xl bg-gray-50 dark:bg-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Attempts</div>
                    <p className="text-lg font-bold text-blue-500">
                      {drillDownData.attempts || 0}
                    </p>
                  </div>
                  <div className="glassmorphism p-3 rounded-xl bg-gray-50 dark:bg-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Pass Rate</div>
                    <p className="text-lg font-bold text-green-500">
                      {drillDownData.passRate || 0}%
                    </p>
                  </div>
                  <div className="glassmorphism p-3 rounded-xl bg-gray-50 dark:bg-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400">Status</div>
                    <p className={`text-lg font-bold ${(drillDownData.score || 0) >= 70 ? 'text-green-500' : 'text-red-500'}`}>
                      {(drillDownData.score || 0) >= 70 ? '✅ Passed' : '❌ Failed'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AdminAnalytics;