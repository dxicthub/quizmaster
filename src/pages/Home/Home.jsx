import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaPlay, FaBook, FaTrophy, FaClock, FaChartBar, 
  FaRocket, FaCheckCircle, FaStar, FaArrowRight,
  FaGraduationCap, FaUsers, FaLightbulb
} from 'react-icons/fa';

function Home() {
  const features = [
    {
      icon: <FaBook className="text-3xl" />,
      title: '100 Questions',
      description: 'Comprehensive quiz covering Vercel, Git, and GitHub deployment',
      color: 'from-blue-500 to-indigo-500',
      bg: 'from-blue-100/50 to-indigo-100/50 dark:from-blue-900/20 dark:to-indigo-900/20',
      iconColor: 'text-blue-500'
    },
    {
      icon: <FaTrophy className="text-3xl" />,
      title: 'Instant Feedback',
      description: 'Get immediate feedback with correct answers revealed',
      color: 'from-yellow-500 to-amber-500',
      bg: 'from-yellow-100/50 to-amber-100/50 dark:from-yellow-900/20 dark:to-amber-900/20',
      iconColor: 'text-yellow-500'
    },
    {
      icon: <FaClock className="text-3xl" />,
      title: 'Timer',
      description: 'Track your time and performance throughout the quiz',
      color: 'from-emerald-500 to-teal-500',
      bg: 'from-emerald-100/50 to-teal-100/50 dark:from-emerald-900/20 dark:to-teal-900/20',
      iconColor: 'text-emerald-500'
    },
    {
      icon: <FaChartBar className="text-3xl" />,
      title: 'Detailed Results',
      description: 'View your score, passed/failed breakdown, and percentage',
      color: 'from-purple-500 to-violet-500',
      bg: 'from-purple-100/50 to-violet-100/50 dark:from-purple-900/20 dark:to-violet-900/20',
      iconColor: 'text-purple-500'
    },
  ];

  const stats = [
    { label: 'Questions', value: '100+', icon: FaBook },
    { label: 'Topics', value: '3', icon: FaGraduationCap },
    { label: 'Time Limit', value: '30 min', icon: FaClock },
    { label: 'Pass Rate', value: '70%', icon: FaStar },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 flex items-center justify-center p-4 md:p-6 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300/20 dark:bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
        
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-5xl"
      >
        <div className="relative overflow-hidden rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
          {/* Decorative Gradient Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

          <div className="p-8 md:p-12">
            {/* Logo/Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur-2xl opacity-30 animate-pulse" />
                <div className="relative w-28 h-28 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30">
                  <FaGraduationCap className="text-white text-6xl" />
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <div className="text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent"
              >
                Welcome to QuizMaster
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
              >
                Test your knowledge on <span className="text-blue-600 dark:text-blue-400 font-semibold">Vercel deployment</span>, 
                {' '}<span className="text-indigo-600 dark:text-indigo-400 font-semibold">Git version control</span>, and 
                {' '}<span className="text-purple-600 dark:text-purple-400 font-semibold">GitHub integration</span> 
                with our comprehensive assessment.
              </motion.p>
            </div>

            {/* Quick Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-gray-50/50 dark:bg-gray-700/50 rounded-xl p-3 text-center border border-gray-200/50 dark:border-gray-700/50">
                    <Icon className="text-blue-500 text-xl mx-auto mb-1" />
                    <div className="text-lg font-bold text-gray-800 dark:text-gray-200">{stat.value}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
                  </div>
                );
              })}
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`group relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br ${feature.bg} border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  <div className="relative flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white text-xl">{feature.icon}</div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/quiz">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl font-semibold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-3 group"
                >
                  <FaPlay className="group-hover:scale-110 transition-transform" />
                  Start Quiz
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              
              <Link to="/app">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-2xl font-semibold text-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 flex items-center gap-3 group"
                >
                  <FaRocket className="group-hover:scale-110 transition-transform" />
                  Dashboard
                </motion.button>
              </Link>
            </motion.div>

            {/* Footer Info */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-8 text-center"
            >
              <div className="inline-flex items-center gap-4 px-4 py-2 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                <span className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                  <FaCheckCircle className="text-emerald-500 text-xs" />
                  <span>100 Questions</span>
                </span>
                <span className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
                <span className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                  <FaClock className="text-blue-500 text-xs" />
                  <span>Timed</span>
                </span>
                <span className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
                <span className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                  <FaStar className="text-yellow-500 text-xs" />
                  <span>Instant Feedback</span>
                </span>
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
                💡 Challenge yourself and improve your skills
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;