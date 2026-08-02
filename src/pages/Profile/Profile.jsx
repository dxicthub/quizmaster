import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser, FaEnvelope, FaPhone, FaKey, FaChartBar, 
  FaHistory, FaStar, FaGraduationCap, FaAward,
  FaMedal, FaRocket, FaFire, FaTrophy, FaClock,
  FaBookOpen, FaCheckCircle, FaTimesCircle, FaArrowRight,
  FaSpinner, FaEye, FaEyeSlash, FaCrown, FaCalendarAlt
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext.jsx';
import { useQuiz } from '../../context/QuizContext.jsx';
import { quizCategories } from '../../data/quizCategories.js';

function Profile() {
  const { student } = useAuth();
  const { state } = useQuiz();
  const [showPasscode, setShowPasscode] = useState(false);
  const [hoveredStat, setHoveredStat] = useState(null);

  const totalQuizzes = student?.quizHistory?.length || 0;
  const passedQuizzes = student?.quizHistory?.filter(h => h.score >= 90).length || 0;
  const failedQuizzes = totalQuizzes - passedQuizzes;
  const averageScore = totalQuizzes > 0 
    ? Math.round(student.quizHistory.reduce((acc, h) => acc + h.score, 0) / totalQuizzes)
    : 0;
  
  const favoriteQuizzes = quizCategories.filter(q => (state.favorites || []).includes(q.id));
  const passRate = totalQuizzes > 0 ? Math.round((passedQuizzes / totalQuizzes) * 100) : 0;
  const lastQuiz = student?.quizHistory?.[student.quizHistory.length - 1];
  const bestScore = student?.quizHistory?.length > 0 
    ? Math.max(...student.quizHistory.map(h => h.score))
    : 0;

  // Performance level
  const getPerformanceLevel = () => {
    if (averageScore >= 90) return { label: '🌟 Elite', color: 'text-purple-500 bg-purple-100/50 dark:bg-purple-900/30 border-purple-200/50 dark:border-purple-700/30' };
    if (averageScore >= 70) return { label: '🏅 Pro', color: 'text-blue-500 bg-blue-100/50 dark:bg-blue-900/30 border-blue-200/50 dark:border-blue-700/30' };
    if (averageScore >= 50) return { label: '📚 Learner', color: 'text-emerald-500 bg-emerald-100/50 dark:bg-emerald-900/30 border-emerald-200/50 dark:border-emerald-700/30' };
    return { label: '🌱 Beginner', color: 'text-amber-500 bg-amber-100/50 dark:bg-amber-900/30 border-amber-200/50 dark:border-amber-700/30' };
  };

  const performance = getPerformanceLevel();

  const statCards = [
    { 
      label: 'Total Quizzes', 
      value: totalQuizzes, 
      icon: FaBookOpen, 
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-500',
      description: 'Quizzes completed'
    },
    { 
      label: 'Passed', 
      value: passedQuizzes, 
      icon: FaCheckCircle, 
      color: 'emerald',
      gradient: 'from-emerald-500 to-teal-500',
      description: 'Successfully passed'
    },
    { 
      label: 'Failed', 
      value: failedQuizzes, 
      icon: FaTimesCircle, 
      color: 'rose',
      gradient: 'from-rose-500 to-red-500',
      description: 'Need improvement'
    },
    { 
      label: 'Avg Score', 
      value: `${averageScore}%`, 
      icon: FaChartBar, 
      color: 'purple',
      gradient: 'from-purple-500 to-violet-500',
      description: 'Average performance'
    },
    { 
      label: 'Pass Rate', 
      value: `${passRate}%`, 
      icon: FaTrophy, 
      color: 'amber',
      gradient: 'from-amber-500 to-orange-500',
      description: 'Success rate'
    },
    { 
      label: 'Best Score', 
      value: `${bestScore}%`, 
      icon: FaCrown, 
      color: 'yellow',
      gradient: 'from-yellow-500 to-amber-500',
      description: 'Your highest score'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 p-4 md:p-6">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300/10 dark:bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300/5 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2.5 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl">
            <FaUser className="text-blue-500 text-xl" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              My Profile
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Manage your account and track your learning progress
            </p>
          </div>
        </div>

        {/* Profile Header - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 mb-8"
        >
          {/* Decorative Gradient Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Avatar with ring */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-2xl opacity-30 animate-pulse" />
                <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-5xl shadow-2xl shadow-blue-500/30 border-4 border-white dark:border-gray-800">
                  {student?.fullName?.charAt(0) || 'S'}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white dark:border-gray-800 animate-pulse" />
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                    {student?.fullName}
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${performance.color}`}>
                    {performance.label}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-3 text-gray-600 dark:text-gray-400 justify-center md:justify-start">
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                    <FaEnvelope className="text-blue-500" />
                    {student?.email}
                  </span>
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                    <FaPhone className="text-blue-500" />
                    {student?.phone}
                  </span>
                  <button
                    onClick={() => setShowPasscode(!showPasscode)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-purple-50/50 dark:bg-purple-900/20 rounded-xl border border-purple-200/50 dark:border-purple-700/30 hover:bg-purple-100/50 dark:hover:bg-purple-900/30 transition-all duration-300 group"
                  >
                    <FaKey className="text-purple-500" />
                    <span className="font-mono text-sm">
                      {showPasscode ? student?.passcode : '••••••••'}
                    </span>
                    {showPasscode ? <FaEyeSlash className="text-gray-400 text-xs" /> : <FaEye className="text-gray-400 text-xs" />}
                  </button>
                </div>

                <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
                  <span className="px-3 py-1.5 bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm border border-emerald-200/50 dark:border-emerald-700/30 flex items-center gap-1.5">
                    <FaGraduationCap className="text-xs" />
                    {totalQuizzes} Quizzes Taken
                  </span>
                  <span className="px-3 py-1.5 bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm border border-blue-200/50 dark:border-blue-700/30 flex items-center gap-1.5">
                    <FaStar className="text-xs" />
                    {passedQuizzes} Passed
                  </span>
                  <span className="px-3 py-1.5 bg-purple-100/50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm border border-purple-200/50 dark:border-purple-700/30 flex items-center gap-1.5">
                    <FaChartBar className="text-xs" />
                    {averageScore}% Avg Score
                  </span>
                  {lastQuiz && (
                    <span className="px-3 py-1.5 bg-amber-100/50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm border border-amber-200/50 dark:border-amber-700/30 flex items-center gap-1.5">
                      <FaClock className="text-xs" />
                      Last: {new Date(lastQuiz.timestamp).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Statistics Grid - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
        >
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4, scale: 1.02 }}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
                className="group relative overflow-hidden rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                <div className="relative p-4 text-center">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg transform group-hover:scale-110 transition-transform duration-300 w-12 h-12 mx-auto flex items-center justify-center`}>
                    <Icon className="text-white text-xl" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 font-mono mt-2">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                  <AnimatePresence>
                    {hoveredStat === index && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute -top-2 -right-2 z-20"
                      >
                        <div className="px-2 py-1 bg-gray-800 dark:bg-gray-700 text-white text-[10px] rounded-lg shadow-lg whitespace-nowrap">
                          {stat.description}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Favorite Quizzes - Enhanced */}
        {favoriteQuizzes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative overflow-hidden rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg p-6"
          >
            {/* Decorative Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500" />

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-100/50 dark:bg-yellow-900/20 rounded-xl">
                <FaStar className="text-yellow-500 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Favorite Quizzes
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {favoriteQuizzes.length} quizzes you've favorited
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {favoriteQuizzes.map((quiz, index) => (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="group relative overflow-hidden rounded-xl bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-700/50 p-4 hover:shadow-lg transition-all duration-300"
                >
                  <div className="absolute top-2 right-2">
                    <FaStar className="text-yellow-400 text-sm" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-500 flex items-center justify-center text-white text-xs font-bold">
                      {quiz.title.charAt(0)}
                    </div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 text-sm truncate">
                      {quiz.title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className={`px-2 py-0.5 rounded-full ${
                      quiz.difficulty === 'Beginner' ? 'bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' :
                      quiz.difficulty === 'Intermediate' ? 'bg-amber-100/50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' :
                      'bg-rose-100/50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'
                    }`}>
                      {quiz.difficulty || 'Not set'}
                    </span>
                    <span>{quiz.totalQuestions || 0} questions</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State for No Favorites */}
        {favoriteQuizzes.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative overflow-hidden rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg p-12 text-center"
          >
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              No Favorite Quizzes Yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
              Start exploring quizzes and click the star icon to save your favorites for quick access.
            </p>
            <button
              onClick={() => window.location.href = '/app'}
              className="mt-4 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
            >
              Explore Quizzes
              <FaArrowRight className="text-sm" />
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default Profile;