// pages/Results/ResultsPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCheckCircle, FaTimesCircle, FaHome, FaRedo, FaList, 
  FaDownload, FaStar, FaClock, FaUser, FaBook,
  FaTrophy, FaMedal, FaAward, FaRocket, FaFire,
  FaSpinner, FaArrowLeft, FaArrowRight, FaCrown,
  FaGraduationCap, FaCertificate, FaChartBar
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext.jsx';
import { useQuiz } from '../../context/QuizContext.jsx';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

function ResultsPage() {
  const navigate = useNavigate();
  const { student } = useAuth();
  const { 
    state, 
    getResults, 
    restartQuiz, 
    clearQuizState, 
    setReviewing,
    setReviewQuestions,
    selectQuiz,
    startQuiz
  } = useQuiz();
  const results = getResults();
  const passed = results.passed;
  const failed = results.failed;
  const total = results.total;
  const percentage = results.percentage;
  const passedQuiz = percentage >= 90;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    // ✅ UPDATED: Only show success toast, remove the failure message
    if (passedQuiz) {
      toast.success('🎉 Congratulations! You passed the quiz!', {
        duration: 4000,
        position: 'top-center',
      });
    }
    // ❌ REMOVED: The "Sorry, you didn't pass" toast message
  }, []);

  const handleRetakeQuiz = () => {
    Swal.fire({
      title: '🔄 Retake Quiz?',
      text: 'This will start a fresh attempt. Your previous score will be saved in your history.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#8b5cf6',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, retake',
      cancelButtonText: 'Cancel',
      backdrop: 'rgba(0,0,0,0.5)',
      customClass: {
        popup: 'rounded-2xl shadow-2xl',
        confirmButton: 'px-6 py-2.5 rounded-xl font-semibold',
        cancelButton: 'px-6 py-2.5 rounded-xl font-semibold'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Store the quiz info before clearing
        const quizId = state.selectedQuiz?.id;
        const quizTitle = state.selectedQuiz?.title;
        
        // Clear current state
        clearQuizState();
        
        // Find the quiz in available quizzes and select it
        const storedQuizzes = JSON.parse(localStorage.getItem('quizCategories') || '[]');
        const quiz = storedQuizzes.find(q => q.id === quizId) || 
                     state.selectedQuiz;
        
        if (quiz) {
          // Select the quiz and start it fresh
          selectQuiz(quiz);
          
          // Navigate to the quiz with retake flag
          navigate(`/app/quiz/${quizId}?retake=true`);
          toast.info('🔄 Retaking quiz - fresh attempt started!');
        } else {
          toast.error('Unable to find quiz. Please try again.');
        }
      }
    });
  };

  const handleReview = () => {
    // Store the current attempt data for review
    const reviewData = {
      questions: state.questions || [],
      answers: state.answers || {},
    };
    
    // Save review data to localStorage for persistence
    localStorage.setItem('reviewData', JSON.stringify(reviewData));
    
    // Navigate to review mode
    setReviewing(true);
    navigate('/app/review');
    toast.info('📋 Reviewing your answers');
  };

  const handleGoDashboard = () => {
    clearQuizState();
    navigate('/app');
  };

  const handleDownloadCertificate = () => {
    const certificateHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Certificate of Completion</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              background: #0a0a1a;
              font-family: 'Georgia', serif;
            }
            .certificate {
              width: 900px;
              padding: 60px;
              background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
              border-radius: 24px;
              text-align: center;
              color: white;
              border: 3px solid #f9d423;
              box-shadow: 0 30px 80px rgba(249, 212, 35, 0.2);
              position: relative;
              overflow: hidden;
            }
            .certificate::before {
              content: '';
              position: absolute;
              top: -50%;
              left: -50%;
              width: 200%;
              height: 200%;
              background: conic-gradient(from 0deg, transparent, rgba(249, 212, 35, 0.05), transparent, rgba(249, 212, 35, 0.05), transparent);
              animation: rotate 10s linear infinite;
            }
            @keyframes rotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .certificate-content {
              position: relative;
              z-index: 1;
            }
            .certificate .icon { font-size: 56px; margin-bottom: 16px; }
            .certificate h1 {
              font-size: 40px;
              color: #f9d423;
              margin-bottom: 8px;
              letter-spacing: 2px;
            }
            .certificate .divider {
              width: 200px;
              height: 2px;
              background: linear-gradient(to right, transparent, #f9d423, transparent);
              margin: 16px auto;
            }
            .certificate .subtitle {
              font-size: 18px;
              color: #a8a8a8;
              margin-bottom: 4px;
            }
            .certificate .name {
              font-size: 36px;
              color: #fff;
              margin: 16px 0;
              font-weight: bold;
              text-shadow: 0 0 30px rgba(249, 212, 35, 0.2);
            }
            .certificate .quiz-title {
              font-size: 24px;
              color: #f9d423;
              margin: 8px 0;
            }
            .certificate .stats {
              display: flex;
              justify-content: center;
              gap: 60px;
              margin: 30px 0;
            }
            .certificate .stat-item {
              text-align: center;
            }
            .certificate .stat-value {
              font-size: 32px;
              color: #4ade80;
              font-weight: bold;
            }
            .certificate .stat-label {
              font-size: 14px;
              color: #a8a8a8;
              margin-top: 4px;
            }
            .certificate .date {
              font-size: 16px;
              color: #f9d423;
              margin: 16px 0;
            }
            .certificate .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid rgba(255,255,255,0.1);
              font-size: 12px;
              color: #666;
            }
            .certificate .badge {
              display: inline-block;
              padding: 4px 16px;
              background: rgba(249, 212, 35, 0.2);
              border: 1px solid #f9d423;
              border-radius: 20px;
              color: #f9d423;
              font-size: 14px;
              margin-top: 8px;
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="certificate-content">
              <div class="icon">🎓</div>
              <h1>CERTIFICATE OF COMPLETION</h1>
              <div class="divider"></div>
              <p class="subtitle">This certificate is proudly presented to</p>
              <div class="name">${student?.fullName || 'Student'}</div>
              <p class="subtitle">for successfully completing the</p>
              <div class="quiz-title">${results.quizTitle || 'Quiz'}</div>
              <div class="badge">⭐ Excellent Performance</div>
              <div class="stats">
                <div class="stat-item">
                  <div class="stat-value">${results.percentage.toFixed(1)}%</div>
                  <div class="stat-label">Score</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">${results.passed}/${results.total}</div>
                  <div class="stat-label">Correct</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                  <div class="stat-label">Date</div>
                </div>
              </div>
              <div class="footer">
                <p>Certificate ID: ${'QZ-' + Date.now().toString(36).toUpperCase()}</p>
                <p style="margin-top: 4px;">© ${new Date().getFullYear()} JEO Digital Solutions</p>
              </div>
            </div>
          </div>
          <script>
            setTimeout(() => {
              window.print();
            }, 800);
          </script>
        </body>
      </html>
    `;

    const win = window.open('', '_blank');
    win.document.write(certificateHTML);
    win.document.close();
  };

  // ✅ UPDATED: Removed negative messaging, kept only positive/neutral messages
  const getPerformanceMessage = () => {
    if (percentage >= 90) return '🎉 Outstanding Performance! Excellent Work!';
    if (percentage >= 80) return '👏 Great Job! Keep Practicing!';
    if (percentage >= 70) return '💪 Good Effort! Review and Try Again!';
    if (percentage >= 60) return '📚 Keep Learning! You\'re Making Progress!';
    return '💪 Keep Going! Every Attempt Makes You Stronger!';
  };

  const getPerformanceColor = () => {
    if (percentage >= 90) return 'text-emerald-500';
    if (percentage >= 80) return 'text-blue-500';
    if (percentage >= 70) return 'text-amber-500';
    if (percentage >= 60) return 'text-orange-500';
    return 'text-purple-500';
  };

  const getPerformanceGradient = () => {
    if (percentage >= 90) return 'from-emerald-500 to-teal-500';
    if (percentage >= 80) return 'from-blue-500 to-indigo-500';
    if (percentage >= 70) return 'from-amber-500 to-orange-500';
    if (percentage >= 60) return 'from-orange-500 to-red-500';
    return 'from-purple-500 to-indigo-500';
  };

  const getCardBackground = () => {
    if (passedQuiz) {
      return 'bg-gradient-to-br from-emerald-500/20 via-emerald-400/10 to-transparent border-emerald-500/40';
    }
    return 'bg-gradient-to-br from-purple-500/20 via-indigo-400/10 to-transparent border-purple-500/40';
  };

  const getEmoji = () => {
    if (percentage >= 90) return '🏆';
    if (percentage >= 80) return '🌟';
    if (percentage >= 70) return '💪';
    if (percentage >= 60) return '📚';
    return '🚀';
  };

  const getPerformanceLevel = () => {
    if (percentage >= 90) return { label: 'Elite', icon: FaCrown, color: 'text-yellow-500' };
    if (percentage >= 80) return { label: 'Pro', icon: FaMedal, color: 'text-blue-500' };
    if (percentage >= 70) return { label: 'Advanced', icon: FaRocket, color: 'text-amber-500' };
    if (percentage >= 60) return { label: 'Intermediate', icon: FaGraduationCap, color: 'text-orange-500' };
    return { label: 'Growing', icon: FaBook, color: 'text-purple-500' };
  };

  const formatTime = (totalSeconds) => {
    if (!totalSeconds) return '0m 0s';
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    }
    return `${minutes}m ${seconds}s`;
  };

  const performanceLevel = getPerformanceLevel();
  const LevelIcon = performanceLevel.icon;

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-200 dark:border-purple-800 rounded-full animate-spin border-t-purple-600 dark:border-t-purple-400"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <FaSpinner className="text-purple-600 dark:text-purple-400 text-2xl animate-pulse" />
            </div>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">Loading results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 p-4 md:p-6">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300/10 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-300/5 dark:bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl"
        >
          {/* Decorative Gradient Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />

          <div className="p-8 md:p-12">
            {/* Header */}
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="mb-4"
              >
                <div className="relative w-28 h-28 mx-auto">
                  <div className={`absolute inset-0 bg-gradient-to-r ${getPerformanceGradient()} rounded-full blur-2xl opacity-30 animate-pulse`} />
                  <div className={`relative w-28 h-28 rounded-full bg-gradient-to-br ${getPerformanceGradient()} flex items-center justify-center shadow-2xl`}>
                    <span className="text-6xl">{getEmoji()}</span>
                  </div>
                </div>
              </motion.div>

              <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
                Quiz Complete!
              </h1>
              
              <div className="flex flex-wrap items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
                {student && (
                  <span className="flex items-center gap-1.5">
                    <FaUser className="text-blue-500" />
                    {student.fullName}
                  </span>
                )}
                <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                <span className="flex items-center gap-1.5">
                  <FaBook className="text-purple-500" />
                  {results.quizTitle || 'Quiz'}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                <span className="flex items-center gap-1.5">
                  <FaClock className="text-blue-500" />
                  {formatTime(results.timeTaken || state.timer || 0)}
                </span>
              </div>
              
              <div className="h-1 w-24 mx-auto bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-3" />
            </div>

            {/* Performance Level Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 }}
              className="flex justify-center mb-6"
            >
              <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r ${getPerformanceGradient()} text-white shadow-lg`}>
                <LevelIcon className="text-lg" />
                <span className="font-semibold">{performanceLevel.label}</span>
                <span className="w-px h-4 bg-white/30" />
                <span className="text-sm opacity-90">{percentage.toFixed(1)}%</span>
              </div>
            </motion.div>

            {/* Result card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`rounded-2xl p-8 border-2 ${getCardBackground()} mb-8`}
            >
              <div className="text-center mb-6">
                <div className={`text-6xl font-bold mb-2 ${getPerformanceColor()}`}>
                  {percentage.toFixed(1)}%
                </div>
                <div className={`text-2xl font-semibold ${passedQuiz ? 'text-emerald-600 dark:text-emerald-400' : 'text-purple-600 dark:text-purple-400'}`}>
                  {getPerformanceMessage()}
                </div>
                <div className="mt-2 flex items-center justify-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    passedQuiz 
                      ? 'bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-700/30' 
                      : 'bg-purple-100/50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200/50 dark:border-purple-700/30'
                  }`}>
                    {passedQuiz ? '✅ Passed' : '📈 Keep Learning!'}
                  </span>
                  <span>Passing Score: 90%</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden mb-6">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${getPerformanceGradient()}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center p-4 rounded-xl bg-white/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-700/50"
                >
                  <div className="text-2xl font-bold text-blue-500">{total}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200/50 dark:border-emerald-700/30"
                >
                  <div className="text-2xl font-bold text-emerald-500">{passed}</div>
                  <div className="text-sm text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1">
                    <FaCheckCircle className="text-xs" />
                    Correct
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-center p-4 rounded-xl bg-gradient-to-br from-rose-50/50 to-red-50/50 dark:from-rose-900/20 dark:to-red-900/20 border border-rose-200/50 dark:border-rose-700/30"
                >
                  <div className="text-2xl font-bold text-rose-500">{failed}</div>
                  <div className="text-sm text-rose-600 dark:text-rose-400 flex items-center justify-center gap-1">
                    <FaTimesCircle className="text-xs" />
                    Wrong
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="text-center p-4 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-700/50"
                >
                  <div className="text-2xl font-bold text-gray-500">{results.unanswered || 0}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Unanswered</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGoDashboard}
                className="px-6 py-3 rounded-xl font-medium bg-gray-100/50 dark:bg-gray-700/50 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 text-gray-700 dark:text-gray-300 transition-all duration-300 flex items-center gap-2 border border-gray-200/50 dark:border-gray-700/50"
              >
                <FaHome />
                Dashboard
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReview}
                className="px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-blue-500 to-indigo-500 text-white transition-all duration-300 flex items-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
              >
                <FaList />
                Review Answers
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRetakeQuiz}
                className="px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-purple-500 to-violet-500 text-white transition-all duration-300 flex items-center gap-2 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
              >
                <FaRedo />
                Retake Quiz
              </motion.button>

              {passedQuiz && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownloadCertificate}
                  className="px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-yellow-500 to-amber-500 text-white transition-all duration-300 flex items-center gap-2 shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50"
                >
                  <FaDownload />
                  Certificate
                </motion.button>
              )}
            </motion.div>

            {/* Additional info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400"
            >
              <div className="flex flex-wrap items-center justify-center gap-4">
                <span className="flex items-center gap-1.5">
                  <FaClock className="text-blue-500" />
                  Time taken: {formatTime(state.timer || 0)}
                </span>
                <span className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
                <span className="flex items-center gap-1.5">
                  <FaChartBar className="text-purple-500" />
                  Score: {passed}/{total} correct answers
                </span>
                {passedQuiz && (
                  <>
                    <span className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
                    <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <FaCertificate className="text-emerald-500" />
                      🎓 Certificate earned!
                    </span>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ResultsPage;