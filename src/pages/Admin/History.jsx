import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSearch, FaFilter, FaSort, FaCalendar,
  FaCheckCircle, FaTimesCircle, FaClock,
  FaUserGraduate, FaBook
} from 'react-icons/fa';
import { useAdmin } from '../../context/AdminContext.jsx';
import { useQuiz } from '../../context/QuizContext.jsx';
import { quizCategories } from '../../data/quizCategories.js';
import toast from 'react-hot-toast';

function AdminHistory() {
  const { loadQuizAttempts, students } = useAdmin();
  const [attempts, setAttempts] = useState([]);
  const [filteredAttempts, setFilteredAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    quiz: 'all',
    student: 'all',
    status: 'all',
    category: 'all',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [attempts, searchTerm, filters]);

  const loadData = () => {
    setLoading(true);
    try {
      const loadedAttempts = loadQuizAttempts();
      // Add student names to attempts
      const attemptsWithNames = loadedAttempts.map(attempt => {
        const student = students.find(s => s.id === attempt.studentId);
        return {
          ...attempt,
          studentName: student?.fullName || 'Unknown Student',
        };
      });
      setAttempts(attemptsWithNames);
      setFilteredAttempts(attemptsWithNames);
    } catch (error) {
      console.error('Error loading history:', error);
      toast.error('Failed to load quiz history');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...attempts];

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(a =>
        a.studentName?.toLowerCase().includes(term) ||
        a.quizTitle?.toLowerCase().includes(term) ||
        a.quizCategory?.toLowerCase().includes(term)
      );
    }

    // Filter by quiz
    if (filters.quiz !== 'all') {
      filtered = filtered.filter(a => a.quizTitle === filters.quiz);
    }

    // Filter by student
    if (filters.student !== 'all') {
      filtered = filtered.filter(a => a.studentName === filters.student);
    }

    // Filter by status
    if (filters.status !== 'all') {
      const passed = filters.status === 'passed';
      filtered = filtered.filter(a => (a.score >= 90) === passed);
    }

    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(a => a.quizCategory === filters.category);
    }

    // Sort by newest first
    filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    setFilteredAttempts(filtered);
    setCurrentPage(1);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const formatTime = (seconds) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getStatusBadge = (score) => {
    if (score >= 90) {
      return { text: 'Passed', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' };
    }
    return { text: 'Failed', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' };
  };

  // Get unique quizzes for filter
  const uniqueQuizzes = [...new Set(attempts.map(a => a.quizTitle))];
  const uniqueStudents = [...new Set(attempts.map(a => a.studentName))];
  const uniqueCategories = [...new Set(attempts.map(a => a.quizCategory).filter(Boolean))];

  const totalPages = Math.ceil(filteredAttempts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAttempts = filteredAttempts.slice(startIndex, startIndex + itemsPerPage);

  // Calculate statistics
  const totalAttempts = filteredAttempts.length;
  const passedCount = filteredAttempts.filter(a => a.score >= 90).length;
  const failedCount = filteredAttempts.filter(a => a.score < 90).length;
  const avgScore = totalAttempts > 0 
    ? Math.round(filteredAttempts.reduce((acc, a) => acc + a.score, 0) / totalAttempts)
    : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading quiz history...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <FaBook className="text-purple-500" />
            Quiz History
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {totalAttempts} quiz attempts • {passedCount} passed • {failedCount} failed
          </p>
        </div>
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm w-64"
          />
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="glassmorphism card-shadow rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-500">{totalAttempts}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Attempts</div>
        </div>
        <div className="glassmorphism card-shadow rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-500">{passedCount}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Passed</div>
        </div>
        <div className="glassmorphism card-shadow rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-500">{failedCount}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Failed</div>
        </div>
        <div className="glassmorphism card-shadow rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-yellow-500">{avgScore}%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Avg Score</div>
        </div>
      </div>

      {/* Filters */}
      <div className="glassmorphism card-shadow rounded-2xl p-6 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Quiz
            </label>
            <select
              value={filters.quiz}
              onChange={(e) => handleFilterChange('quiz', e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Quizzes</option>
              {uniqueQuizzes.map((quiz) => (
                <option key={quiz} value={quiz}>{quiz}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Student
            </label>
            <select
              value={filters.student}
              onChange={(e) => handleFilterChange('student', e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Students</option>
              {uniqueStudents.map((student) => (
                <option key={student} value={student}>{student}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All</option>
              <option value="passed">Passed</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Categories</option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* History Table */}
      <div className="glassmorphism card-shadow rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Quiz</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedAttempts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    <div className="text-6xl mb-4">📚</div>
                    <p>No quiz history found</p>
                    <p className="text-sm mt-1">Students haven't taken any quizzes yet</p>
                  </td>
                </tr>
              ) : (
                paginatedAttempts.map((attempt, index) => {
                  const status = getStatusBadge(attempt.score);
                  
                  return (
                    <motion.tr
                      key={attempt.id || index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                            {attempt.studentName?.charAt(0) || 'S'}
                          </div>
                          <span className="font-medium text-gray-800 dark:text-gray-200">
                            {attempt.studentName || 'Unknown'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {attempt.quizTitle || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {attempt.quizCategory || 'General'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        <div>{new Date(attempt.timestamp).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-400">
                          {new Date(attempt.timestamp).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`text-xl font-bold ${attempt.score >= 90 ? 'text-green-500' : 'text-red-500'}`}>
                          {attempt.score || 0}%
                        </span>
                        <div className="text-xs text-gray-400">
                          {attempt.passed || 0}/{attempt.total || 0} correct
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
                        {formatTime(attempt.timeTaken)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}>
                          {status.text}
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
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAttempts.length)} of {filteredAttempts.length}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <span className="px-4 py-2 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-semibold">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminHistory;