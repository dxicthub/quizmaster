import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaSearch, FaFilter, FaSort, FaClock, FaUser, 
  FaChartBar, FaEyeSlash, FaRocket, FaFire,
  FaBookOpen, FaGraduationCap, FaAward,
  FaArrowRight, FaSpinner, FaCheckCircle,
  FaStar, FaMedal, FaCrown, FaUserCircle,
  FaHistory, FaTrophy
} from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext.jsx';
import { useQuiz } from '../../context/QuizContext.jsx';
import QuizCard from '../../components/Dashboard/QuizCard.jsx';
import QuizSearch from '../../components/Dashboard/QuizSearch.jsx';
import QuizFilter from '../../components/Dashboard/QuizFilter.jsx';
import { quizCategories } from '../../data/quizCategories.js';
import { getQuestionsForQuiz } from '../../data/questionRegistry.js';

function Dashboard() {
  const navigate = useNavigate();
  const { student, isAuthenticated } = useAuth();
  const { state, selectQuiz, isFavorite, toggleFavorite, clearQuizState } = useQuiz();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [sortBy, setSortBy] = useState('Alphabetically');
  const [availableQuizzes, setAvailableQuizzes] = useState([]);
  const [loadingQuizzes, setLoadingQuizzes] = useState(true);

  // Debug: Check authentication status
  React.useEffect(() => {
    console.log('🔐 Dashboard - Auth Status:', { isAuthenticated, student: student?.fullName });
  }, [isAuthenticated, student]);

  // Load available quizzes (only visible ones)
  React.useEffect(() => {
    loadAvailableQuizzes();
  }, []);

  const loadAvailableQuizzes = () => {
    setLoadingQuizzes(true);
    try {
      const storedQuizzes = JSON.parse(localStorage.getItem('quizCategories') || '[]');
      const allQuizzes = [...quizCategories];
      
      storedQuizzes.forEach(stored => {
        const index = allQuizzes.findIndex(q => q.id === stored.id);
        if (index !== -1) {
          allQuizzes[index] = { ...allQuizzes[index], ...stored };
        } else {
          allQuizzes.push(stored);
        }
      });

      const visibleQuizzes = allQuizzes.filter(q => {
        const isVisible = q.isVisible !== false;
        const isPublished = !q.status || q.status === 'published' || q.status === 'draft';
        const isDefaultQuiz = quizCategories.some(c => c.id === q.id && !q.status);
        return isVisible && (isPublished || isDefaultQuiz);
      });

      setAvailableQuizzes(visibleQuizzes);
    } catch (error) {
      console.error('Error loading quizzes:', error);
      toast.error('Failed to load quizzes');
    } finally {
      setLoadingQuizzes(false);
    }
  };

  const recentlyTaken = state.recentlyTaken || [];
  const recentQuizzes = availableQuizzes.filter(q => recentlyTaken.includes(q.id));

  const filteredQuizzes = useMemo(() => {
    let filtered = [...availableQuizzes];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(q => 
        q.title.toLowerCase().includes(term) ||
        q.description.toLowerCase().includes(term) ||
        q.difficulty.toLowerCase().includes(term) ||
        q.tags?.some(tag => tag.toLowerCase().includes(term))
      );
    }

    if (filterDifficulty !== 'All') {
      filtered = filtered.filter(q => q.difficulty === filterDifficulty);
    }

    switch (sortBy) {
      case 'Alphabetically':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'Difficulty':
        const difficultyOrder = { 'Beginner': 0, 'Intermediate': 1, 'Advanced': 2 };
        filtered.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
        break;
      case 'Newest':
        filtered.sort((a, b) => b.id?.localeCompare(a.id) || 0);
        break;
      default:
        break;
    }

    return filtered;
  }, [availableQuizzes, searchTerm, filterDifficulty, sortBy]);

  const handleSelectQuiz = (quiz) => {
    console.log('🎯 Quiz selected:', { 
      id: quiz.id, 
      title: quiz.title, 
      questionFile: quiz.questionFile,
      isAuthenticated: isAuthenticated,
      student: student?.fullName
    });

    if (!isAuthenticated) {
      console.warn('⚠️ User not authenticated, redirecting to landing page');
      toast.error('Please login to take a quiz');
      navigate('/');
      return;
    }

    if (!quiz.questionFile && !quiz.questions) {
      toast.error('This quiz has no questions. Please contact the administrator.');
      return;
    }

    // First check if questions exist in localStorage (from Question Manager)
    const savedQuestions = localStorage.getItem(`questions_${quiz.id}`);
    let questions = [];
    
    if (savedQuestions) {
      try {
        questions = JSON.parse(savedQuestions);
        console.log('✅ Loaded questions from localStorage:', questions.length);
      } catch (e) {
        console.error('❌ Error parsing saved questions:', e);
      }
    }
    
    const goToQuiz = (quizWithQuestions) => {
      selectQuiz(quizWithQuestions);
      console.log('🚀 Navigating to quiz:', `/app/quiz/${quiz.id}`);
      navigate(`/app/quiz/${quiz.id}`);
    };

    // If no questions in localStorage, try loading from the static registry
    if (!questions || questions.length === 0) {
      // Try to get questions from the registry
      const fileQuestions = getQuestionsForQuiz(quiz.questionFile);
      
      if (fileQuestions && fileQuestions.length > 0) {
        console.log('✅ Loaded questions from registry:', fileQuestions.length);
        goToQuiz({ ...quiz, questions: fileQuestions });
      } else if (quiz.questions && quiz.questions.length > 0) {
        // Use questions from the quiz object if available
        goToQuiz({ ...quiz, questions: quiz.questions });
      } else {
        toast.error(`"${quiz.title}" has no questions. Please contact the administrator.`);
      }
    } else {
      // Use questions from localStorage
      console.log('✅ Using questions from localStorage:', questions.length);
      goToQuiz({ ...quiz, questions });
    }
  };

  const hiddenQuizzesCount = quizCategories.length - availableQuizzes.length;
  const totalAttempts = student?.quizHistory?.length || 0;
  const passedAttempts = student?.quizHistory?.filter(h => h.score >= 90).length || 0;
  const avgScore = totalAttempts > 0 
    ? Math.round(student.quizHistory.reduce((acc, h) => acc + h.score, 0) / totalAttempts)
    : 0;

  if (loadingQuizzes) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-200 dark:border-purple-800 rounded-full animate-spin border-t-purple-600 dark:border-t-purple-400"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaSpinner className="text-purple-600 dark:text-purple-400 text-2xl animate-pulse" />
            </div>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">Loading quizzes...</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">Preparing your learning journey</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300/10 dark:bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300/5 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Welcome Section - Enhanced */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur-xl opacity-20 animate-pulse" />
                  <div className="relative p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl shadow-blue-500/30">
                    <FaRocket className="text-white text-2xl" />
                  </div>
                </div>
                <div>
                  
                  <p className="text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    Select a quiz to test your knowledge and track your progress
                  </p>
                  {hiddenQuizzesCount > 0 && (
                    <p className="text-sm text-amber-500 dark:text-amber-400 mt-1 flex items-center gap-2">
                      <FaEyeSlash className="text-sm" />
                      {hiddenQuizzesCount} quiz(es) are currently hidden by the administrator
                    </p>
                  )}
                </div>
              </div>
              
              {student && (
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                    <FaBookOpen className="text-blue-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {totalAttempts} Taken
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                    <FaCheckCircle className="text-emerald-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {passedAttempts} Passed
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                    <FaChartBar className="text-purple-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {avgScore}% Avg Score
                    </span>
                  </div>
                  {/* My Details Button - NEW */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/app/profile')}
                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300"
                  >
                    <FaUserCircle className="text-lg" />
                    <span className="text-sm font-medium">My Details</span>
                  </motion.button>
                </div>
              )}
            </div>
          </div>

          {/* Stats Cards - Premium */}
          {student && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Quizzes Taken', value: totalAttempts, icon: FaBookOpen, color: 'blue', gradient: 'from-blue-500 to-indigo-500' },
                { label: 'Passed', value: passedAttempts, icon: FaCheckCircle, color: 'emerald', gradient: 'from-emerald-500 to-teal-500' },
                { label: 'Avg Score', value: `${avgScore}%`, icon: FaAward, color: 'purple', gradient: 'from-purple-500 to-violet-500' },
                { label: 'Available Quizzes', value: availableQuizzes.length, icon: FaFire, color: 'orange', gradient: 'from-orange-500 to-amber-500' },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="group relative overflow-hidden rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => {
                      if (index === 3) return; // Available quizzes
                      navigate('/app/profile');
                    }}
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
          )}

          {/* Quick Action Cards - NEW */}
          {student && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
            >
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => navigate('/app/profile')}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/30 p-4 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                <div className="relative flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg">
                    <FaUserCircle className="text-white text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">My Profile</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">View your details and statistics</p>
                  </div>
                  <FaArrowRight className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => navigate('/app/history')}
                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 backdrop-blur-sm border border-purple-200/50 dark:border-purple-700/30 p-4 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                <div className="relative flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                    <FaHistory className="text-white text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">Quiz History</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">View all your quiz attempts</p>
                  </div>
                  <FaArrowRight className="text-gray-400 group-hover:text-purple-500 transition-colors" />
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Recently Taken Section - Enhanced */}
          {recentQuizzes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100/50 dark:bg-blue-900/20 rounded-xl">
                  <FaClock className="text-blue-500 text-xl" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Recently Taken
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Continue where you left off
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {recentQuizzes.map((quiz) => (
                  <QuizCard
                    key={quiz.id}
                    quiz={quiz}
                    onSelect={handleSelectQuiz}
                    isFavorite={isFavorite(quiz.id)}
                    onToggleFavorite={toggleFavorite}
                    compact
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Search and Filters - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col md:flex-row gap-4 mb-6"
          >
            <div className="flex-1">
              <QuizSearch 
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <QuizFilter
                filterDifficulty={filterDifficulty}
                onFilterChange={setFilterDifficulty}
              />
              <div className="flex items-center gap-2 px-4 py-2.5 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                <FaSort className="text-gray-500 dark:text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-gray-700 dark:text-gray-300 text-sm focus:outline-none cursor-pointer"
                >
                  <option value="Alphabetically">📚 Alphabetically</option>
                  <option value="Difficulty">📊 Difficulty</option>
                  <option value="Newest">✨ Newest</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Quiz Grid - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {filteredQuizzes.map((quiz, index) => (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  onSelect={handleSelectQuiz}
                  isFavorite={isFavorite(quiz.id)}
                  onToggleFavorite={toggleFavorite}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State - Enhanced */}
          {filteredQuizzes.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
                No quizzes available
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
                {availableQuizzes.length === 0 
                  ? 'No quizzes are currently available. Please check back later.' 
                  : 'Try adjusting your search or filter criteria to find what you\'re looking for.'}
              </p>
              {(searchTerm || filterDifficulty !== 'All') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterDifficulty('All');
                    setSortBy('Alphabetically');
                  }}
                  className="mt-4 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                >
                  Clear Filters
                </button>
              )}
            </motion.div>
          )}

          {/* Quiz Count - Enhanced */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Showing <span className="font-semibold text-gray-700 dark:text-gray-300">{filteredQuizzes.length}</span> of{' '}
                <span className="font-semibold text-gray-700 dark:text-gray-300">{availableQuizzes.length}</span> available quizzes
                {hiddenQuizzesCount > 0 && (
                  <span className="text-amber-500 dark:text-amber-400"> ({hiddenQuizzesCount} hidden)</span>
                )}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Dashboard;