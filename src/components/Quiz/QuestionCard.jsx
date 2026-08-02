import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function QuestionCard({ question, onAnswerSelect, isAnswered, isSubmitting }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionClick = (optionKey) => {
    if (isAnswered || isSubmitting) return;

    setSelectedOption(optionKey);
    const correct = optionKey === question.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    onAnswerSelect(question.id, optionKey, correct);

    setTimeout(() => {
      setShowFeedback(false);
    }, 2000);
  };

  useEffect(() => {
    setSelectedOption(null);
    setIsCorrect(null);
    setShowFeedback(false);
  }, [question.id]);

  const getOptionClasses = (optionKey) => {
    if (!isAnswered && selectedOption === optionKey) {
      return isCorrect ? 'option-selected-correct' : 'option-selected-wrong';
    }
    if (isAnswered && optionKey === question.correctAnswer) {
      return 'option-correct-reveal';
    }
    if (isAnswered && selectedOption === optionKey && !isCorrect) {
      return 'option-selected-wrong';
    }
    return 'option-default hover:border-blue-400 dark:hover:border-blue-600';
  };

  const getIcon = (optionKey) => {
    if (isAnswered && optionKey === question.correctAnswer) {
      return <FaCheckCircle className="text-green-500 text-lg" />;
    }
    if (isAnswered && selectedOption === optionKey && !isCorrect) {
      return <FaTimesCircle className="text-red-500 text-lg" />;
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className={`rounded-2xl p-6 md:p-8 ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}>
        {/* Question Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
              {question.type === 'multiple-choice' ? 'Multiple Choice' : 
               question.type === 'true-false' ? 'True/False' : 'Fill in the Gap'}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Objective {question.objective?.split(' ').slice(0, 3).join(' ')}...
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100 leading-relaxed">
            {question.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const optionKey = String.fromCharCode(65 + index);
            const isSelected = selectedOption === optionKey;
            const isCorrectAnswer = optionKey === question.correctAnswer;

            return (
              <motion.button
                key={optionKey}
                onClick={() => handleOptionClick(optionKey)}
                disabled={isAnswered || isSubmitting}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-between group
                  ${getOptionClasses(optionKey)}
                  ${!isAnswered && !isSubmitting && 'option-hover cursor-pointer'}
                  ${(isAnswered || isSubmitting) && 'cursor-default'}
                `}
                whileHover={!isAnswered && !isSubmitting ? { scale: 1.01 } : {}}
                whileTap={!isAnswered && !isSubmitting ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center gap-4 flex-1">
                  <span className={`font-bold text-sm w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0
                    ${isSelected && isCorrect ? 'bg-green-500 text-white' : 
                      isSelected && !isCorrect ? 'bg-red-500 text-white' :
                      isAnswered && isCorrectAnswer ? 'bg-green-500 text-white' :
                      'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}
                  `}>
                    {optionKey}
                  </span>
                  <span className="text-gray-700 dark:text-gray-200">{option}</span>
                </div>
                {getIcon(optionKey)}
              </motion.button>
            );
          })}
        </div>

        {/* Feedback Animation */}
        <AnimatePresence>
          {showFeedback && !isAnswered && !isSubmitting && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -10 }}
              className={`mt-6 p-4 rounded-xl border-2 ${
                isCorrect
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                  : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
              }`}
            >
              <div className="flex items-center gap-3">
                {isCorrect ? (
                  <FaCheckCircle className="text-2xl text-green-500" />
                ) : (
                  <FaTimesCircle className="text-2xl text-red-500" />
                )}
                <span className="font-semibold text-lg">
                  {isCorrect ? '✅ Good' : '❌ Fail'}
                </span>
                {!isCorrect && (
                  <span className="text-sm ml-2">
                    Correct answer: {question.correctAnswer}
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Answered feedback */}
        {isAnswered && !isSubmitting && (
          <div className={`mt-6 p-4 rounded-xl border-2 ${
            selectedOption === question.correctAnswer
              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
              : 'border-red-500 bg-red-50 dark:bg-red-900/20'
          }`}>
            <div className="flex items-center gap-3">
              {selectedOption === question.correctAnswer ? (
                <>
                  <FaCheckCircle className="text-2xl text-green-500" />
                  <span className="font-semibold text-green-700 dark:text-green-300">
                    ✅ Good
                  </span>
                </>
              ) : (
                <>
                  <FaTimesCircle className="text-2xl text-red-500" />
                  <span className="font-semibold text-red-700 dark:text-red-300">
                    ❌ Fail
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                    Correct answer: {question.correctAnswer}
                  </span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default QuestionCard;