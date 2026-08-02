import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserGraduate, FaUserShield, FaTimes } from 'react-icons/fa';

function RoleSelectionModal({ isOpen, onClose, onSelect }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ scale: 0.8, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.8, y: 30, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="glassmorphism card-shadow rounded-3xl p-8 max-w-md w-full relative border border-white/20 dark:border-gray-700/30"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Close modal"
          >
            <FaTimes className="text-gray-500 dark:text-gray-400" />
          </button>

          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/30 mb-4">
              <FaUserGraduate className="text-white text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Welcome to QuizMaster
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Please select your role to continue
            </p>
          </div>

          <div className="space-y-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect('student')}
              className="w-full p-4 rounded-xl border-2 border-blue-500/30 hover:border-blue-500 bg-blue-50/50 dark:bg-blue-900/10 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300">
                <FaUserGraduate />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Student</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Take quizzes and track your progress</p>
              </div>
              <FaUserGraduate className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect('admin')}
              className="w-full p-4 rounded-xl border-2 border-purple-500/30 hover:border-purple-500 bg-purple-50/50 dark:bg-purple-900/10 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300 flex items-center gap-4 group"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-xl shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300">
                <FaUserShield />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Admin / Staff</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage quizzes and students</p>
              </div>
              <FaUserShield className="text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              By continuing, you agree to our Terms & Conditions and Privacy Policy
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default RoleSelectionModal;