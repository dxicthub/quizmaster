import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaClock, FaCheckCircle, FaTimesCircle, FaLock } from 'react-icons/fa';

function InstructionsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="glassmorphism card-shadow rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              📋 Quiz Instructions
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close instructions"
            >
              <FaTimes className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">📝 Quiz Overview</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1.5">
                <li>• Total of <strong>100 questions</strong> covering Vercel, Git, and GitHub</li>
                <li>• <strong>70 Multiple Choice</strong> questions (A, B, C, D)</li>
                <li>• <strong>20 True/False</strong> questions</li>
                <li>• <strong>10 Fill in the Gap</strong> questions</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2 flex items-center gap-2">
                <FaClock className="text-yellow-500" /> ⏱️ Time Rules
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1.5">
                <li>• You have <strong>10 seconds</strong> to answer each question</li>
                <li>• Timer starts as soon as the question appears</li>
                <li>• Quiz will <strong>auto-advance</strong> when time expires</li>
                <li>• Last question will <strong>auto-submit</strong> when time expires</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <h3 className="font-semibold text-red-700 dark:text-red-300 mb-2 flex items-center gap-2">
                <FaLock className="text-red-500" /> 🔒 Navigation Rules
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1.5">
                <li>• You <strong>cannot go back</strong> to previous questions</li>
                <li>• <strong>No skipping</strong> - answer or timer will advance</li>
                <li>• Review answers only after quiz completion</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
              <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2 flex items-center gap-2">
                <FaCheckCircle className="text-green-500" /> ✅ Marking System
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1.5">
                <li>• <span className="text-green-600 font-semibold">Green</span> - Correct answer</li>
                <li>• <span className="text-red-600 font-semibold">Red</span> - Wrong answer</li>
                <li>• <span className="text-gray-600 font-semibold">Grey</span> - Unattempted questions</li>
                <li>• <strong>90%</strong> required to pass</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
              <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">📊 Submission & Results</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1.5">
                <li>• Quiz can be <strong>submitted at any time</strong></li>
                <li>• Unanswered questions will be counted as unanswered</li>
                <li>• Auto-submit when timer expires on Question 100</li>
                <li>• View detailed results with pass/fail status</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-8 py-2.5 rounded-xl font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 transition-all duration-300"
            >
              Got it!
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default InstructionsModal;