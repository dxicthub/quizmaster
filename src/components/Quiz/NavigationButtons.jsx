import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaArrowRight, FaCheck, FaRedo, FaList, FaLock } from 'react-icons/fa';

function NavigationButtons({
  currentIndex,
  totalQuestions,
  onPrevious,
  onNext,
  onSubmit,
  onRestart,
  onReview,
  isLastQuestion,
  isFirstQuestion,
  isQuizComplete,
  answeredCount,
  canNavigateBack = false,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mt-8">
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPrevious}
          disabled={isFirstQuestion || !canNavigateBack || isQuizComplete}
          className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2
            ${isFirstQuestion || !canNavigateBack || isQuizComplete
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
            }`}
        >
          {!canNavigateBack && !isQuizComplete ? <FaLock className="text-xs" /> : <FaArrowLeft className="text-sm" />}
          Previous
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          disabled={isLastQuestion || isQuizComplete}
          className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2
            ${isLastQuestion || isQuizComplete
              ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
        >
          Next
          <FaArrowRight className="text-sm" />
        </motion.button>
      </div>

      <div className="flex gap-3">
        {!isQuizComplete && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSubmit}
            disabled={answeredCount < totalQuestions}
            className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2
              ${answeredCount < totalQuestions
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30'
              }`}
          >
            <FaCheck />
            Submit Quiz
          </motion.button>
        )}

        {isQuizComplete && (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onReview}
              className="px-4 py-2 rounded-xl font-medium bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 flex items-center gap-2"
            >
              <FaList />
              Review Answers
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRestart}
              className="px-4 py-2 rounded-xl font-medium bg-purple-500 hover:bg-purple-600 text-white transition-all duration-300 flex items-center gap-2"
            >
              <FaRedo />
              Restart
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
}

export default NavigationButtons;