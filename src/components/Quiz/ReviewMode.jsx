import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaArrowLeft, FaArrowRight, FaCheckCircle, FaTimesCircle, 
  FaFilter, FaList, FaSearch, FaTimes, FaEye, FaEyeSlash,
  FaChartBar
} from 'react-icons/fa';

function ReviewMode({ questions, answers, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSummary, setShowSummary] = useState(true);

  const getAnswerStatus = (questionId) => {
    const userAnswer = answers[questionId];
    const question = questions.find(q => q.id === questionId);
    if (!userAnswer || !question) return 'unanswered';
    return userAnswer === question.correctAnswer ? 'correct' : 'wrong';
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'correct': return 'bg-green-500';
      case 'wrong': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusBg = (status) => {
    switch(status) {
      case 'correct': return 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300';
      case 'wrong': return 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300';
      default: return 'border-gray-400 bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'correct': return <FaCheckCircle className="text-green-500 text-lg" />;
      case 'wrong': return <FaTimesCircle className="text-red-500 text-lg" />;
      default: return <span className="text-gray-400 text-lg">⬜</span>;
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'correct': return '✔ Correct';
      case 'wrong': return '✖ Incorrect';
      default: return '⚪ Not Answered';
    }
  };

  const getOptionClass = (optionKey, question) => {
    const userAnswer = answers[question.id];
    const isCorrectAnswer = optionKey === question.correctAnswer;
    const isUserAnswer = optionKey === userAnswer;
    const status = getAnswerStatus(question.id);
    
    if (isCorrectAnswer) {
      return 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300';
    }
    if (isUserAnswer && status === 'wrong') {
      return 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300';
    }
    return 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300';
  };

  const filteredQuestions = questions.filter((q) => {
    const status = getAnswerStatus(q.id);
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'correct' && status === 'correct') ||
      (filter === 'wrong' && status === 'wrong') ||
      (filter === 'unanswered' && status === 'unanswered');
    
    const matchesSearch = 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.objective?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const filteredIndex = filteredQuestions.findIndex(q => q.id === questions[currentIndex]?.id);
  const currentQuestion = filteredQuestions[filteredIndex] || filteredQuestions[0] || questions[0];

  const stats = {
    total: questions.length,
    answered: Object.keys(answers).length,
    correct: questions.filter(q => getAnswerStatus(q.id) === 'correct').length,
    wrong: questions.filter(q => getAnswerStatus(q.id) === 'wrong').length,
    unanswered: questions.filter(q => getAnswerStatus(q.id) === 'unanswered').length,
  };

  const handlePrevious = () => {
    if (filteredIndex > 0) {
      const newIndex = questions.findIndex(q => q.id === filteredQuestions[filteredIndex - 1]?.id);
      setCurrentIndex(newIndex >= 0 ? newIndex : 0);
    }
  };

  const handleNext = () => {
    if (filteredIndex < filteredQuestions.length - 1) {
      const newIndex = questions.findIndex(q => q.id === filteredQuestions[filteredIndex + 1]?.id);
      setCurrentIndex(newIndex >= 0 ? newIndex : currentIndex);
    }
  };

  const goToQuestion = (questionId) => {
    const index = questions.findIndex(q => q.id === questionId);
    if (index !== -1) setCurrentIndex(index);
  };

  const progress = ((filteredIndex + 1) / filteredQuestions.length) * 100;

  return (
    <div className="glassmorphism card-shadow rounded-3xl p-6 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-2 rounded-xl shadow-lg shadow-purple-500/30">
            <FaList className="text-white text-xl" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            Review Answers
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSummary(!showSummary)}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
            title="Toggle Summary"
          >
            {showSummary ? <FaEyeSlash /> : <FaEye />}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors flex items-center gap-2"
          >
            <FaTimes />
            Close Review
          </button>
        </div>
      </div>

      {/* Summary Panel */}
      {showSummary && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6"
        >
          {[
            { label: 'Total', value: stats.total, color: 'blue' },
            { label: 'Answered', value: stats.answered, color: 'purple' },
            { label: 'Correct', value: stats.correct, color: 'green' },
            { label: 'Wrong', value: stats.wrong, color: 'red' },
            { label: 'Unanswered', value: stats.unanswered, color: 'gray' },
          ].map((stat, index) => (
            <div key={index} className={`text-center p-3 rounded-xl bg-${stat.color}-50 dark:bg-${stat.color}-900/20 border border-${stat.color}-200 dark:border-${stat.color}-800`}>
              <div className={`text-2xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400`}>
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-xl">
          <FaFilter className="text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-transparent text-gray-700 dark:text-gray-300 text-sm focus:outline-none cursor-pointer"
          >
            <option value="all">All Questions</option>
            <option value="correct">Correct Only</option>
            <option value="wrong">Incorrect Only</option>
            <option value="unanswered">Unanswered Only</option>
          </select>
        </div>
        <div className="flex-1 min-w-[150px] relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {filteredQuestions.length} questions
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Question {filteredIndex + 1} of {filteredQuestions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Display */}
      <AnimatePresence mode="wait">
        {currentQuestion && (
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Question {currentQuestion.id}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBg(getAnswerStatus(currentQuestion.id))}`}>
                  {getStatusText(getAnswerStatus(currentQuestion.id))}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  currentQuestion.type === 'multiple-choice' 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                    : currentQuestion.type === 'true-false'
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                    : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                }`}>
                  {currentQuestion.type === 'multiple-choice' ? 'Multiple Choice' :
                   currentQuestion.type === 'true-false' ? 'True/False' : 'Fill in the Gap'}
                </span>
                {currentQuestion.objective && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    📚 {currentQuestion.objective}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {currentQuestion.question}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const optionKey = String.fromCharCode(65 + index);
                const isCorrectAnswer = optionKey === currentQuestion.correctAnswer;
                const userAnswer = answers[currentQuestion.id];
                const isUserAnswer = optionKey === userAnswer;
                const status = getAnswerStatus(currentQuestion.id);
                
                return (
                  <div
                    key={optionKey}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-4 ${getOptionClass(optionKey, currentQuestion)}`}
                  >
                    <span className="font-bold text-sm w-6 h-6 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 flex-shrink-0">
                      {optionKey}
                    </span>
                    <span className="flex-1">{option}</span>
                    <div className="flex items-center gap-2">
                      {isCorrectAnswer && (
                        <span className="text-green-500 text-sm font-semibold">✓ Correct Answer</span>
                      )}
                      {isUserAnswer && status === 'wrong' && (
                        <span className="text-red-500 text-sm font-semibold">✗ Your Answer</span>
                      )}
                      {isCorrectAnswer && isUserAnswer && status === 'correct' && (
                        <span className="text-green-500 text-sm font-semibold">✓ Your Answer (Correct)</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Explanation */}
            {currentQuestion.explanation && (
              <div className="mt-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>💡 Explanation:</strong> {currentQuestion.explanation}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={handlePrevious}
          disabled={filteredIndex === 0}
          className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
            filteredIndex === 0
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
          }`}
        >
          <FaArrowLeft />
          Previous
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {filteredIndex + 1} of {filteredQuestions.length}
          </span>
        </div>

        <button
          onClick={handleNext}
          disabled={filteredIndex === filteredQuestions.length - 1}
          className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
            filteredIndex === filteredQuestions.length - 1
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              : 'bg-purple-500 hover:bg-purple-600 text-white'
          }`}
        >
          Next
          <FaArrowRight />
        </button>
      </div>

      {/* Question Navigator Mini */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
          {questions.map((q, index) => {
            const status = getAnswerStatus(q.id);
            const isCurrent = q.id === currentQuestion?.id;
            return (
              <button
                key={q.id}
                onClick={() => goToQuestion(q.id)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  isCurrent ? 'ring-2 ring-purple-500 ring-offset-2 scale-110' : ''
                } ${
                  status === 'correct' ? 'bg-green-500 text-white' :
                  status === 'wrong' ? 'bg-red-500 text-white' :
                  'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                }`}
                title={`Q${index + 1}: ${status}`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ReviewMode;