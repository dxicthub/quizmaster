import React from 'react';
import { motion } from 'framer-motion';

function ProgressBar({ progress, current, total }) {
  const percentage = Math.min(progress, 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Progress
        </span>
        <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {current + 1} of {total} questions
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {total - current - 1} remaining
        </span>
      </div>
    </div>
  );
}

export default ProgressBar;