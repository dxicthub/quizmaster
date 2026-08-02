import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaCircle } from 'react-icons/fa';

function QuestionNavigatorMobile({ 
  totalQuestions, 
  currentIndex, 
  answers, 
  onQuestionClick,
  questions 
}) {
  const getQuestionStatus = (index) => {
    const questionId = questions[index]?.id;
    if (!questionId) return 'unattempted';
    return answers[questionId] ? 'attempted' : 'unattempted';
  };

  const getStatusColor = (index) => {
    const status = getQuestionStatus(index);
    if (status === 'attempted') {
      return 'bg-green-500 text-white border-green-600';
    }
    return 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600';
  };

  return (
    <div className="lg:hidden w-full glassmorphism card-shadow rounded-2xl p-3 mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
          Questions
        </span>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-gray-600 dark:text-gray-400">{Object.keys(answers).length}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <span className="text-gray-600 dark:text-gray-400">{totalQuestions - Object.keys(answers).length}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-1.5 overflow-x-auto pb-2 custom-scrollbar">
        {Array.from({ length: totalQuestions }, (_, index) => {
          const questionNumber = index + 1;
          const isCurrent = index === currentIndex;
          const status = getQuestionStatus(index);

          return (
            <motion.button
              key={index}
              onClick={() => onQuestionClick(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                flex-shrink-0 w-8 h-8 rounded-lg border-2 transition-all duration-200 font-semibold text-xs
                ${getStatusColor(index)}
                ${isCurrent ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900 scale-105' : ''}
              `}
            >
              {questionNumber}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default QuestionNavigatorMobile;