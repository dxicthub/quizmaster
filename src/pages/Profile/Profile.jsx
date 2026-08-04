// pages/Profile/Profile.jsx - Update the imports
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, FaEnvelope, FaPhone, FaKey, FaChartBar, 
  FaHistory, FaStar, FaGraduationCap, FaAward,
  FaMedal, FaRocket, FaFire, FaTrophy, FaClock,
  FaBookOpen, FaCheckCircle, FaTimesCircle, FaArrowRight,
  FaSpinner, FaEye, FaEyeSlash, FaCrown, FaCalendarAlt,
  FaSearch, FaFilter, FaSort, FaChevronDown, FaChevronUp,
  FaInfoCircle, FaRedo, FaEye as FaView, FaTimes  // Added FaTimes here
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext.jsx';
import { useQuiz } from '../../context/QuizContext.jsx';
import { quizCategories } from '../../data/quizCategories.js';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

function Profile() {
  const navigate = useNavigate();
  const { student, updateStudent, logout } = useAuth();
  const { state, setReviewing } = useQuiz();
  const [showPasscode, setShowPasscode] = useState(false);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAttempt, setSelectedAttempt] = useState(null);
  const [showAttemptDetails, setShowAttemptDetails] = useState(false);
  const [expandedAttempt, setExpandedAttempt] = useState(null);

  const history = student?.quizHistory || [];

  // Filter and sort history
  const filteredHistory = useMemo(() => {
    let filtered = [...history];

    // Filter by status
    if (filter === 'passed') {
      filtered = filtered.filter(h => h.score >= 90);
    } else if (filter === 'failed') {
      filtered = filtered.filter(h => h.score < 90);
    }

    // Search by quiz title
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(h => 
        h.quizTitle?.toLowerCase().includes(term)
      );
    }

    // Sort
    switch (sortBy) {
      case 'latest':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'highest':
        filtered.sort((a, b) => b.score - a.score);
        break;
      case 'lowest':
        filtered.sort((a, b) => a.score - b.score);
        break;
      default:
        break;
    }

    return filtered;
  }, [history, filter, sortBy, searchTerm]);

  // Statistics
  const totalQuizzes = history.length;
  const passedQuizzes = history.filter(h => h.score >= 90).length;
  const failedQuizzes = totalQuizzes - passedQuizzes;
  const averageScore = totalQuizzes > 0 
    ? Math.round(history.reduce((acc, h) => acc + h.score, 0) / totalQuizzes)
    : 0;
  
  const favoriteQuizzes = quizCategories.filter(q => (state.favorites || []).includes(q.id));
  const passRate = totalQuizzes > 0 ? Math.round((passedQuizzes / totalQuizzes) * 100) : 0;
  const lastQuiz = history[history.length - 1];
  const bestScore = history.length > 0 
    ? Math.max(...history.map(h => h.score))
    : 0;
  const worstScore = history.length > 0 
    ? Math.min(...history.map(h => h.score))
    : 0;

  // Performance level
  const getPerformanceLevel = () => {
    if (averageScore >= 90) return { label: '🌟 Elite', color: 'text-purple-500 bg-purple-100/50 dark:bg-purple-900/30 border-purple-200/50 dark:border-purple-700/30', icon: FaCrown };
    if (averageScore >= 70) return { label: '🏅 Pro', color: 'text-blue-500 bg-blue-100/50 dark:bg-blue-900/30 border-blue-200/50 dark:border-blue-700/30', icon: FaMedal };
    if (averageScore >= 50) return { label: '📚 Learner', color: 'text-emerald-500 bg-emerald-100/50 dark:bg-emerald-900/30 border-emerald-200/50 dark:border-emerald-700/30', icon: FaBookOpen };
    return { label: '🌱 Beginner', color: 'text-amber-500 bg-amber-100/50 dark:bg-amber-900/30 border-amber-200/50 dark:border-amber-700/30', icon: FaRocket };
  };

  const performance = getPerformanceLevel();
  const PerformanceIcon = performance.icon;

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

  const handleChangePassword = () => {
    Swal.fire({
      title: '🔒 Change Password',
      html: `
        <div class="text-left">
          <p class="text-sm text-gray-500 mb-4">Enter your new passcode below.</p>
          <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Passcode</label>
            <input id="current-passcode" type="password" class="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter current passcode">
          </div>
          <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Passcode</label>
            <input id="new-passcode" type="password" class="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter new passcode">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Passcode</label>
            <input id="confirm-passcode" type="password" class="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Confirm new passcode">
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonColor: '#8b5cf6',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Update Passcode',
      cancelButtonText: 'Cancel',
      backdrop: 'rgba(0,0,0,0.5)',
      customClass: {
        popup: 'rounded-2xl shadow-2xl max-w-md',
        confirmButton: 'px-6 py-2.5 rounded-xl font-semibold',
        cancelButton: 'px-6 py-2.5 rounded-xl font-semibold'
      },
      preConfirm: () => {
        const current = document.getElementById('current-passcode').value;
        const newPass = document.getElementById('new-passcode').value;
        const confirm = document.getElementById('confirm-passcode').value;

        if (!current || !newPass || !confirm) {
          Swal.showValidationMessage('Please fill in all fields');
          return false;
        }

        if (current !== student.passcode) {
          Swal.showValidationMessage('Current passcode is incorrect');
          return false;
        }

        if (newPass.length < 6) {
          Swal.showValidationMessage('New passcode must be at least 6 characters');
          return false;
        }

        if (newPass !== confirm) {
          Swal.showValidationMessage('New passcodes do not match');
          return false;
        }

        return { current, newPass };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        updateStudent({ passcode: result.value.newPass });
        toast.success('🔒 Passcode updated successfully!');
        
        Swal.fire({
          title: '🔄 Passcode Updated',
          text: 'Please login again with your new passcode.',
          icon: 'success',
          confirmButtonColor: '#8b5cf6',
          confirmButtonText: 'Login Again',
          customClass: {
            popup: 'rounded-2xl shadow-2xl',
            confirmButton: 'px-6 py-2.5 rounded-xl font-semibold'
          }
        }).then(() => {
          logout();
          navigate('/login');
        });
      }
    });
  };

  const handleViewAttemptDetails = (attempt, index) => {
    setSelectedAttempt({ ...attempt, index });
    setShowAttemptDetails(true);
  };

  const handleReviewAttempt = (attempt) => {
    const reviewData = {
      questions: attempt.questions || [],
      answers: attempt.answers || {},
      attemptId: attempt.id || Date.now().toString(),
      attemptDate: attempt.date,
      attemptScore: attempt.score,
    };
    
    localStorage.setItem('reviewData', JSON.stringify(reviewData));
    localStorage.setItem('shouldReview', 'true');
    localStorage.setItem('reviewAttemptId', reviewData.attemptId);
    
    setReviewing(true);
    navigate('/app/review');
    toast.info('📋 Reviewing answers from this attempt');
  };

  const getAttemptStatus = (score) => {
    if (score >= 90) return { label: '✅ Passed', color: 'text-emerald-500', bg: 'bg-emerald-100/50 dark:bg-emerald-900/30' };
    return { label: '❌ Failed', color: 'text-rose-500', bg: 'bg-rose-100/50 dark:bg-rose-900/30' };
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-500';
    if (score >= 70) return 'text-blue-500';
    if (score >= 50) return 'text-amber-500';
    return 'text-rose-500';
  };

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
                    <span className="flex items-center gap-1">
                      <PerformanceIcon className="text-xs" />
                      {performance.label}
                    </span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-3 text-gray-600 dark:text-gray-400 justify-center md:justify-start">
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                    <FaEnvelope className="text-blue-500" />
                    {student?.email}
                  </span>
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                    <FaPhone className="text-blue-500" />
                    {student?.phone || 'Not provided'}
                  </span>
                  <span className="flex items-center gap-2 px-3 py-1.5 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                    <FaGraduationCap className="text-purple-500" />
                    {student?.batch || 'Not assigned'}
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
                  <button
                    onClick={handleChangePassword}
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-50/50 dark:bg-blue-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/30 hover:bg-blue-100/50 dark:hover:bg-blue-900/30 transition-all duration-300 text-blue-600 dark:text-blue-400 text-sm font-medium"
                  >
                    <FaRedo className="text-xs" />
                    Change Passcode
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
                      Last: {new Date(lastQuiz.date).toLocaleDateString()}
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

        {/* Quiz History Section - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative overflow-hidden rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg p-6"
        >
          {/* Decorative Gradient Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100/50 dark:bg-blue-900/20 rounded-xl">
                <FaHistory className="text-blue-500 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  📚 My Quiz History
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {totalQuizzes} quizzes taken • {passedQuizzes} passed • {failedQuizzes} failed
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredHistory.length} of {totalQuizzes} attempts
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by quiz name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700 dark:text-gray-300 placeholder-gray-400"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
              <FaFilter className="text-gray-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-transparent text-gray-700 dark:text-gray-300 text-sm focus:outline-none cursor-pointer"
              >
                <option value="all">All</option>
                <option value="passed">✅ Passed</option>
                <option value="failed">❌ Failed</option>
              </select>
            </div>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50/50 dark:bg-gray-700/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
              <FaSort className="text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-gray-700 dark:text-gray-300 text-sm focus:outline-none cursor-pointer"
              >
                <option value="latest">📅 Latest</option>
                <option value="oldest">📅 Oldest</option>
                <option value="highest">⬆️ Highest Score</option>
                <option value="lowest">⬇️ Lowest Score</option>
              </select>
            </div>
          </div>

          {/* History List */}
          {filteredHistory.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                {totalQuizzes === 0 ? 'No quiz history yet' : 'No matches found'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                {totalQuizzes === 0 
                  ? 'Start taking quizzes to build your history' 
                  : 'Try adjusting your search or filter criteria'}
              </p>
              {totalQuizzes === 0 && (
                <button
                  onClick={() => navigate('/app')}
                  className="mt-4 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
                >
                  Explore Quizzes
                  <FaArrowRight className="text-sm" />
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredHistory.map((entry, index) => {
                const status = getAttemptStatus(entry.score);
                const isExpanded = expandedAttempt === index;
                const hasQuestions = entry.questions && entry.questions.length > 0;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.03, 0.5) }}
                    className="group relative overflow-hidden rounded-xl bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-600/50 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="p-4">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-gray-800 dark:text-gray-200 truncate">
                              {entry.quizTitle || 'Untitled Quiz'}
                            </h4>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                              {status.label}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span className="flex items-center gap-1">
                              <FaCalendarAlt className="text-blue-400" />
                              {new Date(entry.date).toLocaleDateString()}
                            </span>
                            <span>•</span>
                            <span>{entry.total || 0} questions</span>
                            {entry.timeTaken && (
                              <>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <FaClock className="text-amber-400" />
                                  {Math.floor(entry.timeTaken / 60)}m {entry.timeTaken % 60}s
                                </span>
                              </>
                            )}
                            {entry.attemptNumber && (
                              <>
                                <span>•</span>
                                <span>Attempt #{entry.attemptNumber}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${getScoreColor(entry.score)}`}>
                              {entry.score}%
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {entry.correct || entry.passed || 0} correct
                            </div>
                          </div>
                          <div className="w-24 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                entry.score >= 90 ? 'bg-emerald-500' :
                                entry.score >= 70 ? 'bg-blue-500' :
                                entry.score >= 50 ? 'bg-amber-500' :
                                'bg-rose-500'
                              }`}
                              style={{ width: `${entry.score}%` }}
                            />
                          </div>
                          <button
                            onClick={() => setExpandedAttempt(isExpanded ? null : index)}
                            className="p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-600/50 transition-colors"
                          >
                            {isExpanded ? (
                              <FaChevronUp className="text-gray-400" />
                            ) : (
                              <FaChevronDown className="text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-600/50"
                          >
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              <div className="p-3 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 text-center">
                                <div className="text-lg font-bold text-emerald-500">
                                  {entry.passed || entry.correct || 0}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Correct</div>
                              </div>
                              <div className="p-3 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 text-center">
                                <div className="text-lg font-bold text-rose-500">
                                  {entry.failed || 0}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Wrong</div>
                              </div>
                              <div className="p-3 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 text-center">
                                <div className="text-lg font-bold text-amber-500">
                                  {entry.unanswered || 0}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Unanswered</div>
                              </div>
                              <div className="p-3 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 text-center">
                                <div className="text-lg font-bold text-blue-500">
                                  {entry.total || 0}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-3 mt-4">
                              <button
                                onClick={() => handleViewAttemptDetails(entry, index)}
                                className="px-4 py-2 bg-blue-100/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl text-sm font-medium hover:bg-blue-200/50 dark:hover:bg-blue-900/30 transition-colors flex items-center gap-2 border border-blue-200/50 dark:border-blue-700/30"
                              >
                                <FaInfoCircle className="text-xs" />
                                View Details
                              </button>
                              {hasQuestions && (
                                <button
                                  onClick={() => handleReviewAttempt(entry)}
                                  className="px-4 py-2 bg-purple-100/50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-xl text-sm font-medium hover:bg-purple-200/50 dark:hover:bg-purple-900/30 transition-colors flex items-center gap-2 border border-purple-200/50 dark:border-purple-700/30"
                                >
                                  <FaView className="text-xs" />
                                  Review Answers
                                </button>
                              )}
                              {!hasQuestions && (
                                <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                                  <FaInfoCircle className="text-xs" />
                                  Questions not available for this attempt
                                </span>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Favorite Quizzes - Enhanced */}
        {favoriteQuizzes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative overflow-hidden rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg p-6 mt-8"
          >
            {/* Decorative Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500" />

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-yellow-100/50 dark:bg-yellow-900/20 rounded-xl">
                <FaStar className="text-yellow-500 text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  ⭐ Favorite Quizzes
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
                  className="group relative overflow-hidden rounded-xl bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-700/50 p-4 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => navigate('/app')}
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
      </motion.div>

      {/* Attempt Details Modal */}
      <AnimatePresence>
        {showAttemptDetails && selectedAttempt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowAttemptDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                      {selectedAttempt.quizTitle || 'Quiz Attempt Details'}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(selectedAttempt.date).toLocaleDateString()} • Attempt #{selectedAttempt.index + 1}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAttemptDetails(false)}
                    className="p-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <FaTimes className="text-gray-400 text-xl" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-700/50 text-center">
                    <div className={`text-3xl font-bold ${getScoreColor(selectedAttempt.score)}`}>
                      {selectedAttempt.score}%
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Score</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-700/50 text-center">
                    <div className="text-3xl font-bold text-emerald-500">
                      {selectedAttempt.passed || selectedAttempt.correct || 0}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Correct</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-700/50 text-center">
                    <div className="text-3xl font-bold text-rose-500">
                      {selectedAttempt.failed || 0}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Wrong</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-700/50 text-center">
                    <div className="text-3xl font-bold text-amber-500">
                      {selectedAttempt.unanswered || 0}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Unanswered</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-700/50 text-center">
                    <div className="text-3xl font-bold text-purple-500">
                      {selectedAttempt.total || 0}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-700/50 text-center">
                    <div className="text-3xl font-bold">
                      {selectedAttempt.score >= 90 ? '✅' : '❌'}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {selectedAttempt.score >= 90 ? 'Passed' : 'Failed'}
                    </div>
                  </div>
                </div>

                {selectedAttempt.timeTaken && (
                  <div className="mb-4 p-3 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-700/50 flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Time Taken</span>
                    <span className="font-mono font-semibold text-gray-800 dark:text-gray-200">
                      {Math.floor(selectedAttempt.timeTaken / 60)}m {selectedAttempt.timeTaken % 60}s
                    </span>
                  </div>
                )}

                <div className="flex gap-3">
                  {selectedAttempt.questions && selectedAttempt.questions.length > 0 && (
                    <button
                      onClick={() => {
                        setShowAttemptDetails(false);
                        handleReviewAttempt(selectedAttempt);
                      }}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-medium shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <FaView className="text-sm" />
                      Review Answers
                    </button>
                  )}
                  <button
                    onClick={() => setShowAttemptDetails(false)}
                    className="flex-1 px-6 py-3 bg-gray-100/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200/50 dark:hover:bg-gray-600/50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Profile;