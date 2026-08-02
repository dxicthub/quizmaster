import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFilter, FaSort, FaCalendar } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext.jsx';

function History() {
  const { student } = useAuth();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');

  const history = student?.quizHistory || [];

  const filteredHistory = history.filter(h => {
    if (filter === 'passed') return h.score >= 90;
    if (filter === 'failed') return h.score < 90;
    return true;
  });

  const sortedHistory = [...filteredHistory].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.date) - new Date(a.date);
    }
    if (sortBy === 'highest') {
      return b.score - a.score;
    }
    return 0;
  });

  const stats = {
    total: history.length,
    passed: history.filter(h => h.score >= 90).length,
    failed: history.filter(h => h.score < 90).length,
    average: history.length > 0 
      ? Math.round(history.reduce((acc, h) => acc + h.score, 0) / history.length)
      : 0,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Quiz History
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glassmorphism card-shadow rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">{stats.total}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
          </div>
          <div className="glassmorphism card-shadow rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-500">{stats.passed}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Passed</div>
          </div>
          <div className="glassmorphism card-shadow rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-red-500">{stats.failed}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Failed</div>
          </div>
          <div className="glassmorphism card-shadow rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-500">{stats.average}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Average</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <FaFilter className="text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent text-gray-700 dark:text-gray-300 text-sm focus:outline-none cursor-pointer"
            >
              <option value="all">All</option>
              <option value="passed">Passed</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <FaSort className="text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-gray-700 dark:text-gray-300 text-sm focus:outline-none cursor-pointer"
            >
              <option value="latest">Latest</option>
              <option value="highest">Highest Score</option>
            </select>
          </div>
        </div>

        {/* History List */}
        {sortedHistory.length === 0 ? (
          <div className="glassmorphism card-shadow rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              No quiz history yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Start taking quizzes to build your history
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedHistory.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glassmorphism card-shadow rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                    {entry.quizTitle}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <FaCalendar className="text-blue-500" />
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span>{entry.total} questions</span>
                    <span>•</span>
                    <span>⏱️ {Math.floor(entry.timeTaken / 60)}m {entry.timeTaken % 60}s</span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${entry.score >= 90 ? 'text-green-500' : 'text-red-500'}`}>
                      {entry.score}%
                    </div>
                    <div className={`text-sm ${entry.score >= 90 ? 'text-green-500' : 'text-red-500'}`}>
                      {entry.score >= 90 ? '✅ Passed' : '❌ Failed'}
                    </div>
                  </div>
                  <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        entry.score >= 90 ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${entry.score}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default History;