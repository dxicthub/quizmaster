// components/Quiz/ReviewMode.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaTimes, FaCheckCircle, FaTimesCircle, FaChevronLeft, 
  FaChevronRight, FaQuestionCircle, FaInfoCircle,
  FaArrowLeft, FaArrowRight, FaList  // Added FaList here
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../../context/QuizContext.jsx';

const ReviewMode = ({ questions: propQuestions, answers: propAnswers, onClose }) => {
  const navigate = useNavigate();
  const { setReviewing, clearQuizState } = useQuiz();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(true);
  
  // Load data from props or localStorage
  const [questions, setQuestions] = useState(propQuestions || []);
  const [answers, setAnswers] = useState(propAnswers || {});

  useEffect(() => {
    // If no questions were passed as props, try to load from localStorage
    if (!propQuestions || propQuestions.length === 0) {
      try {
        const savedReviewData = localStorage.getItem('reviewData');
        if (savedReviewData) {
          const reviewData = JSON.parse(savedReviewData);
          setQuestions(reviewData.questions || []);
          setAnswers(reviewData.answers || {});
        }
      } catch (error) {
        console.error('Error loading review data:', error);
      }
    }
  }, [propQuestions]);

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800">
        <div className="text-center">
          <FaQuestionCircle className="text-6xl text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">No questions to review</p>
          <button
            onClick={() => {
              setReviewing(false);
              navigate('/app/results');
            }}
            className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const userAnswer = answers[currentQuestion?.id];
  const correctAnswer = currentQuestion?.correctAnswer;
  const isCorrect = userAnswer && userAnswer === correctAnswer;
  const isAnswered = userAnswer !== undefined && userAnswer !== null && userAnswer !== '';

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleCloseReview = () => {
    setReviewing(false);
    if (onClose) onClose();
    navigate('/app/results');
  };

  const getOptionLabel = (index) => {
    return String.fromCharCode(65 + index);
  };

  const getOptionStatus = (optionKey) => {
    if (!isAnswered) return 'unanswered';
    if (optionKey === correctAnswer) return 'correct';
    if (optionKey === userAnswer && optionKey !== correctAnswer) return 'wrong';
    return 'neutral';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'correct':
        return <FaCheckCircle className="text-emerald-500" />;
      case 'wrong':
        return <FaTimesCircle className="text-rose-500" />;
      case 'unanswered':
        return <FaQuestionCircle className="text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'correct':
        return 'bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-500';
      case 'wrong':
        return 'bg-rose-50/50 dark:bg-rose-900/20 border-rose-500';
      case 'unanswered':
        return 'bg-gray-50/50 dark:bg-gray-800/50 border-gray-400';
      default:
        return 'bg-white/50 dark:bg-gray-700/50 border-gray-200/50 dark:border-gray-700/50';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'correct':
        return '✅ Correct';
      case 'wrong':
        return '❌ Incorrect';
      case 'unanswered':
        return '⚪ Unanswered';
      default:
        return '';
    }
  };

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 p-4 md:p-6">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/10 dark:bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300/10 dark:bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-300/5 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100/50 dark:bg-blue-900/20 rounded-xl">
              <FaList className="text-blue-500 text-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                Review Answers
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Question {currentIndex + 1} of {questions.length}
              </p>
            </div>
          </div>
          <button
            onClick={handleCloseReview}
            className="p-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-colors group"
          >
            <FaTimes className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200/50 dark:bg-gray-700/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl overflow-hidden"
          >
            {/* Question Status Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-700/50">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  Q{currentIndex + 1}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                  isAnswered ? (isCorrect ? 'correct' : 'wrong') : 'unanswered'
                )}`}>
                  {getStatusText(isAnswered ? (isCorrect ? 'correct' : 'wrong') : 'unanswered')}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                <span>{currentQuestion.type || 'Multiple Choice'}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
                <span className={`px-2 py-0.5 rounded-full ${
                  currentQuestion.difficulty === 'easy' ? 'bg-emerald-100/50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' :
                  currentQuestion.difficulty === 'hard' ? 'bg-rose-100/50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300' :
                  'bg-amber-100/50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                }`}>
                  {currentQuestion.difficulty || 'Medium'}
                </span>
              </div>
            </div>

            {/* Question Content */}
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                {currentQuestion.question}
              </h3>

              {/* Options */}
              <div className="space-y-2">
                {currentQuestion.options?.map((option, idx) => {
                  const optionKey = getOptionLabel(idx);
                  const status = getOptionStatus(optionKey);
                  const isUserAnswer = isAnswered && userAnswer === optionKey;
                  const isCorrectAnswer = optionKey === correctAnswer;

                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                        isUserAnswer && isCorrectAnswer
                          ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/20'
                          : isUserAnswer && !isCorrectAnswer
                          ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-900/20'
                          : isCorrectAnswer
                          ? 'border-emerald-500 bg-emerald-50/30 dark:bg-emerald-900/10'
                          : 'border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300/50 dark:hover:border-gray-600/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold ${
                          isUserAnswer && isCorrectAnswer
                            ? 'bg-emerald-500 text-white'
                            : isUserAnswer && !isCorrectAnswer
                            ? 'bg-rose-500 text-white'
                            : isCorrectAnswer
                            ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                            : 'bg-gray-100/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400'
                        }`}>
                          {optionKey}
                        </div>
                        <span className={`flex-1 text-gray-700 dark:text-gray-300 ${
                          isUserAnswer && isCorrectAnswer ? 'font-medium' : ''
                        }`}>
                          {option}
                        </span>
                        {isUserAnswer && (
                          <span className="flex-shrink-0">
                            {isCorrectAnswer ? (
                              <FaCheckCircle className="text-emerald-500 text-xl" />
                            ) : (
                              <FaTimesCircle className="text-rose-500 text-xl" />
                            )}
                          </span>
                        )}
                        {!isUserAnswer && isCorrectAnswer && (
                          <span className="flex-shrink-0 text-emerald-500 text-sm font-semibold">
                            ✓ Correct Answer
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* User Answer Summary */}
              <div className="mt-4 p-4 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center gap-3">
                  {isAnswered ? (
                    <>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Your Answer:
                      </span>
                      <span className={`font-semibold ${
                        isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                      }`}>
                        {userAnswer} {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
                      </span>
                    </>
                  ) : (
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      ⚪ Not Answered
                    </span>
                  )}
                  <span className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Correct Answer:
                  </span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {correctAnswer}
                  </span>
                </div>
              </div>

              {/* Explanation */}
              {currentQuestion.explanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 p-4 rounded-xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-700/30"
                >
                  <div className="flex items-start gap-3">
                    <FaInfoCircle className="text-blue-500 text-lg mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                        💡 Explanation
                      </h4>
                      <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
              currentIndex === 0
                ? 'bg-gray-100/50 dark:bg-gray-700/50 text-gray-400 cursor-not-allowed'
                : 'bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50'
            }`}
          >
            <FaArrowLeft className="text-sm" />
            Previous
          </button>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {currentIndex + 1} / {questions.length}
            </span>
            <button
              onClick={handleCloseReview}
              className="px-4 py-2 rounded-xl bg-purple-100/50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-medium hover:bg-purple-200/50 dark:hover:bg-purple-900/30 transition-colors"
            >
              Return to Results
            </button>
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
            className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
              currentIndex === questions.length - 1
                ? 'bg-gray-100/50 dark:bg-gray-700/50 text-gray-400 cursor-not-allowed'
                : 'bg-white/50 dark:bg-gray-800/50 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50'
            }`}
          >
            Next
            <FaArrowRight className="text-sm" />
          </button>
        </div>

        {/* Question Navigator */}
        <div className="mt-6 flex flex-wrap gap-1.5 justify-center p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50">
          {questions.map((_, idx) => {
            const qAnswer = answers[questions[idx]?.id];
            const isAnswered = qAnswer !== undefined && qAnswer !== null && qAnswer !== '';
            const isCorrectAnswer = isAnswered && qAnswer === questions[idx]?.correctAnswer;

            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  idx === currentIndex
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30'
                    : isAnswered && isCorrectAnswer
                    ? 'bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                    : isAnswered && !isCorrectAnswer
                    ? 'bg-rose-100/50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300'
                    : 'bg-gray-100/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-600/50'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default ReviewMode;