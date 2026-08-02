import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaCircle, FaLock } from 'react-icons/fa';

function QuestionNavigator({ 
  totalQuestions, 
  currentIndex, 
  answers, 
  onQuestionClick,
  questions,
  isLocked = false,
  isQuizComplete = false,
  isQuestionCorrect
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const getQuestionStatus = (index) => {
    const questionId = questions[index]?.id;
    if (!questionId) return 'unattempted';
    const isAnswered = answers[questionId];
    if (!isAnswered) return 'unattempted';
    return isQuestionCorrect(questionId) ? 'correct' : 'wrong';
  };

  const getStatusColor = (index) => {
    const status = getQuestionStatus(index);
    switch(status) {
      case 'correct':
        return 'bg-green-500 text-white border-green-600 shadow-lg shadow-green-500/30';
      case 'wrong':
        return 'bg-red-500 text-white border-red-600 shadow-lg shadow-red-500/30';
      default:
        return 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600';
    }
  };

  const getStatusIcon = (index) => {
    const status = getQuestionStatus(index);
    switch(status) {
      case 'correct':
        return <FaCheckCircle className="text-white text-xs" />;
      case 'wrong':
        return <FaTimesCircle className="text-white text-xs" />;
      default:
        return <FaCircle className="text-gray-400 dark:text-gray-500 text-xs" />;
    }
  };

  const getStatusLabel = (index) => {
    const status = getQuestionStatus(index);
    switch(status) {
      case 'correct': return 'Correct';
      case 'wrong': return 'Incorrect';
      default: return 'Unattempted';
    }
  };

  const getStatusEmoji = (index) => {
    const status = getQuestionStatus(index);
    switch(status) {
      case 'correct': return '✅';
      case 'wrong': return '❌';
      default: return '⬜';
    }
  };

  const getTooltipContent = (index) => {
    const questionNumber = index + 1;
    const status = getQuestionStatus(index);
    return `Question ${questionNumber}\n${getStatusEmoji(index)} ${status.charAt(0).toUpperCase() + status.slice(1)}`;
  };

  return (
    <div className="glassmorphism card-shadow rounded-2xl p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Question Navigator
        </h3>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-600 dark:text-gray-400">
              {Object.keys(answers).filter(id => isQuestionCorrect(parseInt(id))).length}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-gray-600 dark:text-gray-400">
              {Object.keys(answers).filter(id => !isQuestionCorrect(parseInt(id))).length}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <span className="text-gray-600 dark:text-gray-400">
              {totalQuestions - Object.keys(answers).length}
            </span>
          </div>
        </div>
      </div>

      {isLocked && !isQuizComplete && (
        <div className="mb-3 p-2 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 flex items-center gap-2 text-xs">
          <FaLock className="text-yellow-600 dark:text-yellow-400" />
          <span className="text-yellow-700 dark:text-yellow-300">Locked until quiz ends</span>
        </div>
      )}

      <div className="grid grid-cols-5 gap-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {Array.from({ length: totalQuestions }, (_, index) => {
          const questionNumber = index + 1;
          const isCurrent = index === currentIndex;
          const status = getQuestionStatus(index);
          const isDisabled = isLocked && index < currentIndex && !isQuizComplete;
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.button
                onClick={() => !isDisabled && onQuestionClick(index)}
                whileHover={!isDisabled ? { scale: 1.05 } : {}}
                whileTap={!isDisabled ? { scale: 0.95 } : {}}
                className={`
                  relative flex items-center justify-center w-full aspect-square rounded-xl
                  border-2 transition-all duration-200 font-semibold text-sm
                  ${getStatusColor(index)}
                  ${isCurrent ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900 scale-105' : ''}
                  ${!isDisabled && status === 'unattempted' && 'hover:border-blue-400 dark:hover:border-blue-500'}
                  ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
                disabled={isDisabled}
                title={getTooltipContent(index)}
              >
                <span className="relative z-10">{questionNumber}</span>
                <div className="absolute top-1 right-1">
                  {getStatusIcon(index)}
                </div>
                {isDisabled && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-500/10 rounded-xl">
                    <FaLock className="text-gray-400 text-xs" />
                  </div>
                )}
              </motion.button>

              {/* Tooltip */}
              {isHovered && !isDisabled && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1.5 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg whitespace-nowrap z-50 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <span>Q{questionNumber}</span>
                    <span>{getStatusEmoji(index)}</span>
                    <span>{getStatusLabel(index)}</span>
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-600 dark:text-gray-400">Correct</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-gray-600 dark:text-gray-400">Wrong</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <span className="text-gray-600 dark:text-gray-400">Unattempted</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-blue-500 ring-2 ring-blue-500 ring-offset-1 dark:ring-offset-gray-900"></div>
            <span className="text-gray-600 dark:text-gray-400">Current</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionNavigator;