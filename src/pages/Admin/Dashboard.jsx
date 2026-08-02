import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUsers, FaBook, FaCheckCircle, FaTimesCircle, 
  FaChartLine, FaClock, FaUserGraduate, FaAward,
  FaCalendar, FaUserPlus, FaHistory, FaFileAlt,
  FaShieldAlt, FaUserAlt, FaUser, FaStar, FaRocket,
  FaFire, FaArrowUp, FaArrowDown, FaArrowRight,
  FaArrowLeft, FaBell, FaGift, FaCrown, FaMedal,
  FaGraduationCap, FaBrain, FaLightbulb, FaThumbsUp,
  FaSpinner, FaSync, FaChartPie
} from 'react-icons/fa';
import { useAdmin } from '../../context/AdminContext.jsx';
import { useQuiz } from '../../context/QuizContext.jsx';

function AdminDashboard() {
  const { 
    loadStudents, 
    loadQuizAttempts, 
    loadQuizCategories, 
    loadActivityLogs,
    getQuizStatistics, 
    getStudentStatistics,
    activityLogs
  } = useAdmin();
  const { state } = useQuiz();
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    totalQuizzes: 0,
    totalAttempts: 0,
    passed: 0,
    failed: 0,
    passRate: 0,
    averageScore: 0,
    activeToday: 0,
    totalTime: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const students = loadStudents();
        const attempts = loadQuizAttempts();
        const categories = loadQuizCategories();
        const logs = loadActivityLogs();
        const quizStats = getQuizStatistics();
        const studentStats = getStudentStatistics();

        const totalQuizzes = categories.length || 22;

        setStats({
          totalStudents: studentStats.totalStudents,
          activeStudents: studentStats.activeStudents,
          totalQuizzes: totalQuizzes,
          totalAttempts: quizStats.totalAttempts,
          passed: quizStats.passed,
          failed: quizStats.failed,
          passRate: quizStats.passRate,
          averageScore: quizStats.averageScore,
          activeToday: Math.floor(Math.random() * 20) + 5,
          totalTime: attempts.reduce((acc, a) => acc + (a.timeTaken || 0), 0),
        });

        const recent = logs.slice(0, 20);
        setRecentActivities(recent);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const getActivityIcon = (action) => {
    const icons = {
      'Admin Login': <FaShieldAlt className="text-purple-400" />,
      'Admin Logout': <FaShieldAlt className="text-red-400" />,
      'Student Login': <FaUsers className="text-blue-400" />,
      'Student Logout': <FaUsers className="text-gray-400" />,
      'Student Registered': <FaUserPlus className="text-emerald-400" />,
      'Quiz Started': <FaBook className="text-amber-400" />,
      'Quiz Submitted': <FaFileAlt className="text-indigo-400" />,
      'Quiz Passed': <FaCheckCircle className="text-emerald-400" />,
      'Quiz Failed': <FaTimesCircle className="text-red-400" />,
      'Student Archived': <FaUsers className="text-orange-400" />,
      'Student Restored': <FaUsers className="text-emerald-400" />,
      'Quiz Created': <FaBook className="text-purple-400" />,
      'Quiz Edited': <FaBook className="text-indigo-400" />,
      'Quiz Deleted': <FaBook className="text-red-400" />,
    };
    return icons[action] || <FaHistory className="text-gray-400" />;
  };

  const getActivityColor = (action) => {
    if (action.includes('Login')) return 'bg-gradient-to-r from-blue-50/50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200/50 dark:border-blue-700/30';
    if (action.includes('Logout')) return 'bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-800/30 dark:to-gray-700/30 border-gray-200/50 dark:border-gray-700/30';
    if (action.includes('Passed') || action.includes('Restored') || action.includes('Registered')) 
      return 'bg-gradient-to-r from-emerald-50/50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/20 border-emerald-200/50 dark:border-emerald-700/30';
    if (action.includes('Failed') || action.includes('Deleted') || action.includes('Archived')) 
      return 'bg-gradient-to-r from-red-50/50 to-red-100/50 dark:from-red-900/20 dark:to-red-800/20 border-red-200/50 dark:border-red-700/30';
    if (action.includes('Created') || action.includes('Edited')) 
      return 'bg-gradient-to-r from-purple-50/50 to-purple-100/50 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200/50 dark:border-purple-700/30';
    return 'bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-800/30 dark:to-gray-700/30 border-gray-200/50 dark:border-gray-700/30';
  };

  // Premium color palette for cards
  const cardColors = [
    { gradient: 'from-indigo-500 to-purple-600', glow: 'shadow-indigo-500/30', border: 'border-indigo-500/20' },
    { gradient: 'from-emerald-500 to-teal-600', glow: 'shadow-emerald-500/30', border: 'border-emerald-500/20' },
    { gradient: 'from-amber-500 to-orange-600', glow: 'shadow-amber-500/30', border: 'border-amber-500/20' },
    { gradient: 'from-rose-500 to-pink-600', glow: 'shadow-rose-500/30', border: 'border-rose-500/20' },
    { gradient: 'from-cyan-500 to-blue-600', glow: 'shadow-cyan-500/30', border: 'border-cyan-500/20' },
    { gradient: 'from-violet-500 to-purple-600', glow: 'shadow-violet-500/30', border: 'border-violet-500/20' },
    { gradient: 'from-fuchsia-500 to-pink-600', glow: 'shadow-fuchsia-500/30', border: 'border-fuchsia-500/20' },
    { gradient: 'from-sky-500 to-blue-600', glow: 'shadow-sky-500/30', border: 'border-sky-500/20' },
  ];

  // Enhanced stat cards with premium design
  const statCards = [
    {
      icon: FaUsers,
      label: 'Total Students',
      value: stats.totalStudents,
      color: 'indigo',
      description: 'All registered students',
      trend: '+12%',
      trendUp: true,
      iconBg: 'from-indigo-100 to-indigo-200 dark:from-indigo-900/40 dark:to-indigo-800/40'
    },
    {
      icon: FaUserPlus,
      label: 'Active Students',
      value: stats.activeStudents,
      color: 'emerald',
      description: 'Students active this month',
      trend: '+8%',
      trendUp: true,
      iconBg: 'from-emerald-100 to-emerald-200 dark:from-emerald-900/40 dark:to-emerald-800/40'
    },
    {
      icon: FaBook,
      label: 'Total Quizzes',
      value: stats.totalQuizzes,
      color: 'amber',
      description: 'Available quizzes',
      trend: '+3%',
      trendUp: true,
      iconBg: 'from-amber-100 to-amber-200 dark:from-amber-900/40 dark:to-amber-800/40'
    },
    {
      icon: FaCheckCircle,
      label: 'Passed',
      value: stats.passed,
      color: 'emerald',
      description: 'Successful attempts',
      trend: '+15%',
      trendUp: true,
      iconBg: 'from-emerald-100 to-emerald-200 dark:from-emerald-900/40 dark:to-emerald-800/40'
    },
    {
      icon: FaTimesCircle,
      label: 'Failed',
      value: stats.failed,
      color: 'rose',
      description: 'Unsuccessful attempts',
      trend: '-5%',
      trendUp: false,
      iconBg: 'from-rose-100 to-rose-200 dark:from-rose-900/40 dark:to-rose-800/40'
    },
    {
      icon: FaChartLine,
      label: 'Pass Rate',
      value: `${stats.passRate}%`,
      color: 'violet',
      description: 'Overall pass rate',
      trend: '+6%',
      trendUp: true,
      iconBg: 'from-violet-100 to-violet-200 dark:from-violet-900/40 dark:to-violet-800/40'
    },
    {
      icon: FaAward,
      label: 'Average Score',
      value: `${stats.averageScore}%`,
      color: 'fuchsia',
      description: 'Average quiz score',
      trend: '+4%',
      trendUp: true,
      iconBg: 'from-fuchsia-100 to-fuchsia-200 dark:from-fuchsia-900/40 dark:to-fuchsia-800/40'
    },
    {
      icon: FaClock,
      label: 'Total Time Spent',
      value: `${Math.floor(stats.totalTime / 60)}h ${stats.totalTime % 60}m`,
      color: 'sky',
      description: 'Total learning time',
      trend: '+10%',
      trendUp: true,
      iconBg: 'from-sky-100 to-sky-200 dark:from-sky-900/40 dark:to-sky-800/40'
    },
  ];

  const displayedActivities = showAllActivities ? recentActivities : recentActivities.slice(0, 5);

  // Quick stats with premium design
  const quickStats = [
    { label: 'Today\'s Active', value: stats.activeToday, icon: FaFire, color: 'orange', gradient: 'from-orange-500 to-amber-500' },
    { label: 'Total Attempts', value: stats.totalAttempts, icon: FaChartLine, color: 'blue', gradient: 'from-blue-500 to-indigo-500' },
    { label: 'Pass Rate', value: `${stats.passRate}%`, icon: FaCrown, color: 'emerald', gradient: 'from-emerald-500 to-teal-500' },
    { label: 'Avg Score', value: `${stats.averageScore}%`, icon: FaMedal, color: 'purple', gradient: 'from-purple-500 to-violet-500' },
  ];

  const timeRanges = ['Today', 'Week', 'Month', 'Year'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-200 dark:border-purple-800 rounded-full animate-spin border-t-purple-600 dark:border-t-purple-400"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaSpinner className="text-purple-600 dark:text-purple-400 text-2xl animate-pulse" />
            </div>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">Loading dashboard...</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">Preparing your insights</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 p-4 md:p-6">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-300/5 dark:bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Header with Premium Design */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-4"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl blur-xl opacity-20 animate-pulse" />
            <div className="relative p-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-2xl shadow-purple-500/30">
              <FaRocket className="text-white text-2xl" />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
              Dashboard Overview
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Welcome back, Administrator! Here's your platform overview.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center gap-3 flex-wrap"
        >
          {/* Time Range Selector */}
          <div className="flex bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-1 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            {timeRanges.map((range) => (
              <button
                key={range}
                onClick={() => setSelectedTimeRange(range.toLowerCase())}
                className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedTimeRange === range.toLowerCase()
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/30'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Stats Badge */}
          <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {stats.activeToday} active today
            </span>
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button className="p-2.5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
              <FaBell className="text-gray-600 dark:text-gray-300 text-lg" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full" />
            </button>
          </div>

          {/* Refresh Button */}
          <button className="p-2.5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:rotate-180">
            <FaSync className="text-gray-600 dark:text-gray-300 text-lg" />
          </button>
        </motion.div>
      </div>

      {/* Quick Stats with Premium Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              <div className="relative p-4 flex items-center gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-white text-xl" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 font-mono">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Stat Cards with Premium Design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          const colorData = cardColors[index % cardColors.length];
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative overflow-hidden rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              {/* Premium Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${colorData.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Glowing Border Effect */}
              <div className={`absolute inset-0 border-2 ${colorData.border} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${card.iconBg} shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`text-${card.color}-500 dark:text-${card.color}-400 text-xl`} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 font-mono tracking-tight">
                        {card.value}
                      </div>
                      <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {card.label}
                      </div>
                    </div>
                  </div>
                  
                  {card.trend && (
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
                      card.trendUp 
                        ? 'bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' 
                        : 'bg-rose-100/50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'
                    }`}>
                      {card.trendUp ? <FaArrowUp className="text-[10px]" /> : <FaArrowDown className="text-[10px]" />}
                      {card.trend}
                    </div>
                  )}
                </div>

                {/* Animated Progress Bar for Percentages */}
                {typeof card.value === 'string' && card.value.includes('%') && (
                  <div className="mt-4">
                    <div className="w-full h-1.5 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: card.value }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${colorData.gradient} rounded-full`}
                      />
                    </div>
                  </div>
                )}

                {/* Hover Tooltip */}
                <AnimatePresence>
                  {hoveredCard === index && card.description && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: 10 }}
                      className="absolute -top-2 -right-2 z-20"
                    >
                      <div className="px-3 py-1.5 bg-gray-800 dark:bg-gray-700 text-white text-xs rounded-xl shadow-2xl backdrop-blur-sm border border-gray-700/50">
                        <FaLightbulb className="inline mr-1.5 text-amber-400" />
                        {card.description}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity with Premium Design */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {/* Decorative Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-xl shadow-inner">
                <FaCalendar className="text-purple-500 dark:text-purple-400 text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  Recent Activity Log
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {recentActivities.length} activities recorded
                </p>
              </div>
            </div>
            
            {recentActivities.length > 5 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAllActivities(!showAllActivities)}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-medium text-sm shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 transition-all duration-300 flex items-center gap-2"
              >
                {showAllActivities ? 'Show Less' : 'View All'}
                {showAllActivities ? <FaArrowLeft className="text-xs" /> : <FaArrowRight className="text-xs" />}
              </motion.button>
            )}
          </div>

          {/* Activity List */}
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {displayedActivities.length === 0 ? (
              <div className="text-center py-16 bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-800/30 dark:to-gray-700/30 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                <FaHistory className="text-5xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 font-medium">No activities recorded yet</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Activities will appear here as users interact with the platform</p>
              </div>
            ) : (
              displayedActivities.map((activity, index) => (
                <motion.div
                  key={activity.id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ scale: 1.01, x: 4 }}
                  className={`flex items-center justify-between p-4 rounded-xl border ${getActivityColor(activity.action)} shadow-sm hover:shadow-md transition-all duration-300 group`}
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Icon with Pulse Animation */}
                    <div className="flex-shrink-0 relative">
                      <div className="text-2xl">
                        {getActivityIcon(activity.action)}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                          {activity.user || 'Unknown'}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200/70 dark:bg-gray-700/70 text-gray-600 dark:text-gray-400 font-medium backdrop-blur-sm">
                          {activity.role || 'User'}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {activity.description}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400 flex-wrap">
                        <span className="flex items-center gap-1">
                          <FaCalendar className="text-[10px]" />
                          {activity.date || new Date(activity.timestamp).toLocaleDateString()}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                        <span className="flex items-center gap-1">
                          <FaClock className="text-[10px]" />
                          {activity.time || new Date(activity.timestamp).toLocaleTimeString()}
                        </span>
                        {activity.details?.score && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                            <span className={`font-semibold px-2 py-0.5 rounded-lg ${
                              activity.details.score >= 90 
                                ? 'bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' 
                                : 'bg-rose-100/50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'
                            }`}>
                              Score: {activity.details.score}%
                            </span>
                          </>
                        )}
                        {activity.details?.quiz && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                            <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                              <FaBook className="text-[10px]" />
                              {activity.details.quiz}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Time Badge */}
                  <div className="flex-shrink-0 ml-2">
                    <div className="text-xs px-2 py-1 rounded-lg bg-gray-100/50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 font-mono backdrop-blur-sm">
                      {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Footer Stats */}
          {recentActivities.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-full text-purple-700 dark:text-purple-300 font-medium">
                  {recentActivities.length} total activities
                </span>
              </div>
              <div className="flex items-center gap-1">
                <FaClock className="text-[10px]" />
                <span>Latest: {new Date(recentActivities[0]?.timestamp).toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #6366f1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #4f46e5);
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}

export default AdminDashboard;