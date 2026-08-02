// pages/Admin/Leaderboard.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTrophy, FaMedal, FaCrown, FaSearch, 
  FaStar, FaFire, FaRocket, FaChartLine,
  FaUsers, FaClock, FaCheckCircle, FaArrowUp,
  FaArrowDown, FaArrowRight, FaArrowLeft,
  FaSpinner, FaDatabase, FaFilter, FaTimes,
  FaGraduationCap, FaAward, FaLightbulb,
  FaUserGraduate, FaChartBar
} from 'react-icons/fa';
import { useAdmin } from '../../context/AdminContext.jsx';

function AdminLeaderboard() {
  const { students } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('score');
  const [loading, setLoading] = useState(true);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    // Simulate loading for smooth transition
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const studentStats = students.map(student => {
    const history = student.quizHistory || [];
    const totalQuizzes = history.length;
    const avgScore = totalQuizzes > 0 
      ? Math.round(history.reduce((acc, q) => acc + q.score, 0) / totalQuizzes)
      : 0;
    const passed = history.filter(h => h.score >= 90).length;
    const fastestTime = history.length > 0 
      ? Math.min(...history.map(h => h.timeTaken || Infinity))
      : Infinity;

    return {
      ...student,
      avgScore,
      totalQuizzes,
      passed,
      fastestTime: fastestTime === Infinity ? 'N/A' : fastestTime,
    };
  });

  const filteredStudents = studentStats
    .filter(s => s.fullName?.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'score') return b.avgScore - a.avgScore;
      if (sortBy === 'passed') return b.passed - a.passed;
      if (sortBy === 'fastest') {
        if (a.fastestTime === 'N/A') return 1;
        if (b.fastestTime === 'N/A') return -1;
        return a.fastestTime - b.fastestTime;
      }
      return 0;
    });

  const topThree = filteredStudents.slice(0, 3);

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

  // Stats
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.isActive !== false).length;
  const topScore = filteredStudents.length > 0 ? filteredStudents[0]?.avgScore || 0 : 0;

  const getMedal = (index) => {
    switch(index) {
      case 0: return <FaCrown className="text-yellow-400 text-3xl filter drop-shadow-lg" />;
      case 1: return <FaMedal className="text-gray-400 text-3xl filter drop-shadow-lg" />;
      case 2: return <FaMedal className="text-amber-600 text-3xl filter drop-shadow-lg" />;
      default: return null;
    }
  };

  const getRankColor = (index) => {
    switch(index) {
      case 0: return 'bg-gradient-to-r from-yellow-500/20 to-yellow-400/10 border-yellow-500/30';
      case 1: return 'bg-gradient-to-r from-gray-400/20 to-gray-300/10 border-gray-400/30';
      case 2: return 'bg-gradient-to-r from-amber-600/20 to-amber-500/10 border-amber-600/30';
      default: return 'bg-transparent border-transparent';
    }
  };

  const getRankGradient = (index) => {
    switch(index) {
      case 0: return 'from-yellow-400 to-yellow-500';
      case 1: return 'from-gray-400 to-gray-500';
      case 2: return 'from-amber-600 to-amber-700';
      default: return 'from-purple-500 to-indigo-500';
    }
  };

  const getPerformanceLabel = (score) => {
    if (score >= 90) return { label: '⭐ Elite', color: 'text-emerald-500' };
    if (score >= 70) return { label: '🏅 Pro', color: 'text-amber-500' };
    if (score >= 50) return { label: '📚 Learner', color: 'text-blue-500' };
    return { label: '🌱 Beginner', color: 'text-gray-500' };
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-200 dark:border-purple-800 rounded-full animate-spin border-t-purple-600 dark:border-t-purple-400"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaSpinner className="text-purple-600 dark:text-purple-400 text-2xl animate-pulse" />
            </div>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">Loading leaderboard...</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">Preparing rankings</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-300/10 dark:bg-yellow-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-300/10 dark:bg-amber-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-300/5 dark:bg-orange-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl blur-xl opacity-20 animate-pulse" />
            <div className="relative p-4 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl shadow-2xl shadow-yellow-500/30">
              <FaTrophy className="text-white text-2xl" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">
              Leaderboard
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
              Top performers and rankings
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 flex-wrap"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <FaUsers className="text-purple-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {filteredStudents.length} Students
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
            <FaStar className="text-yellow-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Top Score: {topScore}%
            </span>
          </div>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Students', value: totalStudents, icon: FaUsers, color: 'purple', gradient: 'from-purple-500 to-indigo-500' },
          { label: 'Active Students', value: activeStudents, icon: FaUserGraduate, color: 'emerald', gradient: 'from-emerald-500 to-teal-500' },
          { label: 'Top Score', value: `${topScore}%`, icon: FaCrown, color: 'yellow', gradient: 'from-yellow-500 to-amber-500' },
          { label: 'Total Quizzes', value: students.reduce((acc, s) => acc + (s.quizHistory?.length || 0), 0), icon: FaChartBar, color: 'blue', gradient: 'from-blue-500 to-cyan-500' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
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

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
      >
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="relative flex-1 min-w-[200px]">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search students by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <FaTimes />
              </button>
            )}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 bg-gray-100/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300"
          >
            <option value="score">🏆 Highest Score</option>
            <option value="passed">✅ Most Passed</option>
            <option value="fastest">⚡ Fastest Time</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {filteredStudents.length} students found
          </span>
        </div>
      </motion.div>

      {/* Top 3 Podium */}
      {topThree.length >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative mb-8 p-8 bg-gradient-to-br from-yellow-50/50 to-amber-50/50 dark:from-yellow-900/10 dark:to-amber-900/10 rounded-3xl border border-yellow-200/50 dark:border-yellow-800/30 shadow-xl"
        >
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 text-6xl opacity-10">🏆</div>
          <div className="absolute bottom-4 left-4 text-6xl opacity-10">⭐</div>
          
          <div className="flex flex-col md:flex-row items-end justify-center gap-8 relative z-10">
            {/* 2nd Place */}
            <motion.div 
              className="text-center order-2 md:order-1"
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className="relative">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center text-white text-4xl shadow-2xl shadow-gray-500/30">
                  {topThree[1]?.fullName?.charAt(0)}
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  2
                </div>
              </div>
              <div className="mt-3 font-semibold text-gray-800 dark:text-gray-200 text-lg">
                {topThree[1]?.fullName}
              </div>
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                {topThree[1]?.avgScore}%
              </div>
              <div className="mt-2 text-3xl flex justify-center">
                {getMedal(1)}
              </div>
              <div className="text-sm text-gray-500 font-medium">🥈 2nd Place</div>
            </motion.div>

            {/* 1st Place */}
            <motion.div 
              className="text-center order-1 md:order-2 -translate-y-6"
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full blur-2xl opacity-30 animate-pulse" />
                <div className="relative w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-white text-5xl shadow-2xl shadow-yellow-500/50 border-4 border-yellow-300">
                  {topThree[0]?.fullName?.charAt(0)}
                </div>
                <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg border-2 border-yellow-300">
                  👑
                </div>
              </div>
              <div className="mt-3 text-2xl font-bold text-gray-800 dark:text-gray-200">
                {topThree[0]?.fullName}
              </div>
              <div className="text-3xl font-bold text-yellow-500">
                {topThree[0]?.avgScore}%
              </div>
              <div className="mt-2 text-4xl flex justify-center">
                {getMedal(0)}
              </div>
              <div className="text-sm text-yellow-600 font-semibold">🏆 Champion</div>
            </motion.div>

            {/* 3rd Place */}
            <motion.div 
              className="text-center order-3"
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className="relative">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-white text-4xl shadow-2xl shadow-amber-600/30">
                  {topThree[2]?.fullName?.charAt(0)}
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  3
                </div>
              </div>
              <div className="mt-3 font-semibold text-gray-800 dark:text-gray-200 text-lg">
                {topThree[2]?.fullName}
              </div>
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                {topThree[2]?.avgScore}%
              </div>
              <div className="mt-2 text-3xl flex justify-center">
                {getMedal(2)}
              </div>
              <div className="text-sm text-gray-500 font-medium">🥉 3rd Place</div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Full Leaderboard Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative overflow-hidden rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {/* Decorative Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500" />

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-yellow-50/50 to-amber-50/50 dark:from-yellow-900/10 dark:to-amber-900/10">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Quizzes
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Passed
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Avg Score
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Fastest
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <FaUsers className="text-5xl text-gray-300 dark:text-gray-600" />
                      <p className="text-gray-500 dark:text-gray-400 font-medium">No students found</p>
                      <p className="text-sm text-gray-400 dark:text-gray-500">Try adjusting your search</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((student, index) => {
                  const globalIndex = startIndex + index;
                  const isTopThree = globalIndex < 3;
                  const performance = getPerformanceLabel(student.avgScore);
                  
                  return (
                    <motion.tr
                      key={student.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      whileHover={{ scale: 1.005 }}
                      onMouseEnter={() => setHoveredRow(globalIndex)}
                      onMouseLeave={() => setHoveredRow(null)}
                      className={`hover:bg-purple-50/30 dark:hover:bg-purple-900/10 transition-all duration-300 ${
                        isTopThree ? `bg-gradient-to-r ${getRankColor(globalIndex)} border-l-4` : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {isTopThree ? (
                            getMedal(globalIndex)
                          ) : (
                            <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                              #{globalIndex + 1}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getRankGradient(globalIndex)} flex items-center justify-center text-white text-sm font-bold shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                            {student.fullName?.charAt(0) || '?'}
                          </div>
                          <div>
                            <div className="font-medium text-gray-800 dark:text-gray-200">
                              {student.fullName || 'Unknown'}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {student.email || 'No email'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <FaGraduationCap className="text-purple-500 text-xs" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {student.totalQuizzes}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <FaCheckCircle className="text-emerald-500 text-xs" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {student.passed}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex flex-col items-center">
                          <span className={`text-lg font-bold ${
                            student.avgScore >= 90 ? 'text-emerald-500' : 
                            student.avgScore >= 70 ? 'text-amber-500' : 
                            student.avgScore >= 50 ? 'text-blue-500' : 
                            'text-rose-500'
                          }`}>
                            {student.avgScore}%
                          </span>
                          <div className="w-12 h-1.5 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full bg-gradient-to-r ${
                                student.avgScore >= 90 ? 'from-emerald-500 to-teal-500' : 
                                student.avgScore >= 70 ? 'from-amber-500 to-orange-500' : 
                                student.avgScore >= 50 ? 'from-blue-500 to-cyan-500' : 
                                'from-rose-500 to-red-500'
                              }`}
                              style={{ width: `${Math.min(student.avgScore, 100)}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <FaClock className="text-gray-400 text-xs" />
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            {student.fastestTime === 'N/A' ? 'N/A' : `${Math.floor(student.fastestTime / 60)}m ${student.fastestTime % 60}s`}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          student.avgScore >= 90 ? 'bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-700/30' :
                          student.avgScore >= 70 ? 'bg-amber-100/50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200/50 dark:border-amber-700/30' :
                          student.avgScore >= 50 ? 'bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/30' :
                          'bg-gray-100/50 dark:bg-gray-800/30 text-gray-700 dark:text-gray-400 border border-gray-200/50 dark:border-gray-700/30'
                        }`}>
                          {performance.label}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-yellow-50/30 to-amber-50/30 dark:from-yellow-900/5 dark:to-amber-900/5">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
              <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredStudents.length)}</span> of{' '}
              <span className="font-medium">{filteredStudents.length}</span> students
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl bg-white/50 dark:bg-gray-800/50 hover:bg-purple-100/50 dark:hover:bg-purple-900/20 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 flex items-center gap-2"
              >
                <FaArrowLeft className="text-xs" />
                Previous
              </button>
              <span className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-semibold shadow-lg shadow-yellow-500/30">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl bg-white/50 dark:bg-gray-800/50 hover:bg-purple-100/50 dark:hover:bg-purple-900/20 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 flex items-center gap-2"
              >
                Next
                <FaArrowRight className="text-xs" />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default AdminLeaderboard;