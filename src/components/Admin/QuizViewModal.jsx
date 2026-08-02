import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, FaChevronLeft, FaChevronRight, FaBook, FaClock, 
  FaTag, FaChartBar, FaInfoCircle, FaEye, FaEyeSlash,
  FaCheckCircle, FaTimesCircle, FaQuestionCircle,
  FaGraduationCap, FaAward, FaStar, FaFire,
  FaArrowLeft, FaArrowRight, FaThumbsUp, FaThumbsDown
} from 'react-icons/fa';

function QuizViewModal({ quiz, onClose }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [hoveredQuestion, setHoveredQuestion] = useState(null);

  const questions = quiz.questions || [];
  const totalQuestions = questions.length;

  // Reset current question when quiz changes
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setShowAnswers(false);
  }, [quiz]);

  const getQuestionTypeLabel = (type) => {
    const types = {
      'multiple-choice': 'Multiple Choice',
      'true-false': 'True/False',
      'fill-in': 'Fill in the Gap',
    };
    return types[type] || type;
  };

  const getQuestionTypeIcon = (type) => {
    const icons = {
      'multiple-choice': <FaBook className="text-blue-500" />,
      'true-false': <FaCheckCircle className="text-emerald-500" />,
      'fill-in': <FaInfoCircle className="text-purple-500" />,
    };
    return icons[type] || <FaQuestionCircle className="text-gray-500" />;
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'beginner': 'text-emerald-500 bg-emerald-100/50 dark:bg-emerald-900/30 border-emerald-200/50 dark:border-emerald-700/30',
      'intermediate': 'text-amber-500 bg-amber-100/50 dark:bg-amber-900/30 border-amber-200/50 dark:border-amber-700/30',
      'advanced': 'text-orange-500 bg-orange-100/50 dark:bg-orange-900/30 border-orange-200/50 dark:border-orange-700/30',
      'expert': 'text-rose-500 bg-rose-100/50 dark:bg-rose-900/30 border-rose-200/50 dark:border-rose-700/30',
    };
    return colors[difficulty?.toLowerCase()] || colors['beginner'];
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') handlePrevQuestion();
    if (e.key === 'ArrowRight') handleNextQuestion();
    if (e.key === 'Escape') onClose();
  };

  // Keyboard navigation
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestionIndex, totalQuestions]);

  const currentQuestion = questions[currentQuestionIndex] || {};

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quiz-modal-title"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative overflow-hidden glassmorphism card-shadow rounded-3xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200/50 dark:border-gray-700/50 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Decorative Gradient Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

          {/* Animated Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-purple-50/20 dark:from-blue-900/10 dark:to-purple-900/10 opacity-30 rounded-3xl pointer-events-none" />

          {/* Header */}
          <div className="relative z-10 flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg shadow-blue-500/30">
                  <FaBook className="text-white text-xl" />
                </div>
                <h2 id="quiz-modal-title" className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  {quiz.title}
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-2 ml-1">
                <span className="px-2 py-0.5 bg-gray-100/50 dark:bg-gray-700/50 rounded-full text-xs text-gray-500 dark:text-gray-400 border border-gray-200/50 dark:border-gray-700/50">
                  {quiz.category || 'Uncategorized'}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getDifficultyColor(quiz.difficulty)}`}>
                  {quiz.difficulty || 'Medium'}
                </span>
                <span className="px-2 py-0.5 bg-purple-100/50 dark:bg-purple-900/30 rounded-full text-xs text-purple-600 dark:text-purple-400 border border-purple-200/50 dark:border-purple-700/30">
                  {totalQuestions} questions
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-all duration-300 hover:scale-110 group relative"
              aria-label="Close modal"
            >
              <FaTimes className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
            </button>
          </div>

          {/* Quiz Info Grid */}
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Status', value: quiz.status || 'Draft', icon: FaInfoCircle, color: 'text-blue-500' },
              { label: 'Visibility', value: quiz.isVisible !== false ? 'Visible' : 'Hidden', icon: quiz.isVisible !== false ? FaEye : FaEyeSlash, color: quiz.isVisible !== false ? 'text-emerald-500' : 'text-red-500' },
              { label: 'Duration', value: `${quiz.duration || 60} min`, icon: FaClock, color: 'text-amber-500' },
              { label: 'Passing Score', value: `${quiz.passingScore || 70}%`, icon: FaAward, color: 'text-purple-500' },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-3 rounded-xl bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-700/50 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-2">
                    <Icon className={`${item.color} text-sm`} />
                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.label}</span>
                  </div>
                  <div className="font-semibold text-gray-800 dark:text-gray-200 text-sm mt-0.5">
                    {item.value}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Description */}
          {quiz.description && (
            <div className="relative z-10 mb-6">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                <FaInfoCircle className="text-blue-500 text-sm" />
                Description
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed bg-gray-50/50 dark:bg-gray-700/50 rounded-xl p-3 border border-gray-200/50 dark:border-gray-700/50">
                {quiz.description}
              </p>
            </div>
          )}

          {/* Tags */}
          {quiz.tags && quiz.tags.length > 0 && (
            <div className="relative z-10 mb-6">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                <FaTag className="text-purple-500 text-sm" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {quiz.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gradient-to-r from-purple-100/50 to-indigo-100/50 dark:from-purple-900/30 dark:to-indigo-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm border border-purple-200/50 dark:border-purple-700/30">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Learning Objectives */}
          {quiz.learningObjectives && quiz.learningObjectives.length > 0 && (
            <div className="relative z-10 mb-6">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
                <FaGraduationCap className="text-emerald-500 text-sm" />
                Learning Objectives
              </h3>
              <ul className="space-y-1">
                {quiz.learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm">
                    <span className="text-emerald-500 mt-0.5">•</span>
                    {objective}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Question Preview */}
          {questions.length > 0 && (
            <div className="relative z-10 border-t border-gray-200/50 dark:border-gray-700/50 pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Questions
                  </h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {currentQuestionIndex + 1} of {totalQuestions}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAnswers(!showAnswers)}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100/50 dark:bg-gray-700/50 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 text-gray-600 dark:text-gray-400 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
                  >
                    {showAnswers ? 'Hide Answers' : 'Show Answers'}
                  </button>
                  <div className="flex gap-1">
                    <button
                      onClick={handlePrevQuestion}
                      disabled={currentQuestionIndex === 0}
                      className="p-2 rounded-lg bg-gray-100/50 dark:bg-gray-700/50 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
                    >
                      <FaChevronLeft className="text-sm" />
                    </button>
                    <button
                      onClick={handleNextQuestion}
                      disabled={currentQuestionIndex === totalQuestions - 1}
                      className="p-2 rounded-lg bg-gray-100/50 dark:bg-gray-700/50 hover:bg-gray-200/50 dark:hover:bg-gray-600/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
                    >
                      <FaChevronRight className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>

              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-4 rounded-xl bg-gradient-to-br from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-700/50 border border-gray-200/50 dark:border-gray-700/50"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-100/50 dark:bg-purple-900/30 px-2 py-0.5 rounded-lg">
                      Q{currentQuestionIndex + 1}
                    </span>
                    <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/30">
                      {getQuestionTypeIcon(currentQuestion.type)}
                      {getQuestionTypeLabel(currentQuestion.type)}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${getDifficultyColor(currentQuestion.difficulty)}`}>
                      {currentQuestion.difficulty || 'Medium'}
                    </span>
                    {currentQuestion.points && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100/50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200/50 dark:border-amber-700/30">
                        {currentQuestion.points} pts
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-800 dark:text-gray-200 font-medium text-base leading-relaxed">
                  {currentQuestion.question}
                </p>
                
                {currentQuestion.options && (
                  <div className="mt-3 space-y-2">
                    {currentQuestion.options.map((option, idx) => {
                      const optionKey = String.fromCharCode(65 + idx);
                      const isCorrect = optionKey === currentQuestion.correctAnswer;
                      const showCorrect = showAnswers && isCorrect;
                      const showWrong = showAnswers && !isCorrect && currentQuestion.selectedAnswer === optionKey;
                      
                      return (
                        <div 
                          key={idx} 
                          className={`p-3 rounded-xl text-sm transition-all duration-300 flex items-center justify-between group ${
                            showCorrect 
                              ? 'bg-emerald-50/50 dark:bg-emerald-900/30 border-emerald-500 text-emerald-700 dark:text-emerald-300 border-2'
                              : showWrong
                                ? 'bg-rose-50/50 dark:bg-rose-900/30 border-rose-500 text-rose-700 dark:text-rose-300 border-2'
                                : 'bg-white/50 dark:bg-gray-700/50 border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 border hover:border-purple-300 dark:hover:border-purple-600'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`font-mono text-sm font-semibold ${
                              showCorrect ? 'text-emerald-500' : showWrong ? 'text-rose-500' : 'text-gray-400'
                            }`}>
                              {optionKey}.
                            </span>
                            <span>{option}</span>
                          </div>
                          {showCorrect && (
                            <div className="flex items-center gap-1 text-emerald-500">
                              <FaCheckCircle className="text-sm" />
                              <span className="text-xs font-medium">Correct</span>
                            </div>
                          )}
                          {showWrong && (
                            <div className="flex items-center gap-1 text-rose-500">
                              <FaTimesCircle className="text-sm" />
                              <span className="text-xs font-medium">Wrong</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {/* Explanation */}
                {currentQuestion.explanation && showAnswers && (
                  <div className="mt-3 p-3 rounded-xl bg-blue-50/50 dark:bg-blue-900/20 border border-blue-200/50 dark:border-blue-700/30">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <span className="font-semibold">💡 Explanation:</span> {currentQuestion.explanation}
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          )}

          {/* Question Navigator */}
          {questions.length > 0 && (
            <div className="relative z-10 mt-4">
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                {questions.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentQuestionIndex(index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => setHoveredQuestion(index)}
                    onMouseLeave={() => setHoveredQuestion(null)}
                    className={`relative w-8 h-8 rounded-lg text-xs font-semibold transition-all duration-200 ${
                      index === currentQuestionIndex
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30'
                        : 'bg-gray-200/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 hover:bg-gray-300/50 dark:hover:bg-gray-600/50'
                    }`}
                  >
                    {index + 1}
                    {hoveredQuestion === index && index !== currentQuestionIndex && (
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gray-800 text-white text-[10px] rounded whitespace-nowrap">
                        Go to Q{index + 1}
                      </span>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="relative z-10 mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <FaArrowLeft className="text-[10px]" />
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-mono">←</kbd>
              </span>
              <span className="flex items-center gap-1">
                <FaArrowRight className="text-[10px]" />
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-mono">→</kbd>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-mono">Esc</kbd>
                <span>close</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {totalQuestions} questions • {quiz.difficulty || 'Medium'} difficulty
              </span>
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-gray-100/50 to-gray-200/50 dark:from-gray-700/50 dark:to-gray-600/50 hover:from-gray-200/50 hover:to-gray-300/50 dark:hover:from-gray-600/50 dark:hover:to-gray-500/50 text-gray-700 dark:text-gray-300 font-medium transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default QuizViewModal;