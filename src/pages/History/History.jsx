// pages/History/History.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaFilter, FaSort, FaCalendar, FaSearch, FaClock,
  FaCheckCircle, FaTimesCircle, FaEye, FaInfoCircle,
  FaChevronDown, FaChevronUp, FaArrowRight, FaTimes,
  FaSpinner, FaQuestionCircle, FaBookOpen, FaChartBar,
  FaArrowLeft
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext.jsx';
import { useQuiz } from '../../context/QuizContext.jsx';
import ReviewMode from '../../components/Quiz/ReviewMode.jsx';
import toast from 'react-hot-toast';

function History() {
  const navigate = useNavigate();
  const { student } = useAuth();
  const { setReviewing } = useQuiz();
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedAttempt, setExpandedAttempt] = useState(null);
  const [selectedAttempt, setSelectedAttempt] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState(null);
  const [loadingReview, setLoadingReview] = useState(false);
  const [reviewError, setReviewError] = useState(null);

  const history = student?.quizHistory || [];

  // Debug: Log history data
  useEffect(() => {
    console.log('📚 History Data:', history);
    console.log('📊 Total attempts:', history.length);
  }, [history]);

  // Check if an attempt has review data available
  const hasReviewData = (attempt) => {
    // Check if questions are directly on the attempt
    if (attempt.questions && attempt.questions.length > 0 && attempt.answers) {
      return true;
    }
    
    // Check if we have a saved attempt in localStorage
    if (attempt.id) {
      const attemptKey = `attempt_${attempt.id}`;
      const savedData = localStorage.getItem(attemptKey);
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          if (parsed.questions && parsed.questions.length > 0) {
            return true;
          }
        } catch (e) {
          // Ignore parse errors
        }
      }
    }
    
    // Check if we have a review stored
    if (attempt.id) {
      const reviewKey = `review_${attempt.id}`;
      const savedReview = localStorage.getItem(reviewKey);
      if (savedReview) {
        try {
          const parsed = JSON.parse(savedReview);
          if (parsed.questions && parsed.questions.length > 0) {
            return true;
          }
        } catch (e) {
          // Ignore parse errors
        }
      }
    }
    
    return false;
  };

  const filteredHistory = useMemo(() => {
    let filtered = [...history];

    if (filter === 'passed') {
      filtered = filtered.filter(h => h.score >= 90);
    } else if (filter === 'failed') {
      filtered = filtered.filter(h => h.score < 90);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(h => 
        h.quizTitle?.toLowerCase().includes(term)
      );
    }

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

  const stats = {
    total: history.length,
    passed: history.filter(h => h.score >= 90).length,
    failed: history.filter(h => h.score < 90).length,
    average: history.length > 0 
      ? Math.round(history.reduce((acc, h) => acc + h.score, 0) / history.length)
      : 0,
  };

  // Load review data for a specific attempt
  const loadAttemptReview = (attempt, index) => {
    console.log('🔍 Loading review for attempt:', { attempt, index });
    setLoadingReview(true);
    setReviewError(null);
    
    try {
      // Store the attempt info for the modal header
      setSelectedAttempt({ ...attempt, index });
      
      // METHOD 1: Check if the attempt has questions and answers stored directly
      if (attempt.questions && attempt.questions.length > 0 && attempt.answers) {
        console.log('✅ Found questions/answers directly in attempt');
        setReviewData({
          questions: attempt.questions,
          answers: attempt.answers,
        });
        setShowReviewModal(true);
        setLoadingReview(false);
        return;
      }

      // METHOD 2: Check for review_ prefixed data
      if (attempt.id) {
        const reviewKey = `review_${attempt.id}`;
        const savedReview = localStorage.getItem(reviewKey);
        console.log(`🔍 Looking for key: ${reviewKey}`, savedReview ? 'Found' : 'Not found');
        
        if (savedReview) {
          try {
            const parsed = JSON.parse(savedReview);
            console.log('✅ Loaded review data:', parsed);
            if (parsed.questions && parsed.answers) {
              setReviewData({
                questions: parsed.questions,
                answers: parsed.answers,
              });
              setShowReviewModal(true);
              setLoadingReview(false);
              return;
            }
          } catch (e) {
            console.error('Error parsing review data:', e);
          }
        }
      }

      // METHOD 3: Check for attempt_ prefixed data
      if (attempt.id) {
        const attemptKey = `attempt_${attempt.id}`;
        const savedData = localStorage.getItem(attemptKey);
        console.log(`🔍 Looking for key: ${attemptKey}`, savedData ? 'Found' : 'Not found');
        
        if (savedData) {
          try {
            const parsed = JSON.parse(savedData);
            console.log('✅ Loaded attempt data:', parsed);
            if (parsed.questions && parsed.answers) {
              setReviewData({
                questions: parsed.questions,
                answers: parsed.answers,
              });
              setShowReviewModal(true);
              setLoadingReview(false);
              return;
            }
          } catch (e) {
            console.error('Error parsing saved data:', e);
          }
        }
      }

      // METHOD 4: Try to get questions from the quiz in localStorage
      if (attempt.quizId) {
        const savedQuestions = localStorage.getItem(`questions_${attempt.quizId}`);
        console.log(`🔍 Looking for questions_${attempt.quizId}`, savedQuestions ? 'Found' : 'Not found');
        
        if (savedQuestions) {
          try {
            const questions = JSON.parse(savedQuestions);
            console.log('✅ Loaded questions from localStorage:', questions.length);
            setReviewData({
              questions: questions,
              answers: attempt.answers || {},
            });
            setShowReviewModal(true);
            setLoadingReview(false);
            return;
          } catch (e) {
            console.error('Error parsing questions:', e);
          }
        }
      }

      // If we get here, we couldn't load the review data
      console.log('❌ All methods failed to load review data');
      setReviewError('Unable to load detailed review data for this attempt. The questions may no longer be available.');
      setLoadingReview(false);
      
    } catch (error) {
      console.error('Error loading review data:', error);
      setReviewError('Failed to load review data. Please try again.');
      setLoadingReview(false);
    }
  };

  const handleViewDetails = (attempt, index) => {
    console.log('👁️ View Details clicked for attempt:', attempt);
    // Close any expanded attempt
    setExpandedAttempt(null);
    // Load the review data
    loadAttemptReview(attempt, index);
  };

  const handleCloseModal = () => {
    setShowReviewModal(false);
    setSelectedAttempt(null);
    setReviewData(null);
    setReviewError(null);
  };

  const handleBackToDashboard = () => {
    navigate('/app');
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape' && showReviewModal) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showReviewModal]);

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-500';
    if (score >= 70) return 'text-blue-500';
    if (score >= 50) return 'text-amber-500';
    return 'text-rose-500';
  };

  const toggleExpand = (index) => {
    setExpandedAttempt(expandedAttempt === index ? null : index);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Back Button and Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={handleBackToDashboard}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-all duration-300 group hover:shadow-md"
            >
              <FaArrowLeft className="text-sm text-gray-500 group-hover:text-blue-500 transition-colors" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-blue-500 transition-colors">
                Back
              </span>
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl">
                <FaCalendar className="text-blue-500 text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                  Quiz History
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Review all your quiz attempts and performance
                </p>
              </div>
            </div>
          </div>

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
            <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl">
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
            <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl">
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
            <div className="glassmorphism card-shadow rounded-2xl p-12 text-center">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                {history.length === 0 ? 'No quiz history yet' : 'No matches found'}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                {history.length === 0 
                  ? 'Start taking quizzes to build your history' 
                  : 'Try adjusting your search or filter criteria'}
              </p>
              {history.length === 0 && (
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
                const isExpanded = expandedAttempt === index;
                const hasData = hasReviewData(entry);

                return (
                  <motion.div
                    key={entry.id || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(index * 0.03, 0.5) }}
                    className="glassmorphism card-shadow rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-800 dark:text-gray-200 truncate">
                            {entry.quizTitle || 'Untitled Quiz'}
                          </h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            entry.score >= 90 
                              ? 'bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' 
                              : 'bg-rose-100/50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'
                          }`}>
                            {entry.score >= 90 ? '✅ Passed' : '❌ Failed'}
                          </span>
                          {hasData && (
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100/50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                              📝 Review Available
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <span className="flex items-center gap-1">
                            <FaCalendar className="text-blue-400" />
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
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(entry, index);
                          }}
                          className="px-4 py-2 bg-blue-100/50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl text-sm font-medium hover:bg-blue-200/50 dark:hover:bg-blue-900/30 transition-colors flex items-center gap-2 border border-blue-200/50 dark:border-blue-700/30 whitespace-nowrap"
                        >
                          <FaEye className="text-xs" />
                          View Details
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(index);
                          }}
                          className="p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors"
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
                          className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50"
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
                          {!hasData && (
                            <div className="mt-3 p-3 rounded-xl bg-amber-50/50 dark:bg-amber-900/20 border border-amber-200/50 dark:border-amber-700/30 text-center">
                              <p className="text-sm text-amber-600 dark:text-amber-400">
                                ℹ️ Review data not available for older attempts. New quiz attempts will have full review data.
                              </p>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {showReviewModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200/50 dark:border-gray-700/50 p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl">
                      <FaBookOpen className="text-blue-500 text-xl" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                        Review Quiz Attempt
                      </h2>
                      {selectedAttempt && (
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {selectedAttempt.quizTitle}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                          <span>Attempt #{selectedAttempt.index + 1}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                          <span className="font-semibold">
                            {selectedAttempt.score}%
                          </span>
                          <span className={selectedAttempt.score >= 90 ? 'text-emerald-500' : 'text-rose-500'}>
                            {selectedAttempt.score >= 90 ? '✅ Passed' : '❌ Failed'}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                          <span className="text-xs">
                            {new Date(selectedAttempt.date).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="p-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors group"
                  >
                    <FaTimes className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 text-xl" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-4 md:p-6">
                {loadingReview ? (
                  <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="text-center">
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-purple-200 dark:border-purple-800 rounded-full animate-spin border-t-purple-600 dark:border-t-purple-400"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <FaSpinner className="text-purple-600 dark:text-purple-400 text-2xl animate-pulse" />
                        </div>
                      </div>
                      <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">Loading quiz details...</p>
                      <p className="text-sm text-gray-400 dark:text-gray-500">Preparing your review</p>
                    </div>
                  </div>
                ) : reviewError ? (
                  <div className="min-h-[40vh] flex items-center justify-center">
                    <div className="text-center max-w-md">
                      <div className="text-6xl mb-4">⚠️</div>
                      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                        Unable to load quiz details
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mt-2">
                        {reviewError}
                      </p>
                      <button
                        onClick={handleCloseModal}
                        className="mt-4 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ) : reviewData && reviewData.questions && reviewData.questions.length > 0 ? (
                  <ReviewMode
                    questions={reviewData.questions}
                    answers={reviewData.answers}
                    onClose={handleCloseModal}
                  />
                ) : (
                  <div className="min-h-[40vh] flex items-center justify-center">
                    <div className="text-center max-w-md">
                      <div className="text-6xl mb-4">📝</div>
                      <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                        No questions available
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 mt-2">
                        This attempt doesn't have any questions to review.
                      </p>
                      <button
                        onClick={handleCloseModal}
                        className="mt-4 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default History;